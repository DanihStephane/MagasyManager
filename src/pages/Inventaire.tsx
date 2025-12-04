import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Package2, Tag, Shirt, AlertCircle, Check, ArrowLeft, User, Calendar, Star } from "lucide-react";
import { HomeButton } from "@/components/HomeButton";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Label } from "@/components/ui/label";

interface Article {
  id: number;
  nom: string;
  prix: number;
  stockPredefini: number; // Stock prédefini
  stockComptage: number | null; // Stock compté
  categorie: string;
  image: string;
  reference: string;
  tentatives: number;
  remarque: string;
  estVerifie: boolean;
  estEnErreur: boolean;
}

const INITIAL_ARTICLES: Article[] = [
  {
    id: 1,
    nom: "T-shirt Premium",
    prix: 25000,
    stockPredefini: 45,
    stockComptage: null,
    categorie: "haut",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    reference: "#123456",
    tentatives: 0,
    remarque: "",
    estVerifie: false,
    estEnErreur: false
  },
  {
    id: 2,
    nom: "Jean Slim",
    prix: 45000,
    stockPredefini: 32,
    stockComptage: null,
    categorie: "bas",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    reference: "#123457",
    tentatives: 0,
    remarque: "",
    estVerifie: false,
    estEnErreur: false
  },
  {
    id: 3,
    nom: "Veste en Cuir",
    prix: 120000,
    stockPredefini: 18,
    stockComptage: null,
    categorie: "veste",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    reference: "#123458",
    tentatives: 0,
    remarque: "",
    estVerifie: false,
    estEnErreur: false
  },
  {
    id: 4,
    nom: "Robe d'été",
    prix: 55000,
    stockPredefini: 28,
    stockComptage: null,
    categorie: "robe",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
    reference: "#123459",
    tentatives: 0,
    remarque: "",
    estVerifie: false,
    estEnErreur: false
  },
  {
    id: 5,
    nom: "Chemise Blanche",
    prix: 35000,
    stockPredefini: 52,
    stockComptage: null,
    categorie: "haut",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
    reference: "#123460",
    tentatives: 0,
    remarque: "",
    estVerifie: false,
    estEnErreur: false
  },
  {
    id: 6,
    nom: "Pantalon Chino",
    prix: 42000,
    stockPredefini: 38,
    stockComptage: null,
    categorie: "bas",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400",
    reference: "#123461",
    tentatives: 0,
    remarque: "",
    estVerifie: false,
    estEnErreur: false
  },
  {
    id: 7,
    nom: "Blouson Aviateur",
    prix: 95000,
    stockPredefini: 15,
    stockComptage: null,
    categorie: "veste",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",
    reference: "#123462",
    tentatives: 0,
    remarque: "",
    estVerifie: false,
    estEnErreur: false
  },
  {
    id: 8,
    nom: "Robe Cocktail",
    prix: 75000,
    stockPredefini: 22,
    stockComptage: null,
    categorie: "robe",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400",
    reference: "#123463",
    tentatives: 0,
    remarque: "",
    estVerifie: false,
    estEnErreur: false
  },
  {
    id: 9,
    nom: "Pull Col Roulé",
    prix: 48000,
    stockPredefini: 41,
    stockComptage: null,
    categorie: "haut",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
    reference: "#123464",
    tentatives: 0,
    remarque: "",
    estVerifie: false,
    estEnErreur: false
  },
  {
    id: 10,
    nom: "Short Bermuda",
    prix: 28000,
    stockPredefini: 35,
    stockComptage: null,
    categorie: "bas",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400",
    reference: "#123465",
    tentatives: 0,
    remarque: "",
    estVerifie: false,
    estEnErreur: false
  },
  {
    id: 11,
    nom: "Trench-Coat",
    prix: 110000,
    stockPredefini: 12,
    stockComptage: null,
    categorie: "veste",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400",
    reference: "#123466",
    tentatives: 0,
    remarque: "",
    estVerifie: false,
    estEnErreur: false
  },
  {
    id: 12,
    nom: "Robe Longue",
    prix: 68000,
    stockPredefini: 25,
    stockComptage: null,
    categorie: "robe",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
    reference: "#123467",
    tentatives: 0,
    remarque: "",
    estVerifie: false,
    estEnErreur: false
  }
];

const categories = [
  { id: "all", name: "Toutes les catégories" },
  { id: "haut", name: "Hauts" },
  { id: "bas", name: "Bas" },
  { id: "veste", name: "Vestes" },
  { id: "robe", name: "Robes" }
];

// Fonction pour déterminer la notation en étoiles basée sur la quantité
const getStockRating = (stock: number): { rating: number; color: string } => {
  if (stock >= 50) return { rating: 5, color: "text-red-500" }; // Beaucoup de stock - rouge
  if (stock >= 30) return { rating: 4, color: "text-orange-500" }; // Stock élevé - orange
  if (stock >= 15) return { rating: 3, color: "text-yellow-500" }; // Stock moyen - jaune
  if (stock >= 5) return { rating: 2, color: "text-blue-500" }; // Stock faible - bleu
  return { rating: 1, color: "text-gray-500" }; // Très peu de stock - gris
};

// Composant pour afficher les étoiles
const StockRating = ({ stock }: { stock: number }) => {
  const { rating, color } = getStockRating(stock);
  
  return (
    <div className="flex items-center gap-1 mt-1" title={`Niveau de stock: ${rating}/5`}>
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-4 h-4 ${i < rating ? color : 'text-gray-200'}`} 
          fill={i < rating ? "currentColor" : "none"} 
        />
      ))}
      <span className={`ml-1 text-xs font-medium ${color}`}>
        {stock} unités
      </span>
    </div>
  );
};

// Fonction pour déterminer la notation en étoiles basée sur la quantité totale d'articles dans une catégorie
const getCategoryRating = (totalStock: number): { rating: number; color: string } => {
  if (totalStock >= 200) return { rating: 5, color: "text-red-500" }; // Beaucoup d'articles - rouge
  if (totalStock >= 150) return { rating: 4, color: "text-orange-500" }; // Nombre élevé - orange
  if (totalStock >= 100) return { rating: 3, color: "text-yellow-500" }; // Nombre moyen - jaune
  if (totalStock >= 50) return { rating: 2, color: "text-blue-500" }; // Peu d'articles - bleu
  return { rating: 1, color: "text-gray-500" }; // Très peu d'articles - gris
};

// Composant pour afficher les étoiles pour une catégorie
const CategoryStockRating = ({ 
  categoryId, 
  articles,
  showCount = false 
}: { 
  categoryId: string;
  articles: Article[];
  showCount?: boolean;
}) => {
  // Calculer le stock total pour cette catégorie
  const categoryArticles = categoryId === "all" 
    ? articles 
    : articles.filter(a => a.categorie === categoryId);
  
  const totalStock = categoryArticles.reduce((sum, article) => sum + article.stockPredefini, 0);
  const { rating, color } = getCategoryRating(totalStock);
  
  return (
    <div className="flex items-center gap-1" title={`Niveau de stock: ${rating}/5`}>
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-4 h-4 ${i < rating ? color : 'text-gray-200'}`} 
          fill={i < rating ? "currentColor" : "none"} 
        />
      ))}
      {showCount && (
        <span className={`ml-1 text-xs font-medium ${color}`}>
          {totalStock} articles
        </span>
      )}
    </div>
  );
};

export default function Inventaire() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("tous");
  const [assignedCategory, setAssignedCategory] = useState<string | null>(null);
  const [responsableName, setResponsableName] = useState<string>("");
  const [inventaireDate, setInventaireDate] = useState<Date>(new Date());
  
  useEffect(() => {
    // Récupérer la catégorie assignée et le responsable
    const category = localStorage.getItem('inventaireCurrentCategory');
    const responsable = localStorage.getItem('inventaireCurrentResponsable');
    const savedDate = localStorage.getItem('inventaireDate');
    
    if (category) {
      setAssignedCategory(category);
      setSelectedCategory(category);
    }
    
    if (responsable) {
      setResponsableName(responsable);
    }
    
    if (savedDate) {
      setInventaireDate(new Date(savedDate));
    }
    
    // Initialiser les articles depuis localStorage ou utiliser les articles par défaut
    const savedArticles = localStorage.getItem('inventaireArticles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    } else {
      setArticles(INITIAL_ARTICLES);
    }
  }, []);

  // Sauvegarde des articles dans localStorage à chaque modification
  useEffect(() => {
    if (articles.length > 0) {
      localStorage.setItem('inventaireArticles', JSON.stringify(articles));
    }
  }, [articles]);

  // Sauvegarde de la date d'inventaire
  useEffect(() => {
    localStorage.setItem('inventaireDate', inventaireDate.toISOString());
  }, [inventaireDate]);

  // Filtrer les articles
  const filteredArticles = articles.filter(article => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = 
      article.nom.toLowerCase().includes(searchTermLower) ||
      article.reference.toLowerCase().includes(searchTermLower);
    
    // Si une catégorie est assignée, ne montrer que les articles de cette catégorie
    const matchesCategory = assignedCategory 
      ? article.categorie === assignedCategory 
      : selectedCategory === "all" ? true : article.categorie === selectedCategory;
    
    // Filtrer par onglet
    if (currentTab === "tous") return matchesSearch && matchesCategory;
    if (currentTab === "verifies") return article.estVerifie && matchesSearch && matchesCategory;
    if (currentTab === "nonverifies") return !article.estVerifie && matchesSearch && matchesCategory;
    if (currentTab === "erreurs") return article.estEnErreur && matchesSearch && matchesCategory;
    
    return matchesSearch && matchesCategory;
  });

  const verifierStock = (id: number, valeur: number) => {
    setArticles(prevArticles => 
      prevArticles.map(article => {
        if (article.id === id) {
          // Si le stock compté correspond au stock prédefini
          if (valeur === article.stockPredefini) {
            return {
              ...article,
              stockComptage: valeur,
              estVerifie: true,
              tentatives: 0
            };
          } else {
            // Si c'est la 3ème tentative et que ça ne correspond toujours pas
            if (article.tentatives >= 2) {
              return {
                ...article,
                stockComptage: valeur,
                tentatives: article.tentatives + 1,
                estEnErreur: true
              };
            } else {
              // Incrémente le nombre de tentatives
              return {
                ...article,
                stockComptage: valeur,
                tentatives: article.tentatives + 1
              };
            }
          }
        }
        return article;
      })
    );
  };

  const enregistrerRemarque = (id: number, remarque: string, nouveauStock: number) => {
    setArticles(prevArticles => 
      prevArticles.map(article => {
        if (article.id === id) {
          return {
            ...article,
            remarque,
            stockPredefini: nouveauStock,
            stockComptage: nouveauStock,
            estVerifie: true,
            estEnErreur: false,
            tentatives: 0
          };
        }
        return article;
      })
    );
    setDialogOpen(false);
  };

  const ouvrirDialog = (article: Article) => {
    setSelectedArticle(article);
    setDialogOpen(true);
  };

  // Calculer les statistiques pour la catégorie assignée ou toutes les catégories
  const getProgressInventaire = () => {
    const articlesToCount = assignedCategory 
      ? articles.filter(a => a.categorie === assignedCategory)
      : articles;
    
    return {
      total: articlesToCount.length,
      verifies: articlesToCount.filter(a => a.estVerifie).length,
      erreurs: articlesToCount.filter(a => a.estEnErreur).length
    };
  };

  const progressInventaire = getProgressInventaire();

  // Vérifier si l'inventaire est terminé pour cette catégorie
  const isInventaireComplete = () => {
    if (!assignedCategory) return false;
    
    const articlesInCategory = articles.filter(a => a.categorie === assignedCategory);
    return articlesInCategory.every(a => a.estVerifie);
  };

  // Marquer la catégorie comme terminée
  const markCategoryAsComplete = () => {
    if (!assignedCategory) return;
    
    // Récupérer les assignations
    const savedAssignments = localStorage.getItem('inventaireAssignments');
    if (savedAssignments) {
      const assignments = JSON.parse(savedAssignments);
      const updatedAssignments = assignments.map((a: any) => 
        a.categorie === assignedCategory ? { ...a, estTermine: true } : a
      );
      localStorage.setItem('inventaireAssignments', JSON.stringify(updatedAssignments));
    }
    
    // Retourner à la page de sélection
    navigate('/selection-inventaire');
  };

  // Formater la date pour l'affichage
  const formattedDate = format(inventaireDate, "dd MMMM yyyy", { locale: fr });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 flex flex-col">
      <div className="absolute inset-0 bg-[url('https://st4.depositphotos.com/1076214/20486/i/1600/depositphotos_204867158-stock-photo-interior-fashion-clothing-store-women.jpg')] bg-cover bg-center bg-no-repeat opacity-50 -z-[1]" />
      
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-pink-300/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package2 className="h-8 w-8 text-pink-500 animate-pulse" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
              Inventaire des Articles
            </h1>
            
            {assignedCategory && (
              <div className="flex flex-col ml-2">
                <Badge className={`${
                  categories.find(c => c.id === assignedCategory)?.id === 'haut' ? 'bg-pink-500' :
                  categories.find(c => c.id === assignedCategory)?.id === 'bas' ? 'bg-blue-500' :
                  categories.find(c => c.id === assignedCategory)?.id === 'veste' ? 'bg-purple-500' :
                  'bg-green-500'
                }`}>
                  {categories.find(c => c.id === assignedCategory)?.name}
                </Badge>
                
                {/* Ajout des étoiles pour la catégorie sélectionnée */}
                <div className="mt-1">
                  <CategoryStockRating 
                    categoryId={assignedCategory} 
                    articles={articles} 
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            {assignedCategory ? (
              <Button 
                onClick={() => navigate('/selection-inventaire')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </Button>
            ) : (
              <Button asChild className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90">
                <Link to="/enregistrement">
                  <Shirt className="mr-2 h-4 w-4" />
                  Gestion des Articles
                </Link>
              </Button>
            )}
            <HomeButton/>
          </div>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
        {/* Informations sur le responsable et la date */}
        <div className="mb-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4 border-2 border-pink-200/50 dark:border-purple-700/50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-pink-500" />
            <span className="font-medium">Responsable: <span className="text-pink-600">{responsableName}</span></span>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-pink-500" />
            <div className="flex flex-col">
              <Label htmlFor="inventaire-date" className="text-sm text-gray-600">Date d'inventaire:</Label>
              <Input
                id="inventaire-date"
                type="date"
                value={inventaireDate.toISOString().split('T')[0]}
                onChange={(e) => {
                  if (e.target.value) {
                    setInventaireDate(new Date(e.target.value));
                  }
                }}
                className="border-pink-200 hover:border-pink-500"
              />
            </div>
            <span className="font-medium text-pink-600">{formattedDate}</span>
          </div>
          
          {isInventaireComplete() && (
            <Button 
              onClick={markCategoryAsComplete}
              className="bg-green-500 hover:bg-green-600"
            >
              <Check className="mr-2 h-4 w-4" />
              Terminer l'inventaire
            </Button>
          )}
        </div>
        
        {/* Progrès d'inventaire */}
        <div className="mb-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-pink-200/50 dark:border-purple-700/50">
          <h2 className="text-xl font-semibold mb-4 text-pink-600">Progression de l'inventaire</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/90 dark:bg-slate-800/90">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Articles vérifiés</p>
                  <p className="text-2xl font-bold text-pink-600">{progressInventaire.verifies} / {progressInventaire.total}</p>
                </div>
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <Check className="h-6 w-6 text-pink-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 dark:bg-slate-800/90">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Restants à vérifier</p>
                  <p className="text-2xl font-bold text-purple-600">{progressInventaire.total - progressInventaire.verifies}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shirt className="h-6 w-6 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 dark:bg-slate-800/90">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Écarts détectés</p>
                  <p className="text-2xl font-bold text-red-600">{progressInventaire.erreurs}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Recherche et filtres */}
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

            {/* Category Select - Seulement visible si aucune catégorie n'est assignée */}
            {!assignedCategory && (
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
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          {category.id === 'all' && <Package2 className="h-4 w-4 text-pink-500" />}
                          {category.id === 'all' && <Package2 className="h-4 w-4 text-pink-500" />}
                          {category.id !== 'all' && <Shirt className="h-4 w-4 text-pink-500" />}
                          <span className="ml-2">{category.name}</span>
                        </div>
                        
                        {/* Ajoutez les étoiles pour chaque catégorie */}
                        {category.id !== 'all' && (
                          <div className="ml-6 mt-1">
                            <CategoryStockRating categoryId={category.id} articles={articles} />
                          </div>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        {/* Onglets des types d'articles */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-8">
          <TabsList className="grid grid-cols-4 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl">
            <TabsTrigger value="tous" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              Tous les articles
            </TabsTrigger>
            <TabsTrigger value="verifies" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Vérifiés ({progressInventaire.verifies})
            </TabsTrigger>
            <TabsTrigger value="nonverifies" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              Non vérifiés ({progressInventaire.total - progressInventaire.verifies - progressInventaire.erreurs})
            </TabsTrigger>
            <TabsTrigger value="erreurs" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
              Écarts ({progressInventaire.erreurs})
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Liste des articles */}
        <div className="grid gap-4 mt-8">
          {filteredArticles.length === 0 ? (
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-12 border-2 border-pink-200/50 dark:border-purple-700/50 text-center">
              <Package2 className="h-12 w-12 text-pink-500 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Aucun article trouvé</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Essayez de modifier vos critères de recherche</p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <Card 
                key={article.id} 
                className={`group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 ${
                  article.estVerifie 
                    ? 'border-green-200/50 dark:border-green-700/50' 
                    : article.estEnErreur 
                      ? 'border-red-200/50 dark:border-red-700/50' 
                      : 'border-pink-200/50 dark:border-purple-700/50'
                } hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300`}
              >
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
                      <p className="text-gray-600 dark:text-gray-300">
                        Prix: {article.prix.toLocaleString()} Ar
                      </p>
                      
                      {/* Notation en étoiles basée sur la quantité */}
                      <StockRating stock={article.stockPredefini} />
                      
                      <div className="flex items-center gap-2 mt-1">
                        <Tag className="w-4 h-4 text-pink-500" />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          Catégorie :
                        </span>
                        <span className="text-sm px-2 py-1 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 font-medium">
                          {categories.find(cat => cat.id === article.categorie)?.name || article.categorie}
                        </span>
                      </div>
                      
                      {article.estEnErreur && (
                        <div className="mt-2">
                          <Button 
                            onClick={() => ouvrirDialog(article)}
                            variant="destructive" 
                            size="sm"
                            className="text-xs"
                          >
                            <AlertCircle className="h-3 w-3 mr-1" /> 
                            Résoudre l'écart
                          </Button>
                        </div>
                      )}
                      
                      {article.estVerifie && !article.estEnErreur && (
                        <div className="mt-2 flex items-center text-green-600">
                          <Check className="h-4 w-4 mr-1" />
                          <span>Vérifié - {article.stockComptage} unités</span>
                        </div>
                      )}
                      
                      {article.remarque && (
                        <div className="mt-1 text-sm text-gray-500 italic">
                          Remarque: {article.remarque}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-4">
                    <span className="px-4 py-2 text-lg font-bold font-mono bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white rounded-xl shadow-lg">
                      {article.reference}
                    </span>
                    
                    {!article.estVerifie ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          placeholder="Quantité..."
                          className="w-32 h-10 text-base border-2 border-pink-200/50 rounded-xl"
                          value={article.stockComptage !== null ? article.stockComptage : ''}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            setArticles(prevArticles => 
                              prevArticles.map(a => 
                                a.id === article.id 
                                  ? {...a, stockComptage: isNaN(value) ? null : value} 
                                  : a
                              )
                            );
                          }}
                        />
                        <Button 
                          onClick={() => article.stockComptage !== null && verifierStock(article.id, article.stockComptage)}
                          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 rounded-xl"
                          disabled={article.stockComptage === null}
                        >
                          Vérifier
                        </Button>
                      </div>
                    ) : (
                      <div className={`px-3 py-2 rounded-xl ${
                        article.estEnErreur ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {article.estEnErreur 
                          ? `Écart détecté: ${article.stockComptage} ≠ ${article.stockPredefini}` 
                          : 'Stock confirmé'}
                      </div>
                    )}
                    
                    {article.tentatives > 0 && article.tentatives < 3 && !article.estVerifie && (
                      <Alert className="bg-yellow-50 border-yellow-200 w-full">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <AlertTitle className="text-yellow-600 text-xs">Vérification échouée</AlertTitle>
                        <AlertDescription className="text-yellow-600 text-xs">
                          Tentative {article.tentatives}/3. Le stock ne correspond pas.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Dialogue pour gérer les écarts */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-pink-600">Résoudre l'écart d'inventaire</DialogTitle>
          </DialogHeader>
          
          {selectedArticle && (
            <div className="py-4">
              <div className="mb-4 bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-medium text-red-700">Écart détecté pour : {selectedArticle.nom}</h3>
                <p className="text-red-600">
                  Stock système: <span className="font-bold">{selectedArticle.stockPredefini}</span> unités | 
                  Stock compté: <span className="font-bold">{selectedArticle.stockComptage}</span> unités
                </p>
                
                {/* Affichage des étoiles dans la boîte de dialogue */}
                <div className="mt-2">
                  <p className="text-sm text-red-600">Niveau de stock actuel:</p>
                  <StockRating stock={selectedArticle.stockPredefini} />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nouveau stock à enregistrer:
                  </label>
                  <Input 
                    type="number" 
                    defaultValue={selectedArticle.stockComptage ?? ''} 
                    className="w-full" 
                    id="nouveauStock"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Remarque sur l'écart:
                  </label>
                  <Textarea 
                    placeholder="Expliquez la raison de l'écart d'inventaire..."
                    className="w-full min-h-[100px]"
                    id="remarque"
                  />
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              className="bg-gradient-to-r from-pink-500 to-purple-500"
              onClick={() => {
                if (selectedArticle) {
                  const remarque = (document.getElementById('remarque') as HTMLTextAreaElement).value;
                  const nouveauStock = parseInt((document.getElementById('nouveauStock') as HTMLInputElement).value);
                  if (!isNaN(nouveauStock)) {
                    enregistrerRemarque(selectedArticle.id, remarque, nouveauStock);
                  }
                }
              }}
            >
              Enregistrer la correction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rapport d'inventaire */}
      <div className="w-full max-w-7xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-pink-200/50 dark:border-purple-700/50">
          <h2 className="text-xl font-semibold mb-4 text-pink-600">Rapport d'inventaire</h2>
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Date d'inventaire: <span className="font-medium text-pink-600">{formattedDate}</span></p>
              <p className="text-sm text-gray-600">Responsable: <span className="font-medium text-pink-600">{responsableName}</span></p>
              {assignedCategory && (
                <p className="text-sm text-gray-600">
                  Catégorie: <span className="font-medium text-pink-600">
                    {categories.find(c => c.id === assignedCategory)?.name}
                  </span>
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs">5 étoiles (≥50)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-xs">4 étoiles (≥30)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs">3 étoiles (≥15)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs">2 étoiles (≥5)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <span className="text-xs">1 étoile (&lt;5)</span>
              </div>
            </div>
          </div>

          {/* Notation des catégories */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Notation des catégories:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {categories.filter(c => c.id !== 'all').map(category => (
                <div key={category.id} className="flex items-center gap-2 bg-white/50 p-3 rounded-lg">
                  <Shirt className="h-4 w-4 text-pink-500" />
                  <span className="text-xs font-medium">{category.name}:</span>
                  <CategoryStockRating categoryId={category.id} articles={articles} />
                </div>
              ))}
            </div>
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

