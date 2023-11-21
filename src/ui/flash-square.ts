import {Actor, CollisionType, Color, Engine, Vector} from "excalibur";

type FlashSquareArgs = {
    type: 'top' | 'bottom';
    width: number;
    height: number;
}

export class FlashSquare extends Actor{
    private readonly type: 'top' | 'bottom';
    private initPos: Vector;
    private timeout = 0;

    constructor(args: FlashSquareArgs) {
        const pos = args.type === 'top' ?
            {
                x: args.width/2,
                y: args.height/2 + args.height/4,
            }:
            {
                x: args.width/2,
                y: args.height/2 - args.height/4,
            };

        super({
            ...pos,
            height: args.height/2,
            width: args.width,
            color: Color.White,
            collisionType: CollisionType.Passive,
        });

        this.initPos = new Vector(pos.x, pos.y);
        this.type = args.type;

        this.z = 1000;
    }

    public reset(){
        this.pos.x = this.initPos.x;
        this.pos.y = this.initPos.y;
        this.timeout = 0;
    }

    update(engine: Engine,delta: number) {
        if (!engine) return;
        this.timeout += delta;

        const TOTAL_MOVEMENT_TIME = 100;
        const RATE = 0.2;

        if (
            TOTAL_MOVEMENT_TIME < this.timeout &&
            this.timeout < TOTAL_MOVEMENT_TIME * 4
        ){
            const deltaMov = delta * RATE;
            const direction = (this.type === 'top') ? 1 : -1;

            this.pos.y += (deltaMov * direction);
        }
    }
}
