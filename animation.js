class Circle {
  constructor(index, x, y, radius, active, color, lineWidth) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.active = active;
    this.color = color;
    this.lineWidth = lineWidth;
  }
}

//RECEIVES AN ARRAY CONTAINING THE
//DOTS ON IN A KEYFRAME
class Pattern {
  constructor(ctx, keyFrames, options) {
    this.ctx = ctx;
    this.keyFrames = keyFrames;
    this.circles = [];
    this.sleepTime = options.sleepTime || 500;
    this.color = options.color || "#FFF";
    this.running = true;
    this.currentFrame = 0;
    let count = 0;

    //INITIATING CIRCLES
    for (let i = 0; i < 4; i++)
      for (let j = 3; j >= 0; j--)
        this.circles.push(
          new Circle(
            count++,
            12.5 + i * 35,
            12.5 + j * 35,
            10,
            false,
            this.color,
            5
          )
        );

    this.updateState(0);
    this.draw();
  }

  draw = () => {
    this.ctx.clearRect(0, 0, 150, 150);
    this.ctx.strokeStyle = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.lineWidth = 5;

    this.circles.forEach((circle) => {
      this.ctx.beginPath();
      this.ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
      circle.active ? this.ctx.fill() : this.ctx.stroke();
    });
  };

  updateState = (currentFrame) => {
    const activeCircles = this.keyFrames[currentFrame];
    this.circles.forEach(
      (circle) => (circle.active = activeCircles.includes(circle.index))
    );
  };

  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  setRunning = (running) => {
    this.running = running;
    if (running) this.loop();
  };

  loop = async () => {
    while (this.running) {
      this.draw();
      await this.sleep(this.sleepTime);
      this.updateState(this.currentFrame);
      this.currentFrame =
        this.currentFrame + 1 < this.keyFrames.length
          ? this.currentFrame + 1
          : 0;
    }
  };
}

const ctx1 = document.querySelector("#canvasPattern1").getContext("2d");
const ctx2 = document.querySelector("#canvasPattern2").getContext("2d");
const ctx3 = document.querySelector("#canvasPattern3").getContext("2d");
const ctx4 = document.querySelector("#canvasPattern4").getContext("2d");
const ctx5 = document.querySelector("#canvasPattern5").getContext("2d");
const ctx6 = document.querySelector("#canvasPattern6").getContext("2d");
const ctx7 = document.querySelector("#canvasPattern7").getContext("2d");
const ctx8 = document.querySelector("#canvasPattern8").getContext("2d");

let pattern1 = new Pattern(ctx1, [[]], { color: "#FFF" });
let pattern2 = new Pattern(
  ctx2,
  [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]],
  { color: "#FFF" }
);
let pattern3 = new Pattern(ctx3, [[0, 1, 2, 3, 4, 7, 8, 11, 12, 13, 14, 15]], {
  color: "#FFF",
});
let pattern4 = new Pattern(
  ctx4,
  [
    [0],
    [1],
    [2],
    [3],
    [4],
    [5],
    [6],
    [7],
    [8],
    [9],
    [10],
    [11],
    [12],
    [13],
    [14],
    [15],
  ],
  { color: "#FFF", sleepTime: 100 }
);
let pattern5 = new Pattern(
  ctx5,
  [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [12, 13, 14, 15],
    [8, 9, 10, 11],
    [4, 5, 6, 7],
    [0, 1, 2, 3],
  ],
  { color: "#FFF", sleepTime: 100 }
);
let pattern6 = new Pattern(
  ctx6,
  [
    [3, 6, 9, 12],
    [7, 10, 13, 8],
    [11, 14, 9, 4],
    [15, 10, 5, 0],
    [11, 6, 1, 4],
    [7, 2, 5, 8],
  ],
  { color: "#FFF", sleepTime: 100 }
);
let pattern7 = new Pattern(
  ctx7,
  [
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, , 10, 14],
    [3, 7, 11, 15],
  ],
  { color: "#FFF", sleepTime: 100 }
);
let pattern8 = new Pattern(
  ctx8,
  [
    [0],
    [1],
    [2],
    [3],
    [5],
    [7],
    [11],
    [3, 12],
    [0, 14],
    [0, 1, 2, 3, 5, 7, 9, 11, 12, 14],
    [0],
    [1],
    [2],
    [3],
    [4],
    [8],
    [0, 1, 2, 3, 4, 8],
    [0, 12],
    [1, 13],
    [2, 14],
    [3, 15],
    [6, 10],
    [0, 1, 2, 3, 6, 10, 12, 13, 14, 15],
  ],
  { color: "#FFF", sleepTime: 250 }
);

document.querySelector("#pattern1").addEventListener("mouseenter", () => {
  pattern1.color = "#0e83cd";
  pattern1.draw();
});
document.querySelector("#pattern1").addEventListener("mouseleave", () => {
  pattern1.color = "#fff";
  pattern1.draw();
});
document.querySelector("#pattern2").addEventListener("mouseenter", () => {
  pattern2.color = "#0e83cd";
  pattern2.draw();
});
document.querySelector("#pattern2").addEventListener("mouseleave", () => {
  pattern2.color = "#fff";
  pattern2.draw();
});
document.querySelector("#pattern3").addEventListener("mouseenter", () => {
  pattern3.color = "#0e83cd";
  pattern3.draw();
});
document.querySelector("#pattern3").addEventListener("mouseleave", () => {
  pattern3.color = "#fff";
  pattern3.draw();
});
document.querySelector("#pattern4").addEventListener("mouseenter", () => {
  pattern4.color = "#0e83cd";
  pattern4.setRunning(true);
});
document.querySelector("#pattern4").addEventListener("mouseleave", () => {
  pattern4.color = "#fff";
  pattern4.setRunning(false);
  pattern4.draw();
});
document.querySelector("#pattern5").addEventListener("mouseenter", () => {
  pattern5.color = "#0e83cd";
  pattern5.setRunning(true);
});
document.querySelector("#pattern5").addEventListener("mouseleave", () => {
  pattern5.color = "#fff";
  pattern5.setRunning(false);
  pattern5.draw();
});
document.querySelector("#pattern6").addEventListener("mouseenter", () => {
  pattern6.color = "#0e83cd";
  pattern6.setRunning(true);
});
document.querySelector("#pattern6").addEventListener("mouseleave", () => {
  pattern6.color = "#fff";
  pattern6.setRunning(false);
  pattern6.draw();
});
document.querySelector("#pattern7").addEventListener("mouseenter", () => {
  pattern7.color = "#0e83cd";
  pattern7.setRunning(true);
});
document.querySelector("#pattern7").addEventListener("mouseleave", () => {
  pattern7.color = "#fff";
  pattern7.setRunning(false);
  pattern7.draw();
});
document.querySelector("#pattern8").addEventListener("mouseenter", () => {
  pattern8.color = "#0e83cd";
  pattern8.setRunning(true);
});
document.querySelector("#pattern8").addEventListener("mouseleave", () => {
  pattern8.color = "#fff";
  pattern8.setRunning(false);
  pattern8.draw();
});
