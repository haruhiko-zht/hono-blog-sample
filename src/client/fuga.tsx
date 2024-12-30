import { createRoot } from 'react-dom/client';

function App() {
  return <div className="text-danger">fuga</div>;
}

const domNode = document.getElementById('root');
if (domNode) {
  const root = createRoot(domNode);
  root.render(<App />);
}
