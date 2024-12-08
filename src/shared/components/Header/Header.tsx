import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Drawer, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  IconDefinition,
  IconName,
  IconPrefix,
} from '@fortawesome/fontawesome-svg-core';
import { PageType } from '../Layout/Layout';
import cuLogo from '../../../assets/logo/cropped-CU-LOGO-ohne-Titel.png';
import { HeaderMenu } from '../../models/all.types';
import Cart from '../../../modules/cart/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { firstAlphabetGet } from '../../utils/shared.util';
import OptionsMenu from '../../../modules/inspection/ProductAdd/OptionsMenu';
import { useUserStore } from '../../store/use-user.store';
import { faBell, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';

export type HeaderProps = {
  pageType: PageType;
  headerMenu: HeaderMenu | undefined;
};

const Header = ({ pageType, headerMenu }: HeaderProps) => {
  const [drawer, setDrawer] = useState(false);
  const { account } = useUserStore();

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar
        className="flex flex-row justify-between pl-5 pr-8"
        sx={{
          bgcolor: 'background.default',
          borderBottom: '1px solid',
          borderColor: 'divider',
          boxShadow: 0,
        }}
      >
        <Box className="flex p-2 flex-row items-center">
          <img src={cuLogo} alt="cu-logo" className="w-8 mr-2" />
          <Typography variant="h5" sx={{ color: 'text.secondary' }}>
            CU Medical
          </Typography>
        </Box>
        <Box className="flex flex-row items-center">
          {headerMenu?.dashboard && (
            <HeaderIcon
              path="/dashboard"
              activ={pageType === PageType.Dashboard}
              icon={faHouse}
            />
          )}
          {headerMenu?.notification && (
            <HeaderIcon
              path="/notification"
              activ={pageType === PageType.Alarm}
              icon={faBell}
            />
          )}
          {/* {headerMenu?.products && (
            <HeaderIcon
              path="/inspection"
              activ={pageType === PageType.Products}
            />
          )}
          {headerMenu?.inventory && (
            <HeaderIcon
              path="/inventory"
              activ={pageType === PageType.Inventory}
            />
          )}
          {headerMenu?.shipping && (
            <HeaderIcon
              path="/shipping"
              activ={pageType === PageType.Shipping}
            />
          )}
          {headerMenu?.user_management && (
            <HeaderIcon
              path="/user_management"
              activ={pageType === PageType.UserManagement}
            />
          )} */}

          {/* <CartIcon
            path="/cart"
            activ={pageType === PageType.Cart}
            icon={['fas', 'cart-shopping']}
            onClick={() => setDrawer(true)}
          /> */}
          <OptionsMenu name={firstAlphabetGet(account)} />
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
    icon: IconDefinition;
  }) => {
    return (
      <Link to={path}>
        <Box
          className="py-5 px-4"
          sx={{
            color: 'text.primary',
            fontWeight: activ ? 600 : undefined,
            '&:hover': {
              fontWeight: 600,
              bgcolor: 'bg.hover',
            },
          }}
        >
          <FontAwesomeIcon className="text-lg" icon={icon} />
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
