import { useEffect, useRef, useState } from 'react';
import Player from '@/components/Game/classes/Player';
import Sprite from '@/components/Game/classes/Sprite';
import image from '@/assets/bg.png';

type Canvas = {
  width: number;
  height: number;
};

const useGameActions = (canvas: Canvas) => {
  const canvasScaling = 0.5;
  const scaledCanvas = {
    width: canvas.width / canvasScaling,
    height: canvas.height / canvasScaling,
  };
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const [live, setLive] = useState<boolean>(true);

  const [world] = useState({
    gravity: 0.5,
    maxSpeed: 10,
  });

  const player = new Player({ x: 50, y: 50 }, world.gravity, world.maxSpeed);

  const background = new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    src: image,
  });

  const animationID = useRef<number | null>(null);

  function initialize() {
    if (context) {
      context.fillStyle = '#F0F2F2';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  function animate() {
    if (context) {
      animationID.current = window.requestAnimationFrame(animate);
      initialize();

      context.save();
      context.scale(canvasScaling, canvasScaling);
      context.translate(0, -background.image.height + scaledCanvas.height);
      background.update(context);
      context.restore();

      player.update(context);
    }
  }

  function stopAnimation() {
    setLive(false);
    window.cancelAnimationFrame(animationID.current!);
    animationID.current = null;
  }

  function handleKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'd':
        console.log('Go right');
        player.goRight = true;
        break;
      case 'q':
        console.log('Go left');
        player.goLeft = true;
        break;
      case ' ':
        if (player.velocity.y === 0) player.velocity.y -= 15;
        console.log(background.image);
        break;
    }
  }

  function handleKeyup(event: KeyboardEvent) {
    switch (event.key) {
      case 'd':
        console.log('Stop right');
        player.goRight = false;
        // player.velocity.x = 0;
        break;
      case 'q':
        console.log('Stop left');
        player.goLeft = false;
        // player.velocity.x = 0;
        break;
    }
  }

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      setContext(ctx);
    }
    initialize();
    if (context && live && !animationID.current) {
      animate();
    }

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [canvasRef, context, live, animationID]);

  return {
    canvasRef,
    canvas,
    context,
    setContext,
    world,
    animationID,
    live,
    setLive,
    player,
    initialize,
    animate,
    stopAnimation,
    handleKeydown,
    handleKeyup,
  };
};

export default useGameActions;
