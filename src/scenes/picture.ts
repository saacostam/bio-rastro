import {Actor, Engine, Keys, Scene, SceneActivationContext, Vector} from "excalibur";

import {Animal} from "../definitions";
import {FlashSquare, PictureName} from "../ui";
import {Bear, Condor, Deer, Frog} from "../actors";
import {GameState} from "../state";
import {SCENES} from "./constants";
import {PokedexSceneActivationContext} from "./pokedex.ts";
import {Sounds} from "../resources";

export type PictureSceneActivationContext = {
    animal: Animal;
};

export class PictureScene extends Scene{
    private curtains: FlashSquare[] = [];
    private animal: Actor = new Bear({x: 0, y: 0});
    private animalPosition: Vector = Vector.Zero;
    private label: PictureName = new PictureName({x: 0, y: 0, text: ''});
    private timeout = 0;
    private inTimeout = false;
    private preferredAnimal: Animal = 'bear';

    public onInitialize(engine: Engine) {
        const { drawWidth, drawHeight } = engine;

        this.curtains = [
            new FlashSquare({
                type: 'top',
                width: drawWidth,
                height: drawHeight,
            }),
            new FlashSquare({
                type: 'bottom',
                width: drawWidth,
                height: drawHeight,
            })
        ];
        this.curtains.forEach(curtain => this.add(curtain));

        this.animalPosition = new Vector(drawWidth/2, drawHeight/2)
        this.animal = new Bear({
            x: this.animalPosition.x,
            y: this.animalPosition.y
        });
        this.add(this.animal);

        this.label = new PictureName({
            x: drawWidth/2,
            y: drawHeight/2 + 16,
            text: 'bear',
        });
        this.add(this.label);

        this.add(new PictureName({
            x: drawWidth/2,
            y: drawHeight/2 - 16,
            text: '¡Nuevo Animal!',
        }))

        this.camera.zoom = 3;
    }

    public onActivate(_context: SceneActivationContext<PictureSceneActivationContext>){
        this.animal.kill();
        this.curtains.forEach(curtain => curtain.reset());
        const {x, y} = this.animalPosition;

        let animalActor: Actor;
        switch (_context.data?.animal){
            case 'frog':
                animalActor = new Frog({x, y});
                this.label.text = 'Rana Arlequín';
                break;
            case 'deer':
                animalActor = new Deer({x, y});
                this.label.text = 'Venado Cola Blanca';
                break;
            case 'condor':
                animalActor = new Condor({x, y});
                this.label.text = 'Cóndor de los Andes';
                break;
            case 'bear':
            default:
                animalActor = new Bear({x, y});
                this.label.text = 'Oso de Anteojos';
                break;
        }

        this.animal = animalActor;
        this.add(this.animal);

        this.label.text = this.label.text.toUpperCase();

        const gameState = new GameState();
        if (_context.data?.animal) {
            gameState.discoveredAnimals.push(_context.data?.animal);
            this.preferredAnimal = _context.data?.animal || 'bear';
        };

        this.timeout = 0;
        this.inTimeout = true;

        const ui = document.getElementById('ui');
        if (ui){
            ui.innerHTML = '';
            const instructionsElement = document.createElement('div');
            instructionsElement.className = 'ins';

            const photoIndication = document.createElement('div');
            photoIndication.innerText = 'Espacio: Continuar';
            instructionsElement.append(photoIndication);

            ui.append(instructionsElement);
        };
    }

    update(engine: Engine, delta: number) {
        super.update(engine, delta);

        const TOTAL_MOVEMENT_TIME = 400;
        this.timeout += delta;

        if (this.inTimeout && this.timeout >=  TOTAL_MOVEMENT_TIME){
            if (engine.input.keyboard.wasPressed(Keys.Space)){
                const context: PokedexSceneActivationContext = {
                    preference: this.preferredAnimal,
                }

                Sounds.plop.play();
                engine.goToScene(SCENES.POKEDEX, context);

                this.inTimeout = false;
            }
        }
    }
}
