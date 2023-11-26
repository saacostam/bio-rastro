import {Actor, Engine, Keys, Scene, SceneActivationContext} from "excalibur";

import {AllAnimals, Animal, pokedex} from "../definitions";
import {TILE_SIZE} from "../constants";
import {Description, PictureName} from "../ui";
import {Bear, Condor, Deer, Frog} from "../actors";
import {SCENES} from "./constants";
import {GameState} from "../state";
import {Sounds} from "../resources";

type AnimalProfile = {
    animal: Actor;
    animalLabel: PictureName;
    type: Animal;
}

export type PokedexSceneActivationContext = {
    preference?: Animal;
}

export class Pokedex extends Scene{
    private animalProfile: AnimalProfile = {
        animal: new Bear({x: 2.7*TILE_SIZE, y: 3*TILE_SIZE}),
        animalLabel: new PictureName({x: 2.7*TILE_SIZE, y: 4*TILE_SIZE, text: 'Oso de Anteojos'}),
        type: 'bear',
    }
    private descriptionBox: Description = new Description({
        x: 10.1*TILE_SIZE,
        y: 5*TILE_SIZE,
        width: 9*TILE_SIZE,
        height: 10*TILE_SIZE,
    });

    public onInitialize() {
        this.add(this.animalProfile.animal);
        this.add(this.animalProfile.animalLabel);
        this.add(this.descriptionBox);
    }

    public onActivate(_context: SceneActivationContext<PokedexSceneActivationContext>) {
        this.buildScene(_context.data?.preference || 'bear');
    }

    private buildScene(pref?: Animal){
        this.animalProfile.animal.kill();
        let animal: Actor;
        switch (pref){
            case 'frog':
                animal = new Frog({x: 2.7*TILE_SIZE, y: 3*TILE_SIZE});
                this.animalProfile.animalLabel.text = 'Rana Arlequín';
                break;
            case 'deer':
                animal = new Deer({x: 2.7*TILE_SIZE, y: 3*TILE_SIZE});
                this.animalProfile.animalLabel.text = 'Venado Cola Blanca';
                break;
            case 'condor':
                animal = new Condor({x: 2.7*TILE_SIZE, y: 3*TILE_SIZE});
                this.animalProfile.animalLabel.text = 'Cóndor de los Andes';
                break;
            case 'bear':
            default:
                animal = new Bear({x: 2.7*TILE_SIZE, y: 3*TILE_SIZE});
                this.animalProfile.animalLabel.text = 'Oso de Anteojos';
                break;
        }

        this.animalProfile.animal = animal;
        this.add(this.animalProfile.animal);

        const preference = pref || 'bear';

        const animalDescription = pokedex.find(animal => animal.type === preference);
        if (animalDescription) this.descriptionBox.setDescription(animalDescription);

        this.animalProfile.animalLabel.text = this.animalProfile.animalLabel.text.toUpperCase();
        this.animalProfile.type = preference;

        const ui = document.getElementById('ui');
        if (ui){
            // Instructions
            ui.innerHTML = '';
            const instructionsElement = document.createElement('div');
            instructionsElement.className = 'ins';

            const movementIndication = document.createElement('div');
            movementIndication.innerText = 'Arriba-Abajo: Navegación';
            const photoIndication = document.createElement('div');
            photoIndication.innerText = 'Espacio: Salir';

            instructionsElement.append(movementIndication);
            instructionsElement.append(photoIndication);

            ui.append(instructionsElement);

            // Navigation List
            const gameState = new GameState();

            const discoveredAnimalsList = document.createElement('div');
            discoveredAnimalsList.className = 'pokedex-nav';
            AllAnimals.forEach(
                animal => {
                    const el = document.createElement('div');
                    el.className = `animal-nav ${gameState.discoveredAnimals.some(discovAnimal => discovAnimal === animal) ? 'available': 'blocked'}`;
                    if (animal === preference) el.classList.add('current');
                    const img = document.createElement('img');
                    img.src = `./profile/${animal}.png`;
                    const nameDiv = document.createElement('div');
                    nameDiv.innerText =
                        animal === 'bear' ? 'Oso de Anteojos' :
                        animal === 'deer' ? 'Venado Cola Blanca':
                        animal === 'frog' ? 'Rana Arlequín':
                        animal === 'condor' ? 'Cóndor de los Andes':
                                'Undefined';

                    el.append(img);
                    el.append(nameDiv);

                    discoveredAnimalsList.append(el);
                }
            );
            ui.append(discoveredAnimalsList);
        }
    }

    update(engine: Engine) {
        const { keyboard } = engine.input;

        if (keyboard.wasPressed(Keys.Space)) {
            Sounds.plop.play();
            this.engine.goToScene(SCENES.LEVEL1);
        }else if (keyboard.wasPressed(Keys.Up)) this.handleNav(engine, -1);
        else if (keyboard.wasPressed(Keys.Down)) this.handleNav(engine,1);
    }

    private handleNav(_: Engine, dir: number){
        const DIR = dir/Math.abs(dir);
        const N = AllAnimals.length;

        const currentIndex = AllAnimals.indexOf(this.animalProfile.type);
        if (currentIndex === -1) return;

        Sounds.plop.play();
        let iterator = (currentIndex+DIR+N)%N;
        this.buildScene(AllAnimals[iterator]);
        return;
    }
}
