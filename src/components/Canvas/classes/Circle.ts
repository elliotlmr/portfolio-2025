type Position = {
  x: number;
  y: number;
};

export default class Circle {
  position: { x: number; y: number };
  size: number;
  offset: number;
  color: string;
  opacity: number;
  lineWidth: number;
  maxScore: number;

  constructor(
    position: Position,
    size: number,
    offset: number,
    color: string,
    maxScore: number
  ) {
    this.position = position;
    this.size = size;
    this.offset = offset;
    this.color = color;
    this.opacity = 1;
    this.lineWidth = 2;
    this.maxScore = maxScore;
  }

  draw(context: CanvasRenderingContext2D) {
    const responsiveSize = window.innerWidth <= 768 ? this.size / 2 : this.size;

    context.beginPath();
    context.arc(
      this.position.x,
      this.position.y,
      responsiveSize,
      0,
      Math.PI * 2
    );

    context.lineWidth = this.lineWidth; // Border thickness
    context.strokeStyle = this.color; // Border color
    context.globalAlpha = this.opacity;
    context.fillStyle = this.color;

    context.fill();
    context.stroke();
  }

  lerp(start: number, end: number, t: number) {
    return start + (end - start) * t;
  }

  lerpTransition(
    context: CanvasRenderingContext2D,
    targetPosition: { x: number; y: number },
    transitionProgress: number
  ) {
    // Smoothly interpolate position towards the target
    this.position.x = this.lerp(
      this.position.x,
      targetPosition.x,
      transitionProgress
    );
    this.position.y = this.lerp(
      this.position.y,
      targetPosition.y,
      transitionProgress
    );

    // Draw the circle at the interpolated position
    this.draw(context);
  }

  infinityAnimation(
    context: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    targetPosition: { x: number; y: number }
  ) {
    this.position.x = centerX + targetPosition.x;
    this.position.y = centerY + targetPosition.y;

    this.draw(context);
  }
}
