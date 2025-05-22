import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Enregistrement from './pages/Enregistrement';
import Commande from './pages/Commande';
import Image from './pages/Image';
import Statistique from './pages/Statistique';
import Mouvement from './pages/Mouvement';
import Vente from './pages/Vente';
import AjouterArticle from "./pages/AjouterArticle";
import RecapitulatifArticle from "./pages/RecapitulatifArticle";
import CommandeSurplus from "./pages/CommandeSurplus";
import CommandeStock from "./pages/CommandeStock";
import Depassement from "./pages/Depassement";
import { ProductCheck } from "@/pages/ProductCheck";
import { GraphStats } from "@/pages/GraphStats";
import Inventaire from "./pages/Inventaire";
import Tracking from './pages/Tracking';
import SelectionInventaire from "./pages/SelectionInventaire";
import UnlockScreen from './pages/Unlock';
import GestionBalles from './pages/GestionBalles';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/unlock" />} />
      <Route path="/unlock" element={<UnlockScreen />} />
      <Route path="/home" element={<Home />} />
      <Route path="/gestion-balles" element={<GestionBalles />} />
      <Route path="/enregistrement" element={<Enregistrement />} />
      <Route path="/commande" element={<Commande />} />
      <Route path="/image" element={<Image />} />
      <Route path="/statistique" element={<Statistique />} />
      <Route path="/mouvement" element={<Mouvement />} />
      <Route path="/vente" element={<Vente />} />
      <Route path="/ajouter-article" element={<AjouterArticle />} />
      <Route path="/recapitulatif-article" element={<RecapitulatifArticle />} />
      <Route path="/commande-surplus" element={<CommandeSurplus />} />
      <Route path="/commande-stock" element={<CommandeStock />} />
      <Route path="/depassement" element={<Depassement />} />
      <Route path="/product-check" element={<ProductCheck />} />
      <Route path="/graph-stats" element={<GraphStats />} />
      <Route path="/inventaire" element={<Inventaire />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/selection-inventaire" element={<SelectionInventaire />} />
    </Routes>
  );
}

export default App;
