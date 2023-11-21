import {Actor, CollisionType, SpriteSheet} from 'excalibur';
import {Images} from '../resources';

const spriteSheet = SpriteSheet.fromImageSource({
    image: Images.flower,
    grid: {
        rows: 5,
        columns: 3,
        spriteWidth: 16,
        spriteHeight: 16,
    }
});

type FlowerArgs = {
    x: number;
    y: number;
}

export class Flower extends Actor{
    constructor(args: FlowerArgs){
        super({
            ...args,
            width: 16,
            height: 16,
            collisionType: CollisionType.Passive,
        });

        const sprite = spriteSheet.getSprite(
            Math.floor(Math.random() * 3),
            Math.floor(Math.random() * 5)
        );
        if (!sprite) return;
        this.graphics.use(sprite);
    }
}
