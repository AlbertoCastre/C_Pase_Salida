import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import ClienteAxios from '../config/axios'; // Asegúrate de que la ruta sea correcta

interface Departamento {
  id_departamento: number;
  nombre_departamento: string;
}

interface DepartamentoContextType {
  departamentos: Departamento[];
  fetchDepartamentos: () => void;
}

const DepartamentoContext = createContext<DepartamentoContextType | undefined>(undefined);

export const DepartamentoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

  const fetchDepartamentos = async () => {
    try {
      const response = await ClienteAxios.get('/departamentos');
      setDepartamentos(response.data);
    } catch (error) {
      console.error("Error al obtener los departamentos:", error);
    }
  };

  useEffect(() => {
    fetchDepartamentos();
  }, []);

  return (
    <DepartamentoContext.Provider value={{ departamentos, fetchDepartamentos }}>
      {children}
    </DepartamentoContext.Provider>
  );
};

export const useDepartamentos = (): DepartamentoContextType => {
  const context = useContext(DepartamentoContext);
  if (!context) {
    throw new Error('useDepartamentos debe usarse dentro de un DepartamentoProvider');
  }
  return context;
};
