import {Actor, Animation, AnimationStrategy, CollisionType, Shape, SpriteSheet, Vector} from "excalibur";
import {Images} from "../resources";
import {TILE_SIZE} from "../constants";

const spriteSheet = SpriteSheet.fromImageSource({
    image: Images.frailejon,
    grid: {
        rows: 1,
        columns: 8,
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
        {x: 3, y: 0, duration: 200},
        {x: 4, y: 0, duration: 200},
        {x: 5, y: 0, duration: 200},
        {x: 6, y: 0, duration: 200},
        {x: 7, y: 0, duration: 200},
    ],
    strategy: AnimationStrategy.Loop,
});

type FrailejonArgs = {
    x: number;
    y: number;
}

export class Frailejon extends Actor{
    constructor(args: FrailejonArgs) {
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
