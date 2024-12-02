import Typography from '@mui/material/Typography';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { styled, alpha } from '@mui/material/styles';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { ContentHeaderProps } from '../../../shared/components/Layout/ContentHeader';
import { useEffect, useState } from 'react';
import { PageType } from '../../../shared/components/Layout/Layout';
import {
  ExtendedTreeItemProps,
  ProductsContentType,
  UserGroup,
} from '../../../shared/models/all.types';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useUsersHttp } from '../../../shared/hooks/use-users-http.hook';
import { useFetch } from '../../../shared/hooks/use-fetch.hook';
import { useUserStore } from '../../../shared/store/use-user.store';

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
    '&:not(:focus):not(:hover)': {
      backgroundColor: theme.palette.warning.dark,
      color: theme.palette.primary.contrastText,
    },
    '&:hover, &:focus': {
      backgroundColor: theme.palette.warning.dark,
      color: theme.palette.primary.contrastText,
    },
    '&:hover, &:not(:focus)': {
      backgroundColor: theme.palette.warning.dark,
      color: theme.palette.primary.contrastText,
    },
  },
  ...theme.applyStyles('light', {
    color: theme.palette.grey[800],
  }),
}));

type DashboardNavProps = {
  defaultExpandedItems: string[] | undefined;
  defaultSelectedItems: string | undefined;
};

const DashboardNav = ({
  defaultExpandedItems,
  defaultSelectedItems,
}: DashboardNavProps) => {
  const navigate = useNavigate();
  const { handleError, handleRetry } = useFetch();
  const { userGroupsGet } = useUsersHttp();

  const { navUserGroups, setNavUserGroups } = useUserStore();

  const userGroupsGetMutation = useMutation(() => userGroupsGet(), {
    retry: (failureCount, error: any) => handleRetry(failureCount, error),
    onSuccess(data) {
      if (data) {
        setNavUserGroups(data);
      }
    },
    onError(error) {
      if (error) {
        const errRes = error?.response;
        if (errRes) {
        }
      }
    },
  });

  useEffect(() => {
    userGroupsGetMutation.mutate();
  }, []);

  const ITEMS: TreeViewBaseItem<ExtendedTreeItemProps>[] = [
    {
      id: '1',
      label: '출하관리',
      children: [
        {
          id: '1.1',
          label: '출하내역',
          // children: [
          //   { id: '1.1.1', label: 'Category 1' },
          //   { id: '1.1.2', label: 'Category 2' },
          //   { id: '1.1.3', label: 'Category 3' },
          //   { id: '1.1.4', label: 'Category 4' },
          // ],
        },
        { id: '1.2', label: '출하검사' },
        // { id: '1.3', label: 'Edit Products' },
      ],
    },
    // {
    //   id: '2',
    //   label: 'Inventory',
    //   children: [
    //     { id: '2.1', label: 'All products' },
    //     {
    //       id: '2.2',
    //       label: 'Categories',
    //       children: [
    //         { id: '2.2.1', label: 'Gadgets' },
    //         { id: '2.2.2', label: 'Phones' },
    //         { id: '2.2.3', label: 'Wearables' },
    //       ],
    //     },
    //     { id: '2.3', label: 'Bestsellers' },
    //     { id: '2.4', label: 'Sales' },
    //   ],
    // },
    // { id: '3', label: 'Shipping' },
    // { id: '4', label: 'User Management', children: navUserGroups },
    // { id: '5', label: 'Contact' },
    // { id: '6', label: 'Help' },
    // {
    //   id: '7',
    //   label: 'Settings',
    //   children: [
    //     { id: '7.1', label: 'Profile' },
    //     {
    //       id: '7.2',
    //       label: 'Account',
    //     },
    //   ],
    // },
  ];

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
        메뉴
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
