import React from 'react';

const InspectionReport = ({
  inspeaction_date,
  device_number,
  device_serial,
}: any) => {
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
        dateField.textContent = inspeaction_date;
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
    <div>
      {/* 템플릿 로드 위치 */}
      <div id="template-container" ref={templateContainerRef}></div>
    </div>
  );
};

export default InspectionReport;
