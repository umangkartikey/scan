import { useState } from "react";

export default function TerminalInterface() {
  const [commandHistory, setCommandHistory] = useState([
    { prompt: "[root@matrix]#", command: "scan --target=current-site", response: "Scanning complete. 23 trackers detected." },
    { prompt: "[root@matrix]#", command: "block --all-trackers", response: "Successfully blocked 847 tracking attempts." },
    { prompt: "[root@matrix]#", command: "status", response: "System status: OPERATIONAL | Privacy level: MAXIMUM" }
  ]);
  
  const [currentCommand, setCurrentCommand] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentCommand.trim()) {
      const newEntry = {
        prompt: "[root@matrix]#",
        command: currentCommand,
        response: processCommand(currentCommand)
      };
      
      setCommandHistory(prev => [...prev, newEntry]);
      setCurrentCommand("");
    }
  };

  const processCommand = (command: string): string => {
    const cmd = command.toLowerCase().trim();
    
    if (cmd.includes('scan')) {
      return "Scanning complete. " + Math.floor(Math.random() * 50 + 10) + " trackers detected.";
    } else if (cmd.includes('block')) {
      return "Successfully blocked " + Math.floor(Math.random() * 100 + 50) + " tracking attempts.";
    } else if (cmd.includes('status')) {
      return "System status: OPERATIONAL | Privacy level: MAXIMUM";
    } else if (cmd.includes('help')) {
      return "Available commands: scan, block, status, clear, exit";
    } else if (cmd.includes('clear')) {
      setTimeout(() => setCommandHistory([]), 100);
      return "Terminal cleared.";
    } else {
      return `Command not found: ${command}. Type 'help' for available commands.`;
    }
  };

  return (
    <div className="bg-matrix-bg border border-matrix-green box-glow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl terminal-glow">$ ./terminal_interface.sh</h2>
        <span className="animate-blink">█</span>
      </div>
      
      {/* Command History */}
      <div className="pure-black border border-matrix-dark p-4 h-32 overflow-y-auto mb-4">
        <div className="space-y-1 text-sm">
          {commandHistory.map((entry, index) => (
            <div key={index}>
              <div>
                <span className="text-matrix-dark">{entry.prompt}</span> {entry.command}
              </div>
              <div className="text-matrix-green">{entry.response}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Command Input */}
      <div className="flex items-center space-x-2">
        <span className="text-matrix-dark">[root@matrix]#</span>
        <input 
          type="text" 
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent border-none outline-none text-matrix-green terminal-glow" 
          placeholder="Enter command..."
        />
        <span className="animate-blink">█</span>
      </div>
    </div>
  );
}
