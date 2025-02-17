import styles from './styles.module.scss';
import useCanvas from '@/hooks/useCanvas';

const Canvas = () => {
  const { canvasRef } = useCanvas();

  return (
    <div className={styles.container}>
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
    </div>
  );
};

export default Canvas;
