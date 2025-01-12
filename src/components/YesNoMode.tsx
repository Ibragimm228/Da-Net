import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export const YesNoMode = () => {
  const [answer, setAnswer] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomAnswer = () => {
    setIsAnimating(true);
    const answers = ["Да", "Нет"];
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    
    setAnswer(null);
    
    setTimeout(() => {
      setAnswer(randomAnswer);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-16 p-6">
      <div className="min-h-[200px] w-full flex items-center justify-center relative">
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
          {answer && (
            <motion.div
              key={answer}
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
              className={`text-9xl font-bold ${
                answer === "Да" 
                  ? "text-mint-500 dark:text-mint-400" 
                  : "text-rose-500 dark:text-rose-400"
              } text-center transition-colors duration-300`}
            >
              {answer}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <Button
        onClick={getRandomAnswer}
        disabled={isAnimating}
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