import {Actor, CollisionType, SpriteSheet} from 'excalibur';
import {Images} from '../resources';

const spriteSheet = SpriteSheet.fromImageSource({
    image: Images.forestProp,
    grid: {
        rows: 2,
        columns: 1,
        spriteWidth: 16,
        spriteHeight: 16,
    }
});

type ForestPropArgs = {
    x: number;
    y: number;
}

export class ForestProp extends Actor{
    constructor(args: ForestPropArgs){
        super({
            ...args,
            width: 16,
            height: 16,
            collisionType: CollisionType.Passive,
        });

        const sprite = spriteSheet.getSprite(0, Math.floor(Math.random() * 2));

        this.z = args.y + 12;

        if (!sprite) return;
        this.graphics.use(sprite);
    }
}
