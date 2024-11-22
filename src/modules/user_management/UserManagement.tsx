import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useFetch } from '../../shared/hooks/use-fetch.hook';
import { useUsersHttp } from '../../shared/hooks/use-users-http.hook';
import { Profile } from '../../shared/models/all.types';
import { useAuthStore } from '../../shared/store/use-auth.store';

export const UserManagement = () => {
  const { usersGet } = useUsersHttp();
  const { handleError, handleRetry } = useFetch();
  // Auth store state
  const { accessToken } = useAuthStore();
  const [users, setUsers] = useState<Profile[]>([]);

  const usersGetMutation = useMutation(() => usersGet(), {
    retry: (failureCount, error: any) => handleRetry(failureCount, error),
    onSuccess(data) {
      if (data) {
        setUsers(data);
        console.log('users', data);
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
    usersGetMutation.mutate();
  }, []);

  const columns: GridColDef<(typeof users)[number]>[] = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'first_name',
      headerName: 'Name',
      type: 'string',
      width: 120,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      width: 180,
      editable: true,
    },
    {
      field: 'role',
      headerName: 'Role',
      type: 'string',
      width: 110,
      editable: true,
    },
  ];

  return (
    <div>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        rowHeight={38}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
};
