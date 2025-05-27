import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5000/listing', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setProducts(data.products || []); // assuming backend returns { products: [...] }
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    };

    fetchListings();
  }, []);

  // Split into categories
  const cars = products.filter(p => p.category === 'car');
  const parts = products.filter(p => p.category === 'spare_part');
  console.log(cars);
  console.log(parts);
  const ProductCard = ({ product }) => {
  console.log(product);
  return (
    <div className="card shadow-sm p-3 rounded-4" style={{ width: '100%', maxWidth: '300px' }}>
      {product.image && (
        <img
         src={`http://localhost:5000${product.image}`}
          className="card-img-top rounded-3"
          alt={product.name}
          style={{ height: '180px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body text-center">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-muted">{product.model}</p>
        <button
          className="btn btn-outline-primary mt-2"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          See More
        </button>
      </div>
    </div>
  );
};


  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold">Product Listings</h2>

      <section className="mb-5">
        <h4 className="text-primary">🚗 Cars</h4>
        <div className="d-flex flex-wrap gap-4">
          {cars.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <h4 className="text-success">🔧 Spare Parts</h4>
        <div className="d-flex flex-wrap gap-4">
          {parts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

