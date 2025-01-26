import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Calendar, Filter, Search, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
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
const data = [
  { name: 'Jan', ventes: 4000, benefices: 2400, stocks: 300 },
  { name: 'Fév', ventes: 3000, benefices: 1398, stocks: 280 },
  { name: 'Mar', ventes: 2000, benefices: 9800, stocks: 250 },
  { name: 'Avr', ventes: 2780, benefices: 3908, stocks: 220 },
  { name: 'Mai', ventes: 1890, benefices: 4800, stocks: 200 },
  { name: 'Juin', ventes: 2390, benefices: 3800, stocks: 180 },
];

const transactions = [
  { id: 1, date: '2024-03-20', article: 'T-shirt Premium', montant: 29.99, type: 'Vente' },
  { id: 2, date: '2024-03-19', article: 'Jean Slim', montant: 89.99, type: 'Vente' },
  { id: 3, date: '2024-03-18', article: 'Lot de Sweats', montant: -1500.00, type: 'Achat' },
  { id: 4, date: '2024-03-17', article: 'Robe d\'été', montant: 79.99, type: 'Vente' },
  { id: 5, date: '2024-03-16', article: 'Veste en cuir', montant: 199.99, type: 'Vente' },
  { id: 6, date: '2024-03-15', article: 'Chaussures Sport', montant: -800.00, type: 'Achat' },
  { id: 7, date: '2024-03-14', article: 'Chemise Business', montant: 59.99, type: 'Vente' },
  { id: 8, date: '2024-03-13', article: 'Pull Cachemire', montant: 149.99, type: 'Vente' },
  { id: 9, date: '2024-03-12', article: 'Accessoires', montant: -450.00, type: 'Achat' },
  { id: 10, date: '2024-03-11', article: 'Pantalon Cargo', montant: 69.99, type: 'Vente' },
];
// Ajoutez ces imports en haut du fichier


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
    image: "/chemise-blue.jpg",
    name: "Chemise Blue Classic",
    category: "Chemise",
    store: "Magasin Central",
    quantity: 5,
    unitPrice: 49.99,
    totalPrice: 249.95
  },
  {
    id: 2,
    image: "/tshirt-blanc.jpg",
    name: "T-Shirt Blanc Basic",
    category: "T-Shirt",
    store: "Boutique Ankorondrano",
    quantity: 10,
    unitPrice: 19.99,
    totalPrice: 199.90
  },
  {
    id: 3,
    image: "/robe-ete.jpg",
    name: "Robe d'été Fleurie",
    category: "Robe",
    store: "Shop Analakely",
    quantity: 3,
    unitPrice: 79.99,
    totalPrice: 239.97
  },
  {
    id: 4,
    image: "/polo-marine.jpg",
    name: "Polo Marine Classic",
    category: "Polo",
    store: "Store Ivandry",
    quantity: 8,
    unitPrice: 39.99,
    totalPrice: 319.92
  },
  {
    id: 5,
    image: "/short-cargo.jpg",
    name: "Short Cargo Kaki",
    category: "Short",
    store: "Magasin Tanjombato",
    quantity: 6,
    unitPrice: 45.99,
    totalPrice: 275.94
  },
  {
    id: 6,
    image: "/body-sport.jpg",
    name: "Body Sport Performance",
    category: "Body",
    store: "Boutique Andraharo",
    quantity: 12,
    unitPrice: 29.99,
    totalPrice: 359.88
  }]

export default function Statistique() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStore, setSelectedStore] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Add these pagination states for products
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const productsPerPage = 6; // Shows 2 rows of 3 cards

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

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
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Statistiques
          </h1>
          <Button asChild variant="ghost">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Accueil
            </Link>
          </Button>
        </div>

        

        <div className="grid gap-8">
          <Card className="bg-background/60 backdrop-blur-xl p-6 mb-8">
            <CardHeader>
              <div className="flex flex-col space-y-2">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                  Récapitulation Journalière
                </CardTitle>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date().toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Totals Card moved here */}
            <Card className="bg-primary/5 border-primary/20 mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="text-center md:text-left">
                    <p className="text-sm text-muted-foreground">Total Articles Vendus</p>
                    <p className="text-2xl font-bold text-primary">
                      {totalArticles}
                    </p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-sm text-muted-foreground">Chiffre d'Affaires Total</p>
                    <p className="text-2xl font-bold text-primary">
                      {totalRevenue.toFixed(2)}€
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
              <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <label className="text-sm font-medium">Rechercher</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Rechercher un article..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Article</label>
                  <Select defaultValue="all" onValueChange={(value) => setSelectedCategory(value)}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          Tout
                        </div>
                      </SelectItem>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.name} value={category.name}>
                          <div className="flex items-center gap-2">
                            {category.icon}
                            {category.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Magasin</label>
                  <Select defaultValue="all" onValueChange={(value) => setSelectedStore(value)}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Magasin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          Tout
                        </div>
                      </SelectItem>
                      {STORES.map((store) => (
                        <SelectItem key={store} value={store.toLowerCase()}>
                          <div className="flex items-center gap-2">
                            <Store className="h-4 w-4" />
                            {store}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {currentProducts.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Catégorie:</span>
                          <span className="font-medium text-foreground">{item.category}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Magasin:</span>
                          <span className="font-medium text-foreground flex items-center gap-1">
                            <Store className="h-4 w-4" />
                            {item.store}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Quantité:</span>
                          <span className="font-medium text-foreground">{item.quantity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Prix unitaire:</span>
                          <span className="font-medium text-foreground">{item.unitPrice.toFixed(2)}€</span>
                        </div>
                        <div className="pt-2 border-t flex justify-between">
                          <span>Total:</span>
                          <span className="font-bold text-primary">{item.totalPrice.toFixed(2)}€</span>
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
          <Card className="bg-background/60 backdrop-blur-xl p-6">
            <CardHeader>
              <CardTitle>Évolution des ventes et bénéfices</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart width={800} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ventes" stroke="#3b82f6" />
                <Line type="monotone" dataKey="benefices" stroke="#ec4899" />
                <Line type="monotone" dataKey="stocks" stroke="#10b981" />
              </LineChart>
            </CardContent>
          </Card>

          <Card className="bg-background/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Dernières transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Article</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b">
                        <td className="px-6 py-4">{transaction.date}</td>
                        <td className="px-6 py-4">{transaction.article}</td>
                        <td className="px-6 py-4">{transaction.type}</td>
                        <td className={`px-6 py-4 ${transaction.montant < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {transaction.montant.toFixed(2)}€
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

<div className="flex items-center justify-between px-6 py-4">
  <div className="text-sm text-muted-foreground">
    Page {currentPage} sur {totalPages}
  </div>
  <div className="flex gap-2">
    <Button
      variant="outline"
      size="sm"
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
    >
      <ChevronLeft className="h-4 w-4" />
      Précédent
    </Button>
    <Button
      variant="outline"
      size="sm"
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
    >
      Suivant
      <ChevronRight className="h-4 w-4" />
    </Button>
  </div>
</div>

              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
