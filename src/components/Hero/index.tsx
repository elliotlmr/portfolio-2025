import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

const Hero = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    const firstTitle = titleRef.current;
    const secondTitle = sectitleRef.current;

    if (!element || !firstTitle || !secondTitle) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          firstTitle.style.opacity = `${(entry.intersectionRatio - 0.5) * 2}`; // Fade out
          firstTitle.style.transform = `scale(${
            1 + (1 - ratio) / 4
          }) translateY(${(1 - ratio) * 50}%)`;
          secondTitle.style.opacity = `${(entry.intersectionRatio - 0.5) * 2}`; // Fade out
          secondTitle.style.transform = `scale(${
            1 + (1 - ratio) / 4
          }) translateY(${(1 - ratio) * 50}%)`;
        });
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) } // 0% to 100% detection
    );

    observer.observe(element);
    return () => {
      observer.unobserve(element);
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container} ref={elementRef}>
        <h1 className={styles.top} ref={titleRef}>
          <span className={styles.before} style={{ animationDelay: '.4s' }}>
            3
          </span>
          <span className={styles.before} style={{ animationDelay: '.2s' }}>
            -
          </span>
          <span className={styles.before}>s</span>
          <span className={styles.center}>t</span>
          <span className={styles.after}>A</span>
          <span className={styles.after} style={{ animationDelay: '.2s' }}>
            c
          </span>
          <span className={styles.after} style={{ animationDelay: '.4s' }}>
            K
          </span>
        </h1>
        <h1 className={styles.bot} ref={sectitleRef}>
          <span>S</span>
          <span>o</span>
          <span>l</span>
          <span>u</span>
          <span>t</span>
          <span>i</span>
          <span>o</span>
          <span>n</span>
        </h1>
      </div>
    </section>
  );
};

export default Hero;
