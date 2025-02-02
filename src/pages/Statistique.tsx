import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Calendar, Filter, Search, Store, BarChart2, CalendarDays} from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Shirt,
  ShoppingBag,
  Shirt as PantsIcon,
  Shirt as TShirt,
  Shirt as ShirtRound,
  CircleUserRound as Body,
} from "lucide-react";
import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HomeButton } from "@/components/HomeButton";


// Modifiez la constante CATEGORIES pour inclure les icônes
const CATEGORIES = [
  { name: "Débardeur", icon: <Shirt className="h-4 w-4" /> },
  { name: "Body", icon: <Body className="h-4 w-4" /> },
  { name: "T-Shirt", icon: <TShirt className="h-4 w-4" /> },
  { name: "Manche longue", icon: <Shirt className="h-4 w-4" /> },
  { name: "Polo", icon: <Shirt className="h-4 w-4" /> },
  { name: "Chemise", icon: <ShirtRound className="h-4 w-4" /> },
  { name: "Bouson", icon: <ShoppingBag className="h-4 w-4" /> },
  { name: "Short", icon: <PantsIcon className="h-4 w-4" /> },
  { name: "Robe", icon: <Shirt className="h-4 w-4" /> }
];
// Ajoutez cette constante avec les autres en haut du fichier
const STORES = [
  "Magasin Central",
  "Boutique Ankorondrano",
  "Shop Analakely",
  "Store Ivandry",
  "Magasin Tanjombato",
  "Boutique Andraharo"
];
const dailyRecap = [
  {
    id: 1,
    reference: "#100001",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
    name: "Chemise Blue Classic",
    category: "Chemise",
    store: "Magasin Central",
    quantity: 5,
    unitPrice: 224955,
    totalPrice: 1124775
  },
  {
    id: 2,
    reference: "#100002",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
    name: "T-Shirt Blanc Basic",
    category: "T-Shirt",
    store: "Boutique Ankorondrano",
    quantity: 10,
    unitPrice: 89955,
    totalPrice: 899550
  },
  {
    id: 3,
    reference: "#100003",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
    name: "Robe d'été Fleurie",
    category: "Robe",
    store: "Shop Analakely",
    quantity: 3,
    unitPrice: 359955,
    totalPrice: 1079865
  },
  {
    id: 4,
    reference: "#100004",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    name: "Polo Marine Classic",
    category: "Polo",
    store: "Store Ivandry",
    quantity: 8,
    unitPrice: 179955,
    totalPrice: 1439640
  },
  {
    id: 5,
    reference: "#100005",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b",
    name: "Short Cargo Kaki",
    category: "Short",
    store: "Magasin Tanjombato",
    quantity: 6,
    unitPrice: 206955,
    totalPrice: 1241730
  },
  {
    id: 6,
    reference: "#100006",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
    name: "Body Sport Performance",
    category: "Body",
    store: "Boutique Andraharo",
    quantity: 12,
    unitPrice: 134955,
    totalPrice: 1619460
  }
]
export default function Statistique() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStore, setSelectedStore] = useState("all");


  // Add these pagination states for products
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const productsPerPage = 6; // Shows 2 rows of 3 cards

  const filteredRecap = useMemo(() => {
    return dailyRecap.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesStore = selectedStore === "all" || item.store.toLowerCase() === selectedStore.toLowerCase();
      
      return matchesSearch && matchesCategory && matchesStore;
    });
  }, [searchQuery, selectedCategory, selectedStore]);

  // Calculate the products pagination
  const indexOfLastProduct = currentProductPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredRecap.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalProductPages = Math.ceil(filteredRecap.length / productsPerPage);

 

  const totalArticles = useMemo(() => {
    return filteredRecap.reduce((acc, item) => acc + item.quantity, 0);
  }, [filteredRecap]);

  const totalRevenue = useMemo(() => {
    return filteredRecap.reduce((acc, item) => acc + item.totalPrice, 0);
  }, [filteredRecap]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 flex flex-col">
      <div className="absolute inset-0 bg-[url('https://st4.depositphotos.com/1076214/20486/i/1600/depositphotos_204867158-stock-photo-interior-fashion-clothing-store-women.jpg')] bg-cover bg-center bg-no-repeat opacity-50 -z-[1]" />
    
    {/* Header moderne */}
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-pink-300/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
  <BarChart2 className="h-6 w-6 text-pink-500 animate-bounce" />
  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
    Statistiques
  </span>
</h1>

        <div className="flex gap-4">
        <Link to="/product-check">
  <Button 
    variant="outline" 
    className="group relative overflow-hidden border-2 border-pink-500/20 hover:border-pink-500 transition-all duration-300 hover:scale-105"
  >
    <span className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
    <Store className="mr-2 h-4 w-4 text-pink-500 group-hover:rotate-12 transition-transform" />
    <span className="relative">Check nombre de produit disponible</span>
  </Button>
</Link>

<Link to="/graph-stats">
  <Button 
    variant="outline" 
    className="group relative overflow-hidden border-2 border-blue-500/20 hover:border-blue-500 transition-all duration-300 hover:scale-105"
  >
    <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
    <BarChart2 className="mr-2 h-4 w-4 text-blue-500 group-hover:animate-pulse transition-transform" />
    <span className="relative">Statistique en graphique</span>
  </Button>
</Link>

          <HomeButton/>
        </div>
      </div>
    </header>

        
    <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
        <div className="grid gap-8">
          <Card className="bg-background/60 backdrop-blur-xl p-6 mb-8">
          <CardHeader className="border-b-2 border-primary/20 pb-4">
  <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
    <div className="flex items-center gap-3">
      <div className="bg-primary/10 p-3 rounded-full">
        <CalendarDays className="h-8 w-8 text-primary animate-bounce" />
      </div>
      <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-primary via-purple-500 to-secondary text-transparent bg-clip-text flex items-center gap-2 hover:scale-105 transition-transform">
        Récapitulation Journalière
      </CardTitle>
    </div>

    <div className="flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full hover:bg-secondary/20 transition-colors">
      <Calendar className="h-5 w-5 text-secondary animate-pulse" />
      <span className="text-lg font-medium text-secondary capitalize">
        {new Date().toLocaleDateString('fr-FR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </span>
    </div>
  </div>
</CardHeader>

            <CardContent>
              {/* Totals Card moved here */}
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 transform hover:scale-[1.02] mb-8 rounded-xl shadow-lg hover:shadow-primary/20">
  <CardContent className="p-8">
    <div className="flex flex-col md:flex-row justify-between gap-8">
      <div className="text-center md:text-left bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-lg p-6 flex-1 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
          <ShoppingBag className="h-6 w-6 text-primary animate-bounce" />
          <p className="text-sm font-medium text-muted-foreground">Total Articles Vendus</p>
        </div>
        <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {totalArticles}
        </p>
      </div>

      <div className="text-center md:text-right bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm rounded-lg p-6 flex-1 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-center md:justify-end gap-3 mb-2">
          <p className="text-sm font-medium text-muted-foreground">Chiffre d'Affaires Total</p>
          <BarChart2 className="h-6 w-6 text-secondary animate-pulse" />
        </div>
        <p className="text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          {totalRevenue.toLocaleString()}Ar
        </p>
      </div>
    </div>
  </CardContent>
</Card>

            <div className="mb-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-pink-200/50 dark:border-purple-700/50">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Search Input */}
    <div className="relative">
      <Search 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-500 h-5 w-5 transition-all duration-300 hover:scale-110 z-10"
      />
      <Input
        type="search"
        placeholder="Rechercher par nom..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 h-12 text-lg border-2 border-pink-200/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl focus:border-pink-500 focus:ring-pink-500"
      />
    </div>

    {/* Article Select */}
    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
      <SelectTrigger className="w-full h-12 text-lg border-2 border-pink-200/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl flex items-center">
        <Shirt className="mr-2 h-4 w-4 text-pink-500" />
        <SelectValue placeholder="Filtrer par article" />
      </SelectTrigger>
      <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
        <SelectItem value="all" className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900">
          <div className="flex items-center">
            <Filter className="h-4 w-4 text-pink-500 mr-2" />
            Tous les articles
          </div>
        </SelectItem>
        {CATEGORIES.map((category) => (
          <SelectItem
            key={category.name}
            value={category.name.toLowerCase()}
            className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900"
          >
            <div className="flex items-center">
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    {/* Store Select */}
    <Select value={selectedStore} onValueChange={setSelectedStore}>
      <SelectTrigger className="w-full h-12 text-lg border-2 border-pink-200/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl flex items-center">
        <Store className="mr-2 h-4 w-4 text-pink-500" />
        <SelectValue placeholder="Filtrer par magasin" />
      </SelectTrigger>
      <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
        <SelectItem value="all" className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900">
          <div className="flex items-center">
            <Filter className="h-4 w-4 text-pink-500 mr-2" />
            Tous les magasins
          </div>
        </SelectItem>
        {STORES.map((store) => (
          <SelectItem
            key={store}
            value={store.toLowerCase()}
            className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900"
          >
            <div className="flex items-center">
              <Store className="h-4 w-4 text-pink-500 mr-2" />
              <span>{store}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
</div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {currentProducts.map((item) => (
                  <Card key={item.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-2 border-primary/20 hover:border-primary/50">
                  <div className="relative">
                    {/* Reference Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-primary/90 backdrop-blur-sm text-white px-4 py-2 rounded-full font-mono text-sm shadow-lg transform group-hover:scale-110 transition-transform">
                        {item.reference}
                      </div>
                    </div>
                    
                    {/* Image Container */}
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                
                  <CardContent className="p-6 space-y-4">
                    {/* Product Name */}
                    <h3 className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {item.name}
                    </h3>
                
                    {/* Details Grid */}
                    <div className="grid gap-3 text-sm">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                        <span className="text-muted-foreground">Catégorie</span>
                        <span className="font-semibold">{item.category}</span>
                      </div>
                
                      <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                        <span className="text-muted-foreground">Magasin</span>
                        <span className="font-semibold flex items-center gap-2">
                          <Store className="h-4 w-4 text-primary" />
                          {item.store}
                        </span>
                      </div>
                
                      <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                        <span className="text-muted-foreground">Quantité</span>
                        <span className="font-semibold">{item.quantity}</span>
                      </div>
                
                      <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                        <span className="text-muted-foreground">Prix unitaire</span>
                        <span className="font-semibold">{item.unitPrice.toLocaleString(2)}Ar</span>
                      </div>
                
                      {/* Total Price */}
                      <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 flex justify-between items-center">
                        <span className="font-medium text-primary">Total</span>
                        <span className="text-lg font-bold text-primary">
                          {item.totalPrice.toLocaleString(2)}Ar
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                ))}
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Page {currentProductPage} sur {totalProductPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentProductPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentProductPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Précédent
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentProductPage(prev => Math.min(prev + 1, totalProductPages))}
                    disabled={currentProductPage === totalProductPages}
                  >
                    Suivant
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
          
            </CardContent>
          </Card>
          

          
        </div>
      </div>
      {/* Footer moderne */}
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
