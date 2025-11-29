import { useState, useEffect } from 'react';
import { DecisionRecord, DecisionType } from '@/types/decision';

const STORAGE_KEY = 'decision-history';

export const useDecisionHistory = () => {
  const [history, setHistory] = useState<DecisionRecord[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setHistory(parsed.map((item: DecisionRecord) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        })));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const saveHistory = (records: DecisionRecord[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    setHistory(records);
  };

  const addRecord = (
    type: DecisionType,
    result: string,
    question?: string,
    options?: string[]
  ) => {
    const newRecord: DecisionRecord = {
      id: crypto.randomUUID(),
      type,
      question,
      options,
      result,
      timestamp: new Date(),
    };
    saveHistory([newRecord, ...history].slice(0, 100));
  };

  const clearHistory = () => {
    saveHistory([]);
  };

  const removeRecord = (id: string) => {
    saveHistory(history.filter((record) => record.id !== id));
  };

  return {
    history,
    addRecord,
    clearHistory,
    removeRecord,
  };
};
