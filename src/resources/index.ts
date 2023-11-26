import {Color, ImageSource, Sound, Loader} from "excalibur";

const Images = {
    water: new ImageSource('https://github.com/saacostam/tic-final-game/raw/main/docs/water.png'),
    player: new ImageSource('https://github.com/saacostam/tic-final-game/raw/main/docs/player.png'),
    tree: new ImageSource('https://github.com/saacostam/tic-final-game/raw/main/docs/tree.png'),
    leaf: new ImageSource('https://github.com/saacostam/tic-final-game/raw/main/docs/leafs.png'),
    rock: new ImageSource('https://github.com/saacostam/tic-final-game/raw/main/docs/rocks.png'),
    flower: new ImageSource('https://github.com/saacostam/tic-final-game/raw/main/docs/flower.png'),
    grass: new ImageSource('https://github.com/saacostam/tic-final-game/raw/main/docs/grass.png'),
    bushBlocker: new ImageSource('https://github.com/saacostam/tic-final-game/raw/main/docs/bush-block.png'),
    waterProp: new ImageSource('https://github.com/saacostam/tic-final-game/raw/main/docs/water-props.png'),
    forestProp: new ImageSource('https://github.com/saacostam/tic-final-game/raw/main/docs/forest-props.png'),
    smallRock: new ImageSource('https://github.com/saacostam/tic-final-game/raw/main/docs/small-rocks.png'),
    bear: new ImageSource('https://github.com/saacostam/tic-final-game/raw/main/docs/bear.png'),
    deer: new ImageSource('https://github.com/saacostam/tic-final-game/raw/main/docs/deer.png'),
    camera: new ImageSource('https://github.com/saacostam/tic-final-game/raw/main/docs/camera.png'),
    frog: new ImageSource('https://github.com/saacostam/tic-final-game/raw/main/docs/frog.png'),
    froggy: new ImageSource('https://github.com/saacostam/tic-final-game/raw/main/docs/froggy.png'),
    condor: new ImageSource('https://github.com/saacostam/tic-final-game/raw/main/docs/condor.png'),
}

const Sounds = {
    nope: new Sound('https://github.com/saacostam/tic-final-game/raw/main/docs/audio/nope.mp3'),
    plop: new Sound('https://github.com/saacostam/tic-final-game/raw/main/docs/audio/plop.mp3'),
    yeah: new Sound('https://github.com/saacostam/tic-final-game/raw/main/docs/audio/yeah.mp3'),
    shutter: new Sound('https://github.com/saacostam/tic-final-game/raw/main/docs/audio/camera.mp3'),
    music: new Sound('https://github.com/saacostam/tic-final-game/raw/main/docs/audio/music.mp3'),
}

const loader = new Loader();
const allResources = {
    ...Images,
    ...Sounds,
}

for (const res in allResources) {
    // @ts-ignore
    loader.addResource(allResources[res])
}

// Customize Loader
loader.loadingBarColor = Color.White;
loader.backgroundColor = '#000';

loader.suppressPlayButton = false;
loader.playButtonText = 'Go';

export { loader, Images, Sounds }
