import express from "express";

import {getProductivity} from "../controllers/detailMachineController.js";

const detailMachineRoutes = express.Router();


detailMachineRoutes.get("/", getProductivity);



export default detailMachineRoutes;