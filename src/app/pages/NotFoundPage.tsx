import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Clock, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-2xl"
      >
        <div className="mb-8">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="inline-block"
          >
            <Clock className="w-32 h-32 text-purple-400 mx-auto mb-6" />
          </motion.div>
          <h1 className="text-8xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl font-bold mb-4 text-white">
            Paradoxe temporel détecté !
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Cette page n'existe pas dans notre chronologie. Vous avez peut-être voyagé trop loin...
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
                <ArrowLeft className="w-4 h-4" />
                Retour au présent
              </Button>
            </Link>
            <Link to="/catalogue">
              <Button variant="outline" className="gap-2 border-purple-400 text-purple-300">
                <Sparkles className="w-4 h-4" />
                Explorer le catalogue
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
