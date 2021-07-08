

class Player extends Entity{


    constructor(x, y, width, height, speed, score = 0, settings = {}){
        super(x, y, width, height, speed, settings)
        this.lives = 3
        this.score = score
        this.name 

        this.__playerSprite()
    }

    __move(direction, canvas_width){
        if(direction == 'ArrowLeft' && player.x > 0){
            this.x -= this.speed
            return

        }
        if(direction == 'ArrowRight' && player.x < canvas_width - player.width){
            this.x += this.speed
            return
        }
    }

    __playerSprite(){
        var img = new Image()
        img.src = 'assets/image/Spaceship.png'
        this.settings.sprite = img
        this.settings.is_sprite = true
    }


    __playerRender(ctx){
        var img = new Image()
        img.src = 'assets/image/Spaceship.png'
        let x = ctx.canvas.width - 20
        for (let index = this.lives; index > 0; index--) {
            x = x - (this.width / 2) - 5
            ctx.drawImage(img, x, 10, this.width/2, this.height/2)
        }
        this.__render(ctx)
    }

    __renderName(ctx){
        ctx.font = this.width/6 + "px Comic Sans MS"
        ctx.fillStyle = 'white'
        if (this.name == '' || this.name == null) {
            ctx.fillText('unknown`s spaceship', this.x + this.width/2, this.y + this.height)
        }else{
            ctx.fillText(this.name+'`s spaceship', this.x + this.width/2, this.y + this.height)
        }
    }

    __loseLives(){
        var self = this
        var img = new Image()
        this.lives--
        img.src = 'assets/image/SpaceshipHurt.png'
        this.settings.sprite = img
        setTimeout( function(){
            self.__playerSprite()
        }, 300 )
    }


}