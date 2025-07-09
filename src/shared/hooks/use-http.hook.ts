import {
  ICategory,
  ICompany,
  GetProductDatailsResponse,
} from '../models/all.types';
import { useFetch } from './use-fetch.hook';

export const useHttp = () => {
  const { fetchData } = useFetch();

  const categoriesGet = async (): Promise<ICategory[]> => {
    return await fetchData(`category`);
  };

  const companiesGet = async (): Promise<ICompany[]> => {
    return await fetchData(`company`);
  };

  const addProductsPost = async (data: any): Promise<any> => {
    return await fetchData(`product/add`, { method: 'POST', body: data });
  };

  const inspectionsGet = async (): Promise<any[]> => {
    return await fetchData(`product/inspections/standard`);
  };

  const inspectionsCountryGet = async (): Promise<any[]> => {
    return await fetchData(`product/inspections/country`);
  };

  const inspectionsProductsGet = async (): Promise<any[]> => {
    return await fetchData(`product/inspections/products`);
  };

  const inspectionsDetailsGet = async (rowId: string): Promise<any[]> => {
    return await fetchData(`product/inspections/details/${rowId}`);
  };

  const productDetailsGet = async (
    rowId: string
  ): Promise<GetProductDatailsResponse | undefined> => {
    return await fetchData(`product/details/${rowId}`);
  };

  const inspectionsNotShippedGet = async (): Promise<any[] | undefined> => {
    return await fetchData(`product/inspections/not_shipped`);
  };

  return {
    addProductsPost,
    categoriesGet,
    companiesGet,
    inspectionsCountryGet,
    inspectionsDetailsGet,
    inspectionsGet,
    inspectionsNotShippedGet,
    inspectionsProductsGet,
    productDetailsGet,
  };
};
