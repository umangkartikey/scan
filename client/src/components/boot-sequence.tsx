import { useState, useEffect } from "react";

export default function BootSequence() {
  const [visibleLines, setVisibleLines] = useState(0);

  const bootLines = [
    "[  OK  ] Starting Matrix Privacy Guardian...",
    "[  OK  ] Loading tracker detection modules...",
    "[  OK  ] Initializing privacy shield...",
    "[  OK  ] Establishing secure connection...",
    "[WARNING] 847 tracking attempts detected...",
    "[  OK  ] System ready. Welcome to the Matrix."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(prev => {
        if (prev < bootLines.length) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 500);

    return () => clearInterval(timer);
  }, [bootLines.length]);

  return (
    <section className="p-4 bg-matrix-bg">
      <div className="container mx-auto">
        <div className="space-y-2 text-sm">
          {bootLines.slice(0, visibleLines).map((line, index) => (
            <div key={index} className="boot-sequence opacity-100">
              {line}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
