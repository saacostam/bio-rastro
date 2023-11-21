import {Actor, CollisionType, Shape, SpriteSheet, Vector} from 'excalibur';
import {Images} from '../resources';
import {TILE_SIZE} from "../constants";

const spriteSheet = SpriteSheet.fromImageSource({
    image: Images.smallRock,
    grid: {
        rows: 2,
        columns: 3,
        spriteWidth: 16,
        spriteHeight: 16,
    }
});

type SmallRockArgs = {
    x: number;
    y: number;
}

export class SmallRock extends Actor{
    constructor(args: SmallRockArgs){
        super({
            ...args,
            width: 16,
            height: 16,
            collisionType: CollisionType.Fixed,
            collider: Shape.Box(TILE_SIZE, TILE_SIZE/2),
            anchor: new Vector(0.5, 0.75),
        });

        this.z = args.y + TILE_SIZE/4;

        const sprite = spriteSheet.getSprite(
            Math.floor(Math.random() * 3),
            Math.floor(Math.random() * 2)
        );
        if (!sprite) return;
        this.graphics.use(sprite);
    }
}
