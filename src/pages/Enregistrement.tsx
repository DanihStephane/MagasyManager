import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState , useEffect} from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { Tag, Box, Palette, CreditCard, Package2, Shirt, MapPin } from "lucide-react";
import { HomeButton } from "@/components/HomeButton";

// Ajoutez cette interface pour typer les articles
interface Article {
  id: number;
  nom: string;
  prix: number;
  stock: number;
  categorie: string;
  image: string;
  reference?: string;
  couleur?: string;
  emplacement?: string;
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
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    couleur: "#3B82F6",
    emplacement: "A-1-2"
  },
  { 
    id: 2, 
    nom: "Jean Slim", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 240000, 
    stock: 30,
    categorie: "bas",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    couleur: "#1E3A8A",
    emplacement: "B-3-1"
  },
  { 
    id: 3, 
    nom: "Veste en Cuir", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 850000, 
    stock: 15,
    categorie: "veste",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    couleur: "#7C2D12",
    emplacement: "C-2-3"
  },
  { 
    id: 4, 
    nom: "Robe d'été", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 180000, 
    stock: 25,
    categorie: "robe",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500",
    couleur: "#DB2777",
    emplacement: "A-4-2"
  },
  { 
    id: 5, 
    nom: "Sweat à Capuche", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 150000, 
    stock: 40,
    categorie: "haut",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    couleur: "#4B5563",
    emplacement: "B-1-1"
  },
  { 
    id: 6, 
    nom: "Chemise en Lin", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 160000, 
    stock: 20,
    categorie: "haut",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
    couleur: "#F59E0B",
    emplacement: "A-2-3"
  },
  { 
    id: 7, 
    nom: "Pull Cachemire", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 450000, 
    stock: 10,
    categorie: "haut",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
    couleur: "#9D174D",
    emplacement: "C-1-2"
  },
  { 
    id: 8, 
    nom: "Short en Jean", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 120000, 
    stock: 35,
    categorie: "bas",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500",
    couleur: "#2563EB",
    emplacement: "B-2-1"
  },
  { 
    id: 9, 
    nom: "Blazer Élégant", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 380000, 
    stock: 18,
    categorie: "veste",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500",
    couleur: "#1F2937",
    emplacement: "C-3-2"
  },
  { 
    id: 10, 
    nom: "Pantalon Chino", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 220000, 
    stock: 28,
    categorie: "bas",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500",
    couleur: "#78350F",
    emplacement: "B-4-3"
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

  // Fonction pour supprimer un article
  const handleDeleteArticle = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      const updatedArticles = articles.filter(article => article.id !== id);
      setArticles(updatedArticles);
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 flex flex-col">
       <div className="absolute inset-0 bg-[url('https://st4.depositphotos.com/1076214/20486/i/1600/depositphotos_204867158-stock-photo-interior-fashion-clothing-store-women.jpg')] bg-cover bg-center bg-no-repeat opacity-50 -z-[1]" />
      
      {/* Header moderne similaire à Home */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-pink-300/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">

          
        <div className="flex items-center gap-3">
  <Package2 className="h-8 w-8 text-pink-500 animate-bounce" />
  <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
    Gestion des Articles
  </h1>
</div>

          <div className="flex gap-4">
          


            <Button asChild className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90">
              <Link to="/ajouter-article">
                <PlusCircle className="mr-2 h-4 w-4" />
                Ajouter un Article
              </Link>
            </Button>
            <HomeButton/>
          </div>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
        {/* Search bar and filter section */}
        <div className="mb-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-pink-200/50 dark:border-purple-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-500 h-5 w-5 transition-all duration-300 hover:scale-110 z-10"
              />
              <Input
                type="search"
                placeholder="Rechercher par nom ou référence..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 h-12 text-lg border-2 border-pink-200/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl focus:border-pink-500 focus:ring-pink-500"
              />
            </div>

            {/* Category Select */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full h-12 text-lg border-2 border-pink-200/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl flex items-center">
                <Tag className="mr-2 h-4 w-4 text-pink-500" />
                <SelectValue placeholder="Filtrer par catégorie" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
  {categories.map((category) => (
    <SelectItem
      key={category.id}
      value={category.id}
      className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900 flex items-center space-x-2"
    >
      <div className="flex items-center">
        {category.id === 'all' && <Box className="h-4 w-4 text-pink-500" />}
        {category.id === 'debardeur' && <Shirt className="h-4 w-4 text-pink-500" />}
        {category.id === 'body' && <Shirt className="h-4 w-4 text-pink-500" />}
        {category.id === 'tshirt' && <Shirt className="h-4 w-4 text-pink-500" />}
        {category.id === 'manchelongue' && <Shirt className="h-4 w-4 text-pink-500" />}
        {category.id === 'polo' && <Shirt className="h-4 w-4 text-pink-500" />}
        {category.id === 'chemise' && <Shirt className="h-4 w-4 text-pink-500" />}
        {category.id === 'bouson' && <Shirt className="h-4 w-4 text-pink-500" />}
        {category.id === 'short' && <Shirt className="h-4 w-4 text-pink-500" />}
        <span className="ml-2">{category.name}</span>
      </div>
    </SelectItem>
  ))}
</SelectContent>

            </Select>
          </div>
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
                        {categories.find(cat => cat.id === article.categorie)?.name || article.categorie}
                      </span>
                    </div>
                    {article.emplacement && (
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-pink-500" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          Emplacement :
                        </span>
                        <span className="text-sm px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium">
                          {article.emplacement}
                        </span>
                      </div>
                    )}
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
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="rounded-xl"
                      onClick={() => handleDeleteArticle(article.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Afficher un message si aucun article n'est trouvé */}
        {currentArticles.length === 0 && (
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border-2 border-pink-200/50 dark:border-purple-700/50 text-center">
            <div className="flex flex-col items-center gap-4">
              <Package2 className="h-16 w-16 text-pink-300" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Aucun article trouvé</h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm 
                  ? `Aucun résultat pour "${searchTerm}"`
                  : selectedCategory !== "all" 
                    ? "Aucun article dans cette catégorie"
                    : "Commencez par ajouter votre premier article"
                }
              </p>
              <Button asChild className="mt-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                <Link to="/ajouter-article">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Ajouter un Article
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Pagination mise à jour */}
        {filteredArticles.length > 0 && (
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
        )}

        {/* Statistiques des articles */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200/50 dark:border-purple-700/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full">
                  <Package2 className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total des articles</p>
                  <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">{articles.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200/50 dark:border-blue-700/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <CreditCard className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Valeur totale</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {articles.reduce((total, article) => total + (article.prix * article.stock), 0).toLocaleString()} Ar
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-pink-50 dark:from-blue-900/20 dark:to-pink-900/20 border-blue-200/50 dark:border-pink-700/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Shirt className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Stock total</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {articles.reduce((total, article) => total + article.stock, 0)} unités
                  </p>
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


