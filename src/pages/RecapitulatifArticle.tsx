import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home, Plus, Tag, Box, Palette, Ruler, Hash, CreditCard, Package2, FileText, Shirt, ClipboardList } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function RecapitulatifArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const selections = location.state?.selections;
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
    const newArticle: Article = {
      id: Date.now(), // Generate unique ID
      nom: `${selections.classe} ${selections.matiere} ${selections.genre} ${selections.motif}`,
      reference: `${selections.reference}`,
      prix: Number(selections.prixUnitaire),
      stock: Number(selections.quantite),
      categorie: selections.classe,
      image: selections.image,
      couleur: selections.couleur,
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
                {selections && Object.entries(selections).map(([key, value]) => {
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
                      description: <FileText className="w-5 h-5" />
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
                              <span>{choicesMap[key as keyof typeof choicesMap]?.[value as string] || value}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
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