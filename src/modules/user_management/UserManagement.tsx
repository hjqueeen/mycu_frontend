import {
  DataGrid,
  GridActionsCellItem,
  GridApi,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  useGridApiRef,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useFetch } from '../../shared/hooks/use-fetch.hook';
import { useUsersHttp } from '../../shared/hooks/use-users-http.hook';
import { Profile } from '../../shared/models/all.types';
import { UserRole } from '../user/models/user.types';
import EditIcon from '@mui/icons-material/Edit';
import { useUserStore } from '../../shared/store/use-user.store';

export const UserManagement = () => {
  const { fetchData } = useFetch();
  const { usersGet } = useUsersHttp();
  const { handleError, handleRetry } = useFetch();

  const { navUserGroups, setNavUserGroups } = useUserStore();

  const [rows, setRows] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const groupOptions = navUserGroups.map((group) => group.label);

  console.log('groupOptions', groupOptions);

  // Mutation for saving changes to the database
  const mutation = useMutation((updatedProfile: Profile) => usersGet(), {
    onSuccess: (data, variables) => {
      console.log(`Updated product ${variables}`);
    },
    onError: (error) => {
      console.error('Error updating product:', error);
    },
  });

  const usersGetMutation = useMutation(() => usersGet(), {
    retry: (failureCount, error: any) => handleRetry(failureCount, error),
    onSuccess(data) {
      if (data) {
        setRows(data);
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

  // Handle row updates
  const handleProcessRowUpdate = async (newRow: Profile, oldRow: Profile) => {
    if (newRow.role === oldRow.role) {
      return oldRow; // 변경 없으면 기존 데이터 유지
    }
    setLoading(true);

    try {
      // 데이터베이스 업데이트 (예: API 호출)
      await fetchData('users/update-user-group', {
        method: 'PATCH',
        body: { id: newRow.id, role: newRow.role },
      });
      setLoading(false);
      return newRow; // 성공 시 변경된 데이터 반영
    } catch (error) {
      console.error('Failed to update group', error);
      setLoading(false);
      alert('그룹 업데이트 실패');
      return oldRow; // 실패 시 이전 데이터 유지
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
      setRowModesModel({
        ...rowModesModel,
        [params.id]: { mode: GridRowModes.View },
      });
    }
  };

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'first_name',
      headerName: 'Name',
      type: 'string',
      width: 120,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      width: 180,
      editable: false,
    },
    {
      field: 'group_name',
      headerName: 'Group',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: groupOptions,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {params.value}
          <EditIcon
            onClick={handleEditClick(params.id)}
            style={{
              fontSize: 16,
              marginRight: 4,
              color: 'text.secondary',
              cursor: 'pointer',
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full py-4">
      <DataGrid
        autoHeight
        editMode="row"
        rows={rows}
        columns={columns}
        loading={loading}
        processRowUpdate={handleProcessRowUpdate}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        initialState={{
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        slotProps={{
          filterPanel: {
            filterFormProps: {
              logicOperatorInputProps: {
                variant: 'outlined',
                size: 'small',
              },
              columnInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              operatorInputProps: {
                variant: 'outlined',
                size: 'small',
                sx: { mt: 'auto' },
              },
              valueInputProps: {
                InputComponentProps: {
                  variant: 'outlined',
                  size: 'small',
                },
              },
            },
          },
        }}
      />
      {/* <DataGrid
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
      /> */}
    </div>
  );
};
