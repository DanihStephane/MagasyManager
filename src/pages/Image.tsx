import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight, Tag, Shirt } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ZoomIn, ZoomOut, X } from "lucide-react"
import { HomeButton } from "@/components/HomeButton"
const images = [
  {
    id: 1,
    reference: "#000001",
    title: "Pull en Cachemire",
    description: "Pull luxueux 100% cachemire, coupe moderne",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=60",
    category: "Pulls"
  },
  {
    id: 2,
    reference: "#000002",
    title: "Veste en Cuir",
    description: "Veste en cuir véritable, style motard",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60",
    category: "Vestes"
  },
  {
    id: 3,
    reference: "#000003",
    title: "Robe de Soirée",
    description: "Robe élégante pour occasions spéciales",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=60",
    category: "Robes"
  },
  {
    id: 4,
    reference: "#000004",
    title: "Jean Slim",
    description: "Jean coupe slim, denim premium",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=60",
    category: "Jeans"
  },
  {
    id: 5,
    reference: "#000005",
    title: "Chemise en Lin",
    description: "Chemise d'été légère et respirante",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=60",
    category: "Chemises"
  },
  {
    id: 6,
    reference: "#000006",
    title: "Manteau d'Hiver",
    description: "Manteau chaud et élégant pour l'hiver",
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&auto=format&fit=crop&q=60",
    category: "Manteaux"
  },
  {
    id: 7,
    reference: "#000007",
    title: "T-shirt Graphique",
    description: "T-shirt en coton avec design original",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=60",
    category: "T-shirts"
  },
  {
    id: 8,
    reference: "#000008",
    title: "Blazer",
    description: "Blazer classique pour look professionnel",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=60",
    category: "Vestes"
  },
  {
    id: 9,
    reference: "#000009",
    title: "Short en Jean",
    description: "Short en jean décontracté pour l'été",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&auto=format&fit=crop&q=60",
    category: "Shorts"
  },
  {
    id: 10,
    reference: "#000010",
    title: "Robe d'Été",
    description: "Robe légère et florale pour les beaux jours",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=60",
    category: "Robes"
  },
];
const categories = ["Tous", "Pulls", "Vestes", "Robes", "Jeans", "Chemises", "Manteaux", "T-shirts", "Shorts"];

const ITEMS_PER_PAGE = 6;

export default function Image() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredImages = images.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);
  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
const [zoomLevel, setZoomLevel] = useState(1)
const handleZoom = (direction: 'in' | 'out') => {
  setZoomLevel(current => {
    if (direction === 'in') return Math.min(current + 0.5, 3)
    return Math.max(current - 0.5, 1)
  })
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 flex flex-col">
       <div className="absolute inset-0 bg-[url('https://st4.depositphotos.com/1076214/20486/i/1600/depositphotos_204867158-stock-photo-interior-fashion-clothing-store-women.jpg')] bg-cover bg-center bg-no-repeat opacity-50 -z-[1]" />
      
      {/* Header section */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-pink-300/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
  <Shirt className="h-8 w-8 text-pink-500 animate-bounce" />
  <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
    Collection de Vêtements
  </h1>
</div>

          <HomeButton />
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
        {/* Search and filter section */}

<div className="mb-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border-2 border-pink-200/50 dark:border-purple-700/50">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Search Input */}
    <div className="relative">
      <Search 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-500 h-5 w-5 transition-all duration-300 hover:scale-110 z-10"
      />
      <Input
        type="search"
        placeholder="Rechercher par nom..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 h-12 text-lg border-2 border-pink-200/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl focus:border-pink-500 focus:ring-pink-500"
      />
    </div>

    {/* Category Select */}
    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
      <SelectTrigger className="w-full h-12 text-lg border-2 border-pink-200/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl flex items-center">
        <Tag className="mr-2 h-4 w-4 text-pink-500" />
        <SelectValue placeholder="Filtrer par catégorie" />
      </SelectTrigger>
      <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
        {categories.map((category) => (
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


        {/* Grid of images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
  {paginatedImages.map((item) => (
    <Card key={item.id} className="group relative overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-none rounded-2xl hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-500 transform hover:-translate-y-2">
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-56 object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
          onClick={() => setSelectedImage(item.image)}
        />
        <div className="absolute top-4 right-4">
          <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-mono">
            {item.reference}
          </span>
        </div>
      </div>

      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="font-bold text-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
            {item.title}
          </CardTitle>
          <span className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 text-pink-600 dark:text-pink-300 font-medium border border-pink-200 dark:border-pink-800">
            {item.category}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {item.description}
        </p>

        <div className="pt-4 flex justify-between items-center border-t border-pink-100 dark:border-pink-800/30">
          <button className="text-sm text-pink-500 hover:text-pink-600 dark:text-pink-400 font-medium flex items-center gap-2 transition-colors">
            <ZoomIn className="w-4 h-4" />
            Voir détails
          </button>
          <div className="flex gap-2">
            <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Tag className="w-3 h-3 mr-1" />
              {item.category}
            </span>
          </div>
        </div>
      </CardHeader>
    </Card>
  ))}
</div>


        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button 
            variant="ghost" 
            size="sm" 
            className="hover:bg-pink-100 dark:hover:bg-pink-900 rounded-full w-10 h-10"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant="ghost"
              size="sm"
              className={`rounded-full w-10 h-10 ${
                page === currentPage 
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white' 
                  : 'hover:bg-pink-100 dark:hover:bg-pink-900'
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="hover:bg-pink-100 dark:hover:bg-pink-900 rounded-full w-10 h-10"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => {
  setSelectedImage(null)
  setZoomLevel(1)
}}>
  <DialogContent className="max-w-[90vw] h-[80vh] p-6 bg-black/90">
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 hover:bg-black/70 text-white rounded-full"
          onClick={() => handleZoom('in')}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 hover:bg-black/70 text-white rounded-full"
          onClick={() => handleZoom('out')}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 hover:bg-black/70 text-white rounded-full"
          onClick={() => {
            setSelectedImage(null)
            setZoomLevel(1)
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="w-full h-full overflow-auto flex items-center justify-center">
        <img
          src={selectedImage || ''}
          alt="Zoom view"
          className="max-w-full max-h-full object-contain transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel})` }}
        />
      </div>
    </div>
  </DialogContent>
</Dialog>


      {/* Footer */}
      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t-2 border-pink-300/50">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} MagasyManager. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}