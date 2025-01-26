import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function RecapitulatifArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const selections = location.state?.selections;

  const handleValidation = () => {
    // Logique de validation ici
    console.log("Article validé:", selections);
    navigate("/enregistrement"); // Redirection après validation
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Récapitulatif de l'article
          </h1>
          <Button asChild variant="ghost">
            <Link to="/ajouter-article">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Link>
          </Button>
        </div>

        <Card className="mt-8">
          <CardContent className="p-6 flex">
            <div className="w-1/3">
              {selections?.image ? (
                <img
                  src={selections.image}
                  alt="Preview"
                  className="w-full h-auto rounded-lg object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Aucune image</p>
                </div>
              )}
            </div>
            <div className="w-2/3 pl-6">
              <h3 className="text-xl font-bold mb-4">Détails de l'article</h3>
              <div className="space-y-3">
                {selections && Object.entries(selections).map(([key, value]) => {
                  if (key === 'image') return null;
                  return (
                    <div key={key} className="flex items-center">
                      <span className="font-medium capitalize w-24">{key}:</span>
                      <span className="text-gray-600">
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
            className="bg-gradient-to-r from-primary to-secondary"
            onClick={handleValidation}
          >
            Valider l'article
          </Button>
        </div>
      </div>
    </div>
  );
}
