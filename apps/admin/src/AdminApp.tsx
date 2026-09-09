import { Route, Routes } from 'react-router-dom';

export function AdminApp() {
  return (
    <Routes>
      <Route path="/" element={<div>Admin dashboard skeleton</div>} />
      <Route path="/tenants" element={<div>Tenant management skeleton</div>} />
      <Route path="/jobs" element={<div>Job operations skeleton</div>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
