import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Package2, Tag, Shirt, AlertCircle, Check, X } from "lucide-react";
import { HomeButton } from "@/components/HomeButton";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 120000, 
    stockPredefini: 45,
    stockComptage: null,
    categorie: "haut",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    tentatives: 0,
    remarque: "",
    estVerifie: false,
    estEnErreur: false
  },
  { 
    id: 2, 
    nom: "Jean Slim", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 240000, 
    stockPredefini: 30,
    stockComptage: null,
    categorie: "bas",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    tentatives: 0,
    remarque: "",
    estVerifie: false,
    estEnErreur: false
  },
  { 
    id: 3, 
    nom: "Veste en Cuir", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 850000, 
    stockPredefini: 15,
    stockComptage: null,
    categorie: "veste",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    tentatives: 0,
    remarque: "",
    estVerifie: false,
    estEnErreur: false
  },
  { 
    id: 4, 
    nom: "Robe d'été", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 180000, 
    stockPredefini: 25,
    stockComptage: null,
    categorie: "robe",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500",
    tentatives: 0,
    remarque: "",
    estVerifie: false,
    estEnErreur: false
  },
  { 
    id: 5, 
    nom: "Sweat à Capuche", 
    reference: "#" + Math.floor(100000 + Math.random() * 900000).toString(),
    prix: 150000, 
    stockPredefini: 40,
    stockComptage: null,
    categorie: "haut",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
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

export default function Inventaire() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("tous");
  
  useEffect(() => {
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

  // Filtrer les articles
  const filteredArticles = articles.filter(article => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = 
      article.nom.toLowerCase().includes(searchTermLower) ||
      article.reference.toLowerCase().includes(searchTermLower);
    const matchesCategory = selectedCategory === "all" ? true : article.categorie === selectedCategory;
    
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

  const progressInventaire = {
    total: articles.length,
    verifies: articles.filter(a => a.estVerifie).length,
    erreurs: articles.filter(a => a.estEnErreur).length
  };

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
          </div>

          <div className="flex gap-4">
            <Button asChild className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90">
              <Link to="/enregistrement">
                <Shirt className="mr-2 h-4 w-4" />
                Gestion des Articles
              </Link>
            </Button>
            <HomeButton/>
          </div>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
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
                      {category.id === 'all' && <Package2 className="h-4 w-4 text-pink-500" />}
                      {category.id !== 'all' && <Shirt className="h-4 w-4 text-pink-500" />}
                      <span className="ml-2">{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                        Prix: {article.prix.toLocaleString()} Ar | Stock prédefini: {article.stockPredefini} unités
                      </p>
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

