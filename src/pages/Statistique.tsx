import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Jan', ventes: 4000, benefices: 2400, stocks: 300 },
  { name: 'Fév', ventes: 3000, benefices: 1398, stocks: 280 },
  { name: 'Mar', ventes: 2000, benefices: 9800, stocks: 250 },
  { name: 'Avr', ventes: 2780, benefices: 3908, stocks: 220 },
  { name: 'Mai', ventes: 1890, benefices: 4800, stocks: 200 },
  { name: 'Juin', ventes: 2390, benefices: 3800, stocks: 180 },
];

const transactions = [
  { id: 1, date: '2024-03-20', article: 'T-shirt Premium', montant: 29.99, type: 'Vente' },
  { id: 2, date: '2024-03-19', article: 'Jean Slim', montant: 89.99, type: 'Vente' },
  { id: 3, date: '2024-03-18', article: 'Lot de Sweats', montant: -1500.00, type: 'Achat' },
  { id: 4, date: '2024-03-17', article: 'Robe d\'été', montant: 79.99, type: 'Vente' },
  { id: 5, date: '2024-03-16', article: 'Veste en cuir', montant: 199.99, type: 'Vente' },
  { id: 6, date: '2024-03-15', article: 'Chaussures Sport', montant: -800.00, type: 'Achat' },
  { id: 7, date: '2024-03-14', article: 'Chemise Business', montant: 59.99, type: 'Vente' },
  { id: 8, date: '2024-03-13', article: 'Pull Cachemire', montant: 149.99, type: 'Vente' },
  { id: 9, date: '2024-03-12', article: 'Accessoires', montant: -450.00, type: 'Achat' },
  { id: 10, date: '2024-03-11', article: 'Pantalon Cargo', montant: 69.99, type: 'Vente' },
];

export default function Statistique() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Statistiques
          </h1>
          <Button asChild variant="ghost">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Accueil
            </Link>
          </Button>
        </div>

        <div className="grid gap-8">
          <Card className="bg-background/60 backdrop-blur-xl p-6">
            <CardHeader>
              <CardTitle>Évolution des ventes et bénéfices</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart width={800} height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ventes" stroke="#3b82f6" />
                <Line type="monotone" dataKey="benefices" stroke="#ec4899" />
                <Line type="monotone" dataKey="stocks" stroke="#10b981" />
              </LineChart>
            </CardContent>
          </Card>

          <Card className="bg-background/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle>Dernières transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Article</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="border-b">
                        <td className="px-6 py-4">{transaction.date}</td>
                        <td className="px-6 py-4">{transaction.article}</td>
                        <td className="px-6 py-4">{transaction.type}</td>
                        <td className={`px-6 py-4 ${transaction.montant < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {transaction.montant.toFixed(2)}€
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}