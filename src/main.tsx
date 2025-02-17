import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import AnimatedCursor from 'react-animated-cursor';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AnimatedCursor
      innerSize={24}
      innerScale={0.5}
      innerStyle={{
        backgroundColor: 'rgba(255, 255, 255, 0)',
        border: '2px solid var(--grey-400)',
        width: '24px',
        height: '24px',
        // borderRadius: '4px',
        // mixBlendMode: 'exclusion',
      }}
      outerSize={8}
      outerStyle={{
        backgroundColor: 'var(--grey-400)',
        mixBlendMode: 'exclusion',
      }}
      outerAlpha={0.2}
      outerScale={3}
      clickables={[
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link',
        'p',
        'span',
        'svg',
      ]}
      trailingSpeed={12}
    />
    <App />
  </React.StrictMode>
);
