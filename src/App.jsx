import { Routes, Route, Navigate } from 'react-router-dom';
import NotebookLayout from './components/layout/NotebookLayout';
import Home from './pages/Home';
import ProductCase from './pages/ProductCase';
import TPMCase from './pages/TPMCase';
import Habits from './pages/Habits';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Routes>
      <Route element={<NotebookLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product-case" element={<ProductCase />} />
        <Route path="/tpm-case" element={<TPMCase />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/progress" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
