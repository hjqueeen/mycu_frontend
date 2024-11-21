import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsPageProps } from '../Products';
import avatar from '../../../assets/picture/avatar.jpg';
import OptionsMenu from '../OptionsMenu';
import MenuContent from '../MenuContent';
import { ProductsPageType } from '../../../shared/models/all.types';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

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
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      {/* <Box
      sx={{
        display: 'flex',
        mt: 'calc(var(--template-frame-height, 0px) + 4px)',
        p: 1.5,
      }}
    >
      <SelectContent />
    </Box> 
      <Divider />*/}
      <MenuContent onClick={onNavClick} />
      {/* <CardAlert /> */}
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt="Riley Carter"
          src={avatar}
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: '16px' }}
          >
            Pyunggang Park
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            ppg6530@email.com
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
    // <Box className={styles['navigation-container']}>
    //   <NavButton
    //     active={type === ProductsPageType.All}
    //     title="All Products"
    //     icon={faEye}
    //     onClick={() => onNavClick(ProductsPageType.All)}
    //   />
    //   <NavButton
    //     active={type === ProductsPageType.Add}
    //     title="Add Product"
    //     icon={faSquarePlus}
    //     onClick={() => onNavClick(ProductsPageType.Add)}
    //   />
    //   <NavButton
    //     active={type === ProductsPageType.Edit}
    //     title="Edit Product"
    //     icon={faPenToSquare}
    //     onClick={() => onNavClick(ProductsPageType.Edit)}
    //   />
    // </Box>
  );
};

export default ProductNav;
