const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/sistema", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    const msg = "ERRO! Não foi possivel conectar com o MongoDB";
    console.log("ERRO: " + msg);
  });
