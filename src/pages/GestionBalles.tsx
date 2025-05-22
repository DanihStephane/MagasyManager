import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";
import { 
  Package, Search, Filter, Plus, Edit, Trash2, 
  ArrowLeft, Save, X, CheckCircle, Layers, MapPin,
  Package2, Home, PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeButton } from "@/components/HomeButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Définition des interfaces
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

interface ArticleQuantite {
  article: Article;
  quantite: number;
}

interface Balle {
  id: number;
  numero: string;
  emplacement: string;
  etage: string;
  quantite: number;
  dateCreation: Date;
  articles: ArticleQuantite[];
}

// Données de démonstration
const articlesDemo: Article[] = [
  {
    id: 1,
    nom: "T-shirt Homme",
    prix: 15000,
    stock: 50,
    categorie: "Vêtements Homme",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
    reference: "TH-001",
    couleur: "Bleu",
  },
  {
    id: 2,
    nom: "Robe d'été",
    prix: 25000,
    stock: 30,
    categorie: "Vêtements Femme",
    image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    reference: "RF-002",
    couleur: "Rouge",
  },
  {
    id: 3,
    nom: "Pantalon Enfant",
    prix: 18000,
    stock: 40,
    categorie: "Vêtements Enfant",
    image: "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    reference: "PE-003",
    couleur: "Vert",
  },
  {
    id: 4,
    nom: "Chemise Homme",
    prix: 22000,
    stock: 25,
    categorie: "Vêtements Homme",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1525&q=80",
    reference: "CH-004",
    couleur: "Blanc",
  },
  {
    id: 5,
    nom: "Jupe Femme",
    prix: 19000,
    stock: 35,
    categorie: "Vêtements Femme",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
    reference: "JF-005",
    couleur: "Noir",
  }
];

const ballesDemo: Balle[] = [
  {
    id: 1,
    numero: "B001",
    emplacement: "Zone A",
    etage: "C",
    quantite: 50,
    dateCreation: new Date("2023-10-15"),
    articles: [
      { article: articlesDemo[0], quantite: 30 },
      { article: articlesDemo[3], quantite: 20 }
    ]
  },
  {
    id: 2,
    numero: "B002",
    emplacement: "Zone B",
    etage: "A",
    quantite: 45,
    dateCreation: new Date("2023-10-16"),
    articles: [
      { article: articlesDemo[1], quantite: 25 },
      { article: articlesDemo[4], quantite: 20 }
    ]
  },
  {
    id: 3,
    numero: "B003",
    emplacement: "Zone C",
    etage: "B",
    quantite: 40,
    dateCreation: new Date("2023-10-17"),
    articles: [
      { article: articlesDemo[2], quantite: 40 }
    ]
  }
];

// Composant principal
export default function GestionBalles() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [balles, setBalles] = useState<Balle[]>(ballesDemo);
  const [articles, setArticles] = useState<Article[]>(articlesDemo);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEmplacement, setFilterEmplacement] = useState("_all");
  const [filterEtage, setFilterEtage] = useState("_all");
  
  // État pour le formulaire d'ajout/édition
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentBalle, setCurrentBalle] = useState<Balle | null>(null);
  const [selectedArticles, setSelectedArticles] = useState<ArticleQuantite[]>([]);
  const [numero, setNumero] = useState("");
  const [emplacement, setEmplacement] = useState("");
  const [etage, setEtage] = useState("");
  const [quantite, setQuantite] = useState(0);
  
  // État pour la visualisation du dépôt
  const [showDepot, setShowDepot] = useState(false);
  
  // Emplacements disponibles
  const emplacements = ["Zone A", "Zone B", "Zone C", "Zone D"];
  const etages = ["A", "B", "C", "D", "E"];
  
  // Filtrer les balles
  const filteredBalles = balles.filter(balle => {
    return (
      balle.numero.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterEmplacement === "_all" || balle.emplacement === filterEmplacement) &&
      (filterEtage === "_all" || balle.etage === filterEtage)
    );
  });
  
  // Réinitialiser le formulaire
  const resetForm = () => {
    setCurrentBalle(null);
    setSelectedArticles([]);
    setNumero("");
    setEmplacement("");
    setEtage("");
    setQuantite(0);
    setIsEditMode(false);
  };
  
  // Ouvrir le formulaire d'ajout
  const handleAdd = () => {
    resetForm();
    setIsDialogOpen(true);
  };
  
  // Ouvrir le formulaire d'édition
  const handleEdit = (balle: Balle) => {
    setCurrentBalle(balle);
    setNumero(balle.numero);
    setEmplacement(balle.emplacement);
    setEtage(balle.etage);
    setQuantite(balle.quantite);
    setSelectedArticles([...balle.articles]);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };
  
  // Supprimer une balle
  const handleDelete = (id: number) => {
    if (confirm(language === 'fr' ? 'Êtes-vous sûr de vouloir supprimer cette balle ?' : 'Azonao antoka fa te-hamafa ity balle ity ianao?')) {
      setBalles(balles.filter(balle => balle.id !== id));
    }
  };
  
  // Ajouter ou modifier une balle
  const handleSave = () => {
    if (!numero || !emplacement || !etage || selectedArticles.length === 0) {
      alert(language === 'fr' ? 'Veuillez remplir tous les champs obligatoires' : 'Fenoy ny saha rehetra ilaina');
      return;
    }
    
    // Calculer la quantité totale
    const totalQuantite = selectedArticles.reduce((sum, item) => sum + item.quantite, 0);
    
    if (isEditMode && currentBalle) {
      // Mode édition
      const updatedBalles = balles.map(balle => 
        balle.id === currentBalle.id 
          ? {
              ...balle,
              numero,
              emplacement,
              etage,
              quantite: totalQuantite,
              articles: [...selectedArticles]
            }
          : balle
      );
      setBalles(updatedBalles);
    } else {
      // Mode ajout
      const newBalle: Balle = {
        id: balles.length > 0 ? Math.max(...balles.map(b => b.id)) + 1 : 1,
        numero,
        emplacement,
        etage,
        quantite: totalQuantite,
        dateCreation: new Date(),
        articles: [...selectedArticles]
      };
      setBalles([...balles, newBalle]);
    }
    
    setIsDialogOpen(false);
    resetForm();
  };
  
  // Gérer la sélection d'articles
  const handleArticleSelection = (article: Article) => {
    const existingIndex = selectedArticles.findIndex(item => item.article.id === article.id);
    
    if (existingIndex >= 0) {
      // L'article est déjà sélectionné, on le retire
      setSelectedArticles(selectedArticles.filter((_, index) => index !== existingIndex));
    } else {
      // Ajouter l'article avec une quantité par défaut de 1
      setSelectedArticles([...selectedArticles, { article, quantite: 1 }]);
    }
  };
  
  // Mettre à jour la quantité d'un article sélectionné
  const updateArticleQuantity = (articleId: number, quantity: number) => {
    setSelectedArticles(selectedArticles.map(item => 
      item.article.id === articleId 
        ? { ...item, quantite: quantity } 
        : item
    ));
  };
  
  // Vérifier si un article est sélectionné
  const isArticleSelected = (articleId: number) => {
    return selectedArticles.some(item => item.article.id === articleId);
  };
  
  // Retourner à la page d'accueil
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 flex flex-col">
      <div className="absolute inset-0 bg-[url('https://st4.depositphotos.com/1076214/20486/i/1600/depositphotos_204867158-stock-photo-interior-fashion-clothing-store-women.jpg')] bg-cover bg-center bg-no-repeat opacity-50 -z-[1]" />
      
      {/* Header moderne similaire à Enregistrement.tsx */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-pink-300/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package2 className="h-8 w-8 text-pink-500 animate-bounce" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
              {language === 'fr' ? 'Gestion des Balles' : 'Fitantanana ny Balles'}
            </h1>
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={handleAdd}
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              {language === 'fr' ? 'Nouvelle Balle' : 'Balle Vaovao'}
            </Button>
            <HomeButton />
          </div>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
        {/* Search bar and filter section */}
        <div className="mb-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-pink-200/50 dark:border-purple-700/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-500 h-5 w-5 transition-all duration-300 hover:scale-110 z-10"
              />
              <Input
                type="search"
                placeholder={language === 'fr' ? "Rechercher une balle..." : "Hitady balle..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 h-12 text-lg border-2 border-pink-200/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl focus:border-pink-500 focus:ring-pink-500"
              />
            </div>

            {/* Emplacement Select */}
            <Select value={filterEmplacement} onValueChange={setFilterEmplacement}>
              <SelectTrigger className="w-full h-12 text-lg border-2 border-pink-200/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-pink-500" />
                <SelectValue placeholder={language === 'fr' ? "Emplacement" : "Toerana"} />
              </SelectTrigger>
              <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
                <SelectItem value="_all" className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900">
                  {language === 'fr' ? "Tous les emplacements" : "Toerana rehetra"}
                </SelectItem>
                {emplacements.map(emp => (
                  <SelectItem key={emp} value={emp} className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900">
                    {emp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Étage Select */}
            <Select value={filterEtage} onValueChange={setFilterEtage}>
              <SelectTrigger className="w-full h-12 text-lg border-2 border-pink-200/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl flex items-center">
                <Layers className="mr-2 h-4 w-4 text-pink-500" />
                <SelectValue placeholder={language === 'fr' ? "Étage" : "Ambony"} />
              </SelectTrigger>
              <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
                <SelectItem value="_all" className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900">
                  {language === 'fr' ? "Tous les étages" : "Ambony rehetra"}
                </SelectItem>
                {etages.map(et => (
                  <SelectItem key={et} value={et} className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900">
                    {language === 'fr' ? `Étage ${et}` : `Ambony ${et}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Onglets */}
        <Tabs defaultValue="liste" className="mb-8">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="liste" className="rounded-l-lg">
              <Layers className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Liste des Balles' : 'Lisitry ny Balles'}
            </TabsTrigger>
            <TabsTrigger value="depot" className="rounded-r-lg">
              <MapPin className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Plan du Dépôt' : 'Sarin\'ny Toerana'}
            </TabsTrigger>
          </TabsList>
          
          {/* Contenu de l'onglet Liste */}
          <TabsContent value="liste" className="mt-6">
            {filteredBalles.length === 0 ? (
              <div className="text-center py-12 bg-white/80 dark:bg-slate-800/80 rounded-lg shadow-md">
                <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
                  {language === 'fr' ? 'Aucune balle trouvée' : 'Tsy misy balle hita'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  {language === 'fr' 
                    ? 'Essayez de modifier vos filtres ou ajoutez une nouvelle balle' 
                    : 'Ovay ny sivana na manampia balle vaovao'}
                </p>
              </div>
            ) : (
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-lg shadow-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === 'fr' ? 'Numéro' : 'Laharana'}</TableHead>
                      <TableHead>{language === 'fr' ? 'Emplacement' : 'Toerana'}</TableHead>
                      <TableHead>{language === 'fr' ? 'Étage' : 'Ambony'}</TableHead>
                      <TableHead>{language === 'fr' ? 'Quantité' : 'Habetsahany'}</TableHead>
                      <TableHead>{language === 'fr' ? 'Date de création' : 'Daty namoronana'}</TableHead>
                      <TableHead>{language === 'fr' ? 'Articles' : 'Entana'}</TableHead>
                      <TableHead className="text-right">{language === 'fr' ? 'Actions' : 'Asa'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBalles.map((balle) => (
                      <TableRow key={balle.id} className="hover:bg-pink-50/50 dark:hover:bg-pink-900/20">
                        <TableCell className="font-medium">{balle.numero}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {balle.emplacement}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                            {balle.etage}
                          </Badge>
                        </TableCell>
                        <TableCell>{balle.quantite}</TableCell>
                        <TableCell>{balle.dateCreation.toLocaleDateString()}</TableCell>
                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge className="cursor-help bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                                  {balle.articles.length} {language === 'fr' ? 'articles' : 'entana'}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-4 rounded-xl border-2 border-pink-200/50 dark:border-purple-700/50">
                                <ul className="text-sm space-y-2">
                                  {balle.articles.map((item, index) => (
                                    <li key={index} className="py-1 border-b border-gray-200 last:border-0 flex items-center gap-2">
                                      <img 
                                        src={item.article.image} 
                                        alt={item.article.nom} 
                                        className="w-8 h-8 rounded-md object-cover"
                                      />
                                      <div>
                                        <div className="font-medium">{item.article.nom}</div>
                                        <div className="text-xs text-gray-500">{item.quantite} unités</div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEdit(balle)}
                              className="h-8 w-8 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900"
                            >
                              <Edit className="h-4 w-4 text-blue-500" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDelete(balle.id)}
                              className="h-8 w-8 rounded-full hover:bg-red-100 dark:hover:bg-red-900"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
          
          {/* Contenu de l'onglet Plan du Dépôt */}
          <TabsContent value="depot" className="mt-6">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-pink-200/50 dark:border-purple-700/50 shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                {language === 'fr' ? 'Plan du Dépôt' : 'Sarin\'ny Toerana Fitehirizana'}
              </h2>
              
              {/* Vue d'ensemble du dépôt */}
              <div className="relative w-full h-[500px] border-2 border-pink-200/50 dark:border-purple-700/50 rounded-xl overflow-hidden mb-6 shadow-lg">
                {/* Image de fond du dépôt */}
                <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/warehouse-interior-logistics-delivery-storage_107791-1354.jpg')] bg-cover bg-center opacity-10"></div>
                
                {/* Légende */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl p-3 rounded-lg shadow-md z-10 border-2 border-pink-200/50 dark:border-purple-700/50">
                  <h3 className="font-medium text-sm mb-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                    {language === 'fr' ? 'Légende' : 'Fanamarinana'}
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                      <span>{language === 'fr' ? 'Zone disponible' : 'Faritra malalaka'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-pink-100 border border-pink-300 rounded"></div>
                      <span>{language === 'fr' ? 'Zone sélectionnée' : 'Faritra voafidy'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></div>
                      <span>{language === 'fr' ? 'Étage sélectionné' : 'Ambony voafidy'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-pink-100 text-pink-800">B001</Badge>
                      <span>{language === 'fr' ? 'Balle' : 'Balle'}</span>
                    </div>
                  </div>
                </div>
                
                {/* Structure du dépôt */}
                <div className="absolute inset-0 flex flex-col p-4">
                  {/* Titre du dépôt */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                      {language === 'fr' ? 'Dépôt Principal' : 'Toerana Fitehirizana Lehibe'}
                    </h3>
                    <p className="text-sm text-gray-500">{language === 'fr' ? 'Vue de dessus' : 'Jerena avy any ambony'}</p>
                  </div>
                  
                  {/* Entrée du dépôt */}
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-10 border-2 border-gray-400 rounded-t-lg flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                      <span className="text-sm font-medium">{language === 'fr' ? 'Entrée' : 'Fidirana'}</span>
                    </div>
                  </div>
                  
                  {/* Corps principal du dépôt avec ailes gauche et droite */}
                  <div className="flex-1 flex">
                    {/* Aile gauche */}
                    <div className="w-1/2 pr-2 flex flex-col">
                      <div className="text-center mb-2">
                        <span className="text-sm font-medium">{language === 'fr' ? 'Aile Gauche' : 'Ilany Havia'}</span>
                      </div>
                      <div className="flex-1 grid grid-rows-2 gap-2">
                        {/* Zone A et B (aile gauche) */}
                        {emplacements.slice(0, 2).map((zone) => {
                          const zoneBalles = balles.filter(b => b.emplacement === zone);
                          return (
                            <div 
                              key={zone}
                              className={`relative border-2 rounded-lg p-2 ${
                                filterEmplacement === zone 
                                  ? 'border-pink-500 bg-pink-50/70 dark:bg-pink-900/30' 
                                  : 'border-gray-300 bg-gray-50/70 dark:bg-gray-800/50'
                              } hover:shadow-md transition-all duration-300`}
                              onClick={() => setFilterEmplacement(filterEmplacement === zone ? "_all" : zone)}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-lg">{zone}</h3>
                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                  {zoneBalles.length} {language === 'fr' ? 'balles' : 'balles'}
                                </Badge>
                              </div>
                              
                              {/* Représentation des étagères */}
                              <div className="grid grid-cols-5 gap-1">
                                {etages.map(et => {
                                  const etageBalles = zoneBalles.filter(b => b.etage === et);
                                  return (
                                    <div 
                                      key={`${zone}-${et}`}
                                      className={`p-1 rounded border ${
                                        filterEtage === et && filterEmplacement === zone
                                          ? 'border-purple-500 bg-purple-50/70 dark:bg-purple-900/30' 
                                          : 'border-gray-300 bg-gray-100/70 dark:bg-gray-700/50'
                                      } hover:border-purple-300 transition-all duration-300`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (filterEmplacement === zone && filterEtage === et) {
                                          setFilterEtage("_all");
                                        } else {
                                          setFilterEmplacement(zone);
                                          setFilterEtage(et);
                                        }
                                      }}
                                    >
                                      <div className="text-center text-xs font-medium">
                                        {et}
                                      </div>
                                      
                                      {/* Nombre de balles par étage */}
                                      {etageBalles.length > 0 && (
                                        <div className="text-center mt-1">
                                          <Badge className="text-xs bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                                            {etageBalles.length}
                                          </Badge>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Allée centrale */}
                    <div className="w-4 mx-1 h-full bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      <div className="transform -rotate-90 whitespace-nowrap text-xs font-medium text-gray-500">
                        {language === 'fr' ? 'Allée centrale' : 'Lalana afovoany'}
                      </div>
                    </div>
                    
                    {/* Aile droite */}
                    <div className="w-1/2 pl-2 flex flex-col">
                      <div className="text-center mb-2">
                        <span className="text-sm font-medium">{language === 'fr' ? 'Aile Droite' : 'Ilany Havanana'}</span>
                      </div>
                      <div className="flex-1 grid grid-rows-2 gap-2">
                        {/* Zone C et D (aile droite) */}
                        {emplacements.slice(2, 4).map((zone) => {
                          const zoneBalles = balles.filter(b => b.emplacement === zone);
                          return (
                            <div 
                              key={zone}
                              className={`relative border-2 rounded-lg p-2 ${
                                filterEmplacement === zone 
                                  ? 'border-pink-500 bg-pink-50/70 dark:bg-pink-900/30' 
                                  : 'border-gray-300 bg-gray-50/70 dark:bg-gray-800/50'
                              } hover:shadow-md transition-all duration-300`}
                              onClick={() => setFilterEmplacement(filterEmplacement === zone ? "_all" : zone)}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-lg">{zone}</h3>
                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                  {zoneBalles.length} {language === 'fr' ? 'balles' : 'balles'}
                                </Badge>
                              </div>
                              
                              {/* Représentation des étagères */}
                              <div className="grid grid-cols-5 gap-1">
                                {etages.map(et => {
                                  const etageBalles = zoneBalles.filter(b => b.etage === et);
                                  return (
                                    <div 
                                      key={`${zone}-${et}`}
                                      className={`p-1 rounded border ${
                                        filterEtage === et && filterEmplacement === zone
                                          ? 'border-purple-500 bg-purple-50/70 dark:bg-purple-900/30' 
                                          : 'border-gray-300 bg-gray-100/70 dark:bg-gray-700/50'
                                      } hover:border-purple-300 transition-all duration-300`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (filterEmplacement === zone && filterEtage === et) {
                                          setFilterEtage("_all");
                                        } else {
                                          setFilterEmplacement(zone);
                                          setFilterEtage(et);
                                        }
                                      }}
                                    >
                                      <div className="text-center text-xs font-medium">
                                        {et}
                                      </div>
                                      
                                      {/* Nombre de balles par étage */}
                                      {etageBalles.length > 0 && (
                                        <div className="text-center mt-1">
                                          <Badge className="text-xs bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                                            {etageBalles.length}
                                          </Badge>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Détail de la zone sélectionnée */}
              {filterEmplacement !== "_all" && (
                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-xl shadow-md p-4 border-2 border-pink-200/50 dark:border-purple-700/50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                      {language === 'fr' ? `Détail de la zone ${filterEmplacement}` : `Antsipirihan'ny faritra ${filterEmplacement}`}
                    </h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setFilterEmplacement("_all");
                        setFilterEtage("_all");
                      }}
                      className="text-xs rounded-full border-pink-200 hover:bg-pink-100 dark:hover:bg-pink-900"
                    >
                      {language === 'fr' ? 'Réinitialiser' : 'Avereno'}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                    {etages.map(et => {
                      const etageBalles = balles.filter(b => b.emplacement === filterEmplacement && b.etage === et);
                      return (
                        <div 
                          key={`detail-${filterEmplacement}-${et}`}
                          className={`p-3 rounded-lg border-2 ${
                            filterEtage === et 
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30' 
                              : 'border-gray-300 bg-gray-50 dark:bg-gray-800/50'
                          } cursor-pointer hover:shadow-md transition-all duration-300`}
                          onClick={() => setFilterEtage(filterEtage === et ? "_all" : et)}
                        >
                          <div className="text-center mb-2">
                            <span className="font-medium">{language === 'fr' ? `Étage ${et}` : `Ambony ${et}`}</span>
                          </div>
                          
                          {etageBalles.length === 0 ? (
                            <div className="text-center text-sm text-gray-500 py-2">
                              {language === 'fr' ? 'Aucune balle' : 'Tsy misy balle'}
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-1 justify-center">
                              {etageBalles.map(balle => (
                                <Badge 
                                  key={balle.id}
                                  className="bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200 cursor-pointer hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(balle);
                                  }}
                                >
                                  {balle.numero}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Statistiques des balles */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-200/50 dark:border-purple-700/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full">
                  <Package2 className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'fr' ? 'Total des balles' : 'Fitambaran\'ny balles'}</p>
                  <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">{balles.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200/50 dark:border-blue-700/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <Layers className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'fr' ? 'Articles stockés' : 'Entana voatahiry'}</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {balles.reduce((total, balle) => total + balle.quantite, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-pink-50 dark:from-blue-900/20 dark:to-pink-900/20 border-blue-200/50 dark:border-pink-700/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <MapPin className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{language === 'fr' ? 'Zones occupées' : 'Faritra ampiasaina'}</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {new Set(balles.map(b => b.emplacement)).size} / {emplacements.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer moderne */}
      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t-2 border-pink-300/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} MagasyManager. {language === 'fr' ? 'Tous droits réservés.' : 'Zo rehetra voatokana.'}
          </p>
        </div>
      </footer>
      
      {/* Dialogue d'ajout/édition de balle */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-2 border-pink-200/50 dark:border-purple-700/50 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
              {isEditMode 
                ? (language === 'fr' ? 'Modifier la Balle' : 'Hanova ny Balle') 
                : (language === 'fr' ? 'Ajouter une Nouvelle Balle' : 'Manampy Balle Vaovao')}
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              {language === 'fr' 
                ? 'Renseignez les informations de la balle et sélectionnez les articles qu\'elle contient.' 
                : 'Fenoy ny mombamomba ny balle ary safidio ny entana ao anatiny.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Formulaire */}
            <div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="numero" className="text-gray-700 dark:text-gray-300">
                    {language === 'fr' ? 'Numéro de Balle' : 'Laharan\'ny Balle'} *
                  </Label>
                  <Input
                    id="numero"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    placeholder={language === 'fr' ? "Ex: B001" : "Oh: B001"}
                    className="mt-1 border-2 border-pink-200/50 focus:border-pink-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl"
                  />
                </div>
                
                {/* Sélection visuelle de l'emplacement */}
                <div>
                  <Label className="text-gray-700 dark:text-gray-300">
                    {language === 'fr' ? 'Emplacement' : 'Toerana'} *
                  </Label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {emplacements.map(emp => (
                      <div
                        key={emp}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          emplacement === emp 
                            ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30' 
                            : 'border-gray-200 hover:border-pink-300 bg-gray-50 dark:bg-gray-800/50'
                        }`}
                        onClick={() => setEmplacement(emp)}
                      >
                        <div className="font-medium text-center">{emp}</div>
                        <div className="text-xs text-center mt-1 text-gray-500">
                          {balles.filter(b => b.emplacement === emp).length} {language === 'fr' ? 'balles' : 'balles'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sélection visuelle de l'étage */}
                <div>
                  <Label className="text-gray-700 dark:text-gray-300">
                    {language === 'fr' ? 'Étage' : 'Ambony'} *
                  </Label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {etages.map(et => (
                      <div
                        key={et}
                        className={`p-2 w-16 h-16 rounded-lg border-2 cursor-pointer flex items-center justify-center transition-all ${
                          etage === et 
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30' 
                            : 'border-gray-200 hover:border-purple-300 bg-gray-50 dark:bg-gray-800/50'
                        }`}
                        onClick={() => setEtage(et)}
                      >
                        <div className="font-bold text-lg">{et}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Visualisation 3D simplifiée */}
                  {emplacement && etage && (
                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200">
                      <div className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        {language === 'fr' ? 'Emplacement sélectionné:' : 'Toerana voafidy:'}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 flex items-center justify-center">
                          {/* Représentation 3D simplifiée de l'étagère */}
                          <div className="absolute inset-0 flex flex-col">
                            {etages.map((et, index) => (
                              <div 
                                key={et}
                                className={`flex-1 border-t ${index === 0 ? 'border-t-0' : ''} border-gray-300 flex items-center justify-center ${
                                  etage === et ? 'bg-purple-100 dark:bg-purple-900/30' : ''
                                }`}
                              >
                                {etage === et && (
                                  <div className="text-xs font-bold">
                                    {language === 'fr' ? `Étage ${et}` : `Ambony ${et}`}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {/* Indication de l'emplacement */}
                          <div className="absolute -bottom-6 left-0 right-0 text-center text-xs font-medium">
                            {emplacement}
                          </div>
                        </div>
                        
                        <div className="flex-1 text-sm text-gray-600 dark:text-gray-300">
                          <p>
                            {language === 'fr' 
                              ? `Vous allez placer la balle "${numero || '...'}" à l'étage ${etage} de la zone ${emplacement}.`
                              : `Apetraka amin'ny ambony ${etage} ao amin'ny faritra ${emplacement} ny balle "${numero || '...'}".`}
                          </p>
                          {balles.filter(b => b.emplacement === emplacement && b.etage === etage).length > 0 && (
                            <p className="mt-1 text-amber-600 dark:text-amber-400">
                              {language === 'fr' 
                                ? `Il y a déjà ${balles.filter(b => b.emplacement === emplacement && b.etage === etage).length} balle(s) à cet emplacement.`
                                : `Efa misy balle ${balles.filter(b => b.emplacement === emplacement && b.etage === etage).length} amin'io toerana io.`}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <Label className="text-gray-700 dark:text-gray-300">
                    {language === 'fr' ? 'Articles Sélectionnés' : 'Entana Voasafidy'} *
                  </Label>
                  {selectedArticles.length === 0 ? (
                    <div className="text-sm text-gray-500 mt-1 p-2 border border-dashed border-gray-300 rounded-md">
                      {language === 'fr' 
                        ? 'Aucun article sélectionné. Veuillez sélectionner au moins un article.' 
                        : 'Tsy misy entana voasafidy. Misafidiana entana iray farafahakeliny.'}
                    </div>
                  ) : (
                    <div className="mt-1 space-y-2">
                      {selectedArticles.map((item) => (
                        <div key={item.article.id} className="flex items-center justify-between p-2 border border-gray-200 rounded-md bg-gray-50 dark:bg-gray-800">
                          <div className="flex items-center gap-2">
                            <img 
                              src={item.article.image} 
                              alt={item.article.nom} 
                              className="w-10 h-10 rounded-md object-cover"
                            />
                            <div>
                              <div className="font-medium">{item.article.nom}</div>
                              <div className="text-xs text-gray-500">{item.article.reference}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min="1"
                              value={item.quantite}
                              onChange={(e) => updateArticleQuantity(item.article.id, parseInt(e.target.value) || 1)}
                              className="w-20 border-2 border-pink-200/50 focus:border-pink-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-lg"
                            />
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleArticleSelection(item.article)}
                              className="h-8 w-8 rounded-full hover:bg-red-100 dark:hover:bg-red-900"
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="flex justify-between items-center p-2 border-t border-gray-200 mt-2 pt-2">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {language === 'fr' ? 'Quantité totale' : 'Fitambarany'}:
                        </span>
                        <span className="font-bold text-pink-600 dark:text-pink-400">
                          {selectedArticles.reduce((sum, item) => sum + item.quantite, 0)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Sélection d'articles */}
            <div>
              <Label className="text-gray-700 dark:text-gray-300">
                {language === 'fr' ? 'Sélectionner des Articles' : 'Misafidiana Entana'}
              </Label>
              <div className="mt-1 border-2 border-pink-200/50 dark:border-purple-700/50 rounded-xl h-[400px] overflow-y-auto">
                <div className="sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-2 border-b border-gray-200">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder={language === 'fr' ? "Rechercher un article..." : "Hitady entana..."}
                      className="w-full pl-10 border-2 border-pink-200/50 focus:border-pink-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
                  {articles.map((article) => (
                    <div 
                      key={article.id} 
                      className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                        isArticleSelected(article.id)
                          ? 'bg-pink-100 dark:bg-pink-900/30 border border-pink-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent'
                      }`}
                      onClick={() => handleArticleSelection(article)}
                    >
                      <div className="flex-shrink-0">
                        <img 
                          src={article.image} 
                          alt={article.nom} 
                          className="w-12 h-12 rounded-md object-cover"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="font-medium truncate">{article.nom}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <span>{article.reference}</span>
                          <span>•</span>
                          <span>{article.categorie}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Checkbox 
                          checked={isArticleSelected(article.id)}
                          onCheckedChange={() => handleArticleSelection(article)}
                          className="border-2 border-pink-200 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="rounded-full border-pink-200 hover:bg-pink-100 dark:hover:bg-pink-900"
            >
              {language === 'fr' ? 'Annuler' : 'Ajanony'}
            </Button>
            <Button 
              onClick={handleSave} 
              className="rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90"
            >
              <Save className="h-4 w-4 mr-2" />
              {language === 'fr' ? 'Enregistrer' : 'Tehirizo'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


