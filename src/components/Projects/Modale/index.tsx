import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Close from '@/assets/close.svg';
import Computer from '@/assets/projects/computer.svg';
import Mobile from '@/assets/projects/mobile.svg';
import Article from '@/assets/projects/article.svg';
import Applications from '@/assets/projects/applications.svg';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type Project = {
  employer: string;
  title: string;
  icon: string;
  description: string;
  improvements: string;
  numbers: {
    title: string;
    before: string | number | null;
    after: string | number | null;
  }[];
  link: string | null;
  date: string;
  role: string;
};

const projects: Project[] = [
  {
    employer: 'La Clinique E-Santé',
    title: 'LCES Website',
    icon: Computer,
    description:
      'Complete redesign of an old website, transitioning from a poorly optimized and poorly integrated HubSpot website to a Nuxt (Vue) website.',
    improvements:
      'Significant performance improvement, SEO, traffic groth, modularity and scalability.',
    numbers: [
      {
        title: 'SEO Checker Note',
        before: 62,
        after: 86,
      },
    ],
    link: 'https://www.la-clinique-e-sante.com/',
    date: 'Jul - Nov 2023',
    role: 'Fullstack w/ infra',
  },
  {
    employer: 'La Clinique E-Santé',
    title: 'LCES Mobile App',
    icon: Mobile,
    description:
      'Full migration of an old WebView-based mobile application to a native application using Flutter.',
    improvements:
      'Loading time improvement, iOS / Android compatibility, broader range of supported mobile phones, scalability.',
    numbers: [
      {
        title: 'Clients using the application',
        before: '80%',
        after: null,
      },
    ],
    link: null,
    date: 'Aug - Dec 2023',
    role: 'Front > Back',
  },
  {
    employer: 'La Clinique E-Santé',
    title: 'LCES Blog',
    icon: Article,
    description:
      'Technical and graphical redesign of the blog of a leading company in the field of mental health in France. Migration from the HubSpot CMS to a stack using Nuxt (for the frontend) and Strapi (Headless CMS for article management and creation).',
    improvements:
      'Better UX with the new CMS for the blog writers, great traffic groth, better usage of CTAs or custom components',
    numbers: [
      {
        title: 'Visitors groth in 2023',
        before: '30%',
        after: null,
      },
      {
        title: 'Visitors per month',
        before: '500K ~ 1M',
        after: null,
      },
      {
        title: 'Top 1 blog article visits / month',
        before: '~50 000',
        after: null,
      },
    ],
    link: 'https://www.la-clinique-e-sante.com/blog',
    date: 'Jul - Nov 2023',
    role: 'Fullstack w/ infra',
  },
  {
    employer: 'La Clinique E-Santé',
    title: 'LCES Web Applications',
    icon: Applications,
    description:
      'Development and deployment of multiple web applications the provide services to the clients of the company, but also to the company workers ( paymentflow app, client app, backoffice, data tracking app, collaborators app ).',
    improvements:
      'UX improvements, better accessibility, new features for both clients and workers, scalability and flexibility.',
    numbers: [
      {
        title: 'Clients',
        before: 15000,
        after: null,
      },
      {
        title: 'Lines of code',
        before: '174 145',
        after: null,
      },
      {
        title: 'applications deployed',
        before: '7',
        after: null,
      },
    ],
    link: null,
    date: 'Feb 2022 - Aug 2024',
    role: 'Fullstack w/ infra',
  },
];

const Modale = ({ open, setOpen }: Props) => {
  const [selected, setSelected] = useState<Project | null>(projects[0]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    open && (
      <div className={`${styles.modale} ${open && styles.open}`}>
        <button className={styles.close} onClick={() => setOpen(false)}>
          <Close />
        </button>

        <div className={styles.selection}>
          <div className={styles.header}>
            <p className={styles.title}>{selected?.title}</p>
            <p className={styles.employer}>
              <span>Employer : </span>
              {selected?.employer}
            </p>
          </div>
          <p className={styles.title}>About this project :</p>
          <p className={styles.answer}>{selected?.description}</p>
          <p className={styles.title}>What for ?</p>
          <p className={styles.answer}>{selected?.improvements}</p>
          <p className={styles.title}>Some numbers :</p>
          <div className={styles.numbers}>
            {selected?.numbers.map((number, j) => {
              return (
                <div className={styles.number} key={j}>
                  <p className={styles.data}>
                    {number.before} {number.after && `→ ${number.after}`}
                  </p>
                  <p className={styles.legend}>{number.title}</p>
                </div>
              );
            })}
          </div>
          <p className={styles.link}>
            <span>Link : </span>
            {selected?.link ? (
              <a href={selected?.link} target='_blank'>
                {selected?.link}
              </a>
            ) : (
              'Unavailable'
            )}
          </p>
          <div className={styles.footer}>
            <p className={styles.role}>
              <span>My role : </span>
              {selected?.role}
            </p>
            <p className={styles.date}>
              <span>Realisation Date : </span>
              {selected?.date}
            </p>
          </div>
        </div>

        <div className={styles.carousel}>
          {projects.map((project, i) => (
            <div
              className={`${styles.card} ${
                project === selected && styles.selected
              }`}
              key={i}
              onClick={() => setSelected(project)}
            >
              <project.icon />
              <p>{project.title}</p>
            </div>
          ))}
          <div className={styles.card}>
            <p>more coming ..</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Modale;
