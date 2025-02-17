import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import LinkedIn from '@/assets/contact/linkedin.svg';
import GitHub from '@/assets/techs/github.svg';
import Mail from '@/assets/contact/mail.svg';

const data = [
  {
    title: 'Email',
    icon: Mail,
    link: 'mailto:lemaireelliot@gmail.com',
  },
  {
    title: 'LinkedIn',
    icon: LinkedIn,
    link: 'https://www.linkedin.com/in/elliot-lemaire/',
  },
  {
    title: 'GitHub',
    icon: GitHub,
    link: 'https://github.com/elliotlmr',
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
        <div className={styles.bot}>
          {data.map((entry, i) => {
            return (
              <a
                className={styles.entry}
                href={entry.link}
                target='_blank'
                key={i}
              >
                {entry.icon && <entry.icon />}
                <p className={styles.title}>{entry.title}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;
