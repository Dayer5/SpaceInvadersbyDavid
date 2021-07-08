

class Enemy extends Entity{


    constructor(x, y, width, height, speed, type, settings = {}){
        super(x, y, width, height, speed, settings)
        this.type = type
        this.__enemySprite()


    }



    
    __enemyUpdate(dir, speed){
        if (dir == 'right') {
            this.x += speed
        }else{
            this.x -= speed
        }
        this.__update();


        // 0 - 99
        let prob = Math.floor(Math.random()*12000)
        if (prob == 10) {
            this.__shoot('enemy')
        }

    }


    __enemySprite(){
        var img = new Image()

        switch (this.type) {
            case 'green':
                img.src = 'assets/image/GreenBoi.png'
                this.settings.sprite = img
                this.settings.is_sprite = true
            break;
            case 'red':
                img.src = 'assets/image/RedBoi.png'
                this.settings.sprite = img
                this.settings.is_sprite = true
            break;

        }
    }
}