import { Navigate, Route, Routes } from 'react-router-dom';
import { Inspection } from '../modules/inspection/Inspection';
import { InspectionContentType } from '../shared/models/all.types';

export const InspectionRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Inspection type={InspectionContentType.All} />}
      />
      <Route
        path="/add"
        element={<Inspection type={InspectionContentType.Add} />}
      />
      <Route
        path="/all"
        element={<Inspection type={InspectionContentType.All} />}
      />
      <Route
        path="/edit"
        element={<Inspection type={InspectionContentType.Edit} />}
      />
      <Route
        path="/template"
        element={<Inspection type={InspectionContentType.Template} />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
