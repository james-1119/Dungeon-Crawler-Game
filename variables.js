const objs = [];
const rect = [];
const monst = [];
const monstPosX = [0, 
                   200, 850, 300, 700, 300, 700, // main room
                   -700,-700,-700,-520,-520,-520, -900, -320, // leftroom
                   1320, 1500, 1500, 1680// right room
                  ]; 
const monstPosY = [0, 
                   -550, -550, -420, -420, -760, -760,// main room
                   -500, -900, -700, -500, -900, -700, -300, -300, // leftroom
                   -550, -700, -400, -550// right room
                  ];
const monstVx = [0, 
                 0, 0, 0, 0, 0, 0, // main room
                 0, 0, 0, 0, 0, 0, 0, 0,// left room
                 0, 0, 0, 0// right room
                ];
const monstVy = [0, 
                 0, 0, 0, 0, 0, 0,// main room
                 0, 0, 0, 0, 0, 0, 0, 0,// left room
                 0, 0, 0, 0// right room
                ];
const monstHealth = [0,
                     3,3,3,3,3,3,// main room
                     3,3,3,3,3,3,3,3,// left room
                     3,3,3,3// right room
                    ];
const allyBullet = [];
const bulletImg = [];
const enemyBullet = [];
const enemyBulletImage = [];
let enemyBulletNum = 0;
let bossShot = 0;
let enemyBulletImageNum = 0;
let allyBulletNum = 0;
let gravity;
let gravityvalue;
let restitution;
let collisioncolor;
let friction;
let player1speed;
const boundaries = [];
let backgroundx = -1120;
let backgroundy = -2750;
const collisionsMap = [];
let collide = false;
let lastkey = "";
let hitkey = "";
let bulletMovement = false;
let bulletImgNum = 0;
let bossCollide = false;
let bossJumpTime = 0;
var bossJump = false;
var bossDeath = false;
let death_sound_pause=1;
let invincibleTime = 0;
let attackType = 0;
let bossAttackTime = 0;
let attackTime1 = 0;
let attackTime2 = 0;
const delay = ms => new Promise(res => setTimeout(res, ms));

// declares monstor corrdinates
let monstx = 525;
let monsty = -1700;
let targetx = monstx;
let targety = monsty;
let vertical = 0;
let horizontal = 0;


// Declare sounds
var dash_sound;
dash_sound = new Audio("Sound_Effects/Dash.mp3");

var end_sound;
end_sound = new Audio("Sound_Effects/credits.mp3");

var fireball_sound;
fireball_sound = new Audio("Sound_Effects/Fireball.mp3");

var  ambient_music;
ambient_music = new Audio("Sound_Effects/ambiant_sound.mp3")

var boss_music;
boss_music = new Audio("Sound_Effects/Boss_fight.mp3");

var death_sound;
death_sound = new Audio("Sound_Effects/Death_sound.mp3");

let slime_sound;
slime_sound = new Audio("Sound_Effects/slime jump_mixdown1.mp3")

let ghost_sound;
ghost_sound = new Audio("Sound_Effects/Ghost.mp3")

let footsteps;
footsteps = new Audio("Sound_Effects/footsteps_mixdown.mp3")

let pain_sound;
pain_sound = new Audio("Sound_Effects/Pain.mp3")

let credits;
credits = new Audio("Sound_Effects/credits.mp3")

// let ambient_music = new sound("Sound_Effects/ambiant_sound.mp3")

let moving = false

//  calls the wizard image
// James created them btw
let wiz = new Image();
wiz.src = 'wizardboth.png';

// calls the slim image
let slime = new Image();
slime.src = "Sprite_Grand_Slime.png";

//calls the health bar image
let health8 = new Image();
health8.src = "HealthBar/Full_HP_Bar1.png";

let health7 = new Image();
health7.src = "HealthBar/Full_HP_Bar2.png";

let health6 = new Image();
health6.src = "HealthBar/Full_HP_Bar3.png";

let health5 = new Image();
health5.src = "HealthBar/Full_HP_Bar4.png";

let health4 = new Image();
health4.src = "HealthBar/Full_HP_Bar5.png";

let health3 = new Image();
health3.src = "HealthBar/Full_HP_Bar6.png";

let health2 = new Image();
health2.src = "HealthBar/Full_HP_Bar7.png";

let health1 = new Image();
health1.src = "HealthBar/Full_HP_Bar8.png";

let health0 = new Image();
health0.src = "HealthBar/Full_HP_Bar.png";





// calls the dash image
let dashimg = new Image();
dashimg.src = "dash.png";

// declares frames for player
let spritewidth = 48;
let spriteheight = 60;
let totalframes = 6;
let currentframe = 0;
let srcX = 0;
let srcY = 0;

let framesdrawn = 0;

let spritewidth2 = 360;
let spriteheight2 = 296;
let totalframes2 = 6;
let currentframe2 = 0;
let srcX2 = 0;
let srcY2 = 0;

let framesdrawn2 = 0;

let timeout = 90;
let dash = 0;
let space = false;

// declares value for boss movement
let bossmovetime = 0;
let bossbool = false;
let movechange = 0;
let screentimeout = 0;

let up;
let down
let left;
let right;


let A = {
    x: 100,
    y: 100
};

let B = {
    x: 300,
    y: 100
};

// create variables for projectile constants
let g = 50; // m/s^2
let v0 = 10; // m/s

// calculate the time of flight
let t;

// create object to track the projectile
let projectile = {
    x: 0,
    y: 0,
    t: 0
};

let jumpstartx 
let jumpstarty
let jumptargetx
let jumptargety