import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { CoinFlip } from '@/components/CoinFlip';
import { SpinWheel } from '@/components/SpinWheel';
import { NumberGenerator } from '@/components/NumberGenerator';
import { RandomPicker } from '@/components/RandomPicker';
import { YesNoDecision } from '@/components/YesNoDecision';
import { DecisionHistory } from '@/components/DecisionHistory';
import { useDecisionHistory } from '@/hooks/useDecisionHistory';
import { DecisionType } from '@/types/decision';
import { Coins, Target, Hash, Shuffle, ThumbsUp, History, Send } from 'lucide-react';

const tabs = [
  { id: 'coin', label: 'Монетка', icon: Coins, color: 'bg-accent-yellow', iconColor: 'text-black' },
  { id: 'wheel', label: 'Колесо', icon: Target, color: 'bg-accent-mint', iconColor: 'text-white' },
  { id: 'number', label: 'Числа', icon: Hash, color: 'bg-accent-coral', iconColor: 'text-white' },
  { id: 'picker', label: 'Выбор', icon: Shuffle, color: 'bg-primary', iconColor: 'text-white' },
  { id: 'yesno', label: 'Да/Нет', icon: ThumbsUp, color: 'bg-secondary', iconColor: 'text-foreground' },
  { id: 'telegram', label: 'Frontend Mania', icon: Send, color: 'bg-sky-500', iconColor: 'text-white' },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('coin');
  const { history, addRecord, clearHistory, removeRecord } = useDecisionHistory();

  const handleResult = (type: DecisionType, result: string, options?: string[]) => {
    addRecord(type, result, undefined, options);
  };

  const handleTabChange = (value: string) => {
    if (value === 'telegram') {
      window.open('https://t.me/FrontendMania', '_blank');
      return;
    }
    setActiveTab(value);
  };

  return (
    <div className="min-h-screen bg-background bg-grid-pattern font-outfit relative overflow-x-hidden">
      <div className="relative z-10">
        <header className="py-12 px-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4"
            >
              <div>
                <h1 className="text-4xl font-fredoka font-bold text-foreground tracking-tight">
                  Рандомайзер
                  <span className="ml-2 text-sm bg-accent-yellow px-2 py-0.5 rounded-full border-2 border-black text-black relative -top-4 -rotate-6 inline-block">v2.0</span>
                </h1>
                <p className="text-muted-foreground font-medium">Твой карманный помощник судьбы</p>
              </div>
            </motion.div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative w-12 h-12 rounded-xl border-2 border-border shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:translate-y-1 hover:shadow-none transition-all bg-white">
                  <History className="h-6 w-6 text-foreground" />
                  {history.length > 0 && (
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent-coral border-2 border-white text-white text-xs font-bold flex items-center justify-center">
                      {history.length > 99 ? '99+' : history.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="border-l-2 border-border">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 font-fredoka text-xl">
                    <History className="h-5 w-5" />
                    История решений
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <DecisionHistory
                    history={history}
                    onClear={clearHistory}
                    onRemove={removeRecord}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 pb-12">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <TabsList className="w-full h-auto p-2 bg-transparent mb-8 grid grid-cols-2 md:grid-cols-3 gap-3">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={`
                      flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-transparent transition-all duration-300
                      data-[state=active]:bg-white data-[state=active]:border-primary data-[state=active]:shadow-neo
                      hover:bg-white/50
                    `}
                  >
                    <div className={`p-2 rounded-lg ${tab.color} ${tab.iconColor}`}>
                        <tab.icon className="h-5 w-5" />
                    </div>
                    <span className="font-fredoka font-medium text-sm">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 md:p-10 bg-white border-2 border-border shadow-neo rounded-[2rem]">
                  <TabsContent value="coin" className="m-0">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-fredoka mb-2">Подбросить монетку</h2>
                      <p className="text-muted-foreground font-medium">Классика жанра для спорных моментов</p>
                    </div>
                    <CoinFlip onResult={(result) => handleResult('coin', result)} />
                  </TabsContent>

                  <TabsContent value="wheel" className="m-0">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-fredoka mb-2">Колесо фортуны</h2>
                      <p className="text-muted-foreground font-medium">Крути колесо, испытывай удачу!</p>
                    </div>
                    <SpinWheel onResult={(result, options) => handleResult('wheel', result, options)} />
                  </TabsContent>

                  <TabsContent value="number" className="m-0">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-fredoka mb-2">Генератор чисел</h2>
                      <p className="text-muted-foreground font-medium">Когда нужны случайные цифры</p>
                    </div>
                    <NumberGenerator onResult={(result) => handleResult('number', result)} />
                  </TabsContent>

                  <TabsContent value="picker" className="m-0">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-fredoka mb-2">Случайный выбор</h2>
                      <p className="text-muted-foreground font-medium">Вытяни счастливый билет</p>
                    </div>
                    <RandomPicker onResult={(result, options) => handleResult('picker', result, options)} />
                  </TabsContent>

                  <TabsContent value="yesno" className="m-0">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-fredoka mb-2">Да или Нет?</h2>
                      <p className="text-muted-foreground font-medium">Вселенная даст знак</p>
                    </div>
                    <YesNoDecision onResult={(result) => handleResult('yesno', result)} />
                  </TabsContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </main>

        <footer className="py-8 text-center">
        </footer>
      </div>
    </div>
  );
};

export default Index;
