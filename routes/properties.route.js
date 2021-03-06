const {
  PropertiesController,
} = require("../controllers/properties.controller");

const propertiesController = new PropertiesController();

module.exports = (app) => {
  /**
   * GET /
   *
   * All properties page (home page)
   */
  app.get("/", propertiesController.index);

  /**
   * GET /properties
   *
   * All properties page
   */
  app.get("/properties", propertiesController.index);

  /**
   * GET /properties/new
   *
   * New property page
   */
  app.get("/properties/new", propertiesController._new);

  /**
   * GET /properties/search
   *
   * Display search results table
   */
  app.get("/properties/search", propertiesController.search);

  /**
   * GET /properties/:id
   *
   * Single property page
   */
  app.get("/properties/:id", propertiesController.show);

  /**
   * POST /properties
   *
   * Create new property
   */
  app.post("/properties", propertiesController.create);

  /**
   * GET /properties/edit/:id
   *
   * Edit properties page
   */
  app.get("/properties/edit/:id", propertiesController.edit);

  /**
   * DELETE /properties/delete/:id
   *
   * Delete properties page
   */
  app.delete("/properties/delete/:id", propertiesController.delete);

  /**
   * PUT /properties/:id
   *
   * Update property
   */
  app.put("/properties/:id", propertiesController.update);
};
