const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

//  Conexión a MySQL
const db = mysql.createConnection({
  host: "sql5.freesqldatabase.com",
  user: "sql5816052",
  password: "myqEiEjfc8",
  database: "sql5816052"
});

db.connect(err => {
  if (err) {
    console.log("Error conectando a MySQL:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});

// Ruta test
app.get("/", (req, res) => {
  res.send("API Trello PRO funcionando");
});

//  Listar tareas
app.get("/tareas", (req, res) => {
  const sql = "SELECT * FROM tareas ORDER BY fecha_creacion DESC";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Crear tarea
app.post("/tareas", (req, res) => {
  const { titulo, descripcion, estado, imagen_url, enlace, fecha_limite, prioridad } = req.body;

  const sql = `
    INSERT INTO tareas (titulo, descripcion, estado, imagen_url, enlace, fecha_limite, prioridad)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [titulo, descripcion, estado, imagen_url, enlace, fecha_limite, prioridad], (err, result) => {
    if (err) {
      console.log("Error crear:", err);
      return res.status(500).json(err);
    }

    res.json({ mensaje: "Tarea creada " });
  });
});

app.put("/test/:id", (req, res) => {
    console.log("PUT recibido! ID:", req.params.id, "Body:", req.body);
    res.json({ mensaje: "Funciona!" });
});


app.put("/tareas/:id/estado", (req, res) => {
  const { estado } = req.body;
  const { id } = req.params;

  console.log("ID recibido:", id, "Estado recibido:", estado);
  const sql = "UPDATE tareas SET estado=? WHERE id=?";
  db.query(sql, [estado, id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Tarea no encontrada o estado inválido" });
    }

    res.json({ mensaje: "Estado actualizado " });
  });
});



//  Editar tarea
app.put("/tareas/:id", (req, res) => {
  const { titulo, descripcion, estado, imagen_url, enlace, fecha_limite, prioridad } = req.body;
  const { id } = req.params;

  const sql = `
    UPDATE tareas 
    SET titulo=?, descripcion=?, estado=?, imagen_url=?, enlace=?, fecha_limite=?, prioridad=? 
    WHERE id=?
  `;

  db.query(sql, [titulo, descripcion, estado, imagen_url, enlace, fecha_limite, prioridad, id], (err, result) => {
    if (err) {
      console.log(" Error:", err);
      return res.status(500).json(err);
    }

    res.json({ mensaje: "Tarea actualizada " });
  });
});


//  Eliminar tarea
app.delete("/tareas/:id", (req, res) => {
  const sql = "DELETE FROM tareas WHERE id=?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Tarea eliminada 🗑" });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
