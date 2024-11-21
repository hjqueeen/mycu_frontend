import Typography from '@mui/material/Typography';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { styled, alpha } from '@mui/material/styles';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { ContentHeaderProps } from '../../../shared/components/Layout/ContentHeader';
import { useEffect, useState } from 'react';
import { PageType } from '../../../shared/components/Layout/Layout';
import { ProductsContentType } from '../../../shared/models/all.types';
import { useNavigate } from 'react-router-dom';

type Color = 'blue' | 'green';

type ExtendedTreeItemProps = {
  color?: Color;
  id: string;
  label: string;
};

const ITEMS: TreeViewBaseItem<ExtendedTreeItemProps>[] = [
  {
    id: '1',
    label: 'Products',
    children: [
      {
        id: '1.1',
        label: 'All Products',
        color: 'green',
        children: [
          { id: '1.1.1', label: 'Category 1', color: 'blue' },
          { id: '1.1.2', label: 'Category 2', color: 'blue' },
          { id: '1.1.3', label: 'Category 3', color: 'blue' },
          { id: '1.1.4', label: 'Category 4', color: 'blue' },
        ],
      },
      { id: '1.2', label: 'Add Products', color: 'green' },
      { id: '1.3', label: 'Edit Products', color: 'green' },
    ],
  },
  {
    id: '2',
    label: 'Inventory',
    children: [
      { id: '2.1', label: 'All products', color: 'green' },
      {
        id: '2.2',
        label: 'Categories',
        children: [
          { id: '2.2.1', label: 'Gadgets', color: 'blue' },
          { id: '2.2.2', label: 'Phones', color: 'blue' },
          { id: '2.2.3', label: 'Wearables', color: 'blue' },
        ],
      },
      { id: '2.3', label: 'Bestsellers', color: 'green' },
      { id: '2.4', label: 'Sales', color: 'green' },
    ],
  },
  { id: '3', label: 'Shipping', color: 'blue' },
  { id: '4', label: 'User Management', color: 'blue' },
  { id: '5', label: 'Contact', color: 'blue' },
  { id: '6', label: 'Help', color: 'blue' },
];

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.grey[200],
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: {
      fontSize: '0.8rem',
      fontWeight: 500,
    },
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(0, 1.2),
    ...theme.applyStyles('light', {
      backgroundColor: alpha(theme.palette.warning.dark, 0.25),
      color: theme.palette.background.paper,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: alpha(theme.palette.warning.dark, 0.25),
      color: theme.palette.primary.contrastText,
    }),
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  [`& .${treeItemClasses.selected} `]: {
    backgroundColor: theme.palette.warning.dark,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
      color: theme.palette.primary.contrastText,
    },
    '&:not(:focus)': {
      backgroundColor: theme.palette.warning.dark,
      color: theme.palette.primary.contrastText,
    },
  },
  ...theme.applyStyles('light', {
    color: theme.palette.grey[800],
  }),
}));

type DashboardNavProps = {
  defaultExpandedItems: string[];
  defaultSelectedItems: string;
};

const DashboardNav = ({ defaultExpandedItems, defaultSelectedItems }: any) => {
  const navigate = useNavigate();

  const onItemClick = (itemId: string) => {
    switch (itemId) {
      case '1.1':
        navigate('/products/all');
        break;
      case '1.2':
        navigate('/products/add');
        break;
      case '1.3':
        navigate('/products/edit');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Typography component="h2" variant="subtitle2">
        Dashboard
      </Typography>
      <RichTreeView
        items={ITEMS}
        aria-label="pages"
        // multiSelect
        defaultExpandedItems={defaultExpandedItems}
        defaultSelectedItems={defaultSelectedItems}
        onItemClick={(e, itemId) => onItemClick(itemId)}
        sx={{
          m: '0 -8px',
          pb: '8px',
          height: 'fit-content',
          flexGrow: 1,
          overflowY: 'auto',
        }}
        slots={{ item: CustomTreeItem }}
      />
    </>
  );
};

export default DashboardNav;
