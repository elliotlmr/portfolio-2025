type Position = {
  x: number;
  y: number;
};

export default class Point {
  position: { x: number; y: number };
  top: number;
  right: number;
  bottom: number;
  left: number;
  destination: { x: number; y: number };
  velocity: {
    x: number;
    y: number;
  };
  speed: number;
  size: number;
  color: string;
  opacity: number;
  lineWidth: number;
  tangible: boolean;

  constructor(position: Position, destination: Position, color: string) {
    this.position = position;
    this.top = position.y;
    this.right = position.x + 24; // 24 = size
    this.bottom = position.y + 24;
    this.left = position.x;
    this.destination = destination;
    this.velocity = { x: 0, y: 0 };
    this.speed = 10;
    this.size = 24;
    this.color = color;
    this.opacity = 0.5;
    this.lineWidth = 2;
    this.tangible = false;
  }

  draw(context: CanvasRenderingContext2D, time: number) {
    const timeToSeconds = time / 1000;
    const decimals = timeToSeconds - Math.floor(timeToSeconds);
    const incrementedDecimals =
      timeToSeconds + 0.5 - Math.floor(timeToSeconds + 0.5);
    // External circle
    context.beginPath();
    context.arc(
      this.position.x,
      this.position.y,
      this.size * incrementedDecimals,
      0,
      Math.PI * 2
    );

    context.globalAlpha = 1 - incrementedDecimals;
    context.fillStyle = this.color;

    context.fill();

    // Plusating circle
    context.beginPath();
    context.arc(
      this.position.x,
      this.position.y,
      this.size * decimals,
      0,
      Math.PI * 2
    );

    context.globalAlpha = 1 - decimals;
    context.fillStyle = this.color;

    context.fill();

    // Inner circle
    context.beginPath();
    context.arc(
      this.position.x,
      this.position.y,
      this.size / 4,
      0,
      Math.PI * 2
    );

    context.globalAlpha = 1;
    context.fillStyle = this.color;

    context.fill();
  }

  update(context: CanvasRenderingContext2D, time: number) {
    // const pointTop = this.position.y;
    // const pointRight = this.position.x + this.height;
    // const pointBottom = this.position.y + this.height;
    // const pointLeft = this.position.x;

    this.draw(context, time);

    //? Handle movements if position !== destination
    if (
      this.position.x !== this.destination.x ||
      this.position.y !== this.destination.y
    ) {
      //? X Axis movements
      if (this.position.x !== this.destination.x) {
        const xDifference = Math.abs(this.position.x - this.destination.x);

        if (xDifference > 10) {
          this.position.x < this.destination.x
            ? (this.position.x += this.speed * 2)
            : (this.position.x -= this.speed * 2);
        } else if (xDifference >= this.speed) {
          this.position.x < this.destination.x
            ? (this.position.x += this.speed)
            : (this.position.x -= this.speed);
        } else {
          this.position.x = this.destination.x;
        }
      }

      //? Y Avis movements
      if (this.position.y !== this.destination.y) {
        const yDifference = Math.abs(this.position.y - this.destination.y);

        if (yDifference > 10) {
          this.position.y < this.destination.y
            ? (this.position.y += this.speed * 2)
            : (this.position.y -= this.speed * 2);
        } else if (yDifference >= this.speed) {
          this.position.y < this.destination.y
            ? (this.position.y += this.speed)
            : (this.position.y -= this.speed);
        } else {
          this.position.y = this.destination.y;
          this.tangible = true;
        }
      }
    }
  }

  setNewPosition(innerWidth: number, innerHeight: number) {
    const randomX = Math.floor(Math.random() * innerWidth);
    const randomY = Math.floor(Math.random() * innerHeight);

    this.tangible = false;

    this.destination = {
      x: randomX,
      y: randomY,
    };
  }
}
