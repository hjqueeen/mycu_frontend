import {
  Button,
  Dialog,
  DialogContent,
  Grid2 as Grid,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import React from 'react';
import { useMutation } from 'react-query';
import CustomDataGrid from '../../shared/components/CustomDataGrid';
import { useHttp } from '../../shared/hooks/use-http.hook';
import { fullNameGet } from '../../shared/utils/shared.util';
import {
  FormGrid,
  FormLabelStyled,
  OutlinedInputStyled,
} from '../inspection/InspectionAdd/InspectionAdd';
import { inpectionColumns } from '../inspection/InspectionsList/DataGridColumns';

const ShippingAdd = () => {
  const { inspectionsNotShippedGet } = useHttp();
  const [formValues, setFormValues] = React.useState<any>(undefined);
  const [open, setOpen] = React.useState(false);
  const [selectedProuct, setSelectedProuct] = React.useState<any>(undefined);

  /********************/
  /*     Mutation     */
  /********************/

  const {
    mutate,
    data: rows,
    isLoading,
  } = useMutation(() => inspectionsNotShippedGet());

  React.useEffect(() => {
    mutate();
  }, []);

  return (
    <Grid container spacing={2} className="flex p-5 w-full">
      <FormGrid size={12}>
        <FormLabelStyled>출하검사</FormLabelStyled>
        <OutlinedInputStyled
          disabled
          id="inspection_id"
          name="inspection_id"
          type="text"
          size="small"
        />
        <Button
          className="ml-2 border border-solid w-fit shrink-0"
          sx={{ borderColor: 'divider' }}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          조회 및 선택
        </Button>
      </FormGrid>
      <FormGrid size={{ xs: 4 }}>
        <FormLabelStyled>출고날짜</FormLabelStyled>
        <OutlinedInputStyled
          disabled
          id="inspection_date"
          name="inspection_date"
          type="date"
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 4 }}>
        <FormLabelStyled>담당자</FormLabelStyled>
        <OutlinedInputStyled
          disabled
          id="inspector"
          name="inspector"
          type="text"
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 8 }}>
        <FormLabelStyled>비고</FormLabelStyled>
        <OutlinedInput
          className="w-full"
          id="remarks"
          name="remarks"
          type="text"
          size="small"
        />
      </FormGrid>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <CustomDataGrid
            rows={rows || []}
            columns={inpectionColumns}
            pageSize={5}
            pageSizeOptions={[5, 10, 20]}
            loading={isLoading}
            disableRowSelectionOnClick
          />
        </DialogContent>{' '}
      </Dialog>
    </Grid>
  );
};

export default ShippingAdd;
