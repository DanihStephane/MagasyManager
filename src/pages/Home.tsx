import { Layout, Sun, Moon } from 'lucide-react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';

const modules = [
  {
    title: "Enregistrement",
    description: "Gérez votre inventaire et enregistrez de nouveaux articles",
    icon: "📝",
    path: "/enregistrement"
  },
  {
    title: "Commande",
    description: "Passez des commandes auprès de vos fournisseurs",
    icon: "📦",
    path: "/commande"
  },
  {
    title: "Image",
    description: "Consultez les détails et images des articles",
    icon: "🖼️",
    path: "/image"
  },
  {
    title: "Statistique",
    description: "Analysez vos ventes et suivez vos bénéfices",
    icon: "📊",
    path: "/statistique"
  },
  {
    title: "Mouvement",
    description: "Gérez les transferts entre dépôt et magasin",
    icon: "🔄",
    path: "/mouvement"
  },
  {
    title: "Vente",
    description: "Enregistrez vos ventes et générez des factures",
    icon: "💰",
    path: "/vente"
  }
];

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex flex-col">
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-[1]" />
      
      <header className="bg-background/60 backdrop-blur-xl border-b border-border/40 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layout className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Gestion de Magasin
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Card key={module.title} className="group relative overflow-hidden border border-border/50 bg-background/60 backdrop-blur-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
              <Link to={module.path} className="block h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader>
                  <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform">{module.icon}</div>
                  <CardTitle className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                    {module.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Voir
                  </Button>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      </main>

      <footer className="bg-background/60 backdrop-blur-xl border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Gestion de Magasin. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}