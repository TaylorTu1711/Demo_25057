import express from "express";
import pool from "../db.js";



export const getMachinesByLocation = async (req, res) => {
  const { location, isdtgroup } = req.query;

  if (!location || typeof isdtgroup === 'undefined') {
    return res.status(400).json({ error: 'Missing location or isdtgroup parameter' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM machines WHERE location = $1 AND isdtgroup = $2 ORDER BY machine_name',
      [location, isdtgroup === 'true'] // chuyển về boolean
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error getting machines', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const addMachine = async (req, res) => {
  const { machine_id, machine_name, location, isdtgroup } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  
  const isDT = isdtgroup === 'true'; // Convert string to boolean

  try {
    const result = await pool.query(
      `INSERT INTO machines (machine_id, machine_name, location, image_url, isdtgroup)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [machine_id, machine_name, location, imagePath, isDT]
    );

    await pool.query(`CREATE TABLE IF NOT EXISTS "${machine_id}"  (
          id SERIAL PRIMARY KEY,
          nr INTEGER,
          machine_id VARCHAR(255),
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          shoot INTEGER,
          cycle REAL,
          time_on REAL,
          time_off REAL,
          check_get BOOL,
          product INTEGER,
          status INTEGER
      );`);

    // Tạo bảng alarm cho máy
    const alarmTable = `alarm${machine_id}`;
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "${alarmTable}" (
        id SERIAL PRIMARY KEY,
        nr INTEGER,
        machine_id VARCHAR(255),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        alarm_code TEXT,
        alarm_id TEXT,
        alarm_name TEXT,
        check_get BOOL
      );
    `);


    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding machine:', err);
    res.status(500).json({ error: 'Lỗi khi thêm máy' });
  }
};


export const deleteMachine = async (req, res) => {

  const machine_id = req.params.id;
  try {
    await pool.query('DELETE FROM alarmsmachines WHERE machine_id = $1', [machine_id]);
    await pool.query('DELETE FROM machines WHERE machine_id = $1', [machine_id]);
    await pool.query(`DROP TABLE IF EXISTS "${machine_id}"`);
    res.status(200).json({ message: 'Xoá thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi xoá máy' });
  }
};

export const getMachineByID = async (req, res) => {

  const machine_id = req.params.id;
  try {
    const machine_infor = await pool.query(`SELECT * FROM machines WHERE machine_id = $1`, [machine_id]);
    res.json(machine_infor.rows);
  } catch (err) {
    console.error(err.message);
  }
};

export const updateMachineByID = async (req, res) => {
  const machine_id = req.params.id;
  const { machine_name, location, information } = req.body;

  try {
    const result = await pool.query(
      `UPDATE machines 
       SET machine_name = $1, location = $2, information = $3 
       WHERE machine_id = $4`,
      [machine_name, location, information, machine_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Không tìm thấy máy để cập nhật' });
    }

    res.json({ message: 'Cập nhật thông tin máy thành công' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Lỗi server khi cập nhật máy' });
  }
};


