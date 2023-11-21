import {Actor, CollisionType, SpriteSheet} from 'excalibur';
import {Images} from '../resources';

const spriteSheet = SpriteSheet.fromImageSource({
    image: Images.waterProp,
    grid: {
        rows: 4,
        columns: 4,
        spriteWidth: 16,
        spriteHeight: 16,
    }
});

type WaterPropArgs = {
    x: number;
    y: number;
}

export class WaterProp extends Actor{
    constructor(args: WaterPropArgs){
        super({
            ...args,
            width: 16,
            height: 16,
            collisionType: CollisionType.Passive,
        });

        const sprite = spriteSheet.getSprite(
            Math.floor(Math.random() * 4),
            Math.floor(Math.random() * 4),
        );
        if (!sprite) return;
        this.graphics.use(sprite);
    }
}
