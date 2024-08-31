import express from 'express'
import {Menu} from "../controllers/menu";

const menuRouter = express.Router()

menuRouter.post('/menu/set', Menu.setItem)
menuRouter.get('/menu', Menu.getAll)
menuRouter.get('/menu/beverages', Menu.getBeverages)
menuRouter.get('/menu/dishes', Menu.getDishes)

export default menuRouter