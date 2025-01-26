import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Pencil, Trash2, Home, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const articles = [
  { 
    id: 1, 
    nom: "T-shirt Premium", 
    prix: 120000, 
    stock: 45,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"
  },
  { 
    id: 2, 
    nom: "Jean Slim", 
    prix: 240000, 
    stock: 30,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"
  },
  { 
    id: 3, 
    nom: "Veste en Cuir", 
    prix: 850000, 
    stock: 15,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
  },
  { 
    id: 4, 
    nom: "Robe d'été", 
    prix: 180000, 
    stock: 25,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500"
  },
  { 
    id: 5, 
    nom: "Sweat à Capuche", 
    prix: 150000, 
    stock: 40,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"
  },
  { 
    id: 6, 
    nom: "Chemise en Lin", 
    prix: 160000, 
    stock: 20,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500"
  },
  { 
    id: 7, 
    nom: "Pull Cachemire", 
    prix: 450000, 
    stock: 10,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500"
  },
  { 
    id: 8, 
    nom: "Short en Jean", 
    prix: 120000, 
    stock: 35,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500"
  },
  { 
    id: 9, 
    nom: "Blazer Élégant", 
    prix: 380000, 
    stock: 18,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500"
  },
  { 
    id: 10, 
    nom: "Pantalon Chino", 
    prix: 220000, 
    stock: 28,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500"
  },
];export default function Enregistrement() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredArticles = articles.filter(article =>
    article.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
      
        {/* Barre de recherche */}
        <div className="mb-6">
          <Input
            type="search"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="grid gap-4">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="bg-background/60 backdrop-blur-xl">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={article.image}
                    alt={article.nom}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{article.nom}</h3>
                    <p className="text-muted-foreground">
                      Prix: {article.prix.toLocaleString()} Ar | Stock: {article.stock} unités
                    </p>
                  </div>
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