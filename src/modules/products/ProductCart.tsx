import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import useCartStore, { Product } from '../../shared/store/use-cart.store';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Card style={{ maxWidth: 300, margin: '10px' }}>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        {/* <Typography variant="body1">Price: ${product.price}</Typography> */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
