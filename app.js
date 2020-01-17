let pos = 0;
var apple = [];
var appleX = Math.floor(Math.random() * 20) + 1;
var appleY = Math.floor(Math.random() * 20) + 1;
apple.push([appleX, appleY]);
function backbite(n, path) {
  let i; 
  let j;
  let x; 
  let y;
  let dx;
  let dy;
  let xedge;
  let yedge;
  let iedge;
  let add_edge;
  let success;
  let temp;
  const itemp = Math.floor(Math.random() * 2);
  const nsq = n * n;

  x = path[nsq - 1][0];
  y = path[nsq - 1][1];
  xedge = ((x == 0) || (x == n - 1));
  yedge = ((y == 0) || (y == n - 1));
  if (xedge && yedge) {
    add_edge = Math.floor(Math.random() * 3) - 2;
  } else if (xedge || yedge) {
    add_edge = Math.floor(Math.random() * 3) - 1;
  } else {
    add_edge = Math.floor(Math.random() * 3);
  }
  success = (add_edge >= 0);
  iedge = 0;
  i = nsq - 4;
  while (iedge <= add_edge) {
    dx = Math.abs(x - path[i][0]);
    dy = Math.abs(y - path[i][1]);
    if (dx + dy == 1) {
      if (iedge == add_edge) {
        const jlim = (nsq - 1 - i - 1) / 2;
        for (j = 0; j < jlim; j++) {
          temp = path[nsq - 1 - j];
          path[nsq - 1 - j] = path[i + 1 + j];
          path[i + 1 + j] = temp;
        }
      }
      iedge++;
    }
    i -= Math.max(2, dx + dy - 1);
  }
  return success;
}

function generate_hamiltonian_path(n, q) {
  const path = new Array(n * n);
  let i; let j;
  let nsuccess; let
    nattempts;
  for (i = 0; i < n; i++) {
    if (i % 2 == 0) {
      for (j = 0; j < n; j++) {
        path[i * n + j] = [i, j];
      }
    } else {
      for (j = 0; j < n; j++) {
        path[i * n + j] = [i, n - j - 1];
      }
    }
  }
  nsuccess = 0;
  nattempts = 0;
  var nmoves = q * 10.0 * n * n * Math.pow(Math.log(2.0 + n), 2);
  while (nsuccess < nmoves) {
    var success = backbite(n, path);
    if (success){ 
	nsuccess++;
    nattempts++;
	}
  }
  for (i = 0; i < nattempts; i++) {
    success = backbite(n, path);
  }
  return path;
}
function generate_hamiltonian_circuit(n, q) {
  const path = generate_hamiltonian_path(n, q);
  const nsq = n * n;
  const min_dist = 1 + (n % 2);
  while (Math.abs(path[nsq - 1][0] - path[0][0]) + Math.abs(path[nsq - 1][1] - path[0][1]) !== min_dist) {
    success = backbite(n, path);
  }
  return path;
}

function drawGrid(path){
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.strokeStyle = "black";
for (let i = 1; i <= 20; i++){
	ctx.moveTo(i * 20, 0);
	ctx.lineTo(i * 20, 400);
	ctx.stroke();
	ctx.moveTo(0, i * 20);
	ctx.lineTo(400, i * 20);
	ctx.stroke();
}
}

function clearCanvas(){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, 400, 400);
}
function drawRect(path){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.fillStyle = "green";
	ctx.fillRect(path[pos][0] * 20, path[pos][1] * 20, 20, 20);
    ctx.fillStyle = "red";
    ctx.fillRect(apple[0][0] * 20, apple[0][1] * 20, 20, 20);
    if(path[pos][0] == apple[0][0] && path[pos][1] == apple[0][1]){
        console.log("bruh");
    }
    if(pos < 399){
    pos++;
    }else{
        pos = 0;
    }
}
function update(path){
	clearCanvas();
	drawRect(path);
	drawGrid();
    collision(path);
}
function collision(path){
    
}
function drawApple(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.fillStyle = "red";
    ctx.fillRect(apple[0][0] * 20, apple[0][1] * 20, 20, 20);
}
function refresh_path() {
  var myCanvas = document.getElementById("myCanvas");
  var ctx = myCanvas.getContext("2d");
  var myWidth = 400;
  var myHeight = 400;
  const n = 20;
  const q = 1;
  const path = generate_hamiltonian_circuit(n, q);
  var interval = setInterval(function(){update(path);}, 30);
  return;
}