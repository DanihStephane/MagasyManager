import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Home, Trash2, Plus, Calculator, ArrowRight, ShoppingCart, ArrowLeft, Printer, ShoppingBag, Shirt } from "lucide-react";import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Filter } from "lucide-react"; // Add this import} from "@/components/ui/accordion";
import { HomeButton } from "@/components/HomeButton";

interface Product {
  category: string;
  price: number;
  quantity: number;
}

interface CategoryItem {
  name: string;
  image: string;
  checked: boolean;
  price: number; // Nouveau champ
}

interface PriceItem {
  value: number;
  checked: boolean;
}

interface QuantityItem {
  value: number;
  checked: boolean;
}

export default function Vente() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cart, setCart] = useState<Product[]>([]);


const [newPriceTemp, setNewPriceTemp] = useState('');
const [newQuantityTemp, setNewQuantityTemp] = useState('');


// Ajouter dans la fonction Vente()
const [predefinedPrices, setPredefinedPrices] = useState<PriceItem[]>([
  { value: 1000, checked: true },
  { value: 2000, checked: true },
  { value: 3000, checked: true },
  { value: 5000, checked: true },
  { value: 10000, checked: true },
]);

const [predefinedQuantities, setPredefinedQuantities] = useState<QuantityItem[]>([
  { value: 1, checked: true },
  { value: 2, checked: true },
  { value: 3, checked: true },
  { value: 5, checked: true },
  { value: 10, checked: true },
]);

const handlePriceToggle = (priceValue: number) => {
  setPredefinedPrices(prices => prices.map(price => 
    price.value === priceValue ? { ...price, checked: !price.checked } : price
  ));
};

const handleQuantityToggle = (quantityValue: number) => {
  setPredefinedQuantities(quantities => quantities.map(qty => 
    qty.value === quantityValue ? { ...qty, checked: !qty.checked } : qty
  ));
};

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

  const handleCategoryToggle = (categoryName: string) => {
    setCategories(categories.map(cat => 
      cat.name === categoryName ? { ...cat, checked: !cat.checked } : cat
    ));
  };

  const handleAddToCart = () => {
    setCart([...cart, {
      category: selectedCategory,
      price: Number(price),
      quantity: Number(quantity)
    }]);
    setStep(1);
    setPrice("");
    setQuantity("");
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateTotalQuantity = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const StepIndicator = ({ currentStep }: { currentStep: number }) => {
    return (
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((stepNumber) => (
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
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>Sélection</span>
          <span>Prix</span>
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
      <h1 className="flex items-center gap-3 text-2xl font-bold">
  <ShoppingBag className="h-8 w-8 animate-bounce text-pink-500" />
  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
    Gestion des Ventes
  </span>
</h1>

       <HomeButton/>
      </div>
    </header>
    <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
          <StepIndicator currentStep={step} />
        {step === 1 && (
          <>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">
                Étape 1/4 - Sélection des articles
              </span>
              <Button 
  variant="outline"
  onClick={() => setStep(4)}
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
              Étape 2/4 - Prix de l'article
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
                          // Utiliser un state temporaire pour stocker la nouvelle valeur
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
                              setNewPriceTemp(''); // Reset le champ
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
                        onClick={() => {
                          setPrice(price.value.toString())
                          setStep(3)
                        }}
                        className="h-16"
                      >
                        {price.value.toLocaleString()} Ar
                      </Button>
                    ))}
                </div>

                <Input
                  type="number"
                  placeholder="Prix en Ariary"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <div className="flex gap-4 mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Précédent
                  </Button>
                  <Button 
                    className="w-full" 
                    onClick={() => setStep(3)}
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Suivant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
        {step === 3 && (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              Étape 3/4 - Quantité
            </div>
            <Card>
              <CardHeader>
                <CardTitle>
  <div className="flex items-center gap-2">
    <Shirt className="h-5 w-5 text-primary" />
    <span className="bg-gradient-to-r from-primary/80 to-secondary/80 bg-clip-text text-transparent">
    {selectedCategory} - {price} Ar
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
                          setQuantity(qty.value.toString())
                          // Ajout au panier puis redirection vers le total
                          setCart([...cart, {
                            category: selectedCategory,
                            price: Number(price),
                            quantity: qty.value
                          }])
                          setStep(4); // Redirection vers le récapitulatif
                          setPrice("")
                          setQuantity("")
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
  variant="outline"
  onClick={() => setStep(4)}
  className="mt-5 w-full flex items-center gap-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
>
  <Calculator className="h-4 w-4 animate-pulse" />
  <span className="font-semibold">Voir le Total</span>
  <span className="px-2 py-0.5 bg-white/20 rounded-full text-sm">
    {calculateTotalQuantity()} articles
  </span>
</Button>

              </CardContent>
            </Card>
          </>
        )}
        {step === 4 && (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              Étape 4/4 - Récapitulatif
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
                  Total: {calculateTotal()} Ar
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

