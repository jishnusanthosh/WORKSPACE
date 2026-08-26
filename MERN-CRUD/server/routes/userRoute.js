import express from "express";

import {
  create,
  deleteUser,
  gerUserByid,
  getAllusers,
  update,
} from "../controller/userController.js";

const route = express.Router();

route.post("/user", create);
route.get("/users", getAllusers);
route.ger("/user/:id", gerUserByid);
route.put("/update/user/:id", update);
route.delete("/delete/user/:id", deleteUser);

export default route;
