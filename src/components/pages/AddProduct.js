// import React, { useState } from 'react';
// import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const AddProduct = () => {
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
//         setTimeout(() => navigate('/dashboard'), 1500);
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
//     <Container className="py-5">
//       <Card className="shadow-sm">
//         <Card.Body>
//           <Card.Title className="mb-4">Add New Product</Card.Title>

//           {error && <Alert variant="danger">{error}</Alert>}
//           {success && <Alert variant="success">{success}</Alert>}

//           <Form  onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label>Title*</Form.Label>
//               <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Description*</Form.Label>
//               <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
//             </Form.Group>
//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Price ($)*</Form.Label>
//                   <Form.Control type="number" step="0.01" min="0" name="price" value={formData.price} onChange={handleChange} required />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group>
//                   <Form.Label>Category*</Form.Label>
//                   <Form.Select name="category" value={formData.category} onChange={handleChange} required>
//                     <option value="car">Car</option>
//                     <option value="spare_part">Spare Part</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Form.Group className="mb-3">
//               <Form.Label>Brand*</Form.Label>
//               <Form.Control type="text" name="brand" value={formData.brand} onChange={handleChange} required />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Model/Type*</Form.Label>
//               <Form.Control type="text" name="model" value={formData.model} onChange={handleChange} required />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Year*</Form.Label>
//               <Form.Control type="number" name="year" min="1900" max={new Date().getFullYear()} value={formData.year} onChange={handleChange} required />
//             </Form.Group>
//             <Form.Group className="mb-4">
//               <Form.Label>Product Image*</Form.Label>
//               <Form.Control type="file" accept="image/*" onChange={handleFileChange} required />
//               <Form.Text muted>Upload a clear image (JPEG/PNG)</Form.Text>
//             </Form.Group>
//             <Button type="submit" variant="primary" disabled={loading} className="w-100">
//               {loading ? 'Uploading...' : 'Add Product'}
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default AddProduct;


import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
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
        if (key === 'image' && value) {
          formDataToSend.append('image', value);
        } else {
          formDataToSend.append(key, value);
        }
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
      className="d-flex justify-content-center align-items-center my-4" 
      style={{ minHeight: '100vh', backgroundColor: '#f5f8fa' }}
    >
      <Container style={{ maxWidth: '600px' }}>
        <Card className="shadow-sm p-3">
          <Card.Body>
            <Card.Title className="mb-4 text-center">Add New Product</Card.Title>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title*</Form.Label>
                <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description*</Form.Label>
                <Form.Control as="textarea" rows={2} name="description" value={formData.description} onChange={handleChange} required />
              </Form.Group>

              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Price ($)*</Form.Label>
                    <Form.Control type="number" step="0.01" min="0" name="price" value={formData.price} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Category*</Form.Label>
                    <Form.Select name="category" value={formData.category} onChange={handleChange} required>
                      <option value="car">Car</option>
                      <option value="spare_part">Spare Part</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Brand*</Form.Label>
                <Form.Control type="text" name="brand" value={formData.brand} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Model/Type*</Form.Label>
                <Form.Control type="text" name="model" value={formData.model} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Year*</Form.Label>
                <Form.Control type="number" name="year" min="1900" max={new Date().getFullYear()} value={formData.year} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Product Image*</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleFileChange} required />
                <Form.Text muted>Upload a clear image (JPEG/PNG)</Form.Text>
              </Form.Group>

              <Button type="submit" variant="primary" disabled={loading} className="w-100">
                {loading ? 'Uploading...' : 'Add Product'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AddProduct;
