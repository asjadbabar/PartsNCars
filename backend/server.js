const db = require("./connection");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const JWT_SECRET = "hello";
const path = require("path");
const multer = require("multer");

app.use(cors());
app.use(express.json());

// Serve static files from the "uploads" directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.post("/signup", async (req, res) => {
  //console.log(req.body);
  const { name, password, phone, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    const sql =
      "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)";
    const values = [name, email, hashedPassword, phone];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({ error: "Database error" });
      } else {
        //console.log(result.body);
        res.status(200).json({ message: "User inserted successfully" });
      }
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong,internal server error" });
  }
});

// ✅ Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0)
      return res.status(401).json({ error: "Invalid credentials" });

    const user = results[0];
  console.log(user)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
    // const data={ userId: user.id, email: user.email };
    const token = jwt.sign({ userId: user.id, email: user.email ,name:user.name}, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  });
});

app.get("/home", authenticateToken, (req, res) => {
  console.log(req.user);
  res.json({ message: `Welcome, ${req.user.name}` });
});

// ✅ Middleware for token verification
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user;
    next();
  });
}

app.get("/listing", authenticateToken, (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ products: results });
  });
});

//new work
app.get("/my-products", authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const sql = "SELECT * FROM products WHERE user_id = ?";

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ products: results });
  });
});

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
// Add new product

// app.post(
//   "/add-product",
//   authenticateToken,
//   upload.single("image"),
//   (req, res) => {
//     console.log(req.body);
//     const userId = req.user.userId;
//     const { title, description, category, brand, model, year, price } =
//       req.body;

//     // Handle file upload (you'll need multer for this)
//     const image = req.file ? `/uploads/${req.file.filename}` : null;

//     const sql = `INSERT INTO products 
//     (user_id, title, description, category, brand, model, year, price, image) 
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`;

//     const values = [
//       userId,
//       title,
//       description,
//       category,
//       brand,
//       model,
//       year,
//       price,
//       image,
//     ];

//     db.query(sql, values, (err, result) => {
//       if (err) return res.status(500).json({ error: "Database error" });
//       res
//         .status(201)
//         .json({
//           message: "Product added successfully",
//           productId: result.insertId,
//         });
//     });
//   }
// );


app.post(
  "/add-product",
  authenticateToken,
  upload.single("image"),
  (req, res) => {
    console.log(req.body);
    const userId = req.user.userId;
    const {
      title,
      description,
      category,
      brand,
      model,
      year,
      price,
      quantity, // ✅ New field from form
    } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    // Decide SQL based on whether quantity is provided
    let sql, values;

    if (quantity !== undefined && quantity !== '') {
      // ✅ Use provided quantity
      sql = `INSERT INTO products 
        (user_id, title, description, category, brand, model, year, price, image, quantity) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      values = [
        userId,
        title,
        description,
        category,
        brand,
        model,
        year,
        price,
        image,
        quantity,
      ];
    } else {
      // ✅ Use default quantity (defined in DB schema)
      sql = `INSERT INTO products 
        (user_id, title, description, category, brand, model, year, price, image) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      values = [
        userId,
        title,
        description,
        category,
        brand,
        model,
        year,
        price,
        image,
      ];
    }

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database error" });
      }

      res.status(201).json({
        message: "Product added successfully",
        productId: result.insertId,
      });
    });
  }
);

// ✅ Delete product route
app.delete("/delete-product/:id", authenticateToken, (req, res) => {
  const productId = req.params.id;
  const userId = req.user.userId;

  // First, check if the product belongs to the user
  const checkSql = "SELECT * FROM products WHERE id = ? AND user_id = ?";
  db.query(checkSql, [productId, userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "Product not found or unauthorized" });
    }

    // If found, delete it
    const deleteSql = "DELETE FROM products WHERE id = ? AND user_id = ?";
    db.query(deleteSql, [productId, userId], (err, result) => {
      if (err) {
        console.error("Error deleting product:", err);
        return res.status(500).json({ error: "Failed to delete product" });
      }

      res.json({ message: "Product deleted successfully" });
    });
  });
});

app.put(
  "/UpdateProduct/:id",
  authenticateToken,
  upload.single("image"),
  (req, res) => {
    const productId = req.params.id;
    const userId = req.user.userId;
    const { title, description, category, brand, model, year, price } =
      req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    let sql = `
    UPDATE products 
    SET title = ?, description = ?, category = ?, brand = ?, model = ?, year = ?, price = ?
  `;

    const values = [title, description, category, brand, model, year, price];

    if (image) {
      sql += `, image = ?`;
      values.push(image);
    }

    sql += ` WHERE id = ? AND user_id = ?`;
    values.push(productId, userId);

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error updating product:", err);
        return res.status(500).json({ error: "Database error" });
      }

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Product not found or not authorized" });
      }

      res.status(200).json({ message: "Product updated successfully" });
    });
  }
);

//cart apiis /////////////////=======
// Correct route: /add-to-cart (POST)
app.post("/add-to-cart", authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const { product: productId } = req.body;
  console.log(productId);
  if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  const checkSql = "SELECT * FROM carts WHERE user_id = ? AND product_id = ?";
  db.query(checkSql, [userId, productId], (err, results) => {
    if (err) {
      console.error("Check SQL Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length > 0) {
      const updateSql =
        "UPDATE carts SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?";
      db.query(updateSql, [userId, productId], (err2) => {
        if (err2) {
          console.error("Update SQL Error:", err2);
          return res.status(500).json({ error: "Failed to update quantity" });
        }
        return res.json({ message: "Quantity updated in cart" });
      });
    } else {
      const insertSql =
        "INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, 1)";
      db.query(insertSql, [userId, productId], (err3) => {
        if (err3) {
          console.error("Insert SQL Error:", err3);
          return res.status(500).json({ error: "Failed to add to cart" });
        }
        return res.json({ message: "Product added to cart" });
      });
    }
  });
});

/// Api for update
app.patch("/cart/update-quantity", authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const { productId, change } = req.body;

  if (!productId || ![1, -1].includes(change)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const getSql =
    "SELECT quantity FROM carts WHERE user_id = ? AND product_id = ?";
  db.query(getSql, [userId, productId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0)
      return res.status(404).json({ error: "Item not found" });
//console.log(results);
    const currentQty = results[0].quantity;
    const newQty = currentQty + change;
console.log(newQty);
    if (newQty < 1)
      return res.status(400).json({ error: "Quantity cannot be less than 1" });

    const updateSql =
      "UPDATE carts SET quantity = ? WHERE user_id = ? AND product_id = ?";
    db.query(updateSql, [newQty, userId, productId], (err2) => {
      if (err2) return res.status(500).json({ error: "Update failed" });
      res.json({ message: "Quantity updated",quantity:newQty });
    });
  });
});

// Get user's cart
app.get("/cart", authenticateToken, (req, res) => {
  console.log("Decoded JWT payload:", req.user); // Add this
  const userId = req.user.userId;
  console.log(userId);
  const sql = `SELECT p.*, c.quantity FROM carts c 
JOIN products p ON c.product_id = p.id 
WHERE c.user_id = ?`;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    console.log(results);
    res.json({ cart: results });
  });
});

// DELETE /cart/remove/:productId
app.delete("/cart/remove/:productId", authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const productId = req.params.productId;

  const sql = "DELETE FROM carts WHERE user_id = ? AND product_id = ?";

  db.query(sql, [userId, productId], (err, result) => {
    if (err) {
      console.error("Error removing from cart:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.json({ message: "Item removed from cart" });
  });
});


app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
