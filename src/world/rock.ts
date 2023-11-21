import {Actor, CollisionType, Shape, SpriteSheet, Vector} from 'excalibur';
import {Images} from '../resources';
import {TILE_SIZE} from "../constants";

const spriteSheet = SpriteSheet.fromImageSource({
    image: Images.rock,
    grid: {
        rows: 2,
        columns: 4,
        spriteWidth: 32,
        spriteHeight: 32,
    }
});

type RockArgs = {
    x: number;
    y: number;
}

export class Rock extends Actor{
    constructor(args: RockArgs){
        super({
            ...args,
            width: 32,
            height: 32,
            collisionType: CollisionType.Fixed,
            collider: Shape.Box(TILE_SIZE*1.5, TILE_SIZE),
            anchor: new Vector(0.5, 0.75),
        });

        this.z = args.y + TILE_SIZE/2;

        const sprite = spriteSheet.getSprite(Math.floor(Math.random() * 4), Math.floor(Math.random() * 2));
        if (!sprite) return;
        this.graphics.use(sprite);
    }
}
