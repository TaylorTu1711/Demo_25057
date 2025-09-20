import express from "express";
import helmet from 'helmet';
import morgan from 'morgan';
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db.js";
import { fileURLToPath } from 'url';
import path from "path";

import statusRoutes from "./routes/statusMachineRoute.js";
import detailMachineRoutes from "./routes/detailMachineRoutes.js";
import machinesRoutes from "./routes/machinesRoutes.js"
import locationRoutes from "./routes/locationRoutes.js";
import errorMachineRoutes from "./routes/errorMachineRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pushDataFromPLCRoutes from "./routes/pushDataFromPLCRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




app.use(express.json());
app.use(cors());
app.use(helmet()); //helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev")); //log the requests


app.use("/api/detailMachine", detailMachineRoutes);
app.use("/api/machines", machinesRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/errorsmachine", errorMachineRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/pushData", pushDataFromPLCRoutes);

//app.use("/api/pushdata",pushDataFromPLCRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, path) => {
    res.set('Access-Control-Allow-Origin', '*'); // hoặc origin cụ thể
    res.set('Cross-Origin-Resource-Policy', 'cross-origin'); // Cho phép tải ảnh từ domain khác
  }
}));


async function initDB() {
   try {
      await pool.query(`
         CREATE TABLE IF NOT EXISTS machines (
            machine_id TEXT PRIMARY KEY,
            machine_name VARCHAR(255),     
            location VARCHAR(255),
            image_url TEXT,
            isdtgroup BOOLEAN,
            status INT,
            last_updated TIMESTAMP,
            information TEXT
         );

         CREATE TABLE IF NOT EXISTS alarmsmachines (
            id SERIAL PRIMARY KEY,
            nr INT,     
            machine_id TEXT,
            timestamp TIMESTAMP,
            alarm_code INT,
            alarm_id INT,
            alarm_name TEXT,
            check_get BOOLEAN
         );

         CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255),
            password VARCHAR(255),
            role_id INT,
            created_at TIMESTAMP
         );
      `);
      console.log("✅ Database initialized");
   } catch (error) {
      console.log("Error init DB", error);
   }
}


initDB().then(() => {
   app.listen(PORT, () => {
   console.log("server is running on port " + PORT); 
})
})