import {Actor, Color, Font, FontUnit, Label, TextAlign, Vector} from "excalibur";

import {AnimalDescription} from "../definitions";

type DescriptionArgs = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class Description extends Actor{
    static commonTextFontConfig = {
        family: 'Pixelify Sans',
        unit: FontUnit.Px,
        textAlign: TextAlign.Left,
        quality: 8,
    }
    private static commonHeaderFont = new Font({
        ...Description.commonTextFontConfig,
        size: 12,
    })
    private static commonTextFont = new Font({
        ...Description.commonTextFontConfig,
        size: 8,
    });

    private texts: Label[] = [];

    constructor(args: DescriptionArgs) {
        super({
            ...args,
        });
    }

    public setDescription(animalDescription: AnimalDescription){
        const LINE_HEIGHT_DIFF = 10;

        const {description} = animalDescription;
        const x0 = this.pos.x - this.width/2;
        let y = this.pos.y - this.height/2 + LINE_HEIGHT_DIFF*3.15;

        this.texts.forEach(text => text.kill());

        this.texts = [new Label({
            font: Description.commonHeaderFont,
            text: 'Descripción',
            color: Color.White,
            pos: new Vector(x0, y - (LINE_HEIGHT_DIFF*1.8)),
        })];

        description.forEach(
            line => {
                const newLineText = this.buildText(
                    line,
                    new Vector(x0, y),
                );
                this.texts.push(newLineText);
                y += LINE_HEIGHT_DIFF;
            }
        );

        this.texts.forEach(text => this.scene.add(text));
    }

    private buildText(text: string, pos: Vector): Label{
        return new Label({
            font: Description.commonTextFont,
            text: text,
            width: this.width,
            pos: pos,
            color: Color.White,
        });
    }
}
