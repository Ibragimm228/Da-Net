import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Coins } from 'lucide-react';

interface CoinFlipProps {
  onResult: (result: string) => void;
}

export const CoinFlip = ({ onResult }: CoinFlipProps) => {
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipCount, setFlipCount] = useState(0);
  const [currentFace, setCurrentFace] = useState<'heads' | 'tails'>('heads');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isFlipping) {
      interval = setInterval(() => {
        setCurrentFace((prev) => (prev === 'heads' ? 'tails' : 'heads'));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isFlipping]);

  const flip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setResult(null);
    setFlipCount((c) => c + 1);

    const newResult = Math.random() < 0.5 ? 'heads' : 'tails';

    setTimeout(() => {
      setResult(newResult);
      setIsFlipping(false);
      onResult(newResult === 'heads' ? 'Орёл' : 'Решка');
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center gap-10 py-8">
      <div className="relative w-64 h-64 perspective-1000">
        <AnimatePresence mode="wait">
          {isFlipping ? (
            <motion.div
              key={`flip-${flipCount}`}
              className="absolute inset-0"
              animate={{
                rotateY: [0, 1800],
                y: [0, -100, 0],
              }}
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
              }}
            >
              <div className="w-full h-full rounded-full flex items-center justify-center shadow-neo-lg overflow-hidden bg-white border-4 border-black">
                 <img 
                   src={currentFace === 'heads' ? "/арел/арел.png" : "/решка/решка.png"}
                   alt="Coin Flipping" 
                   className="w-full h-full object-cover"
                 />
              </div>
            </motion.div>
          ) : result ? (
            <motion.div
              key={result}
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              className="w-full h-full"
            >
              <div className="w-full h-full rounded-full shadow-neo flex flex-col items-center justify-center overflow-hidden bg-white border-4 border-black">
                <img 
                  src={result === 'heads' ? "/арел/арел.png" : "/решка/решка.png"}
                  alt={result === 'heads' ? 'Орёл' : 'Решка'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center mt-4">
                <span className={`font-fredoka font-bold text-3xl text-foreground`}>
                  {result === 'heads' ? 'Орёл' : 'Решка'}
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-full rounded-full flex items-center justify-center overflow-hidden bg-white border-4 border-black shadow-sm"
            >
                <img 
                  src="/арел/арел.png" 
                  alt="Coin Default" 
                  className="w-full h-full object-cover transition-all duration-300"
                />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <Button
          onClick={flip}
          disabled={isFlipping}
          size="lg"
          className="bg-primary text-white px-12 py-6 text-xl rounded-2xl shadow-neo border-2 border-black hover:translate-y-1 hover:shadow-none transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-neo"
        >
          <Coins className="mr-3 h-6 w-6" />
          {isFlipping ? 'Подбрасываем...' : 'Подбросить'}
        </Button>
      </motion.div>

      {result && !isFlipping && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground font-medium font-outfit"
        >
          Нажмите снова для нового броска
        </motion.p>
      )}
    </div>
  );
};
