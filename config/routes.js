module.exports = (app) => {
  app.post('/signup', app.api.user.save)
  app.post('/signin', app.api.auth.signin)
  app.post('/validateToken', app.api.auth.validateToken)
  
  app.route("/users")
    .all(app.config.passaport.authenticate())
    .post(app.api.user.save)
    .get(app.api.user.get)
    
    app.route("/categories")
    .all(app.config.passaport.authenticate())
    .get(app.api.category.get)
    .post(app.api.category.save)

    app.route("/products")
    .all(app.config.passaport.authenticate())
    .get(app.api.products.get)
    .post(app.api.products.save)
    
    app.route("/brands")
    .all(app.config.passaport.authenticate())
    .get(app.api.brands.get)
    .post(app.api.brands.save)
    
    app.route("/categories/getTree")
    .all(app.config.passaport.authenticate())
    .get(app.api.category.getTree)
    
    app.route("/categories/:id")
    .all(app.config.passaport.authenticate())
    .get(app.api.category.getById)
    .put(app.api.category.save)
    .delete(app.api.category.remove)

/*     app.route("/categories/:id/products")
    /* .all(app.config.passaport.authenticate()) 
    .get(app.api.products.getByCategory) */
    
    app.route("/brands/:id")
    .all(app.config.passaport.authenticate())
    .get(app.api.brands.getById)
    .put(app.api.brands.save)
    .delete(app.api.brands.remove)
    
    app.route("/users/:id")
    .all(app.config.passaport.authenticate())
    .put(app.api.user.save)
    .get(app.api.user.getById)
    .delete(app.api.user.remove)

    app.route("/products/:id")
    .all(app.config.passaport.authenticate())
    .get(app.api.products.getById)
    .put(app.api.products.save)
    .delete(app.api.products.remove)
    
/*     app.route("/stats")
    /* .all(app.config.passaport.authenticate()) 
    .get(app.api.stat.get) */
  }

