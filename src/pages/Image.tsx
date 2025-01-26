import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const images = [
  {
    id: 1,
    title: "Pull en Cachemire",
    description: "Pull luxueux 100% cachemire, coupe moderne",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=60",
    category: "Pulls"
  },
  {
    id: 2,
    title: "Veste en Cuir",
    description: "Veste en cuir véritable, style motard",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60",
    category: "Vestes"
  },
  {
    id: 3,
    title: "Robe de Soirée",
    description: "Robe élégante pour occasions spéciales",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=60",
    category: "Robes"
  },
  {
    id: 4,
    title: "Jean Slim",
    description: "Jean coupe slim, denim premium",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60",
    category: "Jeans"
  },
  {
    id: 5,
    title: "Chemise en Lin",
    description: "Chemise d'été légère et respirante",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60",
    category: "Chemises"
  },
  {
    id: 6,
    title: "Manteau d'Hiver",
    description: "Manteau chaud et élégant pour l'hiver",
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&auto=format&fit=crop&q=60",
    category: "Manteaux"
  },
  {
    id: 7,
    title: "T-shirt Graphique",
    description: "T-shirt en coton avec design original",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=60",
    category: "T-shirts"
  },
  {
    id: 8,
    title: "Blazer",
    description: "Blazer classique pour look professionnel",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=60",
    category: "Vestes"
  },
  {
    id: 9,
    title: "Short en Jean",
    description: "Short en jean décontracté pour l'été",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&auto=format&fit=crop&q=60",
    category: "Shorts"
  },
  {
    id: 10,
    title: "Robe d'Été",
    description: "Robe légère et florale pour les beaux jours",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=60",
    category: "Robes"
  },
];

const categories = ["Tous", "Pulls", "Vestes", "Robes", "Jeans", "Chemises", "Manteaux", "T-shirts", "Shorts"];

const ITEMS_PER_PAGE = 6;

export default function Image() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredImages = images.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);
  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Collection de Vêtements
          </h1>
          <Button asChild variant="ghost">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Accueil
            </Link>
          </Button>
        </div>
        
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border-2 border-pink-200/50 dark:border-purple-700/50 p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              placeholder="Rechercher un vêtement..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/90 dark:bg-slate-800/90"
            />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full bg-white/90 dark:bg-slate-800/90">
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedImages.map((item) => (
            <Card key={item.id} className="group relative overflow-hidden rounded-2xl border-2 border-pink-200/50 dark:border-purple-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <p className="text-muted-foreground">{item.description}</p>
                <p className="text-sm text-muted-foreground mt-2">{item.category}</p>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
              className="min-w-[40px]"
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}