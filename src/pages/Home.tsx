import { Layout, Sun, Moon } from 'lucide-react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

  const modules = [
    {
      title: "Enregistrement 📝",
      description: "✨ Gérez votre inventaire avec précision | 📦 Ajoutez de nouveaux articles | 🏷️ Étiquetage facile | 📊 Suivi des stocks en temps réel",
      icon: "📝",
      path: "/enregistrement",
      image: "/images/modules/inventory.png"
    },
    {
      title: "Commande 🛍️",
      description: "📦 Commandes fournisseurs | 🤝 Gestion des relations | 📅 Planification des livraisons | 💫 Suivi des commandes",
      icon: "📦",
      path: "/commande",
      image: "/images/modules/commande.png"
    },
    {
      title: "Image 🖼️",
      description: "📸 Galerie produits | 🎨 Organisation visuelle | 🔍 Zoom détaillé | 🏷️ Étiquetage intelligent",
      icon: "🖼️",
      path: "/image",
      image: "/images/modules/gallery.png"
    },
    {
      title: "Statistique 📊",
      description: "📈 Analyse des ventes | 💰 Suivi des bénéfices | 📉 Tendances du marché | 🎯 Objectifs commerciaux",
      icon: "📊",
      path: "/statistique",
      image: "/images/modules/statistics.png"
    },
    {
      title: "Mouvement 🔄",
      description: "🚚 Transferts inter-magasins | 📦 Gestion des stocks | 🏪 Suivi dépôt-magasin | ⚡ Mise à jour en temps réel",
      icon: "🔄",
      path: "/mouvement",
      image: "/images/modules/transfer.png"
    },
    {
      title: "Vente 💰",
      description: "🛍️ Transactions | 🧾 Factures automatiques | 💳 Paiements multiples | 🎁 Fidélisation clients",
      icon: "💰",
      path: "/vente",
      image: "/images/modules/sales.png"
    }
  ];
  export default function Home() {
    const { theme, setTheme } = useTheme();
    const { state } = useLocation();
    const [showMessage, setShowMessage] = useState(false);
    const [surplusItems, setSurplusItems] = useState<{category: string, quantity: number}[]>([]);

    useEffect(() => {
      if (state?.showNotification) {
        setShowMessage(true);
        setSurplusItems(state.surplusItems || []);
      }
    }, [state]);

    // Add close handler function
  const handleClose = () => {
    setShowMessage(false);
  };


    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 flex flex-col">
        <div className="absolute inset-0 bg-[url('https://st4.depositphotos.com/1076214/20486/i/1600/depositphotos_204867158-stock-photo-interior-fashion-clothing-store-women.jpg')] bg-cover bg-center bg-no-repeat opacity-50 -z-[1]" />

        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-pink-300/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layout className="h-8 w-8 text-pink-500 animate-bounce" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                MagasyManager (Toky & Marine)
              </h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-pink-100 dark:hover:bg-pink-900"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-blue-400" />}
            </Button>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
          <div>
            {showMessage && surplusItems.length > 0 && (
              <div className="rounded-lg border-2 border-red-500 p-6 mb-8 bg-white shadow-lg">
                <h2 className="text-2xl font-bold text-red-600 mb-6">
                  Le magasin 1 a besoin des articles suivant si vous en avez:
                </h2>
              
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {surplusItems.map((item, index) => (
                    <Card key={index} className="border border-red-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="font-semibold text-gray-800">{item.category}</div>
                        <div className="text-red-500">Quantité: {item.quantity}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button 
                    onClick={handleClose}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg
                           flex items-center gap-2 transition-colors"
                  >
                    <CheckCircle className="h-5 w-5" />
                    Nous en avons
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {modules.map((module) => (
      <Card 
        key={module.title} 
        className="group relative overflow-hidden rounded-2xl border-2 border-pink-200/50 
                  dark:border-purple-700/50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl 
                  hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30 
                  transition-all duration-300 transform-gpu h-[400px]"
      >
        <Link to={module.path} className="block h-full">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden rounded-t-xl">
            <img 
              src={module.image} 
              alt={module.title}
              className="w-full h-full object-cover transform group-hover:scale-110 
                       transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
                      {/* Icon with smoother animation */}
                      <div className="absolute top-4 right-4 text-4xl bg-white/90 dark:bg-slate-800/90 
                          rounded-full p-3 shadow-md transform 
                          group-hover:scale-105 group-hover:rotate-6 
                          transition-all duration-500 ease-out
                          animate-[float_3s_ease-in-out_infinite]">
                        {module.icon}
                      </div>
                    </div>
          <CardHeader className="pt-8">
            <CardTitle className="text-2xl text-center bg-gradient-to-r 
                               from-pink-500 via-purple-500 to-blue-500 
                               text-transparent bg-clip-text font-bold
                               group-hover:scale-105 transition-transform">
              {module.title}
            </CardTitle>
            <CardDescription className="text-center text-gray-600 
                                      dark:text-gray-300 mt-2 line-clamp-2">
              {module.description}
            </CardDescription>
          </CardHeader>

          <CardFooter className="absolute bottom-0 left-0 right-0 p-4">
            <Button className="w-full rounded-xl bg-gradient-to-r 
                           from-pink-500 via-purple-500 to-blue-500 
                           hover:opacity-90 transform hover:-translate-y-1 
                           transition-all duration-200 group-hover:shadow-lg">
              <span className="mr-2">Accéder</span>
              <span className="group-hover:translate-x-1 transition-transform inline-block">
                →
              </span>
            </Button>
          </CardFooter>
        </Link>
      </Card>
    ))}
  </div>
        </main>

        <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t-2 border-pink-300/50">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              © {new Date().getFullYear()} MagasyManager. Tous droits réservés.
            </p>
          </div>
        </footer>
      </div>
    );
  }