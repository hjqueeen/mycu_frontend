import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import React, { useRef, useState } from 'react';
import useShared from '../../shared/hooks/use-shared.hook';
import {
  Barcode,
  FormGrid,
  FormLabelStyled,
  OutlinedInputStyled,
} from './ProductAdd/ProductAdd';

const BarcodeScanner = ({
  active,
  type,
  title,
  barcode,
  disabled,
  onClick,
  onChange,
  setBatteryExpirationDate,
}: {
  active: boolean;
  type: 'device' | 'battery' | 'pads';
  title: string;
  barcode: Barcode;
  disabled: boolean;
  onClick: () => void;
  onChange: (event: any) => void;
  setBatteryExpirationDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const inputRef = useRef<any>(null);
  const { toDate, koreanDate } = useShared();

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
  }, [barcode[type]]);

  return (
    <Grid
      container
      spacing={1}
      className="flex flex-col min-h-[185px]"
      sx={{
        cursor: active ? undefined : 'pointer',
        padding: 0,
      }}
      onClick={() => {
        if (inputRef?.current) {
          inputRef.current.focus();
        }
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
              placeholder="바코드를 스캔하세요"
              sx={{ width: '100%' }}
              ref={inputRef}
            />
            <FontAwesomeIcon
              className="cursor-pointer ml-2"
              icon={faRotateLeft}
              onClick={() => {}}
            />
          </FormGrid>
          {type === 'pads' || type === 'battery' ? (
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
          ) : (
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
