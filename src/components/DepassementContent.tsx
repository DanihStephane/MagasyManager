import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DepassementContentProps {
    onSuccess: () => void;
}

export function DepassementContent({ onSuccess }: DepassementContentProps) {
    const [step, setStep] = useState(1);
    const [code, setCode] = useState("");
    const [jours, setJours] = useState("");
    const [codeError, setCodeError] = useState<string | null>(null);

    const handleCodeSubmit = () => {
        if (code === "0101") {
            setCodeError(null);
            setStep(2);
        } else {
            setCodeError("Code de dépassement incorrect");
        }
    };

    const handleJoursSubmit = () => {
        setStep(3);
    };

    return (
        <div className="space-y-4 py-4">
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
                    {codeError && (
                        <p className="text-sm text-red-500 font-medium">{codeError}</p>
                    )}
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
                        onClick={onSuccess}
                        className="w-full"
                    >
                        Confirmer et retourner à la commande
                    </Button>
                </div>
            )}
        </div>
    );
}