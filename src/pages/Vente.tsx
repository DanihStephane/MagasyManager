import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Vente() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState('');
  const [operation, setOperation] = useState('');
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (number: string) => {
    if (newNumber) {
      setDisplay(number);
      setNewNumber(false);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperation = (op: string) => {
    setPreviousValue(display);
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = () => {
    const prev = parseFloat(previousValue);
    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
    }

    setDisplay(result.toString());
    setNewNumber(true);
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue('');
    setOperation('');
    setNewNumber(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-8">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Caisse Enregistreuse
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
            <div className="bg-background p-4 rounded-lg mb-4 text-right text-2xl font-mono">
              {display}
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {['7', '8', '9', '/'].map((btn) => (
                <Button
                  key={btn}
                  variant="outline"
                  onClick={() => btn === '/' ? handleOperation(btn) : handleNumber(btn)}
                >
                  {btn}
                </Button>
              ))}
              
              {['4', '5', '6', '*'].map((btn) => (
                <Button
                  key={btn}
                  variant="outline"
                  onClick={() => btn === '*' ? handleOperation(btn) : handleNumber(btn)}
                >
                  {btn}
                </Button>
              ))}
              
              {['1', '2', '3', '-'].map((btn) => (
                <Button
                  key={btn}
                  variant="outline"
                  onClick={() => btn === '-' ? handleOperation(btn) : handleNumber(btn)}
                >
                  {btn}
                </Button>
              ))}
              
              {['0', '.', '=', '+'].map((btn) => (
                <Button
                  key={btn}
                  variant="outline"
                  onClick={() => {
                    if (btn === '=') calculate();
                    else if (btn === '+') handleOperation(btn);
                    else handleNumber(btn);
                  }}
                >
                  {btn}
                </Button>
              ))}
              
              <Button
                className="col-span-4 bg-gradient-to-r from-primary to-secondary"
                onClick={clear}
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}