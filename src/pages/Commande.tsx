import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Commande() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Type de Commande
          </h1>
          <Button asChild variant="ghost">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Accueil
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card Commande de Stock */}
          <Link to="/commande-stock">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-background/60 backdrop-blur-xl h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Commande de Stock</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video relative overflow-hidden rounded-lg">
                  <img
                    src="/images/stock-image.jpg"
                    alt="Stock Management"
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-muted-foreground text-center">
                  Gérez vos commandes de stock régulières pour maintenir 
                  un inventaire optimal de vos produits essentiels.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Card Commande de Surplus */}
          <Link to="/commande-surplus">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-background/60 backdrop-blur-xl h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Commande de Surplus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video relative overflow-hidden rounded-lg">
                  <img
                    src="/images/surplus-image.jpg"
                    alt="Surplus Management"
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-muted-foreground text-center">
                  Gérez vos commandes exceptionnelles et surplus pour 
                  répondre aux pics d'activité ou besoins spécifiques.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}