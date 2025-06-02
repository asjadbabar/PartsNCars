// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchListings = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const res = await fetch('http://localhost:5000/listing', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();
//         setProducts(data.products || []);
//       } catch (err) {
//         console.error('Error fetching listings:', err);
//       }
//     };

//     fetchListings();
//   }, []);

//   const cars = products.filter(p => p.category === 'car');
//   const parts = products.filter(p => p.category === 'spare_part');

//   const handleAddToCart = async(product) => {
//     const token = localStorage.getItem('token');

//   try {
//     const res = await fetch('http://localhost:5000/add-to-cart', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({product}),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert('Added to cart!');
//     } else {
//       alert(data.error || 'Failed to add to cart');
//     }
//   } catch (err) {
//     console.error('Add to cart error:', err);
//     alert('Error adding to cart');
//   }
//   };

//   const ProductCard = ({ product }) => (
//     <div className="card shadow-sm p-3 rounded-4" style={{ width: '100%', maxWidth: '300px' }}>
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
//         <p className="card-text fw-semibold text-primary">${product.price}</p>

//         <button
//           className="btn btn-outline-primary mb-2"
//           onClick={() => navigate(`/product/${product.id}`)}
//         >
//           See More
//         </button>

//         {product.category === 'spare_part' && (
//           <button
//             className="btn btn-sm btn-success ms-2"
//             onClick={() => handleAddToCart(product.id)}
//           >
//             Add to Cart
//           </button>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="container py-5">
//       <h2 className="text-center mb-4 fw-bold">Product Listings</h2>

//       <section className="mb-5">
//         <h4 className="text-primary">🚗 Cars</h4>
//         <div className="d-flex flex-wrap gap-4">
//           {cars.map(product => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </section>

//       <section>
//         <h4 className="text-success">🔧 Spare Parts</h4>
//         <div className="d-flex flex-wrap gap-4">
//           {parts.map(product => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;


// // import React, { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // const Home = () => {
// //   const [products, setProducts] = useState([]);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchListings = async () => {
// //       const token = localStorage.getItem('token');
// //       try {
// //         const res = await fetch('http://localhost:5000/listing', {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });

// //         const data = await res.json();
// //         setProducts(data.products || []); // assuming backend returns { products: [...] }
// //       } catch (err) {
// //         console.error('Error fetching listings:', err);
// //       }
// //     };

// //     fetchListings();
// //   }, []);

// //   // Split into categories
// //   const cars = products.filter(p => p.category === 'car');
// //   const parts = products.filter(p => p.category === 'spare_part');
// //   console.log(cars);
// //   console.log(parts);
// //   const ProductCard = ({ product }) => {
// //   console.log(product);
// //   return (
// //     <div className="card shadow-sm p-3 rounded-4" style={{ width: '100%', maxWidth: '300px' }}>
// //       {product.image && (
// //         <img
// //          src={`http://localhost:5000${product.image}`}
// //           className="card-img-top rounded-3"
// //           alt={product.name}
// //           style={{ height: '180px', objectFit: 'cover' }}
// //         />
// //       )}
// //       <div className="card-body text-center">
// //         <h5 className="card-title">{product.title}</h5>
// //         <p className="card-text text-muted">{product.model}</p>
// //         <button
// //           className="btn btn-outline-primary mt-2"
// //           onClick={() => navigate(`/product/${product.id}`)}
// //         >
// //           See More
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };


// //   return (
// //     <div className="container py-5">
// //       <h2 className="text-center mb-4 fw-bold">Product Listings</h2>

// //       <section className="mb-5">
// //         <h4 className="text-primary">🚗 Cars</h4>
// //         <div className="d-flex flex-wrap gap-4">
// //           {cars.map(product => (
// //             <ProductCard key={product.id} product={product} />
// //           ))}
// //         </div>
// //       </section>

// //       <section>
// //         <h4 className="text-success">🔧 Spare Parts</h4>
// //         <div className="d-flex flex-wrap gap-4">
// //           {parts.map(product => (
// //             <ProductCard key={product.id} product={product} />
// //           ))}
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Home;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Listing = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5000/listing', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    };

    fetchListings();
  }, []);

  const cars = products.filter(p => p.category === 'car');
  const parts = products.filter(p => p.category === 'spare_part');

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Added to cart!');
      } else {
        alert(data.error || 'Failed to add to cart');
      }
    } catch (err) {
      console.error('Add to cart error:', err);
      alert('Error adding to cart');
    }
  };

  const ProductCard = ({ product }) => (
    <div
      className="card product-card shadow border-0 overflow-hidden"
  style={{
    width: '100%',
    maxWidth: '300px',
    backgroundColor: '#1e1e1e',
    color: '#f8f9fa',
  }}
    >
      {product.image && (
        <img
          src={`http://localhost:5000${product.image}`}
          className="card-img-top"
          alt={product.title}
          style={{ height: '180px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body d-flex flex-column align-items-center text-center">
        <h5 className="card-title text-danger">{product.title}</h5>
        <p className="card-text text-muted">{product.model}</p>
        <p className="card-text fw-bold text-light">
          <i className="bi bi-currency-dollar text-success"></i>
          {product.price}
        </p>

        <div className="d-flex gap-2 mt-auto flex-wrap justify-content-center">
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <i className="bi bi-eye-fill me-1"></i> See More
          </button>

          {product.category === 'spare_part' && (
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleAddToCart(product.id)}
            >
              <i className="bi bi-cart-plus-fill me-1"></i> Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    // <div style={{background:"linear-gradient(to right, #e66465,rgb(195, 49, 49))"}}>
    <div className="container py-5" >
      <h2 className="text-center fw-bold text-dark mb-5">
        <i className="bi bi-box-seam-fill me-2"></i>Product Listings
      </h2>

      <section className="mb-5">
        <h4 className="text-dark mb-3">
          <i className="bi bi-car-front-fill me-2"></i>Cars
        </h4>
        <div className="row gy-4">
          {cars.map(product => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 className="text-dark mb-3">
          <i className="bi bi-tools me-2"></i>Spare Parts
        </h4>
        <div className="row gy-4">
          {parts.map(product => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
   // </div>
  );
};

export default Listing;
