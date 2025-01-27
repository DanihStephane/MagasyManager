import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function RecapitulatifArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const selections = location.state?.selections;

  const handleValidation = () => {
    console.log("Article validé:", selections);
    navigate("/enregistrement");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 flex flex-col">
      <div className="absolute inset-0 bg-[url('/candy-pattern.png')] opacity-5 -z-[1]" />
      
      {/* Header moderne */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-pink-300/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            Récapitulatif de l'article
          </h1>
          <div className="flex gap-4">
            <Button asChild variant="ghost" className="hover:bg-pink-100 dark:hover:bg-pink-900">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Accueil
              </Link>
            </Button>
            <Button asChild variant="ghost" className="hover:bg-pink-100 dark:hover:bg-pink-900">
              <Link to="/ajouter-article">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-pink-200/50 dark:border-purple-700/50">
          <CardContent className="p-6 flex">
            <div className="w-1/3">
              {selections?.image ? (
                <img
                  src={selections.image}
                  alt="Preview"
                  className="w-full h-auto rounded-xl object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center">
                  <p className="text-gray-500">Aucune image</p>
                </div>
              )}
            </div>
            <div className="w-2/3 pl-6">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                Détails de l'article
              </h3>
              <div className="space-y-3">
                {selections && Object.entries(selections).map(([key, value]) => {
                  if (key === 'image') return null;
                  return (
                    <div key={key} className="flex items-center">
                      <span className="font-medium capitalize w-24">{key}:</span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {key === 'couleur' ? (
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-6 h-6 rounded-full" 
                              style={{backgroundColor: value as string}}
                            />
                            {value}
                          </div>
                        ) : value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end mt-8">
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
