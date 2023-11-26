import {Actor} from "excalibur";

import {BushBlocker, Flower, ForestProp, Grass, Leaf, Rock, SmallRock, Water, WaterProp} from "../../world";
import {TILE_SIZE} from "../../constants";
import {LevelDefinition} from "../../definitions";
import {Bear, Condor, Deer, Frailejon, Froggy} from "../../actors";

export function buildLevel(levelDefinition: LevelDefinition): Actor[]{
    const {
        objects,
        rocks,
        bushBlockers,
        waterProps,
        smallRocks,
        animals,
    } = levelDefinition;

    const actors: Actor[] = [];

    for (let i = 0; i < objects.length; i++){
        for (let j = 0; j < objects[i].length; j++){
            const x = j * TILE_SIZE;
            const y = i * TILE_SIZE;
            const tileRef = objects[i][j];

            let actor: Actor | null;
            switch (tileRef){
                case 'WTL':
                    actor = new Water({x, y, sx: 0, sy: 0});
                    break;
                case 'WT':
                    actor = new Water({x, y, sx: 1, sy: 0});
                    break;
                case 'WTR':
                    actor = new Water({x, y, sx: 2, sy: 0});
                    break;
                case 'WL':
                    actor = new Water({x, y, sx: 0, sy: 1});
                    break;
                case 'W':
                    actor = new Water({x, y, sx: 1, sy: 1});
                    break;
                case 'WR':
                    actor = new Water({x, y, sx: 2, sy: 1});
                    break;
                case 'WBL':
                    actor = new Water({x, y, sx: 0, sy: 2});
                    break;
                case 'WB':
                    actor = new Water({x, y, sx: 1, sy: 2});
                    break;
                case 'WBR':
                    actor = new Water({x, y, sx: 2, sy: 2});
                    break;
                case 'G':
                    const random = Math.random();
                    actor = random < 0.15 ?
                            new Leaf({x, y}):
                        random < 0.25 ?
                            new Flower({x, y}):
                        random < 0.30 ?
                            new Grass({x, y}):
                        random < 0.35 ?
                            new ForestProp({x, y}):
                            null;
                    break;
                default:
                    actor = null;
                    break;
            }

            if (actor) actors.push(actor);
        }
    }

    bushBlockers.forEach(
        bushBlocker => actors.push(new BushBlocker({x: bushBlocker.x, y: bushBlocker.y}))
    );
    waterProps.forEach(
        waterProp => actors.push(new WaterProp({x: waterProp.x, y: waterProp.y}))
    );
    rocks.forEach(rock => actors.push(new Rock({x: rock.x, y: rock.y})));
    smallRocks.forEach(
        smallRock => actors.push(new SmallRock({x: smallRock.x, y: smallRock.y}))
    );

    animals.forEach(
        animal => {
            const {x, y} = animal;

            let animalInstance: Actor;
            switch (animal.type){
                case 'frog':
                    animalInstance = new Froggy({x, y});
                    break;
                case 'deer':
                    animalInstance = new Deer({x, y})
                    break;
                case 'condor':
                    animalInstance = new Condor({x, y});
                    break;
                case 'frailejon':
                    animalInstance = new Frailejon({x, y});
                    break;
                case 'bear':
                default:
                    animalInstance = new Bear({x, y});
                    break;
            }
            actors.push(animalInstance);
        }
    )

    return actors;
}
