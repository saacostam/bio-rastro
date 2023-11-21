import {Actor, CollisionType, SpriteSheet} from 'excalibur';
import {Images} from '../resources';

const spriteSheet = SpriteSheet.fromImageSource({
    image: Images.tree,
    grid: {
        rows: 1,
        columns: 2,
        spriteWidth: 64,
        spriteHeight: 86,
    }
});

type TreeArgs = {
    x: number;
    y: number;
}

export class Tree extends Actor{
    constructor(args: TreeArgs){
        super({
            ...args,
            collisionType: CollisionType.Passive,
        })

        this.z = args.y + (86*9/16);

        const sprite = spriteSheet.getSprite(Math.random() < 0.5 ? 0:1, 0);
        if (!sprite) return;
        this.graphics.use(sprite);
    }
}
