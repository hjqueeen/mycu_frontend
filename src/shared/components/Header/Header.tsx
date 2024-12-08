import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Drawer, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { PageType } from '../Layout/Layout';
import cuLogo from '../../../assets/logo/cropped-CU-LOGO-ohne-Titel.png';
import { HeaderMenu } from '../../models/all.types';
import Cart from '../../../modules/cart/Cart';

export type HeaderProps = {
  pageType: PageType;
  headerMenu: HeaderMenu | undefined;
};

const Header = ({ pageType, headerMenu }: HeaderProps) => {
  const [drawer, setDrawer] = useState(false);
  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar
        className="flex flex-row justify-between"
        sx={{
          bgcolor: 'background.default',
          borderBottom: '1px solid',
          borderColor: 'divider',
          boxShadow: 0,
        }}
      >
        <Box className="flex p-2 ml-2 flex-row items-center">
          <img src={cuLogo} alt="cu-logo" className="w-8 mr-2" />
          <Typography variant="h5" sx={{ color: 'text.secondary' }}>
            CU Medical
          </Typography>
        </Box>

        <Box className="flex flex-row mr-24">
          {headerMenu?.dashboard && (
            <HeaderIcon
              path="/dashboard"
              activ={pageType === PageType.Dashboard}
              icon={['fal', 'objects-column']}
            />
          )}
          {headerMenu?.products && (
            <HeaderIcon
              path="/inspection"
              activ={pageType === PageType.Products}
              icon={['fal', 'chart-network']}
            />
          )}
          {headerMenu?.inventory && (
            <HeaderIcon
              path="/inventory"
              activ={pageType === PageType.Inventory}
              icon={['fal', 'chart-network']}
            />
          )}
          {headerMenu?.shipping && (
            <HeaderIcon
              path="/shipping"
              activ={pageType === PageType.Shipping}
              icon={['fal', 'chart-network']}
            />
          )}
          {headerMenu?.user_management && (
            <HeaderIcon
              path="/user_management"
              activ={pageType === PageType.UserManagement}
              icon={['fal', 'users']}
            />
          )}
          {/* <CartIcon
            path="/cart"
            activ={pageType === PageType.Cart}
            icon={['fas', 'cart-shopping']}
            onClick={() => setDrawer(true)}
          /> */}
          <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
            <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
              <Cart />
            </Stack>
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const HeaderIcon = React.memo(
  ({
    activ,
    path,
    icon,
  }: {
    activ: boolean;
    path: string;
    icon: [IconPrefix, IconName];
  }) => {
    return (
      <Link to={path}>
        <Box
          className="mr-4 py-5 px-4"
          sx={{
            color: 'text.primary',
            fontWeight: activ ? 600 : undefined,
            '&:hover': {
              fontWeight: 600,
              bgcolor: 'bg.hover',
            },
          }}
        >
          {path.slice(1).replace('_', ' ').toUpperCase()}
        </Box>
      </Link>
    );
  }
);

// const CartIcon = ({
//   activ,
//   path,
//   icon,
//   onClick,
// }: {
//   activ: boolean;
//   path: string;
//   icon: [IconPrefix, IconName];
//   onClick: () => void;
// }) => {
//   const { cart } = useCartStore();
//   const calculateTotalQuantity = (cart: CartItem[]): number => {
//     return cart.reduce((total, item) => total + item.quantity, 0);
//   };

//   const count = calculateTotalQuantity(cart);
//   return (
//     <Box
//       className="mr-4 py-5 px-4 flex flex-row"
//       onClick={onClick}
//       sx={{
//         color: 'text.primary',
//         fontWeight: activ ? 600 : undefined,
//         '&:hover': {
//           fontWeight: 600,
//           bgcolor: 'bg.hover',
//         },
//       }}
//     >
//       {`${path.slice(1).toUpperCase()} (${count})`}
//     </Box>
//   );
// };

export default React.memo(Header);
