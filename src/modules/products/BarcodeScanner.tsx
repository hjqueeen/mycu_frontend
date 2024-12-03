import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import React, { forwardRef, useState } from 'react';
import {
  Barcode,
  FormGrid,
  FormLabelStyled,
  OutlinedInputStyled,
} from './ProductAdd/ProductAdd';

const BarcodeScanner = (
  {
    active,
    type,
    title,
    // code,
    barcode,
    // setCode,
    disabled,
    // setBarcode,
    onClick,
    onChange,
  }: {
    active: boolean;
    type: 'device' | 'battery' | 'pads';
    title: string;
    barcode: Barcode;
    // code: string;
    disabled: boolean;
    // setCode: React.Dispatch<React.SetStateAction<string>>;
    // setBarcode: React.Dispatch<React.SetStateAction<Barcode>>;
    onClick: () => void;
    onChange: (event: any) => void;
  },
  ref: any
) => {
  // const [code, setCode] = useState('');
  const [showContent, setShowContent] = useState(false);

  React.useEffect(() => {
    if (!active && barcode[type] === '') {
      setShowContent(false);
    } else {
      setShowContent(true);
    }
  }, [active, barcode]);

  // const handleInputChange = React.useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setCode(event.target.value);
  //   },
  //   []
  // );

  return (
    <Grid
      container
      spacing={1}
      className="flex flex-col min-h-[185px]"
      sx={{
        cursor: active ? undefined : 'pointer',
        padding: 0,
      }}
    >
      {showContent ? (
        <Box
          className="p-2"
          sx={{ backgroundColor: !active ? 'background.paper' : undefined }}
        >
          <Typography variant="h6">{title}</Typography>
          <FormGrid>
            <FormLabelStyled>UDI 바코드</FormLabelStyled>
            <OutlinedInputStyled
              disabled={disabled}
              type="text"
              size="small"
              value={barcode[type]}
              onChange={onChange}
              autoFocus
              // onKeyPress={(event) => {
              //   if (event.key === 'Enter') handleScan();
              // }}
              placeholder="바코드를 스캔하세요"
              sx={{ width: '100%' }}
            />
            <FontAwesomeIcon
              className="cursor-pointer ml-2"
              icon={faRotateLeft}
              onClick={() => {
                // setCode('');
                // setBarcode({
                //   udi: '',
                //   lot: '',
                //   serial: '',
                //   manufacture_date: '',
                //   expiration_date: '',
                // });
              }}
            />
          </FormGrid>
          <FormGrid>
            <FormLabelStyled>LOT 번호</FormLabelStyled>
            <OutlinedInputStyled
              id="device_lot"
              name="device_lot"
              // value={barcode.lot}
            />
          </FormGrid>
          {type === 'pads' ? (
            <FormGrid>
              <FormLabelStyled>유효기간</FormLabelStyled>
              <OutlinedInputStyled
                id="expiration_date"
                name="expiration_date"
                // value={barcode.expiration_date}
              />
            </FormGrid>
          ) : (
            <FormGrid>
              <FormLabelStyled>SERIAL 번호</FormLabelStyled>
              <OutlinedInputStyled
                id="device_serial"
                name="device_serial"
                // value={barcode.serial}
              />
            </FormGrid>
          )}
        </Box>
      ) : (
        <Box
          className="w-full h-full flex flex-row items-center justify-center rounded-lg"
          sx={{
            backgroundColor: 'info.light',
          }}
          onClick={onClick}
        >
          <Typography variant="h5">{title} 스캔</Typography>
        </Box>
      )}
    </Grid>
  );
};

export default BarcodeScanner;
