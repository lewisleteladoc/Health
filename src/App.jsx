import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // correct
import { mainRoutes } from './routes/routes.jsx';

function App() {  
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {mainRoutes.map(({ id, path, component: Component }) => (
            <Route key={id} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<div>404jlkjjlkjwelktjlkdsjglkjdslkgdklasldjflasf</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;