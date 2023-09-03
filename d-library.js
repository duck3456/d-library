let dlCanvas, dlCtx;
let dlMouseX, dlMouseY;

function dlGetMousePosition() {
    let rect = dlCanvas.getBoundingClientRect();

	dlMouseX = event.clientX - rect.left;
	dlMouseY = event.clientY - rect.top;
}

function dlRectRectCollision(rectA, rectB) {
	if (rectA.x < rectB.x + rectB.w && rectA.x + rectA.w > rectB.x && rectA.y < rectB.y + rectB.h && rectA.y + rectA.h > rectB.y) {
		return true;
	}
}

//https://stackoverflow.com/questions/21089959/detecting-collision-of-rectangle-with-circle
function dlRectCircleCollision(rect, circle) {
    let distX = Math.abs(circle.x - rect.x-rect.w/2);
    let distY = Math.abs(circle.y - rect.y-rect.h/2);

    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    let dx=distX-rect.w/2;
    let dy=distY-rect.h/2;
    return (dx*dx+dy*dy<=(circle.r*circle.r));
}

class dlRectangle {
	constructor(x, y, w, h, color) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = color;
	}

	Draw() {
		dlCtx.fillStyle = this.color;
		dlCtx.fillRect(this.x, this.y, this.w, this.h);
	}

	IsClicked() {
		if (dlMouseX >= this.x && dlMouseX <= this.x + this.w && dlMouseY >= this.y && dlMouseY <= this.y+this.h) {
			return true;
		}
	}
}

class dlCircle {
	constructor(x, y, r, color) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = color;
	}

	Draw() {
		dlCtx.fillStyle = this.color;
		dlCtx.beginPath();
		dlCtx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
		dlCtx.closePath();
		dlCtx.fill();
	}
}

class dlImage {
	constructor(src, x, y, w, h) {
		this.src = src;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	Draw() {
		let image = document.createElement("img");
		image.src = this.src;

		let xDuplicate = this.x;
		let yDuplicate = this.y;
		let wDuplicate = this.w;
		let hDuplicate = this.h;
		
		image.onload = function() {
			
			if (wDuplicate != undefined && hDuplicate != undefined) {
				dlCtx.drawImage(image, xDuplicate, yDuplicate, wDuplicate, hDuplicate);
			}
			else {
				dlCtx.drawImage(image, xDuplicate, yDuplicate);
			}
		}
	}
}

class dlText {
	constructor(text, size, font, x, y, color, stroke) {
		this.text = text;
		this.size = size;
		this.font = font; //eg. Arial, Comic Sans MS, Verdana
		this.x = x;
		this.y = y;
		this.color = color;
		this.stroke = stroke;
	}

	Draw() {
		dlCtx.font = this.size + "px " + this.font;

		if (this.stroke) {
			dlCtx.strokeStyle = this.color;
			dlCtx.strokeText(this.text, this.x, this.y);
		}
		else {
			dlCtx.fillStyle = this.color;
			dlCtx.fillText(this.text, this.x, this.y);
		}
	}
}