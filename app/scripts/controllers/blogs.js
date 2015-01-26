'use strict';

angular.module('angularPassportApp')
  .controller('BlogsCtrl', function ($scope, Blogs,AjaxService,Categories, $location, $routeParams, $rootScope) {

    $scope.create = function() {
      var blog = new Blogs({
        title: this.title,
        content: this.content        
      });
      blog.$save(function(response) {
        $location.path("blogs/" + response._id);
      });

      this.title = "";
      this.content = "";
    };

    $scope.remove = function(blog) {
      blog.$remove();

      for (var i in $scope.blogs) {
        if ($scope.blogs[i] == blog) {
          $scope.blogs.splice(i, 1);
        }
      }
    };

    $scope.update = function() {
      var blog = $scope.formatBlog();     
      blog.$update(function() {
        $location.path('blogs/' + blog._id);
      });
    };

    $scope.find = function() {
      Blogs.query(function(blogs) {
        $scope.blogs = blogs;        
      });
    };

    $scope.findOne = function() {
      Blogs.get({
        blogId: $routeParams.blogId
      }, function(blog) {    	 
    	  	$scope.blog = blog;
    	  	console.log("FindOne blog-->" ,blog);    	  		  
    	});
    };
    
    $scope.findOneEdit = function() {
        Blogs.get({
          blogId: $routeParams.blogId
        }, function(blog) {      
        	//Populate Categories
    		Categories.query(function(categories) {			  
    	          $scope.categories= categories;
    	          $scope.blog = blog;
    	          //Set the collection/category id
    	          $scope.collectionid = blog.collectionid;
    	          initializeEditorsEditPost(blog._id);
    		});
        });
      };
    
      //Get all the Collections to be loaded for Edit and create blogs.
	  $scope.getCollections = function() {
		  
	  };		
      //##################################### CODE MERGER ####################################################
    var bodyEditor,titleEditor,heroEditor;
    
    /**
     * For Existing post,activate the medium post.
     */
     function initializeEditorsEditPost(postid){
 		//Initialize Medium Editors
         bodyEditor = new MediumEditor('.editable' , {placeholder : ''});   
          
     	titleEditor = new MediumEditor('.title-editable', {
     		disableToolbar : false,
     		placeholder : ''
     	});    	
     	heroEditor  = new MediumEditor('.heroEditable' , {placeholder : 'Update Story pic'});
  	 //Initialize medium insert editor
 	  $('.editable').mediumInsert({
 	    editor: bodyEditor,
 	    enable : true,
 	    buttonLabels: "fontawesome",
 	    addons: {
 	      images: {
 	    	  heroImage :false,
 	    	  imagesUploadScript:'blog/upload?postid=' + postid,
 	    	  disable : false
 	      }		      		      
 	    }
 	  });
 	 $('.heroEditable').mediumInsert({
   		editor : heroEditor,
    	    addons: {
    	    	images: {  
    	    	  imagesUploadScript:'blog/upload?postid=' + postid
    	      }		      		      
    	    }
    	  });   	 
 	}    
    /**
     * For New Post activate the medium plugin
     */     
    $scope.initializeEditorsNewPost = function(postid){    	    	
		//Initialize Medium Editors
        bodyEditor = new MediumEditor('.editable' , {});   
         
    	titleEditor = new MediumEditor('.title-editable', {
    		disableToolbar : false,
    		placeholder : 'Title'
    	});    	
    	heroEditor  = new MediumEditor('.heroEditable' , {placeholder : 'click here for profile pic'});
 	 //Initialize medium insert editor
	  $('.editable').mediumInsert({
	    editor: bodyEditor,
	    enable : true,
	    addons: {
	      images: {
	    	  heroImage :false,
	    	  imagesUploadScript:'blog/upload?postid=' + postid
	      },
	      embeds: {
	          oembedProxy: 'http://medium.iframe.ly/api/oembed?iframe=1'
	      },
	    }
	  });
	  $('.heroEditable').mediumInsert({
  		editor : heroEditor,
   	    addons: {
   	    	images: {  
   	    	  imagesUploadScript:'blog/upload?postid=' + postid
   	      }		      		      
   	    }
   	  });    	 
	},
    //First get the Blog Id     
     $scope.generateBlogId = function(){
		//Populate Categories
		Categories.query(function(categories) {			  
	          $scope.categories= categories;
		});
		//Generate new post id
    	AjaxService.AjaxGet("/api/generateBlogId", function(blog){    		
    		$scope.blog = blog;
    		$scope.initializeEditorsNewPost(blog._id);
		},function(){});
	 }
	
	/**
	 * Format blog data to be updated or delete 
	 */
	$scope.formatBlog = function(){
		var postContent = bodyEditor.serialize();
    	var postTitle = titleEditor.serialize();
    	var content = postContent['element-0'].value;
    	var title = postTitle['element-0'].value;  
    	var collectionid = $scope.collectionid;
    	//Create a new blog 
    	var blog = new Blogs();    	
    	//Set the details now.
    	blog.title = title;
    	blog.content = content;
    	blog.collectionid = collectionid;
    	blog._id= $scope.blog._id;    
    	console.log("Step 2---> " , blog);
    	 /*var blog = new Blogs({
    	        title: title,
    	        content: content,
    	        collectionid : collectionId,
    	        _id : $scope.blog._id
    	      });*/
    	return blog;
	}
  });
