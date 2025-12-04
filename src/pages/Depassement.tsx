import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Depassement() {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [jours, setJours] = useState("");
  const navigate = useNavigate();

  const handleCodeSubmit = () => {
    if (code === "0101") {
      setStep(2);
    }
  };

  const handleJoursSubmit = () => {
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Permettre le dépassement</CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Le dépassement permet d'augmenter temporairement votre limite d'achat. 
                  Cette opération nécessite un code spécial et implique un remboursement 
                  dans un délai défini.
                </p>
                <Input
                  type="password"
                  placeholder="Code de dépassement"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <Button onClick={handleCodeSubmit} className="w-full">
                  Valider le code
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Input
                  type="number"
                  placeholder="Nombre de jours pour le remboursement"
                  value={jours}
                  onChange={(e) => setJours(e.target.value)}
                />
                <Button onClick={handleJoursSubmit} className="w-full">
                  Valider le délai
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-bold">Récapitulatif</h3>
                <div className="space-y-2">
                  <p>Code de dépassement validé</p>
                  <p>Délai de remboursement: {jours} jours</p>
                </div>
                <Button 
                  onClick={() => navigate("/commande-stock")} 
                  className="w-full"
                >
                  Retourner à la commande
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
