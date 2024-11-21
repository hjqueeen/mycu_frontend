import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsPageProps } from '../Products';

import { ProductsContentType } from '../../../shared/models/all.types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

const mainListItems = [
  {
    text: 'All Products',
    icon: <HomeRoundedIcon />,
    type: ProductsContentType.All,
  },
  {
    text: 'Add Product',
    icon: <AnalyticsRoundedIcon />,
    type: ProductsContentType.Add,
  },
  {
    text: 'Edit Product',
    icon: <PeopleRoundedIcon />,
    type: ProductsContentType.Edit,
  },
  // { text: 'Tasks', icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

const ProductNav = ({ type }: ProductsPageProps) => {
  const navigate = useNavigate();
  const onNavClick = useCallback((type: ProductsContentType) => {
    switch (type) {
      case ProductsContentType.Add:
        navigate('/products/add');
        break;
      case ProductsContentType.All:
        navigate('/products/all');
        break;
      case ProductsContentType.Edit:
        navigate('/products/edit');
        break;
      default:
        break;
    }
  }, []);

  return (
    <>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={index === 0}
              onClick={() => onNavClick(item.type)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ProductNav;
