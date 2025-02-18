import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import Player from '@/components/Canvas/classes/Player';
import Circle from '@/components/Canvas/classes/Circle';
// import Point from '@/components/Canvas/classes/Point';

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvas = canvasRef.current;
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const [live, setLive] = useState<boolean>(true);
  // const [open, setOpen] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const scoreRef = useRef<number>(0);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const centerXRef = useRef<number>(
    canvas ? canvas.width / 2 : window.innerWidth / 2
  );
  const centerYRef = useRef<number>(
    canvas ? canvas.height / 2 : document.documentElement.clientHeight / 2
  );

  const radiusRef = useRef<number>(window.innerWidth <= 768 ? 50 : 300);
  const speed = 0.001; // Speed of the movement
  const timeRef = useRef<number>(0); // Time variable for animating
  const transitionDuration = 4000; // 2 seconds for the placement transition
  // const pulsingDuration = 2000; // 2 seconds for pulsing
  const startTimeRef = useRef<number | null>(null);

  const scrollAnimationIndex = useRef<string | null>(null);
  const scrollAnimationTimer = useRef<number | null>(null);

  const [world] = useState({
    maxSpeed: 6,
  });

  const circles = useMemo(
    () => [
      new Circle(
        { x: centerXRef.current, y: centerYRef.current },
        64,
        (2 * Math.PI) / -4,
        '#262626',
        9
      ),
      new Circle(
        { x: centerXRef.current, y: centerYRef.current },
        48,
        Math.PI / 4.5,
        '#262626',
        6
      ),
      new Circle(
        { x: centerXRef.current, y: centerYRef.current },
        32,
        (2 * Math.PI) / 2.5,
        '#262626',
        3
      ),
    ],
    []
  );

  const animationID = useRef<number | null>(null);

  const initialize = useCallback(() => {
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [canvas, context]);

  function infinityPath(t: number, offset: number) {
    const x = radiusRef.current * Math.sin(t + offset);
    const y = (radiusRef.current / 2) * Math.sin(2 * (t + offset));
    return { x, y };
  }

  const SECTIONS = useMemo(
    () => [
      {
        name: 'hero',
        condition: (scrollPosition: number) =>
          scrollPosition < document.documentElement.clientHeight ||
          scrollPosition >= 7 * document.documentElement.clientHeight,
        getTargetPositions: () => null, // Infinity animation, no fixed targets
      },
      {
        name: 'frontend',
        condition: (scrollPosition: number) =>
          scrollPosition >= document.documentElement.clientHeight &&
          scrollPosition < 2.5 * document.documentElement.clientHeight,
        getTargetPositions: (centerX: number, centerY: number) => [
          { x: centerX - 200 < 64 ? 64 : centerX - 200, y: centerY },
          {
            x:
              centerX + 200 > window.innerWidth - 64
                ? window.innerWidth - 64
                : centerX + 200,
            y: centerY,
          },
          { x: centerX, y: centerY },
        ],
      },
      {
        name: 'backend',
        condition: (scrollPosition: number) =>
          scrollPosition >= 2.5 * document.documentElement.clientHeight &&
          scrollPosition < 4 * document.documentElement.clientHeight,
        getTargetPositions: (centerX: number, centerY: number) => [
          { x: centerX - 200 < 64 ? 64 : centerX - 200, y: centerY * 0.5 },
          {
            x:
              centerX + 200 > window.innerWidth - 64
                ? window.innerWidth - 64
                : centerX + 200,
            y: centerY,
          },
          { x: centerX - 200 < 64 ? 64 : centerX - 200, y: centerY * 1.5 },
        ],
      },
      {
        name: 'more',
        condition: (scrollPosition: number) =>
          scrollPosition >= 4 * document.documentElement.clientHeight &&
          scrollPosition < 5.5 * document.documentElement.clientHeight,
        getTargetPositions: (centerX: number, centerY: number) => [
          { x: centerX, y: centerY },
          {
            x:
              centerX + 200 > window.innerWidth - 64
                ? window.innerWidth - 64
                : centerX + 200,
            y: centerY * 1.5,
          },
          { x: centerX - 200 < 64 ? 64 : centerX - 200, y: centerY * 1.5 },
        ],
      },
      {
        name: 'projects',
        condition: (scrollPosition: number) =>
          scrollPosition >= 5.5 * document.documentElement.clientHeight &&
          scrollPosition < 7 * document.documentElement.clientHeight,
        getTargetPositions: (centerX: number, centerY: number) => [
          {
            x: centerX,
            y: window.innerWidth <= 768 ? centerY - 48 : centerY - 80,
          },
          {
            x:
              centerX + 200 > window.innerWidth - 64
                ? window.innerWidth - 64
                : centerX + 200,
            y: centerY * 1.75,
          },
          {
            x: centerX,
            y: window.innerWidth <= 768 ? centerY + 64 : centerY + 104,
          },
        ],
      },
    ],
    []
  );

  const draw = useCallback(
    (currentTime: number) => {
      if (!canvas || !context) return;

      const scrollPosition = window.scrollY;

      // Determine the current section
      const activeSection = SECTIONS.find((section) =>
        section.condition(scrollPosition)
      );

      if (!activeSection) return;

      const elapsedTime = currentTime - (startTimeRef.current ?? currentTime);
      const transitionProgress = Math.min(elapsedTime / transitionDuration, 1);

      // Initialize timers
      if (!startTimeRef.current) startTimeRef.current = currentTime;

      // Detect section change
      if (scrollAnimationIndex.current !== activeSection.name) {
        scrollAnimationIndex.current = activeSection.name;
        scrollAnimationTimer.current = currentTime;
      }

      const scrollAnimationProgress = Math.min(
        (currentTime - (scrollAnimationTimer.current ?? currentTime)) / 1000,
        1
      );

      if (activeSection.name === 'hero') {
        if (elapsedTime < transitionDuration) {
          circles.forEach((circle) => {
            const targetPosition = infinityPath(timeRef.current, circle.offset);
            const adjustedTargetPosition = {
              x: centerXRef.current + targetPosition.x,
              y: centerYRef.current + targetPosition.y,
            };

            circle.lerpTransition(
              context,
              adjustedTargetPosition,
              transitionProgress
            );
          });
          // Handle reverse transition to infinity animation
        } else if (
          scrollAnimationIndex.current === 'hero' &&
          scrollAnimationProgress < 1
        ) {
          circles.forEach((circle) => {
            const targetPosition = infinityPath(timeRef.current, circle.offset);
            const adjustedTargetPosition = {
              x: centerXRef.current + targetPosition.x,
              y: centerYRef.current + targetPosition.y,
            };

            circle.lerpTransition(
              context,
              adjustedTargetPosition,
              scrollAnimationProgress
            );
          });
        } else {
          // Regular infinity animation
          circles.forEach((circle) => {
            const targetPosition = infinityPath(timeRef.current, circle.offset);
            circle.infinityAnimation(
              context,
              centerXRef.current,
              centerYRef.current,
              targetPosition
            );
          });
        }
      } else {
        // Handle lerp transition to section-specific positions
        const targetPositions = activeSection.getTargetPositions(
          centerXRef.current,
          centerYRef.current
        );

        if (targetPositions) {
          circles.forEach((circle, index) => {
            const targetPosition = targetPositions[index];
            circle.lerpTransition(
              context,
              targetPosition,
              scrollAnimationProgress
            );
          });
        }
      }

      // Increment time for infinity animation
      circles.forEach((circle) => {
        const verticalFactor = 1 + circle.position.y / radiusRef.current; // Scale factor for speed
        timeRef.current += speed * verticalFactor;
      });
    },
    [SECTIONS, canvas, circles, context]
  );

  const animate = useCallback(
    (currentTime: number) => {
      if (context) {
        initialize();

        draw(currentTime);

        animationID.current = requestAnimationFrame(animate);
      }
    },
    [context, draw, initialize]
  );

  const stopAnimation = useCallback(() => {
    setLive(false);
    window.cancelAnimationFrame(animationID.current!);
    animationID.current = null;
  }, []);

  const resize = useCallback(() => {
    if (canvas) {
      // Resize canvas to fit the window
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.clientHeight;
      canvas.style.top = '0';
      canvas.style.background = '#0e0e0e50';

      centerXRef.current = canvas.width / 2;
      centerYRef.current = canvas.height / 2;

      radiusRef.current = canvas.width >= 600 ? 300 : canvas.width / 2;
    }
  }, [canvas]);

  useEffect(() => {
    resize();

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      setContext(ctx);
    }

    if (context && live && !animationID.current) {
      animationID.current = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => resize());
    window.addEventListener('scroll', () => resize());

    //? Uncomment for point / player
    // window.addEventListener('keydown', handleKeydown);
    // window.addEventListener('keyup', handleKeyup);

    return () => {
      if (animationID.current) {
        cancelAnimationFrame(animationID.current);
      }
      window.removeEventListener('resize', () => resize());
      window.removeEventListener('scroll', () => resize());

      //? Uncomment for point / player
      // window.removeEventListener('keydown', handleKeydown);
      // window.removeEventListener('keyup', handleKeyup);
    };
  }, [canvasRef, context, live, animationID, canvas, resize, animate]);

  return {
    canvasRef,
    canvas,
    context,
    setContext,
    world,
    animationID,
    live,
    setLive,
    initialize,
    animate,
    stopAnimation,
    scoreRef,
    score,
    setScore,
  };
};

export default useCanvas;

// const player = useMemo(
//   () =>
//     new Player(
//       { x: centerXRef.current, y: centerYRef.current },
//       world.maxSpeed
//     ),
//   [world.maxSpeed]
// );

// const point = useMemo(
//   () =>
//     new Point(
//       { x: centerXRef.current, y: centerYRef.current },
//       { x: centerXRef.current, y: centerYRef.current },
//       '#A3A6A1'
//     ),
//   []
// );

// const handleKeydown = useCallback(
//   (event: KeyboardEvent) => {
//     switch (event.key) {
//       case 'z':
//         console.log('Go up');
//         player.goUp = true;
//         break;
//       case 'd':
//         console.log('Go right');
//         player.goRight = true;
//         break;
//       case 's':
//         console.log('Go down');
//         player.goDown = true;
//         break;
//       case 'q':
//         console.log('Go left');
//         player.goLeft = true;
//         break;
//       // case ' ':
//       //   if (player.velocity.y === 0) player.velocity.y -= 15;
//       //   break;
//     }
//   },
//   [player]
// );

// const handleKeyup = useCallback(
//   (event: KeyboardEvent) => {
//     switch (event.key) {
//       case 'z':
//         console.log('Stop up');
//         player.goUp = false;
//         break;
//       case 'd':
//         console.log('Stop right');
//         player.goRight = false;
//         break;
//       case 's':
//         console.log('Stop down');
//         player.goDown = false;
//         break;
//       case 'q':
//         console.log('Stop left');
//         player.goLeft = false;
//         break;
//     }
//   },
//   [player]
// );

//? Uncomment for point
// if (
//   point.position.x === centerXRef.current &&
//   point.position.y === centerYRef.current
// ) {
//   point.setNewPosition(canvas.width, canvas.height);
// }

//? Uncomment for point / player
// const playerXOnPoint =
//   (player.position.x < point.position.x + point.size &&
//     player.position.x > point.position.x) ||
//   (player.position.x + player.size < point.position.x + point.size &&
//     player.position.x + player.size > point.position.x);
// const playerYOnPoint =
//   (player.position.y < point.position.y + point.size &&
//     player.position.y > point.position.y) ||
//   (player.position.y + player.size < point.position.y + point.size &&
//     player.position.y + player.size > point.position.y);

// if (playerXOnPoint && playerYOnPoint && point.tangible) {
//   scoreRef.current += 1;
//   point.setNewPosition(canvas.width, canvas.height);
// }

// player.update(context);
// point.update(context, currentTime);
