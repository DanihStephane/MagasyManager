import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HomeButton } from "@/components/HomeButton";
import { Package2, Users, Tag, ArrowRight, UserCheck, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Article {
  id: number;
  nom: string;
  prix: number;
  stockPredefini: number;
  stockComptage: number | null;
  categorie: string;
  image: string;
  reference: string;
  tentatives: number;
  remarque: string;
  estVerifie: boolean;
  estEnErreur: boolean;
}

interface InventaireAssignment {
  id: string;
  categorie: string;
  nom: string;
  responsable: string | null;
  avatar?: string;
  couleur: string;
  nombreArticles: number;
  estTermine: boolean;
}

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

export default function SelectionInventaire() {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<InventaireAssignment[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<InventaireAssignment | null>(null);
  const [responsableName, setResponsableName] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Charger les articles pour les notations en étoiles
    const savedArticles = localStorage.getItem('inventaireArticles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    }
    
    // Charger les assignations depuis localStorage ou initialiser
    const savedAssignments = localStorage.getItem('inventaireAssignments');
    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments));
    } else {
      // Assignations par défaut
      const defaultAssignments: InventaireAssignment[] = [
        {
          id: "haut",
          categorie: "haut",
          nom: "Hauts",
          responsable: null,
          couleur: "bg-pink-500",
          nombreArticles: 15,
          estTermine: false
        },
        {
          id: "bas",
          categorie: "bas",
          nom: "Bas",
          responsable: null,
          couleur: "bg-blue-500",
          nombreArticles: 10,
          estTermine: false
        },
        {
          id: "veste",
          categorie: "veste",
          nom: "Vestes",
          responsable: null,
          couleur: "bg-purple-500",
          nombreArticles: 8,
          estTermine: false
        },
        {
          id: "robe",
          categorie: "robe",
          nom: "Robes",
          responsable: null,
          couleur: "bg-green-500",
          nombreArticles: 12,
          estTermine: false
        }
      ];
      setAssignments(defaultAssignments);
      localStorage.setItem('inventaireAssignments', JSON.stringify(defaultAssignments));
    }
  }, []);

  const saveAssignments = (newAssignments: InventaireAssignment[]) => {
    setAssignments(newAssignments);
    localStorage.setItem('inventaireAssignments', JSON.stringify(newAssignments));
  };

  const handleAssign = (assignment: InventaireAssignment) => {
    setSelectedAssignment(assignment);
    setResponsableName(assignment.responsable || "");
    setDialogOpen(true);
  };

  const confirmAssignment = () => {
    if (selectedAssignment) {
      const newAssignments = assignments.map(a => 
        a.id === selectedAssignment.id 
          ? { ...a, responsable: responsableName || null } 
          : a
      );
      saveAssignments(newAssignments);
      setDialogOpen(false);
    }
  };

  const startInventaire = (assignment: InventaireAssignment) => {
    // Stocker la catégorie sélectionnée pour l'inventaire
    localStorage.setItem('inventaireCurrentCategory', assignment.categorie);
    localStorage.setItem('inventaireCurrentResponsable', assignment.responsable || "");
    navigate('/inventaire');
  };

  const markAsComplete = (id: string, isComplete: boolean) => {
    const newAssignments = assignments.map(a => 
      a.id === id ? { ...a, estTermine: isComplete } : a
    );
    saveAssignments(newAssignments);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  const getProgressStats = () => {
    const total = assignments.length;
    const assigned = assignments.filter(a => a.responsable).length;
    const completed = assignments.filter(a => a.estTermine).length;
    
    return { total, assigned, completed };
  };

  const stats = getProgressStats();

  // Calculer le nombre réel d'articles par catégorie à partir des données d'articles
  const getArticleCountByCategory = (categoryId: string) => {
    return articles.filter(article => article.categorie === categoryId).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 flex flex-col">
      <div className="absolute inset-0 bg-[url('https://st4.depositphotos.com/1076214/20486/i/1600/depositphotos_204867158-stock-photo-interior-fashion-clothing-store-women.jpg')] bg-cover bg-center bg-no-repeat opacity-50 -z-[1]" />
      
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-pink-300/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-pink-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
              Répartition des tâches d'inventaire
            </h1>
          </div>

          <HomeButton />
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
        {/* Statistiques */}
        <div className="mb-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-pink-200/50 dark:border-purple-700/50">
          <h2 className="text-xl font-semibold mb-4 text-pink-600">Progression de la répartition</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/90 dark:bg-slate-800/90">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Catégories assignées</p>
                  <p className="text-2xl font-bold text-pink-600">{stats.assigned} / {stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-pink-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 dark:bg-slate-800/90">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Catégories terminées</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed} / {stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Package2 className="h-6 w-6 text-green-600" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 dark:bg-slate-800/90">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Articles à inventorier</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {articles.length > 0 
                      ? articles.length 
                      : assignments.reduce((sum, a) => sum + a.nombreArticles, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Tag className="h-6 w-6 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Liste des catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {assignments.map((assignment) => (
            <Card 
              key={assignment.id} 
              className={`group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 
                ${assignment.estTermine 
                  ? 'border-green-200/50 dark:border-green-700/50' 
                  : 'border-pink-200/50 dark:border-purple-700/50'} 
                hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${assignment.couleur} rounded-full flex items-center justify-center`}>
                    <Tag className="h-6 w-6 text-white" />
                  </div>
                  
                  {assignment.estTermine && (
                    <Badge className="bg-green-500">Terminé</Badge>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                  {assignment.nom}
                </h3>
                
                {/* Ajout des étoiles pour chaque catégorie */}
                {articles.length > 0 && (
                  <div className="mb-2">
                    <CategoryStockRating 
                      categoryId={assignment.categorie} 
                      articles={articles} 
                      showCount={true}
                    />
                  </div>
                )}
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {articles.length > 0 
                    ? getArticleCountByCategory(assignment.categorie) 
                    : assignment.nombreArticles} articles à inventorier
                </p>
                
                {assignment.responsable ? (
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={assignment.avatar} />
                      <AvatarFallback className="bg-pink-100 text-pink-600">
                        {getInitials(assignment.responsable)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {assignment.responsable}
                      </p>
                      <p className="text-sm text-gray-500">Responsable</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 mb-4 text-gray-400">
                    <Avatar>
                      <AvatarFallback className="bg-gray-100 text-gray-400">?</AvatarFallback>
                    </Avatar>
                    <p className="italic">Non assigné</p>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="px-6 pb-6 pt-0 flex flex-wrap gap-2">
                {!assignment.responsable ? (
                  <Button 
                    onClick={() => handleAssign(assignment)}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
                  >
                    <UserCheck className="mr-2 h-4 w-4" />
                    Assigner
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={() => startInventaire(assignment)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
                    >
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Commencer
                    </Button>
                    
                    <Button 
                      onClick={() => handleAssign(assignment)}
                      variant="outline"
                      className="flex-1"
                    >
                      Modifier
                    </Button>
                    
                    <Button 
                      onClick={() => markAsComplete(assignment.id, !assignment.estTermine)}
                      variant={assignment.estTermine ? "destructive" : "secondary"}
                      className="flex-1"
                    >
                      {assignment.estTermine ? "Rouvrir" : "Terminer"}
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Dialog pour assigner une personne */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-pink-600">
              {selectedAssignment?.responsable 
                ? `Modifier l'assignation pour ${selectedAssignment?.nom}` 
                : `Assigner un responsable pour ${selectedAssignment?.nom}`}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom du responsable:
            </label>
            <Input 
              value={responsableName}
              onChange={(e) => setResponsableName(e.target.value)}
              placeholder="Entrez le nom du responsable"
              className="w-full"
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              className="bg-gradient-to-r from-pink-500 to-purple-500"
              onClick={confirmAssignment}
            >
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Légende des étoiles */}
<div className="w-full max-w-7xl mx-auto px-4 pb-8 sm:px-6 lg:px-8">
  <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-4 border-2 border-pink-200/50 dark:border-purple-700/50">
    <h3 className="text-sm font-medium text-gray-700 mb-2">Légende des étoiles:</h3>
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <span className="text-xs text-red-500 font-medium">5 étoiles (≥200 articles)</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
        <span className="text-xs text-orange-500 font-medium">4 étoiles (≥150 articles)</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <span className="text-xs text-yellow-500 font-medium">3 étoiles (≥100 articles)</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
        <span className="text-xs text-blue-500 font-medium">2 étoiles (≥50 articles)</span>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-gray-500"></div>
        <span className="text-xs text-gray-500 font-medium">1 étoile (&lt;50 articles)</span>
      </div>
    </div>
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

