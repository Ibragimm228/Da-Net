export type DecisionType = 'coin' | 'wheel' | 'number' | 'picker' | 'yesno';

export interface DecisionRecord {
  id: string;
  type: DecisionType;
  question?: string;
  options?: string[];
  result: string;
  timestamp: Date;
}

export interface WheelOption {
  id: string;
  text: string;
  color: string;
}

export const WHEEL_COLORS = [
  '#6C5DD3',
  '#F58A70', 
  '#0FBD8C',
  '#F7CE38',
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4', 
];

export const getTypeLabel = (type: DecisionType): string => {
  const labels: Record<DecisionType, string> = {
    coin: 'Монетка',
    wheel: 'Колесо',
    number: 'Число',
    picker: 'Выбор',
    yesno: 'Да/Нет',
  };
  return labels[type];
};

export const getTypeIcon = (type: DecisionType): string => {
  const icons: Record<DecisionType, string> = {
    coin: '🪙',
    wheel: '🎡',
    number: '🔢',
    picker: '🎲',
    yesno: '✅',
  };
  return icons[type];
};
