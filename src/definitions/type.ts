import {Color} from 'excalibur';

type ActorPosition = {
    x: number;
    y: number;
}

export type Animal = 'bear' | 'deer' | 'frog' | 'condor' | 'frailejon';
export const AllAnimals: Animal[] = [
    'bear',
    'deer',
    'frog',
    'condor',
    'frailejon',
]

type AnimalPosition = ActorPosition & {
    type: Animal;
}

export type LevelDefinition = {
    backgroundColor: Color;
    objects: string[][];
    rocks: ActorPosition[],
    smallRocks: ActorPosition[],
    bushBlockers: ActorPosition[],
    waterProps: ActorPosition[],
    animals: AnimalPosition[],
}

export type AnimalDescription = {
    type: Animal;
    description: string[];
}
