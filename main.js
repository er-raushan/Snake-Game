let board = document.querySelector(".board");
let score = document.querySelector(".score");
let highscore = document.querySelector(".highscore");
let tiktik_timer = document.querySelector(".tiktik_timer");
let main=document.querySelector(".end")
let tiktik_timer_value = 0;



function gameover(){
  main.style.display="inherit";
}



let beginscore = 0;
score.textContent = beginscore;


if (localStorage.getItem("topscore") == null) {
  highscore.textContent = 0;
  localStorage.setItem("topscore", 0);
}
// highscore.textContent = localStorage.getItem("topscore");
highscore.textContent=localStorage.getItem("topscore");
tiktik_timer.textContent = tiktik_timer_value;


let tiktik = setInterval(() => {
  tiktik_timer_value += 1;
  tiktik_timer.textContent = tiktik_timer_value + " sec";
}, 1000);

let blocksize = 50;

let cols = Math.floor(board.clientWidth / blocksize);
let rows = Math.floor(board.clientHeight / blocksize);

const blocks = [];

// const snake = [
//   { x: 1, y: 9 },
//   { x: 1, y: 10 },
//   { x: 1, y: 11 },
// ];

const snake = [
  { x: 1, y: 9 },
  { x: 1, y: 10 },
];

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let block = document.createElement("div");
    block.classList.add("block");
    // block.textContent = `${i}-${j}`;
    board.append(block);
    blocks[`${i}-${j}`] = block;
  }
}

snake.forEach((segment) => {
  blocks[`${segment.x}-${segment.y}`].classList.add("fill");
});

// for food generation
function generatefood() {
  let food;
  do {
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
  } while (
    snake.some((part) => {
      return part.x === food.x && part.y === food.y;
    })
  );
  return food;
}

//changing The direction:--
let direction = "right";

function snakedirection() {
  document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowUp") {
      direction = "top";
    } else if (e.key == "ArrowDown") {
      direction = "bottom";
    } else if (e.key == "ArrowLeft") {
      direction = "left";
    } else if (e.key == "ArrowRight") {
      direction = "right";
    }
  });
}

let food = generatefood();
blocks[`${food.x}-${food.y}`].classList.add("food");

let timer = setInterval(() => {
  snakedirection();

  let head = null;
  //  Direction set of snake
  if (direction == "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction == "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction == "top") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  } else if (direction == "bottom") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  }

  snake.unshift(head);

  //  food eaten by snake
  if (head.x === food.x && head.y == food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = generatefood();
    blocks[`${food.x}-${food.y}`].classList.add("food");
    beginscore += 1;
    score.textContent = beginscore;
  } else {
    let last = snake.pop();
    if (last) {
      blocks[`${last.x}-${last.y}`].classList.remove("fill");
    }
  }

  snake.forEach((segment) => {
    let temp = blocks[`${segment.x}-${segment.y}`];
    if (temp) {
      blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    }
  });

  if (
    snake[0].x < 0 ||
    snake[0].y < 0 ||
    snake[0].x > rows ||
    snake[0].y > cols ||
    direction == ""
  ) {
    if (localStorage.getItem("topscore") < beginscore) {
      localStorage.setItem("topscore", beginscore);
    }

    clearInterval(timer);
    clearInterval(tiktik);
    console.log("Game Over");
    gameover()
  }
}, 400);


