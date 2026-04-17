import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Clock, Filter, Star, ArrowRight } from 'lucide-react';
import { epochs } from '../data/epochs';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { TimelineSlider } from '../components/TimelineSlider';

export const CataloguePage = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredEpochs = filter === 'all' 
    ? epochs 
    : epochs.filter(e => e.category === filter);

  const categoryLabels: { [key: string]: string } = {
    all: 'Toutes',
    adventure: 'Aventure',
    culture: 'Culture',
    nature: 'Nature',
    technology: 'Technologie'
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Catalogue des Époques
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Parcourez notre sélection complète de destinations temporelles
        </p>
      </motion.div>

      {/* Timeline Slider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-16"
      >
        <Card className="bg-slate-900/30 border-purple-500/20 p-8">
          <TimelineSlider />
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-6">
          <Filter className="w-5 h-5 text-purple-400" />
          <span className="text-slate-300 font-medium">Filtrer par catégorie :</span>
        </div>

        <Tabs value={filter} onValueChange={setFilter} className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-5 gap-2 bg-slate-900/50">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="data-[state=active]:bg-purple-600"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="mt-4 text-sm text-slate-400">
          {filteredEpochs.length} destination{filteredEpochs.length > 1 ? 's' : ''} disponible{filteredEpochs.length > 1 ? 's' : ''}
        </div>
      </motion.div>

      {/* Epochs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEpochs.map((epoch, index) => (
          <motion.div
            key={epoch.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link to={`/epoch/${epoch.id}`}>
              <Card className="group overflow-hidden bg-slate-900/50 border-purple-500/20 hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/20 h-full">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={epoch.image}
                    alt={epoch.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600/90 backdrop-blur-sm">
                      {categoryLabels[epoch.category]}
                    </Badge>
                  </div>

                  {/* Popular badge for some */}
                  {index < 3 && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-yellow-500/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-sm flex items-center gap-1 font-medium">
                        <Star className="w-3 h-3 fill-current" />
                        Top
                      </div>
                    </div>
                  )}

                  {/* Year */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{epoch.year}</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors">
                    {epoch.name}
                  </h3>
                  <p className="text-sm text-slate-400 mb-1">{epoch.period}</p>
                  <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                    {epoch.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">À partir de</div>
                      <div className="text-xl font-bold text-purple-400">
                        {epoch.price.toLocaleString()} €
                      </div>
                    </div>
                    <Button size="sm" className="gap-2 bg-purple-600 hover:bg-purple-500">
                      Voir
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Duration */}
                  <div className="mt-3 text-xs text-slate-500">
                    Durée : {epoch.duration}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {filteredEpochs.length === 0 && (
        <div className="text-center py-20">
          <div className="text-slate-400 text-lg">
            Aucune destination ne correspond à ce filtre
          </div>
        </div>
      )}
    </div>
  );
};