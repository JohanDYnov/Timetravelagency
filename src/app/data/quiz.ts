export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    value: string;
  }[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Quel type d'aventure vous attire le plus ?",
    options: [
      { text: "L'action et l'adrénaline 🦖", value: "adventure" },
      { text: "L'art et la culture 🎨", value: "culture" },
      { text: "La nature sauvage 🌿", value: "nature" },
      { text: "La technologie et l'innovation 🚀", value: "technology" }
    ]
  },
  {
    id: 2,
    question: "Comment préférez-vous voyager ?",
    options: [
      { text: "En explorant des terres dangereuses", value: "adventure" },
      { text: "En visitant musées et monuments", value: "culture" },
      { text: "En pleine nature", value: "nature" },
      { text: "Dans des environnements futuristes", value: "technology" }
    ]
  },
  {
    id: 3,
    question: "Quelle activité vous tente le plus ?",
    options: [
      { text: "Safari ou expédition extrême", value: "adventure" },
      { text: "Rencontrer des artistes célèbres", value: "culture" },
      { text: "Observer la faune et la flore", value: "nature" },
      { text: "Tester des technologies révolutionnaires", value: "technology" }
    ]
  },
  {
    id: 4,
    question: "Quel niveau de risque acceptez-vous ?",
    options: [
      { text: "Élevé - j'aime le danger !", value: "adventure" },
      { text: "Modéré - avec des précautions", value: "culture" },
      { text: "Faible - la sécurité avant tout", value: "nature" },
      { text: "Contrôlé - technologie avancée", value: "technology" }
    ]
  },
  {
    id: 5,
    question: "Quel environnement vous fascine ?",
    options: [
      { text: "Jungles préhistoriques et volcans", value: "adventure" },
      { text: "Cités antiques et palais", value: "culture" },
      { text: "Forêts vierges et paysages naturels", value: "nature" },
      { text: "Mégapoles du futur et vaisseaux spatiaux", value: "technology" }
    ]
  }
];

export const getQuizResult = (answers: string[]): string => {
  const counts: { [key: string]: number } = {};
  
  answers.forEach(answer => {
    counts[answer] = (counts[answer] || 0) + 1;
  });
  
  let maxCategory = '';
  let maxCount = 0;
  
  Object.keys(counts).forEach(category => {
    if (counts[category] > maxCount) {
      maxCount = counts[category];
      maxCategory = category;
    }
  });
  
  return maxCategory;
};

export const getCategoryRecommendation = (category: string): string => {
  const recommendations: { [key: string]: string } = {
    adventure: "Vous êtes un aventurier dans l'âme ! Les époques préhistoriques et médiévales sont faites pour vous.",
    culture: "Vous êtes un passionné d'art et d'histoire ! Explorez les grandes civilisations comme l'Égypte, Rome ou la Renaissance.",
    nature: "Vous aimez la nature ! Découvrez les paysages vierges de la Préhistoire ou les jardins de la Belle Époque.",
    technology: "Vous êtes fasciné par le progrès ! Le Futur 2150 vous attend avec ses merveilles technologiques."
  };
  
  return recommendations[category] || recommendations.adventure;
};
