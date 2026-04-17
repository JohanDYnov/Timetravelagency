import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, Trash2, Calendar, Users, ArrowRight, 
  Check, Clock, Sparkles, X 
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

export const CartPage = () => {
  const { cart, removeFromCart, clearCart, totalPrice } = useBooking();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRemove = (epochId: string, epochName: string) => {
    removeFromCart(epochId);
    toast.success(`${epochName} retiré du panier`);
  };

  const handleCheckout = () => {
    setShowConfirmation(true);
  };

  const confirmBooking = () => {
    toast.success('Réservation confirmée !', {
      description: 'Vous allez recevoir un email de confirmation avec tous les détails.'
    });
    clearCart();
    setTimeout(() => {
      navigate('/profile');
    }, 1500);
  };

  if (cart.length === 0 && !showConfirmation) {
    return (
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-slate-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-purple-300">
            Votre panier est vide
          </h1>
          <p className="text-slate-400 mb-8">
            Explorez nos destinations temporelles et commencez à planifier votre aventure !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalogue">
              <Button className="gap-2 bg-purple-600 hover:bg-purple-500">
                <Sparkles className="w-4 h-4" />
                Explorer le catalogue
              </Button>
            </Link>
            <Link to="/quiz">
              <Button variant="outline" className="gap-2 border-purple-400 text-purple-300">
                Faire le quiz
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-slate-900/50 border-purple-500/20 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check className="w-10 h-10 text-purple-600" />
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Réservation confirmée !
              </h1>
              <p className="text-purple-100">
                Votre voyage dans le temps est réservé
              </p>
            </div>

            <CardContent className="p-8">
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.epoch.id} className="pb-6 border-b border-slate-700 last:border-0">
                    <div className="flex items-center gap-4 mb-3">
                      <Clock className="w-5 h-5 text-purple-400" />
                      <div>
                        <h3 className="font-bold text-white">{item.epoch.name}</h3>
                        <p className="text-sm text-slate-400">{item.epoch.year}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Voyageurs</span>
                        <p className="text-white">{item.travelers} personne{item.travelers > 1 ? 's' : ''}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Durée</span>
                        <p className="text-white">{item.epoch.duration}</p>
                      </div>
                    </div>
                    {item.activities.length > 0 && (
                      <div className="mt-3">
                        <span className="text-xs text-slate-500">Activités sélectionnées :</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.activities.map((activity, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400">Total</span>
                    <span className="text-3xl font-bold text-purple-400">
                      {totalPrice.toLocaleString()} €
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Un email de confirmation a été envoyé
                  </p>
                </div>

                <Button
                  onClick={confirmBooking}
                  className="w-full gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                >
                  Voir mes réservations
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Mon Panier
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.epoch.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Card className="bg-slate-900/50 border-purple-500/20 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="md:w-48 h-48 md:h-auto relative overflow-hidden flex-shrink-0">
                        <img
                          src={item.epoch.image}
                          alt={item.epoch.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 to-transparent" />
                      </div>

                      {/* Content */}
                      <CardContent className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="w-4 h-4 text-purple-400" />
                              <span className="text-sm text-purple-300">{item.epoch.year}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">
                              {item.epoch.name}
                            </h3>
                            <p className="text-slate-400">{item.epoch.period}</p>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleRemove(item.epoch.id, item.epoch.name)}
                            className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-300">
                              {item.travelers} voyageur{item.travelers > 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-300">{item.epoch.duration}</span>
                          </div>
                        </div>

                        {item.activities.length > 0 && (
                          <div className="mb-4">
                            <span className="text-xs text-slate-500 mb-2 block">
                              Activités sélectionnées :
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {item.activities.map((activity, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {activity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                          <span className="text-slate-400">Sous-total</span>
                          <span className="text-2xl font-bold text-purple-400">
                            {(item.epoch.price * item.travelers).toLocaleString()} €
                          </span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="bg-slate-900/80 border-purple-500/30 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-300">Récapitulatif</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.epoch.id} className="flex justify-between text-sm">
                        <span className="text-slate-400">
                          {item.epoch.name} x{item.travelers}
                        </span>
                        <span className="text-white">
                          {(item.epoch.price * item.travelers).toLocaleString()} €
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-700 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg text-slate-300">Total</span>
                      <span className="text-3xl font-bold text-purple-400">
                        {totalPrice.toLocaleString()} €
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {cart.reduce((sum, item) => sum + item.travelers, 0)} voyageur
                      {cart.reduce((sum, item) => sum + item.travelers, 0) > 1 ? 's' : ''}
                    </p>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full gap-2 text-lg py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                  >
                    <Check className="w-5 h-5" />
                    Confirmer la réservation
                  </Button>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Check className="w-3 h-3 text-green-400" />
                      Annulation gratuite 48h avant
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Check className="w-3 h-3 text-green-400" />
                      Assurance voyage temporel incluse
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Check className="w-3 h-3 text-green-400" />
                      Support 24/7 toutes époques
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
