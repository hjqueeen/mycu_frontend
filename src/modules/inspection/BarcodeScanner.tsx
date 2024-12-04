import React, { useState } from 'react';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from '@mui/lab';
import { Box, Dialog, Snackbar, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import useShared from '../../shared/hooks/use-shared.hook';
import {
  Barcode,
  FormGrid,
  FormLabelStyled,
  OutlinedInputStyled,
} from './InspectionAdd/InspectionAdd';

const BarcodeScanner = ({
  active,
  type,
  title,
  barcode,
  disabled,
  onClick,
  onChange,
  setBarcode,
  setBatteryExpirationDate,
}: {
  active: boolean;
  type: 'device' | 'battery' | 'pads';
  title: string;
  barcode: Barcode;
  disabled: boolean;
  onClick: () => void;
  onChange: (event: any) => void;
  setBarcode: React.Dispatch<
    React.SetStateAction<{
      device: string;
      battery: string;
      pads: string;
    }>
  >;
  setBatteryExpirationDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { toDate, koreanDate, containsKorean } = useShared();

  const [showContent, setShowContent] = useState(false);
  const [serial, setSerial] = useState('');
  const [lot, setLot] = useState('');
  const [expirationDate, setExpirationDate] = useState<Date | string>('');

  React.useEffect(() => {
    if (!active && barcode[type] === '') {
      setShowContent(false);
    } else {
      setShowContent(true);
    }
  }, [active, barcode]);

  React.useEffect(() => {
    const scannedCode = barcode[type];
    if (containsKorean(scannedCode)) {
    } else {
      switch (type) {
        case 'device':
          setLot(scannedCode.slice(23, 24));
          setSerial(scannedCode.slice(18, 29));
          break;
        case 'battery':
          setSerial(scannedCode.slice(18, 27));
          break;
        case 'pads':
          setLot(scannedCode.slice(26, 36));
          setExpirationDate(toDate(scannedCode.slice(18, 24)));
          break;
        default:
          break;
      }
    }
  }, [barcode[type]]);

  return (
    <Grid
      container
      spacing={1}
      className="flex flex-col min-h-[185px] h-full"
      sx={{
        cursor: active ? undefined : 'pointer',
        padding: 0,
        fontSize: '10px',
      }}
    >
      {showContent ? (
        <Grid
          container
          spacing={1}
          className="p-2 h-full flex flex-col rounded-lg"
          sx={{ backgroundColor: !active ? 'background.paper' : undefined }}
          onClick={onClick}
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
              onClick={onClick}
              autoFocus
              placeholder="바코드를 스캔하세요"
              sx={{ width: '100%' }}
            />
            <FontAwesomeIcon
              className="cursor-pointer ml-2"
              icon={faRotateLeft}
              onClick={() => {
                setBarcode((prev) => ({ ...prev, [type]: '' }));
              }}
            />
          </FormGrid>
          {type !== 'pads' && (
            <FormGrid>
              <FormLabelStyled>SERIAL 번호</FormLabelStyled>
              <OutlinedInputStyled
                id="device_serial"
                name="device_serial"
                value={serial}
                disabled={disabled}
              />
            </FormGrid>
          )}
          {(type === 'pads' || type === 'device') && (
            <FormGrid>
              <FormLabelStyled>LOT 번호</FormLabelStyled>
              <OutlinedInputStyled
                id="device_lot"
                name="device_lot"
                value={lot}
                disabled={disabled}
              />
            </FormGrid>
          )}
          {(type === 'pads' || type === 'battery') && (
            <FormGrid>
              <FormLabelStyled>유효기간</FormLabelStyled>
              <OutlinedInputStyled
                id="expiration_date"
                name="expiration_date"
                value={koreanDate(expirationDate)}
                onClick={onClick}
                onChange={(event) => {
                  setExpirationDate(event.target.value);
                  type === 'battery' &&
                    setBatteryExpirationDate(event.target.value);
                }}
                placeholder="예시 2024-12-03"
                disabled={disabled}
              />
            </FormGrid>
          )}
        </Grid>
      ) : (
        <Box
          className="w-full h-full flex flex-row items-center justify-center rounded-lg"
          sx={{
            backgroundColor: 'info.light',
            color: 'text.secondary',
          }}
          onClick={onClick}
        >
          <Typography variant="h5">{title} 스캔</Typography>
        </Box>
      )}
    </Grid>
  );
};

export default React.memo(BarcodeScanner);
