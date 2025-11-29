import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, HelpCircle } from 'lucide-react';

interface YesNoDecisionProps {
  onResult: (result: string) => void;
}

export const YesNoDecision = ({ onResult }: YesNoDecisionProps) => {
  const [result, setResult] = useState<'yes' | 'no' | 'maybe' | null>(null);
  const [isDeciding, setIsDeciding] = useState(false);
  const [includesMaybe, setIncludesMaybe] = useState(false);

  const decide = () => {
    if (isDeciding) return;
    setIsDeciding(true);
    setResult(null);

    const options: ('yes' | 'no' | 'maybe')[] = includesMaybe
      ? ['yes', 'no', 'maybe']
      : ['yes', 'no'];
    const newResult = options[Math.floor(Math.random() * options.length)];

    let iterations = 0;
    const maxIterations = 15;
    const interval = setInterval(() => {
      setResult(options[Math.floor(Math.random() * options.length)]);
      iterations++;
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setResult(newResult);
        setIsDeciding(false);
        const resultText =
          newResult === 'yes' ? 'Да' : newResult === 'no' ? 'Нет' : 'Возможно';
        onResult(resultText);
      }
    }, 100);
  };

  const getResultConfig = () => {
    switch (result) {
      case 'yes':
        return {
          icon: ThumbsUp,
          text: 'Да',
          bgColor: 'bg-accent-mint',
          textColor: 'text-white',
        };
      case 'no':
        return {
          icon: ThumbsDown,
          text: 'Нет',
          bgColor: 'bg-accent-coral',
          textColor: 'text-white',
        };
      case 'maybe':
        return {
          icon: HelpCircle,
          text: 'Возможно',
          bgColor: 'bg-accent-yellow',
          textColor: 'text-black',
        };
      default:
        return null;
    }
  };

  const config = getResultConfig();

  return (
    <div className="flex flex-col items-center gap-10 py-8">
      <div className="flex items-center gap-3">
        <Button
          variant={includesMaybe ? 'default' : 'outline'}
          size="sm"
          onClick={() => setIncludesMaybe(!includesMaybe)}
          className={`rounded-full border-2 border-black/10 hover:border-primary hover:bg-secondary ${includesMaybe ? 'bg-primary text-white hover:bg-primary/90 border-transparent' : 'bg-white'}`}
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          Добавить "Возможно"
        </Button>
      </div>

      <div className="min-h-72 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {result && config ? (
            <motion.div
              key={result}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                transition: {
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                },
              }}
              exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
              className="text-center relative"
            >
              {/* Decorative elements behind */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-black/5 -z-10 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-primary/20 -z-10" />

              <motion.div
                className={`w-48 h-48 md:w-56 md:h-56 rounded-[2rem] ${config.bgColor} flex items-center justify-center mb-6 mx-auto border-4 border-black shadow-neo`}
                animate={
                  isDeciding
                    ? { rotate: [0, -5, 5, -5, 0] }
                    : { scale: [1, 1.05, 1] }
                }
                transition={
                  isDeciding
                    ? { duration: 0.3, repeat: Infinity }
                    : { duration: 2, repeat: Infinity }
                }
              >
                <config.icon
                  className={`w-24 h-24 md:w-28 md:h-28 ${config.textColor}`}
                  strokeWidth={2.5}
                />
              </motion.div>
              <motion.p
                className={`text-6xl md:text-7xl font-bold font-fredoka tracking-tight ${result === 'maybe' ? 'text-accent-yellow' : result === 'yes' ? 'text-accent-mint' : 'text-accent-coral'}`}
                style={{ 
                    textShadow: '2px 2px 0px black',
                    WebkitTextStroke: '2px black'
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {config.text}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-[2rem] bg-secondary flex items-center justify-center mb-6 mx-auto border-4 border-dashed border-black/10 group-hover:border-primary/50 transition-colors">
                <span className="text-8xl opacity-20 font-fredoka font-bold">?</span>
              </div>
              <p className="text-muted-foreground font-medium font-fredoka text-lg">Нажмите кнопку ниже</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Button
        onClick={decide}
        disabled={isDeciding}
        size="lg"
        className="bg-primary text-white px-12 py-6 text-xl rounded-2xl shadow-neo border-2 border-black hover:translate-y-1 hover:shadow-none transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-neo"
      >
        {isDeciding ? 'Думаем...' : 'Получить ответ'}
      </Button>
    </div>
  );
};
