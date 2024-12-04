import { ICategory, ICompany } from '../models/all.types';
import { useAuthStore } from '../store/use-auth.store';
import { useFetch } from './use-fetch.hook';

export const useHttp = () => {
  const { fetchData } = useFetch();
  const { accessToken } = useAuthStore();

  const categoriesGet = async (): Promise<ICategory[]> => {
    return await fetchData(`category`);
  };

  const companiesGet = async (): Promise<ICompany[]> => {
    return await fetchData(`company`);
  };

  const addProductsPost = async (data: any): Promise<any> => {
    if (accessToken) {
      return await fetchData(`product/add`, { method: 'POST', body: data });
    }
  };

  return { categoriesGet, companiesGet, addProductsPost };
};
