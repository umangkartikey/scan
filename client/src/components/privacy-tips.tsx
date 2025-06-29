import { useState, useEffect } from "react";

export default function PrivacyTips() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  
  const privacyTips = [
    {
      category: "BROWSER_SECURITY",
      tip: "Use incognito/private browsing mode for sensitive activities",
      command: "$ enable_private_mode --strict",
      risk: "MEDIUM"
    },
    {
      category: "DNS_PROTECTION", 
      tip: "Configure DNS over HTTPS (DoH) to encrypt DNS queries",
      command: "$ configure_doh --provider=cloudflare",
      risk: "HIGH"
    },
    {
      category: "COOKIE_MANAGEMENT",
      tip: "Clear cookies and site data regularly to prevent tracking",
      command: "$ clear_cookies --all --force",
      risk: "MEDIUM"
    },
    {
      category: "VPN_USAGE",
      tip: "Always use VPN when connecting to public WiFi networks",
      command: "$ enable_vpn --location=auto --protocol=wireguard",
      risk: "CRITICAL"
    },
    {
      category: "BROWSER_EXTENSIONS",
      tip: "Install uBlock Origin and Privacy Badger for tracker blocking",
      command: "$ install_extensions --privacy-pack",
      risk: "HIGH"
    },
    {
      category: "SEARCH_PRIVACY",
      tip: "Use DuckDuckGo or Startpage instead of Google for searches",
      command: "$ set_search_engine --provider=duckduckgo",
      risk: "MEDIUM"
    },
    {
      category: "SOCIAL_MEDIA",
      tip: "Review and limit social media privacy settings regularly",
      command: "$ audit_social_privacy --platforms=all",
      risk: "HIGH"
    },
    {
      category: "EMAIL_SECURITY",
      tip: "Use disposable email addresses for one-time registrations",
      command: "$ generate_temp_email --duration=24h",
      risk: "MEDIUM"
    },
    {
      category: "PASSWORD_SECURITY",
      tip: "Enable 2FA on all accounts and use unique passwords",
      command: "$ enable_2fa --accounts=all --backup-codes",
      risk: "CRITICAL"
    },
    {
      category: "DEVICE_SECURITY",
      tip: "Keep your OS and browsers updated with latest security patches",
      command: "$ system_update --security-only --auto-restart",
      risk: "HIGH"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex(prev => (prev + 1) % privacyTips.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [privacyTips.length]);

  const currentTip = privacyTips[currentTipIndex];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "CRITICAL": return "text-red-600";
      case "HIGH": return "text-red-500";
      case "MEDIUM": return "text-yellow-500";
      case "LOW": return "text-matrix-green";
      default: return "text-matrix-green";
    }
  };

  const handlePrevTip = () => {
    setCurrentTipIndex(prev => prev === 0 ? privacyTips.length - 1 : prev - 1);
  };

  const handleNextTip = () => {
    setCurrentTipIndex(prev => (prev + 1) % privacyTips.length);
  };

  return (
    <div className="bg-matrix-bg border border-matrix-green box-glow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl terminal-glow">$ ./privacy_tips.sh --interactive</h2>
        <span className="animate-blink">█</span>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-matrix-dark"># PRIVACY_TIP_{(currentTipIndex + 1).toString().padStart(2, '0')}</span>
          <div className="flex items-center space-x-2">
            <span className={`${getRiskColor(currentTip.risk)} font-bold`}>{currentTip.risk}</span>
            <span className="text-matrix-dark">PRIORITY</span>
          </div>
        </div>
        
        <div className="bg-pure-black border border-matrix-dark p-4 min-h-32">
          <div className="space-y-3">
            <div className="text-matrix-green text-sm font-bold">
              [{currentTip.category}]
            </div>
            
            <div className="text-matrix-green text-sm leading-relaxed">
              {currentTip.tip}
            </div>
            
            <div className="bg-matrix-bg border border-matrix-dark p-2">
              <div className="text-xs text-matrix-dark mb-1"># SUGGESTED_COMMAND:</div>
              <div className="text-xs matrix-code text-matrix-green">
                {currentTip.command}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button 
              onClick={handlePrevTip}
              className="bg-matrix-bg border border-matrix-green text-matrix-green px-3 py-1 text-xs hover:bg-matrix-green hover:text-pure-black transition-all duration-300 box-glow"
            >
              [PREV]
            </button>
            <button 
              onClick={handleNextTip}
              className="bg-matrix-bg border border-matrix-green text-matrix-green px-3 py-1 text-xs hover:bg-matrix-green hover:text-pure-black transition-all duration-300 box-glow"
            >
              [NEXT]
            </button>
          </div>
          
          <div className="text-xs text-matrix-dark">
            {currentTipIndex + 1} / {privacyTips.length} • Auto-advance: 8s
          </div>
        </div>
      </div>
    </div>
  );
}