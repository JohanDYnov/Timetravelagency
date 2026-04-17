import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import { quizQuestions, getQuizResult, getCategoryRecommendation } from '../data/quiz';
import { getEpochsByCategory } from '../data/epochs';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Progress } from '../components/ui/progress';

export const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed
      const category = getQuizResult(newAnswers);
      setResult(category);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const recommendedEpochs = result ? getEpochsByCategory(result) : [];

  if (result) {
    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-300">
              Vos résultats sont prêts !
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {getCategoryRecommendation(result)}
            </p>
          </div>

          {/* Recommended Epochs */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {recommendedEpochs.map((epoch, index) => (
              <motion.div
                key={epoch.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link to={`/epoch/${epoch.id}`}>
                  <Card className="group overflow-hidden bg-slate-900/50 border-purple-500/20 hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/20 h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={epoch.image}
                        alt={epoch.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors">
                        {epoch.name}
                      </h3>
                      <p className="text-sm text-slate-400 mb-3">{epoch.period}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-purple-400">
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

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={resetQuiz}
              variant="outline"
              className="gap-2 border-purple-400 text-purple-300"
            >
              <RotateCcw className="w-4 h-4" />
              Refaire le quiz
            </Button>
            <Link to="/catalogue">
              <Button className="gap-2 bg-purple-600 hover:bg-purple-500">
                Voir tout le catalogue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-purple-300">Questionnaire personnalisé</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Quelle époque est faite pour vous ?
          </h1>
          <p className="text-slate-300">
            Répondez à 5 questions pour découvrir vos destinations idéales
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">
              Question {currentQuestion + 1} sur {quizQuestions.length}
            </span>
            <span className="text-sm text-purple-400 font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-slate-900/50 border-purple-500/20 mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  {question.question}
                </h2>

                <div className="space-y-4">
                  {question.options.map((option, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswer(option.value)}
                      className="w-full p-6 rounded-xl border-2 border-slate-700 hover:border-purple-500 bg-slate-800/50 hover:bg-purple-500/10 transition-all text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg text-slate-300 group-hover:text-purple-300 transition-colors">
                          {option.text}
                        </span>
                        <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-purple-400 transition-colors" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={goBack}
            variant="ghost"
            className="gap-2"
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="w-4 h-4" />
            Précédent
          </Button>
          <Link to="/catalogue">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              Passer le quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
