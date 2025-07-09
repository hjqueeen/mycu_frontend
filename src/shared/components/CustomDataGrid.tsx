import { GridColDef, GridToolbar } from '@mui/x-data-grid';
import { DataGridPro } from '@mui/x-data-grid-pro';
import React from 'react';

const CustomDataGrid = ({
  columns,
  rows,
  loading,
  pageSize,
  pageSizeOptions,
  disableRowSelectionOnClick,
  style,
  onRowClick,
}: {
  columns: GridColDef[];
  rows: any[];
  loading?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  disableRowSelectionOnClick?: boolean;
  style?: React.CSSProperties;
  onRowClick?: (params: any) => void;
}) => {
  return (
    <DataGridPro
      editMode="row"
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: { paginationModel: { pageSize: pageSize } },
      }}
      pageSizeOptions={[20, 50, 100]}
      density="compact"
      loading={loading}
      onRowClick={onRowClick} // 행 클릭 이벤트 핸들러
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      sx={{
        '& .MuiDataGrid-row:hover': {
          cursor: 'pointer',
        },
      }}
      style={style}
      disableRowSelectionOnClick={disableRowSelectionOnClick}
    />
  );
};

export default React.memo(CustomDataGrid);
