import express from "express";
import pool from "../db.js";



export const getErrorsMachine = async (req, res) => {
    try {
        const machine_id = req.query.machine_id;
        const errorsMahcine = await pool.query(`SELECT * FROM alarmsmachines WHERE machine_id = $1`, [machine_id]);
        res.json(errorsMahcine.rows);
    } catch (err) {
       console.error(err.message) ; 
    }
};