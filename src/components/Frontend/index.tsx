import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import Modale from '../Modale';
// Skills
import SEO from '@/assets/skills/front/seo.svg';
import Rework from '@/assets/skills/front/rework.svg';
import Webapp from '@/assets/skills/front/webapp.svg';
import Mobile from '@/assets/skills/front/mobile.svg';
import Feature from '@/assets/skills/front/feature.svg';

// Experiences
import Typescript from '@/assets/techs/typescript.svg';
import ReactIcon from '@/assets/techs/react.svg';
import Expo from '@/assets/techs/expo.svg';
import Flutter from '@/assets/techs/flutter.svg';
import Vue from '@/assets/techs/vue.svg';
import Hubl from '@/assets/techs/hubspot.svg';
import Php from '@/assets/techs/php.svg';
import Html from '@/assets/techs/html.svg';
import Css from '@/assets/techs/css.svg';

const Frontend = () => {
  const [open, setOpen] = useState<boolean>(false);

  const description = [
    'Frontend is my core expertise.',
    'I thrive in projects that require both technical precision and creative problem-solving, especially in UI/UX-heavy applications.',
    'I enjoy working with new technologies and continuously improving my skill set to stay ahead in the ever-evolving web ecosystem.',
    'I prioritize clean, maintainable code and best practices, ensuring long-term scalability and efficiency.',
  ];

  const skills = [
    {
      title: 'SEO Best practices and tracking, to improve visibility',
      icon: SEO,
    },
    {
      title:
        'Refactor or rework of legacy codebase to improve apps performances, while maintaining project continuity',
      icon: Rework,
    },
    {
      title: 'Development and deployment of complexe web apps',
      icon: Webapp,
    },
    {
      title: 'Development and deployment of Android and/or iOS apps',
      icon: Mobile,
    },
    {
      title:
        'Feature implementation and/or improvement in an existing application',
      icon: Feature,
    },
  ];

  const technologies = [
    {
      title: 'Typescript',
      icon: Typescript,
      experience: 3,
    },
    {
      title: 'React / Next',
      icon: ReactIcon,
      experience: 3,
    },
    {
      title: 'Expo / React Native',
      icon: Expo,
      experience: 2.5,
    },
    {
      title: 'Flutter / Dart',
      icon: Flutter,
      experience: 2,
    },
    {
      title: 'Vue / Nuxt',
      icon: Vue,
      experience: 3,
    },
    {
      title: 'Hubl',
      icon: Hubl,
      experience: 1.5,
    },
    {
      title: 'PHP',
      icon: Php,
      experience: 1,
    },
    {
      title: 'HTML',
      icon: Html,
      experience: 3,
    },
    {
      title: 'CSS',
      icon: Css,
      experience: 3,
    },
  ];

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
      <div className={`${styles.container} ${open && styles.open}`}>
        <h1
          className={`${styles.title} ${open && styles.open}`}
          onClick={() => setOpen(!open)}
          ref={elementRef}
        >
          <span className={styles.f}>f</span>
          <span className={styles.r}>R</span>
          <span className={styles.o}>⛶</span>
          <span className={styles.n}>n</span>
          <span className={styles.t}>t</span>
        </h1>
      </div>
      <Modale
        open={open}
        setOpen={setOpen}
        description={description}
        skills={skills}
        technologies={technologies}
      />
    </section>
  );
};

export default Frontend;
