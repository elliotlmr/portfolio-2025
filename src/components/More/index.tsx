import { useEffect, useRef, useState } from 'react';
import Modale from '../Modale';
import styles from './styles.module.scss';
import Figma from '@/assets/techs/figma.svg';
import CICD from '@/assets/techs/cicd.svg';
import Infra from '@/assets/techs/infrastructure.svg';
import UIUX from '@/assets/techs/uiux.svg';
import TDD from '@/assets/techs/tdd.svg';
import DDD from '@/assets/techs/ddd.svg';
import SCRUM from '@/assets/techs/scrum.svg';
import Master from '@/assets/techs/master.svg';
import Turborepo from '@/assets/techs/turborepo.svg';
import Github from '@/assets/techs/github.svg';
import Communication from '@/assets/techs/communication.svg';

const More = () => {
  const [open, setOpen] = useState<boolean>(false);

  const description = [
    'Beyond coding, I have a deep understanding of UI/UX and performance optimization, making my approach well-rounded.',
    'I value teamwork and collaboration, ensuring smooth communication and productive workflows in any team.',
    'I have experience as SCRUM Master, organizing sprint planning, backlog refinement, and retrospectives.',
    'The most important to me is to deliver high-quality, well-thought-out solutions.',
  ];

  const skills = [
    {
      title:
        'Designing intuitive and engaging user experiences with strong UI/UX principles.',
      icon: '',
    },
    {
      title:
        'Implementing TDD and DDD methodologies to ensure scalable, maintainable, and high-quality software development.',
      icon: '',
    },
    {
      title:
        'Managing AGILE workflows, including sprint planning, backlog refinement, and retrospectives.',
      icon: '',
    },
    {
      title:
        'Analyzing project needs and identifying valuable features to enhance functionality, user engagement, and business impact.',
      icon: '',
    },
    {
      title:
        'Strong adaptability and enthusiasm for evolving projects, continuously seeking improvements and optimizations.',
      icon: '',
    },
  ];

  const technologies = [
    {
      title: 'Version Control System',
      icon: Github,
      experience: 2.5,
    },
    {
      title: 'CI / CD',
      icon: CICD,
      experience: 3,
    },
    {
      title: 'Infrastructure Setup',
      icon: Infra,
      experience: 1.5,
    },
    {
      title: 'UI / UX',
      icon: UIUX,
      experience: 2,
    },
    {
      title: 'Test Driven Development',
      icon: TDD,
      experience: 2,
    },
    {
      title: 'Domain Driven Design',
      icon: DDD,
      experience: 2.5,
    },
    {
      title: 'Figma',
      icon: Figma,
      experience: 2.5,
    },
    {
      title: 'SCRUM Method',
      icon: SCRUM,
      experience: 2.5,
    },
    {
      title: 'SCRUM Master',
      icon: Master,
      experience: 1.5,
    },
    {
      title: 'Monorepo Management',
      icon: Turborepo,
      experience: 2.5,
    },
    {
      title: 'Communication',
      icon: Communication,
      experience: 2.5,
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
      <div className={styles.container}>
        <h1
          className={`${styles.title} ${open && styles.open}`}
          onClick={() => setOpen(!open)}
          ref={elementRef}
        >
          <span>&</span>
          <span style={{ transitionDelay: '.1s' }}>M</span>
          <span>&nbsp;</span>
          <span style={{ transitionDelay: '.2s' }}>R</span>
          <span style={{ transitionDelay: '.3s' }}>e</span>
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

export default More;
