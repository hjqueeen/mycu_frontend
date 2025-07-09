import { Box } from '@mui/material';
import React from 'react';

const InspectionReport = React.forwardRef(
  (
    {
      device_number,
      device_serial,
    }: {
      device_number?: string;
      device_serial?: string;
    },
    ref
  ) => {
    const templateContainerRef = React.useRef<any>(null); // DOM 노드를 참조

    React.useEffect(() => {
      if (templateContainerRef.current) {
        // DOM 노드가 존재하는 경우에만 실행
        fetch('/inspection_template.html')
          .then((response) => response.text())
          .then((html) => {
            templateContainerRef.current.innerHTML = html; // 템플릿 로드
            handleUpdateTemplate();
          });
      }
    }, []);

    const handleUpdateTemplate = () => {
      if (templateContainerRef.current) {
        const dateField =
          templateContainerRef.current.querySelector('#inspection_date');
        const productField = templateContainerRef.current.querySelector(
          '#inspection_product'
        );
        const serialField =
          templateContainerRef.current.querySelector('#inspection_serial');
        if (dateField) {
          const today = new Date();
          dateField.textContent = today.toISOString().split('T')[0];
        }
        if (productField) {
          productField.textContent = device_number;
        }
        if (serialField) {
          serialField.textContent = device_serial;
        }
      }
    };
    return (
      <Box className="p-10 w-full" ref={ref}>
        {/* 템플릿 로드 위치 */}
        <div
          id="template-container"
          ref={templateContainerRef}
          className="w-full"
        ></div>
      </Box>
    );
  }
);

export default InspectionReport;
