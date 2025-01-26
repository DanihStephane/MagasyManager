import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Store, Package, Filter, Calendar, BarChart } from "lucide-react"
import { Link } from "react-router-dom"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Updated store products data
const storeProducts = [
  {
    store: "Magasin Central",
    products: [
      { 
        name: "T-Shirt Blanc", 
        quantity: 150, 
        reference: "TS-001", 
        category: "T-Shirt",
        image: "/tshirt-blanc.jpg"
      },
      { 
        name: "Chemise Blue", 
        quantity: 75, 
        reference: "CH-002", 
        category: "Chemise",
        image: "/chemise-blue.jpg"
      }
    ]
  },
  {
    store: "Boutique Ankorondrano",
    products: [
      { 
        name: "Polo Sport", 
        quantity: 45, 
        reference: "PL-003", 
        category: "Polo",
        image: "/polo-sport.jpg"
      },
      { 
        name: "Robe d'été", 
        quantity: 30, 
        reference: "RB-004", 
        category: "Robe",
        image: "/robe-ete.jpg"
      }
    ]
  }
]

// Updated central products data
const centralProducts = [
  { 
    name: "T-Shirt Blanc", 
    quantity: 500, 
    reference: "TS-001", 
    category: "T-Shirt",
    image: "/tshirt-blanc.jpg"
  },
  { 
    name: "Chemise Blue", 
    quantity: 300, 
    reference: "CH-002", 
    category: "Chemise",
    image: "/chemise-blue.jpg"
  },
  { 
    name: "Polo Sport", 
    quantity: 250, 
    reference: "PL-003", 
    category: "Polo",
    image: "/polo-sport.jpg"
  },
  { 
    name: "Robe d'été", 
    quantity: 150, 
    reference: "RB-004", 
    category: "Robe",
    image: "/robe-ete.jpg"
  }
]

// Add categories constant
const CATEGORIES = [
  "Tous",
  "T-Shirt",
  "Chemise",
  "Polo",
  "Robe",
  // Add other categories
]

export function ProductCheck() {
  // Add state for filters
  const [storeFilter, setStoreFilter] = useState("Tous")
  const [centralFilter, setCentralFilter] = useState("Tous")

  // Filter functions
  const filteredStoreProducts = storeProducts.map(store => ({
    ...store,
    products: store.products.filter(product => 
      storeFilter === "Tous" || product.category === storeFilter
    )
  }))

  const filteredCentralProducts = centralProducts.filter(product => 
    centralFilter === "Tous" || product.category === centralFilter
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
            Vérification des Produits
          </h1>
          <div className="flex gap-4">
            <Button asChild variant="outline" className="bg-background/60 backdrop-blur-xl">
              <Link to="/statistique">
                <Calendar className="mr-2 h-4 w-4" />
                Récapitulation Journalière
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-background/60 backdrop-blur-xl">
              <Link to="/graph-stats">
                <BarChart className="mr-2 h-4 w-4" />
                Statistique en graphique
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Accueil
              </Link>
            </Button>
          </div>
        </div>
        <div className="grid gap-8">
          {/* Section Magasins */}
          <Card className="bg-background/60 backdrop-blur-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-6 w-6" />
                  Produits des Magasins
                </CardTitle>
                <Select onValueChange={setStoreFilter} defaultValue="Tous">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          {category}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {filteredStoreProducts.map((store, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-4">{store.store}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {store.products.map((product, pIndex) => (
                        <Card key={pIndex} className="bg-background/40">
                          <div className="aspect-video w-full overflow-hidden">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform"
                            />
                          </div>
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <p className="font-medium">{product.name}</p>
                              <div className="text-sm text-muted-foreground">
                                <p>Ref: {product.reference}</p>
                                <p>Catégorie: {product.category}</p>
                                <p className="font-semibold text-primary">
                                  Stock: {product.quantity}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Section Dépôt Central */}
          <Card className="bg-background/60 backdrop-blur-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-6 w-6" />
                  Produits Dépôt Central
                </CardTitle>
                <Select onValueChange={setCentralFilter} defaultValue="Tous">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(category => (
                      <SelectItem key={category} value={category}>
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          {category}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCentralProducts.map((product, index) => (
                  <Card key={index} className="bg-background/40">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <p className="font-medium">{product.name}</p>
                        <div className="text-sm text-muted-foreground">
                          <p>Ref: {product.reference}</p>
                          <p>Catégorie: {product.category}</p>
                          <p className="font-semibold text-primary">
                            Stock: {product.quantity}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}