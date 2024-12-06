import { Alert, Box, Button, Dialog, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React from 'react';
import {
  faChevronDown,
  faPrint,
  faIndustry,
} from '@fortawesome/free-solid-svg-icons';
import BarcodeScanner from './BarcodeScanner';

import useShared from '../../../shared/hooks/use-shared.hook';
import JsBarcode from 'jsbarcode';
import { useReactToPrint } from 'react-to-print';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  const { toDate, containsKorean } = useShared();

  const [alertOpen, setAlertOpen] = React.useState(false);
  const [batteryExpirationDate, setBatteryExpirationDate] = React.useState('');
  const [selectedCard, setSelectedCard] = React.useState<string | null>(null);

  // 각 카드의 바코드 상태
  const [barcode, setBarcode] = React.useState({
    device: '',
    battery: '',
    pads: '',
  });

  const deviceRef = React.useRef<any>(); // 바코드 캔버스 참조
  const padsRef = React.useRef<any>();
  const batteryRef = React.useRef<any>();
  const printRef = React.useRef<React.RefObject<Element | Text>>(); // 인쇄 대상 참조
  const today = new Date().toISOString().split('T')[0];

  React.useEffect(() => {
    handleGenerateBarcode();
  }, [barcode]);

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

  const handleGenerateBarcode = React.useCallback(() => {
    if (
      containsKorean(barcode.device) ||
      containsKorean(barcode.battery) ||
      containsKorean(barcode.pads)
    ) {
      setAlertOpen(true);
    } else {
      if (barcode.device.trim() !== '') {
        JsBarcode(deviceRef.current, barcode.device, {
          format: 'CODE128', // 바코드 형식
          lineColor: '#000',
          width: 2,
          height: 50,
          displayValue: true, // 바코드 아래 텍스트 표시
        });
      } else {
        // 바코드가 없을 때 캔버스 초기화
        JsBarcode(deviceRef.current, '0', {
          format: 'CODE128',
          lineColor: '#fff',
        });
        // const canvas = deviceRef.current;
        // if (canvas && canvas.getContext) {
        //   const ctx = canvas.getContext('2d');
        //   ctx.clearRect(0, 0, canvas.width, canvas.height);
        // }
      }
      if (barcode.battery.trim() !== '') {
        JsBarcode(batteryRef.current, barcode.battery, {
          format: 'CODE128',
          lineColor: '#000',
          width: 2,
          height: 50,
          displayValue: true,
        });
      } else {
        JsBarcode(batteryRef.current, '0', {
          format: 'CODE128',
          lineColor: '#fff',
        });
      }
      if (barcode.pads.trim() !== '') {
        JsBarcode(padsRef.current, barcode.pads, {
          format: 'CODE128',
          lineColor: '#000',
          width: 2,
          height: 50,
          displayValue: true,
        });
      } else {
        JsBarcode(padsRef.current, '0', {
          format: 'CODE128',
          lineColor: '#fff',
        });
      }
    }
  }, [barcode, deviceRef, batteryRef, padsRef]);

  const handlePrint = useReactToPrint({
    contentRef: printRef.current,
    documentTitle: 'Barcode Label',
    onAfterPrint: () => alert('바코드가 인쇄되었습니다. '),
  });
  return (
    <Grid
      spacing={1}
      container
      className="w-full flex flex-row shrink-0"
      sx={{
        minWidth: '1200px',
      }}
    >
      <Grid
        size={12}
        spacing={1}
        container
        className="flex flex-row flex-nowrap shrink-0"
      >
        <Grid flexGrow={1} spacing={1} container className="flex flex-nowrap">
          {cards.map((card) => (
            <Grid
              key={card.type}
              container
              spacing={1}
              size={4}
              className="flex flex-col border border-solid rounded-lg"
              sx={{
                borderColor: 'divider',
                minWidth: '240px',
              }}
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

        {/******************************/}
        {/*            라벨            */}
        {/******************************/}
        <Grid
          container
          spacing={1}
          size={5}
          className="flex flex-col justify-end max-w-[400px] "
          onClick={() => setSelectedCard(null)}
        >
          <Box
            component="div"
            ref={printRef}
            className="grow flex flex-col px-5 pt-5 rounded-lg border border-solid"
            sx={{ borderColor: 'divider' }}
          >
            <Box className="flex flex-row items-center justify-between w-full pb-3">
              <Grid size={7} className="flex flex-row items-center">
                <Box
                  className="border border-solid px-1 rounded-sm w-fit mr-2"
                  sx={{ borderColor: '#ccc' }}
                >
                  SN
                </Box>
                <Typography>{barcode.device.slice(18, 29)}</Typography>
              </Grid>
              <Grid size={5}>
                <FontAwesomeIcon
                  icon={faIndustry}
                  style={{ width: '16px', paddingRight: '4px' }}
                />
                {today}
              </Grid>
            </Box>
            <Box className="flex flex-row items-start">
              <Typography className="w-20">Product</Typography>
              <Box
                component="canvas"
                className="h-10 w-fit"
                ref={deviceRef}
              ></Box>
            </Box>
            <Box className="flex flex-row items-start">
              <Typography className="w-20">Battery</Typography>
              <Box
                component="canvas"
                className="h-10 w-fit"
                ref={batteryRef}
              ></Box>
            </Box>
            <Box className="flex flex-row items-start">
              <Typography className="w-20">Pads</Typography>
              <Box
                component="canvas"
                className="h-10 w-fit"
                ref={padsRef}
              ></Box>
            </Box>
          </Box>
          <Grid container spacing={1} className="flex flex-row justify-end">
            <Button
              variant="contained"
              sx={{
                alignSelf: 'end',
                width: { xs: '300px', sm: 'auto' },
              }}
              onClick={() => handlePrint()}
            >
              <FontAwesomeIcon className="mr-2" icon={faPrint} />
              검사성적서인쇄
            </Button>
            <Button
              variant="contained"
              sx={{
                alignSelf: 'end',
                width: { xs: '300px', sm: 'auto' },
              }}
              onClick={() => handlePrint()}
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
      </Grid>
      <Dialog open={alertOpen}>
        <Alert
          severity="error"
          onClose={() => setAlertOpen(false)}
          className="flex flex-col items-center"
        >
          <Typography>바코드가 올바르게 입력되지 않았습니다.</Typography>
          <Typography>
            입력 필드를 클릭한 후, 키보드 언어를 영어로 바꿔주세요.
          </Typography>
        </Alert>
      </Dialog>
    </Grid>
  );
};

export default React.memo(ProductScanner);
