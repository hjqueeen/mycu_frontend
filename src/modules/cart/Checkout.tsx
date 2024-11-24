import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Divider } from '@mui/material';
import Cart from './Cart';

const Checkout: React.FC = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleOrderSubmit = () => {
    const orderData = {
      shippingAddress,
      billingAddress,
      paymentMethod,
      items: JSON.parse(localStorage.getItem('cart') || '[]'),
    };

    // TODO: 서버로 주문 데이터 전송 및 처리
    console.log('Order Submitted:', orderData);

    // 사용자가 주문 데이터를 제출했음을 알리는 메시지
    alert('Order submitted successfully!');

    // 로컬 장바구니 초기화
    localStorage.removeItem('cart');

    // 메인 페이지로 리디렉션
    window.location.href = '/';
  };

  return (
    <Box style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Cart onlyContent />
      <Divider />
      <Box className="my-6">
        <TextField
          label="Shipping Address"
          fullWidth
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Billing Address"
          fullWidth
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        {/* <TextField
          label="Payment Method"
          fullWidth
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        /> */}
      </Box>
      <Button variant="contained" color="primary" onClick={handleOrderSubmit}>
        Submit Order
      </Button>
    </Box>
  );
};

export default Checkout;
