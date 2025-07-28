const pool = require("../db");

exports.registerStudent = async (req, res) => {
  const { name, email, password, mobile, course } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO students (name, email, password, mobile, course) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, email, password, mobile, course]
    );
    res.json({ message: "Student registered", student: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
};