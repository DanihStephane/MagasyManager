import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Home, ArrowLeft, Check, Plus, Package, LayoutGrid } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { 
  Filter,
  PlusCircle,
  Ruler,
  Hash,
  DollarSign,
  Palette,
  FileText,
  Package2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react";

// Définition des types
type Step = {
  title: string;
  emoji: string;
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
    reference: "#",
    image: "",
    prixUnitaire: "",
    quantite: "",
    description: "",
    emplacement: ""
  });
  const [showRecap, setShowRecap] = useState(false);  // Définition des étapes
  const navigate = useNavigate();
  const steps: Step[] = [
    {
      emoji:"⚧️",
      title: "Genre",
      choices: [
        { id: "homme", name: "Hommes", imageUrl: "/images/homme.jpg" },
        { id: "femme", name: "Femmes", imageUrl: "/images/femme.jpg" },
        { id: "garcon", name: "Garçons", imageUrl: "/images/garcon.jpg" },
        { id: "fille", name: "Filles", imageUrl: "/images/fille.jpg" },
      ]
    },
    {
      emoji:"📙",
      title: "Classe",
      choices: [
        { id: "debardeur", name: "Débardeur", imageUrl: "/images/debardeur.jpg"  },
        { id: "body", name: "Body", imageUrl:"/images/body.jpg" },
        { id: "tshirt", name: "T-Shirt", imageUrl: "/images/tshirt.jpg"  },
        { id: "manchelongue", name: "Manche longue", imageUrl: "/images/manches-longues.jpg"  },
        { id: "polo", name: "Polo", imageUrl: "/images/polo.jpg"  },
        { id: "chemise", name: "Chemise", imageUrl: "/images/chemise.jpg"  },
        { id: "bouson", name: "Bouson", imageUrl: "/images/blouson.jpg"  },
        { id: "short", name: "Short", imageUrl: "/images/short.jpg" }
      ]
    },
    {
      emoji:"🧵",
      title: "Matiere",
      choices: [
        { id: "cotton", name: "Cotton", imageUrl: "/images/matieres/coton.jpg" },
        { id: "lin", name: "Lin", imageUrl: "/images/matieres/lin.jpg" },
        { id: "jeans", name: "Jeans", imageUrl: "/images/matieres/jeans.jpg" },
        { id: "nilon", name: "Nilon", imageUrl: "/images/matieres/nilon.jpg" },
        { id: "filet", name: "Filet", imageUrl: "/images/matieres/filet.jpg" },
        { id: "fibrane", name: "Fibrane", imageUrl: "/images/matieres/fibrane.jpg" },
        { id: "3d", name: "3D", imageUrl: "/images/matieres/3d.jpg" }
      ]
    },
    {
      emoji: "❤️",
      title: "Motif",
      choices: [
        { 
          id: "uni", 
          name: "Uni", 
          imageUrl: "/images/motif/uni.jpg" 
        },
        { 
          id: "fleuri", 
          name: "Fleuri", 
          imageUrl: "/images/motif/fleuri.jpg"
        },
        { 
          id: "devale", 
          name: "Dévalé", 
          imageUrl: "/images/motif/devale.jpg"
        },
        { 
          id: "arcenciel", 
          name: "Arc-en-ciel", 
          imageUrl: "/images/motif/arcenciel.jpg"
        },
        { 
          id: "raye", 
          name: "Rayé", 
          imageUrl: "/images/motif/raye.jpg"
        },
        { 
          id: "marque", 
          name: "Marque", 
          imageUrl: "/images/motif/marque.jpg"
        }
      ]
    },
    {
      emoji: "🖌️", 
      title: "Dessin",
      choices: [
        { id: "personne", name: "Personne", imageUrl: "/images/dessin/personne.jpg" },
        { id: "animal", name: "Animal", imageUrl: "/images/dessin/animal.jpg"},
        { id: "paysage", name: "Paysage", imageUrl: "/images/dessin/paysage.jpg" },
        { id: "fleur", name: "Fleur", imageUrl: "/images/dessin/fleur.jpg" },
        { id: "abstrait", name: "Abstrait", imageUrl: "/images/dessin/abstrait.jpg" },
        { id: "chiffre", name: "Chiffre", imageUrl: "/images/dessin/chiffre.jpg" },
        { id: "vehicule", name: "Véhicule", imageUrl: "/images/dessin/vehicule.jpg" },
        { id: "marque", name: "Marque", imageUrl: "/images/dessin/marque.jpg" },
        { id: "rien", name: "Rien", imageUrl: "/images/dessin/rien.jpg" }
      ]
    },
    {
      emoji: "📝",
      title: "Détail et siganture",
      choices: [] // Cette étape sera gérée différemment avec un input et une palette de couleurs
    }
  ];

const [predefinedSizes, setPredefinedSizes] = useState([
  { value: "S", checked: true },
  { value: "M", checked: true },
  { value: "L", checked: true },
  { value: "XL", checked: true },
  { value: "XXL", checked: true },
]);
const [newSizeTemp, setNewSizeTemp] = useState('');

// Add these state declarations at the top of your component
const [predefinedPrices, setPredefinedPrices] = useState([
  { value: 1000, checked: true },
  { value: 2000, checked: true },
  { value: 3000, checked: true },
  { value: 5000, checked: true },
  { value: 10000, checked: true },
]);
const [newPriceTemp, setNewPriceTemp] = useState('');

const handlePriceToggle = (priceValue: number) => {
  setPredefinedPrices(prices => prices.map(price => 
    price.value === priceValue ? { ...price, checked: !price.checked } : price
  ));
};

const [predefinedQuantities, setPredefinedQuantities] = useState([
  { value: 1, checked: true },
  { value: 2, checked: true },
  { value: 3, checked: true },
  { value: 5, checked: true },
  { value: 10, checked: true },
]);
const [newQuantityTemp, setNewQuantityTemp] = useState('');

const handleQuantityToggle = (quantityValue: number) => {
  setPredefinedQuantities(quantities => quantities.map(qty => 
    qty.value === quantityValue ? { ...qty, checked: !qty.checked } : qty
  ));
};


// Add these state declarations
const [predefinedColors, setPredefinedColors] = useState([
  { value: "#000000", checked: true }, // Noir
  { value: "#FFFFFF", checked: true }, // Blanc
  { value: "#FF0000", checked: true }, // Rouge
  { value: "#0000FF", checked: true }, // Bleu
  { value: "#008000", checked: true }, // Vert
  { value: "#FFFF00", checked: true }, // Jaune
  { value: "#FFA500", checked: true }, // Orange
  { value: "#800080", checked: true }, // Violet
]);
const [newColorTemp, setNewColorTemp] = useState('#000000');

const handleColorToggle = (colorValue: string) => {
  setPredefinedColors(colors => colors.map(color => 
    color.value === colorValue ? { ...color, checked: !color.checked } : color
  ));
};



const handleSizeToggle = (sizeValue: string) => {
  setPredefinedSizes(sizes => sizes.map(size => 
    size.value === sizeValue ? { ...size, checked: !size.checked } : size
  ));
};  



return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 flex flex-col">
     <div className="absolute inset-0 bg-[url('https://st4.depositphotos.com/1076214/20486/i/1600/depositphotos_204867158-stock-photo-interior-fashion-clothing-store-women.jpg')] bg-cover bg-center bg-no-repeat opacity-50 -z-[1]" />
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-pink-300/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
  <PlusCircle className="h-8 w-8 text-pink-500 animate-bounce" />
  <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
    Ajouter un Article
  </h1>
</div>

        <div className="flex gap-4">


<Button 
  asChild 
  variant="ghost" 
  className="relative overflow-hidden transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-700/30 hover:to-purple-900/30 dark:hover:from-pink-950 dark:hover:to-purple-950 rounded-xl border border-pink-300/50 dark:border-purple-800/50 shadow-lg group"
>
  <Link to="/enregistrement" className="flex items-center px-4 py-2 font-medium">
    <ArrowLeft className="mr-2 h-5 w-5 text-pink-700 dark:text-pink-500 transition-transform group-hover:-translate-x-1" />
    <span className="bg-gradient-to-r from-pink-700 to-purple-900 dark:from-pink-500 dark:to-purple-600 bg-clip-text text-transparent font-semibold">
      Retour
    </span>
  </Link>
</Button>


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
      {/* Header with stepper */}
      <div className="mb-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-pink-200/50 dark:border-purple-700/50">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
          {steps[currentStep].emoji}{steps[currentStep].title}
          </h1>
        

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
                  <label className="text-sm font-medium flex items-center gap-2">
  <Ruler className="h-4 w-4 text-pink-500" />
  <span>Taille</span>
</label>

                  <Accordion type="single" collapsible className="mb-6">
                    <AccordionItem value="sizes">
                      <AccordionTrigger className="text-primary">
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          Tailles prédéfinies
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-2 gap-4 p-4">
                          {predefinedSizes.map((sizeItem) => (
                            <div key={sizeItem.value} className="flex items-center space-x-2">
                              <Checkbox 
                                checked={sizeItem.checked}
                                onCheckedChange={() => handleSizeToggle(sizeItem.value)}
                              />
                              <label>{sizeItem.value}</label>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex gap-2 p-4 border-t">
                          <Input
                            type="text"
                            placeholder="Nouvelle taille"
                            className="w-full"
                            onChange={(e) => setNewSizeTemp(e.target.value)}
                            value={newSizeTemp}
                          />
                          <Button 
                            variant="outline" 
                            className="shrink-0"
                            onClick={() => {
                              if (newSizeTemp.trim()) {
                                setPredefinedSizes([...predefinedSizes, { value: newSizeTemp, checked: true }])
                                setNewSizeTemp('')
                              }
                            }}
                          >
                            <Plus className="h-4 w-4" />
                            Ajouter
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {predefinedSizes
                      .filter(size => size.checked)
                      .map((size) => (
                        <Button
                          key={size.value}
                          variant="outline"
                          onClick={() => setSelections({...selections, pointure: size.value})}
                          className="h-16"
                        >
                          {size.value}
                        </Button>
                      ))}
                  </div>

                  <Input 
                    type="text" 
                    placeholder="Entrez la taille"
                    value={selections.pointure}
                    onChange={(e) => setSelections({...selections, pointure: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium flex items-center gap-2">
  <Hash className="h-4 w-4 text-pink-500" />
  <span>Numéro de référence *</span>
</label>

                  <div className="relative">
                    <Input 
                      type="text" 
                      placeholder="#000000"
                      maxLength={7}
                      required
                      value={selections.reference}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (!value.startsWith('#')) {
                          value = '#' + value;
                        }
                        value = '#' + value.slice(1).replace(/[^\d]/g, '');
                        if (value.length <= 7) {
                          setSelections({...selections, reference: value});
                        }
                      }}
                      className="pl-7"
                    />
                    <div className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500">
                      {!selections.reference.startsWith('#') && '#'}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Le numéro de référence doit commencer par # suivi de 6 chiffres (ex: #123456)
                  </p>
                  <p className="text-sm text-red-500 mt-1">* Champ obligatoire</p>
                </div>
                <div>
                <label className="text-sm font-medium flex items-center gap-2">
  <DollarSign className="h-4 w-4 text-pink-500" />
  <span>Prix unitaire (Ar)</span>
</label>

  <Accordion type="single" collapsible className="mb-6">
    <AccordionItem value="prices">
      <AccordionTrigger className="text-primary">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Prix prédéfinis
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-2 gap-4 p-4">
          {predefinedPrices.map((priceItem) => (
            <div key={priceItem.value} className="flex items-center space-x-2">
              <Checkbox 
                checked={priceItem.checked}
                onCheckedChange={() => handlePriceToggle(priceItem.value)}
              />
              <label>{priceItem.value.toLocaleString()} Ar</label>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 p-4 border-t">
          <Input
            type="number"
            placeholder="Nouveau prix"
            className="w-full"
            onChange={(e) => setNewPriceTemp(e.target.value)}
            value={newPriceTemp}
          />
          <Button 
            variant="outline" 
            className="shrink-0"
            onClick={() => {
              const newPrice = Number(newPriceTemp);
              if (newPrice > 0) {
                setPredefinedPrices([...predefinedPrices, { value: newPrice, checked: true }]);
                setNewPriceTemp('');
              }
            }}
          >
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>

  <div className="grid grid-cols-3 gap-4 mb-4">
    {predefinedPrices
      .filter(price => price.checked)
      .map((price) => (
        <Button
          key={price.value}
          variant="outline"
          onClick={() => setSelections({...selections, prixUnitaire: price.value.toString()})}
          className="h-16"
        >
          {price.value.toLocaleString()} Ar
        </Button>
      ))}
  </div>

  <Input 
    type="number"
    placeholder="Entrez le prix unitaire"
    value={selections.prixUnitaire}
    onChange={(e) => setSelections({...selections, prixUnitaire: e.target.value})}
  />
</div>
<div>
<label className="text-sm font-medium flex items-center gap-2">
  <Package2 className="h-4 w-4 text-pink-500" />
  <span>Quantité</span>
</label>

  <Accordion type="single" collapsible className="mb-6">
    <AccordionItem value="quantities">
      <AccordionTrigger className="text-primary">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Quantités prédéfinies
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-2 gap-4 p-4">
          {predefinedQuantities.map((quantityItem) => (
            <div key={quantityItem.value} className="flex items-center space-x-2">
              <Checkbox 
                checked={quantityItem.checked}
                onCheckedChange={() => handleQuantityToggle(quantityItem.value)}
              />
              <label>{quantityItem.value}</label>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 p-4 border-t">
          <Input
            type="number"
            placeholder="Nouvelle quantité"
            className="w-full"
            onChange={(e) => setNewQuantityTemp(e.target.value)}
            value={newQuantityTemp}
          />
          <Button 
            variant="outline" 
            className="shrink-0"
            onClick={() => {
              const newQuantity = Number(newQuantityTemp);
              if (newQuantity > 0) {
                setPredefinedQuantities([...predefinedQuantities, { value: newQuantity, checked: true }]);
                setNewQuantityTemp('');
              }
            }}
          >
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>

  <div className="grid grid-cols-3 gap-4 mb-4">
    {predefinedQuantities
      .filter(qty => qty.checked)
      .map((qty) => (
        <Button
          key={qty.value}
          variant="outline"
          onClick={() => setSelections({...selections, quantite: qty.value.toString()})}
          className="h-16"
        >
          {qty.value}
        </Button>
      ))}
  </div>

  <Input 
    type="number"
    placeholder="Entrez la quantité"
    value={selections.quantite}
    onChange={(e) => setSelections({...selections, quantite: e.target.value})}
    min="1"
  />
</div>
                <div>
                <label className="text-sm font-medium flex items-center gap-2">
  <FileText className="h-4 w-4 text-pink-500" />
  <span>Description</span>
</label>

                  <textarea
                    className="w-full p-2 border rounded-md"
                    rows={4}
                    placeholder="Entrez une description de l'article"
                    value={selections.description}
                    onChange={(e) => setSelections({...selections, description: e.target.value})}
                  />
                </div>
                <div>
                <label className="text-sm font-medium flex items-center gap-2">
  <Palette className="h-4 w-4 text-pink-500" />
  <span>Couleur</span>
</label>

  <Accordion type="single" collapsible className="mb-6">
    <AccordionItem value="colors">
      <AccordionTrigger className="text-primary">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Couleurs prédéfinies
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-2 gap-4 p-4">
          {predefinedColors.map((colorItem) => (
            <div key={colorItem.value} className="flex items-center space-x-2">
              <Checkbox 
                checked={colorItem.checked}
                onCheckedChange={() => handleColorToggle(colorItem.value)}
              />
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: colorItem.value }}
                />
                <label>{colorItem.value}</label>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 p-4 border-t">
          <input
            type="color"
            className="w-full h-10 rounded-md cursor-pointer"
            value={newColorTemp}
            onChange={(e) => setNewColorTemp(e.target.value)}
          />
          <Button 
            variant="outline" 
            className="shrink-0"
            onClick={() => {
              if (newColorTemp) {
                setPredefinedColors([...predefinedColors, { value: newColorTemp, checked: true }]);
                setNewColorTemp('#000000');
              }
            }}
          >
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>

  <div className="grid grid-cols-4 gap-4 mb-4">
    {predefinedColors
      .filter(color => color.checked)
      .map((color) => (
        <Button
          key={color.value}
          variant="outline"
          onClick={() => setSelections({...selections, couleur: color.value})}
          className="h-16 flex items-center justify-center gap-2"
        >
          <div 
            className="w-6 h-6 rounded-full border"
            style={{ backgroundColor: color.value }}
          />
          {color.value}
        </Button>
      ))}
  </div>

  <input
    type="color"
    className="w-full h-10 rounded-md cursor-pointer"
    value={selections.couleur}
    onChange={(e) => setSelections({...selections, couleur: e.target.value})}
  />
</div>

<div>
  <label className="text-sm font-medium flex items-center gap-2">
    <Package className="h-4 w-4 text-pink-500" />
    <span>Emplacement dans l'entrepôt</span>
  </label>

  <div className="mt-4 bg-white/90 rounded-xl p-4 border border-pink-200/50">
    <h4 className="text-lg font-medium text-pink-600 mb-4">Plan de l'entrepôt</h4>
    
    <div className="grid grid-cols-3 gap-4 mb-6">
      {/* Rangée A - Première rangée */}
      <div className="space-y-2">
        <div className="bg-blue-100 p-2 text-center rounded-t-lg font-medium text-blue-700">
          Rangée A
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((shelf) => (
            <Button
              key={`A-${shelf}-1`}
              variant={selections.emplacement === `A-${shelf}-1` ? "default" : "outline"}
              className={`h-16 ${selections.emplacement === `A-${shelf}-1` ? "bg-pink-500" : "hover:bg-blue-100"}`}
              onClick={() => setSelections({...selections, emplacement: `A-${shelf}-1`})}
            >
              A-{shelf}-1
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((shelf) => (
            <Button
              key={`A-${shelf}-2`}
              variant={selections.emplacement === `A-${shelf}-2` ? "default" : "outline"}
              className={`h-16 ${selections.emplacement === `A-${shelf}-2` ? "bg-pink-500" : "hover:bg-blue-100"}`}
              onClick={() => setSelections({...selections, emplacement: `A-${shelf}-2`})}
            >
              A-{shelf}-2
            </Button>
          ))}
        </div>
      </div>

      {/* Rangée B - Deuxième rangée */}
      <div className="space-y-2">
        <div className="bg-green-100 p-2 text-center rounded-t-lg font-medium text-green-700">
          Rangée B
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((shelf) => (
            <Button
              key={`B-${shelf}-1`}
              variant={selections.emplacement === `B-${shelf}-1` ? "default" : "outline"}
              className={`h-16 ${selections.emplacement === `B-${shelf}-1` ? "bg-pink-500" : "hover:bg-green-100"}`}
              onClick={() => setSelections({...selections, emplacement: `B-${shelf}-1`})}
            >
              B-{shelf}-1
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((shelf) => (
            <Button
              key={`B-${shelf}-2`}
              variant={selections.emplacement === `B-${shelf}-2` ? "default" : "outline"}
              className={`h-16 ${selections.emplacement === `B-${shelf}-2` ? "bg-pink-500" : "hover:bg-green-100"}`}
              onClick={() => setSelections({...selections, emplacement: `B-${shelf}-2`})}
            >
              B-{shelf}-2
            </Button>
          ))}
        </div>
      </div>

      {/* Rangée C - Troisième rangée */}
      <div className="space-y-2">
        <div className="bg-purple-100 p-2 text-center rounded-t-lg font-medium text-purple-700">
          Rangée C
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((shelf) => (
            <Button
              key={`C-${shelf}-1`}
              variant={selections.emplacement === `C-${shelf}-1` ? "default" : "outline"}
              className={`h-16 ${selections.emplacement === `C-${shelf}-1` ? "bg-pink-500" : "hover:bg-purple-100"}`}
              onClick={() => setSelections({...selections, emplacement: `C-${shelf}-1`})}
            >
              C-{shelf}-1
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((shelf) => (
            <Button
              key={`C-${shelf}-2`}
              variant={selections.emplacement === `C-${shelf}-2` ? "default" : "outline"}
              className={`h-16 ${selections.emplacement === `C-${shelf}-2` ? "bg-pink-500" : "hover:bg-purple-100"}`}
              onClick={() => setSelections({...selections, emplacement: `C-${shelf}-2`})}
            >
              C-{shelf}-2
            </Button>
          ))}
        </div>
      </div>
    </div>

    <div className="mt-4 bg-gray-50 p-3 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <LayoutGrid className="h-4 w-4 text-pink-500" />
        <span className="text-sm font-medium">Légende:</span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-100 rounded-sm"></div>
          <span>Rangée A: Vêtements légers</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-100 rounded-sm"></div>
          <span>Rangée B: Vêtements moyens</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-purple-100 rounded-sm"></div>
          <span>Rangée C: Vêtements lourds</span>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        <p>Format: [Rangée]-[Étagère]-[Niveau]</p>
        <p>Exemple: A-1-2 = Rangée A, Étagère 1, Niveau 2</p>
      </div>
    </div>

    {selections.emplacement && (
      <div className="mt-4 p-3 bg-pink-50 rounded-lg border border-pink-200 animate-pulse">
        <p className="font-medium text-pink-700">Emplacement sélectionné: {selections.emplacement}</p>
        <p className="text-sm text-pink-600">
          {selections.emplacement.startsWith('A') && 'Zone vêtements légers'}
          {selections.emplacement.startsWith('B') && 'Zone vêtements moyens'}
          {selections.emplacement.startsWith('C') && 'Zone vêtements lourds'}
        </p>
      </div>
    )}
  </div>
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
              disabled={!selections.reference || selections.reference === '#'}
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
              <div className="w-2/3 pl-8 backdrop-blur-sm">
  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text flex items-center gap-2">
    <FileText className="h-6 w-6 text-pink-500" />
    Récapitulatif de l'Article
  </h3>

  <div className="space-y-4 divide-y divide-pink-100/30">
    {Object.entries(selections).map(([key, value]) => {
      if (key === 'image') return null;
      const step = steps.find(s => s.title.toLowerCase() === key);
      const choice = step?.choices?.find(c => c.id === value);

      return (
        <div 
          key={key} 
          className="flex items-center justify-between py-3 px-4 hover:bg-pink-50/30 rounded-lg transition-all duration-300"
        >
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center">
              <span className="text-sm font-semibold text-pink-600 group-hover:scale-110 transition-transform">
                {key.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {key === 'couleur' ? (
              <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full shadow-sm">
                <div 
                  className="w-6 h-6 rounded-full border-2 border-white shadow-md transition-transform hover:scale-110"
                  style={{backgroundColor: value}}
                />
                <span className="font-mono text-gray-700">{value}</span>
              </div>
            ) : (
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent font-medium px-3 py-1.5 bg-white/50 rounded-full shadow-sm">
                {choice?.name || value}
              </span>
            )}
          </div>
        </div>
      );
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

