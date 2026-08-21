import express from 'express'

import { create, getAllusers } from '../controller/userController.js'

const route=express.Router()

route.post("/user",create)
route.get("/users",getAllusers)

export default route