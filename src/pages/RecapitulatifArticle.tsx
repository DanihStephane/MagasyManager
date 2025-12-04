import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, Plus, Tag, Box, Palette, Ruler, Hash, CreditCard, Package2, FileText, Shirt, ClipboardList, LayoutGrid, MapPin } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function RecapitulatifArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const selections = location.state?.selections;
  // Add this mapping
  // Add this mapping object at the top of the file
  const choicesMap = {
    genre: {
      homme: "Hommes",
      femme: "Femmes",
      garcon: "Garçons",
      fille: "Filles"
    },
    classe: {
      debardeur: "Débardeur",
      body: "Body",
      tshirt: "T-Shirt",
      manchelongue: "Manche longue",
      polo: "Polo",
      chemise: "Chemise",
      bouson: "Bouson",
      short: "Short"
    },
    matiere: {
      cotton: "Cotton",
      lin: "Lin",
      jeans: "Jeans",
      nilon: "Nilon",
      filet: "Filet",
      fibrane: "Fibrane",
      "3d": "3D"
    }
  };
  
  
    const handleValidation = () => {
      // Format the selections into an Article object
      const newArticle = {
        id: Date.now(), // Generate unique ID
        nom: `${selections.classe} ${selections.matiere} ${selections.genre} ${selections.motif}`,
        reference: `${selections.reference}`,
        prix: Number(selections.prixUnitaire),
        stock: Number(selections.quantite),
        categorie: selections.classe,
        image: selections.image,
        couleur: selections.couleur,
        emplacement: selections.emplacement, // Ajout de l'emplacement
      };
  
      // Get existing articles from localStorage or initialize empty array
      const existingArticles = JSON.parse(localStorage.getItem('articles') || '[]');
      
      // Add new article at the beginning
      const updatedArticles = [newArticle, ...existingArticles];
      
      // Save to localStorage
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
      
      navigate("/enregistrement");
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 flex flex-col">
         <div className="absolute inset-0 bg-[url('https://st4.depositphotos.com/1076214/20486/i/1600/depositphotos_204867158-stock-photo-interior-fashion-clothing-store-women.jpg')] bg-cover bg-center bg-no-repeat opacity-50 -z-[1]" />
        
        {/* Header moderne */}
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-pink-300/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
              Récapitulatif de l'article
            </h1>
            <div className="flex gap-4">
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
  
          </div>
        </header>
  
        <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-pink-200/50 dark:border-purple-700/50 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-1/3 p-6 border-r border-pink-200/50">
                {selections?.image ? (
                  <div className="relative group">
                    <img
                      src={selections.image}
                      alt="Preview"
                      className="w-full h-[400px] object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  </div>
                ) : (
                  <div className="w-full h-[400px] bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <Shirt className="w-20 h-20 text-pink-300" />
                  </div>
                )}
              </div>
  
              {/* Details Section */}
              <div className="lg:w-2/3 p-6">
              <div className="flex items-center gap-3 mb-6">
    <ClipboardList className="w-8 h-8 text-pink-500" />
    <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
      Détails de l'article
    </h3>
  </div>
  
  
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selections && Object.entries(selections).map(([key, value]: [string, any]) => {
                    if (key === 'image') return null;
                    
                    const getIcon = (key: string) => {
                      const icons = {
                        genre: <Tag className="w-5 h-5" />,
                        classe: <Shirt className="w-5 h-5" />,
                        matiere: <Box className="w-5 h-5" />,
                        couleur: <Palette className="w-5 h-5" />,
                        pointure: <Ruler className="w-5 h-5" />,
                        reference: <Hash className="w-5 h-5" />,
                        prixUnitaire: <CreditCard className="w-5 h-5" />,
                        quantite: <Package2 className="w-5 h-5" />,
                        description: <FileText className="w-5 h-5" />,
                        emplacement: <MapPin className="w-5 h-5" />
                      };
                      return icons[key as keyof typeof icons] || <Tag className="w-5 h-5" />;
                    };
  
                    return (
                      <div key={key} className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-xl border border-pink-100 dark:border-purple-800 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 rounded-lg">
                            {getIcon(key)}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{key}</p>
                            <div className="font-medium">
                              {key === 'couleur' ? (
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm" 
                                    style={{backgroundColor: value as string}}
                                  />
                                  <span>{value}</span>
                                </div>
                              ) : (
                                <span>{(choicesMap as any)[key]?.[value] || value}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
  
                {selections.emplacement && (
                  <div className="mt-6 bg-white/50 dark:bg-slate-800/50 p-4 rounded-xl border border-pink-100 dark:border-purple-800 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 rounded-lg">
                        <LayoutGrid className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-medium">Emplacement dans l'entrepôt</h4>
                    </div>
                    
                    {/* Visualisation du plan de l'entrepôt */}
                    <div className="relative w-full h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg mb-6 overflow-hidden border-2 border-gray-300 dark:border-gray-700">
                      {/* Entrées */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-green-500 flex items-center justify-center text-white font-bold rounded-t-lg">
                        ENTRÉE PRINCIPALE
                      </div>
                      
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-green-500 flex items-center justify-center text-white font-bold rounded-b-lg">
                        ENTRÉE SECONDAIRE
                      </div>
                      
                      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-8 h-24 bg-green-500 flex items-center justify-center text-white font-bold rounded-l-lg writing-mode-vertical">
                        <span className="transform rotate-90">SORTIE URGENCE</span>
                      </div>
                      
                      {/* Allées */}
                      <div className="absolute top-8 bottom-8 left-1/2 transform -translate-x-1/2 w-16 bg-gray-200 dark:bg-gray-700"></div>
                      <div className="absolute left-8 right-8 top-1/2 transform -translate-y-1/2 h-16 bg-gray-200 dark:bg-gray-700"></div>
                      
                                           {/* Rangées A - Côté gauche bas */}
                                           <div className="absolute bottom-24 left-8 w-[calc(50%-24px)] h-[calc(50%-32px)] bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-2">
                        <div className="text-center font-medium text-blue-700 dark:text-blue-300 mb-2 bg-blue-100 dark:bg-blue-900/40 py-1 rounded">Zone A - Vêtements légers</div>
                        <div className="grid grid-cols-5 gap-1 h-[calc(100%-32px)]">
                          {[1, 2, 3, 4, 5].map((row) => (
                            <div key={`A-row-${row}`} className="flex flex-col gap-1">
                              {[1, 2, 3].map((shelf) => (
                                <div
                                  key={`A-${row}-${shelf}`}
                                  className={`h-6 flex items-center justify-center rounded text-xs border ${
                                    selections.emplacement === `A-${row}-${shelf}` 
                                      ? 'bg-pink-500 text-white font-bold border-pink-600' 
                                      : 'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800/30'
                                  }`}
                                >
                                  {selections.emplacement === `A-${row}-${shelf}` && <span className="absolute w-3 h-3 bg-pink-500 rounded-full animate-ping opacity-75"></span>}
                                  A-{row}-{shelf}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Rangées B - Côté droit bas */}
                      <div className="absolute bottom-24 right-8 w-[calc(50%-24px)] h-[calc(50%-32px)] bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-2">
                        <div className="text-center font-medium text-green-700 dark:text-green-300 mb-2 bg-green-100 dark:bg-green-900/40 py-1 rounded">Zone B - Vêtements moyens</div>
                        <div className="grid grid-cols-5 gap-1 h-[calc(100%-32px)]">
                          {[1, 2, 3, 4, 5].map((row) => (
                            <div key={`B-row-${row}`} className="flex flex-col gap-1">
                              {[1, 2, 3].map((shelf) => (
                                <div
                                  key={`B-${row}-${shelf}`}
                                  className={`h-6 flex items-center justify-center rounded text-xs border ${
                                    selections.emplacement === `B-${row}-${shelf}` 
                                      ? 'bg-pink-500 text-white font-bold border-pink-600' 
                                      : 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-800/30'
                                  }`}
                                >
                                  {selections.emplacement === `B-${row}-${shelf}` && <span className="absolute w-3 h-3 bg-pink-500 rounded-full animate-ping opacity-75"></span>}
                                  B-{row}-{shelf}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Rangées C - Côté gauche haut */}
                      <div className="absolute top-24 left-8 w-[calc(50%-24px)] h-[calc(50%-32px)] bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-2">
                        <div className="text-center font-medium text-purple-700 dark:text-purple-300 mb-2 bg-purple-100 dark:bg-purple-900/40 py-1 rounded">Zone C - Vêtements lourds</div>
                        <div className="grid grid-cols-5 gap-1 h-[calc(100%-32px)]">
                          {[1, 2, 3, 4, 5].map((row) => (
                            <div key={`C-row-${row}`} className="flex flex-col gap-1">
                              {[1, 2, 3].map((shelf) => (
                                <div
                                  key={`C-${row}-${shelf}`}
                                  className={`h-6 flex items-center justify-center rounded text-xs border ${
                                    selections.emplacement === `C-${row}-${shelf}` 
                                      ? 'bg-pink-500 text-white font-bold border-pink-600' 
                                      : 'bg-purple-50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-800/30'
                                  }`}
                                >
                                  {selections.emplacement === `C-${row}-${shelf}` && <span className="absolute w-3 h-3 bg-pink-500 rounded-full animate-ping opacity-75"></span>}
                                  C-{row}-{shelf}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Rangées D - Côté droit haut */}
                      <div className="absolute top-24 right-8 w-[calc(50%-24px)] h-[calc(50%-32px)] bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-2">
                        <div className="text-center font-medium text-orange-700 dark:text-orange-300 mb-2 bg-orange-100 dark:bg-orange-900/40 py-1 rounded">Zone D - Accessoires</div>
                        <div className="grid grid-cols-5 gap-1 h-[calc(100%-32px)]">
                          {[1, 2, 3, 4, 5].map((row) => (
                            <div key={`D-row-${row}`} className="flex flex-col gap-1">
                              {[1, 2, 3].map((shelf) => (
                                <div
                                  key={`D-${row}-${shelf}`}
                                  className={`h-6 flex items-center justify-center rounded text-xs border ${
                                    selections.emplacement === `D-${row}-${shelf}` 
                                      ? 'bg-pink-500 text-white font-bold border-pink-600' 
                                      : 'bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-800/30'
                                  }`}
                                >
                                  {selections.emplacement === `D-${row}-${shelf}` && <span className="absolute w-3 h-3 bg-pink-500 rounded-full animate-ping opacity-75"></span>}
                                  D-{row}-{shelf}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-100 dark:bg-blue-800 rounded-sm"></div>
                          <span className="text-sm">Zone A: Vêtements légers</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-100 dark:bg-green-800 rounded-sm"></div>
                          <span className="text-sm">Zone B: Vêtements moyens</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-100 dark:bg-purple-800 rounded-sm"></div>
                          <span className="text-sm">Zone C: Vêtements lourds</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-100 dark:bg-orange-800 rounded-sm"></div>
                          <span className="text-sm">Zone D: Accessoires</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-800/30">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-pink-500" />
                        <p className="font-medium text-pink-700 dark:text-pink-300">Emplacement sélectionné: {selections.emplacement}</p>
                      </div>
                      <p className="text-sm text-pink-600 dark:text-pink-400 mt-1 ml-7">
                        {selections.emplacement.startsWith('A') && 'Zone vêtements légers - Accès facile, près de l\'entrée principale'}
                        {selections.emplacement.startsWith('B') && 'Zone vêtements moyens - Accès modéré, côté droit du magasin'}
                        {selections.emplacement.startsWith('C') && 'Zone vêtements lourds - Accès restreint, fond du magasin'}
                        {selections.emplacement.startsWith('D') && 'Zone accessoires - Accès facile, près de l\'entrée secondaire'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-4 mt-8">
            <Button 
              asChild 
              variant="outline"
              className="border-pink-500 hover:bg-pink-100 dark:hover:bg-pink-900"
            >
              <Link to="/ajouter-article">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un autre article
              </Link>
            </Button>
            <Button 
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90"
              onClick={handleValidation}
            >
              Valider l'article
            </Button>
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

