import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import ClienteAxios from '../config/axios'; // Asegúrate de que esta ruta sea correcta

// Define la interfaz de TipoSalida según el tipo de datos especificado
interface TipoSalida {
  id_tipo_salida: number; // int(11)
  tipo_salida: string;    // varchar(50)
}

interface TipoSalidaContextType {
  tiposSalida: TipoSalida[];
  fetchTiposSalida: () => void;
}

const TipoSalidaContext = createContext<TipoSalidaContextType | undefined>(undefined);

export const TipoSalidaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tiposSalida, setTiposSalida] = useState<TipoSalida[]>([]);

  const fetchTiposSalida = async () => {
    try {
      const response = await ClienteAxios.get('/tipos_salida');
      setTiposSalida(response.data);
    } catch (error) {
      console.error("Error al obtener tipos de salida:", error);
    }
  };

  useEffect(() => {
    fetchTiposSalida();
  }, []);

  return (
    <TipoSalidaContext.Provider value={{ tiposSalida, fetchTiposSalida }}>
      {children}
    </TipoSalidaContext.Provider>
  );
};

export const useTiposSalida = (): TipoSalidaContextType => {
  const context = useContext(TipoSalidaContext);
  if (!context) {
    throw new Error('useTiposSalida debe usarse dentro de un TipoSalidaProvider');
  }
  return context;
};
