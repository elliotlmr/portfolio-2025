import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import Modale from '../Modale';
import Nodejs from '@/assets/techs/node.svg';
import Linux from '@/assets/techs/linux.svg';
import Stripe from '@/assets/techs/stripe.svg';
import Cloudflare from '@/assets/techs/cloudflare.svg';
import Go from '@/assets/techs/go.svg';
import Php from '@/assets/techs/php.svg';
import Dart from '@/assets/techs/dart.svg';
import Hono from '@/assets/techs/hono.svg';
import Express from '@/assets/techs/express.svg';
import Mongo from '@/assets/techs/mongo.svg';
import Postgres from '@/assets/techs/postgres.svg';
import API from '@/assets/techs/api.svg';
import Strapi from '@/assets/techs/strapi.svg';
import Firebase from '@/assets/techs/firebase.svg';

const Backend = () => {
  const [open, setOpen] = useState<boolean>(false);

  const description = [
    'While frontend is my main strength, I have solid experience in backend development, ensuring smooth communication between services.',
    'I design and optimize backend architectures to be scalable, secure, and efficient for high-performance applications.',
    'I take satisfaction in working on databases, API design, and infrastructure, ensuring reliability and security at every level.',
    'I always implement CI/CD pipelines and DevOps strategies to streamline deployment and optimize development workflows.',
  ];

  const skills = [
    {
      title: 'Building and managing scalable backend architectures.',
      icon: '',
    },
    {
      title: 'Designing secure and efficient APIs infrastructures.',
      icon: '',
    },
    {
      title:
        'Optimizing microservices architectures to enhance scalability, maintainability, and system resilience',
      icon: '',
    },
    {
      title: 'CI/CD workflows for backend deployment',
      icon: '',
    },
    {
      title:
        'Ensuring data protection and compliance by integrating authentication, role management, and security best practices',
      icon: '',
    },
  ];

  const technologies = [
    {
      title: 'Express',
      icon: Express,
      experience: 2,
    },
    {
      title: 'SQL / PostgreSQL',
      icon: Postgres,
      experience: 2.5,
    },
    {
      title: 'NoSQL',
      icon: Mongo,
      experience: 2.5,
    },
    {
      title: 'NodeJS',
      icon: Nodejs,
      experience: 2.5,
    },
    // {
    //   title: 'API REST',
    //   icon: API,
    //   experience: 3,
    // },
    {
      title: 'Linux',
      icon: Linux,
      experience: 1.5,
    },
    {
      title: 'Firebase',
      icon: Firebase,
      experience: 2,
    },
    {
      title: 'Strapi',
      icon: Strapi,
      experience: 2.5,
    },
    {
      title: 'Go Lang',
      icon: Go,
      experience: 1.5,
    },
    {
      title: 'Dart',
      icon: Dart,
      experience: 2,
    },
    {
      title: 'PHP',
      icon: Php,
      experience: 1.5,
    },
    {
      title: 'Stripe',
      icon: Stripe,
      experience: 1.5,
    },
    {
      title: 'Cloudflare',
      icon: Cloudflare,
      experience: 1.5,
    },
    {
      title: 'Hono',
      icon: Hono,
      experience: 2,
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
          <span className={styles.right}>b</span>
          <span className={styles.left}>A</span>
          <span className={styles.left}>c</span>
          <span className={styles.right}>k</span>
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

export default Backend;
