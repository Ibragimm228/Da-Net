import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X, RotateCw, Trash2 } from 'lucide-react';
import { WHEEL_COLORS } from '@/types/decision';

interface SpinWheelProps {
  onResult: (result: string, options: string[]) => void;
}

export const SpinWheel = ({ onResult }: SpinWheelProps) => {
  const [options, setOptions] = useState<string[]>([
    'Вариант 1',
    'Вариант 2',
    'Вариант 3',
  ]);
  const [newOption, setNewOption] = useState('');
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const addOption = () => {
    if (newOption.trim() && options.length < 12) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const clearOptions = () => {
    setOptions(['Вариант 1', 'Вариант 2']);
    setWinner(null);
  };

  const spin = () => {
    if (isSpinning || options.length < 2) return;
    setIsSpinning(true);
    setWinner(null);

    const winnerIndex = Math.floor(Math.random() * options.length);
    const segmentAngle = 360 / options.length;
    const targetAngle = 360 - (winnerIndex * segmentAngle + segmentAngle / 2);
    const spins = 5 + Math.random() * 3;
    const totalRotation = rotation + spins * 360 + targetAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setWinner(options[winnerIndex]);
      setIsSpinning(false);
      onResult(options[winnerIndex], options);
    }, 4000);
  };

  const segmentAngle = 360 / options.length;

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start justify-center">
      <div className="flex flex-col items-center gap-8">
        <div className="relative">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
            <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[35px] border-l-transparent border-r-transparent border-t-foreground drop-shadow-md" />
          </div>

          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 rounded-full border-8 border-black shadow-neo bg-black">
            <motion.div
              ref={wheelRef}
              className="w-full h-full rounded-full overflow-hidden"
              animate={{ rotate: rotation }}
              transition={{
                duration: 4,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              style={{ transformOrigin: 'center center' }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {options.map((option, index) => {
                  const startAngle = index * segmentAngle - 90;
                  const endAngle = startAngle + segmentAngle;
                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = (endAngle * Math.PI) / 180;
                  const x1 = 50 + 50 * Math.cos(startRad);
                  const y1 = 50 + 50 * Math.sin(startRad);
                  const x2 = 50 + 50 * Math.cos(endRad);
                  const y2 = 50 + 50 * Math.sin(endRad);
                  const largeArc = segmentAngle > 180 ? 1 : 0;
                  const textAngle = startAngle + segmentAngle / 2;
                  const textRad = (textAngle * Math.PI) / 180;
                  const textX = 50 + 35 * Math.cos(textRad);
                  const textY = 50 + 35 * Math.sin(textRad);

                  return (
                    <g key={index}>
                      <path
                        d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`}
                        fill={WHEEL_COLORS[index % WHEEL_COLORS.length]}
                        stroke="#000000"
                        strokeWidth="0.5"
                      />
                      <text
                        x={textX}
                        y={textY}
                        fill="white"
                        fontSize="3.5"
                        fontWeight="bold"
                        fontFamily="Fredoka, sans-serif"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${textAngle + 90}, ${textX}, ${textY})`}
                        className="pointer-events-none select-none uppercase tracking-wider"
                      >
                        {option.length > 12
                          ? option.substring(0, 12) + '...'
                          : option}
                      </text>
                    </g>
                  );
                })}
                <circle cx="50" cy="50" r="8" fill="white" stroke="black" strokeWidth="2" />
                <circle cx="50" cy="50" r="3" fill="#000000" />
              </svg>
            </motion.div>
            </div>
          </div>
        </div>

        <Button
          onClick={spin}
          disabled={isSpinning || options.length < 2}
          size="lg"
          className="bg-primary text-white px-12 py-6 text-xl rounded-2xl shadow-neo border-2 border-black hover:translate-y-1 hover:shadow-none transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-neo"
        >
          <RotateCw
            className={`mr-3 h-6 w-6 ${isSpinning ? 'animate-spin' : ''}`}
          />
          {isSpinning ? 'Крутим...' : 'Крутить'}
        </Button>

        {winner && !isSpinning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-4 bg-accent-mint border-2 border-black rounded-xl shadow-neo -rotate-2"
          >
            <p className="text-white font-medium mb-1">Победитель:</p>
            <p className="text-3xl font-bold text-white font-fredoka">{winner}</p>
          </motion.div>
        )}
      </div>

      <div className="w-full max-w-sm space-y-6 bg-secondary p-6 rounded-2xl border-2 border-black/10">
        <h3 className="font-fredoka text-xl font-bold">Опции колеса</h3>
        <div className="flex gap-2">
          <Input
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addOption()}
            placeholder="Новый вариант"
            className="flex-1 bg-white border-2 border-border focus-visible:ring-primary focus-visible:ring-offset-0"
            maxLength={30}
          />
          <Button
            onClick={addOption}
            disabled={!newOption.trim() || options.length >= 12}
            size="icon"
            className="shrink-0 bg-accent-mint hover:bg-accent-mint/90 text-white border-2 border-transparent hover:border-black/20"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">
            {options.length}/12 вариантов
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearOptions}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Очистить
          </Button>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {options.map((option, index) => (
            <motion.div
              key={`${option}-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white border border-border shadow-sm group hover:border-primary transition-colors"
            >
              <div
                className="w-4 h-4 rounded-full shrink-0 border border-black/20"
                style={{
                  backgroundColor: WHEEL_COLORS[index % WHEEL_COLORS.length],
                }}
              />
              <span className="flex-1 truncate font-medium text-sm">{option}</span>
              {options.length > 2 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-all"
                  onClick={() => removeOption(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
