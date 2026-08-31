import React from 'react';

function CartItem({ onContinueShopping }) {
  const dummyCartItems = [
    { name: "Snake Plant", cost: "$15", quantity: 2, image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?w=400" }
  ];

  const calculateTotalAmount = () => {
    return dummyCartItems.reduce((total, item) => total + parseFloat(item.cost.replace('$', '')) * item.quantity, 0);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
      <h2>Shopping Cart</h2>
      <h3>Total Plants in Cart: {dummyCartItems.reduce((sum, item) => sum + item.quantity, 0)}</h3>
      <h3>Total Cart Amount: ${calculateTotalAmount()}</h3>

      {dummyCartItems.map((item, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
          <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
          <div>
            <h4>{item.name}</h4>
            <p>Cost: {item.cost}</p>
            <p>Subtotal: ${parseFloat(item.cost.replace('$', '')) * item.quantity}</p>
          </div>
        </div>
      ))}

      <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
        <button onClick={onContinueShopping} style={{ padding: '10px 20px', background: '#2e7d32', color: 'white', border: 'none', cursor: 'pointer' }}>
          Continue Shopping
        </button>
        <button onClick={() => alert('Order Placed Successfully!')} style={{ padding: '10px 20px', background: '#ff9800', color: 'white', border: 'none', cursor: 'pointer' }}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
