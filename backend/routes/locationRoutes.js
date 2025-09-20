import express from "express";
import { getLocations } from "../controllers/locationController.js";


const locationRoutes = express.Router();

locationRoutes.get("/", getLocations);



export default locationRoutes;