import { Box, Button, FormLabel, OutlinedInput } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useRef, useState } from 'react';
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
  // 현재 선택된 카드 상태
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // 각 카드의 바코드 상태
  const [barcode, setBarcode] = useState({
    device: '',
    battery: '',
    pads: '',
  });

  // const addProductToRow = React.useCallback(() => {
  //   const newRow = {
  //     id: new Date(),
  //     device_udi: deviceBarcode.udi,
  //     device_lot: deviceBarcode.lot,
  //     device_serial: deviceBarcode.serial,
  //     battery_udi: batteryBarcode.udi,
  //     battery_lot: batteryBarcode.lot,
  //     battery_serial: batteryBarcode.serial,
  //     battery_manufacture_date: batteryBarcode.manufacture_date,
  //     battery_expiration_date: batteryBarcode.expiration_date,
  //     pads_udi: padsBarcode.udi,
  //     pads_lot: padsBarcode.lot,
  //     pads_serial: padsBarcode.serial,
  //     pads_manufacture_date: padsBarcode.manufacture_date,
  //     pads_expiration_date: padsBarcode.expiration_date,
  //   };
  //   setRows([...rows, newRow]);
  //   // setProductCode('');
  //   // setBatteryCode('');
  //   // setPadsCode('');
  //   setDeviceBarcode({
  //     udi: '',
  //     lot: '',
  //     serial: '',
  //   });
  //   setBatteryBarcode({
  //     udi: '',
  //     lot: '',
  //     serial: '',
  //     manufacture_date: '',
  //     expiration_date: '',
  //   });
  //   setPadsBarcode({
  //     udi: '',
  //     lot: '',
  //     serial: '',
  //     manufacture_date: '',
  //     expiration_date: '',
  //   });
  // }, [barcode]);

  // 카드 클릭 핸들러
  const handleCardClick = (cardType: 'device' | 'battery' | 'pads') => {
    setSelectedCard(cardType);
  };

  // 바코드 입력 핸들러
  const handleBarcodeInput = (
    event: any,
    cardType: 'device' | 'battery' | 'pads'
  ) => {
    const value = event.target.value;

    setBarcode((prevState) => ({
      ...prevState,
      [cardType]: value,
    }));
  };

  const toDate = React.useCallback((dateString: string): Date => {
    // 입력 문자열 확인 (6자리)
    if (dateString.length !== 6) {
      throw new Error(
        'Invalid date format. The input must be 6 characters long.'
      );
    }

    // 년, 월, 일 추출
    const year = parseInt(`20${dateString.slice(0, 2)}`, 10); // 앞 두 자리: 년도
    const month = parseInt(dateString.slice(2, 4), 10) - 1; // 월 (0부터 시작하므로 -1)
    const day = parseInt(dateString.slice(4, 6), 10); // 일

    // Date 객체 생성
    return new Date(year, month, day);
  }, []);
  const cards: any[] = [
    {
      type: 'device',
      title: '제품',
      // code: productCode,
      // setCode: setProductCode,
      // barcode: deviceBarcode,
      // setBarcode: setDeviceBarcode,
    },
    {
      type: 'battery',
      title: '배터리',
      // code: batteryCode,
      // setCode: setBatteryCode,
      // barcode: batteryBarcode,
      // setBarcode: setBatteryBarcode,
    },
    {
      type: 'pads',
      title: '패즈',
      // code: padsCode,
      // setCode: setPadsCode,
      // barcode: padsBarcode,
      // setBarcode: setPadsBarcode,
    },
  ];

  return (
    <Grid spacing={1} container className="w-full flex flex-row">
      <Grid size={10} spacing={1} container className="flex flex-row">
        {cards.map((card) => (
          <Grid
            key={card.id}
            container
            spacing={1}
            size={4}
            sx={{
              borderColor: 'divider',
            }}
            className="flex flex-col border border-solid rounded-lg"
          >
            <BarcodeScanner
              active={selectedCard === card.type}
              type={card.type}
              title={card.title}
              barcode={barcode}
              onClick={() => handleCardClick(card.type)}
              onChange={(event) => handleBarcodeInput(event, card.type)}
              disabled={selectedCard !== card.type} // 선택된 카드 외에는 비활성화
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        spacing={1}
        size={2}
        className="flex flex-col justify-between"
        // onClick={handleOutsideClick}
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
          // onClick={() => addProductToRow()}
        >
          <FontAwesomeIcon className="mr-2" icon={faChevronDown} />
          제품등록
        </Button>
      </Grid>
    </Grid>
  );
};

export default React.memo(ProductScanner);
