const express = require("express");
const route = express.Router();
const {
  viewAll,
  addNew,
  addNewpost,
  edit,
  update,
  deleteConfirmation,
  deletebyId,
} = require("../controllers/processcontroller");

route.get("/viewAll", viewAll);
route.get("/addNew", addNew);
route.post("/addNew", addNewpost);
route.get("/edit", edit);
route.post("/update", update);
route.get("/delete", deleteConfirmation);
route.post("/deletebyId", deletebyId);

module.exports = route;
