import { useEffect, useState } from "react";

export default function TerminalHeader() {
  const [uptime, setUptime] = useState("00:00:00");

  useEffect(() => {
    const startTime = Date.now();
    
    const updateUptime = () => {
      const elapsed = Date.now() - startTime;
      const hours = Math.floor(elapsed / 3600000).toString().padStart(2, '0');
      const minutes = Math.floor((elapsed % 3600000) / 60000).toString().padStart(2, '0');
      const seconds = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
      setUptime(`${hours}:${minutes}:${seconds}`);
    };

    const interval = setInterval(updateUptime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-matrix-green p-4 bg-matrix-bg">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-matrix-green terminal-glow">[root@matrix-guardian]#</span>
            <span className="typing-cursor">PRIVACY_TERMINAL_v2.1.0</span>
          </div>
          <div className="text-sm">
            <span className="text-matrix-dark">UPTIME:</span>{' '}
            <span className="terminal-glow">{uptime}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
