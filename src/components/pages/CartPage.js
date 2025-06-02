// // src/pages/CartPage.js
// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import 'bootstrap-icons/font/bootstrap-icons.css';

// function CartPage() {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [status, setStatus] = useState(null); // success or error message
//   const navigate = useNavigate();

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     const fetchCart = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/cart', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();
//         console.log(data);
//         setCartItems(data.cart || []);
//       } catch (err) {
//         setError('Failed to load cart.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, [navigate, token]);

//   const updateQuantity = async (productId, change) => {
//     const item = cartItems.find(p => p.product_id === productId);
//     if (!item) return;

//     const newQuantity = item.quantity + change;
//     if (newQuantity < 1) return;

//     try {
//       const res = await fetch('http://localhost:5000/cart/update-quantity', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ productId, change }),
//       });

//       if (!res.ok) throw new Error('Failed to update quantity');

//       // Update local state
//       setCartItems(prev =>
//         prev.map(p =>
//           p.product_id === productId ? { ...p, quantity: newQuantity } : p
//         )
//       );

//       setStatus({ type: 'success', message: 'Quantity updated' });
//     } catch (err) {
//       setStatus({ type: 'error', message: err.message });
//     } finally {
//       setTimeout(() => setStatus(null), 3000);
//     }
//   };

//   const removeItem = async (productId) => {
//     try {
//       const res = await fetch(`http://localhost:5000/cart/remove/${productId}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) throw new Error('Failed to remove item');

//       setCartItems(prev => prev.filter(p => p.product_id !== productId));
//       setStatus({ type: 'success', message: 'Item removed from cart' });
//     } catch (err) {
//       setStatus({ type: 'error', message: err.message });
//     } finally {
//       setTimeout(() => setStatus(null), 3000);
//     }
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
//   };

//   if (!token) return null;

//   if (loading) {
//     return (
//       <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//         <div className="spinner-border text-success" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mt-5 pt-5 text-center">
//         <div className="alert alert-danger">{error}</div>
//       </div>
//     );
//   }

//   if (cartItems.length === 0) {
//     return (
//       <div className="container mt-5 pt-5 text-center">
//         <div className="alert alert-info">
//           Your cart is empty. <Link to="/products" className="alert-link">Shop now</Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-5 pt-5">
//       <h2 className="text-center text-success fw-bold mb-4">Your Cart</h2>

//       {status && (
//         <div className={`alert text-center ${status.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
//           {status.message}
//         </div>
//       )}

//       <div className="row">
//         <div className="col-lg-9">
//           {cartItems.map(item => (
//             <div key={item.productId} className="card mb-3 shadow-sm">
//               <div className="row g-0 align-items-center">
//                 <div className="col-md-3">
//                   <img
//                     src={`http://localhost:5000/${item.image_url}`}
//                     className="img-fluid rounded-start"
//                     alt={item.name}
//                     style={{ height: '120px', objectFit: 'cover' }}
//                   />
//                 </div>
//                 <div className="col-md-5">
//                   <div className="card-body">
//                     <h5 className="card-title fw-bold">{item.name}</h5>
//                     <p className="card-text text-muted">Price: ${item.price}</p>
//                     <div className="d-flex align-items-center gap-2 mt-2">
//                       <button
//                         className="btn btn-outline-secondary btn-sm"
//                         onClick={() => updateQuantity(item.productId, -1)}
//                         disabled={item.quantity <= 1}
//                       >
//                         <i className="bi bi-dash"></i>
//                       </button>
//                       <span className="fw-bold">{item.quantity}</span>
//                       <button
//                         className="btn btn-outline-secondary btn-sm"
//                         onClick={() => updateQuantity(item.product_id, 1)}
//                       >
//                         <i className="bi bi-plus"></i>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
//                   <h5 className="text-success fw-bold">${(item.quantity * item.price).toFixed(2)}</h5>
//                   <button className="btn btn-outline-danger btn-sm mt-2" onClick={() => removeItem(item.product_id)}>
//                     <i className="bi bi-trash"></i> Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="col-lg-3">
//           <div className="card p-3 shadow-sm sticky-top" style={{ top: '80px' }}>
//             <h4 className="text-center text-success">Order Summary</h4>
//             <ul className="list-group list-group-flush my-2">
//               <li className="list-group-item d-flex justify-content-between">
//                 Total Items
//                 <span>{cartItems.length}</span>
//               </li>
//               <li className="list-group-item d-flex justify-content-between fw-bold">
//                 Total
//                 <span>${calculateTotal()}</span>
//               </li>
//             </ul>
//             <Link to="/checkout" className="btn btn-success btn-lg mt-3 w-100">
//               Proceed to Checkout
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CartPage;



// // src/components/CartPage.js
// import React, { useEffect, useState } from 'react'; // Added useState for local status messages
// import { useCart } from '../../contexts/CartContext';
// import { useAuth } from '../../contexts/AuthContext';
// import { Link, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// function CartPage() {
//   const { cartItems, loadingCart, cartError, fetchCart, updateCartQuantity, removeFromCart } = useCart();
//   const { isLoggedIn } = useAuth();
//   const navigate = useNavigate();
//   const [localStatus, setLocalStatus] = useState(null); // For local success/error messages

//   useEffect(() => {
//     if (!isLoggedIn) {
//       navigate('/login');
//       return;
//     }
//     fetchCart();
//   }, [isLoggedIn, navigate, fetchCart]);

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
//   };

//   const handleUpdateQuantity = async (productId, currentQuantity, change) => {
//     const newQuantity = currentQuantity + change;
//     setLocalStatus(null); // Clear previous status

//     // Optional: Prevent increasing beyond stock (assuming stock_quantity is available from cartItems)
//     const product = cartItems.find(item => item.product_id === productId);
//     if (product && newQuantity > product.stock_quantity) {
//         setLocalStatus({ type: 'error', message: 'Cannot add more than ${product.stock_quantity} in stock.' });
//         setTimeout(() => setLocalStatus(null), 3000);
//         return;
//     }

//     const success = await updateCartQuantity(productId, newQuantity);
//     if (success) {
//       setLocalStatus({ type: 'success', message: 'Cart updated successfully!' });
//     } else {
//       setLocalStatus({ type: 'error', message: cartError || 'Failed to update quantity.' });
//     }
//     setTimeout(() => setLocalStatus(null), 3000);
//   };

//   const handleRemoveItem = async (productId) => {
//     setLocalStatus(null); // Clear previous status
//     const success = await removeFromCart(productId);
//     if (success) {
//       setLocalStatus({ type: 'success', message: 'Item removed from cart!' });
//     } else {
//       setLocalStatus({ type: 'error', message: cartError || 'Failed to remove item.' });
//     }
//     setTimeout(() => setLocalStatus(null), 3000);
//   };


//   if (!isLoggedIn) {
//     return null; // Redirect handled by useEffect
//   }

//   if (loadingCart) {
//     return (
//       <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', paddingTop: '70px' }}>
//         <div className="spinner-border text-success" role="status">
//           <span className="visually-hidden">Loading cart...</span>
//         </div>
//       </div>
//     );
//   }

//   if (cartError) {
//     return (
//       <div className="container mt-5 pt-5 text-center">
//         <div className="alert alert-danger" role="alert">
//           Error loading cart: {cartError}
//         </div>
//       </div>
//     );
//   }

//   if (cartItems.length === 0) {
//     return (
//       <div className="container mt-5 pt-5 text-center">
//         <div className="alert alert-info" role="alert">
//           Your cart is empty. <Link to="/products" className="alert-link">Start shopping!</Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mt-5 pt-5 mb-5">
//       <h2 className="text-center text-success mb-4 fw-bold">Your Shopping Cart</h2>

//       {localStatus && (
//         <div className={alert `${localStatus.type === 'success' ? 'alert-success' : 'alert-danger'}` text-center mb-4}>
//           {localStatus.message}
//         </div>
//       )}

//       <div className="row">
//         <div className="col-lg-9">
//           {cartItems.map((item) => (
//             <div key={item.cart_item_id} className="card mb-3 shadow-sm">
//               <div className="row g-0 align-items-center">
//                 <div className="col-md-3">
//                   <img
//                     src={http://localhost:5000/${item.image_url}}
//                     className="img-fluid rounded-start"
//                     alt={item.name}
//                     style={{ height: '120px', width: '100%', objectFit: 'cover' }}
//                   />
//                 </div>
//                 <div className="col-md-5"> {/* Adjusted column size */}
//                   <div className="card-body">
//                     <h5 className="card-title fw-bold text-dark">{item.name}</h5>
//                     <p className="card-text text-muted mb-1" style={{ fontSize: '0.9rem' }}>
//                       Price: ${parseFloat(item.price).toFixed(2)}
//                     </p>
//                     {/* Quantity controls */}
//                     <div className="d-flex align-items-center mt-2">
//                         <button
//                             className="btn btn-outline-secondary btn-sm"
//                             onClick={() => handleUpdateQuantity(item.product_id, item.quantity, -1)}
//                             disabled={item.quantity <= 1} // Disable if quantity is 1
//                         >
//                             <i className="bi bi-dash"></i>
//                         </button>
//                         <span className="mx-2 fw-bold">{item.quantity}</span>
//                         <button
//                             className="btn btn-outline-secondary btn-sm"
//                             onClick={() => handleUpdateQuantity(item.product_id, item.quantity, 1)}
//                             disabled={item.quantity >= item.stock_quantity} // Disable if at max stock
//                         >
//                             <i className="bi bi-plus"></i>
//                         </button>
//                         {item.stock_quantity < item.quantity + 1 && ( // Show stock warning if at limit
//                             <small className="ms-2 text-danger">Max stock reached</small>
//                         )}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-4 d-flex flex-column align-items-center justify-content-center"> {/* Adjusted column size */}
//                   <h4 className="text-success fw-bold">${(parseFloat(item.price) * item.quantity).toFixed(2)}</h4>
//                   <button
//                     className="btn btn-outline-danger btn-sm mt-2"
//                     onClick={() => handleRemoveItem(item.product_id)}
//                   >
//                     <i className="bi bi-trash"></i> Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="col-lg-3">
//           <div className="card shadow-sm p-3 sticky-top" style={{ top: '80px' }}> {/* sticky-top for summary */}
//             <h4 className="mb-3 text-center text-success">Order Summary</h4>
//             <ul className="list-group list-group-flush">
//               <li className="list-group-item d-flex justify-content-between align-items-center">
//                 Total Items
//                 <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
//               </li>
//               <li className="list-group-item d-flex justify-content-between align-items-center fw-bold fs-5">
//                 Cart Total
//                 <span>${calculateTotal()}</span>
//               </li>
//             </ul>
//             <Link to="/checkout" className="btn btn-success btn-lg mt-3">
//               Proceed to Checkout
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CartPage;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   const fetchCartItems = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/cart', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
      
//       const data = await res.json();
//       console.log(data);
//       setCartItems(data.cart || []);
//     } catch (err) {
//       console.error('Error fetching cart items:', err);
//     }
//   };

//   const updateQuantity = async (productId, change) => {
//   const product = cartItems.find(item => item.id === productId);
//   if (!product || (product.quantity <= 1 && change === -1)) return;

//   try {
//     const res = await fetch('http://localhost:5000/cart/update-quantity', {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ productId, change }),
//     });

//     if (!res.ok) throw new Error('Failed to update quantity');

//     // ✅ Get the updated quantity from backend
//     const data = await res.json();
//     const updatedQty = data.quantity;
//     // ✅ Update state locally using new quantity
//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.id === productId
//           ? { ...item, quantity: updatedQty }
//           : item
//       )
//     );
//   } catch (err) {
//     console.error(err.message);
//   }
// };

//   const handleRemoveFromCart = async (productId) => {
//     try {
//       await fetch(`http://localhost:5000/cart/remove/${productId}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setCartItems(prev => prev.filter(item => item.id !== productId));
//     } catch (err) {
//       console.error('Failed to remove item from cart:', err);
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   return (
//     <div className="container py-5">
//       <motion.h2
//         className="text-center mb-4 fw-bold"
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         🛒 My Cart
//       </motion.h2>

//       {cartItems.length === 0 ? (
//         <p className="text-center">Your cart is empty.</p>
//       ) : (
//         <div className="d-flex flex-wrap gap-4 justify-content-center">
//           {cartItems.map(product => {
//   console.log(`Product: ${product.title}, Quantity: ${product.quantity}`);

//   return (
//     <motion.div
//       key={product.id}
//       className="card shadow-sm p-3 rounded-4"
//       style={{ width: '100%', maxWidth: '300px' }}
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.4 }}
//     >
//       {product.image && (
//         <img
//           src={`http://localhost:5000${product.image}`}
//           className="card-img-top rounded-3"
//           alt={product.title}
//           style={{ height: '180px', objectFit: 'cover' }}
//         />
//       )}
//       <div className="card-body text-center">
//         <h5 className="card-title">{product.title}</h5>
//         <p className="card-text text-muted">{product.model}</p>
//         <p className="fw-bold text-primary">{product.price}</p>

//         <div className="d-flex justify-content-center align-items-center gap-2 my-2">
//           <button
//             className="btn btn-sm btn-outline-secondary"
//             onClick={() => updateQuantity(product.id, -1)}
//             disabled={product.quantity <= 1}
//           >
//             −
//           </button>
//           <span className="fw-bold">{product.quantity}</span>
//           <button
//             className="btn btn-sm btn-outline-secondary"
//             onClick={() => updateQuantity(product.id, 1)}
//           >
//             +
//           </button>
//         </div>

//         <div className="d-flex justify-content-around mt-3">
//           <button
//             className="btn btn-sm btn-outline-primary"
//             onClick={() => navigate(`/product/${product.id}`)}
//           >
//             View
//           </button>
//           <button
//             className="btn btn-sm btn-outline-danger"
//             onClick={() => handleRemoveFromCart(product.id)}
//           >
//             Remove
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// })}

//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchCartItems = async () => {
    try {
      const res = await fetch('http://localhost:5000/cart', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCartItems(data.cart || []);
    } catch (err) {
      console.error('Error fetching cart items:', err);
    }
  };

  const updateQuantity = async (productId, change) => {
    const product = cartItems.find(item => item.id === productId);
    if (!product || (product.quantity <= 1 && change === -1)) return;

    try {
      const res = await fetch('http://localhost:5000/cart/update-quantity', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, change }),
      });

      const data = await res.json();
      const updatedQty = data.quantity;

      setCartItems(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity: updatedQty } : item
        )
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleRemoveFromCart = async productId => {
    try {
      await fetch(`http://localhost:5000/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(prev => prev.filter(item => item.id !== productId));
    } catch (err) {
      console.error('Failed to remove item from cart:', err);
    }
  };

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000, #8B0000)',
        padding: '30px 0',
        color: 'white',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      <Container>
        <motion.h2
          className="text-center fw-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ fontSize: '1.8rem' }}
        >
          🛒 My Cart
        </motion.h2>

        {cartItems.length === 0 ? (
          <p className="text-center fs-5">Your cart is empty.</p>
        ) : (
          <Row>
            <Col lg={7}>
              <Row className="g-3">
                {cartItems.map(product => (
                  <Col xs={12} md={6} key={product.id}>
                    <motion.div
                      className="p-2 rounded-3 d-flex align-items-center shadow-sm"
                      style={{ backgroundColor: '#222', border: '1px solid #8B0000' }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {product.image && (
                        <img
                          src={`http://localhost:5000${product.image}`}
                          alt={product.title}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                            borderRadius: '6px',
                            marginRight: '12px',
                          }}
                        />
                      )}
                      <div style={{ flex: 1 }}>
                        <h6 className="mb-1" style={{ fontWeight: '600' }}>
                          {product.title}
                        </h6>
                        <small className="text-muted">{product.model}</small>
                        <p className="mb-1 fw-semibold" style={{ color: '#f5c6cb' }}>
                          ${Number(product.price).toFixed(2)}
                        </p>

                        <div className="d-flex align-items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline-light"
                            onClick={() => updateQuantity(product.id, -1)}
                            disabled={product.quantity <= 1}
                            style={{ padding: '0 8px', lineHeight: 1 }}
                          >
                            −
                          </Button>
                          <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: '600' }}>
                            {product.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline-light"
                            onClick={() => updateQuantity(product.id, 1)}
                            style={{ padding: '0 8px', lineHeight: 1 }}
                          >
                            +
                          </Button>

                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleRemoveFromCart(product.id)}
                            style={{ marginLeft: 'auto', padding: '0 8px', fontSize: '0.75rem' }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </Col>

            <Col lg={5}>
              <Card
                className="p-3 rounded-3 shadow-sm"
                style={{ backgroundColor: '#222', border: '1px solid #8B0000', color: 'white' }}
              >
                <h5 className="fw-bold mb-3 text-center" style={{ color: '#f5c6cb' }}>
                  🧾 Order Summary
                </h5>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {cartItems.map(item => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between mb-2"
                      style={{ fontSize: '0.9rem' }}
                    >
                      <div>
                        {item.title} × {item.quantity}
                      </div>
                      <div>${(Number(item.price) * item.quantity).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
                <hr style={{ borderColor: '#8B0000' }} />
                <div className="d-flex justify-content-between fw-bold fs-5" style={{ color: '#f5c6cb' }}>
                  <div>Total</div>
                  <div>${calculateTotal().toFixed(2)}</div>
                </div>
                <Button
                  variant="danger"
                  className="w-100 mt-3"
                  style={{ backgroundColor: '#8B0000', borderColor: '#8B0000' }}
                  onClick={() => alert('Checkout not implemented')}
                >
                  Proceed to Checkout
                </Button>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Cart;


// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';

// // const Cart = () => {
// //   const [cartItems, setCartItems] = useState([]);
// //   const navigate = useNavigate();
// //   const token = localStorage.getItem('token');

// //   const fetchCartItems = async () => {
// //     try {
// //       const res = await fetch('http://localhost:5000/cart', {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       const data = await res.json();
// //       setCartItems(data.cart || []);
// //     } catch (err) {
// //       console.error('Error fetching cart items:', err);
// //     }
// //   };

// //   const updateQuantity = async (productId, change) => {
// //     const product = cartItems.find(item => item.id === productId);
// //     if (product.quantity === 1 && change === -1) return; // prevent < 1

// //     try {
// //       const res = await fetch('http://localhost:5000/cart/update-quantity', {
// //         method: 'PATCH',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({ productId, change }),
// //       });

// //       if (!res.ok) throw new Error('Failed to update quantity');
// //       fetchCartItems();
// //     } catch (err) {
// //       console.error(err.message);
// //     }
// //   };

// //   const handleRemoveFromCart = async (productId) => {
// //     try {
// //       await fetch(`http://localhost:5000/cart/remove/${productId}`, {
// //         method: 'DELETE',
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       setCartItems(prev => prev.filter(item => item.id !== productId));
// //     } catch (err) {
// //       console.error('Failed to remove item from cart:', err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCartItems();
// //   }, []);

// //   return (
// //     <div className="container py-5">
// //       <motion.h2
// //         className="text-center mb-4 fw-bold"
// //         initial={{ opacity: 0, y: -30 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.5 }}
// //       >
// //         🛒 My Cart
// //       </motion.h2>

// //       {cartItems.length === 0 ? (
// //         <p className="text-center">Your cart is empty.</p>
// //       ) : (
// //         <div className="d-flex flex-wrap gap-4 justify-content-center">
// //           {cartItems.map(product => (
// //             <motion.div
// //               key={product.id}
// //               className="card shadow-sm p-3 rounded-4"
// //               style={{ width: '100%', maxWidth: '300px' }}
// //               initial={{ opacity: 0, scale: 0.9 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               transition={{ duration: 0.4 }}
// //             >
// //               {product.image && (
// //                 <img
// //                   src={`http://localhost:5000${product.image}`}
// //                   className="card-img-top rounded-3"
// //                   alt={product.title}
// //                   style={{ height: '180px', objectFit: 'cover' }}
// //                 />
// //               )}
// //               <div className="card-body text-center">
// //                 <h5 className="card-title">{product.title}</h5>
// //                 <p className="card-text text-muted">{product.model}</p>
// //                 <p className="fw-bold text-primary">${product.price}</p>

// //                 <div className="d-flex justify-content-center align-items-center gap-2 my-2">
// //                   <button
// //                     className="btn btn-sm btn-outline-secondary"
// //                     onClick={() => updateQuantity(product.id, -1)}
// //                     disabled={product.quantity <= 1}
// //                   >
// //                     −
// //                   </button>
// //                   <span className="fw-bold">{product.quantity || 1}</span>
// //                   <button
// //                     className="btn btn-sm btn-outline-secondary"
// //                     onClick={() => updateQuantity(product.id, 1)}
// //                   >
// //                     +
// //                   </button>
// //                 </div>

// //                 <div className="d-flex justify-content-around mt-3">
// //                   <button
// //                     className="btn btn-sm btn-outline-primary"
// //                     onClick={() => navigate(`/product/${product.id}`)}
// //                   >
// //                     View
// //                   </button>
// //                   <button
// //                     className="btn btn-sm btn-outline-danger"
// //                     onClick={() => handleRemoveFromCart(product.id)}
// //                   >
// //                     Remove
// //                   </button>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Cart;
