import express from "express";
import pool from "../db.js";

export const getLocations = async (req, res) => {
  try {
    const dtGroup = await pool.query(
      "SELECT DISTINCT location FROM machines WHERE isdtgroup = true"
    );
    const nonDtGroup = await pool.query(
      "SELECT DISTINCT location FROM machines WHERE isdtgroup = false OR isdtgroup IS NULL"
    );

    res.json({
      dtGroup: dtGroup.rows,
      nonDtGroup: nonDtGroup.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
