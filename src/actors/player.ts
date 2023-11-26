import {
    Actor,
    Animation,
    AnimationStrategy,
    CollisionType,
    Color,
    Engine,
    Keys,
    Shape,
    SpriteSheet,
    Vector
} from 'excalibur';
import {TILE_SIZE} from "../constants";
import {Images, Sounds} from "../resources";
import {SCENES} from "../scenes";
import {Bear} from "./bear.ts";
import {Deer} from "./deer.ts";
import {GameState} from "../state";
import {PhotoFlash} from "../ui";
import {Froggy} from "./froggy.ts";
import {Condor} from "./condor.ts";

const spriteSheet = SpriteSheet.fromImageSource({
    image: Images.player,
    grid: {
        rows: 4,
        columns: 5,
        spriteWidth: 16,
        spriteHeight: 16,
    }
});

const upAnimation = Animation.fromSpriteSheetCoordinates({
    spriteSheet,
    frameCoordinates: [
        {x: 0, y: 2, duration: 100},
        {x: 1, y: 2, duration: 100},
        {x: 2, y: 2, duration: 100},
        {x: 3, y: 2, duration: 100},
    ],
    strategy: AnimationStrategy.Loop,
});

const rightAnimation = Animation.fromSpriteSheetCoordinates({
    spriteSheet,
    frameCoordinates: [
        {x: 0, y: 1, duration: 100},
        {x: 1, y: 1, duration: 100},
        {x: 2, y: 1, duration: 100},
        {x: 3, y: 1, duration: 100},
    ],
    strategy: AnimationStrategy.Loop,
});

const downAnimation = Animation.fromSpriteSheetCoordinates({
    spriteSheet,
    frameCoordinates: [
        {x: 0, y: 0, duration: 100},
        {x: 1, y: 0, duration: 100},
        {x: 2, y: 0, duration: 100},
        {x: 3, y: 0, duration: 100},
    ],
    strategy: AnimationStrategy.Loop,
});

const leftAnimation = Animation.fromSpriteSheetCoordinates({
    spriteSheet,
    frameCoordinates: [
        {x: 0, y: 3, duration: 100},
        {x: 1, y: 3, duration: 100},
        {x: 2, y: 3, duration: 100},
        {x: 3, y: 3, duration: 100},
    ],
    strategy: AnimationStrategy.Loop,
});

type PlayerArgs = {
    x: number;
    y: number;
    photoFlash: PhotoFlash;
}

export class Player extends Actor{
    private dir: number = 0;
    private photoFlash: PhotoFlash;

    constructor(args: PlayerArgs){
        super({
            ...args,
            color: Color.Magenta,
            collisionType: CollisionType.Active,
            collider: Shape.Box(TILE_SIZE/2, TILE_SIZE/5),
            anchor: new Vector(0.5, 0.90),
        });

        this.photoFlash = args.photoFlash;

        const sprite = spriteSheet.getSprite(0, 0);
        if (!sprite) return;
        this.graphics.use(sprite);
    }

    update(engine: Engine, delta: number){
        super.update(engine, delta);

        const MOVE_DIST = 0.08;
        let IS_MOVE = false;

        const {keyboard} = engine.input;

        if (keyboard.isHeld(Keys.Left)){
            this.pos.x -= MOVE_DIST * delta;
            IS_MOVE = true;
            this.dir = 3;
        }else if (keyboard.isHeld(Keys.Right)){
            this.pos.x += MOVE_DIST * delta;
            IS_MOVE = true;
            this.dir = 1;
        }else if (keyboard.isHeld(Keys.Up)){
            this.pos.y -= MOVE_DIST * delta;
            IS_MOVE = true;
            this.dir = 2;
        }else if (keyboard.isHeld(Keys.Down)){
            this.pos.y += MOVE_DIST * delta;
            IS_MOVE = true;
            this.dir = 0;
        }

        if (IS_MOVE){
            this.graphics.use([
                downAnimation,
                rightAnimation,
                upAnimation,
                leftAnimation
            ][this.dir])
        }else{
            const sprite = spriteSheet.getSprite(4, this.dir);
            if (sprite) this.graphics.use(sprite);
        }

        this.z = this.pos.y + (TILE_SIZE/2);

        if (keyboard.wasPressed(Keys.E)){
            Sounds.plop.play();
            engine.goToScene(SCENES.POKEDEX);
        }else if (keyboard.wasPressed(Keys.Space)){
            const MAX_PHOTO_DISTANCE = TILE_SIZE * 2;

            const { actors } = engine.currentScene;

            const wasLastPhotoSuccessful = actors.some(
                actor => {
                    if (actor instanceof Bear || actor instanceof Deer || actor instanceof Froggy || actor instanceof Condor){
                        // 1. Check distance to actor
                        const distance = actor.pos.distance(this.pos);
                        if (distance > MAX_PHOTO_DISTANCE) return;

                        // 2. Slope matches Direction
                        const slope = (actor.pos.y - this.pos.y)/(actor.pos.x - this.pos.x);
                        const isSlopePointingSides = Math.abs(slope) <= 1;

                        if (isSlopePointingSides){
                            if (this.dir === 2 || this.dir === 0) return;
                        }else{
                            if (this.dir === 1 || this.dir === 3) return;
                        }

                        // 3. Check Direction and Position
                        if (isSlopePointingSides){
                            if (this.dir === 1 && (this.pos.x > actor.pos.x)) return;
                            if (this.dir === 3 && (this.pos.x < actor.pos.x)) return;
                        }else{
                            if (this.dir === 0 && (this.pos.y > actor.pos.y)) return;
                            if (this.dir === 2 && (this.pos.y < actor.pos.y)) return;
                        }

                        const gameState = new GameState();
                        // 4. Trigger cut-scene if a new animal was photographed
                        if (actor instanceof Bear && !gameState.discoveredAnimals.some(animal => animal === 'bear')){
                            engine.goToScene(SCENES.PICTURE, {animal: 'bear'});
                        }else if (actor instanceof Deer && !gameState.discoveredAnimals.some(animal => animal === 'deer')){
                            engine.goToScene(SCENES.PICTURE, {animal: 'deer'});
                        }else if (actor instanceof Froggy && !gameState.discoveredAnimals.some(animal => animal === 'frog')){
                            engine.goToScene(SCENES.PICTURE, {animal: 'frog'});
                        }else if (actor instanceof Condor && !gameState.discoveredAnimals.some(animal => animal === 'condor')){
                            engine.goToScene(SCENES.PICTURE, {animal: 'condor'});
                        }

                        return true;
                    }
                }
            );

            this.photoFlash.flash(wasLastPhotoSuccessful);
        }

        this.photoFlash.pos = this.pos;
    }
}
