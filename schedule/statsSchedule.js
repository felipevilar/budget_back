const schedule = require("node-schedule");

module.exports = (app) => {
  schedule.scheduleJob('*/1 * * * *', async function () {
    const usersCount = await app.db("users").count("id").first();
    const categoriesCount = await app.db("categories").count("id").first();
    const productsCount = await app.db("products").count("id").first();

    const { Stat } = app.api.stat;

    const lastStat = await Stat.findOne({}, {}, { sort: { createdAt: -1 } });

    const stat = new Stat({
      users: usersCount.count,
      categories: categoriesCount.count,
      products: productsCount.count,
      createdAt: new Date(),
    });

    const changeUser = !lastStat || stat.users !== lastStat.users;
    const changeCategories =
      !lastStat || stat.categories !== lastStat.categories;
    const changeProducts = !lastStat || stat.products !== lastStat.products;

    if (changeUser || changeCategories || changeProducts) {
      stat.save().then(() => console.log("[Stats] Estatisticas Atualizadas!"));
    }
  });
};
