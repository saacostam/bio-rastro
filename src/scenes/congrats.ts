import {Engine, Keys, Scene, SceneActivationContext} from "excalibur";

import {PictureSceneActivationContext} from "./picture.ts";
import {Medal} from "../world";
import {PictureName} from "../ui";
import {Bear, Condor, Deer, Frailejon, Froggy} from "../actors";
import {Sounds} from "../resources";
import {SCENES} from "./constants";
import {PokedexSceneActivationContext} from "./pokedex.ts";
import {Animal} from "../definitions";

export type CongratsActivationContext = PictureSceneActivationContext;

export class Congrats extends Scene{
    private preferredAnimal: Animal = 'bear';

    public onInitialize(_engine: Engine) {
        const { drawWidth, drawHeight } = _engine;

        this.add(new Medal({
            x: drawWidth*24/64,
            y: drawHeight*2.5/8,
        }));

        this.add(new PictureName({
            x: drawWidth*17/32,
            y: drawHeight*2.5/8,
            text: '¡Felicitaciones!'
        }));

        this.add(new Frailejon({
            x: drawWidth*4/16,
            y: drawHeight*15/32,
        }));

        this.add(new Bear({
            x: drawWidth*6/16,
            y: drawHeight*15/32,
        }));

        this.add(new Deer({
            x: drawWidth*8/16,
            y: drawHeight*15/32,
        }));

        this.add(new Condor({
            x: drawWidth*10/16,
            y: drawHeight*15/32,
        }));

        this.add(new Froggy({
            x: drawWidth*12/16,
            y: drawHeight*15/32,
        }));

        this.add(new PictureName({
            x: drawWidth/2,
            y: drawHeight*18/32,
            text: 'Eres el guardián oficial del páramo,',
        }));
        this.add(new PictureName({
            x: drawWidth/2,
            y: drawHeight*19/32,
            text: 'encargado de cuidar y proteger su biodiversidad.',
        }));
        this.add(new PictureName({
            x: drawWidth/2,
            y: drawHeight*20/32,
            text: 'Tu misión es mantener un equilibrio armonioso',
        }));
        this.add(new PictureName({
            x: drawWidth/2,
            y: drawHeight*21/32,
            text: ' en este entorno único, asegurando que las',
        }));
        this.add(new PictureName({
            x: drawWidth/2,
            y: drawHeight*22/32,
            text: 'especies y su hábitat prosperen.',
        }));

        this.add(new PictureName({
            x: drawWidth/2,
            y: drawHeight*24/32,
            text: 'Tu compromiso es crucial para preservar',
        }));
        this.add(new PictureName({
            x: drawWidth/2,
            y: drawHeight*25/32,
            text: 'la belleza y vitalidad del páramo.',
        }));
        this.add(new PictureName({
            x: drawWidth/2,
            y: drawHeight*27/32,
            text: '¡Desempeña tu papel con dedicación y determinación!',
        }));

        this.camera.zoom = 1.25;
        this.camera.y = drawHeight*18/32;
    }

    public onActivate(_context: SceneActivationContext<CongratsActivationContext>) {
        super.onActivate(_context);
        this.preferredAnimal = _context.data?.animal || 'bear';
    }

    update(engine: Engine, delta: number) {
        super.update(engine, delta);

        const { input: {keyboard}} = engine;

        if (keyboard.wasPressed(Keys.Space)){
            const context: PokedexSceneActivationContext = {
                preference: this.preferredAnimal,
            }

            Sounds.plop.play();
            engine.goToScene(SCENES.POKEDEX, context);
        }
    }
}
