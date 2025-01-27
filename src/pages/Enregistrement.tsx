import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Pencil, Trash2, Home, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState , useEffect} from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { ArrowLeft, Plus, Tag, Box, Palette, Ruler, Hash, CreditCard, Package2, FileText, Shirt } from "lucide-react";

// Ajoutez cette interface pour typer les articles
interface Article {
  id: number;
  nom: string;
  prix: number;
  stock: number;
  categorie: string;
  image: string;
  reference?: string;
}

// 1. Déplacer les données initiales dans une constante
const INITIAL_ARTICLES = [
  { 
    id: 1, 
    nom: "T-shirt Premium",
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 120000, 
    stock: 45,
    categorie: "haut",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
  },
  { 
    id: 2, 
    nom: "Jean Slim", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 240000, 
    stock: 30,
    categorie: "bas",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"
  },
  { 
    id: 3, 
    nom: "Veste en Cuir", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 850000, 
    stock: 15,
    categorie: "veste",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
  },
  { 
    id: 4, 
    nom: "Robe d'été", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 180000, 
    stock: 25,
    categorie: "robe",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500"
  },
  { 
    id: 5, 
    nom: "Sweat à Capuche", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 150000, 
    stock: 40,
    categorie: "haut",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"
  },
  { 
    id: 6, 
    nom: "Chemise en Lin", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 160000, 
    stock: 20,
    categorie: "haut",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500"
  },
  { 
    id: 7, 
    nom: "Pull Cachemire", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 450000, 
    stock: 10,
    categorie: "haut",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500"
  },
  { 
    id: 8, 
    nom: "Short en Jean", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 120000, 
    stock: 35,
    categorie: "bas",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500"
  },
  { 
    id: 9, 
    nom: "Blazer Élégant", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 380000, 
    stock: 18,
    categorie: "veste",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500"
  },
  { 
    id: 10, 
    nom: "Pantalon Chino", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 220000, 
    stock: 28,
    categorie: "bas",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500"
  }
];

const categories = [
  { id: "all", name: "Toutes les catégories" },
  { id: "debardeur", name: "Débardeur" },
  { id: "body", name: "Body" },
  { id: "tshirt", name: "T-Shirt" },
  { id: "manchelongue", name: "Manche longue" },
  { id: "polo", name: "Polo" },
  { id: "chemise", name: "Chemise" },
  { id: "bouson", name: "Bouson" },
  { id: "short", name: "Short" }
];
export default function Enregistrement() {
  // 2. Déplacer le useState à l'intérieur du composant
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  // Filtrer d'abord les articles
  const filteredArticles = articles.filter(article => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = 
      article.nom.toLowerCase().includes(searchTermLower) ||
      article.reference?.toLowerCase().includes(searchTermLower);
    const matchesCategory = selectedCategory === "all" ? true : article.categorie === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculer les indices pour la pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  
  // Calculer le nombre total de pages
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  // Générer les numéros de page à afficher
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Fonction pour changer de page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Add this at the beginning of the component
    useEffect(() => {
      const savedArticles = localStorage.getItem('articles');
      if (savedArticles) {
        setArticles(JSON.parse(savedArticles));
      }
    }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 flex flex-col">
      <div className="absolute inset-0 bg-[url('/candy-pattern.png')] opacity-5 -z-[1]" />
      
      {/* Header moderne similaire à Home */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-pink-300/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            Gestion des Articles
          </h1>
          <div className="flex gap-4">
            <Button asChild variant="ghost" className="hover:bg-pink-100 dark:hover:bg-pink-900">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Accueil
              </Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90">
              <Link to="/ajouter-article">
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter un Article
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
        {/* Search bar and filter section */}
        <div className="mb-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-pink-200/50 dark:border-purple-700/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative col-span-3">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                type="search"
                placeholder="Rechercher un article par nom..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 h-12 text-lg border-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl"
              />
            </div>
          
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full h-12 text-lg border-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl">
                <SelectValue placeholder="Filtrer par catégorie" />
              </SelectTrigger>
            <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
              {categories.map((category) => (
                <SelectItem 
                  key={category.id} 
                  value={category.id}
                  className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900"
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Liste des articles avec design moderne */}
        <div className="grid gap-4 mt-8">
          {currentArticles.map((article) => (
            <Card key={article.id} className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-pink-200/50 dark:border-purple-700/50 hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={article.image}
                    alt={article.nom}
                    className="w-24 h-24 object-cover rounded-xl"
                  />
                  <div>
                    <h3 className="font-semibold text-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                      {article.nom.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </h3>
                                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                        <Palette className="w-4 h-4 text-pink-500" />
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
    Couleur :
  </span>
                                        <div 
                                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm" 
                                          style={{ backgroundColor: article.couleur }}
                                        />
                                      </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Prix: {article.prix.toLocaleString()} Ar | Stock: {article.stock} unités
                    </p>
                    <div className="flex items-center gap-2 mt-1">
  <Tag className="w-4 h-4 text-pink-500" />
  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
    Classe :
  </span>
  <span className="text-sm px-2 py-1 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 font-medium">
    {categories.find(cat => cat.id === article.categorie)?.name}
  </span>
</div>

                  </div>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <span className="px-4 py-2 text-lg font-bold font-mono bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white rounded-xl shadow-lg">
                    {article.reference}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="hover:bg-pink-100 dark:hover:bg-pink-900 rounded-xl">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="icon" className="rounded-xl">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination mise à jour */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button 
            variant="ghost" 
            size="sm" 
            className="hover:bg-pink-100 dark:hover:bg-pink-900 rounded-full w-10 h-10"
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          {pageNumbers.map((number) => (
            <Button
              key={number}
              variant="ghost"
              size="sm"
              className={`rounded-full w-10 h-10 ${
                number === currentPage 
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white' 
                  : 'hover:bg-pink-100 dark:hover:bg-pink-900'
              }`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </Button>
          ))}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="hover:bg-pink-100 dark:hover:bg-pink-900 rounded-full w-10 h-10"
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
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




