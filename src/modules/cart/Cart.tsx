// src/components/Cart.tsx
import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import useCartStore, { CartItem } from '../../shared/store/use-cart.store';

const Cart: React.FC = () => {
  const { cart, removeFromCart, addToCart } = useCartStore();

  const handleIncrease = (item: CartItem) => {
    addToCart(item, 1); // 수량 증가
  };

  const handleDecrease = (item: CartItem) => {
    if (item.quantity > 0) {
      addToCart(item, -1); // 수량 감소
    } else {
      removeFromCart(item.id); // 수량이 0이면 상품 제거
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {cart.map((item) => (
          <ListItem
            key={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* 상품 이름 및 가격 */}
            <ListItemText
              className="mr-4"
              primary={item.name}
              //   secondary={Price: $${item.price}}
              style={{ flex: 2 }}
            />

            {/* 수량 조절 */}
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* 수량 감소 버튼 (- 또는 삭제 버튼) */}
              <IconButton
                onClick={() => handleDecrease(item)}
                color="secondary"
              >
                {item.quantity > 0 ? <Remove /> : <Delete />}
              </IconButton>

              {/* 수량 표시 */}
              <Typography variant="body1" style={{ margin: '0 10px' }}>
                {item.quantity}
              </Typography>

              {/* 수량 증가 버튼 (+) */}
              <IconButton onClick={() => handleIncrease(item)} color="primary">
                <Add />
              </IconButton>
            </Box>

            {/* 전체 합계 */}
            {/* <Typography variant="body1" style={{ flex: 1, textAlign: 'right' }}>
              ${item.price * item.quantity}
            </Typography> */}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Cart;
