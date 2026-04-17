import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { epochs } from '../data/epochs';
import { Button } from './ui/button';
import { Card } from './ui/card';

export const TimelineSlider = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sortedEpochs = [...epochs].sort((a, b) => {
    const yearA = parseInt(a.year.replace(/[^0-9-]/g, ''));
    const yearB = parseInt(b.year.replace(/[^0-9-]/g, ''));
    return yearA - yearB;
  });

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : sortedEpochs.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < sortedEpochs.length - 1 ? prev + 1 : 0));
  };

  const selectedEpoch = sortedEpochs[selectedIndex];

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-purple-400" />
        <h3 className="text-xl font-bold text-purple-300">Frise Chronologique</h3>
      </div>

      {/* Timeline bar */}
      <div className="relative mb-8">
        {/* Line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-purple-500/30 -translate-y-1/2" />
        
        {/* Epoch markers */}
        <div className="relative flex justify-between items-center px-4">
          {sortedEpochs.map((epoch, index) => (
            <button
              key={epoch.id}
              onClick={() => setSelectedIndex(index)}
              className={`relative group transition-all ${
                index === selectedIndex ? 'z-10' : 'z-0'
              }`}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: index === selectedIndex ? 1.5 : 1,
                }}
                className={`w-4 h-4 rounded-full border-4 transition-colors ${
                  index === selectedIndex
                    ? 'bg-purple-400 border-purple-600'
                    : 'bg-slate-700 border-slate-800 hover:bg-purple-500/50'
                }`}
              />
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-lg border border-purple-500/30">
                  <div className="font-bold">{epoch.name}</div>
                  <div className="text-slate-400">{epoch.year}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Epoch Card */}
      <motion.div
        key={selectedEpoch.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="bg-slate-900/50 border-purple-500/20 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Image */}
            <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
              <img
                src={selectedEpoch.image}
                alt={selectedEpoch.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className="text-sm text-purple-300 mb-1">{selectedEpoch.year}</div>
                <h3 className="text-2xl font-bold text-white">{selectedEpoch.name}</h3>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="text-sm text-purple-300 mb-2">{selectedEpoch.period}</div>
                <p className="text-slate-300 mb-4 line-clamp-3">
                  {selectedEpoch.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedEpoch.highlights.slice(0, 3).map((highlight, idx) => (
                    <div key={idx} className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div>
                  <div className="text-sm text-slate-400">À partir de</div>
                  <div className="text-2xl font-bold text-purple-400">
                    {selectedEpoch.price.toLocaleString()} €
                  </div>
                </div>
                <Link to={`/epoch/${selectedEpoch.id}`}>
                  <Button className="bg-purple-600 hover:bg-purple-500">
                    Découvrir
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <Button
          onClick={handlePrevious}
          variant="outline"
          size="icon"
          className="border-purple-500/30 hover:bg-purple-500/10"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        
        <div className="text-center">
          <div className="text-sm text-slate-400">
            Époque {selectedIndex + 1} sur {sortedEpochs.length}
          </div>
        </div>

        <Button
          onClick={handleNext}
          variant="outline"
          size="icon"
          className="border-purple-500/30 hover:bg-purple-500/10"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
