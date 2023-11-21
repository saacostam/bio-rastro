import {Actor, CollisionType, Color} from "excalibur";

import {LevelDefinition} from "../../definitions";
import {TILE_SIZE} from "../../constants";

type CondigDefinitionsOutput = {
    width: number,
    height: number,
    floor: Actor,
    limits: Actor[],
}

export function configDefinitions(levelDefinition: LevelDefinition): CondigDefinitionsOutput{
    const width  = levelDefinition.objects[0].length * TILE_SIZE;
    const height = levelDefinition.objects.length * TILE_SIZE;

    const floor = new Actor({
        x: width/2 - TILE_SIZE/2,
        y: height/2 - TILE_SIZE/2,
        width: width,
        height: height,
        color: levelDefinition.backgroundColor,
    })

    const LIMIT_COLOR = Color.Transparent;
    const LIMIT_COLLISION_TYPE = CollisionType.Fixed;
    const limits = [
        new Actor({x: width/2 - TILE_SIZE/2, y: -TILE_SIZE, width: width, height: TILE_SIZE, color: LIMIT_COLOR, collisionType: LIMIT_COLLISION_TYPE}),
        new Actor({x: -TILE_SIZE, y: height/2 - TILE_SIZE/2, width: TILE_SIZE, height: height, color: LIMIT_COLOR, collisionType: LIMIT_COLLISION_TYPE}),
        new Actor({x: width/2 - TILE_SIZE/2, y: height, width: width, height: TILE_SIZE, color: LIMIT_COLOR, collisionType: LIMIT_COLLISION_TYPE}),
        new Actor({x: width, y: height/2 - TILE_SIZE/2, width: TILE_SIZE, height: height, color: LIMIT_COLOR, collisionType: LIMIT_COLLISION_TYPE}),
    ]

    return {
        width: width,
        height: height,
        floor: floor,
        limits: limits,
    }
}
