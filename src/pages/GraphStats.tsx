import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Calendar, BarChart2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { HomeButton } from "@/components/HomeButton"

interface SaleData {
  date: Date
  category: string
  quantity: number
  price: number
  profit: number
}

const generateSampleData = (): SaleData[] => {
  const data: SaleData[] = []
  const categories = [
    'T-shirt',
    'Pantalon',
    'Robe',
    'Chemise',
    'Jupe',
    'Pull',
    'Veste',
    'Short'
  ]
  
  for (let i = 0; i < 365; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    categories.forEach(category => {
      const quantity = Math.floor(Math.random() * 50) + 1
      const price = Math.floor(Math.random() * 50000) + 10000
      data.push({
        date,
        category,
        quantity,
        price,
        profit: price * 0.3
      })
    })
  }
  
  return data
}

export function GraphStats() {
  const [timeFrame, setTimeFrame] = useState('month')
  const [metric, setMetric] = useState('sales')
  const [rawData] = useState<SaleData[]>(generateSampleData())

  const processData = () => {
    if (metric === 'byCategory') {
      const groupedData = new Map()
    
      rawData.forEach(sale => {
        let key = ''
        switch(timeFrame) {
          case 'day':
            key = sale.date.toISOString().split('T')[0]
            break
          case 'month':
            key = `${sale.date.getFullYear()}-${sale.date.getMonth() + 1}`
            break
          case 'year':
            key = sale.date.getFullYear().toString()
            break
        }
      
        if (!groupedData.has(key)) {
          groupedData.set(key, {
            name: key,
            'T-shirt': 0,
            'Pantalon': 0,
            'Robe': 0,
            'Chemise': 0,
            'sales': 0,
            'quantity': 0,
            'profit': 0
          })
        }
      
        const current = groupedData.get(key)
        current[sale.category] += sale.quantity * sale.price
      })
    
      return Array.from(groupedData.values())
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(-12)
    }
  
    const groupedData = new Map()

    rawData.forEach(sale => {
      let key = ''
    
      switch(timeFrame) {
        case 'day':
          key = sale.date.toISOString().split('T')[0]
          break
        case 'month':
          key = `${sale.date.getFullYear()}-${sale.date.getMonth() + 1}`
          break
        case 'year':
          key = sale.date.getFullYear().toString()
          break
      }

      if (!groupedData.has(key)) {
        groupedData.set(key, {
          name: key,
          sales: 0,
          quantity: 0,
          profit: 0
        })
      }

      const current = groupedData.get(key)
      // Accumulation correcte des métriques
      current.sales += sale.price * sale.quantity
      current.quantity += sale.quantity
      current.profit += sale.profit * sale.quantity
    })

    return Array.from(groupedData.values())
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(-12)
  }
  const chartData = processData()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 p-4 rounded-lg shadow-lg border">
          <p className="font-bold">{label}</p>
          <p className="text-sm">
            {getMetricLabel()}: {' '}
            {metric === 'sales' || metric === 'profit' 
              ? `${payload[0].value.toLocaleString()} Ar`
              : payload[0].value}
          </p>
        </div>
      )
    }
    return null
  }

  const getMetricLabel = () => {
    switch(metric) {
      case 'sales': return 'Ventes (Ar)'
      case 'quantity': return 'Quantité'
      case 'profit': return 'Bénéfice (Ar)'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30 flex flex-col">
     <div className="absolute inset-0 bg-[url('https://st4.depositphotos.com/1076214/20486/i/1600/depositphotos_204867158-stock-photo-interior-fashion-clothing-store-women.jpg')] bg-cover bg-center bg-no-repeat opacity-50 -z-[1]" />
    
    {/* Header moderne */}
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b-2 border-pink-300/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
  <BarChart2 className="h-8 w-8 animate-bounce text-pink-500" />
  <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
    Statistiques en Graphiques
  </h1>
</div>

        <div className="flex gap-4">
        <div className="flex gap-4">
  <Button 
    asChild 
    variant="outline" 
    className="group relative overflow-hidden border-2 border-pink-500/20 hover:border-pink-500 transition-all duration-300 hover:scale-105"
  >
    <Link to="/statistique">
      <span className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
      <Calendar className="mr-2 h-4 w-4 text-pink-500 group-hover:rotate-12 transition-transform" />
      <span className="relative">Récapitulation Journalière</span>
    </Link>
  </Button>

  <Button 
    asChild 
    variant="outline" 
    className="group relative overflow-hidden border-2 border-blue-500/20 hover:border-blue-500 transition-all duration-300 hover:scale-105"
  >
    <Link to="/product-check">
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
      <BarChart2 className="mr-2 h-4 w-4 text-blue-500 group-hover:animate-pulse transition-transform" />
      <span className="relative">Check nombre de produit disponible</span>
    </Link>
  </Button>
</div>

          <HomeButton/>
        </div>
      </div>
    </header>

    <div className="w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-grow">
        <Card className="bg-background/60 backdrop-blur-xl">
          <CardHeader>
          <div className="flex gap-4">
  <Select value={timeFrame} onValueChange={setTimeFrame}>
    <SelectTrigger className="w-full h-12 text-lg border-2 border-pink-200/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl flex items-center">
      <Calendar className="mr-2 h-4 w-4 text-pink-500" />
      <SelectValue placeholder="Sélectionner une période" />
    </SelectTrigger>
    <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
      <SelectItem value="day" className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900 flex items-center space-x-2">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-pink-500" />
          <span className="ml-2">Jour</span>
        </div>
      </SelectItem>
      <SelectItem value="month" className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900 flex items-center space-x-2">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-pink-500" />
          <span className="ml-2">Mois</span>
        </div>
      </SelectItem>
      <SelectItem value="year" className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900 flex items-center space-x-2">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-pink-500" />
          <span className="ml-2">Année</span>
        </div>
      </SelectItem>
    </SelectContent>
  </Select>

  <Select value={metric} onValueChange={setMetric}>
    <SelectTrigger className="w-full h-12 text-lg border-2 border-pink-200/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-xl flex items-center">
      <BarChart2 className="mr-2 h-4 w-4 text-pink-500" />
      <SelectValue placeholder="Sélectionner une métrique" />
    </SelectTrigger>
    <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
      <SelectItem value="sales" className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900 flex items-center space-x-2">
        <div className="flex items-center">
          <BarChart2 className="h-4 w-4 text-pink-500" />
          <span className="ml-2">Prix de vente</span>
        </div>
      </SelectItem>
      <SelectItem value="quantity" className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900 flex items-center space-x-2">
        <div className="flex items-center">
          <BarChart2 className="h-4 w-4 text-pink-500" />
          <span className="ml-2">Nombre d'articles</span>
        </div>
      </SelectItem>
      <SelectItem value="profit" className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900 flex items-center space-x-2">
        <div className="flex items-center">
          <BarChart2 className="h-4 w-4 text-pink-500" />
          <span className="ml-2">Bénéfice</span>
        </div>
      </SelectItem>
      <SelectItem value="byCategory" className="text-base py-3 hover:bg-pink-100 dark:hover:bg-pink-900 flex items-center space-x-2">
        <div className="flex items-center">
          <BarChart2 className="h-4 w-4 text-pink-500" />
          <span className="ml-2">Par catégorie</span>
        </div>
      </SelectItem>
    </SelectContent>
  </Select>
</div>

          </CardHeader>
          <CardContent>
            <div className="h-[400px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tickFormatter={(value) => {
                      if (timeFrame === 'month') {
                        const [year, month] = value.split('-')
                        return new Date(parseInt(year), parseInt(month)-1).toLocaleDateString('fr-FR', { month: 'short' })
                      }
                      return value
                    }}
                  />
                  <YAxis 
                    label={{ value: getMetricLabel(), angle: -90, position: 'insideLeft' }}
                    tickFormatter={(value) => `${(value/1000).toFixed(0)}k Ar`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {metric === 'byCategory' ? (
                    <>
                      <Bar dataKey="T-shirt" fill="#8884d8" stackId="a" />
                      <Bar dataKey="Pantalon" fill="#82ca9d" stackId="a" />
                      <Bar dataKey="Robe" fill="#ffc658" stackId="a" />
                      <Bar dataKey="Chemise" fill="#ff7300" stackId="a" />
                      <Bar dataKey="Jupe" fill="#e84393" stackId="a" />
                      <Bar dataKey="Pull" fill="#00b894" stackId="a" />
                      <Bar dataKey="Veste" fill="#6c5ce7" stackId="a" />
                      <Bar dataKey="Short" fill="#fd79a8" stackId="a" />
                    </>
                  ) : (
                    <Bar dataKey={metric} fill="#8884d8" />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>          
            </CardContent>
        </Card>
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