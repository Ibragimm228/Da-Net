import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, AlertCircle } from "lucide-react";

export const OptionsMode = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const addOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      setOptions([...options, newOption.trim()]);
      setNewOption("");
    }
  };

  const removeOption = (indexToRemove: number) => {
    setOptions(options.filter((_, index) => index !== indexToRemove));
  };

  const getRandomOption = () => {
    if (options.length === 0) return;
    
    setIsAnimating(true);
    setSelectedOption(null);
    
    setTimeout(() => {
      const randomOption = options[Math.floor(Math.random() * options.length)];
      setSelectedOption(randomOption);
      setIsAnimating(false);
    }, 300);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addOption();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-lg mx-auto p-6">
      <div className="flex w-full space-x-3">
        <Input
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введите вариант"
          className="flex-1 text-lg h-12 border-2 border-mint-200 focus:border-mint-500 
                   rounded-xl shadow-sm transition-all"
        />
        <Button 
          onClick={addOption}
          disabled={!newOption.trim()}
          className="bg-mint-500 hover:bg-mint-600 text-white h-12 px-6 rounded-xl
                   shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
        >
          Добавить
        </Button>
      </div>

      {options.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center space-x-2 text-gray-500"
        >
          <AlertCircle className="h-5 w-5" />
          <span>Добавьте варианты для выбора</span>
        </motion.div>
      )}

      <div className="w-full space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {options.map((option, index) => (
          <motion.div
            key={option}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800
                     rounded-xl shadow-md hover:shadow-lg transition-all duration-300
                     border border-gray-100 dark:border-gray-700"
          >
            <span className="text-gray-700 dark:text-gray-200 text-lg">{option}</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeOption(index)}
              className="text-gray-400 hover:text-rose-500 hover:bg-rose-50
                       dark:hover:bg-rose-900/20 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="min-h-[200px] flex items-center justify-center w-full relative">
        {isAnimating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute"
          >
            <Loader2 className="h-12 w-12 animate-spin text-mint-500" />
          </motion.div>
        )}
        <AnimatePresence mode="wait">
          {selectedOption && (
            <motion.div
              key={selectedOption}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }
              }}
              exit={{ opacity: 0, scale: 0.5, y: -20 }}
              className="text-5xl font-bold text-mint-500 dark:text-mint-400 
                       text-center break-words max-w-full px-4"
            >
              {selectedOption}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Button
        onClick={getRandomOption}
        disabled={isAnimating || options.length === 0}
        className="bg-gradient-to-r from-mint-500 to-mint-600 hover:from-mint-600 hover:to-mint-700
                 text-white px-10 py-8 text-2xl rounded-full transition-all duration-300
                 ease-out transform hover:scale-105 active:scale-95 
                 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed
                 relative overflow-hidden group"
      >
        <span className="relative z-10">Получить ответ</span>
        <motion.div
          className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"
          initial={false}
          animate={{ scale: isAnimating ? 1.5 : 1 }}
        />
      </Button>
    </div>
  );
};