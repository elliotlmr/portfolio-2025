import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Help from '@/assets/help.svg';

type Props = {
  children: JSX.Element;
};

const Default = ({ children }: Props) => {
  const [help, setHelp] = useState(false);
  const [transition, setTransition] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  let timeoutId: string | number | NodeJS.Timeout | undefined;

  const handleModale = () => {
    clearTimeout(timeoutId);

    help && setTransition(true);

    timeoutId = setTimeout(
      () => {
        setHelp(!help);
        setTransition(false);
      },
      help ? 400 : 0
    );
  };

  useEffect(() => {
    const handleScrollPosition = () => {
      const newPos = Math.floor(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      );

      setScrollPosition(newPos);
    };

    window.addEventListener('scroll', handleScrollPosition);

    return () => window.removeEventListener('scroll', handleScrollPosition);
  }, []);

  return (
    <div className={styles.layout}>
      {/* <div className={`${styles.scrollbar} ${styles.top}`} /> */}
      <div
        className={`${styles.scrollbar} ${styles.right}`}
        style={{ height: `${scrollPosition}vh` }}
      />
      {/* <div className={`${styles.scrollbar} ${styles.bot}`} /> */}
      <div
        className={`${styles.scrollbar} ${styles.left}`}
        style={{ height: `${scrollPosition}vh` }}
      />
      <header className={styles.header}>
        <p className={styles.name}>ELLIOT LEMAIRE</p>
        <p className={styles.job}>FULLSTACK DEVELOPER</p>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.help} onClick={handleModale}>
          <Help />
        </div>
        <p className={styles.secret}>41°42'53.1"N 12°19'04.0"E - Apr 2018.</p>
        {help && (
          <div className={`${styles.modale} ${transition && styles.close}`}>
            This portfolio is still a work in progress. All the projects I
            worked on are not presented yet, so feel free to visit my Github to
            see more !
          </div>
        )}
      </footer>
    </div>
  );
};

export default Default;
