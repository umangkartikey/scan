import { useState } from "react";

export default function PrivacyReport() {
  const [vpnActive, setVpnActive] = useState(false);

  const handleVpnToggle = () => {
    setVpnActive(!vpnActive);
  };

  return (
    <div className="bg-matrix-bg border border-matrix-green box-glow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl terminal-glow">$ ./generate_report.sh --detailed</h2>
        <span className="animate-blink">█</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Threat Analysis */}
        <div>
          <h3 className="text-matrix-dark mb-3"># THREAT_ANALYSIS:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>HIGH_RISK:</span>
              <span className="text-red-500">3</span>
            </div>
            <div className="flex justify-between">
              <span>MEDIUM_RISK:</span>
              <span className="text-yellow-500">12</span>
            </div>
            <div className="flex justify-between">
              <span>LOW_RISK:</span>
              <span className="text-matrix-green">8</span>
            </div>
            <div className="mt-4 p-2 pure-black border border-matrix-dark">
              <div className="text-xs matrix-code">
                FINGERPRINTING_DETECTED: canvas, webgl, audio<br/>
                COOKIES_FOUND: 147 tracking, 23 functional<br/>
                REQUESTS_BLOCKED: social_media, analytics<br/>
                DNS_QUERIES: filtered, anonymized
              </div>
            </div>
          </div>
        </div>
        
        {/* Protection Status */}
        <div>
          <h3 className="text-matrix-dark mb-3"># PROTECTION_STATUS:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-matrix-green">●</span>
              <span>AD_BLOCKER: ACTIVE</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-matrix-green">●</span>
              <span>TRACKER_SHIELD: ACTIVE</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-matrix-green">●</span>
              <span>DNS_FILTER: ACTIVE</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={vpnActive ? "text-matrix-green" : "text-red-500"}>●</span>
              <span>VPN_TUNNEL: {vpnActive ? "ACTIVE" : "INACTIVE"}</span>
            </div>
            <div className="mt-4 p-2 pure-black border border-matrix-dark">
              <button 
                onClick={handleVpnToggle}
                className="w-full text-matrix-green border border-matrix-green py-1 px-2 hover:bg-matrix-green hover:text-pure-black transition-all duration-300 box-glow"
              >
                [{vpnActive ? "DEACTIVATE_VPN" : "ACTIVATE_VPN"}]
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
