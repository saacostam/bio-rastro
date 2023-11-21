import {Actor, CollisionType, SpriteSheet} from 'excalibur';
import {Images} from '../resources';

const spriteSheet = SpriteSheet.fromImageSource({
    image: Images.water,
    grid: {
        rows: 3,
        columns: 3,
        spriteWidth: 16,
        spriteHeight: 16,
    }
});

type WaterArgs = {
    x: number;
    y: number;
    sx: number;
    sy: number;
}

export class Water extends Actor{
    constructor(args: WaterArgs){
        super({
            ...args,
            width: 16,
            height: 16,
            collisionType: CollisionType.Fixed,
        })

        const sprite = spriteSheet.getSprite(args.sx, args.sy);
        if (!sprite) return;
        this.graphics.use(sprite);
    }
}
