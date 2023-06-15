import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import 'typeface-pacifico/index.css';
import './App.css';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Import from './pages/Import';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/import" element={<Import />} />
        </Routes>
      </Layout>
    </Router>
  );
}
