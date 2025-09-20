import express from "express";

import { getErrorsMachine } from "../controllers/errorMachineController.js";

const errorsMachineRoutes = express.Router();


errorsMachineRoutes.get("/", getErrorsMachine);



export default errorsMachineRoutes;