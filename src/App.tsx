import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from '@routes/index';
import { Layout } from '@components/Layout';
import './App.css';

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
