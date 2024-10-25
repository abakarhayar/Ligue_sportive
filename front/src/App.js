import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Produit from './Components/Produit/Produit'; 
import Wrapper from'./Components/Wrapper/Wrapper';
import Inscription from'./Components/Inscription/Inscription';
import Connexion from'./Components/Connexion/Connexion';
import GererAdherents from'./Components/Admin/GererAdherents/GererAdherents';
import GarerProduits from'./Components/Admin/GererProduits/GererProduits';
import Profil from'./Components/Profil/Profil';

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Inscription/>} />
          <Route path="/connexion" element={<Connexion/>} />
          <Route path="/produit" element={<Produit/>} />
          <Route path="/profil" element={<Profil/>} />
          <Route path="/gerer_adherents" element={<GererAdherents/>} />
          <Route path="/gerer_produits" element={<GarerProduits/>} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

