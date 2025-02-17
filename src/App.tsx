import './App.scss';
import AnimatedCursor from 'react-animated-cursor';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Canvas from './components/Canvas';
import Default from './layouts/Default';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import Frontend from './components/Frontend';
import Backend from './components/Backend';
import More from './components/More';
import Contact from './components/Contact';
import Projects from './components/Projects';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  return loading ? (
    <Loader />
  ) : (
    <Default>
      <>
        {/* <AnimatedCursor
          innerSize={24}
          innerScale={0.5}
          innerStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0)',
            border: '2px solid var(--grey-400)',
            width: '24px',
            height: '24px',
            // borderRadius: '4px',
            mixBlendMode: 'exclusion',
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
          ]}
          trailingSpeed={12}
        /> */}
        <Hero />
        <Frontend />
        <Backend />
        <More />
        <Projects />
        <Contact />
        <Canvas />
      </>
    </Default>
  );
}

export default App;
