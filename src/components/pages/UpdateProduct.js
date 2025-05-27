import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:5000/my-products`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        const product = data.products.find((p) => p.id === parseInt(id));
        if (!product) return setError('Product not found.');

        setFormData({
          title: product.title,
          description: product.description,
          price: product.price,
          category: product.category,
          brand: product.brand,
          model: product.model,
          year: product.year,
          image: null
        });

        setPreview(`http://localhost:5000${product.image}`);
      } catch (err) {
        setError('Error loading product data');
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    setPreview(URL.createObjectURL(e.target.files[0]));
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

      const res = await fetch(`http://localhost:5000/UpdateProduct/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update product');
      setSuccess('Product updated successfully!');
      setTimeout(() => navigate('/UserDashboard'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="shadow-sm p-4" style={{ width: '100%', maxWidth: '600px' }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">Update Product</Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title*</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description*</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
            </Form.Group>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Price ($)*</Form.Label>
                  <Form.Control type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
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
              <Form.Label>Model*</Form.Label>
              <Form.Control type="text" name="model" value={formData.model} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Year*</Form.Label>
              <Form.Control type="number" name="year" min="1900" max={new Date().getFullYear()} value={formData.year} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Product Image*</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
              {preview && <img src={preview} alt="preview" className="mt-2" style={{ width: '100%', maxHeight: '250px', objectFit: 'cover' }} />}
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? 'Updating...' : 'Update Product'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UpdateProduct;
