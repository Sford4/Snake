$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();

	var score = 0;
	var level = 1;
	var highScore = 0;
	var speed = 400;
	var col = getRandomColor();
	var cw = 10;
	var d = 'up';
	var snake_array = [];
	var foodSquare = {};
	var selfDeath = 0;
	var wallDeath = 0

//initiates the game
function init() {
		
		getRandomColor();
		create_snake();
		paint_snake();
		create_food();
		levelChange();
		// if(typeof game_loop != "undefined"){
		// 	clearInterval(game_loop);
		// }
		// game_loop = setInterval(paint, 1);
	}


//how we know which direction they pressed
$(document).keydown(function(e){
		var key	= e.which;
		
		if(key === 37){
			if(d === 'right'){
				return;
			}
			else{
				d = 'left';
			}
		}
		if(key === 38){
			if(d === 'down'){
				return;
			}
			else{
				d = 'up';
			}
		}
		if(key === 39){
			if(d === 'left'){
				return;
			}
			else{
				d = 'right';
			}
		}
		if(key === 40){
			if(d === 'up'){
				return;
			}
			else{
				d = 'down';
			}
		}
		// console.log(key);
		change_direction();
	})	


//initial 3-square snake
function create_snake(){
	snake_array.push({x:10, y:10, color: "black"});
	snake_array.push({x:10, y:9, color: "black"});
	snake_array.push({x:10, y:8, color: "black"});
}

function paint_snake(){
	

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);


	ctx.fillStyle = col;
	ctx.fillText(level, 250, 250);
	ctx.textAlign="center";
	ctx.font = "bold 140px Arial";
	ctx.strokeStyle = "black";





	for(var i = 0; i < snake_array.length; i++){
		var c = snake_array[i];
		ctx.fillStyle = col;
		ctx.fillRect(c.x*cw, c.y*cw, cw, cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(c.x*cw, c.y*cw, cw, cw);
	}

	ctx.fillStyle = foodSquare.color;
	ctx.fillRect(foodSquare.x*cw, foodSquare.y*cw, cw, cw);
	ctx.strokeStyle = "white";
	ctx.strokeRect(foodSquare.x*cw, foodSquare.y*cw, cw, cw);
}	

//handles direction changes, or when user presses an arrow key
function change_direction(){
	var lastx = snake_array[snake_array.length-1].x;
	var lasty = snake_array[snake_array.length-1].y;
	snake_array[0] = {x: lastx, y: lasty, color: "black"};
	var tail = snake_array.shift();
	if(d === "left"){
		snake_array.push(tail);
		snake_array[snake_array.length-1].x--;
	}
	else if(d === "right"){
		snake_array.push(tail);
		snake_array[snake_array.length-1].x++;
	}
	else if(d === "up"){
		snake_array.push(tail);
		snake_array[snake_array.length-1].y--;
	}
	else if(d === "down"){
		snake_array.push(tail);
		snake_array[snake_array.length-1].y++;
	}
	hitItself(snake_array[snake_array.length-1]);
	hitTheWall(snake_array[snake_array.length-1]);
	paint_snake();
	eat();
	// console.log(snake_array[snake_array.length - 1]);

}

function create_food(){
	foodSquare = {
			x: Math.round(Math.random() * (w/cw-2)),
			y: Math.round(Math.random() * (h/cw-2)),
			color: "black"
		};
 	for(i = 0; i < snake_array.length; i++){
 		if(foodSquare.x === snake_array[i].x && foodSquare.y === snake_array[i].y){
 			return;
 		}
 		else{
 			paint_snake(foodSquare);
 		}
 	}	
}

function eat(){
	if(foodSquare.x === snake_array[snake_array.length-1].x && foodSquare.y === snake_array[snake_array.length-1].y){
		foodSquare = snake_array[0];
		snake_array.unshift(foodSquare);
		create_food();
		score++;
		levelChange();
	}	
	else{
		return;
	}	
}

function hitItself(obj){
	for(i = 0; i < snake_array.length - 1; i++){
		if(obj.x == snake_array[i].x && obj.y == snake_array[i].y){
			selfDeath++;
			die();
			break;
		}
	}	
}

function hitTheWall(obj){
	// console.log(obj.x, obj.y);
	if(obj.x === 50 || obj.x === -1 || obj.y === 50 || obj.y === -1){
		wallDeath++;
		die();
	}
	else{
		return;
	}
}

function die(){
		snake_array = [];
		highScoreFunction();
		level = 1;
		score = 0;
		d = "up";
		speed = 100;
		init();
}

function levelChange(){
	if(score > 1 && score % 2 === 0){
		level++;
		if(speed > 10){
			speed -= 10;
		}
		getRandomColor();
		paint_snake();
	}
	$("#level").text("Level: " + level);
	$("#score").text("Score: " + score);
	$("#high-score").text("High Score: " + highScore);
	$("#death-by-wall").text("Death by wall: " + wallDeath);
	$("#death-by-self").text("Death by self-cannibalism: " + selfDeath);

	if(typeof moveLoop != "undefined") clearInterval(moveLoop);
	moveLoop = setInterval(change_direction, speed);
}

function highScoreFunction(){
	if(score > highScore){
		highScore = score;
	}
}

function getRandomColor() {
	var letters = "0123456789ABCDEF".split('');
	var color = "#";
	for (var i = 0, randIdx; i < 6; i++){
		randIdx = ~~(Math.random() * 16);
		color += letters[randIdx]
	}
	col = color;
	return col;
}



init();
});






	



