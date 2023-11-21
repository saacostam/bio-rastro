import {Actor, CollisionType, SpriteSheet} from 'excalibur';
import {Images} from '../resources';

const spriteSheet = SpriteSheet.fromImageSource({
    image: Images.leaf,
    grid: {
        rows: 1,
        columns: 2,
        spriteWidth: 16,
        spriteHeight: 16,
    }
});

type LeafArgs = {
    x: number;
    y: number;
}

export class Leaf extends Actor{
    constructor(args: LeafArgs){
        super({
            ...args,
            width: 16,
            height: 16,
            collisionType: CollisionType.Passive,
            rotation: [0, Math.PI/2, Math.PI, Math.PI*3/2][Math.floor(4*Math.random())],
        })

        const sprite = spriteSheet.getSprite(Math.random() < 0.5 ? 0 : 1, 0);
        if (!sprite) return;
        this.graphics.use(sprite);
    }
}
