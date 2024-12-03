import { ICategory, ICompany } from '../models/all.types';
import { useFetch } from './use-fetch.hook';

export const useHttp = () => {
  const { fetchData } = useFetch();

  const categoriesGet = async (): Promise<ICategory[]> => {
    return await fetchData(`category`);
  };

  const companiesGet = async (): Promise<ICompany[]> => {
    return await fetchData(`company`);
  };
  return { categoriesGet, companiesGet };
};
