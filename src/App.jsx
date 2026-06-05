import { ThemeProvider } from './contexts/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './route/AppRouter';
import noiseTexture from './assets/noise.png';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'linear-gradient(to bottom, transparent, transparent 30%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.1))',
          backgroundSize: '100% 4px',
          zIndex: 9997,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: `url(${noiseTexture})`,
          backgroundRepeat: 'repeat',
          mixBlendMode: 'soft-light',
          zIndex: 9998,
        }}
      />
    </ThemeProvider>
  );
}

export default App;
