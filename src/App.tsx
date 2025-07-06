import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from '@routes/index';
import { Layout } from '@components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { PokemonErrorFallback } from '@/components/PokemonErrorFallback';
import './App.css';

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <ErrorBoundary fallback={<PokemonErrorFallback />}>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
