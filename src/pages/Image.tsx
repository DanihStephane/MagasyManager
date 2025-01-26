import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const images = [
  {
    id: 1,
    title: "Pull en Cachemire",
    description: "Pull luxueux 100% cachemire, coupe moderne",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "Veste en Cuir",
    description: "Veste en cuir véritable, style motard",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    title: "Robe de Soirée",
    description: "Robe élégante pour occasions spéciales",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 4,
    title: "Jean Slim",
    description: "Jean coupe slim, denim premium",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    title: "Chemise en Lin",
    description: "Chemise d'été légère et respirante",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 6,
    title: "Manteau d'Hiver",
    description: "Manteau chaud et élégant pour l'hiver",
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 7,
    title: "T-shirt Graphique",
    description: "T-shirt en coton avec design original",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 8,
    title: "Blazer",
    description: "Blazer classique pour look professionnel",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 9,
    title: "Short en Jean",
    description: "Short en jean décontracté pour l'été",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: 10,
    title: "Robe d'Été",
    description: "Robe légère et florale pour les beaux jours",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=60",
  },
];

export default function Image() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((item) => (
            <Card key={item.id} className="overflow-hidden bg-background/60 backdrop-blur-xl">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <p className="text-muted-foreground">{item.description}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}