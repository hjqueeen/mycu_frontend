import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider, { dividerClasses } from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import { paperClasses } from '@mui/material/Paper';
import { listClasses } from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MenuButton from './MenuButton';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../shared/store/use-auth.store';
import { useUserStore } from '../../shared/store/use-user.store';
// import MenuButton from './MenuButton';
enum MenuType {
  Account = 'ACCOUNT',
  Password = 'PASSWORD',
  OrderHistory = 'ORDER_HISTORY',
  OrderSettings = 'ORDER_SETTINGS',
}
const MenuItem = styled(MuiMenuItem)({
  margin: '2px 0',
});

export default function OptionsMenu() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Auth store state
  const { setAccessToken } = useAuthStore();

  // User store state
  const { setAccount } = useUserStore();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (type: MenuType) => {
    switch (type) {
      case MenuType.Account:
        navigate('/account');
        break;
      case MenuType.Password:
        navigate('/password');
        break;
      case MenuType.OrderHistory:
        navigate('/order_history');
        break;
      case MenuType.OrderSettings:
        navigate('/order_settings');
        break;
      default:
        break;
    }
  };
  const logOut = () => {
    setAccount(undefined);
    setAccessToken(null);
    navigate('/login');
  };

  return (
    <React.Fragment>
      <MenuButton
        aria-label="Open menu"
        onClick={handleClick}
        sx={{ borderColor: 'transparent' }}
      >
        <MoreVertRoundedIcon />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          [`& .${listClasses.root}`]: {
            padding: '4px',
          },
          [`& .${paperClasses.root}`]: {
            padding: 0,
          },
          [`& .${dividerClasses.root}`]: {
            margin: '4px -4px',
          },
        }}
      >
        <MenuItem onClick={() => handleMenuClick(MenuType.Account)}>
          My account
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick(MenuType.Password)}>
          Change Password
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleMenuClick(MenuType.OrderHistory)}>
          Order history
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick(MenuType.OrderSettings)}>
          Order settings
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={logOut}
          sx={{
            [`& .${listItemIconClasses.root}`]: {
              ml: 'auto',
              minWidth: 0,
            },
          }}
        >
          <ListItemText>Logout</ListItemText>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
