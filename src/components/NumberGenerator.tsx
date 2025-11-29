import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Dices, Copy, Check } from 'lucide-react';

interface NumberGeneratorProps {
  onResult: (result: string) => void;
}

export const NumberGenerator = ({ onResult }: NumberGeneratorProps) => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setResults([]);

    const numbers: number[] = [];
    for (let i = 0; i < count; i++) {
      numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    let current = 0;
    const interval = setInterval(() => {
      if (current < 10) {
        setResults(
          Array.from({ length: count }, () =>
            Math.floor(Math.random() * (max - min + 1)) + min
          )
        );
        current++;
      } else {
        clearInterval(interval);
        setResults(numbers);
        setIsGenerating(false);
        onResult(numbers.join(', '));
      }
    }, 50);
  };

  const copyResults = () => {
    navigator.clipboard.writeText(results.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMinChange = (value: string) => {
    const num = parseInt(value) || 0;
    setMin(num);
    if (num > max) setMax(num);
  };

  const handleMaxChange = (value: string) => {
    const num = parseInt(value) || 0;
    setMax(num);
    if (num < min) setMin(num);
  };

  return (
    <div className="flex flex-col items-center gap-12 py-6">
      <div className="w-full max-w-md space-y-8">
        <div className="flex items-center gap-4 bg-secondary p-6 rounded-2xl border-2 border-black/5">
            <div className="flex-1 space-y-2">
                <Label htmlFor="min" className="font-fredoka text-lg ml-1">От</Label>
                <Input
                id="min"
                type="number"
                value={min}
                onChange={(e) => handleMinChange(e.target.value)}
                className="text-center text-2xl font-bold h-16 rounded-xl border-2 border-border focus-visible:ring-primary focus-visible:ring-offset-0 bg-white"
                />
            </div>
            <div className="text-3xl font-bold text-muted-foreground pt-6">-</div>
            <div className="flex-1 space-y-2">
                <Label htmlFor="max" className="font-fredoka text-lg ml-1">До</Label>
                <Input
                id="max"
                type="number"
                value={max}
                onChange={(e) => handleMaxChange(e.target.value)}
                className="text-center text-2xl font-bold h-16 rounded-xl border-2 border-border focus-visible:ring-primary focus-visible:ring-offset-0 bg-white"
                />
            </div>
        </div>

        <div className="space-y-4 px-2">
          <div className="space-y-2">
            <Label htmlFor="count" className="font-fredoka text-lg">Количество чисел</Label>
            <Input
                id="count"
                type="number"
                value={count}
                onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    if (val >= 0 && val <= 100) setCount(val);
                }}
                onBlur={() => {
                    if (count < 1) setCount(1);
                }}
                className="text-center text-xl font-bold h-14 rounded-xl border-2 border-border bg-white focus-visible:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="min-h-40 w-full flex items-center justify-center p-6 bg-white rounded-3xl border-2 border-dashed border-border">
        <AnimatePresence mode="wait">
          {results.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {results.map((num, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, rotate: -10 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center font-bold text-3xl md:text-4xl font-fredoka shadow-neo border-2 border-black ${
                    isGenerating ? 'bg-accent-yellow text-black' : 'bg-accent-coral text-black'
                  } transform hover:-translate-y-2 transition-transform`}
                >
                  {num}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground"
            >
              <Dices className="h-20 w-20 mx-auto mb-4 opacity-20" />
              <p className="font-medium">Настройте диапазон и нажмите кнопку</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={generate}
          disabled={isGenerating}
          size="lg"
          className="bg-primary text-white px-12 py-6 text-xl rounded-2xl shadow-neo border-2 border-black hover:translate-y-1 hover:shadow-none transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-neo"
        >
          <Dices className={`mr-3 h-6 w-6 ${isGenerating ? 'animate-bounce' : ''}`} />
          {isGenerating ? 'Генерация...' : 'Сгенерировать'}
        </Button>

        {results.length > 0 && !isGenerating && (
          <Button
            onClick={copyResults}
            variant="outline"
            size="lg"
            className="px-6 py-6 rounded-2xl border-2 border-border hover:bg-secondary hover:border-black/20"
          >
            {copied ? (
              <Check className="h-6 w-6 text-accent-mint" />
            ) : (
              <Copy className="h-6 w-6" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
