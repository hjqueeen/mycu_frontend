import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
} from '@mui/material';
import useCartStore, { Product } from '../../shared/store/use-cart.store';
import product_image from '../../assets/picture/cu-sp1.jpg';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState<number>(1);
  const [showAddButton, setShowAddButton] = useState<boolean>(false); // Add to Cart 버튼 표시 여부
  const [hover, setHover] = useState<boolean>(false); // Hover 상태 관리

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      setQuantity(1); // Reset the quantity after adding to cart
    }
    setShowAddButton(false);
  };

  return (
    <Card
      style={{
        maxWidth: 300,
        margin: '10px',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setShowAddButton(false);
      }}
    >
      <CardContent>
        <Box
          style={{
            position: 'relative',
            width: '100%',
            height: 'auto',
            background: 'lightgray',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={product_image}
            alt="product_image"
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
              transition: 'opacity 0.3s',
            }}
          />
          {/* Hover 시 + 버튼 표시 */}
          {hover && !showAddButton && (
            <Button
              variant="contained"
              color="primary"
              style={{
                width: '50px',
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                zIndex: 2,
                // backgroundColor: 'success.main',
                // color: 'background.paper',
              }}
              onClick={() => setShowAddButton(true)}
            >
              +
            </Button>
          )}
          {hover && showAddButton && (
            <Box
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                zIndex: 2,
                backgroundColor: 'background.paper',
                // color: '#fff',
              }}
            >
              <TextField
                type="number"
                label="Quantity"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                style={{ width: '100px' }}
              />
              <Button
                variant="contained"
                color="error"
                onClick={handleAddToCart}
                style={{ marginLeft: '10px', color: 'background.paper' }}
              >
                +
              </Button>
            </Box>
          )}
        </Box>
        <Typography variant="h5" className="my-3">
          {product.name}
        </Typography>
        {/* <Typography variant="body1">Price: ${product.price}</Typography> */}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
