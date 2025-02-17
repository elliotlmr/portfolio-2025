import './App.scss';
import Hero from './components/Hero';
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
