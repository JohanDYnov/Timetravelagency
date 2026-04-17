import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Clock, Sparkles, Compass, MessageCircle, ArrowRight, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { epochs } from '../data/epochs';

export const HomePage = () => {
  const featuredEpochs = epochs.slice(0, 3);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1671647485629-4cdfd5d526ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aW1lJTIwdHJhdmVsJTIwY2xvY2slMjBwb3J0YWwlMjBzcGFjZXxlbnwxfHx8fDE3NzY0MTM4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080')] bg-cover bg-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/50 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              <span className="text-purple-300 text-lg">Bienvenue dans le voyage temporel</span>
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Explorez toutes les époques de l'Histoire
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto">
              De la préhistoire au futur lointain, vivez des aventures extraordinaires à travers le temps
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/catalogue">
                <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
                  <Compass className="w-5 h-5" />
                  Explorer le catalogue
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/quiz">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8 py-6 border-purple-400 text-purple-300 hover:bg-purple-950/50">
                  <Sparkles className="w-5 h-5" />
                  Quelle époque pour moi ?
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-4xl font-bold text-purple-400">8</div>
                <div className="text-slate-400">Époques</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-4xl font-bold text-pink-400">50+</div>
                <div className="text-slate-400">Activités</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-4xl font-bold text-yellow-400">100%</div>
                <div className="text-slate-400">Sécurité</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-purple-300">
            Destinations phares
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredEpochs.map((epoch, index) => (
              <motion.div
                key={epoch.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/epoch/${epoch.id}`}>
                  <Card className="group overflow-hidden bg-slate-900/50 border-purple-500/20 hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/20">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={epoch.image}
                        alt={epoch.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          Populaire
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-300">{epoch.year}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-white">{epoch.name}</h3>
                      <p className="text-slate-400 mb-4 line-clamp-2">{epoch.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-purple-400">
                          {epoch.price.toLocaleString()} €
                        </span>
                        <Button size="sm" className="gap-2 bg-purple-600 hover:bg-purple-500">
                          Découvrir
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/catalogue">
              <Button size="lg" variant="outline" className="gap-2 border-purple-400 text-purple-300">
                Voir toutes les destinations
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/20 p-8">
              <Sparkles className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-white">Quiz personnalisé</h3>
              <p className="text-slate-300 mb-6">
                Pas sûr de votre destination ? Notre quiz intelligent vous recommande l'époque parfaite selon vos préférences !
              </p>
              <Link to="/quiz">
                <Button className="gap-2 bg-purple-600 hover:bg-purple-500">
                  Faire le quiz
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 border-purple-500/20 p-8">
              <MessageCircle className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-white">Conseiller virtuel</h3>
              <p className="text-slate-300 mb-6">
                Notre agent conversationnel vous aide à planifier le voyage temporel idéal, répondant à toutes vos questions.
              </p>
              <Link to="/chatbot">
                <Button className="gap-2 bg-pink-600 hover:bg-pink-500">
                  Discuter maintenant
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1583936073869-f62de4d7d4da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY29tcGFzcyUyMGFudGlxdWUlMjBleHBsb3JlcnxlbnwxfHx8fDE3NzY0MTM4NTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Adventure"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-950/90 to-pink-950/90" />
          </div>
          <div className="relative z-10 text-center p-12 md:p-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Prêt pour l'aventure de votre vie ?
            </h2>
            <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de voyageurs temporels et découvrez l'Histoire comme jamais auparavant
            </p>
            <Link to="/catalogue">
              <Button size="lg" className="gap-2 text-lg px-8 py-6 bg-white text-purple-900 hover:bg-slate-100">
                <Clock className="w-5 h-5" />
                Commencer mon voyage
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
