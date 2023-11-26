import {Actor, Animation, AnimationStrategy, CollisionType, Shape, SpriteSheet, Vector} from "excalibur";
import {Images} from "../resources";
import {TILE_SIZE} from "../constants";

const spriteSheet = SpriteSheet.fromImageSource({
    image: Images.condor,
    grid: {
        rows: 1,
        columns: 3,
        spriteWidth: 16,
        spriteHeight: 16,
    }
});

const idleAnimation = Animation.fromSpriteSheetCoordinates({
    spriteSheet,
    frameCoordinates: [
        {x: 0, y: 0, duration: 200},
        {x: 1, y: 0, duration: 200},
        {x: 2, y: 0, duration: 200},
    ],
    strategy: AnimationStrategy.Loop,
});

type CondorArgs = {
    x: number;
    y: number;
}

export class Condor extends Actor{
    constructor(args: CondorArgs) {
        super({
            ...args,
            width: 16,
            height: 16,
            collisionType: CollisionType.Fixed,
            collider: Shape.Box(TILE_SIZE/2, TILE_SIZE/4),
            anchor: new Vector(0.5, 0.75),
        });

        this.graphics.use(idleAnimation);

        this.z = this.pos.y + (TILE_SIZE/2);
    }

    update() {
        this.z = this.pos.y + (TILE_SIZE/2);
    }
}
