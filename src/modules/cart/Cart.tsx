import React from 'react';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import useCartStore from '../../shared/store/use-cart.store';

const Cart: React.FC = () => {
  const { cart, removeFromCart } = useCartStore();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Shopping Cart</h2>
      <List>
        {cart.map((item) => (
          <ListItem
            key={item.id}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <ListItemText
              primary={item.name}
              secondary={`Price: ${item.price} | Quantity: ${item.quantity}`}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Cart;
