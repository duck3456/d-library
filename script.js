const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");

//initialization
dlCanvas = canvas;
dlCtx = ctx;

canvas.addEventListener("mousemove", dlGetMousePosition);

let background = new dlRectangle(0, 0, 700, 700, "#666666");
let circle1 = new dlCircle(100, 100, 20, "#ffffff");
let image1 = new dlImage("x.png", 400, 400);
let text1 = new dlText("hello world!", 50, "Comic Sans MS", 300, 200, "#ffff00", true);

let rect1 = new dlRectangle(200, 200, 100, 20, "#0000ff");
let rect2 = new dlRectangle(200, 500, 50, 50, "#ff0000");

canvas.addEventListener("click", function() { 
	if (rect1.IsClicked()) {
		alert("hi");
	} else if (background.IsClicked()) {
		alert("hello");
	}
}, false);

function update() {
	rect2.x = Math.round(dlMouseX)-rect2.w/2;
	rect2.y = Math.round(dlMouseY)-rect2.h/2;

	if (dlRectRectCollision(rect1, rect2) || dlRectCircleCollision(rect2, circle1)) {
		rect2.color = "#dd0000";
	} else {
		rect2.color = "#ff0000";
	}
}

function render() {
	background.Draw();
	circle1.Draw();
	//image1.Draw();
	text1.Draw();

	rect1.Draw();
	rect2.Draw();
}

function game() {
	update();
	render();
}

const frames = 50;
setInterval(game, 1000/frames);