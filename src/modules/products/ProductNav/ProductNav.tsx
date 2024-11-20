import {
  faEye,
  faPenToSquare,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import { Box } from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsPageProps, ProductsPageType } from '..';
import { NavButton } from '../../../shared/ui/NavButton/NavButton';
import styles from './ProductNav.module.scss';

const ProductNav = ({ type }: ProductsPageProps) => {
  const navigate = useNavigate();
  const onNavClick = useCallback((type: ProductsPageType) => {
    switch (type) {
      case ProductsPageType.Add:
        navigate('/products/add');
        break;
      case ProductsPageType.All:
        navigate('/products/all');
        break;
      case ProductsPageType.Edit:
        navigate('/products/edit');
        break;
      default:
        break;
    }
  }, []);

  return (
    <Box className={styles['navigation-container']}>
      <NavButton
        active={type === ProductsPageType.All}
        title="All Products"
        icon={faEye}
        onClick={() => onNavClick(ProductsPageType.All)}
      />
      <NavButton
        active={type === ProductsPageType.Add}
        title="Add Product"
        icon={faSquarePlus}
        onClick={() => onNavClick(ProductsPageType.Add)}
      />
      <NavButton
        active={type === ProductsPageType.Edit}
        title="Edit Product"
        icon={faPenToSquare}
        onClick={() => onNavClick(ProductsPageType.Edit)}
      />
    </Box>
  );
};

export default ProductNav;
