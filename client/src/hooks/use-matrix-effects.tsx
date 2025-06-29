import { useEffect, useState } from "react";

export function useMatrixEffects() {
  const [isBootComplete, setIsBootComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBootComplete(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return { isBootComplete };
}

export function useMatrixStream(characters = '0123456789ABCDEF') {
  const [stream, setStream] = useState<string[]>([]);

  useEffect(() => {
    const generateLine = () => {
      const length = Math.floor(Math.random() * 20) + 10;
      let line = '0x';
      for (let i = 0; i < length; i++) {
        line += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      line += ' >> ' + (Math.random() > 0.7 ? 'BLOCKED' : Math.random() > 0.5 ? 'ALLOWED' : 'SCANNING');
      return line;
    };

    const interval = setInterval(() => {
      setStream(prev => {
        const newStream = [...prev, generateLine()];
        return newStream.slice(-20);
      });
    }, 500);

    return () => clearInterval(interval);
  }, [characters]);

  return stream;
}
