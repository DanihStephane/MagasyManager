import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Home, Trash2, Plus, Calculator, ArrowRight, ShoppingCart, ArrowLeft, Printer, Filter,Shirt,DollarSign, Package} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";


import { DepassementContent } from "@/components/DepassementContent";

interface Product {
  category: string;
  quantity: number;
}

interface CategoryItem {
  name: string;
  image: string;
  checked: boolean;
  price: number; // Nouveau champ
}

interface QuantityItem {
  value: number;
  checked: boolean;
}

export default function CommandeStock() {
  // States initialization
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cart, setCart] = useState<Product[]>([]);
  const [newQuantityTemp, setNewQuantityTemp] = useState('');

  const [businessPrice, setBusinessPrice] = useState(1000000); // Prix d'affaire initial
    const [totalPrice, setTotalPrice] = useState(0); // Prix total des articles

    const [showDepassementDialog, setShowDepassementDialog] = useState(false);

    // Add new state at the top with other states
const [isDepassementMode, setIsDepassementMode] = useState(false);


  const calculateTotalQuantity = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Predefined quantities with checkboxes
  const [predefinedQuantities, setPredefinedQuantities] = useState<QuantityItem[]>([
    { value: 1, checked: true },
    { value: 2, checked: true },
    { value: 3, checked: true },
    { value: 5, checked: true },
    { value: 10, checked: true },
  ]);

  // Categories with checkboxes
  const [categories, setCategories] = useState<CategoryItem[]>([
    { name: "Débardeur", image: "/images/debardeur.jpg", checked: true, price: 15000 },
    { name: "Body", image: "/images/body.jpg", checked: true, price: 20000 },
    { name: "T-shirt", image: "/images/tshirt.jpg", checked: true, price: 25000 },
    { name: "Manche longue", image: "/images/manches-longues.jpg", checked: true, price: 30000 },
    { name: "Polo", image: "/images/polo.jpg", checked: true, price: 35000 },
    { name: "Chemise", image: "/images/chemise.jpg", checked: true, price: 40000 },
    { name: "Bouson", image: "/images/blouson.jpg", checked: true, price: 50000 },
    { name: "Short", image: "/images/short.jpg", checked: true, price: 30000 },
    { name: "Robe", image: "/images/robe.jpg", checked: true, price: 45000 },
  ]);

  // Handlers  
  const handleQuantityToggle = (quantityValue: number) => {
    setPredefinedQuantities(quantities => quantities.map(qty => 
      qty.value === quantityValue ? { ...qty, checked: !qty.checked } : qty
    ));
  };
  const handleCategoryToggle = (categoryName: string) => {
    setCategories(categories.map(cat => 
      cat.name === categoryName ? { ...cat, checked: !cat.checked } : cat
    ));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((sum, item) => {
      const categoryItem = categories.find(cat => cat.name === item.category);
      if (categoryItem) {
        return sum + (categoryItem.price * item.quantity);
      }
      return sum;
    }, 0);
  };

  // Modify handleAddToCart to bypass price check in depassement mode
const handleAddToCart = () => {
    const categoryItem = categories.find(cat => cat.name === selectedCategory);
    if (!categoryItem) return;
  
    const newItemTotal = categoryItem.price * Number(quantity);
    const newTotalPrice = calculateTotalPrice() + newItemTotal;
    
    if(!isDepassementMode) {
            if (newTotalPrice > businessPrice) {
                setErrorMessage("Vous avez atteint la limite maximum de prix du magasin");
                return;
            }
        }
  
    const newItem = {
        category: selectedCategory,
        quantity: Number(quantity)
    };
    
    setCart([...cart, newItem]);
    setStep(1);
    setQuantity("");
};
  

  const handleRemoveFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const StepIndicator = ({ currentStep }: { currentStep: number }) => {
    return (
        

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
                ${stepNumber <= currentStep 
                  ? 'border-primary bg-primary text-white' 
                  : 'border-muted text-muted-foreground'
                }`}
            >
              {stepNumber}
            </div>
          ))}
        </div>
        <div className="relative w-full h-2 bg-muted rounded-full">
          <div 
            className="absolute h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>Sélection</span>
          <span>Quantité</span>
          <span>Récapitulatif</span>
        </div>
      </div>

      
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 flex flex-col">
     <div className="absolute inset-0 bg-[url('https://st4.depositphotos.com/1076214/20486/i/1600/depositphotos_204867158-stock-photo-interior-fashion-clothing-store-women.jpg')] bg-cover bg-center bg-no-repeat opacity-50 -z-[1]" />
    
        {/* Header moderne */}
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-pink-300/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text flex items-center gap-3">
  <Package className="h-6 w-6 text-pink-500 animate-bounce" />
  Gestion des Stocks
</h1>


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
    </header>
    <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
        <StepIndicator currentStep={step} />
        {errorMessage && (
            <div className={`mb-4 p-4 border rounded-md flex justify-between items-center
                ${isDepassementMode 
                    ? 'bg-green-100 border-green-400 text-green-700' 
                    : 'bg-red-100 border-red-400 text-red-700'
                }`}>
                <p className="font-medium">{errorMessage}</p>
                {!isDepassementMode && (
                    <Button 
                        variant="outline"
                        className="flex items-center gap-2 bg-white/50 hover:bg-white/80 transition-colors duration-300 shadow-sm"
                        onClick={() => setShowDepassementDialog(true)}
                    >
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        Permettre le dépassement
                    </Button>
                )}
            </div>
        )}


<Dialog open={showDepassementDialog} onOpenChange={setShowDepassementDialog}>
    <DialogContent className="max-w-2xl">
        <DialogHeader>
            <DialogTitle>Permettre le dépassement</DialogTitle>
        </DialogHeader>
        <DepassementContent onSuccess={() => {
            setShowDepassementDialog(false);
            setErrorMessage(null);
            setIsDepassementMode(true);
            // Show success message in green
            setErrorMessage("Vous êtes en mode de dépassement sans limite de produit");
        }} />
    </DialogContent>
</Dialog>

        <Card className="mb-8">
            <CardHeader>
            <CardTitle>
  <div className="flex items-center gap-2">
    <DollarSign className="h-5 w-5 text-primary" />
    <span className="bg-gradient-to-r from-primary/80 to-secondary/80 bg-clip-text text-transparent">
      Prix d'affaire du magasin
    </span>
  </div>
</CardTitle>

            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                <div className="flex gap-4 items-center">
                    <Input
                    type="number"
                    value={businessPrice}
                    onChange={(e) => setBusinessPrice(Number(e.target.value))}
                    placeholder="Prix d'affaire"
                    />
                    <span className="text-sm text-muted-foreground">
                    {businessPrice.toLocaleString()} Ar
                    </span>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span>Progression: {((calculateTotalPrice() / businessPrice) * 100).toFixed(1)}%</span>
                        <span>{calculateTotalPrice().toLocaleString()} / {businessPrice.toLocaleString()} Ar</span>
                    </div>
                    <div className="relative w-full h-2 bg-muted rounded-full">
    <div 
        className={`absolute h-full rounded-full transition-all duration-300 
            ${isDepassementMode 
                ? 'bg-gradient-to-l from-red-500 via-red-400 to-red-300' 
                : 'bg-gradient-to-l from-primary via-primary/80 to-primary/60'
            }`}
        style={{ 
            width: `${Math.min((calculateTotalPrice() / businessPrice) * 100, 100)}%` 
        }}
    />
</div>



                </div>
                </div>
            </CardContent>
            </Card>
      {step === 1 && (
        <>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">
              Étape 1/3 - Sélection des articles
            </span>
            <Button 
  variant="outline"
  onClick={() => setStep(3)}
  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
>
  <Calculator className="h-4 w-4 animate-pulse" />
  <span className="font-semibold">Voir le Total</span>
  <span className="px-2 py-0.5 bg-white/20 rounded-full text-sm">
    {calculateTotalQuantity()} articles
  </span>
</Button>

          </div>
          <Accordion type="single" collapsible className="mb-6">
            <AccordionItem value="categories">
              <Card>
                <CardHeader>
                <AccordionTrigger>
                    <CardTitle className="flex items-center gap-2 text-xl bg-gradient-to-r from-primary/80 to-secondary/80 bg-clip-text text-transparent">
                      <Filter className="h-5 w-5 text-primary" />
                      Sélectionner vos articles
                    </CardTitle>
                  </AccordionTrigger>
                </CardHeader>
              
                <AccordionContent>
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-4">
                      {categories.map((category) => (
                        <div 
                        key={category.name} 
                        className="flex items-center p-3 rounded-lg hover:bg-primary/5 transition-all duration-300 group cursor-pointer"
                        onClick={() => handleCategoryToggle(category.name)}
                      >
                        <Checkbox
                          checked={category.checked}
                          onCheckedChange={() => handleCategoryToggle(category.name)}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <label className="ml-3 font-medium text-gray-700 group-hover:text-primary transition-colors cursor-pointer flex items-center gap-2">
                          <Shirt className="h-4 w-4 text-primary/60" />
                          {category.name}
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                            {categories.find(cat => cat.name === category.name)?.price.toLocaleString()} Ar
                          </span>
                        </label>
                      </div>
                      
                      ))}
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          </Accordion>
          <div className="grid grid-cols-3 gap-4">
            {categories
              .filter(cat => cat.checked)
              .map((category) => (
                <Card key={category.name} className="cursor-pointer hover:shadow-lg transition"
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setStep(2);
                  }}>
                  <CardContent className="p-4">
                    <img src={category.image} alt={category.name} className="w-full h-48 object-cover rounded" />
                    <h3 className="text-center mt-2">{category.name}</h3>
                    <p className="text-center text-sm text-muted-foreground">
                      {category.price.toLocaleString()} Ar
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="mb-4 text-sm text-muted-foreground">
            Étape 2/3 - Quantité
          </div>
          <Card>
            <CardHeader>
            <CardTitle>
  <div className="flex items-center gap-2">
    <Shirt className="h-5 w-5 text-primary" />
    <span className="bg-gradient-to-r from-primary/80 to-secondary/80 bg-clip-text text-transparent">
      {selectedCategory}
    </span>
  </div>
</CardTitle>


            </CardHeader>
            <CardContent>
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
                            setNewQuantityTemp(''); // Reset le champ
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
                        onClick={() => {
                            const categoryItem = categories.find(cat => cat.name === selectedCategory);
                            if (!categoryItem) return;

                            const newItemTotal = categoryItem.price * qty.value;
                            const newTotalPrice = calculateTotalPrice() + newItemTotal;
                            
                            if(!isDepassementMode) {
                                if (newTotalPrice > businessPrice) {
                                    setErrorMessage("Vous avez atteint la limite maximum de prix du magasin");
                                    return;
                                }
                            }

                            setErrorMessage(null);
                            setCart([...cart, {
                                category: selectedCategory,
                                quantity: qty.value
                            }]);
                            setStep(1);
                            setQuantity("");
                        }}
                        className="h-16"
                    >
                        {qty.value}
                    </Button>

                  ))}
              </div>
              <Input
                type="number"
                placeholder="Quantité"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <div className="flex gap-4 mt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Précédent
                </Button>
                <Button 
                  className="w-full" 
                  onClick={handleAddToCart}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter
                </Button>
              </div>
              <Button 
                className="w-full mt-4" 
                onClick={() => setStep(3)}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Total
              </Button>
            </CardContent>
          </Card>
        </>
      )}
      {step === 3 && (
        <>
          <div className="mb-4 text-sm text-muted-foreground">
            Étape 3/3 - Récapitulatif
          </div>
          <Card>
            <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>
  <div className="flex items-center gap-2">
    <ShoppingCart className="h-5 w-5 text-primary" />
    <span className="bg-gradient-to-r from-primary/80 to-secondary/80 bg-clip-text text-transparent">
      Récapitulatif
    </span>
  </div>
</CardTitle>

              <Button 
                variant="outline"
                onClick={() => window.print()}
                className="flex items-center gap-2"
              >
                <Printer className="h-4 w-4" />
                Imprimer
              </Button>
            </CardHeader>
            <CardContent>
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 border-b">
                  <div className="flex items-center gap-4">
                    <img 
                      src={categories.find(cat => cat.name === item.category)?.image} 
                      alt={item.category} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.quantity} x {item.price} Ar
                      </span>
                    </div>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => handleRemoveFromCart(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-xl font-bold">
                Total articles: {calculateTotalQuantity()}
              </div>
              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Ajouter d'autre produit
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Valider l'achat
                </Button>
              </div>
            </CardFooter>
          </Card>
        </>
      )}
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





