'use strict';

var path = require('path'),
    auth = require('../config/auth');

module.exports = function(app) {
  // User Routes
  var users = require('../controllers/users');
  app.post('/auth/users', users.create);
  //app.get('/auth/users/:userId', users.show);
  app.get('/auth/users/:username', users.showUserByName);  

  // Check if username is available
  // todo: probably should be a query on users
  app.get('/auth/check_username/:username', users.exists);

  // Session Routes
  var session = require('../controllers/session');
  app.get('/auth/session', auth.ensureAuthenticated, session.session);
  app.post('/auth/session', session.login);
  app.del('/auth/session', session.logout);

  // Blog Routes
  var blogs = require('../controllers/blogs');
  app.get('/api/blogs', blogs.all);
  app.post('/api/blogs', auth.ensureAuthenticated, blogs.create);
  app.get('/api/blogs/:blogId', blogs.show);
  app.put('/api/blogs/:blogId', auth.ensureAuthenticated, auth.blog.hasAuthorization, blogs.update);
  app.del('/api/blogs/:blogId', auth.ensureAuthenticated, auth.blog.hasAuthorization, blogs.destroy);  
  app.get('/api/generateBlogId', auth.ensureAuthenticated, blogs.generateBlogId);
  app.get('/api/profile/:username', blogs.blogsByUserName);

  //Setting up the blogId param
  app.param('blogId', blogs.blog);

  //Category routes.
  var categories = require('../controllers/categories');
  app.get('/api/categories', categories.getAllCategories);
  app.get('/api/categories/:categoryId', categories.getCategoryById);
  app.post('/api/categories', auth.ensureAuthenticated, categories.create);
  
  var images =  require('../controllers/image.js');
  images.createRoutes(app);
  
  // Angular Routes
  app.get('/partials/*', function(req, res) {
    var requestedView = path.join('./', req.url);
    res.render(requestedView);
  });

  app.get('/*', function(req, res) {	  
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.user_info));
    }
    
    res.render('index.html');
  });

}