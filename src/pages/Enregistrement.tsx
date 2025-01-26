import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Pencil, Trash2, Home, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const articles = [
  { id: 1, nom: "T-shirt Premium", prix: 29.99, stock: 45 },
  { id: 2, nom: "Jean Slim", prix: 59.99, stock: 30 },
  { id: 3, nom: "Veste en Cuir", prix: 199.99, stock: 15 },
  { id: 4, nom: "Robe d'été", prix: 49.99, stock: 25 },
  { id: 5, nom: "Sweat à Capuche", prix: 69.99, stock: 40 },
  { id: 6, nom: "Chemise en Lin", prix: 79.99, stock: 20 },
  { id: 7, nom: "Pull Cachemire", prix: 149.99, stock: 10 },
  { id: 8, nom: "Short en Jean", prix: 39.99, stock: 35 },
  { id: 9, nom: "Blazer Élégant", prix: 129.99, stock: 18 },
  { id: 10, nom: "Pantalon Chino", prix: 69.99, stock: 28 },
];

export default function Enregistrement() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Gestion des Articles
          </h1>
          <div className="flex gap-4">
            <Button asChild variant="ghost">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Accueil
              </Link>
            </Button>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter un Article
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {articles.map((article) => (
            <Card key={article.id} className="bg-background/60 backdrop-blur-xl">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-semibold text-lg">{article.nom}</h3>
                  <p className="text-muted-foreground">
                    Prix: {article.prix}€ | Stock: {article.stock} unités
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modern Pagination */}
        <div className="flex justify-center items-center gap-1 mt-8">
          <Button 
            variant="ghost" 
            size="sm" 
            className="hover:bg-primary/10 rounded-full w-9 h-9 p-0"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-9 h-9 p-0"
            >
              1
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-primary/10 rounded-full w-9 h-9 p-0"
            >
              2
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-primary/10 rounded-full w-9 h-9 p-0"
            >
              3
            </Button>
            <span className="flex items-center justify-center w-9 h-9">...</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:bg-primary/10 rounded-full w-9 h-9 p-0"
            >
              10
            </Button>
          </div>

          <Button 
            variant="ghost" 
            size="sm" 
            className="hover:bg-primary/10 rounded-full w-9 h-9 p-0"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}