import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Mouvement() {
  const mouvements = [
    {
      id: 1,
      article: "T-shirt blanc",
      quantite: 25,
      depotSource: "Dépôt Central",
      magasinDest: "Boutique Centre-ville",
      date: "2024-01-15",
    },
    {
      id: 2,
      article: "Jean slim noir",
      quantite: 15,
      depotSource: "Dépôt Sud",
      magasinDest: "Boutique Mall",
      date: "2024-01-14",
    },
    {
      id: 3,
      article: "Robe d'été fleurie",
      quantite: 10,
      depotSource: "Dépôt Est",
      magasinDest: "Boutique Plage",
      date: "2024-01-13",
    },
    {
      id: 4,
      article: "Veste en cuir",
      quantite: 8,
      depotSource: "Dépôt Central",
      magasinDest: "Boutique Premium",
      date: "2024-01-12",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Mouvement de Stock
          </h1>
          <Button asChild variant="ghost">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Accueil
            </Link>
          </Button>
        </div>

        <Card className="bg-background/60 backdrop-blur-xl mb-8">
          <CardContent className="p-6">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="article">Article</Label>
                <Input id="article" placeholder="Sélectionner l'article" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantite">Quantité</Label>
                <Input id="quantite" type="number" min="1" placeholder="Nombre d'unités" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="depot">Dépôt source</Label>
                <Input id="depot" placeholder="Sélectionner le dépôt" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="magasin">Magasin destination</Label>
                <Input id="magasin" placeholder="Sélectionner le magasin" />
              </div>
              
              <Button className="w-full bg-gradient-to-r from-primary to-secondary">
                Effectuer le transfert
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-background/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>Historique des mouvements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Article</th>
                    <th className="text-left p-2">Quantité</th>
                    <th className="text-left p-2">Dépôt source</th>
                    <th className="text-left p-2">Magasin dest.</th>
                    <th className="text-left p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mouvements.map((mouvement) => (
                    <tr key={mouvement.id} className="border-b hover:bg-muted/50">
                      <td className="p-2">{mouvement.article}</td>
                      <td className="p-2">{mouvement.quantite}</td>
                      <td className="p-2">{mouvement.depotSource}</td>
                      <td className="p-2">{mouvement.magasinDest}</td>
                      <td className="p-2">{mouvement.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}