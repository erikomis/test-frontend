import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
type CadastroContextData = {
  usuarios: UserResponse;
  loading: boolean;
  setUsuarios: React.Dispatch<React.SetStateAction<UserResponse>>;
  userRequest: (page: number, size: number) => Promise<void>;
  handleDeleteUser: (id: number | number[], page: number, size: number) => void;
  
};
type User = {
  id: number;
  nome: string;
  sobrenome: string;
  telefone: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
};

type UserResponse = {
  data: User[];
  page: number;
  size: number;
  total: number;
};

type CadastroProviderProps = {
  children: ReactNode;
};

export const CadastroContex = createContext({} as CadastroContextData);

export const CadastroProvider = ({ children }: CadastroProviderProps) => {
  const [usuarios, setUsuarios] = useState<UserResponse>({} as UserResponse);
  const [loading, setLoading] = useState(true);

  const userRequest = async (page: number, size: number) => {
    const response = await api.get("/user", {
      params: {
        page,
        size,
      },
    });
    setUsuarios(response.data);
  };

  useEffect(() => {
    userRequest(1, 10);
    setLoading(false);
  }, []);

  const userCreate = async (data: any) => {
    try {
      const response = await api.post("/user/create", data);
      toast.success("Usuário criado com sucesso!");
      userRequest(1, 10);
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleDeleteUser = async (
    id: number | number[],
    page: number,
    size: number
  ) => {
    try {
      console.log(id, "id");
      const response = await api.delete(`/user/delete/`, {
        query: {
          id,
        },
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <CadastroContex.Provider
      value={{
        usuarios,
        userRequest,
        setUsuarios,
        handleDeleteUser,
        loading,
      }}
    >
      {children}
    </CadastroContex.Provider>
  );
};

export const useCadastro = () => {
  return useContext(CadastroContex);
};
