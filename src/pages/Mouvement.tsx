import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function Mouvement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [selectedStore, setSelectedStore] = useState("all");

  const categories = [
    { id: "all", name: "Toutes les catégories" },
    { id: "haut", name: "Hauts" },
    { id: "bas", name: "Bas" },
    { id: "veste", name: "Vestes & Manteaux" },
    { id: "robe", name: "Robes" }
  ];

  const surplusRecu = [
    {
      id: 1,
      article: "Jean slim noir",
      quantite: 5,
      magasinSource: "Boutique Centre",
      dateReception: "2024-01-14",
      image: "/images/jean.jpg",
      categorie: "bas"
    },
    {
      id: 2,
      article: "T-shirt Premium",
      quantite: 8,
      magasinSource: "Boutique Mall",
      dateReception: "2024-01-13",
      image: "/images/tshirt.jpg",
      categorie: "haut"
    },
    {
      id: 3,
      article: "Polo Classic",
      quantite: 3,
      magasinSource: "Boutique Sud",
      dateReception: "2024-01-12",
      image: "/images/polo.jpg",
      categorie: "haut"
    },
    {
      id: 4,
      article: "Veste en Cuir",
      quantite: 2,
      magasinSource: "Boutique Nord",
      dateReception: "2024-01-11",
      image: "/images/veste.jpg",
      categorie: "veste"
    },
    {
      id: 5,
      article: "Robe Fleurie",
      quantite: 4,
      magasinSource: "Boutique Est",
      dateReception: "2024-01-10",
      image: "/images/robe.jpg",
      categorie: "robe"
    },
    {
      id: 6,
      article: "Chemise Lin",
      quantite: 6,
      magasinSource: "Boutique Ouest",
      dateReception: "2024-01-09",
      image: "/images/chemise.jpg",
      categorie: "haut"
    },
    {
      id: 7,
      article: "Short Jean",
      quantite: 7,
      magasinSource: "Boutique Centre",
      dateReception: "2024-01-08",
      image: "/images/short.jpg",
      categorie: "bas"
    },
    {
      id: 8,
      article: "Pull Cachemire",
      quantite: 3,
      magasinSource: "Boutique Mall",
      dateReception: "2024-01-07",
      image: "/images/pull.jpg",
      categorie: "haut"
    },
    {
      id: 9,
      article: "Blazer Élégant",
      quantite: 2,
      magasinSource: "Boutique Sud",
      dateReception: "2024-01-06",
      image: "/images/blazer.jpg",
      categorie: "veste"
    },
    {
      id: 10,
      article: "Robe Soirée",
      quantite: 4,
      magasinSource: "Boutique Nord",
      dateReception: "2024-01-05",
      image: "/images/robe-soiree.jpg",
      categorie: "robe"
    }
  ];

  const surplusDonne = [
  {
    id: 1,
    article: "Robe Soirée",
    quantite: 4,
    magasinDest: "Boutique Nord",
    dateTransfert: "2024-01-14",
    image: "/images/robe-soiree.jpg",
    categorie: "robe"
  },
  {
    id: 2,
    article: "T-shirt Premium",
    quantite: 8,
    magasinDest: "Boutique Mall",
    dateTransfert: "2024-01-13",
    image: "/images/tshirt.jpg",
    categorie: "haut"
  },
  {
    id: 3,
    article: "Blazer Élégant",
    quantite: 2,
    magasinDest: "Boutique Centre",
    dateTransfert: "2024-01-12",
    image: "/images/blazer.jpg",
    categorie: "veste"
  },
  {
    id: 4,
    article: "Short Jean",
    quantite: 7,
    magasinDest: "Boutique Est",
    dateTransfert: "2024-01-11",
    image: "/images/short.jpg",
    categorie: "bas"
  },
  {
    id: 5,
    article: "Polo Classic",
    quantite: 3,
    magasinDest: "Boutique Ouest",
    dateTransfert: "2024-01-10",
    image: "/images/polo.jpg",
    categorie: "haut"
  },
  {
    id: 6,
    article: "Veste en Cuir",
    quantite: 2,
    magasinDest: "Boutique Sud",
    dateTransfert: "2024-01-09",
    image: "/images/veste.jpg",
    categorie: "veste"
  },
  {
    id: 7,
    article: "Robe Fleurie",
    quantite: 4,
    magasinDest: "Boutique Mall",
    dateTransfert: "2024-01-08",
    image: "/images/robe.jpg",
    categorie: "robe"
  },
  {
    id: 8,
    article: "Pull Cachemire",
    quantite: 3,
    magasinDest: "Boutique Nord",
    dateTransfert: "2024-01-07",
    image: "/images/pull.jpg",
    categorie: "haut"
  },
  {
    id: 9,
    article: "Jean slim noir",
    quantite: 5,
    magasinDest: "Boutique Centre",
    dateTransfert: "2024-01-06",
    image: "/images/jean.jpg",
    categorie: "bas"
  },
  {
    id: 10,
    article: "Chemise Lin",
    quantite: 6,
    magasinDest: "Boutique Est",
    dateTransfert: "2024-01-05",
    image: "/images/chemise.jpg",
    categorie: "haut"
  }
];
  // Add stores data
const stores = [
  { id: "all", name: "Toutes les boutiques" },
  { id: "centre", name: "Boutique Centre" },
  { id: "mall", name: "Boutique Mall" },
  { id: "sud", name: "Boutique Sud" },
  { id: "nord", name: "Boutique Nord" },
  { id: "est", name: "Boutique Est" },
  { id: "ouest", name: "Boutique Ouest" }
];
  // Update the filterItems function to include store filtering
const filterItems = (items) => {
  return items.filter(item => {
    const matchesSearch = item.article.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" ? true : item.categorie === selectedCategory;
    const matchesStore = selectedStore === "all" ? true : 
      (item.magasinSource?.includes(selectedStore) || item.magasinDest?.includes(selectedStore));
    return matchesSearch && matchesCategory && matchesStore;
  });
};

  const paginateItems = (items) => {
    const filteredItems = filterItems(items);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.slice(startIndex, endIndex);
  };

  const totalPages = (items) => Math.ceil(filterItems(items).length / itemsPerPage);

  const PaginationControls = ({ items }) => (
    <div className="flex justify-center items-center gap-1 mt-8">
      <Button 
        variant="ghost" 
        size="sm" 
        className="hover:bg-primary/10 rounded-full w-9 h-9 p-0"
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <div className="flex gap-1">
        {Array.from({length: totalPages(items)}, (_, i) => i + 1).map((page) => (
          <Button 
            key={page}
            variant="ghost" 
            size="sm" 
            className={`${
              currentPage === page 
                ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                : 'hover:bg-primary/10'
            } rounded-full w-9 h-9 p-0`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button 
        variant="ghost" 
        size="sm" 
        className="hover:bg-primary/10 rounded-full w-9 h-9 p-0"
        onClick={() => setCurrentPage(prev => Math.min(totalPages(items), prev + 1))}
        disabled={currentPage === totalPages(items)}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Mouvements de Stock
          </h1>
          <Button asChild variant="ghost">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Accueil
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="relative col-span-3">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="search"
              placeholder="Rechercher un article..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 h-12 text-lg border-2 bg-background/60 backdrop-blur-xl"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full h-12 text-lg border-2 bg-background/60 backdrop-blur-xl">
              <SelectValue placeholder="Filtrer par catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStore} onValueChange={setSelectedStore}>
            <SelectTrigger className="w-full h-12 text-lg border-2 bg-background/60 backdrop-blur-xl">
              <SelectValue placeholder="Filtrer par boutique" />
            </SelectTrigger>
            <SelectContent>
              {stores.map((store) => (
                <SelectItem key={store.id} value={store.id}>
                  {store.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Tabs defaultValue="surplus-recu" className="space-y-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="surplus-recu">Surplus Reçu</TabsTrigger>
            <TabsTrigger value="surplus-donne">Surplus Donné</TabsTrigger>
          </TabsList>

          <TabsContent value="surplus-recu">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginateItems(surplusRecu).map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <img src={item.image} alt={item.article} className="w-full h-48 object-cover" />
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{item.article}</h3>
                    <div className="space-y-1 text-sm">
                      <p>Quantité: {item.quantite}</p>
                      <p>Source: {item.magasinSource}</p>
                      <p>Date: {item.dateReception}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <PaginationControls items={surplusRecu} />
          </TabsContent>
          <TabsContent value="surplus-donne">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginateItems(surplusDonne).map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <img src={item.image} alt={item.article} className="w-full h-48 object-cover" />
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{item.article}</h3>
                    <div className="space-y-1 text-sm">
                      <p>Quantité: {item.quantite}</p>
                      <p>Destination: {item.magasinDest}</p>
                      <p>Date: {item.dateTransfert}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <PaginationControls items={surplusDonne} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}