const db = require('./connection');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const JWT_SECRET = 'hello'; 
const path = require('path');
const multer=require('multer');

app.use(cors());
app.use(express.json());

// Serve static files from the "uploads" directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.post('/signup',async (req, res) => {
  //console.log(req.body);
  const { name, password, phone, email } = req.body;
  try 
  {
    
    const hashedPassword = await bcrypt.hash(password,5);
    const sql = 'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)';
    const values = [name, email, hashedPassword, phone];
    
    db.query(sql, values, (err, result) => {
    if (err) 
    {
      console.error('Error inserting user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
     else 
    {
        //console.log(result.body);
      res.status(200).json({ message: 'User inserted successfully' });
    }
  });
}
catch(err)
{
res.status(500).json({ error: 'Something went wrong,internal server error' });
}
});



// ✅ Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
  
      const user = results[0];
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
     // const data={ userId: user.id, email: user.email };
      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ message: 'Login successful', token });
    });
  });


app.get('/home', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.email}` });
});

// ✅ Middleware for token verification
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user;
    next();
  });
}

app.get('/listing', authenticateToken, (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ products: results });
  });
});

//new work
app.get('/my-products', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const sql = 'SELECT * FROM products WHERE user_id = ?';
  
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json({ products: results });
  });
});


// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });
// Add new product


app.post('/add-product', authenticateToken, upload.single('image'), (req, res) => {

 console.log(req.body);
  const userId = req.user.userId;
  const { title, description, category, brand, model, year, price } = req.body;
  
  // Handle file upload (you'll need multer for this)
  const image = req.file ? `/uploads/${req.file.filename}`: null;
  
  const sql = `INSERT INTO products 
    (user_id, title, description, category, brand, model, year, price, image) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`;
  
  const values = [userId,title, description, category, brand, model, year, price, image];
  
  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
  });
});


// ✅ Delete product route
app.delete('/delete-product/:id', authenticateToken, (req, res) => {
  const productId = req.params.id;
  const userId = req.user.userId;

  // First, check if the product belongs to the user
  const checkSql = 'SELECT * FROM products WHERE id = ? AND user_id = ?';
  db.query(checkSql, [productId, userId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }

    // If found, delete it
    const deleteSql = 'DELETE FROM products WHERE id = ? AND user_id = ?';
    db.query(deleteSql, [productId, userId], (err, result) => {
      if (err) {
        console.error('Error deleting product:', err);
        return res.status(500).json({ error: 'Failed to delete product' });
      }

      res.json({ message: 'Product deleted successfully' });
    });
  });
});


app.put('/UpdateProduct/:id', authenticateToken, upload.single('image'), (req, res) => {
  const productId = req.params.id;
  const userId = req.user.userId;
  const { title, description, category, brand, model, year, price } = req.body;
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
      console.error('Error updating product:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found or not authorized' });
    }

    res.status(200).json({ message: 'Product updated successfully' });
  });
});


app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

