import {Actor, CollisionType, SpriteSheet} from 'excalibur';

import {Images} from '../resources';

const spriteSheet = SpriteSheet.fromImageSource({
    image: Images.medal,
    grid: {
        rows: 1,
        columns: 1,
        spriteWidth: 16,
        spriteHeight: 32,
    }
});

type MedalArgs = {
    x: number;
    y: number;
}

export class Medal extends Actor{
    constructor(args: MedalArgs){
        super({
            ...args,
            width: 16,
            height: 32,
            collisionType: CollisionType.Passive,
        });

        const sprite = spriteSheet.getSprite(0, 0);
        if (!sprite) return;
        this.graphics.use(sprite);
    }
}
