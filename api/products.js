const queries = require('./queries');

module.exports = (app) => {
  const { existsOrError } = app.api.validation;

  const save = (req, res) => {
    console.log("SAVE PRODUCT: " +JSON.stringify(req.body));
    
    let product = { ...req.body };
    
    if (product.id) product.id = req.params.id;

/*     try {
      existsOrError(product.name, "Nome não informado");
      existsOrError(product.buyPrice, "Preço de compra não informado");
      existsOrError(product.taxes, "Impostos não informado");
      existsOrError(product.sellPrice, "Preço de venda não informado");
      existsOrError(product.qtd, "Quantidade não informada");
      existsOrError(product.model, "Modelo não informada");
    } catch (err) {
      return res.status(400).send(err);
    } */

    if (product.id) {
      app
        .db("products")
        .update(product)
        .where({ id: product.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("products")
        .insert(product)
        .then(_ => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "Codigo da categoria não informado!");

      const rowsDeleted = await app
        .db("products")
        .where({ id: req.params.id })
        .del();
      existsOrError(rowsDeleted, "Produto não encontrado!");

      res.status(204).send();
    } catch (err) {
      res.status(400).send(err);
    }
  };
  
  const get = async (req, res) => {
    app
      .db("products")
      .select()
      .then((products) => res.json({data: products }))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    app
      .db("products")
      .where({ id: req.params.id })
      .first()
      .then((product) => {
        product.content = product.content.toString()
        return res.json(product);
      })
      .catch((err) => res.status(500).send(err));
  };

  const getByCategory = async (req, res) => {
    const categoryId = req.params.id
    const page = req.query.page || 1
    const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
    const ids = categories.rows.map(c => c.id)

    app.db('products')
    .select('id', 'name', 'desc', 'sellPrice', 'qtd', 'imageUrl')
    .whereIn('categoryId', ids)
    .orderBy('id', 'desc')
    .then(products => res.json(products))
    .catch(err => res.status(500).send(err))

  }

  return { save, get, getById, remove, getByCategory };
};
