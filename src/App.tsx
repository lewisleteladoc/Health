import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { mainRoutes, NOT_FOUND } from './routes/routes.jsx';
import StorageUtils from './api/StorageUtils';
import {ACCESS_TOKEN_COOKIE} from './config';
import AXIOS_FINNHUB from './AXIOS/AXIOS_FINNHUB';

const isAuthenticated = (): boolean => {
  const token = StorageUtils.get({ key: ACCESS_TOKEN_COOKIE, type: 'cookie', useNative: true, parse: false });
  return !!token;
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  console.log('location ', location);
  return isAuthenticated()
    ? children
    : <Navigate to="/" state={{ from: location }} replace />;
};


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {mainRoutes.map(({ id, path, component: Component, isPublic }) => (
            <Route
              key={id}
              path={path}
              element={
                isPublic
                  ? <Component />
                  : <ProtectedRoute><Component /></ProtectedRoute>
              }
            />
          ))}
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to={NOT_FOUND} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;