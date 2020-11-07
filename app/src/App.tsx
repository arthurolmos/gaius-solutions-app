import React from 'react';
import Routes from './routes'
import Header from './components/header/Header'
import { BasketProvider } from './contexts/BasketContext';

function App() {
  return (
    <BasketProvider>
      <Header />
      <Routes />
    </BasketProvider>
  );
}

export default App;
