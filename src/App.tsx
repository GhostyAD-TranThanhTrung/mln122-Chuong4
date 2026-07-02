import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { TracerPage } from './pages/TracerPage';
import { TheoryPage } from './pages/TheoryPage';
import { SituationPage } from './pages/SituationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="theory" element={<TheoryPage />} />
          <Route path="situation" element={<SituationPage />} />
          <Route path="tracer" element={<TracerPage />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
