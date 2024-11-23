import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './ProductCart';
import { Product } from '../../shared/store/use-cart.store';
import Cart from '../cart/Cart';

const products: Product[] = [
  { id: '1', name: 'Laptop', price: 1000 },
  { id: '2', name: 'Smartphone', price: 700 },
  { id: '3', name: 'Headphones', price: 200 },
  { id: '4', name: 'Monitor', price: 300 },
];

const ProductGrid: React.FC = () => {
  return (
    <Grid container spacing={2} style={{ padding: '20px' }}>
      <Grid item xs={12} md={8}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12} md={4}>
        <Cart />
      </Grid>
    </Grid>
  );
};

export default ProductGrid;
