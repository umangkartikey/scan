import { useState, useEffect } from "react";

export default function TrackingSources() {
  const [activeSources, setActiveSources] = useState([
    { domain: "google-analytics.com", type: "Analytics", status: "BLOCKED", risk: "HIGH" },
    { domain: "facebook.com/tr", type: "Social Media", status: "ACTIVE", risk: "CRITICAL" },
    { domain: "doubleclick.net", type: "Advertising", status: "BLOCKED", risk: "HIGH" },
    { domain: "amazon-adsystem.com", type: "Commerce", status: "ACTIVE", risk: "MEDIUM" },
    { domain: "twitter.com/i/adsct", type: "Social Media", status: "BLOCKED", risk: "HIGH" },
    { domain: "hotjar.com", type: "Analytics", status: "ACTIVE", risk: "MEDIUM" },
    { domain: "mixpanel.com", type: "Analytics", status: "BLOCKED", risk: "MEDIUM" },
    { domain: "segment.io", type: "Data Collection", status: "ACTIVE", risk: "HIGH" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSources(prev => {
        return prev.map(source => ({
          ...source,
          status: Math.random() > 0.8 ? (source.status === "BLOCKED" ? "ACTIVE" : "BLOCKED") : source.status
        }));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "CRITICAL": return "text-red-600";
      case "HIGH": return "text-red-500";
      case "MEDIUM": return "text-yellow-500";
      case "LOW": return "text-matrix-green";
      default: return "text-matrix-green";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "BLOCKED" ? "text-matrix-green" : "text-red-500";
  };

  return (
    <div className="bg-matrix-bg border border-matrix-green box-glow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl terminal-glow">$ ./track_sources.sh --live</h2>
        <span className="animate-blink">█</span>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-matrix-dark"># ACTIVE_TRACKING_SOURCES</span>
          <span className="text-matrix-green">{activeSources.filter(s => s.status === "ACTIVE").length} DETECTED</span>
        </div>
        
        <div className="bg-pure-black border border-matrix-dark p-4 h-64 overflow-y-auto">
          <div className="space-y-2 text-xs matrix-code">
            {activeSources.map((source, index) => (
              <div key={index} className="flex justify-between items-center p-2 hover:bg-matrix-bg transition-all">
                <div className="flex-1">
                  <span className="text-matrix-green">{source.domain}</span>
                  <span className="text-matrix-dark ml-2">[{source.type}]</span>
                </div>
                <div className="flex space-x-4">
                  <span className={`${getRiskColor(source.risk)} font-bold`}>{source.risk}</span>
                  <span className={`${getStatusColor(source.status)} font-bold`}>{source.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-xs text-matrix-dark">
          Real-time tracker monitoring • Updates every 3 seconds
        </div>
      </div>
    </div>
  );
}