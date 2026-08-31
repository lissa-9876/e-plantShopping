import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night, improving air quality.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene from the air.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores and purifies indoor spaces.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/55/boston-fern-5114414_1280.jpg", description: "Adds humidity and purifies air naturally.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Absorbs airborne chemicals and cleans indoor air.", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Purifies air and provides healing soothing gel.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=400", description: "Calming floral fragrance for relaxation.", cost: "$20" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=400", description: "Sweet smelling flowers ideal for balconies.", cost: "$16" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515586000433-a5bc720b3603?w=400", description: "Invigorating aroma, perfect for cooking & gardens.", cost: "$14" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400", description: "Refreshing and energizing sweet herbal scent.", cost: "$8" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2017/07/11/17/57/lemon-balm-2494432_1280.jpg", description: "Fresh citrusy scent that reduces stress.", cost: "$12" },
        { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", description: "Intensely fragrant spring blooms.", cost: "$15" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Tulsi (Holy Basil)", image: "https://cdn.pixabay.com/photo/2021/07/13/11/34/tulsi-6463375_1280.jpg", description: "Boosts immunity and helps with respiratory health.", cost: "$12" },
        { name: "Oregano", image: "https://cdn.pixabay.com/photo/2015/05/20/16/11/oregano-775678_1280.jpg", description: "Rich in antioxidants and antimicrobial properties.", cost: "$9" },
        { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2016/08/17/04/43/template-1599667_1280.jpg", description: "Known for soothing herbal tea and relaxing qualities.", cost: "$11" },
        { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/07/12/31/lime-mint-2481344_1280.jpg", description: "Relieves headaches and promotes healthy digestion.", cost: "$10" },
        { name: "Thyme", image: "https://cdn.pixabay.com/photo/2016/06/18/16/32/thyme-1465225_1280.jpg", description: "Traditional herb used for sore throats and cooking.", cost: "$13" },
        { name: "Echinacea", image: "https://cdn.pixabay.com/photo/2014/07/31/23/10/echinacea-407152_1280.jpg", description: "Supports immune function and prevents common cold.", cost: "$17" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };

  const handleContinueShopping = (e) => {
    if (e) e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      {/* Navbar appearing on both pages */}
      <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#2e7d32', color: 'white', padding: '15px 30px' }}>
        <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => setShowCart(false)}>Paradise Nursery</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
          <a href="#" onClick={() => window.location.reload()} style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }} style={{ color: 'white', textDecoration: 'none', fontSize: '18px' }}>Plants</a>
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setShowCart(true)}>
            <span style={{ fontSize: '26px' }}>🛒</span>
            <span style={{ position: 'absolute', top: '-8px', right: '-12px', background: '#e53935', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '14px', fontWeight: 'bold' }}>
              {totalQuantity}
            </span>
          </div>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={handleContinueShopping} />
      ) : (
        <div className="product-grid" style={{ padding: '30px', maxWidth: '1200px', margin: 'auto' }}>
          {plantsArray.map((categoryGroup, index) => (
            <div key={index} style={{ marginBottom: '40px' }}>
              <h2 style={{ borderBottom: '2px solid #2e7d32', paddingBottom: '8px', color: '#1b5e20' }}>{categoryGroup.category}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginTop: '20px' }}>
                {categoryGroup.plants.map((plant, pIndex) => (
                  <div key={pIndex} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} />
                    <h3 style={{ margin: '12px 0 6px' }}>{plant.name}</h3>
                    <p style={{ color: '#666', fontSize: '14px', minHeight: '40px' }}>{plant.description}</p>
                    <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#2e7d32' }}>{plant.cost}</p>
                    <button 
                      disabled={addedToCart[plant.name]} 
                      onClick={() => handleAddToCart(plant)}
                      style={{ 
                        width: '100%', 
                        padding: '10px', 
                        backgroundColor: addedToCart[plant.name] ? '#9e9e9e' : '#4CAF50', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px', 
                        cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
