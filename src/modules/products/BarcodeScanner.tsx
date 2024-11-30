import React, { useState } from 'react';

const BarcodeScanner: React.FC = () => {
  const [barcode, setBarcode] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBarcode(event.target.value);
  };

  const handleScan = () => {
    console.log('Scanned barcode:', barcode);
    // 상품 검색 또는 입력 처리 로직 추가
  };

  return (
    <div>
      <input
        type="text"
        value={barcode}
        onChange={handleInputChange}
        onKeyPress={(event) => {
          if (event.key === 'Enter') handleScan();
        }}
        placeholder="바코드를 스캔하세요"
      />
    </div>
  );
};

export default BarcodeScanner;
