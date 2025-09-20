import express from "express";
import pool from "../db.js";



export const getProductivity = async (req, res) => {
    try {
        const machine_id = req.query.machine_id;
        const productivity = await pool.query(`SELECT * FROM "${machine_id}"`);
        res.json(productivity.rows);
        //res.send("đã nhận");
    } catch (err) {
       console.error(err.message) ; 
       res.status(500).send("Lỗi server");
    }
};

