import { createRoot } from 'react-dom/client';

function App() {
  return <>hoge</>;
}

const domNode = document.getElementById('root');
if (domNode) {
  const root = createRoot(domNode);
  root.render(<App />);
}
