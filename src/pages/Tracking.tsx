import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, MapPin, Lock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

export default function Tracking() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [locations, setLocations] = useState<{lat: number, lng: number, timestamp: number}[]>([]);
  const [isTracking, setIsTracking] = useState(true);
  const [pulseCount, setPulseCount] = useState(0);

  // Simuler l'enregistrement de la localisation
  useEffect(() => {
    if (!isTracking) return;
    
    const interval = setInterval(() => {
      // Simuler une nouvelle localisation (dans une application réelle, utilisez l'API Geolocation)
      const newLocation = {
        lat: Math.random() * 0.01 + 48.85, // Simulation de coordonnées
        lng: Math.random() * 0.01 + 2.35,
        timestamp: Date.now()
      };
      
      setLocations(prev => [...prev, newLocation]);
      setPulseCount(prev => prev + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isTracking]);

  const handleStopTracking = () => {
    if (confirm(language === 'fr' 
      ? 'Êtes-vous sûr de vouloir arrêter le suivi de déplacement?' 
      : 'Tena te-hajanona ny fanaraha-maso ny fifindrana ve ianao?')) {
      setIsTracking(false);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400/30 via-teal-400/30 to-green-400/30 flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border-2 border-blue-300/50 dark:border-blue-700/50">
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6" />
                <h1 className="text-2xl font-bold">
                  {language === 'fr' ? 'Mode Déplacement' : 'Fomba Fifindra'}
                </h1>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20 rounded-full"
                onClick={handleStopTracking}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="p-8 flex flex-col items-center">
            {/* Sonar Animation */}
            <div className="relative w-48 h-48 mb-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="h-12 w-12 text-blue-600 z-10" />
              </div>
              
              {/* Cercles concentriques animés */}

              <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-ping opacity-20"></div>
              <div className="absolute inset-4 rounded-full border-4 border-blue-400 animate-ping opacity-30 animation-delay-300"></div>
              <div className="absolute inset-8 rounded-full border-4 border-blue-300 animate-ping opacity-40 animation-delay-600"></div>
              <div className="absolute inset-12 rounded-full border-4 border-blue-200 animate-ping opacity-50 animation-delay-900"></div>
              
              {/* Points de déplacement */}
              {pulseCount > 0 && Array.from({ length: Math.min(pulseCount, 5) }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute h-3 w-3 rounded-full bg-green-500 animate-pulse"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2">
                {language === 'fr' ? 'Suivi de déplacement actif' : 'Fanaraha-maso ny fifindrana mavitrika'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'fr' 
                  ? 'Votre localisation est en cours d\'enregistrement' 
                  : 'Ny toerana misy anao dia voarakitra'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {language === 'fr'
                  ? `${locations.length} points de localisation enregistrés`
                  : `${locations.length} teboka misy toerana voarakitra`}
              </p>
            </div>
            
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span>{language === 'fr' ? 'Début du suivi' : 'Fanombohana ny fanaraha-maso'}</span>
                <span>
                  {new Date(locations[0]?.timestamp || Date.now()).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>{language === 'fr' ? 'Durée' : 'Faharetan\'ny fotoana'}</span>
                <span>
                  {locations.length > 0 
                    ? formatDuration(Date.now() - locations[0].timestamp)
                    : '00:00:00'}
                </span>
              </div>
            </div>
            
            <Button 
              onClick={handleStopTracking}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Navigation className="h-5 w-5" />
              {language === 'fr' ? 'Arrêter le suivi' : 'Ajanony ny fanaraha-maso'}
            </Button>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400 max-w-md">
          <p>
            {language === 'fr' 
              ? 'Toutes vos données de localisation sont sécurisées et ne seront utilisées que pour le suivi des déplacements de l\'appareil.'
              : 'Ny angon-drakitra rehetra momba ny toerana misy anao dia voaaro ary hampiasaina ho an\'ny fanaraha-maso ny fifindran\'ny fitaovana ihany.'}
          </p>
        </div>
      </div>
    </div>
  );
}

// Fonction utilitaire pour formater la durée
function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  return [
    hours.toString().padStart(2, '0'),
    (minutes % 60).toString().padStart(2, '0'),
    (seconds % 60).toString().padStart(2, '0')
  ].join(':');
}