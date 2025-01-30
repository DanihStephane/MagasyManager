import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Commande() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 flex flex-col">
      <div className="absolute inset-0 bg-[url('/candy-pattern.png')] opacity-5 -z-[1]" />
      
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-pink-300/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            Type de Commande
          </h1>
          <Button asChild variant="ghost" className="hover:bg-pink-100 dark:hover:bg-pink-900">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Accueil
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card Commande de Stock */}
          <Link to="/commande-stock">
            <Card className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-pink-200/50 dark:border-purple-700/50 hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                  Commande de Stock
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video relative overflow-hidden rounded-xl">
                  <img
                    src="/images/stock-image.jpg"
                    alt="Stock Management"
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Gérez vos commandes de stock régulières pour maintenir 
                  un inventaire optimal de vos produits essentiels.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Card Commande de Surplus */}
          <Link to="/commande-surplus">
            <Card className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-pink-200/50 dark:border-purple-700/50 hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                  Commande de Surplus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video relative overflow-hidden rounded-xl">
                  <img
                    src="/images/surplus-image.jpg"
                    alt="Surplus Management"
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Gérez vos commandes exceptionnelles et surplus pour 
                  répondre aux pics d'activité ou besoins spécifiques.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Footer */}
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