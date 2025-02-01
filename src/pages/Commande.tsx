import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home,ShoppingCart , PackageOpen, Package, Truck, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";


export default function Commande() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 flex flex-col">
       <div className="absolute inset-0 bg-[url('https://st4.depositphotos.com/1076214/20486/i/1600/depositphotos_204867158-stock-photo-interior-fashion-clothing-store-women.jpg')] bg-cover bg-center bg-no-repeat opacity-50 -z-[1]" />
      
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-pink-300/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
  <ShoppingCart className="h-8 w-8 animate-bounce text-pink-500" />
  <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
    Type de Commande
  </h1>
</div>

<Button 
  asChild 
  variant="ghost" 
  className="relative overflow-hidden transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-700/30 hover:to-purple-900/30 dark:hover:from-pink-950 dark:hover:to-purple-950 rounded-xl border border-pink-300/50 dark:border-purple-800/50 shadow-lg"
>
  <Link to="/" className="flex items-center px-4 py-2 font-medium">
    <Home className="mr-2 h-5 w-5 text-pink-700 dark:text-pink-500 transition-transform group-hover:scale-110" />
    <span className="bg-gradient-to-r from-pink-700 to-purple-900 dark:from-pink-500 dark:to-purple-600 bg-clip-text text-transparent font-semibold">
      Accueil
    </span>
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
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-3">
                  <Package className="h-8 w-8 text-pink-500" />
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                    Commande de Stock
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video relative overflow-hidden rounded-xl">
                  <img
                    src="/images/stock.jpg"
                    alt="Stock Management"
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-2 p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 rounded-lg">
                  <h3 className="font-semibold text-pink-700 dark:text-pink-400 flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Gestion des Stocks Réguliers
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Anticipez vos besoins en stock et gérez votre inventaire.
                    Planifiez vos commandes régulières en toute simplicité.
                  </p>


                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Card Commande de Surplus */}
          <Link to="/commande-surplus">
            <Card className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-pink-200/50 dark:border-purple-700/50 hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-3">
                  <TrendingUp className="h-8 w-8 text-pink-500" />
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                    Commande de Surplus
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video relative overflow-hidden rounded-xl">
                  <img
                    src="/images/surplus.jpg"
                    alt="Surplus Management"
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-2 p-4 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30 rounded-lg">
                  <h3 className="font-semibold text-pink-700 dark:text-pink-400 flex items-center gap-2">
                    <PackageOpen className="h-5 w-5" />
                    Gestion des Commandes Spéciales
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Anticipez les pics d'activité et gérez vos besoins exceptionnels.
                    Planifiez vos commandes supplémentaires en toute simplicité.
                  </p>
                </div>
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