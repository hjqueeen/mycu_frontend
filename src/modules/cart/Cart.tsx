// src/components/Cart.tsx
import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import useCartStore, { CartItem } from '../../shared/store/use-cart.store';
import { useNavigate } from 'react-router-dom';

const Cart = ({ onlyContent }: { onlyContent?: boolean }) => {
  const { cart, removeFromCart, addToCart } = useCartStore();
  const navigate = useNavigate();

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
    <div className="p-5 min-w-80">
      {!onlyContent && (
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>
      )}
      {cart.length === 0 ? (
        <Typography className="my-4 py-4" variant="subtitle1">
          Shopping cart is empty.
        </Typography>
      ) : (
        <>
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
                  <IconButton
                    onClick={() => handleIncrease(item)}
                    color="primary"
                  >
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
          {/* 버튼 그룹 */}
          {!onlyContent && (
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
              }}
            >
              <Button variant="outlined" onClick={() => navigate('/cart')}>
                View Cart
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/checkout')}
              >
                Checkout
              </Button>
            </Box>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
