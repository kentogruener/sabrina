import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import 'typeface-pacifico/index.css';
import './App.css';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Registers from './pages/Registers';
import SQLQuery from './pages/SQL-Query';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/registers" element={<Registers />} />
          <Route path="/sql-query" element={<SQLQuery />} />
        </Routes>
      </Layout>
    </Router>
  );
}
