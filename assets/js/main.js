

//Canvas DOM Manipulation
var canvas = document.getElementById('canvasID')
var ctx = canvas.getContext('2d')


//Variables
var game_started = false
var game_loop_interval
var player
var barriers = []
var enemies = []
var enemy_direction = 'right'
var enemy_move = true
var enemy_width = canvas.width/20
var enemy_height = canvas.height/20
var enemy_speed = 0.06
var start_button_width = 250
var start_button_height = 45
var start_buttonX = canvas.width/2 - start_button_width/2
var start_buttonY = canvas.height/6*4 - start_button_height/1.2
var main_text = 'Space Invaders'
var bottom_text = 'START'
var barrier_width = canvas.height/20
var barrier_height = canvas.height/20
var timer = 0
var timer_interval = null;
var time = 1000


//Call Unit Function
init()

//Funtion Init()
function init(){
    //Canvas Background
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height)
    //Menu Dot effect
    for (let index = 0; index < 30; index++) {
        var x = Math.floor(Math.random()*canvas.width)
        var y = Math.floor(Math.random()*canvas.width)
        ctx.fillStyle = '#fffd7d'
        ctx.fillRect(x, y, 2, 2)
    }
    //Game Title
    ctx.strokeStyle = '#85fff9'
    ctx.lineWidth = 3
    ctx.font = "50px Courier New"
    ctx.textAlign = "center";
    ctx.fillStyle = 'white'
    ctx.fillText(main_text, canvas.width/2, canvas.height/2)
    ctx.strokeText(main_text, canvas.width/2, canvas.height/2)
    //Start Button
    ctx.fillStyle = '#7dabff'
    ctx.strokeStyle = '#2f60ba'
    ctx.lineWidth = 5
    ctx.fillRect(start_buttonX, start_buttonY, start_button_width,start_button_height)
    ctx.strokeRect(start_buttonX, start_buttonY, start_button_width,start_button_height)
    //Start Button Text
    ctx.font = "40px Comic Sans MS"
    ctx.fillStyle = '#85fff9'
    ctx.fillText(bottom_text, canvas.width/2, canvas.height/6*4)
    //Creator
    ctx.font = "25px Brush Script MT"
    ctx.fillText('Game made by David', canvas.width/2, canvas.height/12*9)
}





//Function GameSetUp
function gameSetup() {

    //Reset
    enemies = []
    enemy_speed = 0.06
    timer = 0
    time = 1000

    //Variables
    var enemyX = (canvas.width - (10 * 35 + 25)) / 2
    var enemyY = 60
    var barrierX = 0
    var enemyColor = 'red'

    //Creating Player
    player = new Player(canvas.width / 2 - 32.5, canvas.height * 0.85, canvas.width/7.6923076923076925, canvas.height/7.6923076923076925, 5)

    //Asking For Username
    player.name = ''
    do{
        if (player.name.length > 15) {
            alert('Please enter a name shorter than 15 characters')
        }
        player.name = prompt('Enter your username: ')
    }while(player.name.length > 15)
    
    

    //Creating Barriers
    for (let index = 0; index < 4; index++) {
        barriers.push(new Barrier((canvas.width-3*(canvas.width/4+ barrier_width))/2+ barrierX, canvas.height/ 4 *3, barrier_width, barrier_height))
        barriers.push(new Barrier((canvas.width-3*(canvas.width/4+ barrier_width))/2 + barrierX, canvas.height/ 4 *3+barrier_width, barrier_width, barrier_height))
        barriers.push(new Barrier((canvas.width-3*(canvas.width/4+ barrier_width))/2 + barrier_width + barrierX, canvas.height/ 4 *3, barrier_width, barrier_height))
        barriers.push(new Barrier((canvas.width-3*(canvas.width/4+ barrier_width))/2 + barrier_width*2 + barrierX, canvas.height/ 4 *3+barrier_width, barrier_width, barrier_height))
        barriers.push(new Barrier((canvas.width-3*(canvas.width/4+ barrier_width))/2 + barrier_width*2 + barrierX, canvas.height/ 4 *3, barrier_width, barrier_height))
        barrierX += canvas.width/4
    }


    //Creating Enemies
    for (let w = 0; w < 4; w++) {
        for (let q = 0; q < 11; q++) {
            enemies.push(new Enemy(enemyX,enemyY,enemy_width,enemy_height,0.09, enemyColor))
            enemyX += canvas.width/14.285714285714286
        }
        enemyY += 40
        enemyX = (canvas.width - (10 * 35 + 25)) / 2
        if (w >= 0) {
            enemyColor = 'green'
        }
    }

    //Frames per second (fps) settup
    game_loop_interval = setInterval(function () {
        gameLoop(ctx)
    }, 10/ 1000 )
    game_started = true

    timer_interval = setInterval(function(){
        timer = timer + 0.1
    }, 100 )
}






//Function GameLoop
function gameLoop(ctx) {

    update()
    render(ctx)

}




//Function Update
function update() {

    //Update Collision Checks
    updateCollisions()

    //Update Barrier Sprite
    for (let i = 0; i < barriers.length; i++) {
        if (barriers[i].__barrierSprite()) {
            barriers.splice(i,1)
        }
    }

    
    //Update Player
    player.__update()

    //Update Enemies
    let enemy_max_x = 0
    let enemy_min_x = 999999999999

    for (let e = 0; e < enemies.length; e++) {
       
        enemies[e].__enemyUpdate( enemy_direction , enemy_speed)

        if (enemies[e].x > enemy_max_x) {
            enemy_max_x = enemies[e].x
        }
        if (enemies[e].x < enemy_min_x) {
            enemy_min_x = enemies[e].x
        }

    }

    if ( (enemy_max_x + enemy_width)  >= ctx.canvas.width && enemy_direction == 'right') {
        enemy_direction = 'left'
        enemy_speed += 0.02
        enemies.forEach( x => x.y += 8 );
    }

    if ( enemy_min_x <= 0 && enemy_direction == 'left' ) {
        enemy_direction = 'right'
        enemy_speed += 0.02
        enemies.forEach( x => x.y += 8 );
    }

}


//Function Render
function render(ctx) {

    //Save the current content
    ctx.save()

    //Clear the content and render the level
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    //Render map background
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    //Render entities here.
    player.__render(ctx)
    for (let index = 0; index < barriers.length; index++) {
        barriers[index].__render(ctx)
    }
    for (let index = 0; index < enemies.length; index++) {
        enemies[index].__render(ctx)
    }

    //Render Score and Lives
    ctx.font = canvas.width/25+"px Comic Sans MS"
    ctx.fillStyle = "white"
    ctx.fillText(("Score: "+player.score), 75, 35)
    ctx.fillText("Lives: ", canvas.width/20 * 13, 35)
    ctx.fillText("Time: "+timer.toFixed(2), canvas.width/20*9, 35)
    player.__playerRender(ctx)

    //Render Player Name
    player.__renderName(ctx)

    //Render Lose/Win Screen
    if (enemies.length<1) {
        main_text = 'You Won!'
        bottom_text = 'PLAY AGAIN'
        stopGame()
        init()
    }
    for (let e = 0; e < enemies.length; e++) {
        const ENEMY = enemies[e];
        if (player.lives < 1 || ENEMY.y > 400) {
            main_text = 'You Lost!'
            bottom_text = 'TRY AGAIN'
            stopGame()
            init()
        }
    }

    //Restore the content
    ctx.restore()
}


function updateCollisions(){

    for (let p = 0; p < player.bullets.length; p++) {
        const PLAYER_BULLET = player.bullets[p]

        //Check Enemy Collisions
        if (checkCollision(PLAYER_BULLET)) {
            player.bullets.splice(p,1)
        }
    }
    checkCollision2()
}



function checkCollision(collider){
        for (let e = 0; e < enemies.length; e++) {
            const ENEMY = enemies[e];
            for (let b = 0; b < ENEMY.bullets.length; b++) {
                const ENEMY_BULLET = ENEMY.bullets[b];
                if (ENEMY_BULLET.__collide(collider)) {
                    ENEMY.bullets.splice(b,1)
                    player.score +=5
                    return true
                }
            }
            for (let i = 0; i < barriers.length; i++) {
                const BARRIER = barriers[i];
                if (BARRIER.__collide(collider)) {
                    BARRIER.stability -=10
                    return true
                }
            }
            if (ENEMY.__collide(collider)) {
                enemies.splice(e,1)
                switch (ENEMY.type) {
                    case 'green':
                        player.score += 10
                    break;
                    case 'red':
                        player.score += 20
                    break;
                }
                return true
            }
        }
}

function checkCollision2(){
    for (let i = 0; i < barriers.length; i++) {
        const BARRIER = barriers[i];
        for (let e = 0; e < enemies.length; e++) {
            const ENEMY = enemies[e];
            for (let b = 0; b < ENEMY.bullets.length; b++) {
                const ENEMY_BULLET = ENEMY.bullets[b];
                if (ENEMY_BULLET.__collide(player)) {
                    ENEMY.bullets.splice(b,1)
                    player.__loseLives()
                    return false
                }
                if (ENEMY_BULLET.__collide(BARRIER)) {
                    ENEMY.bullets.splice(b,1)
                    BARRIER.stability -=10
                    return false
                }
            }
            if (ENEMY.__collide(BARRIER)) {
                barriers.splice(i,1)
                break;
            }
        }
    }

}

function canMove(){
    enemy_can_move = true
}



function enemyMovement(){
    


}



// Function to stop the game
function stopGame() {
    game_started = false
    clearInterval(game_loop_interval)
}







document.dispatchEvent(
    new KeyboardEvent("keyup", {
        key: "ArrowLeft",
        bubbles: true
    })
);



document.dispatchEvent(
    new KeyboardEvent("keyup", {
        key: "ArrowRight",
        bubbles: true
    })
);

var keys = {};


document.addEventListener('keydown', (e) => {

    if (!game_started) { return }
    keys[e.key] = true;

    if (keys[w]&&keys[i]&&keys[n]) {
        time = 1
    }else if (keys['ArrowLeft'] && keys[' ']) {
        player.__move('ArrowLeft', canvas.width)
        player.__shoot('player',time)
    } else if (keys['ArrowRight'] && keys[' ']) {
        player.__move('ArrowRight', canvas.width)
        player.__shoot('player',time)
    } else if (keys['ArrowLeft']) {
        player.__move('ArrowLeft', canvas.width)
    } else if (keys['ArrowRight']) {
        player.__move('ArrowRight', canvas.width)
    } else if (keys[' ']) {
        player.__shoot('player',time)
    }

});

document.addEventListener('keyup', (e) => {

    keys[e.key] = false;

});



canvas.addEventListener('click', function(evt){

    if (game_started) {
        return;
    }

    if (  (evt.offsetX >= start_buttonX && evt.offsetX <= start_buttonX+start_button_width)
    && (evt.offsetY >= start_buttonY && evt.offsetY <= start_buttonY + start_button_height)  ) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        gameSetup()
    }

})