import { useState, useEffect } from "react";

export default function MatrixVisualization() {
  const [matrixCode, setMatrixCode] = useState<string[]>([]);
  const [protectionActive, setProtectionActive] = useState(true);

  useEffect(() => {
    const characters = '0123456789ABCDEF';
    
    const generateMatrixLine = () => {
      const length = Math.floor(Math.random() * 20) + 10;
      let line = '0x';
      for (let i = 0; i < length; i++) {
        line += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      line += ' >> ' + (Math.random() > 0.7 ? 'BLOCKED' : Math.random() > 0.5 ? 'ALLOWED' : 'SCANNING');
      return line;
    };

    const interval = setInterval(() => {
      setMatrixCode(prev => {
        const newCode = [...prev, generateMatrixLine()];
        return newCode.slice(-20); // Keep last 20 lines
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleProtectionToggle = () => {
    setProtectionActive(!protectionActive);
  };

  return (
    <div className="bg-matrix-bg border border-matrix-green box-glow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl terminal-glow">$ ./matrix_visualization.sh --live</h2>
        <span className="animate-blink">█</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Matrix Code Display */}
        <div className="space-y-2">
          <h3 className="text-matrix-dark"># LIVE TRACKING DATA</h3>
          <div className="pure-black border border-matrix-dark p-4 h-64 overflow-hidden">
            <div className="matrix-code text-xs space-y-1">
              {matrixCode.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Control Panel */}
        <div className="space-y-4">
          <h3 className="text-matrix-dark"># SYSTEM CONTROLS</h3>
          
          {/* Enable/Disable Protection */}
          <div className="pure-black border border-matrix-dark p-4">
            <div className="flex items-center justify-between mb-2">
              <span>PROTECTION_STATUS:</span>
              <span className={`terminal-glow ${protectionActive ? 'text-matrix-green' : 'text-red-500'}`}>
                {protectionActive ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>
            <button 
              onClick={handleProtectionToggle}
              className="w-full bg-matrix-bg border border-matrix-green text-matrix-green py-2 px-4 hover:bg-matrix-green hover:text-pure-black transition-all duration-300 box-glow hover:animate-glitch"
            >
              [{protectionActive ? 'DISABLE_PROTECTION' : 'ENABLE_PROTECTION'}]
            </button>
          </div>

          {/* Scan Website */}
          <div className="pure-black border border-matrix-dark p-4">
            <label className="block text-matrix-dark mb-2"># TARGET_URL:</label>
            <input 
              type="text" 
              placeholder="https://example.com" 
              className="w-full bg-matrix-bg border border-matrix-green text-matrix-green p-2 mb-2 terminal-glow outline-none"
            />
            <button className="w-full bg-matrix-bg border border-matrix-green text-matrix-green py-2 px-4 hover:bg-matrix-green hover:text-pure-black transition-all duration-300 box-glow">
              [INITIATE_SCAN]
            </button>
          </div>

          {/* Quick Actions */}
          <div className="pure-black border border-matrix-dark p-4">
            <h4 className="text-matrix-dark mb-2"># QUICK_ACTIONS:</h4>
            <div className="space-y-2">
              <button className="w-full text-left text-matrix-green hover:bg-matrix-bg p-2 transition-all hover:animate-glow">
                &gt; clear_cookies.sh
              </button>
              <button className="w-full text-left text-matrix-green hover:bg-matrix-bg p-2 transition-all hover:animate-glow">
                &gt; flush_dns.sh  
              </button>
              <button className="w-full text-left text-matrix-green hover:bg-matrix-bg p-2 transition-all hover:animate-glow">
                &gt; anonymize_session.sh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
