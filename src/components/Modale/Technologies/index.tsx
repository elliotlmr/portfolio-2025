import styles from './styles.module.scss';
import { useRef } from 'react';
import Left from '../../../assets/arrow_left.svg';
import Right from '../../../assets/arrow_right.svg';

type Props = {
  technologies: { title: string; icon: string; experience: number }[];
};

const Technologies = ({ technologies }: Props) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const previousRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const handleCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current && previousRef.current && nextRef.current) {
      const child =
        direction === 'left'
          ? (carouselRef.current.firstElementChild as HTMLDivElement)
          : (carouselRef.current.lastElementChild as HTMLDivElement);
      const button =
        direction === 'left' ? previousRef.current : nextRef.current;

      // Disable the button so we can't play the animation twice.
      button.setAttribute('disabled', 'true');

      child!.classList.add(`${styles.hide}`);
      setTimeout(() => {
        if (carouselRef.current) {
          direction === 'left'
            ? carouselRef.current.appendChild(child)
            : carouselRef.current.prepend(child);
        }
        child!.classList.remove(`${styles.hide}`);
      }, 100);

      setTimeout(() => {
        button.removeAttribute('disabled');
      }, 500);
    }
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => handleCarousel('right')}
        className={`${styles.button} ${styles.previous}`}
        ref={previousRef}
      >
        <Left />
      </button>
      <div className={styles.technologies} ref={carouselRef}>
        {technologies.map((tech, i) => {
          return (
            <div key={i} className={styles.tech}>
              {tech.icon && <tech.icon />}
              <p className={styles.title}>{tech.title}</p>
              <div className={styles.experience}>
                <div
                  className={`${styles.dot} ${
                    tech.experience === 0.5
                      ? styles.half
                      : tech.experience > 0.5 && styles.full
                  }`}
                />
                <div
                  className={`${styles.dot} ${
                    tech.experience === 1.5
                      ? styles.half
                      : tech.experience > 1.5 && styles.full
                  }`}
                />
                <div
                  className={`${styles.dot} ${
                    tech.experience === 2.5
                      ? styles.half
                      : tech.experience > 2.5 && styles.full
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => handleCarousel('left')}
        className={`${styles.button} ${styles.next}`}
        ref={nextRef}
      >
        <Right />
      </button>
    </div>
  );
};

export default Technologies;
