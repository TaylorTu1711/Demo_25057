import express from "express";
import pool from "../db.js";

export const getStatus = async (req, res) => {
    
    try {
        const machine_id = req.query.machine_id;
        const status = await pool.query(`
      SELECT 
        machine_name,
        status
      FROM 
        machines
      WHERE 
        machine_id = $1
    `, [machine_id]);
        res.json(status.rows);
    } catch (err) {
        console.error(err.message) ;
    }
};

