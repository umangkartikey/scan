export default function TerminalFooter() {
  return (
    <footer className="border-t border-matrix-green p-4 bg-matrix-bg mt-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between text-sm">
          <div className="space-x-4">
            <span className="text-matrix-dark">SYSTEM:</span>
            <span className="terminal-glow">MATRIX_PRIVACY_v2.1.0</span>
            <span className="text-matrix-dark">|</span>
            <span className="text-matrix-dark">STATUS:</span>
            <span className="text-matrix-green animate-glow">OPERATIONAL</span>
          </div>
          <div className="text-matrix-dark">
            Connection secure. Wake up, Neo.
          </div>
        </div>
      </div>
    </footer>
  );
}
