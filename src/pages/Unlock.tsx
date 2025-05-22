import { useState, useEffect } from 'react';
import { Fingerprint, Lock, Unlock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function UnlockScreen() {
  const [unlocking, setUnlocking] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const navigate = useNavigate();

  const handleUnlock = () => {
    if (unlocking) return;
    
    setUnlocking(true);
    
    // Simuler la vérification d'empreinte
    setTimeout(() => {
      setUnlocked(true);
      
      // Rediriger vers la page d'accueil après l'animation
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat opacity-20 -z-[1]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text mb-3">
          MagasyManager
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-lg">
          Touchez l'empreinte pour déverrouiller
        </p>
      </motion.div>

      <motion.div 
        className="relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className={`w-32 h-32 rounded-full flex items-center justify-center cursor-pointer
                     ${unlocking ? 'bg-purple-100 dark:bg-purple-900/50' : 'bg-white/80 dark:bg-slate-800/80'} 
                     backdrop-blur-xl shadow-xl border-2 border-purple-300/50 dark:border-purple-700/50`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUnlock}
        >
          {unlocked ? (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <CheckCircle className="h-16 w-16 text-green-500" />
            </motion.div>
          ) : unlocking ? (
            <motion.div
              animate={{ 
                rotate: 360,
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "linear" 
              }}
            >
              <Lock className="h-16 w-16 text-purple-500" />
            </motion.div>
          ) : (
            <Fingerprint className="h-16 w-16 text-indigo-500" />
          )}
        </motion.div>

        {/* Cercles animés autour de l'empreinte */}
        {unlocking && !unlocked && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-purple-400/30"
              initial={{ scale: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-indigo-400/30"
              initial={{ scale: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </>
        )}

        {/* Animation de succès */}
        {unlocked && (
          <motion.div
            className="absolute inset-0 rounded-full bg-green-500/20"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.8, 0], opacity: [1, 0.8, 0] }}
            transition={{ duration: 1.5 }}
          />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: unlocking ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-slate-600 dark:text-slate-300">
          {unlocked ? "Déverrouillé avec succès!" : "Vérification de l'empreinte..."}
        </p>
      </motion.div>
    </div>
  );
}