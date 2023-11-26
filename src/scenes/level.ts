import {Scene} from 'excalibur';

import {configDefinitions, buildLevel} from "./utils";
import {AllAnimals, level} from "../definitions";
import {Player} from "../actors";
import {PhotoFlash} from "../ui";
import {GameState} from "../state";

export class Level extends Scene{
    private player: Player = new Player({x: 0, y: 0, photoFlash: new PhotoFlash({width: 0, height: 0})});

    private WIDTH: number = 0;
    private HEIGHT: number = 0;

    public onInitialize(){
        // Level Definition
        const {width, height, floor, limits} = configDefinitions(level);

        this.WIDTH = width; this.WIDTH;
        this.HEIGHT = height; this.HEIGHT;

        this.add(floor);
        limits.forEach(limit => this.add(limit));

        // Level Build
        const actors = buildLevel(level);
        actors.forEach(actor => this.add(actor));

        // Player
        const photoFlash = new PhotoFlash({width: width, height: height});
        this.add(photoFlash);
        this.player = new Player({x: 0, y: 0, photoFlash: photoFlash});
        this.add(this.player);
        this.camera.strategy.elasticToActor(this.player, 0.2, 0.2);
    }

    public onActivate() {
        const gameState = new GameState();

        const ui = document.getElementById('ui');
        if (ui){
            // Instructions
            ui.innerHTML = '';
            const instructionsElement = document.createElement('div');
            instructionsElement.className = 'ins';

            const movementIndication = document.createElement('div');
            movementIndication.innerText = 'Flechas: Movimiento';
            const photoIndication = document.createElement('div');
            photoIndication.innerText = 'Espacio: Tomar Foto';
            const pokedexIndication = document.createElement('div');
            pokedexIndication.innerText = 'E: Abrir Libreta';

            instructionsElement.append(movementIndication);
            instructionsElement.append(photoIndication);
            instructionsElement.append(pokedexIndication);

            ui.append(instructionsElement);

            // Discovered Animals UI
            const discoveredAnimalsList = document.createElement('div');
            discoveredAnimalsList.className = 'main-nav';
            AllAnimals.forEach(
                animal => {
                    const el = document.createElement('div');
                    el.className = `animal-nav ${gameState.discoveredAnimals.some(discovAnimal => discovAnimal === animal) ? 'success': 'failure'}`;
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
}
