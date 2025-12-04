import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Store, Package, Filter, Calendar, BarChart, Search, Tag, Shirt } from "lucide-react"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { HomeButton } from '@/components/HomeButton'

// Updated store products data
const storeProducts = [
  {
    store: "Magasin Central",
    products: [
      { 
        name: "T-Shirt Blanc", 
        quantity: 150, 
        reference: "#000001", 
        category: "T-Shirt",
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=60"
      },
      { 
        name: "Chemise Blue", 
        quantity: 75, 
        reference: "#000002", 
        category: "Chemise",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60"
      }
    ]
  },
  {
    store: "Boutique Ankorondrano",
    products: [
      { 
        name: "Polo Sport", 
        quantity: 45, 
        reference: "#000003", 
        category: "Polo",
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=60"
      },
      { 
        name: "Robe d'été", 
        quantity: 30, 
        reference: "#000004", 
        category: "Robe",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=60"
      }
    ]
  }
]

// Updated central products data
const centralProducts = [
  { 
    name: "T-Shirt Blanc", 
    quantity: 500, 
    reference: "#000001", 
    category: "T-Shirt",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=60"
  },
  { 
    name: "Chemise Blue", 
    quantity: 300, 
    reference: "#000002", 
    category: "Chemise",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60"
  },
  { 
    name: "Polo Sport", 
    quantity: 250, 
    reference: "#000003", 
    category: "Polo",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=60"
  },
  { 
    name: "Robe d'été", 
    quantity: 150, 
    reference: "#000004", 
    category: "Robe",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=60"
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
  const [searchQuery, setSearchQuery] = useState("")

  // Filter functions
  const filteredStoreProducts = storeProducts.map(store => ({
    ...store,
    products: store.products.filter(product => 
      (storeFilter === "Tous" || product.category === storeFilter) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }))

  const filteredCentralProducts = centralProducts.filter(product => 
    (centralFilter === "Tous" || product.category === centralFilter) &&
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 flex flex-col">
     <div className="absolute inset-0 bg-[url('https://st4.depositphotos.com/1076214/20486/i/1600/depositphotos_204867158-stock-photo-interior-fashion-clothing-store-women.jpg')] bg-cover bg-center bg-no-repeat opacity-50 -z-[1]" />
    
    {/* Header moderne */}
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-pink-300/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
  <div className="animate-bounce">
    <Filter className="h-6 w-6 text-pink-500" />
  </div>
  <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
    Vérification des Produits
  </h1>
</div>

        <div className="flex gap-4">
        <Link to="/statistique">
  <Button 
    variant="outline" 
    className="group relative overflow-hidden border-2 border-pink-500/20 hover:border-pink-500 transition-all duration-300 hover:scale-105"
  >
    <span className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
    <Calendar className="mr-2 h-4 w-4 text-pink-500 group-hover:rotate-12 transition-transform" />
    <span className="relative">Récapitulation Journalière</span>
  </Button>
</Link>

<Link to="/graph-stats">
  <Button 
    variant="outline" 
    className="group relative overflow-hidden border-2 border-blue-500/20 hover:border-blue-500 transition-all duration-300 hover:scale-105"
  >
    <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
    <BarChart className="mr-2 h-4 w-4 text-blue-500 group-hover:animate-pulse transition-transform" />
    <span className="relative">Statistique en graphique</span>
  </Button>
</Link>

          <HomeButton/>
        </div>
      </div>
    </header>


    <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
        <div className="grid gap-8">
          {/* Section Dépôt Central */}
          <Card className="bg-background/60 backdrop-blur-xl">
            <CardHeader>
              
            <div className="flex justify-between items-center">
  <div className="flex items-center gap-3">
    <Package className="h-8 w-8 text-pink-500 animate-bounce" />
    <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
      Produits Dépôt Central
    </h1>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="relative">
      <Search 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-500 h-5 w-5 transition-all duration-300 hover:scale-110 z-10"
      />
      <Input
        type="search"
        placeholder="Rechercher par nom ou référence..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 h-12 text-lg border-2 border-pink-200/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl focus:border-pink-500 focus:ring-pink-500"
      />
    </div>

    <Select value={centralFilter} onValueChange={setCentralFilter}>
      <SelectTrigger className="w-full h-12 text-lg border-2 border-pink-200/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl flex items-center">
        <Tag className="mr-2 h-4 w-4 text-pink-500" />
        <SelectValue placeholder="Filtrer par catégorie" />
      </SelectTrigger>
      <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
        {CATEGORIES.map((category) => (
          <SelectItem
            key={category}
            value={category}
            className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900 flex items-center space-x-2"
          >
            <div className="flex items-center">
              <Shirt className="h-4 w-4 text-pink-500" />
              <span className="ml-2">{category}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
</div>



            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredCentralProducts.map((product, index) => (
    <Card key={index} className="group bg-background/40 hover:bg-background/60 transition-all duration-300 overflow-hidden border border-pink-200/50 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/20">
      <div className="relative">
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white rounded-full font-mono text-sm shadow-md">
            Ref: {product.reference}
          </span>
        </div>
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>
      <CardContent className="p-6 bg-gradient-to-b from-transparent to-background/60">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg tracking-tight">
            {product.name}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Tag className="h-4 w-4 text-pink-500" />
              <span>{product.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-pink-500" />
              <span className="font-bold text-primary">
                Stock: {product.quantity}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ))}
</div>


            </CardContent>
          </Card>
          {/* Section Magasins */}
          <Card className="bg-background/60 backdrop-blur-xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Store className="h-8 w-8 text-pink-500 animate-bounce" />
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
                    Produits des Magasins
                  </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-500 h-5 w-5 transition-all duration-300 hover:scale-110 z-10"
                    />
                    <Input
                      type="search"
                      placeholder="Rechercher par nom ou référence..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 h-12 text-lg border-2 border-pink-200/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl focus:border-pink-500 focus:ring-pink-500"
                    />
                  </div>

                  <Select value={storeFilter} onValueChange={setStoreFilter}>
                    <SelectTrigger className="w-full h-12 text-lg border-2 border-pink-200/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl flex items-center">
                      <Tag className="mr-2 h-4 w-4 text-pink-500" />
                      <SelectValue placeholder="Filtrer par catégorie" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
                      {CATEGORIES.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900 flex items-center space-x-2"
                        >
                          <div className="flex items-center">
                            <Shirt className="h-4 w-4 text-pink-500" />
                            <span className="ml-2">{category}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {filteredStoreProducts.map((store, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 bg-gradient-to-r from-pink-100/50 to-purple-100/50 dark:from-pink-900/50 dark:to-purple-900/50 p-4 rounded-lg mb-6">
  <Store className="h-6 w-6 text-pink-500" />
  <h3 className="font-bold text-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
    {store.store}
  </h3>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {store.products.map((product, pIndex) => (
    <Card key={pIndex} className="group bg-background/40 hover:bg-background/60 transition-all duration-300 overflow-hidden border border-pink-200/50 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/20">
      <div className="relative">
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white rounded-full font-mono text-sm shadow-md">
            Ref: {product.reference}
          </span>
        </div>
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>
      <CardContent className="p-6 bg-gradient-to-b from-transparent to-background/60">
        <div className="space-y-3">
          <h3 className="font-semibold text-lg tracking-tight">
            {product.name}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Tag className="h-4 w-4 text-pink-500" />
              <span>{product.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-pink-500" />
              <span className="font-bold text-primary">
                Stock: {product.quantity}
              </span>
            </div>
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

          
        </div>
      </div>
      {/* Footer moderne */}
    <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t-2 border-pink-300/50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          © {new Date().getFullYear()} MagasyManager. Tous droits réservés.
        </p>
      </div>
    </footer>
    </div>
  )
}

