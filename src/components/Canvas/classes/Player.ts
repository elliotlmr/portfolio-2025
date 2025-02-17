type Position = {
  x: number;
  y: number;
};

export default class Player {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  acceleration: number;
  deceleration: number;
  size: number;
  maxSpeed: number;
  goUp: boolean;
  goRight: boolean;
  goDown: boolean;
  goLeft: boolean;
  opacity: number;

  constructor(position: Position, maxSpeed: number) {
    this.position = position;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.acceleration = 0.1;
    this.deceleration = 0.1;
    this.size = 8;
    this.maxSpeed = maxSpeed;
    this.goUp = false;
    this.goRight = false;
    this.goDown = false;
    this.goLeft = false;
    this.opacity = 0;
  }

  draw(context: CanvasRenderingContext2D) {
    // context.fill(this.position.x, this.position.y, 64, this.height);

    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);

    // context.lineWidth = this.lineWidth; // Border thickness
    context.strokeStyle = '#262626'; // Border color
    context.globalAlpha = this.opacity;

    context.stroke();
  }

  update(context: CanvasRenderingContext2D) {
    // const playerTop = this.position.y;
    // const playerRight = this.position.x + this.height;
    // const playerBottom = this.position.y + this.height;
    // const playerLeft = this.position.x;

    this.draw(context);

    //? Mouvements verticaux

    if (this.goUp && this.velocity.y > -this.maxSpeed) {
      this.velocity.y -= this.acceleration;
    }
    if (this.goDown && this.velocity.y < this.maxSpeed) {
      this.velocity.y += this.acceleration;
    }
    // Décélération / reset vertical
    if (!this.goUp && !this.goDown && this.velocity.y !== 0) {
      if (this.velocity.y < 0) {
        if (this.velocity.y > -0.5) {
          this.velocity.y = 0;
        } else if (this.velocity.y + 0.2 > -0.2) {
          this.velocity.y += this.deceleration / 2;
        } else {
          this.velocity.y += this.deceleration;
        }
      }
      if (this.velocity.y > 0) {
        if (this.opacity !== 1) {
          this.opacity = 1;
        }
        if (this.velocity.y < 0.5) {
          this.velocity.y = 0;
        } else if (this.velocity.y - 0.2 < 0.2) {
          this.velocity.y -= this.deceleration / 2;
        } else {
          this.velocity.y -= this.deceleration;
        }
      }
    }

    if (
      this.position.y + this.velocity.y > 0 &&
      this.position.y + this.velocity.y < window.innerHeight
    ) {
      this.position.y += this.velocity.y;
    }

    //? Mouvements latéraux

    if (this.goLeft && this.velocity.x > -this.maxSpeed) {
      this.velocity.x -= this.acceleration;
    }
    if (this.goRight && this.velocity.x < this.maxSpeed) {
      this.velocity.x += this.acceleration;
    }
    // Décélération / reset vertical
    if (!this.goLeft && !this.goRight && this.velocity.x !== 0) {
      if (this.velocity.x < 0) {
        if (this.velocity.x > -0.5) {
          this.velocity.x = 0;
        } else if (this.velocity.x + 0.2 > -0.2) {
          this.velocity.x += this.deceleration / 2;
        } else {
          this.velocity.x += this.deceleration;
        }
      }
      if (this.velocity.x > 0) {
        if (this.opacity !== 1) {
          this.opacity = 1;
        }
        if (this.velocity.x < 0.5) {
          this.velocity.x = 0;
        } else if (this.velocity.x - 0.2 < 0.2) {
          this.velocity.x -= this.deceleration / 2;
        } else {
          this.velocity.x -= this.deceleration;
        }
      }
    }

    if (
      this.position.x + this.velocity.x > 0 &&
      this.position.x + this.velocity.x < window.innerWidth
    ) {
      this.position.x += this.velocity.x;
    }
  }
}
