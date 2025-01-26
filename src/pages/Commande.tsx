import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Commande() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Nouvelle Commande
          </h1>
          <Button asChild variant="ghost">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Accueil
            </Link>
          </Button>
        </div>

        <Card className="bg-background/60 backdrop-blur-xl">
          <CardContent className="p-6">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="article">Article</Label>
                <Input id="article" placeholder="Nom de l'article" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantite">Quantité</Label>
                <Input id="quantite" type="number" min="1" placeholder="Nombre d'unités" />
              </div>
              
              
              <div className="space-y-2">
                <Label htmlFor="prix">Prix unitaire</Label>
                <Input id="prix" type="number" step="0.01" placeholder="Prix par unité" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date de livraison souhaitée</Label>
                <Input id="date" type="date" />
              </div>
              
              <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                Commander
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}