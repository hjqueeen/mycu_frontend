import React, { useEffect, useState } from 'react';
import { Box, Grid2 as Grid } from '@mui/material';
import ProductCard from '../ProductCard';
import { Product } from '../../../shared/store/use-cart.store';
import { useMutation } from 'react-query';
import { useFetch } from '../../../shared/hooks/use-fetch.hook';
import { useProductsHttp } from '../../../shared/hooks/use-products-http.hook';

const InspectionAll: React.FC = () => {
  const { handleError, handleRetry } = useFetch();
  const { productsGet } = useProductsHttp();
  const [products, setProducts] = useState<Product[]>([]);

  const productsGetMutation = useMutation(() => productsGet(), {
    retry: (failureCount, error: any) => handleRetry(failureCount, error),
    onSuccess(data) {
      if (data) {
        setProducts(data);
        console.log('products', data);
      }
    },
    onError(error) {
      if (error) {
        const errRes = error?.response;
        if (errRes) {
        }
      }
    },
  });

  useEffect(() => {
    productsGetMutation.mutate();
  }, []);

  return (
    <Box className="w-full flex flex-row justify-center">
      <Grid container spacing={2} style={{ padding: '20px', maxWidth: 1400 }}>
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InspectionAll;
