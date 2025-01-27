import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Home, ArrowLeft, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// Définition des types
type Step = {
  title: string;
  choices?: Choice[];
};

type Choice = {
  id: string;
  name: string;
  imageUrl: string;
};

export default function AjouterArticle() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    genre: "",
    classe: "",
    matiere: "",
    motif: "",
    dessin: "",
    pointure: "",
    couleur: "",
    image: ""
  });
  const [showRecap, setShowRecap] = useState(false);  // Définition des étapes
  const navigate = useNavigate();
  const steps: Step[] = [
    {
      title: "Genres",
      choices: [
        { id: "homme", name: "Hommes", imageUrl: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80" },
        { id: "femme", name: "Femmes", imageUrl: "https://images.unsplash.com/photo-1617551307353-1185d5efe9e1?q=80" },
        { id: "garcon", name: "Garçons", imageUrl: "https://images.unsplash.com/photo-1555009393-f20bdb245c4d?q=80" },
        { id: "fille", name: "Filles", imageUrl: "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?q=80" }
      ]
    },
    {
      title: "Classes",
      choices: [
        { id: "debardeur", name: "Débardeur", imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80" },
        { id: "body", name: "Body", imageUrl: "https://images.unsplash.com/photo-1525507707867-d09247ed719c?q=80" },
        { id: "tshirt", name: "T-Shirt", imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80" },
        { id: "manchelongue", name: "Manche longue", imageUrl: "https://images.unsplash.com/photo-1602810316693-0a5c00b04882?q=80" },
        { id: "polo", name: "Polo", imageUrl: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80" },
        { id: "chemise", name: "Chemise", imageUrl: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80" },
        { id: "bouson", name: "Bouson", imageUrl: "https://images.unsplash.com/photo-1615210146789-d27c7f1cb7aa?q=80" },
        { id: "short", name: "Short", imageUrl: "https://images.unsplash.com/photo-1622879498438-c1cdfa16c5be?q=80" }
      ]
    },
    {
      title: "Matière",
      choices: [
        { id: "cotton", name: "Cotton", imageUrl: "https://images.unsplash.com/photo-1585537249610-42b01a1faa72?q=80" },
        { id: "lin", name: "Lin", imageUrl: "https://images.unsplash.com/photo-1595475207225-428b62bda831?q=80" },
        { id: "jeans", name: "Jeans", imageUrl: "https://images.unsplash.com/photo-1624378439575-d8a75b4d9718?q=80" },
        { id: "nilon", name: "Nilon", imageUrl: "https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80" },
        { id: "filet", name: "Filet", imageUrl: "https://images.unsplash.com/photo-1583336526884-e60c41c8c036?q=80" },
        { id: "fibrane", name: "Fibrane", imageUrl: "https://images.unsplash.com/photo-1611048267937-5d88c5d59d00?q=80" },
        { id: "3d", name: "3D", imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80" }
      ]
    },
    {
      title: "Motif",
      choices: [
        { 
          id: "uni", 
          name: "Uni", 
          imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80" 
        },
        { 
          id: "fleuri", 
          name: "Fleuri", 
          imageUrl: "https://images.unsplash.com/photo-1530906622963-8f99cc1a4d0b?q=80"
        },
        { 
          id: "devale", 
          name: "Dévalé", 
          imageUrl: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80"
        },
        { 
          id: "arcenciel", 
          name: "Arc-en-ciel", 
          imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80"
        },
        { 
          id: "raye", 
          name: "Rayé", 
          imageUrl: "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?q=80"
        },
        { 
          id: "marque", 
          name: "Marque", 
          imageUrl: "https://images.unsplash.com/photo-1561997968-aa846c2bf255?q=80"
        }
      ]
    },
    {
      title: "Dessin",
      choices: [
        { id: "personne", name: "Personne", imageUrl: "https://images.unsplash.com/photo-1610208601852-vb6fc24d5806?q=80" },
        { id: "animal", name: "Animal", imageUrl: "https://images.unsplash.com/photo-1551717743-49959800b553?q=80" },
        { id: "paysage", name: "Paysage", imageUrl: "https://images.unsplash.com/photo-1469098902551-02f5d0b7a405?q=80" },
        { id: "fleur", name: "Fleur", imageUrl: "https://images.unsplash.com/photo-1529176130524-dab10bdfb144?q=80" },
        { id: "abstrait", name: "Abstrait", imageUrl: "https://images.unsplash.com/photo-1573348817102-5bb07c0d3d75?q=80" },
        { id: "chiffre", name: "Chiffre", imageUrl: "https://images.unsplash.com/photo-1590336979570-8dff66f28730?q=80" },
        { id: "vehicule", name: "Véhicule", imageUrl: "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80" },
        { id: "marque", name: "Marque", imageUrl: "https://images.unsplash.com/photo-1622462449267-1a5d7dda38c0?q=80" },
        { id: "rien", name: "Rien", imageUrl: "https://images.unsplash.com/photo-1595114501840-2d1e93073232?q=80" }
      ]
    },
    {
      title: "Pointures",
      choices: [] // Cette étape sera gérée différemment avec un input et une palette de couleurs
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 flex flex-col">
    <div className="absolute inset-0 bg-[url('/candy-pattern.png')] opacity-5 -z-[1]" />
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-pink-300/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
          Ajouter un Article
        </h1>
        <div className="flex gap-4">
          <Button asChild variant="ghost" className="hover:bg-pink-100 dark:hover:bg-pink-900">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Accueil
            </Link>
          </Button>
        </div>
      </div>
    </header>


    <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
      {/* Header with stepper */}
      <div className="mb-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-pink-200/50 dark:border-purple-700/50">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            {steps[currentStep].title}
          </h1>
          <Button asChild variant="ghost" className="hover:bg-pink-100 dark:hover:bg-pink-900">
            <Link to="/enregistrement">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Link>
          </Button>
        </div>

        {/* Update stepper indicators */}
        <div className="flex justify-between mt-8 relative">
          {/* Lignes de connexion en arrière-plan */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
          <div 
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 -translate-y-1/2 transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
          
          {/* Points du stepper */}
          {steps.map((step, index) => (
            <div key={index} className="z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                ${index === currentStep 
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white scale-110 shadow-lg' 
                  : index < currentStep 
                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white' 
                    : 'bg-white border-2 border-gray-200'
                }`}>
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="font-medium">{index + 1}</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Content */}
      {currentStep === 5 ? (
        <Card className="w-full">
          <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Taille</label>
                  <Input 
                    type="text" 
                    placeholder="Entrez la pointure (ex: S, M, L, XL, XXL ou 38, 39, 40...)" 
                    value={selections.pointure}
                    onChange={(e) => setSelections({...selections, pointure: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Couleur</label>
                  <div className="grid grid-cols-8 gap-2 mb-4">
                    {[
                      "#000000", // Noir
                      "#FFFFFF", // Blanc
                      "#FF0000", // Rouge
                      "#0000FF", // Bleu
                      "#008000", // Vert
                      "#FFFF00", // Jaune
                      "#FFA500", // Orange
                      "#800080", // Violet
                      "#FFC0CB", // Rose
                      "#A52A2A", // Marron
                      "#808080", // Gris
                      "#FFD700", // Or
                      "#C0C0C0", // Argent
                      "#000080", // Bleu marine
                      "#8B4513", // Marron foncé
                      "#4B0082", // Indigo
                    ].map((color) => (
                      <div
                        key={color}
                        className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                          selections.couleur === color ? 'border-primary' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelections({ ...selections, couleur: color })}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    className="w-full h-10 rounded-md cursor-pointer"
                    value={selections.couleur}
                    onChange={(e) => setSelections({...selections, couleur: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps[currentStep].choices?.map((choice) => (
              <Card 
                key={choice.id}
                className={`cursor-pointer hover:scale-105 group relative overflow-hidden rounded-2xl 
                  border-2 border-pink-200/50 dark:border-purple-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl 
                  hover:shadow-xl hover:shadow-pink-500/20 duration-300
                  ${selections[steps[currentStep].title.toLowerCase()] === choice.id ? 'ring-2 ring-pink-500' : ''}`}
                onClick={() => {
                  setSelections({
                    ...selections,
                    [steps[currentStep].title.toLowerCase()]: choice.id
                  });
                  if (currentStep < steps.length - 1) {
                    setCurrentStep(prev => prev + 1);
                  }
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400/10 via-purple-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-4">
                  <img 
                    src={choice.imageUrl} 
                    alt={choice.name}
                    className="w-full h-48 object-cover rounded-lg mb-2 group-hover:scale-105 duration-300"
                  />
                  <p className="text-center font-medium bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">{choice.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            className="border-pink-200/50 hover:bg-pink-100 dark:hover:bg-pink-900"
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
          >
            Précédent
          </Button>
      
          {currentStep === steps.length - 1 ? (
            <Button 
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90 transform hover:-translate-y-1 transition-all duration-200"
              onClick={() => navigate('/recapitulatif-article', { state: { selections } })}
            >
              Terminer
            </Button>
          ) : (
            <Button
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90"
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!selections[steps[currentStep].title.toLowerCase()]}
            >
              Suivant
            </Button>
          )}
        </div>
        {/* Récapitulatif (visible uniquement à la dernière étape) */}
        {currentStep === steps.length - 1 && (
          <Card className="mt-8">
            <CardContent className="p-6 flex">
              <div className="w-1/3">
                <input
                  type="file"
                  accept="image/*"
                  className="mb-4"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const reader = new FileReader()
                      reader.onload = (event) => {
                        setSelections({
                          ...selections,
                          image: event.target?.result as string
                        })
                      }
                      reader.readAsDataURL(e.target.files[0])
                    }
                  }}
                />
                {selections.image ? (
                  <img
                    src={selections.image}
                    alt="Preview"
                    className="w-full h-auto rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Choisir une image</p>
                  </div>
                )}
              </div>
              <div className="w-2/3 pl-6">
                <h3 className="text-xl font-bold mb-4">Récapitulatif</h3>
                <div className="space-y-3">
                  {Object.entries(selections).map(([key, value]) => {
                    if (key === 'image') return null
                    const step = steps.find(s => s.title.toLowerCase() === key)
                    const choice = step?.choices?.find(c => c.id === value)
                
                    return (
                      <div key={key} className="flex items-center">
                        <span className="font-medium capitalize w-24">{key}:</span>
                        <span className="text-gray-600">
                          {key === 'couleur' ? (
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-6 h-6 rounded-full" 
                                style={{backgroundColor: value}}
                              />
                              {value}
                            </div>
                          ) : choice?.name || value}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
      </div>
        <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t-2 border-pink-300/50">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-600 dark:text-gray-300">
              © {new Date().getFullYear()} MagasyManager. Tous droits réservés.
            </p>
          </div>
        </footer>

    </div>
  )}

