import React, { useEffect, useState } from 'react';

const GlobalBarcodeScanner: React.FC = () => {
  const [barcode, setBarcode] = useState('');
  let scanBuffer = '';

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Enter 키를 기준으로 바코드 데이터 구분
      if (event.key === 'Enter') {
        setBarcode(scanBuffer);
        scanBuffer = ''; // 버퍼 초기화
        console.log('Scanned barcode:', barcode);
        // 상품 검색 또는 입력 처리 로직 추가
      } else {
        scanBuffer += event.key;
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [barcode]);

  return (
    <div>
      <p>스캔된 바코드: {barcode}</p>
    </div>
  );
};

export default GlobalBarcodeScanner;
