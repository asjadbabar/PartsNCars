import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Alert,
  Badge,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
//import 'bootstrap-icons/font/bootstrap-icons.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/my-products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/delete-product/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== productId));
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete product');
      }
    } catch (err) {
      alert('An error occurred while deleting the product.');
    }
  };

  const ProductCard = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-3 shadow rounded-4 border-0">
        <Row className="g-0">
          <Col md={4}>
            {product.image && (
              <Card.Img
                src={`http://localhost:5000${product.image}`}
                alt={product.title}
                className="h-100 rounded-start-4"
                style={{ objectFit: 'cover' }}
              />
            )}
          </Col>
          <Col md={8}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-1">
                  {product.title}{' '}
                  <Badge bg="secondary" className="ms-2">
                    Qty: {product.quantity ?? 'N/A'}
                  </Badge>
                </Card.Title>
                <i
                  className={`bi ${
                    product.category === 'car' ? 'bi-car-front' : 'bi-tools'
                  } fs-4 text-muted`}
                ></i>
              </div>
              <Card.Subtitle className="mb-2 text-muted">
                {product.brand} • {product.model} • {product.year}
              </Card.Subtitle>
              <Card.Text className="small text-secondary">{product.description}</Card.Text>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <span className="h5 text-success">${product.price}</span>

                <div className="d-flex gap-2">
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => navigate(`/UpdateProduct/${product.id}`)}
                  >
                    <i className="bi bi-pencil-square me-1"></i> Update
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    <i className="bi bi-trash3 me-1"></i> Delete
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </motion.div>
  );

  return (
    <Container className="py-5">
      <Row className="mb-4">
        {/* Quick Actions */}
        <Col lg={4}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="shadow rounded-4 border-0 p-3 mb-4">
              <Card.Title className="mb-3">
                <i className="bi bi-lightning-charge-fill text-primary me-2"></i>
                Quick Actions
              </Card.Title>
              <div className="d-grid gap-3">
                <Button
                  variant="primary"
                  className="d-flex align-items-center gap-2"
                  onClick={() => navigate('/AddCar')}
                >
                  <i className="bi bi-car-front-fill"></i> Add Car
                </Button>
                <Button
                  variant="secondary"
                  className="d-flex align-items-center gap-2"
                  onClick={() => navigate('/AddSparepart')}
                >
                  <i className="bi bi-gear-fill"></i> Add Spare Part
                </Button>
              </div>
            </Card>
          </motion.div>
        </Col>

        {/* Product List */}
        <Col lg={8}>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="shadow rounded-4 border-0 p-3">
              <Card.Body>
                <Card.Title className="mb-4 d-flex align-items-center gap-2">
                  <i className="bi bi-box-seam text-info fs-4"></i>
                  My Products <Badge bg="info">{products.length}</Badge>
                </Card.Title>

                {loading && products.length === 0 ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : error ? (
                  <Alert variant="danger">Error fetching products</Alert>
                ) : products.length === 0 ? (
                  <Alert variant="info">You haven't added any products yet.</Alert>
                ) : (
                  <div className="product-list">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Button, Card, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch('http://localhost:5000/my-products', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();
//         setProducts(data.products || []);
//       } catch (err) {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleDelete = async (productId) => {
//     const confirm = window.confirm('Are you sure you want to delete this product?');
//     if (!confirm) return;

//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:5000/delete-product/${productId}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (res.ok) {
//         setProducts(prev => prev.filter(p => p.id !== productId));
//       } else {
//         const data = await res.json();
//         alert(data.error || 'Failed to delete product');
//       }
//     } catch (err) {
//       alert('An error occurred while deleting the product.');
//     }
//   };

//   const ProductCard = ({ product }) => (
//     <Card className="mb-3 shadow-sm">
//       <Row className="g-0">
//         <Col md={4}>
//           {product.image && (
//             <Card.Img
//               src={`http://localhost:5000${product.image}`}
//               alt={product.title}
//               className="h-100"
//               style={{ objectFit: 'cover' }}
//             />
//           )}
//         </Col>
//         <Col md={8}>
//           <Card.Body>
//             <Card.Title>{product.title}</Card.Title>
//             <Card.Subtitle className="mb-2 text-muted">
//               {product.category === 'car' ? '🚗 Car' : '🔧 Spare Part'}
//             </Card.Subtitle>
//             <Card.Text>{product.description}</Card.Text>

//             <div className="d-flex justify-content-between align-items-center">
//               <span className="h5 text-primary">${product.price}</span>

//               <div className="d-flex gap-2">
//                 <Button
//                   variant="outline-warning"
//                   size="sm"
//                   onClick={() => navigate(`/UpdateProduct/${product.id}`)}
//                 >
//                   Update
//                 </Button>
//                 <Button
//                   variant="outline-danger"
//                   size="sm"
//                   onClick={() => handleDelete(product.id)}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </div>
//           </Card.Body>
//         </Col>
//       </Row>
//     </Card>
//   );

//   return (
//     <Container className="py-5">
//       <Row>
//         <Button
//           className="mx-4 mb-4"
//           onClick={() => navigate('/AddProduct')}
//           variant="success"
//         >
//           + Add New Product
//         </Button>

//         <Col lg={8}>
//           <Card className="shadow-sm">
//             <Card.Body>
//               <Card.Title className="mb-4">
//                 My Products ({products.length})
//               </Card.Title>

//               {loading && products.length === 0 ? (
//                 <div className="text-center py-4">
//                   <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                 </div>
//               ) : error ? (
//                 <Alert variant="danger">Error fetching products</Alert>
//               ) : products.length === 0 ? (
//                 <Alert variant="info">You haven't added any products yet.</Alert>
//               ) : (
//                 <div className="product-list">
//                   {products.map((product) => (
//                     <ProductCard key={product.id} product={product} />
//                   ))}
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;




// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();

//   // Simplified form state
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: 'car',
//     model: '',
//     image: null
//   });

//   // Fetch user's products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch('http://localhost:5000/my-products', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
        
//         const data = await res.json();
//         setProducts(data.products || []);
//       } catch (err) {
//         setError('Failed to fetch products');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       image: e.target.files[0]
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       const formDataToSend = new FormData();
      
//       // Append all form fields
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('price', formData.price);
//       formDataToSend.append('category', formData.category);
//       formDataToSend.append('model', formData.model);
//       if (formData.image) {
//         formDataToSend.append('image', formData.image);
//       }

//       const res = await fetch('http://localhost:5000/add-product', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formDataToSend,
//       });

//       const data = await res.json();
      
//       if (res.ok) {
//         setSuccess('Product added successfully!');
//         // Refresh product list
//         const newRes = await fetch('http://localhost:5001/my-products', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const newData = await newRes.json();
//         setProducts(newData.products || []);
//         // Reset form
//         setFormData({
//           name: '',
//           description: '',
//           price: '',
//           category: 'car',
//           model: '',
//           image: null
//         });
//       } else {
//         throw new Error(data.error || 'Failed to add product');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Product card component
//   const ProductCard = ({ product }) => (
//     <Card className="mb-3 shadow-sm">
//       <Row className="g-0">
//         <Col md={4}>
//           {product.image && (
//             <Card.Img 
//               src={`http://localhost:5000${product.image}`} 
//               alt={product.name}
//               className="h-100"
//               style={{ objectFit: 'cover' }}
//             />
//           )}
//         </Col>
//         <Col md={8}>
//           <Card.Body>
//             <Card.Title>{product.name}</Card.Title>
//             <Card.Subtitle className="mb-2 text-muted">
//               {product.category === 'car' ? '🚗 Car' : '🔧 Spare Part'}
//             </Card.Subtitle>
//             <Card.Text>{product.description}</Card.Text>
//             <div className="d-flex justify-content-between align-items-center">
//               <span className="h5 text-primary">${product.price}</span>
//               <Button 
//                 variant="outline-primary" 
//                 size="sm"
//                 onClick={() => navigate(`/product/${product.id}`)}
//               >
//                 View Details
//               </Button>
//             </div>
//           </Card.Body>
//         </Col>
//       </Row>
//     </Card>
//   );

//   return (
//     <Container className="py-5">
//       <Row>
//         <Col lg={5} className="mb-5 mb-lg-0">
//           <Card className="shadow-sm">
//             <Card.Body>
//               <Card.Title className="mb-4">Add New Product</Card.Title>
              
//               {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
//               {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}
              
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Product Name*</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Description*</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>Price ($)*</Form.Label>
//                       <Form.Control
//                         type="number"
//                         step="0.01"
//                         min="0"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleChange}
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>Category*</Form.Label>
//                       <Form.Select
//                         name="category"
//                         value={formData.category}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="car">Car</option>
//                         <option value="spare_part">Spare Part</option>
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Model/Type*</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="model"
//                     value={formData.model}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <Form.Label>Product Image*</Form.Label>
//                   <Form.Control
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     required
//                   />
//                   <Form.Text muted>
//                     Upload a clear image of your product (JPEG/PNG)
//                   </Form.Text>
//                 </Form.Group>

//                 <Button 
//                   variant="primary" 
//                   type="submit"
//                   disabled={loading}
//                   className="w-100"
//                 >
//                   {loading ? 'Uploading...' : 'Add Product'}
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col lg={7}>
//           <Card className="shadow-sm">
//             <Card.Body>
//               <Card.Title className="mb-4">My Products ({products.length})</Card.Title>
              
//               {loading && products.length === 0 ? (
//                 <div className="text-center py-4">
//                   <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                 </div>
//               ) : products.length === 0 ? (
//                 <Alert variant="info">You haven't added any products yet.</Alert>
//               ) : (
//                 <div className="product-list">
//                   {products.map(product => (
//                     <ProductCard key={product.id} product={product} />
//                   ))}
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;



// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();

//   // Updated form state with missing fields
//   const [formData, setFormData] = useState({
//     name: '',
//     title: '',
//     description: '',
//     price: '',
//     category: 'car',
//     brand: '',
//     model: '',
//     year: '',
//     image: null
//   });

//   // Fetch user's products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch('http://localhost:5000/my-products', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
        
//         const data = await res.json();
//         setProducts(data.products || []);
//       } catch (err) {
//         setError('Failed to fetch products');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       image: e.target.files[0]
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const token = localStorage.getItem('token');
//       const formDataToSend = new FormData();
      
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('title', formData.title);
//       formDataToSend.append('description', formData.description);
//       formDataToSend.append('price', formData.price);
//       formDataToSend.append('category', formData.category);
//       formDataToSend.append('brand', formData.brand);
//       formDataToSend.append('model', formData.model);
//       formDataToSend.append('year', formData.year);
//       if (formData.image) {
//         formDataToSend.append('image', formData.image);
//       }

//       const res = await fetch('http://localhost:5000/add-product', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formDataToSend,
//       });

//       const data = await res.json();
      
//       if (res.ok) {
//         setSuccess('Product added successfully!');
//         const newRes = await fetch('http://localhost:5001/my-products', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const newData = await newRes.json();
//         setProducts(newData.products || []);
//         setFormData({
//           name: '',
//           title: '',
//           description: '',
//           price: '',
//           category: 'car',
//           brand: '',
//           model: '',
//           year: '',
//           image: null
//         });
//       } else {
//         throw new Error(data.error || 'Failed to add product');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const ProductCard = ({ product }) => (
//     <Card className="mb-3 shadow-sm">
//       <Row className="g-0">
//         <Col md={4}>
//           {product.image && (
//             <Card.Img 
//               src={`http://localhost:5000${product.image}`} 
//               alt={product.name}
//               className="h-100"
//               style={{ objectFit: 'cover' }}
//             />
//           )}
//         </Col>
//         <Col md={8}>
//           <Card.Body>
//             <Card.Title>{product.name}</Card.Title>
//             <Card.Subtitle className="mb-2 text-muted">
//               {product.category === 'car' ? '🚗 Car' : '🔧 Spare Part'}
//             </Card.Subtitle>
//             <Card.Text>{product.description}</Card.Text>
//             <div className="d-flex justify-content-between align-items-center">
//               <span className="h5 text-primary">${product.price}</span>
//               <Button 
//                 variant="outline-primary" 
//                 size="sm"
//                 onClick={() => navigate(`/product/${product.id}`)}
//               >
//                 View Details
//               </Button>
//             </div>
//           </Card.Body>
//         </Col>
//       </Row>
//     </Card>
//   );

//   return (
//     <Container className="py-5">
//       <Row>
//         <Col lg={5} className="mb-5 mb-lg-0">
//           <Card className="shadow-sm">
//             <Card.Body>
//               <Card.Title className="mb-4">Add New Product</Card.Title>
              
//               {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
//               {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}
              
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Product Name*</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Title*</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Description*</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     name="description"
//                     value={formData.description}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>Price ($)*</Form.Label>
//                       <Form.Control
//                         type="number"
//                         step="0.01"
//                         min="0"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleChange}
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label>Category*</Form.Label>
//                       <Form.Select
//                         name="category"
//                         value={formData.category}
//                         onChange={handleChange}
//                         required
//                       >
//                         <option value="car">Car</option>
//                         <option value="spare_part">Spare Part</option>
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Brand*</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="brand"
//                     value={formData.brand}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Model/Type*</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="model"
//                     value={formData.model}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Year*</Form.Label>
//                   <Form.Control
//                     type="number"
//                     name="year"
//                     min="1900"
//                     max={new Date().getFullYear()}
//                     value={formData.year}
//                     onChange={handleChange}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <Form.Label>Product Image*</Form.Label>
//                   <Form.Control
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     required
//                   />
//                   <Form.Text muted>
//                     Upload a clear image of your product (JPEG/PNG)
//                   </Form.Text>
//                 </Form.Group>

//                 <Button 
//                   variant="primary" 
//                   type="submit"
//                   disabled={loading}
//                   className="w-100"
//                 >
//                   {loading ? 'Uploading...' : 'Add Product'}
//                 </Button>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col lg={7}>
//           <Card className="shadow-sm">
//             <Card.Body>
//               <Card.Title className="mb-4">My Products ({products.length})</Card.Title>
              
//               {loading && products.length === 0 ? (
//                 <div className="text-center py-4">
//                   <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                 </div>
//               ) : products.length === 0 ? (
//                 <Alert variant="info">You haven't added any products yet.</Alert>
//               ) : (
//                 <div className="product-list">
//                   {products.map(product => (
//                     <ProductCard key={product.id} product={product} />
//                   ))}
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;



//  import React, { useState, useEffect } from 'react';
//  import { Container, Row, Col, Button, Card, Alert } from 'react-bootstrap';
//  import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   // const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch('http://localhost:5000/my-products', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();
//         setProducts(data.products || []);
//       } catch (err) {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

  
//   const ProductCard = ({ product }) => (
//     <Card className="mb-3 shadow-sm">
//       <Row className="g-0">
//         <Col md={4}>
//           {product.image && (
//             <Card.Img
//               src={`http://localhost:5000${product.image}`}
//               alt={product.title}
//               className="h-100"
//               style={{ objectFit: 'cover' }}
//             />
//           )}
//         </Col>
//         <Col md={8}>
//           <Card.Body>
//             <Card.Title>{product.title}</Card.Title>
//             <Card.Subtitle className="mb-2 text-muted">
//               {product.category === 'car' ? '🚗 Car' : '🔧 Spare Part'}
//             </Card.Subtitle>
//             <Card.Text>{product.description}</Card.Text>
//             <div className="d-flex justify-content-between align-items-center">
//               <span className="h5 text-primary">${product.price}</span>
//               <Button
//                 variant="outline-primary"
//                 size="sm"
//                 onClick={() => navigate(`/product/${product.id}`)}
//               >
//                 View Details
//               </Button>
//             </div>
//           </Card.Body>
//         </Col>
//       </Row>
//     </Card>
//   );

//   return (
//     <Container className="py-5">
//       <Row>
//  <Button className='mx-4 mb-4'onClick={() => navigate('/AddProduct')} variant="success">
//           + Add New Product
//         </Button>

//         <Col lg={7}>
        
//           <Card className="shadow-sm">
//             <Card.Body>
//               <Card.Title className="mb-4">My Products ({products.length})</Card.Title>
                
//               {loading && products.length === 0 ? (
//                 <div className="text-center py-4">
//                   <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                   </div>
//                 </div>
//               ) : products.length === 0 ? (
//                 <Alert variant="info">You haven't added any products yet.</Alert>
//               ) 
//               :
//               error ? (
//                 <Alert variant="info">Error fetching products</Alert>
//               ) : (
//                 <div className="product-list">
//                   {products.map(product => (
//                     <ProductCard key={product.id} product={product} />
//                   ))}
//                 </div>
//               )}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;



// export default function UserDashboard() {
//    //Fetch user's products
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch('http://localhost:5000/my-products', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
        
//         const data = await res.json();
//         setProducts(data.products || []);
//       } catch (err) {
//         setError('Failed to fetch products');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);
//   const ProductCard = ({ product }) => (
//     <Card className="mb-3 shadow-sm">
//       <Row className="g-0">
//         <Col md={4}>
//           {product.image && (
//             <Card.Img
//               src={`http://localhost:5000${product.image}`}
//               alt={product.title}
//               className="h-100"
//               style={{ objectFit: 'cover' }}
//             />
//           )}
//         </Col>
//         <Col md={8}>
//           <Card.Body>
//             <Card.Title>{product.title}</Card.Title>
//             <Card.Subtitle className="mb-2 text-muted">
//               {product.category === 'car' ? '🚗 Car' : '🔧 Spare Part'}
//             </Card.Subtitle>
//             <Card.Text>{product.description}</Card.Text>
//             <div className="d-flex justify-content-between align-items-center">
//               <span className="h5 text-primary">${product.price}</span>
//               <Button
//                 variant="outline-primary"
//                 size="sm"
//                 onClick={() => navigate(`/product/${product.id}`)}
//               >
//                 View Details
//               </Button>
//             </div>
//           </Card.Body>
//         </Col>
//       </Row>
//     </Card>
//   );
//   return (
//   <Container className="py-5">
//     <Row className="mb-4">
//       <Col className="d-flex justify-content-between align-items-center">
//         <h2>My Products ({products.length})</h2>
//         <Button onClick={() => navigate('/add-product')} variant="success">
//           + Add New Product
//         </Button>
//       </Col>
//     </Row>

//     <Row>
//       <Col>
//         <Card className="shadow-sm">
//           <Card.Body>
//             {loading && products.length === 0 ? (
//               <div className="text-center py-4">
//                 <div className="spinner-border text-primary" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </div>
//               </div>
//             ) : products.length === 0 ? (
//               <Alert variant="info">You haven't added any products yet.</Alert>
//             ) : (
//               <div className="product-list">
//                 {products.map(product => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
//             )}
//           </Card.Body>
//         </Card>
//       </Col>
//     </Row>
//   </Container>
// );

// }
