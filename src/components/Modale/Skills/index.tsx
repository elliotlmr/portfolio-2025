import styles from './styles.module.scss';
import { useRef } from 'react';
import Left from '../../../assets/arrow_left.svg';
import Right from '../../../assets/arrow_right.svg';

type Props = {
  skills: { title: string; icon: string }[];
};

const Skills = ({ skills }: Props) => {
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
      <div className={styles.skills} ref={carouselRef}>
        {skills.map((skill, i) => {
          return (
            <div key={i} className={styles.skill}>
              <p className={styles.title}>{skill.title}</p>
              {skill.icon && <skill.icon />}
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

export default Skills;
