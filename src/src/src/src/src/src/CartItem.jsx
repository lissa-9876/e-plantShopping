import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const numericCost = parseFloat(item.cost.replace('$', ''));
      total += numericCost * item.quantity;
    });
    return total.toFixed(2);
  };

  // Calculate total quantity of all items in cart
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate total cost for individual plant based on quantity
  const calculateTotalCost = (item) => {
    const numericCost = parseFloat(item.cost.replace('$', ''));
    return (numericCost * item.quantity).toFixed(2);
  };

  // Increment item quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decrement item quantity or remove if reaches 0
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item from cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Checkout button handler with Coming Soon message
  const handleCheckoutShopping = (e) => {
    alert('Coming Soon: Checkout functionality will be added in future updates!');
  };

  return (
    <div className="cart-container" style={{ padding: '30px', maxWidth: '850px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', color: '#2e7d32' }}>Total Plants in Cart: {calculateTotalQuantity()}</h2>
      <h2 style={{ textAlign: 'center', color: '#1b5e20', marginBottom: '30px' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      
      <div>
        {cart.length === 0 ? (
          <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item.name} style={{ display: 'flex', gap: '20px', alignItems: 'center', borderBottom: '1px solid #eee', padding: '15px 0' }}>
              <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
                <p style={{ margin: '2px 0', color: '#555' }}>Unit Price: {item.cost}</p>
                <p style={{ margin: '2px 0', fontWeight: 'bold', color: '#2e7d32' }}>Total Cost: ${calculateTotalCost(item)}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => handleDecrement(item)} style={{ padding: '6px 14px', background: '#e0e0e0', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>-</button>
                <span style={{ fontWeight: 'bold', minWidth: '25px', textAlign: 'center', fontSize: '16px' }}>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)} style={{ padding: '6px 14px', background: '#e0e0e0', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}>+</button>
              </div>
              <button onClick={() => handleRemove(item)} style={{ padding: '8px 16px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <button onClick={(e) => onContinueShopping(e)} style={{ padding: '12px 24px', background: '#2e7d32', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
          Continue Shopping
        </button>
        <button onClick={(e) => handleCheckoutShopping(e)} style={{ padding: '12px 24px', background: '#ff9800', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
