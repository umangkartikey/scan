import { useState, useEffect } from "react";

export default function Dashboard() {
  const [dataStream, setDataStream] = useState([
    "0xA1B2C3 >> BLOCKED",
    "0xD4E5F6 >> ALLOWED", 
    "0x789ABC >> BLOCKED",
    "0xDEF012 >> SCANNING",
    "0x345678 >> BLOCKED"
  ]);

  useEffect(() => {
    const characters = '0123456789ABCDEF';
    
    const generateDataLine = () => {
      let line = '0x';
      for (let i = 0; i < 6; i++) {
        line += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      const status = Math.random() > 0.6 ? 'BLOCKED' : Math.random() > 0.3 ? 'ALLOWED' : 'SCANNING';
      return line + ' >> ' + status;
    };

    const interval = setInterval(() => {
      setDataStream(prev => {
        const newStream = [...prev];
        newStream.shift();
        newStream.push(generateDataLine());
        return newStream;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Privacy Score */}
      <div className="bg-matrix-bg border border-matrix-green box-glow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg terminal-glow">$ ./privacy_score.sh</h2>
          <span className="animate-blink">█</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>PRIVACY_LEVEL:</span>
            <span className="text-matrix-green terminal-glow">SECURE</span>
          </div>
          <div className="flex justify-between">
            <span>SCORE:</span>
            <span className="text-2xl terminal-glow animate-glow">94/100</span>
          </div>
          <div className="w-full pure-black border border-matrix-dark">
            <div className="bg-matrix-green h-2 w-[94%] animate-glow"></div>
          </div>
        </div>
      </div>

      {/* Active Trackers */}
      <div className="bg-matrix-bg border border-matrix-green box-glow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg terminal-glow">$ ./detect_trackers.sh</h2>
          <span className="animate-blink">█</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>BLOCKED:</span>
            <span className="text-matrix-green terminal-glow">847</span>
          </div>
          <div className="flex justify-between">
            <span>ACTIVE:</span>
            <span className="text-red-500 animate-glow">23</span>
          </div>
          <div className="text-xs text-matrix-dark">
            Real-time scanning active...
          </div>
        </div>
      </div>

      {/* Data Streams */}
      <div className="bg-matrix-bg border border-matrix-green box-glow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg terminal-glow">$ ./monitor_streams.sh</h2>
          <span className="animate-blink">█</span>
        </div>
        <div className="space-y-1 text-xs matrix-code">
          {dataStream.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
