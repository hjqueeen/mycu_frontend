import { Box, Button, FormLabel, OutlinedInput } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/system';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPrint } from '@fortawesome/free-solid-svg-icons';
import BarcodeScanner from '../BarcodeScanner';
import Typography from '@mui/material/Typography/Typography';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ShippingInformation from './ShippingInformation';
import { Barcode } from './ProductAdd';
import useShared from '../../../shared/hooks/use-shared.hook';

const cards: any[] = [
  {
    type: 'device',
    title: '제품',
  },
  {
    type: 'battery',
    title: '배터리',
  },
  {
    type: 'pads',
    title: '패즈',
  },
];

const ProductScanner = ({
  rows,
  setRows,
}: {
  rows: any[];
  setRows: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const { toDate } = useShared();

  const [batteryExpirationDate, setBatteryExpirationDate] = useState('');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // 각 카드의 바코드 상태
  const [barcode, setBarcode] = useState({
    device: '',
    battery: '',
    pads: '',
  });

  const addProductToRow = React.useCallback(() => {
    const newRow = {
      id: new Date(),
      device_udi: barcode.device,
      device_lot: barcode.device.slice(23, 24),
      device_serial: barcode.device.slice(18, 29),

      battery_udi: barcode.battery,
      battery_serial: barcode.battery.slice(18, 27),
      battery_expiration_date: batteryExpirationDate,

      pads_udi: barcode.pads,
      pads_lot: barcode.pads.slice(26, 36),
      pads_expiration_date: toDate(barcode.pads.slice(18, 24)),
    };
    setRows([...rows, newRow]);
    setSelectedCard(null);
    setBarcode({
      device: '',
      battery: '',
      pads: '',
    });
  }, [
    barcode,
    batteryExpirationDate,
    rows,
    setRows,
    setSelectedCard,
    setBarcode,
  ]);

  // 카드 클릭 핸들러
  const handleCardClick = React.useCallback(
    (cardType: 'device' | 'battery' | 'pads') => {
      setSelectedCard(cardType);
    },
    [setSelectedCard]
  );

  // 바코드 입력 핸들러
  const handleBarcodeInput = React.useCallback(
    (event: any, cardType: 'device' | 'battery' | 'pads') => {
      const value = event.target.value;

      setBarcode((prevState) => ({
        ...prevState,
        [cardType]: value,
      }));
    },
    [setBarcode]
  );
  return (
    <Grid spacing={1} container className="w-full flex flex-row">
      <Grid size={10} spacing={1} container className="flex flex-row">
        {cards.map((card) => (
          <Grid
            key={card.type}
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
              setBarcode={setBarcode}
              onClick={() => handleCardClick(card.type)}
              onChange={(event) => handleBarcodeInput(event, card.type)}
              disabled={selectedCard !== card.type} // 선택된 카드 외에는 비활성화
              setBatteryExpirationDate={setBatteryExpirationDate}
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        spacing={1}
        size={2}
        className="flex flex-col justify-end"
        onClick={() => setSelectedCard(null)}
      >
        <Button
          variant="contained"
          sx={{
            alignSelf: 'end',
            width: { xs: '300px', sm: 'auto' },
          }}
          onClick={() => addProductToRow()}
        >
          <FontAwesomeIcon className="mr-2" icon={faPrint} />
          라벨인쇄
        </Button>
        <Button
          variant="contained"
          sx={{
            alignSelf: 'end',
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
