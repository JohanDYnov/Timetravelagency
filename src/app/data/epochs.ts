export interface Epoch {
  id: string;
  name: string;
  period: string;
  year: string;
  description: string;
  image: string;
  highlights: string[];
  activities: string[];
  dangers: string[];
  weather: string;
  price: number;
  duration: string;
  category: 'adventure' | 'culture' | 'nature' | 'technology';
  ambientSound?: string;
}

export const epochs: Epoch[] = [
  {
    id: 'prehistoric',
    name: 'Préhistoire',
    period: 'Mésozoïque',
    year: '-65 000 000',
    description: 'Explorez l\'ère des dinosaures et des paysages primitifs spectaculaires. Une expérience unique au cœur de la vie préhistorique.',
    image: 'https://images.unsplash.com/photo-1551084540-e38705adad4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVoaXN0b3JpYyUyMGxhbmRzY2FwZSUyMGRpbm9zYXVyc3xlbnwxfHx8fDE3NzY0MTM4NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    highlights: [
      'Observation des T-Rex dans leur habitat naturel',
      'Forêts luxuriantes et volcans actifs',
      'Rencontre avec les premiers mammifères',
      'Paysages vierges jamais vus par l\'homme'
    ],
    activities: [
      'Safari dinosaure en capsule blindée',
      'Exploration de grottes préhistoriques',
      'Observation volcanique',
      'Photographie de la faune primitive'
    ],
    dangers: [
      'Prédateurs géants',
      'Activité volcanique',
      'Végétation toxique',
      'Insectes de taille XXL'
    ],
    weather: 'Chaud et humide, orages fréquents',
    price: 25000,
    duration: '7 jours',
    category: 'adventure'
  },
  {
    id: 'ancient-egypt',
    name: 'Égypte Ancienne',
    period: 'Nouvel Empire',
    year: '-1250',
    description: 'Découvrez les mystères des pyramides et la splendeur de la civilisation égyptienne à son apogée.',
    image: 'https://images.unsplash.com/photo-1606419598102-95ead4deaf4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHQlMjBweXJhbWlkcyUyMHNwaGlueHxlbnwxfHx8fDE3NzYzNjU1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    highlights: [
      'Construction des pyramides en direct',
      'Audience avec les pharaons',
      'Temples de Karnak et Louxor',
      'Naviguation sur le Nil'
    ],
    activities: [
      'Visite guidée des pyramides en construction',
      'Participation aux cérémonies religieuses',
      'Cours de hiéroglyphes',
      'Croisière sur le Nil'
    ],
    dangers: [
      'Chaleur extrême du désert',
      'Maladies anciennes',
      'Protocole royal strict',
      'Scorpions et serpents'
    ],
    weather: 'Très chaud et sec, nuits fraîches',
    price: 18000,
    duration: '10 jours',
    category: 'culture'
  },
  {
    id: 'ancient-rome',
    name: 'Rome Antique',
    period: 'Empire Romain',
    year: '80',
    description: 'Vivez la grandeur de Rome à l\'époque impériale, entre gladiateurs et monuments majestueux.',
    image: 'https://images.unsplash.com/photo-1760726670895-c282b2f9deb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwcm9tZSUyMGNvbG9zc2V1bSUyMHJ1aW5zfGVufDF8fHx8MTc3NjQxMzg0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    highlights: [
      'Spectacles au Colisée',
      'Forum romain en pleine activité',
      'Thermes et aqueducs',
      'Festins impériaux'
    ],
    activities: [
      'Assister aux jeux du cirque',
      'Visite du forum et du Sénat',
      'Cours de latin',
      'Dégustation culinaire romaine'
    ],
    dangers: [
      'Complots politiques',
      'Criminalité urbaine',
      'Maladies',
      'Règles sociales strictes'
    ],
    weather: 'Méditerranéen, doux et ensoleillé',
    price: 16000,
    duration: '8 jours',
    category: 'culture'
  },
  {
    id: 'medieval',
    name: 'Moyen Âge',
    period: 'XIIIe siècle',
    year: '1250',
    description: 'Plongez dans l\'époque des châteaux forts, des chevaliers et des tournois médiévaux.',
    image: 'https://images.unsplash.com/photo-1536228366866-d72a95a476bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMGNhc3RsZSUyMGtuaWdodHMlMjBhcm1vcnxlbnwxfHx8fDE3NzY0MTM4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    highlights: [
      'Tournois de chevalerie',
      'Châteaux fortifiés',
      'Marchés médiévaux',
      'Banquets dans les grandes salles'
    ],
    activities: [
      'Assister à un tournoi de joute',
      'Visite de châteaux et forteresses',
      'Apprentissage du maniement de l\'épée',
      'Fête médiévale'
    ],
    dangers: [
      'Guerres féodales',
      'Peste et épidémies',
      'Brigands sur les routes',
      'Hygiène précaire'
    ],
    weather: 'Variable, hivers rigoureux',
    price: 14000,
    duration: '6 jours',
    category: 'adventure'
  },
  {
    id: 'renaissance',
    name: 'Renaissance',
    period: 'Quattrocento',
    year: '1490',
    description: 'Rencontrez les plus grands artistes de l\'Histoire dans la Florence des Médicis.',
    image: 'https://images.unsplash.com/photo-1685872364356-963da365a184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW5haXNzYW5jZSUyMGl0YWx5JTIwZmxvcmVuY2UlMjBhcnR8ZW58MXx8fHwxNzc2NDEzODQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    highlights: [
      'Rencontre avec Léonard de Vinci',
      'Ateliers d\'art florentin',
      'Palais des Médicis',
      'Naissance de l\'humanisme'
    ],
    activities: [
      'Cours de peinture avec les maîtres',
      'Visite des ateliers d\'artistes',
      'Concerts de musique baroque',
      'Exploration architecturale'
    ],
    dangers: [
      'Intrigues politiques',
      'Maladies',
      'Inquisition',
      'Rivalités entre familles'
    ],
    weather: 'Méditerranéen, agréable',
    price: 17000,
    duration: '9 jours',
    category: 'culture'
  },
  {
    id: 'french-revolution',
    name: 'Révolution Française',
    period: 'Période révolutionnaire',
    year: '1789',
    description: 'Soyez témoin de l\'un des moments les plus intenses de l\'Histoire de France.',
    image: 'https://images.unsplash.com/photo-1762766769172-3065e978c28e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjByZXZvbHV0aW9uJTIwcGFyaXMlMjBoaXN0b3JpY2FsfGVufDF8fHx8MTc3NjQxMzg0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    highlights: [
      'Prise de la Bastille',
      'Assemblée Nationale',
      'Paris révolutionnaire',
      'Naissance de la République'
    ],
    activities: [
      'Visite guidée du Paris révolutionnaire',
      'Assister aux débats politiques',
      'Marchés et tavernes populaires',
      'Musique et chants révolutionnaires'
    ],
    dangers: [
      'Émeutes et violence urbaine',
      'Terreur politique',
      'Pénuries alimentaires',
      'Risque d\'arrestation'
    ],
    weather: 'Continental, étés chauds',
    price: 15000,
    duration: '5 jours',
    category: 'culture'
  },
  {
    id: 'belle-epoque',
    name: 'Belle Époque',
    period: 'Fin XIXe siècle',
    year: '1900',
    description: 'Profitez de l\'élégance parisienne et de l\'effervescence culturelle du début du XXe siècle.',
    image: 'https://images.unsplash.com/photo-1741217375511-6a8a0eb47db7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWxsZSUyMGVwb3F1ZSUyMHBhcmlzJTIwMTkwMHxlbnwxfHx8fDE3NzY0MTM4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    highlights: [
      'Exposition Universelle de 1900',
      'Cabarets et music-halls',
      'Cafés littéraires',
      'Innovation et modernité'
    ],
    activities: [
      'Soirée au Moulin Rouge',
      'Promenade sur les Grands Boulevards',
      'Visite de l\'Exposition Universelle',
      'Dégustation dans les brasseries'
    ],
    dangers: [
      'Début des tensions européennes',
      'Pollution industrielle',
      'Criminalité urbaine',
      'Maladies infectieuses'
    ],
    weather: 'Tempéré, quatre saisons',
    price: 13000,
    duration: '7 jours',
    category: 'culture'
  },
  {
    id: 'future-2150',
    name: 'Futur 2150',
    period: 'Ère Néo-Technologique',
    year: '2150',
    description: 'Explorez une civilisation futuriste où technologie et nature coexistent en harmonie.',
    image: 'https://images.unsplash.com/photo-1758404196311-70c62a445e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwY2l0eSUyMG5lb24lMjBjeWJlcnB1bmt8ZW58MXx8fHwxNzc2MjkzMDMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    highlights: [
      'Villes volantes et gratte-ciels organiques',
      'Transports à antigravité',
      'Intelligence artificielle omniprésente',
      'Colonies spatiales visibles'
    ],
    activities: [
      'Vol en véhicule antigravité',
      'Visite de la station spatiale',
      'Expériences de réalité virtuelle totale',
      'Cuisine moléculaire futuriste'
    ],
    dangers: [
      'Dépendance technologique',
      'Zones interdites par l\'IA',
      'Contamination temporelle',
      'Chocs culturels intenses'
    ],
    weather: 'Contrôlé artificiellement, parfait',
    price: 30000,
    duration: '10 jours',
    category: 'technology'
  }
];

export const getEpochById = (id: string): Epoch | undefined => {
  return epochs.find(epoch => epoch.id === id);
};

export const getEpochsByCategory = (category: string): Epoch[] => {
  if (category === 'all') return epochs;
  return epochs.filter(epoch => epoch.category === category);
};
