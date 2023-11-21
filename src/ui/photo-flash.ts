import {Actor, CollisionType, Color, Engine, Scene, SpriteSheet, Vector} from "excalibur";

import {Images, Sounds} from "../resources";

const spriteSheet = SpriteSheet.fromImageSource({
    image: Images.camera,
    grid: {
        rows: 1,
        columns: 3,
        spriteWidth: 22,
        spriteHeight: 22,
    }
});

type PhotoFlashArgs = {
    width: number;
    height: number;
}

export class PhotoFlash extends Actor{
    private isVisible = false;
    private timeout = 0;

    private cameraImage?: Actor;
    private wasCameraImageAdded = false;

    constructor(args: PhotoFlashArgs) {
        super({
            width: args.width*2,
            height: args.height*2,
            color: Color.White,
        });

        this.graphics.opacity = 0;
        this.z = 1000;

        this.cameraImage = new Actor({
            x: args.width*7/8,
            y: args.height/4,
            width: 22,
            height: 22,
            collisionType: CollisionType.Passive,
        });

        this.cameraImage.z = 2000;

        const sprite = spriteSheet.getSprite(0, 0);
        if (!sprite) return;
        this.cameraImage.graphics.use(sprite);
    }

    public flash(valid: boolean){
        this.timeout = 0;
        this.isVisible = true;
        this.graphics.opacity = 0.3;
        this.color = Color.White;

        Sounds.shutter.play();
        if (valid){
            Sounds.yeah.play();
        }else{
            Sounds.nope.play();
        }

        const sprite = spriteSheet.getSprite(valid ? 2 : 1, 0);
        if (!sprite) return;
        this.cameraImage?.graphics.use(sprite);
    }

    update(engine: Engine, delta: number) {
        super.update(engine, delta);

        if (!this.wasCameraImageAdded && this.cameraImage) this.scene.add(this.cameraImage);

        const {drawWidth, drawHeight} = engine;
        if (this.cameraImage) this.cameraImage.pos = this.scene.camera.pos.add(new Vector(drawWidth*7/16,drawHeight*27/64));

        const TOTAL_FLASH_TIME = 100;
        this.timeout += delta;

        if (this.isVisible && this.timeout > TOTAL_FLASH_TIME){
            this.graphics.opacity = 0;
            this.isVisible = false;

            const sprite = spriteSheet.getSprite(0, 0);
            if (!sprite) return;
            this.cameraImage?.graphics.use(sprite);
        }
    }

    onPreKill(_scene: Scene) {
        super.onPreKill(_scene);
        this.cameraImage?.kill();
    }
}
