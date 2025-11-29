import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Shuffle, Trophy, RotateCcw } from 'lucide-react';

interface RandomPickerProps {
  onResult: (result: string, options: string[]) => void;
}

export const RandomPicker = ({ onResult }: RandomPickerProps) => {
  const [inputText, setInputText] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  const parseItems = () => {
    const parsed = inputText
      .split(/[\n,;]/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
    setItems(parsed);
    return parsed;
  };

  const selectRandom = () => {
    const currentItems = items.length > 0 ? items : parseItems();
    if (currentItems.length === 0) return;

    setIsSelecting(true);
    setWinner(null);

    const winnerIndex = Math.floor(Math.random() * currentItems.length);
    let currentIndex = 0;
    let speed = 50;
    let iterations = 0;
    const maxIterations = 20 + Math.floor(Math.random() * 10);

    const animate = () => {
      setHighlightIndex(currentIndex);
      currentIndex = (currentIndex + 1) % currentItems.length;
      iterations++;

      if (iterations < maxIterations) {
        speed = Math.min(speed * 1.15, 300);
        setTimeout(animate, speed);
      } else {
        setHighlightIndex(winnerIndex);
        setTimeout(() => {
          setWinner(currentItems[winnerIndex]);
          setIsSelecting(false);
          onResult(currentItems[winnerIndex], currentItems);
        }, 500);
      }
    };

    animate();
  };

  const reset = () => {
    setWinner(null);
    setHighlightIndex(null);
  };

  const hasItems = items.length > 0 || inputText.trim().length > 0;

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto py-6">
      <div className="space-y-3">
        <p className="text-sm font-medium font-fredoka text-muted-foreground ml-1">
          Введите варианты (через запятую или с новой строки):
        </p>
        <Textarea
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            setItems([]);
            setWinner(null);
          }}
          placeholder="Пример:&#10;Пицца&#10;Суши&#10;Бургер&#10;Паста"
          className="min-h-32 resize-none rounded-xl border-2 border-border focus-visible:ring-primary focus-visible:ring-offset-0 bg-white text-lg p-4"
        />
      </div>

      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-3"
        >
          <p className="text-sm font-bold font-fredoka ml-1">
            Варианты ({items.length}):
          </p>
          <div className="flex flex-wrap gap-3 max-h-40 overflow-y-auto p-4 rounded-xl bg-secondary border-2 border-black/5">
            {items.map((item, index) => (
              <motion.span
                key={`${item}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: highlightIndex === index ? 1.1 : 1,
                  backgroundColor:
                    highlightIndex === index
                      ? '#6C5DD3'
                      : winner === item
                      ? '#0FBD8C'
                      : '#ffffff',
                  color:
                    highlightIndex === index || winner === item
                      ? 'white'
                      : 'black',
                  borderColor: 
                    highlightIndex === index || winner === item
                      ? 'black'
                      : 'rgba(0,0,0,0.1)',
                }}
                transition={{ duration: 0.1 }}
                className="px-4 py-2 rounded-lg text-sm font-bold border-2 shadow-sm transition-colors duration-200"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {winner && !isSelecting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="text-center py-8 bg-accent-yellow rounded-3xl border-2 border-black shadow-neo rotate-1"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <Trophy className="h-10 w-10 text-black mx-auto mb-2" />
            </motion.div>
            <p className="text-black/70 font-medium mb-1 font-fredoka">Выбор пал на:</p>
            <p className="text-4xl md:text-5xl font-bold text-black font-fredoka tracking-tight">{winner}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center gap-4">
        <Button
          onClick={() => {
            if (items.length === 0) parseItems();
            selectRandom();
          }}
          disabled={!hasItems || isSelecting}
          size="lg"
          className="bg-primary text-white px-12 py-6 text-xl rounded-2xl shadow-neo border-2 border-black hover:translate-y-1 hover:shadow-none transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-neo"
        >
          <Shuffle className="mr-3 h-6 w-6" />
          {isSelecting ? 'Выбираем...' : items.length > 0 ? 'Выбрать' : 'Разобрать и выбрать'}
        </Button>

        {winner && !isSelecting && (
          <Button
            onClick={reset}
            variant="outline"
            size="lg"
            className="px-6 py-6 rounded-2xl border-2 border-border hover:bg-secondary hover:border-black/20"
          >
            <RotateCcw className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
};
