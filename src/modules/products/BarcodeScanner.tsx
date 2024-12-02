import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput';
import React, { useState } from 'react';
import {
  Barcode,
  FormGrid,
  FormLabelStyled,
  OutlinedInputStyled,
} from './ProductAdd/ProductAdd';

const BarcodeScanner = ({
  type,
  code,
  barcode,
  setCode,
  setBarcode,
}: {
  type: 'device' | 'battery' | 'pads';
  barcode: Barcode;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setBarcode: React.Dispatch<React.SetStateAction<Barcode>>;
}) => {
  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCode(event.target.value);
    },
    []
  );

  const handleScan = React.useCallback(() => {
    const scannedCode = code;
    if (type === 'device') {
      setBarcode({
        udi: scannedCode,
        serial: scannedCode.slice(18, 29),
        lot: scannedCode.slice(23, 24),
      });
    } else if (type === 'battery') {
      setBarcode({
        udi: scannedCode,
        serial: scannedCode.slice(18, 27),
        lot: '',
        manufacture_date: '',
        expiration_date: '',
      });
    } else if (type === 'pads') {
      setBarcode({
        udi: scannedCode,
        lot: scannedCode.slice(26, 36),
        serial: '',
        manufacture_date: '',
        expiration_date: toDate(scannedCode.slice(18, 24)),
      });
    }
  }, [code]);

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

  return (
    <div>
      <FormGrid>
        <FormLabelStyled>UDI 바코드</FormLabelStyled>
        <OutlinedInputStyled
          type="text"
          size="small"
          value={code}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') handleScan();
          }}
          placeholder="바코드를 스캔하세요"
          sx={{ width: '100%' }}
        />
        <FontAwesomeIcon
          className="cursor-pointer ml-2"
          icon={faRotateLeft}
          onClick={() => {
            setCode('');
            setBarcode({
              udi: '',
              lot: '',
              serial: '',
              manufacture_date: '',
              expiration_date: '',
            });
          }}
        />
      </FormGrid>
      <FormGrid>
        <FormLabelStyled>LOT 번호</FormLabelStyled>
        <OutlinedInputStyled id="aed_lot" name="aed_lot" value={barcode.lot} />
      </FormGrid>
      {type === 'pads' ? (
        <FormGrid>
          <FormLabelStyled>유효기간</FormLabelStyled>
          <OutlinedInputStyled
            id="expiration_date"
            name="expiration_date"
            value={barcode.expiration_date}
          />
        </FormGrid>
      ) : (
        <FormGrid>
          <FormLabelStyled>SERIAL 번호</FormLabelStyled>
          <OutlinedInputStyled
            id="aed_serial"
            name="aed_serial"
            value={barcode.serial}
          />
        </FormGrid>
      )}
    </div>
  );
};

export default React.memo(BarcodeScanner);
