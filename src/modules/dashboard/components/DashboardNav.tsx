import React from 'react';
import Typography from '@mui/material/Typography';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import { styled, alpha } from '@mui/material/styles';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { useEffect } from 'react';
import { ExtendedTreeItemProps } from '../../../shared/models/all.types';
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
      backgroundColor: alpha(theme.palette.primary.main, 0.25),
    }),
    ...theme.applyStyles('dark', {
      color: theme.palette.primary.contrastText,
    }),
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
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
      id: '0',
      label: '대시보드',
      children: [],
    },
    {
      id: '1',
      label: '최종검사',
      children: [
        {
          id: '1.1',
          label: '출하내역',
          children: [
            { id: '1.1.1', label: '국가별보기' },
            { id: '1.1.2', label: '출고별보기' },
            { id: '1.1.3', label: '제품별보기' },
          ],
        },
        { id: '1.2', label: '출하검사' },
        { id: '1.3', label: '출하검사서' },
      ],
    },
    {
      id: '2',
      label: '물류출하',
      children: [
        { id: '2.1', label: '제품출고' },
        { id: '2.2', label: '출고이력수정' },

        // {
        //   id: '2.2',
        //   label: 'Categories',
        //   children: [
        //     { id: '2.2.1', label: 'Gadgets' },
        //     { id: '2.2.2', label: 'Phones' },
        //     { id: '2.2.3', label: 'Wearables' },
        //   ],
        // },
        // { id: '2.3', label: 'Bestsellers' },
        // { id: '2.4', label: 'Sales' },
      ],
    },
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
    console.log('itemId', itemId);

    switch (itemId) {
      case '0':
        navigate('/dashboard');
        break;
      case '1.1.1':
        navigate('/inspection/country');
        break;
      case '1.1.2':
        navigate('/inspection/standard');
        break;
      case '1.1.3':
        navigate('/inspection/products');
        break;
      case '1.2':
        navigate('/inspection/add');
        break;
      case '1.3':
        navigate('/inspection/template');
        break;
      case '2.1':
        navigate('/shipping/add');
        break;
      case '2.2':
        navigate('/shipping/edit');
        break;
      default:
        break;
    }
  };

  return (
    <>
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

export default React.memo(DashboardNav);
