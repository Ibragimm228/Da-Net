import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DecisionRecord, getTypeLabel } from '@/types/decision';
import { Trash2, Clock, X, Coins, Target, Hash, Shuffle, ThumbsUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface DecisionHistoryProps {
  history: DecisionRecord[];
  onClear: () => void;
  onRemove: (id: string) => void;
}

export const DecisionHistory = ({
  history,
  onClear,
  onRemove,
}: DecisionHistoryProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'coin':
        return <Coins className="w-6 h-6" />;
      case 'wheel':
        return <Target className="w-6 h-6" />;
      case 'number':
        return <Hash className="w-6 h-6" />;
      case 'picker':
        return <Shuffle className="w-6 h-6" />;
      case 'yesno':
        return <ThumbsUp className="w-6 h-6" />;
      default:
        return <Clock className="w-6 h-6" />;
    }
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center border-2 border-black/5">
            <Clock className="h-10 w-10 text-muted-foreground/30" />
        </div>
        <p className="text-muted-foreground font-medium font-fredoka text-lg">История пуста</p>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Ваши решения будут отображаться здесь
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-muted-foreground ml-1">
          {history.length} {history.length === 1 ? 'запись' : 'записей'}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Очистить
        </Button>
      </div>

      <ScrollArea className="h-[500px] pr-4 -mr-4">
        <AnimatePresence mode="popLayout">
          <div className="pr-4 pb-4">
          {history.map((record, index) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative p-4 mb-3 rounded-xl bg-white border-2 border-border hover:border-primary hover:shadow-neo transition-all"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 hover:bg-destructive/10 hover:text-destructive rounded-full"
                onClick={() => onRemove(record.id)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="flex items-start gap-4">
                <div className="bg-secondary p-3 rounded-xl border border-black/5 text-foreground">
                  {getIcon(record.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary text-white font-bold uppercase tracking-wider">
                      {getTypeLabel(record.type)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(record.timestamp), {
                        addSuffix: true,
                        locale: ru,
                      })}
                    </span>
                  </div>
                  <p className="font-bold font-fredoka text-lg truncate text-foreground">{record.result}</p>
                  {record.options && record.options.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1 truncate bg-secondary/50 p-1 rounded px-2">
                      Из: {record.options.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
};
