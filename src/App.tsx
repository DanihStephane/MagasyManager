import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Enregistrement from './pages/Enregistrement';
import Commande from './pages/Commande';
import Image from './pages/Image';
import Statistique from './pages/Statistique';
import Mouvement from './pages/Mouvement';
import Vente from './pages/Vente';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/enregistrement" element={<Enregistrement />} />
      <Route path="/commande" element={<Commande />} />
      <Route path="/image" element={<Image />} />
      <Route path="/statistique" element={<Statistique />} />
      <Route path="/mouvement" element={<Mouvement />} />
      <Route path="/vente" element={<Vente />} />
    </Routes>
  );
}

export default App;