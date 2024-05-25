import express from "express";
import { createConnection } from "mysql";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import cors from "cors";

const STATUS = {
  ERROR: "Error",
  SUCCESS: "Success",
};

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const db = createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "convit12345",
  database: "ifn666_final",
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error("error connecting:", err);
    return;
  }

  console.log(`connected as id ${db.threadId}`);
});

// Encrypt password function
const encryptPassword = (password) => {
  const salt = genSaltSync();
  return hashSync(password, salt);
};

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    `SELECT * FROM users WHERE username = ?`,
    [username],
    (err, results) => {
      if (err) {
        console.error("error running query:", err);
        res.status(500).send({ message: "Error logging in" });

        return;
      }

      if (results.length === 0) {
        res.status(401).send({ message: "Invalid username or password" });

        return;
      }

      const storedPassword = results[0].password;
      const isValid = compareSync(password, storedPassword);

      if (!isValid) {
        res.status(401).send({
          message: "Invalid username or password",
          status: STATUS.ERROR,
        });

        return;
      }

      res
        .status(200)
        .send({ message: "Logged in successfully", status: STATUS.SUCCESS });
    }
  );
});

// Register route
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const encryptedPassword = encryptPassword(password);

  db.query(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, encryptedPassword],
    (err, _results) => {
      if (err) {
        console.error("error running query:", err);
        res.status(500).send({ message: "Error registering" });
      } else {
        res.send({ message: "Registered successfully" });
      }
    }
  );
});

app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (err) {
      console.error("Error: ", err);
      res
        .status(500)
        .send({ message: "Error fetching todos", status: STATUS.ERROR });
    } else {
      res.status(200).send({ data: result, status: STATUS.SUCCESS });
    }
  });
});

// POST a new todo
app.post("/todos", (req, res) => {
  const { title, description } = req.body;
  db.query(
    "INSERT INTO todos (title, description) VALUES (?, ?)",
    [title, description],
    (err, _results) => {
      if (err) {
        console.error("error running query:", err);
        res
          .status(500)
          .send({ message: "Error creating todo", status: STATUS.ERROR });
      } else {
        res.send({
          message: "Todo created successfully",
          status: STATUS.SUCCESS,
          result: _results,
        });
      }
    }
  );
});

// GET a single todo by id
app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM todos WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("error running query:", err);
      res.status(500).send({ message: "Error fetching todo" });
    } else if (results.length === 0) {
      res.status(404).send({ message: "Todo not found" });
    } else {
      res.send(results[0]);
    }
  });
});

// UPDATE a todo
app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  db.query(
    "UPDATE todos SET title = ?, description = ? WHERE id = ?",
    [title, description, id],
    (err, results) => {
      if (err) {
        console.error("error running query:", err);
        res.status(500).send({ message: "Error updating todo" });
      } else {
        res.send({ message: "Todo updated successfully", results, status: STATUS.SUCCESS });
      }
    }
  );
});

// DELETE a todo
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM todos WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("error running query:", err);
      res.status(500).send({ message: "Error deleting todo" });
    } else {
      res.send({ message: "Todo deleted successfully", results, status: STATUS.SUCCESS });
    }
  });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
