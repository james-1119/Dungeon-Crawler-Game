let BossArray = []
let bosslife = 100

for (i = 0; i <= 105; i++) {

    BossArray[i] = new Image();
    BossArray[i].src = "Boss_HP/Boss" + parseInt(i + 1) + ".png"
    // console.log(BossArray[i]);
}


Number.prototype.map = function(in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function bosshp() {
    if (bosslife <= 99) {
        // console.log("BOSS HP CALLED!!")

        let mappedboss = Math.round(bosslife.map(0, 100, 105, 0));

        // console.log(Math.round(mappedboss));
        // console.log("MappedBoss:", mappedboss);
        // console.log("Source: ", BossArray[mappedboss])

        //if (bosslife<=99) {
        //console.log("DRAW BOSS IMAGE:", mappedboss);
        try {
            ctx.drawImage(BossArray[mappedboss], 300, 500);
        } catch (error) {
            // console.log(mappedboss);
            // console.log(BossArray[mappedboss])
            // console.log(error);
        }

        //}
    }
}

if ((bosslife >= 0) || (lifepoints >= 0)) {
    console.log("stop")
   // end_sound.play();
}




