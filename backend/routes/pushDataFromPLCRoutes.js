import express from "express";

import { pushDataFromPLC} from '../controllers/pushDataFromPLCController.js';

const pushDataFromPLCRoutes = express.Router();


pushDataFromPLCRoutes.post("/", pushDataFromPLC);



export default pushDataFromPLCRoutes;