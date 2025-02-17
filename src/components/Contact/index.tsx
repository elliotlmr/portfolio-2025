import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

const data = [
  {
    title: 'LinkedIn',
    icon: null,
    link: '',
  },
  {
    title: '',
    icon: null,
    link: '',
  },
  {
    title: '',
    icon: null,
    link: '',
  },
];

const Contact = () => {
  const sRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = sRef.current;

    if (!s) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.target.classList.contains(styles.visible) &&
            !entry.isIntersecting
          ) {
            entry.target.classList.remove(styles.visible);
          }

          if (
            !entry.target.classList.contains(styles.visible) &&
            entry.isIntersecting
          ) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.9 } // 0% to 100% detection
    );

    observer.observe(s);
    return () => observer.unobserve(s);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container} ref={sRef}>
        <h1 className={styles.top}>
          <span>c</span>
          <span>o</span>
          <span>n</span>
          <span>t</span>
          <span>A</span>
          <span>c</span>
          <span>t</span>
        </h1>
      </div>
    </section>
  );
};

export default Contact;
