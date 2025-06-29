import { useEffect } from "react";
import MatrixRain from "@/components/matrix-rain";
import TerminalHeader from "@/components/terminal-header";
import AsciiiBanner from "@/components/ascii-banner";
import BootSequence from "@/components/boot-sequence";
import Dashboard from "@/components/dashboard";
import MatrixVisualization from "@/components/matrix-visualization";
import TerminalInterface from "@/components/terminal-interface";
import PrivacyReport from "@/components/privacy-report";
import TerminalFooter from "@/components/terminal-footer";

export default function Home() {
  useEffect(() => {
    document.title = "Matrix Privacy Guardian - Terminal Interface";
  }, []);

  return (
    <div className="bg-pure-black text-matrix-green font-mono overflow-x-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Scanlines Effect */}
      <div className="scanlines"></div>
      
      {/* Main Container */}
      <div className="relative z-20 min-h-screen">
        {/* Terminal Header */}
        <TerminalHeader />

        {/* ASCII Art Banner */}
        <AsciiiBanner />

        {/* Terminal Boot Sequence */}
        <BootSequence />

        {/* Main Dashboard */}
        <main className="p-4 space-y-6">
          <div className="container mx-auto">
            {/* Status Overview */}
            <Dashboard />

            {/* Live Matrix Data Visualization */}
            <MatrixVisualization />

            {/* Terminal Command Interface */}
            <TerminalInterface />

            {/* Privacy Report */}
            <PrivacyReport />
          </div>
        </main>

        {/* Terminal Footer */}
        <TerminalFooter />
      </div>
    </div>
  );
}
