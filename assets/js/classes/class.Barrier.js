

class Barrier extends Entity{


    constructor(x, y, width, height, speed, stage = 'good', settings = {}){
        super(x, y, width, height, speed, settings)
        this.stage = stage
        this.stability = 30
        this.img = new Image()
        this.__barrierSprite()
    }





    __barrierSprite(){
        switch (this.stage) {
            case 'good':
                this.img.src = 'assets/image/Barrier1.png'
                this.settings.sprite = this.img
                this.settings.is_sprite = true
            break;
            case 'medium':
                this.img.src = 'assets/image/Barrier2.png'
                this.settings.sprite = this.img
                this.settings.is_sprite = true
            break;
            case 'bad':
                this.img.src = 'assets/image/Barrier3.png'
                this.settings.sprite = this.img
                this.settings.is_sprite = true
            break;
        }

        if(this.stability == 30){
            this.stage = 'good'
        }else if(this.stability < 30 && this.stability >= 20){
            this.stage = 'medium'
        }else if(this.stability < 20 && this.stability > 0){
            this.stage = 'bad'
        }else if (this.stability <= 0){
            return true
        }
    }
}