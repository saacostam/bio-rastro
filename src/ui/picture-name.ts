import {Color, Font, FontUnit, Label, TextAlign} from "excalibur";

type PictureNameArgs = {
    x: number;
    y: number;
    text: string;
}

export class PictureName extends Label{
    constructor(args: PictureNameArgs) {
        super({
            ...args,
            color: Color.White,
            font: new Font({
                family: 'Pixelify Sans',
                size: 7,
                unit: FontUnit.Px,
                textAlign: TextAlign.Center,
                quality: 12,
            }),
        });
    }
}
