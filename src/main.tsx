import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap aquí
import './index.css'; // Si tienes otros estilos

// Importa los proveedores de contexto
import { DepartamentoProvider } from './context/DepartamentoContext';
import { MotivoSalidaProvider } from './context/MotivosSalidaContext';
import { TipoSalidaProvider } from './context/TiposSalidaContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DepartamentoProvider>
      <MotivoSalidaProvider>
        <TipoSalidaProvider>
          <App />
        </TipoSalidaProvider>
      </MotivoSalidaProvider>
    </DepartamentoProvider>
  </React.StrictMode>,
);
