import {Actor, Animation, AnimationStrategy, CollisionType, Shape, SpriteSheet, Vector} from "excalibur";
import {Images} from "../resources";
import {TILE_SIZE} from "../constants";

const spriteSheet = SpriteSheet.fromImageSource({
    image: Images.froggy,
    grid: {
        rows: 1,
        columns: 8,
        spriteWidth: 12,
        spriteHeight: 12,
    }
});

const idleAnimation = Animation.fromSpriteSheetCoordinates({
    spriteSheet,
    frameCoordinates: [
        {x: 0, y: 0, duration: 200},
        {x: 1, y: 0, duration: 200},
        {x: 2, y: 0, duration: 200},
        {x: 3, y: 0, duration: 200},
        {x: 4, y: 0, duration: 200},
        {x: 5, y: 0, duration: 200},
        {x: 6, y: 0, duration: 200},
        {x: 7, y: 0, duration: 200},
    ],
    strategy: AnimationStrategy.Loop,
});

type FroggyArgs = {
    x: number;
    y: number;
}

export class Froggy extends Actor{
    constructor(args: FroggyArgs) {
        super({
            ...args,
            width: 12,
            height: 12,
            collisionType: CollisionType.Fixed,
            collider: Shape.Box(12, 12/4),
            anchor: new Vector(0.5, 0.75),
        });

        this.graphics.use(idleAnimation);

        this.z = this.pos.y + (12/2);
    }

    update() {
        this.z = this.pos.y + (TILE_SIZE/2);
    }
}
