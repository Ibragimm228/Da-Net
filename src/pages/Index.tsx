import React, { useState } from "react";
import { YesNoMode } from "@/components/YesNoMode";
import { OptionsMode } from "@/components/OptionsMode";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [mode, setMode] = useState<"yesno" | "options">("yesno");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full bg-mint-500 p-6 shadow-lg mb-8">
        <motion.h1 
          className="text-4xl font-bold text-white text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Frontend Mania
        </motion.h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Рандомайзер решений
          </h2>
          <p className="text-gray-600 mb-8">
            Позвольте случаю помочь вам принять решение
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            <Button
              onClick={() => setMode("yesno")}
              variant={mode === "yesno" ? "default" : "outline"}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                mode === "yesno" ? "bg-mint-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105" : "text-gray-600 hover:bg-mint-100"
              }`}
            >
              Да/Нет
            </Button>
            <Button
              onClick={() => setMode("options")}
              variant={mode === "options" ? "default" : "outline"}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                mode === "options" ? "bg-mint-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105" : "text-gray-600 hover:bg-mint-100"
              }`}
            >
              Варианты
            </Button>
          </div>
        </motion.div>

        <motion.div
          key={mode}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.4, 0, 0.2, 1],
            scale: {
              type: "spring",
              damping: 15,
              stiffness: 100
            }
          }}
          className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-90"
        >
          {mode === "yesno" ? <YesNoMode /> : <OptionsMode />}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;