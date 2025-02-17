import styles from './styles.module.scss';

const Loader = () => {
  return (
    <section className={styles.section}>
      <div className={`${styles.circle} ${styles.l}`}></div>
      <div className={`${styles.circle} ${styles.m}`}></div>
      <div className={`${styles.circle} ${styles.s}`}></div>
    </section>
  );
};

export default Loader;
