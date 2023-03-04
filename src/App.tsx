import { ToastContainer } from "react-toastify";
import "./App.css";
import { ListingUsers } from "./components/listingUsers/listingUsers";
import { CadastroProvider } from "./context/userCadastro";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <CadastroProvider>
      <ListingUsers />
      <ToastContainer />
    </CadastroProvider>
  );
}

export default App;
