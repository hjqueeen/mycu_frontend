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
  barcode,
  setBarcode,
}: {
  barcode: Barcode;
  setBarcode: React.Dispatch<React.SetStateAction<Barcode>>;
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const udiCode = event.target.value;
    const updatedCode = { ...barcode };
    updatedCode.udi = udiCode;
    setBarcode(updatedCode);
  };

  // Lot번호와 시리얼번호 추출 함수
  const extractLotAndSerial = (str: string) => {
    // Lot번호: 문자열의 24번째 문자 (Excel 수식 =MID($C2242;24;1))
    const lot = str.slice(23, 24); // 0-index 기반으로 추출
    // 시리얼번호: 문자열의 19번째부터 11글자 (Excel 수식 =MID($C2242;19;11))
    const serial = str.slice(18, 29); // 0-index 기반으로 추출

    return { lot, serial };
  };

  const handleScan = () => {
    console.log('Scanned barcode:', barcode);
    const { lot, serial } = extractLotAndSerial(barcode.udi);

    const updatedCode = { ...barcode };
    updatedCode.lot = lot;
    updatedCode.serial = serial;
    setBarcode(updatedCode);
  };

  return (
    <div>
      <FormGrid>
        <FormLabelStyled>UDI 바코드</FormLabelStyled>
        <OutlinedInputStyled
          type="text"
          size="small"
          value={barcode.udi}
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
            setBarcode({
              udi: '',
              lot: '',
              serial: '',
            });
          }}
        />
      </FormGrid>
      <FormGrid>
        <FormLabelStyled>LOT 번호</FormLabelStyled>
        <OutlinedInputStyled id="aed_lot" name="aed_lot" value={barcode.lot} />
      </FormGrid>
      <FormGrid>
        <FormLabelStyled>SERIAL 번호</FormLabelStyled>
        <OutlinedInputStyled
          id="aed_serial"
          name="aed_serial"
          value={barcode.serial}
        />
      </FormGrid>
    </div>
  );
};

export default BarcodeScanner;
