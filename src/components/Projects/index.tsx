import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import Modale from './Modale';

const Projects = () => {
  const [open, setOpen] = useState<boolean>(false);

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = elementRef.current;

    if (!s) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          s.style.opacity = `${ratio < 0.15 ? 0 : ratio > 0.85 ? 1 : ratio}`; // Fade out
          s.style.transform = `scale(${1 + (1 - ratio) / 2})`; // Move up
        });
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) } // 0% to 100% detection
    );

    observer.observe(s);
    return () => observer.unobserve(s);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1
          className={`${styles.title} ${open && styles.open}`}
          onClick={() => setOpen(!open)}
          ref={elementRef}
        >
          <span>l</span>
          <span>&nbsp;</span>
          <span>⛶</span>
          <span>K</span>
        </h1>
      </div>
      <Modale open={open} setOpen={setOpen} />
    </section>
  );
};

export default Projects;
