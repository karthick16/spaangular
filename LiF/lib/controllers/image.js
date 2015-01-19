/// Include the node file module
var fs = require('fs');
var formidable = require('formidable');
var path = require('path');
var im = require('imagemagick');

exports.createRoutes = function (app) {
	//Post files
	app.post('/blog/upload', function(req, res) {
		var form = new formidable.IncomingForm();
		//Get the post id for this image upload
		var postid = req.param('postid');
		//Is this for hero title image or something else.
		var heroTitleFlag = req.param('heroTitle');
		console.log("heroTitleFlag--->" , heroTitleFlag);
		//Get the current time
		var cur_time = new Date().getTime();	
		form.parse(req, function(err, fields, files) {
				console.log("Files",files.file);
				console.log("Fields",fields);
			 	var filename    = files.file ? files.file.name : '' ; 
	            var fileType    = files.upload ? files.file.type : '' ;
	            var fileSize    = files.upload ? files.file.size : '' ;
	            console.log("FileType", fileType);
	            console.log("FileName", filename);
	            var filenameModified;
	            fs.readFile(files.file.path, function(err, data) {	            	
	            	if(heroTitleFlag == 'true'){
	            		filenameModified = postid + '_posthero.jpg';
	            	}else{
	            		filenameModified = cur_time + '_' + postid + '_'+ filename;
	            	}	            	
	            	console.log(filenameModified);
	            	var newPath = path.join(__dirname, "../../uploads/post", filenameModified);
	            	//var newImagePath = "../../uploads/post/aspectratio/" + filenameModified;
	            	var newImagePath = "/uploads/post/aspectratio/" + filenameModified;
	            	console.log("new path" , newPath);
	            	 fs.writeFile(newPath, data, function(err) {
	            		 //Resize the image
	            		 resizeImage(filenameModified,function(){
	            			 if(req.user) {
	            			      res.cookie('user', JSON.stringify(req.user.user_info));
	            			      res.send(newImagePath);
	            			    }
	            		 });
	            		 
	            	 });
	            });
		});
	});	
	
	/**
	 * Resize Image
	 */
	function resizeImage(filenameModified,callback){
		im.resize({
		    srcData : fs.readFileSync('uploads/post/' + filenameModified, 'binary'),
		    strip : false,
		    width : 1555,
		    height : "1037^",
		    customArgs: [ 
		         "-gravity", "center"
		        ,"-extent", "1555x1037"
		        ]
		}, function(err, stdout, stderr){
		  if (err) throw err
		  fs.writeFileSync('uploads/post/aspectratio/' + filenameModified, stdout, 'binary');
		  console.log('resized profile_pic.jpg to fit within 368px 620px');
		  callback();
		  
		});
	}
	
	/*//Fetch Image
	app.get('/uploads/post/:id', function(req, res) {
		res.send('uploads/post/Namperumal1.jpg');
	});*/
}
