import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { 
  Clock, MapPin, AlertTriangle, CloudSun, Calendar, 
  Users, ArrowLeft, ShoppingCart, Check, Sparkles, Eye, EyeOff 
} from 'lucide-react';
import { getEpochById } from '../data/epochs';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const EpochDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const epoch = getEpochById(id || '');
  const { addToCart } = useBooking();

  const [travelers, setTravelers] = useState(1);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date>();
  const [immersiveMode, setImmersiveMode] = useState(false);

  if (!epoch) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-purple-300 mb-4">Époque introuvable</h1>
        <Link to="/catalogue">
          <Button className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Retour au catalogue
          </Button>
        </Link>
      </div>
    );
  }

  const toggleActivity = (activity: string) => {
    setSelectedActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleAddToCart = () => {
    if (!startDate) {
      toast.error('Veuillez sélectionner une date de départ');
      return;
    }
    
    addToCart({
      epoch,
      travelers,
      startDate,
      activities: selectedActivities
    });
    toast.success('Ajouté au panier !', {
      description: `${epoch.name} pour ${travelers} voyageur${travelers > 1 ? 's' : ''}`
    });
    navigate('/cart');
  };

  const totalPrice = epoch.price * travelers;

  return (
    <div className="min-h-screen">
      {/* Hero Image with Immersive Mode */}
      <div className="relative h-96 overflow-hidden">
        <motion.img
          src={epoch.image}
          alt={epoch.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            immersiveMode ? 'scale-110 blur-sm' : 'scale-100'
          }`}
          animate={immersiveMode ? {
            scale: [1.1, 1.15, 1.1],
          } : {}}
          transition={immersiveMode ? {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
        />
        <div className={`absolute inset-0 transition-all duration-500 ${
          immersiveMode 
            ? 'bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent' 
            : 'bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent'
        }`} />
        
        {/* Immersive Mode Toggle */}
        <div className="absolute top-4 right-4">
          <Button
            onClick={() => setImmersiveMode(!immersiveMode)}
            variant="outline"
            className="gap-2 bg-slate-900/80 backdrop-blur-sm border-purple-500/30 hover:bg-purple-500/20"
          >
            {immersiveMode ? (
              <>
                <EyeOff className="w-4 h-4" />
                Quitter le mode immersif
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                Mode immersif
              </>
            )}
          </Button>
        </div>

        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <Link to="/catalogue">
              <Button variant="ghost" className="gap-2 mb-4 text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4" />
                Retour
              </Button>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-purple-400" />
                <span className="text-purple-300 text-lg">{epoch.year}</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
                {epoch.name}
              </h1>
              <p className="text-2xl text-slate-300">{epoch.period}</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-slate-900/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-300">À propos de cette époque</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    {epoch.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-slate-900/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl text-purple-300">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                    Points forts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {epoch.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-slate-900/50 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl text-purple-300">
                    <MapPin className="w-6 h-6" />
                    Activités disponibles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-3">
                    {epoch.activities.map((activity, index) => (
                      <button
                        key={index}
                        onClick={() => toggleActivity(activity)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedActivities.includes(activity)
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-slate-700 hover:border-purple-500/50 bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            selectedActivities.includes(activity)
                              ? 'border-purple-500 bg-purple-500'
                              : 'border-slate-600'
                          }`}>
                            {selectedActivities.includes(activity) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="text-slate-300">{activity}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Weather */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-slate-900/50 border-purple-500/20 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-purple-300">
                      <CloudSun className="w-5 h-5" />
                      Météo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">{epoch.weather}</p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Dangers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-slate-900/50 border-purple-500/20 h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-purple-300">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      À savoir
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {epoch.dangers.slice(0, 3).map((danger, index) => (
                        <li key={index} className="text-sm text-slate-400 flex items-start gap-2">
                          <span className="text-yellow-400 mt-0.5">•</span>
                          {danger}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <Card className="bg-slate-900/80 border-purple-500/30 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-300">Réservation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Price */}
                  <div className="pb-6 border-b border-slate-700">
                    <div className="text-sm text-slate-400 mb-1">À partir de</div>
                    <div className="text-4xl font-bold text-purple-400">
                      {epoch.price.toLocaleString()} €
                    </div>
                    <div className="text-sm text-slate-400 mt-1">par personne</div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-3 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-sm text-slate-400">Durée du voyage</div>
                      <div className="font-medium text-white">{epoch.duration}</div>
                    </div>
                  </div>

                  {/* Travelers */}
                  <div>
                    <Label className="text-slate-300 mb-3 block">
                      <Users className="w-4 h-4 inline mr-2" />
                      Nombre de voyageurs
                    </Label>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTravelers(Math.max(1, travelers - 1))}
                        disabled={travelers <= 1}
                      >
                        -
                      </Button>
                      <span className="text-2xl font-bold text-white w-12 text-center">
                        {travelers}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setTravelers(Math.min(10, travelers + 1))}
                        disabled={travelers >= 10}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Start Date */}
                  <div>
                    <Label className="text-slate-300 mb-3 block">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Date de départ
                    </Label>
                    <Popover>
                      <PopoverTrigger>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          {startDate ? (
                            format(startDate, "dd MMM yyyy", { locale: fr })
                          ) : (
                            <span>Choisir une date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          className="p-2"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Total */}
                  <div className="pt-6 border-t border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400">Total</span>
                      <span className="text-3xl font-bold text-purple-400">
                        {totalPrice.toLocaleString()} €
                      </span>
                    </div>
                    {selectedActivities.length > 0 && (
                      <div className="text-xs text-slate-500 mb-4">
                        {selectedActivities.length} activité{selectedActivities.length > 1 ? 's' : ''} sélectionnée{selectedActivities.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <Button
                    className="w-full gap-2 text-lg py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Ajouter au panier
                  </Button>

                  <p className="text-xs text-slate-500 text-center">
                    Annulation gratuite jusqu'à 48h avant le départ temporel
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};