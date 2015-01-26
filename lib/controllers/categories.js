
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var CateorySchema = new Schema({
   categoryname: {
    type: String,  
    unique: true,
    required: true
  },
  description: {
    type: String,    
    required: true,
  	trim: true
  },
  created: Date,
  updated: [Date],
  creator: {
	    type: Schema.ObjectId,
	    ref: 'User'
	  }
});

/**
 * Pre hook.
 */

CateorySchema.pre('save', function(next, done){
  if (this.isNew)
    this.created = Date.now();

  this.updated.push(Date.now());

  next();
});


var Category = mongoose.model('BlogCategory', CateorySchema);


/**
 * Category Model
 */
var  categoryModel = {		
		/**
		 * Create Categories
		 */
		create : function(req,res){
			var newCategory = new Category(req.body);
			newCategory.creator = req.user;			
			newCategory.save(function(err) {
			    if (err) {
			      return res.json(400, err);
			    }
			    return res.json(newCategory);				    
			  });
		},
		
		/**
		 * Get all categories
		 */ 
		getAllCategories: function(req,res)
	    {
			Category.find({},
					function(err, categories) {
				if (err) {
				      res.json(500, err);
				    } else {
				      res.json(categories);
				    }
			});
	    },
	    /***
	     * @author krenkara
	     * Find category Id 
	     */
	    getCategoryById: function(req,res)
	    {
	    	var categoryId = req.params.categoryId;
	    	console.log("categoryId--->" , categoryId);
			Category.findOne({'categoryid':categoryId},
					function(err, result) {
				  if (!err) {					  		
					  res.json(result);
				} else {					
					res.json(500, err);
				}
			});
	    },
	    
}


module.exports = categoryModel;