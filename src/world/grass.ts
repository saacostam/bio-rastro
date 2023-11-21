import {Actor, CollisionType, SpriteSheet} from 'excalibur';
import {Images} from '../resources';

const spriteSheet = SpriteSheet.fromImageSource({
    image: Images.grass,
    grid: {
        rows: 6,
        columns: 3,
        spriteWidth: 16,
        spriteHeight: 16,
    }
});

type GrassArgs = {
    x: number;
    y: number;
}

export class Grass extends Actor{
    constructor(args: GrassArgs){
        super({
            ...args,
            width: 16,
            height: 16,
            collisionType: CollisionType.Passive,
        });

        const sprite = spriteSheet.getSprite(
            Math.floor(Math.random() * 3),
            Math.floor(Math.random() * 6)
        );
        if (!sprite) return;
        this.graphics.use(sprite);
    }
}
