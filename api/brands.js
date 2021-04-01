module.exports = (app) => {
    const { existsOrError, notExistsOrError, equalOrError } = app.api.validation;
  
    const save = (req, res) => {
      const brand = { ...req.body };
  
      if (req.params.id) brand.id = req.params.id;
  
      try {
        existsOrError(brand.name, "Nome não informado!");
      } catch (err) {
        return res.status(400).send(err);
      }
  
      if (brand.id) {
        app
          .db("brands")
          .update(brand)
          .where({ id: brand.id })
          .then((_) => res.status(204).send())
          .catch((err) => res.status(500).send(err));
      } else {
        app
          .db("brands")
          .insert(brand)
          .then((_) => res.status(204).send())
          .catch((err) => res.status(500).send(err));
      }
    };
  
    const remove = async (req, res) => {
      try {
        existsOrError(req.params.id, "Codigo da marca não informado!");
  
        const products = await app
          .db("products")
          .where({ brandId: req.params.id });
        notExistsOrError(products, "Marca possui Produtos associados!");
  
        const rowsDeleted = await app
          .db("brands")
          .where({ id: req.params.id })
          .del();
        existsOrError(rowsDeleted, "Marca não encontrada!");
        res.status(204).send();
      } catch (err) {
        res.status(400).send(err);
      }
    };
  
    const get = (req, res) => {
      app
        .db("brands")
        .then((brands) => res.json(brands))
        .catch((err) => res.status(500).send(err));
    };
  
    const getById = (req, res) => {
      app
        .db("brands")
        .where({ id: req.params.id })
        .first()
        .then((brand) => res.json(brand))
        .catch((err) => res.status(500).send(err));
    };
  
    return { save, get, getById, remove };
  };
  