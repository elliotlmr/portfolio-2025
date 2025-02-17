import styles from './styles.module.scss';
import Close from '../../assets/close.svg';
import Skills from './Skills';
import Technologies from './Technologies';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  description: string[];
  skills: { title: string; icon: string }[];
  technologies: { title: string; icon: string; experience: number }[];
};

const Modale = ({
  open,
  setOpen,
  description,
  skills,
  technologies,
}: Props) => {
  return (
    open && (
      <div className={`${styles.modale} ${open && styles.open}`}>
        <button className={styles.close} onClick={() => setOpen(false)}>
          <Close />
        </button>
        <div className={styles.description}>
          {description.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
        <Skills skills={skills} />
        <Technologies technologies={technologies} />
      </div>
    )
  );
};

export default Modale;
