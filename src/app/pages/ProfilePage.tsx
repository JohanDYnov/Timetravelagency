import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Heart, Clock, Settings, Star, Calendar, Award } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { epochs } from '../data/epochs';
import { toast } from 'sonner';

const mockTravelHistory = [
  { id: '1', epochId: 'renaissance', date: '2025-09-15', travelers: 2 },
  { id: '2', epochId: 'ancient-egypt', date: '2025-06-20', travelers: 1 },
  { id: '3', epochId: 'belle-epoque', date: '2025-03-10', travelers: 3 },
];

export const ProfilePage = () => {
  const { userProfile, setUserProfile } = useBooking();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || 'Jean Dupont',
    email: userProfile?.email || 'jean.dupont@chronovoyage.fr',
  });

  const handleSave = () => {
    setUserProfile({
      name: formData.name,
      email: formData.email,
      preferences: ['culture', 'adventure'],
      travelHistory: mockTravelHistory.map(h => h.epochId)
    });
    setIsEditing(false);
    toast.success('Profil mis à jour !');
  };

  const favoriteEpochs = epochs.filter(e => 
    ['renaissance', 'ancient-egypt', 'belle-epoque'].includes(e.id)
  );

  const completedTrips = mockTravelHistory.map(trip => {
    const epoch = epochs.find(e => e.id === trip.epochId);
    return { ...trip, epoch };
  }).filter(trip => trip.epoch);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Mon Profil
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900/50 border-purple-500/20">
              <CardHeader className="text-center pb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name" className="text-slate-300 text-sm">Nom</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-slate-800 border-slate-700 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-slate-300 text-sm">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-slate-800 border-slate-700 mt-1"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-white">{formData.name}</h2>
                    <p className="text-slate-400">{formData.email}</p>
                  </>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-purple-600 hover:bg-purple-500"
                    >
                      Enregistrer
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Annuler
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="w-full gap-2 border-purple-400 text-purple-300"
                  >
                    <Settings className="w-4 h-4" />
                    Modifier le profil
                  </Button>
                )}

                <div className="pt-4 border-t border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Statut
                    </span>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      Voyageur Elite
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Voyages
                    </span>
                    <span className="font-bold text-purple-400">{mockTravelHistory.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Points
                    </span>
                    <span className="font-bold text-purple-400">1,250</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="history" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-slate-900/50">
                <TabsTrigger value="history" className="data-[state=active]:bg-purple-600">
                  <Clock className="w-4 h-4 mr-2" />
                  Historique
                </TabsTrigger>
                <TabsTrigger value="favorites" className="data-[state=active]:bg-purple-600">
                  <Heart className="w-4 h-4 mr-2" />
                  Favoris
                </TabsTrigger>
              </TabsList>

              {/* Travel History */}
              <TabsContent value="history" className="space-y-4">
                <Card className="bg-slate-900/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-300">
                      Mes voyages temporels
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {completedTrips.map((trip, index) => (
                      <motion.div
                        key={trip.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-colors"
                      >
                        <img
                          src={trip.epoch!.image}
                          alt={trip.epoch!.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-white">{trip.epoch!.name}</h3>
                              <p className="text-sm text-slate-400">{trip.epoch!.year}</p>
                            </div>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              Terminé
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(trip.date).toLocaleDateString('fr-FR')}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {trip.travelers} voyageur{trip.travelers > 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {completedTrips.length === 0 && (
                      <div className="text-center py-12">
                        <Clock className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400">
                          Aucun voyage pour le moment
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 border-purple-500/20">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-1">
                        {mockTravelHistory.length}
                      </div>
                      <div className="text-sm text-slate-400">Époques visitées</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-pink-900/30 to-pink-800/30 border-pink-500/20">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-pink-400 mb-1">
                        {mockTravelHistory.reduce((sum, t) => sum + t.travelers, 0)}
                      </div>
                      <div className="text-sm text-slate-400">Voyageurs accompagnés</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border-yellow-500/20">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-yellow-400 mb-1">
                        1,250
                      </div>
                      <div className="text-sm text-slate-400">Points fidélité</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Favorites */}
              <TabsContent value="favorites" className="space-y-4">
                <Card className="bg-slate-900/50 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-300">
                      Mes époques favorites
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {favoriteEpochs.map((epoch, index) => (
                      <motion.div
                        key={epoch.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-colors group"
                      >
                        <img
                          src={epoch.image}
                          alt={epoch.name}
                          className="w-32 h-24 object-cover rounded-lg group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-white text-lg">{epoch.name}</h3>
                              <p className="text-sm text-slate-400">{epoch.period}</p>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-pink-400 hover:text-pink-300"
                            >
                              <Heart className="w-5 h-5 fill-current" />
                            </Button>
                          </div>
                          <p className="text-sm text-slate-300 line-clamp-2 mb-3">
                            {epoch.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-purple-400">
                              {epoch.price.toLocaleString()} €
                            </span>
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-500">
                              Réserver
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
