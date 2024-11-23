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
  const [showAdButton, setShowAdButton] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
      setQuantity(1); // Reset the quantity after adding to cart
    }
    setShowAdButton(false);
  };

  return (
    <Card
      style={{
        maxWidth: 300,
        margin: '10px',
      }}
    >
      <CardContent>
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
        <Typography variant="h5" className="mb-6">
          {product.name}
        </Typography>
        {/* <Typography variant="body1">Price: ${product.price}</Typography> */}
        {showAdButton && (
          <Box>
            <TextField
              type="number"
              label="Quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              style={{ marginBottom: '10px', width: '100px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              style={{ marginLeft: '10px' }}
            >
              Add to Cart
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
