// declares values and arrays
let lastTime = 0;
const interval = 16;
let timer = 0;

// Call the init function when the HTML window loads
window.onload = init;

// creating a class for the variables of the boundaries
class Boundary {
    static width = 48;
    static height = 48;
    constructor({ position }) {
        this.position = position;
        this.width = 48;
        this.height = 48;
    }
    // draw the boundary at it's position
    draw() {
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

// This is a test boundary
const testBoundary = new Boundary({
    position: {
        x: 400,
        y: 400
    }
})



function init() {

    // setInterval(function() {
    //     dash_sound.play();
    //     console.log("SOUND PLAYED");
    // }, 1000);

    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');


    // pushing the json for the map into an array
    for (let i = 0; i < collisions.length; i += 70) {
        collisionsMap.push(collisions.slice(i, 70 + i));
        //makes sure that the 70 is linked with how tall the baord is

    }

    collisionsMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if (symbol == 327) {
                boundaries.push(
                    new Boundary({
                        position: {
                            x: j * Boundary.width + backgroundx,
                            y: i * Boundary.height + backgroundy
                        }
                    }
                    )
                )
            }
        })
    })

    createObjects(); // Creates all circles on initial load

    window.requestAnimationFrame(gameLoop);

}

// console.log(boundaries)

function gameLoop(timestamp) {

    const deltaTime = timestamp - lastTime;

    lastTime = timestamp;

    if(timer > interval){
    // Clear the canvas on each loop
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Physics Options
    collisioncolor = true; // Turn objects red on collision
    //gravity = true; // Turn or off gravity
    gravityvalue = 0.11; // Set the gravity value
    restitution = 0.8; // Energy lost on a collision Multiplier (1 = off)
    friction = 0.99; // Friction Multiplier (1 = off)
    // console.log(backgroundx + " " + backgroundy)
    player1speed = 4;


    // My Functions
    if (bossDeath != true) {
        bossmove();
    }
    background();
    dashed();
    drawBound();
    keyboardevents();
    updatecircle();

    createObjects();
    spriteAnimations();
    BossAnimations();
    hpbar();
    bosshp();

    // Base functions 
    detectCollisions();
    detectEdgeCollisions();
    monster_dectection();
    warningSignals();
    gameover();
    }
    else
    {
        timer += deltaTime;
    }
    console.log(timer);



    window.requestAnimationFrame(gameLoop);
}

// Circle Object Template

function bulletImage(x, y, vx, vy, deg) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.deg = deg;
}

function monster(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.isColliding = false;
}

function circle(x, y, vx, vy, radius, color, circlerestitution) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.color = color;
    this.circlerestitution = circlerestitution;
    this.isColliding = false;
};

function rectangle(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.bounce = false;
}

function createObjects() {
    // EXAMPLE Circle (stationary)
    objs[0] = new circle(
        0, // X
        0, // Y 
        0, // VX
        0, // VY
        0, // SIZE
        ""
    );
    // Boss Circle
    monst[0] = new monster(monstx, monsty, 100, "rgba(0,0,0,0)");

    // Monster Circle

    // main room
    monst[1] = new circle(monstPosX[1], monstPosY[1], monstVx, monstVy, 20, "rgba(0,0,0,0)");
    monst[2] = new circle(monstPosX[2], monstPosY[2], monstVx, monstVy, 20, "rgba(0,0,0,0)");
    monst[3] = new circle(monstPosX[3], monstPosY[3], monstVx, monstVy, 20, "rgba(0,0,0,0)");
    monst[4] = new circle(monstPosX[4], monstPosY[4], monstVx, monstVy, 20, "rgba(0,0,0,0)");
    monst[5] = new circle(monstPosX[5], monstPosY[5], monstVx, monstVy, 20, "rgba(0,0,0,0)");
    monst[6] = new circle(monstPosX[6], monstPosY[6], monstVx, monstVy, 20, "rgba(0,0,0,0)");

    // left room
    monst[7] = new circle(monstPosX[7], monstPosY[7], monstVx, monstVy, 20, "rgba(0,0,0,0)");
    monst[8] = new circle(monstPosX[8], monstPosY[8], monstVx, monstVy, 20, "rgba(0,0,0,0)");
    monst[9] = new circle(monstPosX[9], monstPosY[9], monstVx, monstVy, 20, "rgba(0,0,0,0)");
    monst[10] = new circle(monstPosX[10], monstPosY[10], monstVx, monstVy, 20, "rgba(0,0,0,0)");
    monst[11] = new circle(monstPosX[11], monstPosY[11], monstVx, monstVy, 20, "rgba(0,0,0,0)");
    monst[12] = new circle(monstPosX[12], monstPosY[12], monstVx, monstVy, 20, "rgba(0,0,0,0)");
    monst[13] = new circle(monstPosX[13], monstPosY[13], monstVx, monstVy, 20, "rgba(0,0,0,0)");
    monst[14] = new circle(monstPosX[14], monstPosY[14], monstVx, monstVy, 20, "rgba(0,0,0,0)");

    // right room
    monst[15] = new circle(monstPosX[15], monstPosY[15], monstVx, monstVy, 20, "rgba(0,0,0,0)");
    monst[16] = new circle(monstPosX[16], monstPosY[16], monstVx, monstVy, 20, "rgba(0,0,0,0)");
    monst[17] = new circle(monstPosX[17], monstPosY[17], monstVx, monstVy, 20, "rgba(0,0,0,0)");
    monst[18] = new circle(monstPosX[18], monstPosY[18], monstVx, monstVy, 20, "rgba(0,0,0,0)");

    // Circle for player to ghost detection
    objs[1] = new circle(512, 341.5, 0, 0, 300, "rgba(0,0,0,0)");

    // Player Circle
    objs[2] = new circle(512, 341.5, 0, 0, 20, "rgba(0,0,0,0)");

    objs[3] = new circle(targetx, (targety + 140), 0, 0, 50, "rgba(0,0,0,0)");


    // useless Obstacle
    rect[0] = new rectangle(0, 0, 0, 0, "");
    rect[1] = new rectangle(0, 0, 0, 0, "");
    rect[2] = new rectangle(0, 0, 0, 0, "");
    rect[3] = new rectangle(0, 0, 0, 0, "");
    //rect[1].bounce = true;
}

function background() {
    img = new Image();
    img.src = 'dungeon1img.png';

    ctx.drawImage(img, backgroundx, backgroundy);
}
// animation for the wizard 
function spriteAnimations() {
    currentframe = currentframe % totalframes;
    srcX = currentframe * spritewidth;
    ctx.drawImage(wiz, srcX, srcY, spritewidth, spriteheight, (objs[2].x - 30), (objs[2].y - 40), 48, 60);
    framesdrawn++;
    if (framesdrawn >= 6) {
        currentframe++;
        framesdrawn = 0;
    }
}
// animation for the boss
function BossAnimations() {
    currentframe2 = currentframe2 % totalframes2;
    srcX2 = currentframe2 * spritewidth2;
    ctx.drawImage(slime, srcX2, srcY2, 360, 396, (monstx - 100), (monsty - 130), 210, 260);
    framesdrawn2++;
    if (framesdrawn2 >= 6) {
        currentframe2++;
        framesdrawn2 = 0;
    }
}
// draws the monstor to exact postion

// starts the bullet function


function shotBullets(event) {
    console.log("Shot Bullet");

    fireball_sound.pause();
    fireball_sound.currentTime = 0;
    fireball_sound.play();



    // declares values
    let mousex = event.clientX;
    let mousey = event.clientY;
    let bulletx = mousex - objs[2].x;
    let bullety = mousey - objs[2].y;

    // displayes movement of bullet
    let l = Math.sqrt(bulletx * bulletx + bullety * bullety);

    bulletx /= l;
    bullety /= l;

    // creates the bullet form the player
    allyBullet[allyBulletNum] = new circle(
        objs[2].x,
        objs[2].y,
        bulletx,
        bullety,
        10,
        // makes circle under bullet invisible 
        "rgba(0,0,0,0)",
    );

    bulletImg[bulletImgNum] = new bulletImage(
        objs[2].x - 50,
        objs[2].y - 20,
        bulletx,
        bullety,
        300,
    );

    bulletImgNum++;
    allyBulletNum++;
}

// draw the boundary
function drawBound() {
    //window.requestAnimationFrame(drawBound);s
    let moving = false;
    boundaries.forEach((boundary) => {
        boundary.draw();
        // creates the bullet lengh
        for (let i = 0; i < allyBullet.length; i++) { // player bullet to boundary detection

            if (allyBullet[i].x + allyBullet[i].radius >= boundary.position.x &&
                allyBullet[i].x - allyBullet[i].radius <= boundary.position.x + 48 &&
                allyBullet[i].y + allyBullet[i].radius >= boundary.position.y &&
                allyBullet[i].y - allyBullet[i].radius <= boundary.position.y + 48) {
                console.log("Bullet hit the wall");
                //SUPER :)
                // sends the bullets to narnia and sets the velocity to 0
                allyBullet[i].x = 3000;
                allyBullet[i].y = 3000;
                allyBullet[i].vx = 0;
                allyBullet[i].vy = 0;
                bulletImg[i].x = 3000;
                bulletImg[i].y = 3000;
                bulletImg[i].vx = 0;
                bulletImg[i].vy = 0;
            }

        }

        // enemy bullet to boundary
        for (let i = 0; i < enemyBullet.length; i++) { // Circles

            if (enemyBullet[i].x + enemyBullet[i].radius >= boundary.position.x &&
                enemyBullet[i].x - enemyBullet[i].radius <= boundary.position.x + 48 &&
                enemyBullet[i].y + enemyBullet[i].radius >= boundary.position.y &&
                enemyBullet[i].y - enemyBullet[i].radius <= boundary.position.y + 48) {
                console.log("Bullet hit the wall");
                //SUPER :)
                // sends the bullets to narnia and sets the velocity to 0
                enemyBullet[i].x = 3000;
                enemyBullet[i].y = 3000;
                enemyBullet[i].vx = 0;
                enemyBullet[i].vy = 0;
                //bulletImg[i].x = 3000;
                //bulletImg[i].y = 3000;
                //bulletImg[i].vx = 0;
                //bulletImg[i].vy = 0;
            }

        }

        // statement to detect if bullets are hitting a wall
        if (
            objs[2].x + objs[2].radius >= boundary.position.x &&
            objs[2].x - objs[2].radius <= boundary.position.x + 48 &&
            objs[2].y + objs[2].radius >= boundary.position.y &&
            objs[2].y - objs[2].radius <= boundary.position.y + 48
        ) {
            collide = true;
            hitkey = lastkey;
        }
        if (keyState[83] && collide == false) { // S        
            boundary.position.y -= player1speed;
            if (space == true && srcY == 0) {
                srcY = 120;
                srcX = 0;
            }
            if (space == true && srcY == 60) {
                srcY = 180;
                srcX = 0;
            }
        }
        if (keyState[87] && collide == false) { // W
            boundary.position.y += player1speed;

            if (space == true && srcY == 0) {
                srcY = 120;
                srcX = 0;
            }
            if (space == true && srcY == 60) {
                srcY = 180;
                srcX = 0;
            }


        }
        if (keyState[68] && collide == false) { // D      
            boundary.position.x -= player1speed;
            if (space == true) {
                srcY = 120;
                srcX = 0;
            }
            if (space == false) {
                srcY = 0;
            }

        }
        if (keyState[65] && collide == false) { // A
            boundary.position.x += player1speed;
            //backgroundx = backgroundx +player1speed;
            if (space == true) {
                srcY = 180;
                srcX = 0;
            }
            if (space == false) {
                srcY = 60;
            }


        }

        if (lastkey != hitkey && hitkey != "") {
            if (lastkey == "s") {
                objs[2].y += 9;
                collide = false;
            }
            if (lastkey == "a") {
                objs[2].x -= 9;
                collide = false;

            }
            if (lastkey == "w") {
                objs[2].y -= 9;
                collide = false;
            }
            if (lastkey == "d") {
                objs[2].x += 9;
                collide = false;
            }
            hitkey = "";
        }

        // monst[0] = monster(monstx,monsty,100,"rgba(0,0,0,0)");

        //Boss Collision
        if (
            monst[0].x + monst[0].radius >= boundary.position.x &&
            monst[0].x - monst[0].radius <= boundary.position.x + 48 &&
            monst[0].y + monst[0].radius >= boundary.position.y &&
            monst[0].y - monst[0].radius <= boundary.position.y + 48
        ) {
            //console.log("boss hit the wall");
            bossCollide = true;


        }

    })

}

let lifepoints = 8


let pain_sound9 = true
let pain_sound1 = true;
let pain_sound6 = true;
let pain_sound8 = true;
let pain_sound2 = true;
let pain_sound5 = true;
let pain_sound4 = true;
let pain_sound3 = true;
let pain_sound7 = true;
//player healthbar
function hpbar() {

    if (lifepoints == 8) {
        ctx.drawImage(health8, -50, -20);
        
    } if (lifepoints == 7) {
        ctx.drawImage(health7, -50, -20);
        if (pain_sound9 == true) {
            pain_sound.play();
            pain_sound9 = false;
        }
    } if (lifepoints == 6) {
        ctx.drawImage(health6, -50, -20);

        if (pain_sound1 == true) {
            pain_sound.play();
            pain_sound1 = false;
        }
    } if (lifepoints == 5) {
        ctx.drawImage(health5, -50, -20);

        if (pain_sound2 == true) {
            pain_sound.play();
            pain_sound2 = false;
        }
    } if (lifepoints == 4) {
        ctx.drawImage(health4, -50, -20);

        if (pain_sound3 == true) {
            pain_sound.play();
            pain_sound3 = false;
        }
    } if (lifepoints == 3) {
        ctx.drawImage(health3, -50, -20);
        if (pain_sound4 == true) {
            pain_sound.play();
            pain_sound4 = false;
        }
    } if (lifepoints == 2) {
        ctx.drawImage(health2, -50, -20);

        if (pain_sound5 == true) {
            pain_sound.play();
            pain_sound5 = false;
        }
    } if (lifepoints == 1) {
        ctx.drawImage(health1, -50, -20);

        if (pain_sound6 == true) {
            pain_sound.play();
            pain_sound6 = false;
        }
    } if (lifepoints == 0) {
        ctx.drawImage(health0, -50, -20);

        if (pain_sound7 == true) {
            pain_sound.play();
            pain_sound7 = false;
        }
    }


    //thx keply for borrowing me this
    // a video to display after the boss died (I put it here so it's easier to test)

};


function rectangletemplate(x, y, h, w, color) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.color = color;
};

function monster_dectection() {
    invincibleTime++;

    for (let i = 0; i < allyBullet.length; i++) { // bullet to the boss


        if (circleIntersect(allyBullet[i].x, allyBullet[i].y, allyBullet[i].radius, monst[0].x, monst[0].y, monst[0].radius)) {
            bosslife --;
            // console.log(bosslife);
            monst[0].isColliding == true;


            //SUPER
            // sends the bullets to narnia 
            allyBullet[i].x = 3000;
            allyBullet[i].y = 3000;
            allyBullet[i].vx = 0;
            allyBullet[i].vy = 0;
            bulletImg[i].x = 3000;
            bulletImg[i].y = 3000;
            bulletImg[i].vx = 0;
            bulletImg[i].vy = 0;
        }
    }

    // Bullet to monster
    for (let i = 0; i < allyBullet.length; i++) { // bullet to the boss
        for (let j = 1; j < monst.length; j++) {
            if (circleIntersect(allyBullet[i].x, allyBullet[i].y, allyBullet[i].radius, monstPosX[j], monstPosY[j], monst[j].radius)) {
                monstHealth[j]--;

                //SUPER
                // sends the bullets to narnia 
                allyBullet[i].x = 3000;
                allyBullet[i].y = 3000;
                allyBullet[i].vx = 0;
                allyBullet[i].vy = 0;
                bulletImg[i].x = 3000;
                bulletImg[i].y = 3000;
                bulletImg[i].vx = 0;
                bulletImg[i].vy = 0;
            }
        }
    }


    for (let i = 1; i < monst.length; i++) { // monster to player boundary detection
        if (circleIntersect(objs[1].x, objs[1].y, objs[1].radius, monst[i].x, monst[i].y, monst[i].radius) && monstHealth[i] > 0) {

            // ghost_sound.pause();
            // ghost_sound.currentTime = 0;
            if (lifepoints > 0) {
                ghost_sound.play();
            }

            if (lifepoints <= 0) {
                ghost_sound.pause();
            }

            let mousex = objs[2].x;
            let mousey = objs[2].y;
            let bulletx = mousex - monst[i].x;
            let bullety = mousey - monst[i].y;

            // displayes movement of bullet
            let l = Math.sqrt(bulletx * bulletx + bullety * bullety);
            bulletx /= l;
            bullety /= l;
            monstVx[i] = bulletx;
            monstVy[i] = bullety;
        }
    }
    if (invincibleTime > 30) {
        // Player to boss intersection
        if (circleIntersect(objs[2].x, objs[2].y, objs[2].radius, monst[0].x, monst[0].y, monst[0].radius) && bossJump == false) {
            lifepoints -= 3;
            invincibleTime = 0;
            // console.log(lifepoints);
        }

        // Enemy to player intersection

        for (let i = 1; i < monst.length; i++) {
            if (circleIntersect(objs[2].x, objs[2].y, objs[2].radius, monst[i].x, monst[i].y, monst[i].radius)) {
                lifepoints--;
                invincibleTime = 0;
            }
        }
        // Enemy bullet to player intersection
        for (let i = 0; i < enemyBullet.length; i++) { // bullet to monster

            if (circleIntersect(objs[2].x, objs[2].y, objs[2].radius, enemyBullet[i].x, enemyBullet[i].y, enemyBullet[i].radius)) {

                if (attackType == 3) {
                    lifepoints -= 2;
                } else {
                    lifepoints--;
                }

                //SUPER
                // sends the bullets to narnia 
                enemyBullet[i].x = 3000;
                enemyBullet[i].y = 3000;
                enemyBullet[i].vx = 0;
                enemyBullet[i].vy = 0;
                //bulletImg[i].x = 3000;
                //bulletImg[i].y = 3000;
                //bulletImg[i].vx = 0;
                //bulletImg[i].vy = 0;
                invincibleTime = 0;
            }
        }

    }

}


if (bosslife <= 0) {
    credits.play();
    console.log("boss dead");
}


let deathsoundplayed = false;
// display the gameover music and videos
function gameover() {
    if (bosslife > 99 && lifepoints > 0) {
        ambient_music.play();
    } else {
        ambient_music.pause();

    }
    const deathVideo = document.getElementById('deathVid');
    if (lifepoints > 0) {
        deathVideo.muted = true
    }
    const regularDeath = document.getElementById('regularDeath');
    if (lifepoints > 0) {
        regularDeath.muted = true
    }
    if (lifepoints <= 0 && deathsoundplayed == false) {
        death_sound.play();
        deathsoundplayed = true;
        bossDeath = true;
    }

    const video = document.getElementById('vid');
    if (bosslife > 0) {
        video.muted = true
    }

    // Display boss life once being hitw
    if (bosslife <= 99 && (bosslife > 0)) {
        if (lifepoints > 0) {
            boss_music.play();
        }
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.font = "bold 30px Courier New";
        ctx.fillText("Boss Life: " + bosslife + "%", 400, 600);
    }
    if (bosslife <= 0) {
        credits.play();
    }
    if (lifepoints <= 0) {
        boss_music.pause();
    }
    // if boss died the game stop
    if (bosslife <= 0) {
        bossDeath = true;
        lifepoints = 999999;
        boss_music.pause();
        screentimeout++;

        // a slow pause before the game stop
        if (screentimeout >= 250) {
            video.controls = false;
            video.play();
            video.style.height = "570px";
            ctx.clearRect(0, 0, canvas.height * 2, canvas.width * 2);
            video.muted = false;
            const page = document.getElementById('myCanvas');
            page.style.backgroundColor = "#ffffff00";
        }


    }
    // if the player died the game also end
    if (lifepoints <= 0) {
        screentimeout++;
        // a slow pause before the game stop
        if (screentimeout >= 50) {
            if (bosslife <= 99) {
                //console.log("I died to boss");
                deathVideo.controls = false;
                deathVideo.play();
                deathVideo.style.height = "570px";
                ctx.clearRect(0, 0, canvas.height * 2, canvas.width * 2);
                deathVideo.muted = false;
                const page = document.getElementById('myCanvas');
                page.style.backgroundColor = "#ffffff00";
            } else {
                //console.log("I died without seeing the boss");
                regularDeath.controls = false;
                regularDeath.play();
                regularDeath.style.height = "570px";
                ctx.clearRect(0, 0, canvas.height * 2, canvas.width * 2);
                regularDeath.muted = false;
                const page = document.getElementById('myCanvas');
                page.style.backgroundColor = "#ffffff00";
            }

        }

    }

}
// proform a parabolajump when boss jump
function parabolajump(startx, starty, endx, endy) {

    // calculate the x-position of the projectile

    t = (2 * v0 * Math.sin(Math.atan2(starty - endy, endx - startx))) / g;
    projectile.x = startx + (v0 * Math.cos(Math.atan2(endy - starty, endx - startx)) * projectile.t);

    // calculate the y-position of the projectile
    projectile.y = 0.0075 * (projectile.x - startx) * (projectile.x - endx) + starty

    // increment the time
    projectile.t += 1;

    // log the projectile position



    // Clear the canvas before the next loop
}

// the warning signal will display when boss jump
function warningSignals() {
    if (bossCollide == true) {

        if (bossJumpTime < 80) {

            const target = new Image();
            target.src = "target.png";
            ctx.drawImage(target, targetx - monst[0].radius, targety - monst[0].radius, monst[0].radius * 2, monst[0].radius * 2);

        }
    }
}



// boss movement
function bossmove() {


    movechange++;
    bossAttackTime++;
    attackTime1++;
    attackTime2++;
    bossmovetime++;

    // changes movement direction 
    if (bossCollide == true) {
        //vertical = vertical * -1;
        //horizontal = horizontal * -1;
        bossJumpTime++;

        if (bossJumpTime == 1) {
            projectile.x = 0
            projectile.y = 0
            projectile.t = 0
            targetx = canvas.width / 2;
            targety = canvas.height / 2;
            jumpstartx = monstx
            jumpstarty = monsty
            jumptargetx = targetx
            jumptargety = targety
        }
        // Target the user

        if (bossJumpTime < 80) {
            if (circleIntersect(objs[3].x, objs[3].y, objs[3].radius, monst[0].x, monst[0].y, monst[0].radius)) {
                hittarget = true
                console.log("targethit")
                slime_sound.play()

            } else {
                hittarget = false
            }

            bossJump = true;
            if (hittarget == false) {
                parabolajump(jumpstartx, jumpstarty, targetx, targety)

                monstx = projectile.x
                monsty = projectile.y
            }




        } else {
            // Performing the jump after 80 frames of targeting
            monstx = targetx;
            monsty = targety;
            vertical = randomInteger(-2, 2);
            horizontal = randomInteger(-2, 2);
            bossJump = false;
            bossJumpTime = 0
            bossCollide = false;
            hittarget = false;
            console.log("false")
            srcX2 = 0
        }
    }
    if (movechange > 100 && bosslife <= 99) {
        vertical = randomInteger(-2, 2);
        horizontal = randomInteger(-2, 2);
        movechange = 0;
    }
    if (bossmovetime > 300) {
        bossbool = true;
        if (bossbool == true) {
            //for(i = 0; i <= randomInteger(3,5);i++){

            monstx = monstx + vertical;
            monsty = monsty + horizontal;
            //}
            //bossbool = false;
        }
        //bossmovetime = 0;
    }

    // randomize boss attack type

    if (bossAttackTime > 200 && bosslife <= 99) {
        attackType = Math.ceil(randomInteger(0, 2));

        //attackType = 2;
        bossAttackTime = 0;
        bossShot = 0;
    }
    // Type 1: shot a serires of bullet toward you
    if (attackType == 1 && attackTime1 >= 8 && bossShot <= 10) {
        let bulletx = objs[2].x - monstx;
        let bullety = objs[2].y - monsty;

        // displayes movement of bullet
        let l = Math.sqrt(bulletx * bulletx + bullety * bullety);

        bulletx /= l;
        bullety /= l;

        enemyBullet[enemyBulletNum] = new circle(
            monstx,
            monsty,
            bulletx,
            bullety,
            10,
            "rgba(0,0,0,0)",
        );
        enemyBulletNum++;
        bossShot++;
        attackTime1 = 0;
    }

    //Type 2: shot bullet all around 
    if (attackType == 2 && bossShot <= 3 && attackTime2 >= 8) {
        enemyBullet[enemyBulletNum] = new circle(
            monstx,
            monsty,
            20,
            0,
            10,
            "rgba(0,0,0,0)",
        );
        enemyBulletNum++;
        enemyBullet[enemyBulletNum] = new circle(
            monstx,
            monsty,
            0,
            20,
            10,
            "rgba(0,0,0,0)",
        );
        enemyBulletNum++;
        enemyBullet[enemyBulletNum] = new circle(
            monstx,
            monsty,
            -20,
            0,
            10,
            "rgba(0,0,0,0)",
        );
        enemyBulletNum++;
        enemyBullet[enemyBulletNum] = new circle(
            monstx,
            monsty,
            0,
            -20,
            10,
            "rgba(0,0,0,0)",
        );
        enemyBulletNum++;
        enemyBullet[enemyBulletNum] = new circle(
            monstx,
            monsty,
            10,
            10,
            10,
            "rgba(0,0,0,0)",
        );
        enemyBulletNum++;
        enemyBullet[enemyBulletNum] = new circle(
            monstx,
            monsty,
            10,
            -10,
            10,
            "rgba(0,0,0,0)",
        );
        enemyBulletNum++;
        enemyBullet[enemyBulletNum] = new circle(
            monstx,
            monsty,
            -10,
            10,
            10,
            "rgba(0,0,0,0)",
        );
        enemyBulletNum++;
        enemyBullet[enemyBulletNum] = new circle(
            monstx,
            monsty,
            -10,
            -10,
            10,
            "rgba(0,0,0,0)",
        );
        enemyBulletNum++;
        bossShot++;
        attackTime2 = 0;
    }
    // Type 3: A super super fast bullet
    if (attackType == 3 && bossShot < 1) {
        let bulletx = objs[2].x - monstx;
        let bullety = objs[2].y - monsty;

        // displayes movement of bullet
        let l = Math.sqrt(bulletx * bulletx + bullety * bullety);

        bulletx /= l;
        bullety /= l;

        enemyBullet[enemyBulletNum] = new circle(
            monstx,
            monsty,
            bulletx,
            bullety,
            40,
            "rgba(0,0,0,0)",
        );
        enemyBulletNum++;
        bossShot++;
    }
    // console.log(bossAttackTime);

}

//display that would allow the user to enter and choose a specific option
//SIDEBAR project
const showButton = document.getElementById('showDialog');
const favDialog = document.getElementById('favDialog');
const outputBox = document.querySelector('output');
//const selectEl = favDialog.querySelector('select');
//const confirmBtn = favDialog.querySelector('#confirmBtn');

// "Update details" button opens the <dialog> modally
showButton.addEventListener('click', () => {
    favDialog.showModal();
});
// "Favorite animal" input sets the value of the submit button
// selectEl.addEventListener('change', (e) => {
//   confirmBtn.value = selectEl.value;
// });
// "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
favDialog.addEventListener('close', () => {
    // if (Return.Value == "Spider Monkey") {
    outputBox.value = `Topic: ${favDialog.returnValue}. W forward, A left, S backwards and D Right and SpaceBar for boost `;
});

//sound 

// const sounds = ["Dash", "FireBall"]

// const new_sounds = [new Audio("Fireball.mp3"), new Audio("Dash.mp3")];

// let last_played = 0;



// function sound(src) {
//   this.sound = document.createElement("audio");
//   this.sound.src = src;
//   this.sound.setAttribute("preload", "auto");
//   this.sound.setAttribute("controls", "none");
//   this.sound.style.display = "none";
//   document.body.appendChild(this.sound);
//   this.play = function() {
//     this.sound.play();
//   }
//   this.stop = function() {
//     this.sound.pause();
//   }
// }



