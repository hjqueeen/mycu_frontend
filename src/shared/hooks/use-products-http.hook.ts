import { FetchDataParams } from '../models/all.types';
import { Product } from '../store/use-cart.store';
import { useFetch } from './use-fetch.hook';

export const useProductsHttp = () => {
  const { fetchData } = useFetch();

  const productsGet = async (params?: FetchDataParams): Promise<Product[]> => {
    return await fetchData(`product`, {
      params,
    });
  };
  return { productsGet };
};
