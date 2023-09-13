import { createRoot } from 'react-dom/client';
import { App } from '@src/app';

import './styles/main.scss';

const rootNode = document.getElementById('appRoot');
if (rootNode) {
  createRoot(rootNode).render(<App />);
}
