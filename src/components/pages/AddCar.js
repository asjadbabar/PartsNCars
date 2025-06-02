import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
//import 'bootstrap-icons/font/bootstrap-icons.css'; // Ensure this is imported

const AddCar = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'car',
    brand: '',
    model: '',
    year: '',
    image: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const res = await fetch('http://localhost:5000/add-product', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Product added successfully!');
        setTimeout(() => navigate('/UserDashboard'), 1500);
      } else {
        throw new Error(data.error || 'Failed to add product');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #8B0000 100%)',
        padding: '20px'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="w-100"
      >
        <Container style={{ maxWidth: '650px' }}>
          <Card className="border-0 shadow-lg rounded-4" style={{ backgroundColor: '#1c1c1e', color: '#ffffff' }}>
            <Card.Body className="p-4">
              <motion.div
                className="text-center mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <i className="bi bi-car-front" style={{ fontSize: '3rem', color: '#ff4d4d' }}></i>
                <h2 className="mt-2 fw-bold">Add Car</h2>
              </motion.div>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                {[
                  { label: 'Title*', name: 'title', type: 'text' },
                  { label: 'Description*', name: 'description', as: 'textarea', rows: 2 },
                  { label: 'Brand*', name: 'brand', type: 'text' },
                  { label: 'Model/Type*', name: 'model', type: 'text' },
                  { label: 'Year*', name: 'year', type: 'number', min: 1900, max: new Date().getFullYear() },
                ].map((field, i) => (
                  <Form.Group className="mb-3" key={i}>
                    <Form.Label>{field.label}</Form.Label>
                    <motion.div whileFocus={{ scale: 1.02 }} whileHover={{ scale: 1.01 }}>
                      <Form.Control
                        {...field}
                        value={formData[field.name]}
                        onChange={handleChange}
                        style={{ backgroundColor: '#2c2c2e', color: 'white', border: '1px solid #8B0000' }}
                        required
                      />
                    </motion.div>
                  </Form.Group>
                ))}

                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Price ($)*</Form.Label>
                      <motion.div whileHover={{ scale: 1.01 }}>
                        <Form.Control
                          type="number"
                          step="0.01"
                          min="0"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          required
                          style={{ backgroundColor: '#2c2c2e', color: 'white', border: '1px solid #8B0000' }}
                        />
                      </motion.div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Category*</Form.Label>
                      <motion.div whileHover={{ scale: 1.01 }}>
                        <Form.Select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          required
                          style={{ backgroundColor: '#2c2c2e', color: 'white', border: '1px solid #8B0000' }}
                        >
                          <option value="car">Car</option>
                          <option value="spare_part">Spare Part</option>
                        </Form.Select>
                      </motion.div>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Product Image*</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    style={{ backgroundColor: '#2c2c2e', color: 'white', border: '1px solid #8B0000' }}
                  />
                  <Form.Text className="text-muted">Upload a clear image (JPEG/PNG)</Form.Text>
                </Form.Group>

                <motion.div whileHover={{ scale: 1.03 }}>
                  <Button
                    type="submit"
                    variant="dark"
                    disabled={loading}
                    className="w-100"
                    style={{
                      backgroundColor: '#8B0000',
                      borderColor: '#8B0000',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  >
                    {loading ? 'Uploading...' : 'Add Product'}
                  </Button>
                </motion.div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </motion.div>
    </div>
  );
};

export default AddCar;


// import React, { useState } from 'react';
// import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const AddCar = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     category: 'car',
//     brand: '',
//     model: '',
//     year: '',
//     image: null
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();

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
//     setError(null);
//     setSuccess(null);

//     try {
//       const token = localStorage.getItem('token');
//       const formDataToSend = new FormData();

//       Object.entries(formData).forEach(([key, value]) => {
//         formDataToSend.append(key, value);
//       });

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
//         setTimeout(() => navigate('/UserDashboard'), 1500);
//       } else {
//         throw new Error(data.error || 'Failed to add product');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center"
//       style={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #000000 0%, #8B0000 100%)',
//         padding: '20px'
//       }}
//     >
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.7 }}
//         className="w-100"
//       >
//         <Container style={{ maxWidth: '650px' }}>
//           <Card className="border-0 shadow-lg rounded-4" style={{ backgroundColor: '#1c1c1e', color: '#ffffff' }}>
//             <Card.Body className="p-4">
//               <motion.h2
//                 className="text-center mb-4 fw-bold"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 Add New Product
//               </motion.h2>

//               {error && <Alert variant="danger">{error}</Alert>}
//               {success && <Alert variant="success">{success}</Alert>}

//               <Form onSubmit={handleSubmit}>
//                 {[
//                   { label: 'Title*', name: 'title', type: 'text' },
//                   { label: 'Description*', name: 'description', as: 'textarea', rows: 2 },
//                   { label: 'Brand*', name: 'brand', type: 'text' },
//                   { label: 'Model/Type*', name: 'model', type: 'text' },
//                   { label: 'Year*', name: 'year', type: 'number', min: 1900, max: new Date().getFullYear() },
//                 ].map((field, i) => (
//                   <Form.Group className="mb-3" key={i}>
//                     <Form.Label>{field.label}</Form.Label>
//                     <motion.div whileFocus={{ scale: 1.02 }} whileHover={{ scale: 1.01 }}>
//                       <Form.Control
//                         {...field}
//                         value={formData[field.name]}
//                         onChange={handleChange}
//                         style={{ backgroundColor: '#2c2c2e', color: 'white', border: '1px solid #8B0000' }}
//                         required
//                       />
//                     </motion.div>
//                   </Form.Group>
//                 ))}

//                 <Row className="mb-3">
//                   <Col>
//                     <Form.Group>
//                       <Form.Label>Price ($)*</Form.Label>
//                       <motion.div whileHover={{ scale: 1.01 }}>
//                         <Form.Control
//                           type="number"
//                           step="0.01"
//                           min="0"
//                           name="price"
//                           value={formData.price}
//                           onChange={handleChange}
//                           required
//                           style={{ backgroundColor: '#2c2c2e', color: 'white', border: '1px solid #8B0000' }}
//                         />
//                       </motion.div>
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group>
//                       <Form.Label>Category*</Form.Label>
//                       <motion.div whileHover={{ scale: 1.01 }}>
//                         <Form.Select
//                           name="category"
//                           value={formData.category}
//                           onChange={handleChange}
//                           required
//                           style={{ backgroundColor: '#2c2c2e', color: 'white', border: '1px solid #8B0000' }}
//                         >
//                           <option value="car">Car</option>
//                           <option value="spare_part">Spare Part</option>
//                         </Form.Select>
//                       </motion.div>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Form.Group className="mb-4">
//                   <Form.Label>Product Image*</Form.Label>
//                   <Form.Control
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     required
//                     style={{ backgroundColor: '#2c2c2e', color: 'white', border: '1px solid #8B0000' }}
//                   />
//                   <Form.Text className="text-muted">Upload a clear image (JPEG/PNG)</Form.Text>
//                 </Form.Group>

//                 <motion.div whileHover={{ scale: 1.03 }}>
//                   <Button
//                     type="submit"
//                     variant="dark"
//                     disabled={loading}
//                     className="w-100"
//                     style={{
//                       backgroundColor: '#8B0000',
//                       borderColor: '#8B0000',
//                       color: 'white',
//                       fontWeight: 'bold'
//                     }}
//                   >
//                     {loading ? 'Uploading...' : 'Add Product'}
//                   </Button>
//                 </motion.div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Container>
//       </motion.div>
//     </div>
//   );
// };

// export default AddCar;



// import React, { useState } from 'react';
// import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const AddCar = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     category: 'car',
//     brand: '',
//     model: '',
//     year: '',
//     image: null
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();

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
//     setError(null);
//     setSuccess(null);

//     try {
//       const token = localStorage.getItem('token');
//       const formDataToSend = new FormData();

//       Object.entries(formData).forEach(([key, value]) => {
//         formDataToSend.append(key, value);
//       });

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
//         setTimeout(() => navigate('/UserDashboard'), 1500);
//       } else {
//         throw new Error(data.error || 'Failed to add product');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center my-4"
//       style={{ minHeight: '100vh', background: 'linear-gradient(to right, #e0eafc, #cfdef3)' }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-100"
//       >
//         <Container style={{ maxWidth: '600px' }}>
//           <Card className="shadow rounded-4 border-0">
//             <Card.Body className="p-4">
//               <motion.h3 
//                 className="mb-4 text-center fw-bold"
//                 initial={{ scale: 0.95 }}
//                 animate={{ scale: 1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 Add New Product
//               </motion.h3>

//               {error && <Alert variant="danger">{error}</Alert>}
//               {success && <Alert variant="success">{success}</Alert>}

//               <Form onSubmit={handleSubmit} className="text-start">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Title*</Form.Label>
//                   <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Description*</Form.Label>
//                   <Form.Control as="textarea" rows={2} name="description" value={formData.description} onChange={handleChange} required />
//                 </Form.Group>

//                 <Row className="mb-3">
//                   <Col>
//                     <Form.Group>
//                       <Form.Label>Price ($)*</Form.Label>
//                       <Form.Control type="number" step="0.01" min="0" name="price" value={formData.price} onChange={handleChange} required />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group>
//                       <Form.Label>Category*</Form.Label>
//                       <Form.Select name="category" value={formData.category} onChange={handleChange} required>
//                         <option value="car">Car</option>
//                         <option value="spare_part">Spare Part</option>
//                       </Form.Select>
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Brand*</Form.Label>
//                   <Form.Control type="text" name="brand" value={formData.brand} onChange={handleChange} required />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Model/Type*</Form.Label>
//                   <Form.Control type="text" name="model" value={formData.model} onChange={handleChange} required />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Year*</Form.Label>
//                   <Form.Control type="number" name="year" min="1900" max={new Date().getFullYear()} value={formData.year} onChange={handleChange} required />
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <Form.Label>Product Image*</Form.Label>
//                   <Form.Control type="file" accept="image/*" onChange={handleFileChange} required />
//                   <Form.Text muted>Upload a clear image (JPEG/PNG)</Form.Text>
//                 </Form.Group>

//                 <motion.div whileHover={{ scale: 1.03 }}>
//                   <Button type="submit" variant="primary" disabled={loading} className="w-100">
//                     {loading ? 'Uploading...' : 'Add Product'}
//                   </Button>
//                 </motion.div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Container>
//       </motion.div>
//     </div>
//   );
// };

// export default AddCar;



// import React, { useState } from 'react';
// import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const AddCar = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     price: '',
//     category: 'car',
//     brand: '',
//     model: '',
//     year: '',
//     image: null
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();

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
//     setError(null);
//     setSuccess(null);

//     try {
//       const token = localStorage.getItem('token');
//       const formDataToSend = new FormData();

//       Object.entries(formData).forEach(([key, value]) => {
//         if (key === 'image' && value) {
//           formDataToSend.append('image', value);
//         } else {
//           formDataToSend.append(key, value);
//         }
//       });

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
//         setTimeout(() => navigate('/UserDashboard'), 1500);
//       } else {
//         throw new Error(data.error || 'Failed to add product');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center my-4" 
//       style={{ minHeight: '100vh', backgroundColor: '#f5f8fa' }}
//     >
//       <Container style={{ maxWidth: '600px' }}>
//         <Card className="shadow-sm p-3">
//           <Card.Body>
//             <Card.Title className="mb-4 text-center">Add New Product</Card.Title>

//             {error && <Alert variant="danger">{error}</Alert>}
//             {success && <Alert variant="success">{success}</Alert>}

//             <Form onSubmit={handleSubmit}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Title*</Form.Label>
//                 <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Description*</Form.Label>
//                 <Form.Control as="textarea" rows={2} name="description" value={formData.description} onChange={handleChange} required />
//               </Form.Group>

//               <Row className="mb-3">
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Price ($)*</Form.Label>
//                     <Form.Control type="number" step="0.01" min="0" name="price" value={formData.price} onChange={handleChange} required />
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                   <Form.Group>
//                     <Form.Label>Category*</Form.Label>
//                     <Form.Select name="category" value={formData.category} onChange={handleChange} required>
//                       <option value="car">Car</option>
//                       <option value="spare_part">Spare Part</option>
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Form.Group className="mb-3">
//                 <Form.Label>Brand*</Form.Label>
//                 <Form.Control type="text" name="brand" value={formData.brand} onChange={handleChange} required />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Model/Type*</Form.Label>
//                 <Form.Control type="text" name="model" value={formData.model} onChange={handleChange} required />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Year*</Form.Label>
//                 <Form.Control type="number" name="year" min="1900" max={new Date().getFullYear()} value={formData.year} onChange={handleChange} required />
//               </Form.Group>

//               <Form.Group className="mb-4">
//                 <Form.Label>Product Image*</Form.Label>
//                 <Form.Control type="file" accept="image/*" onChange={handleFileChange} required />
//                 <Form.Text muted>Upload a clear image (JPEG/PNG)</Form.Text>
//               </Form.Group>

//               <Button type="submit" variant="primary" disabled={loading} className="w-100">
//                 {loading ? 'Uploading...' : 'Add Product'}
//               </Button>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   );
// };

// export default AddCar;
