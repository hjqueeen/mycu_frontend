import { Box, Button, FormLabel, OutlinedInput } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import BarcodeScanner from '../BarcodeScanner';
import Typography from '@mui/material/Typography/Typography';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ShippingInformation from './ShippingInformation';
import { Barcode } from './ProductAdd';

const ProductScanner = ({
  rows,
  setRows,
}: {
  rows: any[];
  setRows: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const [productCode, setProductCode] = useState('');
  const [batteryCode, setBatteryCode] = useState('');
  const [padsCode, setPadsCode] = useState('');

  const [aedBarcode, setAedBarcode] = useState<Barcode>({
    udi: '',
    lot: '',
    serial: '',
  });
  const [batteryBarcode, setBatteryBarcode] = useState<Barcode>({
    udi: '',
    lot: '',
    serial: '',
    manufacture_date: '',
    expiration_date: '',
  });
  const [padsBarcode, setPadsBarcode] = useState<Barcode>({
    udi: '',
    lot: '',
    serial: '',
    manufacture_date: '',
    expiration_date: '',
  });

  //   let scanBuffer = '';

  //   useEffect(() => {
  //     const handleKeyPress = (event: KeyboardEvent) => {
  //       // Enter 키를 기준으로 바코드 데이터 구분
  //       if (event.key === 'Enter') {
  //         console.log('scanBuffer', scanBuffer);
  //         parseBarcodeByLength(scanBuffer);
  //         scanBuffer = '';
  //       } else {
  //         scanBuffer += event.key;
  //       }
  //     };

  //     window.addEventListener('keypress', handleKeyPress);
  //     return () => {
  //       window.removeEventListener('keypress', handleKeyPress);
  //     };
  //   }, [barcode]);

  const addProductToRow = React.useCallback(() => {
    const newRow = {
      id: new Date(),
      device_udi: aedBarcode.udi,
      device_lot: aedBarcode.lot,
      device_serial: aedBarcode.serial,
      battery_udi: batteryBarcode.udi,
      battery_lot: batteryBarcode.lot,
      battery_serial: batteryBarcode.serial,
      battery_manufacture_date: batteryBarcode.manufacture_date,
      battery_expiration_date: batteryBarcode.expiration_date,
      pads_udi: padsBarcode.udi,
      pads_lot: padsBarcode.lot,
      pads_serial: padsBarcode.serial,
      pads_manufacture_date: padsBarcode.manufacture_date,
      pads_expiration_date: padsBarcode.expiration_date,
    };
    setRows([...rows, newRow]);
    setProductCode('');
    setBatteryCode('');
    setPadsCode('');
    setAedBarcode({
      udi: '',
      lot: '',
      serial: '',
    });
    setBatteryBarcode({
      udi: '',
      lot: '',
      serial: '',
      manufacture_date: '',
      expiration_date: '',
    });
    setPadsBarcode({
      udi: '',
      lot: '',
      serial: '',
      manufacture_date: '',
      expiration_date: '',
    });
  }, [aedBarcode, batteryBarcode, padsBarcode]);

  return (
    <Grid spacing={1} container className="w-full flex flex-row">
      <Grid size={10} spacing={1} container className="flex flex-row">
        <Grid
          container
          spacing={1}
          size={4}
          sx={{
            border: '1px solid',
            borderRadius: '8px',
            padding: '8px',
            borderColor: 'text.secondary',
          }}
          className="flex flex-col"
        >
          <Typography variant="h6">AED</Typography>

          <BarcodeScanner
            type="device"
            code={productCode}
            setCode={setProductCode}
            barcode={aedBarcode}
            setBarcode={setAedBarcode}
          />
        </Grid>
        <Grid
          container
          spacing={1}
          size={4}
          sx={{
            border: '1px solid',
            borderRadius: '8px',
            padding: '8px',
            borderColor: 'text.secondary',
          }}
          className="flex flex-col"
        >
          <Typography variant="h6">배터리</Typography>
          <BarcodeScanner
            type="battery"
            code={batteryCode}
            setCode={setBatteryCode}
            barcode={batteryBarcode}
            setBarcode={setBatteryBarcode}
          />
        </Grid>
        <Grid
          container
          spacing={1}
          size={4}
          sx={{
            border: '1px solid',
            borderRadius: '8px',
            padding: '8px',
            borderColor: 'text.secondary',
          }}
          className="flex flex-col"
        >
          <Typography variant="h6">패즈</Typography>

          <BarcodeScanner
            type="pads"
            code={padsCode}
            setCode={setPadsCode}
            barcode={padsBarcode}
            setBarcode={setPadsBarcode}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        size={2}
        className="flex flex-col justify-between"
      >
        <Box></Box>
        <Button
          variant="contained"
          sx={{
            color: 'background.paper',
            bgcolor: '#4BA36B',
            alignSelf: 'center',
            width: { xs: '300px', sm: 'auto' },
          }}
          onClick={() => addProductToRow()}
        >
          <FontAwesomeIcon className="mr-2" icon={faChevronDown} />
          제품등록
        </Button>
      </Grid>
    </Grid>
  );
};

export default React.memo(ProductScanner);
