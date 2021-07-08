

class Entity{


    constructor(x, y, width, height, speed, settings = {}){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.settings = Object.assign({ is_sprite:false, sprite:'', color:'yellow' }, settings)
        this.bullets = []
        this.can_shoot = true
    }




    __update(){
        for (let index = 0; index < this.bullets.length; index++) {
            this.bullets[index].y += this.bullets[index].speed
            if(this.bullets[index].y < 0){
                this.bullets.splice(0,1)
            }
        }
    }


    __render(ctx){


        //render bullets here
        for (let index = 0; index < this.bullets.length; index++) {
            this.bullets[index].__render(ctx)
        }
        

        if(this.settings.is_sprite){
            ctx.drawImage(this.settings.sprite, this.x, this.y, this.width, this.height)
            return;
        }

        ctx.fillStyle = this.settings.color;
        ctx.fillRect( this.x, this.y, this.width, this.height)


        
    }



    __shoot(type, time){
        
        if(this.can_shoot){
            let self = this
            let x = this.x + this.width / 2
            switch (type) {
                case 'player':
                    this.bullets.speed = -0.6
                break;
                case 'enemy':
                    this.bullets.speed = 0.6
                break;
            }
            this.bullets.push(new Entity(x - 1.5, this.y, 2, 10, this.bullets.speed))
            this.can_shoot = false;
            setTimeout( function(){
                self.__canShoot()
            }, time )
        }
    }



    __canShoot(){
        this.can_shoot = true
    }




    __collide(e){
        return(  ( this.x < e.x+e.width && this.x+this.width > e.x ) 
        && ( this.y < e.y+e.height && this.y+this.height > e.y  ) )
    }

}