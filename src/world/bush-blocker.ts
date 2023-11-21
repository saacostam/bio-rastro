import {Actor, CollisionType, Shape, SpriteSheet, Vector} from 'excalibur';
import {Images} from '../resources';
import {TILE_SIZE} from "../constants";

const spriteSheet = SpriteSheet.fromImageSource({
    image: Images.bushBlocker,
    grid: {
        rows: 1,
        columns: 3,
        spriteWidth: 32,
        spriteHeight: 32,
    }
});

type BushBlockerArgs = {
    x: number;
    y: number;
}

export class BushBlocker extends Actor{
    constructor(args: BushBlockerArgs){
        super({
            ...args,
            width: 32,
            height: 32,
            collisionType: CollisionType.Fixed,
            collider: Shape.Box(TILE_SIZE*1.5, TILE_SIZE/2),
            anchor: new Vector(0.5, 0.75),
        });

        this.z = args.y + TILE_SIZE/2;

        const sprite = spriteSheet.getSprite(Math.floor(Math.random() * 3), 0);
        if (!sprite) return;
        this.graphics.use(sprite);
    }
}
