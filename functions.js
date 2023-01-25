




// Handle Keyboard Events
let keyState = {};


// checks for keybaord keycodes
window.addEventListener('keydown', function(e) {
  keyState[e.keyCode || e.which] = true;
}, true);

window.addEventListener('keyup', function(e) {
  objs[2].vx = 0;
  objs[2].vy = 0;

  keyState[e.keyCode || e.which] = false;
}, true);

// if (objs[2].x + objs[2].radius >= testBoundary.position.x){
//   console.log("colliding");
// }

// creating a dash function for the character
function dashed() {
  // the cooldown for dash
  timeout++


  // if spacebar was pressed the player dash forward
  if (timeout >= 50) {
    if (keyState[32]) {
      const dashsound = new sound("Sound_Effects/Dash.mp3");


      space = true;
      invincibleTime = 4;
      
      dash_sound.play();

    }
    if (space == true) {
      player1speed = 5.5;

      dash++
      if (dash >= 36) {
        timeout = 0;
        dash = 0;
        space = false;
        srcY = 0;
      }
    }

  }
}
// funciton to display sound
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}
// player movement
function keyboardevents() {
  if(moving == true){
    footsteps.play()
  }else{
    footsteps.pause()
  }
  // player move down
  if (keyState[83]) { // S
    if (collide == false) {
      backgroundy = backgroundy - player1speed;
      monsty = monsty - player1speed;
      moving = true
      for (let i = 1; i < monst.length; i++){
        monstPosY[i] -= player1speed;
      }
      targety = targety - player1speed;
      for (let i = 0; i < allyBullet.length; i++) {
        allyBullet[i].y -= player1speed;
        bulletImg[i].y -= player1speed;
      }
      for (let i = 0; i < enemyBullet.length; i++) {
        enemyBullet[i].y -= player1speed;
        //bulletImg[i].y -= player1speed;
      }
    }

    //console.log(lastkey);
    lastkey = "s";
    //boundary.position.y -= player1speed;
    testBoundary.position.y -= player1speed;
  }else{
      moving = false
    }

  //player move up
  if (keyState[87]) { // W
    if (collide == false) {
      backgroundy = backgroundy + player1speed;
      monsty = monsty + player1speed;
      moving = true
      for (let i = 1; i < monst.length; i++){
        monstPosY[i] += player1speed;
      }
      targety = targety + player1speed;
      for (let i = 0; i < allyBullet.length; i++) {
        allyBullet[i].y += player1speed;
        bulletImg[i].y += player1speed;
      }
      for (let i = 0; i < enemyBullet.length; i++) {
        enemyBullet[i].y += player1speed;
        //bulletImg[i].y -= player1speed;
      }
    }

    //console.log(lastkey);
    lastkey = "w";
    //boundary.position.y += player1speed;
    testBoundary.position.y += player1speed;
  }
  // player move right
  if (keyState[68]) { // D
    if (collide == false) {
      backgroundx = backgroundx - player1speed;
      monstx = monstx - player1speed;
      moving = true
      for (let i = 1; i < monst.length; i++){
        monstPosX[i] -= player1speed;
      }
      targetx = targetx - player1speed;
      for (let i = 0; i < allyBullet.length; i++) {
        allyBullet[i].x -= player1speed;
        bulletImg[i].x -= player1speed;
      }
      for (let i = 0; i < enemyBullet.length; i++) {
        enemyBullet[i].x -= player1speed;
        //bulletImg[i].y -= player1speed;
      }
    }

    //console.log(lastkey);
    lastkey = "d";
    //boundary.position.x -=player1speed;
    testBoundary.position.x -= player1speed;
  }

  // player move left
  if (keyState[65]) { // A
    if (collide == false) {
      backgroundx = backgroundx + player1speed;
      monstx = monstx + player1speed;
      moving = true
      for (let i = 1; i < monst.length; i++){
        monstPosX[i] += player1speed;
      }
      targetx = targetx + player1speed;
      for (let i = 0; i < allyBullet.length; i++) {
        allyBullet[i].x += player1speed;
        bulletImg[i].x += player1speed;
      }
      for (let i = 0; i < enemyBullet.length; i++) {
        enemyBullet[i].x += player1speed;
        //bulletImg[i].y -= player1speed;
      }
    }

    //console.log(lastkey);
    lastkey = "a";
    // boundary.position.x +=player1speed;
    testBoundary.position.x += player1speed;

  }
}

function updatecircle() {
  // Update the positon of each rectangle. Iterates through every circle in the array.

  for (i = 0; i < rect.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = rect[i].color;
    ctx.fillRect(rect[i].x, rect[i].y, rect[i].w, rect[i].h);
    ctx.fill();
  }
// allybullet movement
  for (i = 0; i < allyBullet.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = allyBullet[i].color;
    ctx.arc(allyBullet[i].x, allyBullet[i].y, allyBullet[i].radius, 0, Math.PI * 2);
    ctx.fill();


    allyBullet[i].x += allyBullet[i].vx * 10;
    allyBullet[i].y += allyBullet[i].vy * 10;

    if (allyBullet[i].vy > 0) {
      allyBullet[i].vy = Math.abs(allyBullet[i].vy);
    }
    if (allyBullet[i].vy < 0) {
      allyBullet[i].vy = -Math.abs(allyBullet[i].vy);
    }
    if (allyBullet[i].vx > 0) {
      allyBullet[i].vx = Math.abs(allyBullet[i].vx);
    }
    if (allyBullet[i].vx < 0) {
      allyBullet[i].vx = -Math.abs(allyBullet[i].vx);
    }
  }
  //monster movement
  for (i = 1; i < monst.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = monst[i].color;
    ctx.arc(monst[i].x, monst[i].y, monst[i].radius, 0, Math.PI * 2);
    ctx.fill();

    var image = document.getElementById("ghost");
                  ctx.globalAlpha = 0.7;

    ctx.drawImage(image, monstPosX[i]-20, monstPosY[i]-20, 40, 40);
              ctx.globalAlpha = 1,0;


    monstPosX[i] += monstVx[i] * 2;
    monstPosY[i] += monstVy[i] * 2;

    if (monstVy[i] > 0) {
      monstVy[i] = Math.abs(monstVy[i]);
    }
    if (monstVy[i] < 0) {
      monstVy[i] = -Math.abs(monstVy[i]);
    }
    if (monstVx[i] > 0) {
      monstVx[i] = Math.abs(monstVx[i]);
    }
    if (monstVx[i] < 0) {
      monstVx[i] = -Math.abs(monstVx[i]);
    }

    // death detection
    if (monstHealth[i]<=0){
      monstPosX[i] = 3000;
      monstPosY[i] = 3000;
      monstVx[i] = 0
      monstVy[i] = 0;
    }
  }

  //bullet image movement
  for (i = 0; i < bulletImg.length; i++) {
    //ctx.beginPath();
    var image = document.getElementById("water");
    ctx.drawImage(image, bulletImg[i].x + 30, bulletImg[i].y + 5, 30, 30);



    //ctx.fill();


    bulletImg[i].x += bulletImg[i].vx * 10;
    bulletImg[i].y += bulletImg[i].vy * 10;

    if (bulletImg[i].vy > 0) {
      bulletImg[i].vy = Math.abs(bulletImg[i].vy);
    }
    if (bulletImg[i].vy < 0) {
      bulletImg[i].vy = -Math.abs(bulletImg[i].vy);
    }
    if (bulletImg[i].vx > 0) {
      bulletImg[i].vx = Math.abs(bulletImg[i].vx);
    }
    if (bulletImg[i].vx < 0) {
      bulletImg[i].vx = -Math.abs(bulletImg[i].vx);
    }
  }
// draw enemy bullet image
    for (i = 0; i < enemyBullet.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = enemyBullet[i].color;
    ctx.arc(enemyBullet[i].x, enemyBullet[i].y, enemyBullet[i].radius, 0, Math.PI * 2);
    ctx.fill();

    let sizeW;
    let sizeH;
    let adjX;
    let adjY;

    if(attackType == 3){
      sizeW = 160;
      sizeH = 160;
      adjX = 60;
      adjY = 110;
    } else {
      sizeW = 40;
      sizeH = 40;
      adjX = 10;
      adjY = 30;
      
    }

    var image = document.getElementById("bossBullet");
    ctx.drawImage(image, enemyBullet[i].x-adjX, enemyBullet[i].y-adjY, sizeW, sizeH);
      
    if (attackType == 1){
      enemyBullet[i].x += enemyBullet[i].vx * 8;
    enemyBullet[i].y += enemyBullet[i].vy * 8;
    }

      if(attackType == 2){
        enemyBullet[i].x += enemyBullet[i].vx * 0.6;
    enemyBullet[i].y += enemyBullet[i].vy * 0.6;
      }
    if (attackType == 3){
      enemyBullet[i].x += enemyBullet[i].vx * 20;
    enemyBullet[i].y += enemyBullet[i].vy * 20;
    }

    if (enemyBullet[i].vy > 0) {
      enemyBullet[i].vy = Math.abs(enemyBullet[i].vy);
    }
    if (enemyBullet[i].vy < 0) {
      enemyBullet[i].vy = -Math.abs(enemyBullet[i].vy);
    }
    if (enemyBullet[i].vx > 0) {
      enemyBullet[i].vx = Math.abs(enemyBullet[i].vx);
    }
    if (enemyBullet[i].vx < 0) {
      enemyBullet[i].vx = -Math.abs(enemyBullet[i].vx);
    }
  }
  // Update the positon of each circle. Iterates through every circle in the array.
  for (i = 0; i < objs.length; i++) {
    if (gravity == true) {
      objs[i].vy += gravityvalue;
    }
    // Draw each circle
    ctx.beginPath();

    ctx.arc(objs[i].x, objs[i].y, objs[i].radius, 0, Math.PI * 2);
    
    ctx.fillStyle = objs[i].color;

    ctx.fill();

    objs[i].x += objs[i].vx;
    objs[i].y += objs[i].vy;

    if (objs[i].vy > 0) {
      objs[i].vy = Math.abs(objs[i].vy) * friction;
    }
    if (objs[i].vy < 0) {
      objs[i].vy = -Math.abs(objs[i].vy) * friction;
    }
    if (objs[i].vx > 0) {
      objs[i].vx = Math.abs(objs[i].vx) * friction;
    }
    if (objs[i].vx < 0) {
      objs[i].vx = -Math.abs(objs[i].vx) * friction;
    }
  }
  for (i = 0; i < monst.length; i++) {

    // Draw each circle
    ctx.beginPath();

    ctx.arc(monst[i].x, monst[i].y, monst[i].radius, 0, Math.PI * 2);


    if (monst[i].isColliding == true && collisioncolor == true) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = monst[i].color;
    }

    ctx.fill();


  }
}


function detectCollisions() {
  // Between objects and rectangles ////////////////////////////

  for (let i = 0; i < objs.length; i++) { // Circles
    for (let j = 0; j < rect.length; j++) { // Rectangles
      if (objs[i].x + objs[i].radius > rect[j].x && // Left Side of Circle
        objs[i].x - objs[i].radius < rect[j].x + rect[j].w && // Right Side of Circle
        objs[i].y + objs[i].radius > rect[j].y && // Bottom of Circle
        objs[i].y - objs[i].radius < rect[j].y + rect[j].h) // Top of Circle
      {
        //console.log("COLLIDE: RECTANGLE " + j + " CIRCLE: " + i);

        if (rect[j].bounce == true) {

          // let cr = objs[i].x + objs[i].radius;
          // let cl = objs[i].x - objs[i].radius;
          // let ct = objs[i].y + objs[i].radius;
          // let cb = objs[i].y - objs[i].radius;
          // let rl = rect[j].x;
          // let rr = rect[j].x + rect[j].w;
          // let rt = rect[j].y;
          // let rb = rect[j].y + rect[j].h;

          // if (cr - rl > 2 && cr - rl < rect[j].w / 2)
          //     objs[i].vx = -Math.abs(objs[i].vx) * restitution;

          // if (cl - rr < 2 && cl - rr > -rect[j].w / 2)
          //     objs[i].vx = Math.abs(objs[i].vx) * restitution;

          // if (cb - rt < 2 && cb - rt < rect[j].h / 2)
          //     objs[i].vy = -Math.abs(objs[i].vy) * restitution;

          // if (ct - rb < 2 && ct - rb < drect[j].h / 2)
          //     objs[i].vy = Math.abs(objs[i].vy) * restitution;
        }
      } else {

      }
    }
  }



  // Between two objects. ////////////////////////////


  // Reset collision state of all objects
  for (let i = 0; i < objs.length; i++) {
    objs[i].isColliding = false;
  }

  // Start checking for collisions
  for (let i = 0; i < objs.length; i++) {

    obj1 = objs[i];

    for (let j = i + 1; j < objs.length; j++) {
      obj2 = objs[j];

      // Compare object1 with object2
      if (circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {
        obj1.isColliding = true;
        obj2.isColliding = true;
        // console.log('COLLISION!')

        //let vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };
        let vCollisionx = obj2.x - obj1.x;
        let vCollisiony = obj2.y - obj1.y;

        let distance = Math.sqrt((obj2.x - obj1.x) * (obj2.x - obj1.x) + (obj2.y - obj1.y) * (obj2.y - obj1.y));

        let vCollisionNormx = vCollisionx / distance;
        let vCollisionNormy = vCollisiony / distance;

        let vRelativeVelocityx = obj1.vx - obj2.vx;
        let vRelativeVelocityy = obj1.vy - obj2.vy;

        let speed = vRelativeVelocityx * vCollisionNormx + vRelativeVelocityy * vCollisionNormy;

        if (speed < 0) {
          break;
        }
        obj1.vx -= (speed * vCollisionNormx);
        obj1.vy -= (speed * vCollisionNormy);
        obj2.vx += (speed * vCollisionNormx);
        obj2.vy += (speed * vCollisionNormy);
      }
    }
  }
}

function circleIntersect(x1, y1, r1, x2, y2, r2) {
  // Calculate the distance between the two circles
  let squareDistance = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
  // When the distance is smaller or equal to the sum
  // of the two radius, the circles touch or overlap
  return squareDistance <= ((r1 + r2) * (r1 + r2));
}

function detectEdgeCollisions() {

  let obj;
  for (let i = 0; i < objs.length; i++) {
    obj = objs[i];

    // Check for left and right
    if (obj.x < obj.radius) {
      obj.vx = Math.abs(obj.vx) * restitution;
      obj.x = obj.radius;
    } else if (obj.x > canvas.width - obj.radius) {
      obj.vx = -Math.abs(obj.vx) * restitution;
      obj.x = canvas.width - obj.radius;
    }

    // Check for bottom and top
    if (obj.y < obj.radius) {
      obj.vy = Math.abs(obj.vy) * restitution;
      obj.y = obj.radius;
    } else if (obj.y > canvas.height - obj.radius) {
      obj.vy = -Math.abs(obj.vy) * restitution;
      obj.y = canvas.height - obj.radius;
    }
  }

  let posx = 0;
  let posy = 0;
  for (let i = 0; i < objs.length; i++) {
    obj = objs[i];

    // Check for left and right
    if (obj.x <= 80 + obj.radius) {
      if (obj.y >= 370 && obj.y <= 570) {
        // obj.vx = -Math.abs(obj.vx);
        // obj.x = rect[0].width - obj.radius;
        posx = obj.x;
        posy = obj.y; addEventListener;


        obj.x = rect[0].x - obj.w;
        obj.vx = -Math.abs(obj.vx) * restitution;

        // obj.y = rect[0].y- obj.h;
        // obj.vy = -Math.abs(obj.vy) * restitution;
        //console.log(obj.y);

        //console.log(obj.y);


        obj.x = posx;

        //console.log ("2 " + obj.x,obj.y)
      }
    }
  }
}



// declares random integrer
function randomInteger(min, max) {
  return (Math.random() * (max - min + 1)) + min;
};


// random color generator
function colorgenerator() {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
};


// project to add joystick
// var Joy1 = new JoyStick('joy1Div', {}, function(stickData) {
//     jd = stickData.cardinalDirection;
// });