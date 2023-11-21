import {Animal} from "../definitions";

export class GameState {
    private static instance: GameState;
    public discoveredAnimals: Animal[] = [];

    constructor() {
        if (GameState.instance) return GameState.instance;
        GameState.instance = this;
    }
}
