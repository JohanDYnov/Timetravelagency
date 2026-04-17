import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, X, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { epochs } from '../data/epochs';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const predefinedResponses: { [key: string]: string } = {
  bonjour: "Bonjour ! 👋 Je suis votre conseiller de voyage temporel. Je peux vous aider à choisir l'époque parfaite pour votre prochaine aventure. Quel type d'expérience recherchez-vous ?",
  aide: "Je peux vous aider à : \n• Trouver l'époque idéale selon vos préférences\n• Répondre à vos questions sur chaque destination\n• Vous conseiller sur les activités disponibles\n• Vous informer sur les précautions à prendre\n\nQue souhaitez-vous savoir ?",
  prix: "Nos voyages temporels varient de 13 000€ à 30 000€ selon l'époque et la durée. La Préhistoire et le Futur 2150 sont nos destinations premium. Souhaitez-vous connaître les prix détaillés d'une époque en particulier ?",
  danger: "Chaque époque comporte ses propres risques, mais votre sécurité est notre priorité ! Nos capsules temporelles sont équipées de technologies de pointe. Nos guides vous briefent sur tous les dangers potentiels et les protocoles de sécurité. Quelle époque vous intéresse ?",
  aventure: "Pour les amateurs d'aventure, je recommande : la Préhistoire pour l'exploration extrême 🦖, le Moyen Âge pour les tournois de chevalerie ⚔️, ou l'Égypte Ancienne pour les mystères des pyramides 🏛️. Laquelle vous tente le plus ?",
  culture: "Les passionnés de culture adoreront : la Renaissance pour l'art et les génies 🎨, Rome Antique pour l'architecture et l'histoire 🏛️, ou la Belle Époque pour l'élégance parisienne 🗼. Que préférez-vous ?",
  futur: "Le Futur 2150 est notre destination la plus avancée ! Découvrez les villes volantes, les transports antigravité, et l'intelligence artificielle omniprésente. C'est une expérience extraordinaire à 30 000€ pour 10 jours. Voulez-vous en savoir plus ?",
  default: "Je ne suis pas sûr de bien comprendre votre question. Vous pouvez me demander des informations sur :\n• Les différentes époques disponibles\n• Les prix et durées de voyage\n• Les activités et expériences\n• Les recommandations selon vos goûts\n\nComment puis-je vous aider ?"
};

const quickSuggestions = [
  "Quelle époque pour l'aventure ?",
  "Destinations culturelles",
  "Budget économique"
];

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Bonjour ! 👋 Je suis ChronoBot, votre assistant de voyage temporel. Comment puis-je vous aider ?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.type === 'bot') {
        setUnreadCount(prev => prev + 1);
      }
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const getResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();

    const mentionedEpoch = epochs.find(e => 
      lower.includes(e.name.toLowerCase()) || 
      lower.includes(e.period.toLowerCase())
    );

    if (mentionedEpoch) {
      return `Excellent choix ! ${mentionedEpoch.name} (${mentionedEpoch.year}) est une destination ${mentionedEpoch.category === 'adventure' ? 'palpitante' : mentionedEpoch.category === 'culture' ? 'culturelle fascinante' : 'extraordinaire'}.\n\n${mentionedEpoch.description}\n\nPrix : ${mentionedEpoch.price.toLocaleString()}€ pour ${mentionedEpoch.duration}\n\nVoulez-vous en savoir plus sur cette époque ?`;
    }

    if (lower.includes('bonjour') || lower.includes('salut') || lower.includes('hello')) {
      return predefinedResponses.bonjour;
    }
    if (lower.includes('aide') || lower.includes('help')) {
      return predefinedResponses.aide;
    }
    if (lower.includes('prix') || lower.includes('coût') || lower.includes('tarif') || lower.includes('budget')) {
      return predefinedResponses.prix;
    }
    if (lower.includes('danger') || lower.includes('risque') || lower.includes('sécurité') || lower.includes('sûr')) {
      return predefinedResponses.danger;
    }
    if (lower.includes('aventure') || lower.includes('action') || lower.includes('extrême')) {
      return predefinedResponses.aventure;
    }
    if (lower.includes('culture') || lower.includes('art') || lower.includes('histoire') || lower.includes('musée')) {
      return predefinedResponses.culture;
    }
    if (lower.includes('futur') || lower.includes('2150') || lower.includes('technologie')) {
      return predefinedResponses.futur;
    }
    if (lower.includes('famille') || lower.includes('enfants')) {
      return "Pour un voyage en famille, je recommande la Belle Époque ou la Renaissance - deux époques fascinantes et relativement sûres avec de nombreuses activités culturelles adaptées à tous les âges. Combien êtes-vous ?";
    }
    if (lower.includes('économique') || lower.includes('pas cher') || lower.includes('moins cher')) {
      return "Notre destination la plus économique est la Belle Époque à 13 000€ pour 7 jours. Le Moyen Âge (14 000€) et la Révolution Française (15 000€) sont également très abordables. Laquelle vous intéresse ?";
    }

    return predefinedResponses.default;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(input);
      const botMessage: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <>
      {/* Chat Widget Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Button
                onClick={() => setIsOpen(true)}
                size="lg"
                className="h-16 w-16 rounded-full shadow-lg shadow-purple-500/50 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 relative group"
              >
                <MessageCircle className="w-8 h-8" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                    {unreadCount}
                  </div>
                )}
                <div className="absolute -top-12 right-0 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  Besoin d'aide ?
                </div>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] max-h-[calc(100vh-100px)]"
          >
            <Card className="h-full bg-slate-900/95 border-purple-500/30 backdrop-blur-xl shadow-2xl shadow-purple-500/20 flex flex-col overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">ChronoBot</h3>
                    <p className="text-xs text-purple-100">En ligne</p>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Chat Area */}
              <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'bot' 
                          ? 'bg-gradient-to-br from-purple-600 to-pink-600' 
                          : 'bg-slate-700'
                      }`}>
                        {message.type === 'bot' ? (
                          <Bot className="w-4 h-4 text-white" />
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`flex-1 ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                        <div className={`inline-block max-w-[85%] p-3 rounded-2xl text-sm ${
                          message.type === 'bot'
                            ? 'bg-slate-800 text-slate-200'
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        }`}>
                          <p className="whitespace-pre-line">{message.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-2"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-slate-800 p-3 rounded-2xl">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Quick Suggestions */}
              {messages.length <= 2 && (
                <div className="border-t border-slate-700 p-3 bg-slate-900/50 flex-shrink-0">
                  <div className="flex items-center gap-1 mb-2">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    <span className="text-xs text-slate-400">Suggestions :</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {quickSuggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuickSuggestion(suggestion)}
                        className="text-xs h-7 border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/10"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <CardContent className="p-3 border-t border-slate-700 flex-shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Votre message..."
                    className="flex-1 bg-slate-800 border-slate-700 focus:border-purple-500 text-sm h-10"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 h-10 w-10"
                    disabled={!input.trim() || isTyping}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
