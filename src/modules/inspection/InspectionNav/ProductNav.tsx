import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsPageProps } from '../Inspection';

import { InspectionContentType } from '../../../shared/models/all.types';
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
    type: InspectionContentType.All,
  },
  {
    text: 'Add Product',
    icon: <AnalyticsRoundedIcon />,
    type: InspectionContentType.Add,
  },
  {
    text: 'Edit Product',
    icon: <PeopleRoundedIcon />,
    type: InspectionContentType.Edit,
  },
  {
    text: 'Insection Template',
    icon: <PeopleRoundedIcon />,
    type: InspectionContentType.Template,
  },
  // { text: 'Tasks', icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

const InspectionNav = ({ type }: ProductsPageProps) => {
  const navigate = useNavigate();
  const onNavClick = useCallback((type: InspectionContentType) => {
    switch (type) {
      case InspectionContentType.Add:
        navigate('/inspection/add');
        break;
      case InspectionContentType.All:
        navigate('/inspection/all');
        break;
      case InspectionContentType.Edit:
        navigate('/inspection/edit');
        break;
      case InspectionContentType.Template:
        navigate('/inspection/template');
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

export default InspectionNav;
