import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import ClienteAxios from '../config/axios'; // Asegúrate de que esta ruta sea correcta

// Define la interfaz de MotivoSalida según el tipo de datos especificado
interface MotivoSalida {
  id_motivo_salida: number; // int(11)
  motivo_salida: string;    // varchar(100)
}

interface MotivoSalidaContextType {
  motivosSalida: MotivoSalida[];
  fetchMotivosSalida: () => void;
}

const MotivoSalidaContext = createContext<MotivoSalidaContextType | undefined>(undefined);

export const MotivoSalidaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [motivosSalida, setMotivosSalida] = useState<MotivoSalida[]>([]);

  const fetchMotivosSalida = async () => {
    try {
      const response = await ClienteAxios.get('/motivos_salida');
      setMotivosSalida(response.data);
    } catch (error) {
      console.error("Error al obtener motivos de salida:", error);
    }
  };

  useEffect(() => {
    fetchMotivosSalida();
  }, []);

  return (
    <MotivoSalidaContext.Provider value={{ motivosSalida, fetchMotivosSalida }}>
      {children}
    </MotivoSalidaContext.Provider>
  );
};

export const useMotivosSalida = (): MotivoSalidaContextType => {
  const context = useContext(MotivoSalidaContext);
  if (!context) {
    throw new Error('useMotivosSalida debe usarse dentro de un MotivoSalidaProvider');
  }
  return context;
};
