import {Color, ImageSource, Sound, Loader} from "excalibur";

const LOCAL_ASSETS_MODE = false;

function resolveFilePath(url: string){
    return `${
        LOCAL_ASSETS_MODE ?
            '':
            'https://raw.githubusercontent.com/saacostam/tic-final-game/main/docs'
    }${url}`;
}

const Images = {
    water: new ImageSource(resolveFilePath('/water.png')),
    player: new ImageSource(resolveFilePath('/player.png')),
    tree: new ImageSource(resolveFilePath('/tree.png')),
    leaf: new ImageSource(resolveFilePath('/leafs.png')),
    rock: new ImageSource(resolveFilePath('/rocks.png')),
    flower: new ImageSource(resolveFilePath('/flower.png')),
    grass: new ImageSource(resolveFilePath('/grass.png')),
    bushBlocker: new ImageSource(resolveFilePath('/bush-block.png')),
    waterProp: new ImageSource(resolveFilePath('/water-props.png')),
    forestProp: new ImageSource(resolveFilePath('/forest-props.png')),
    smallRock: new ImageSource(resolveFilePath('/small-rocks.png')),
    bear: new ImageSource(resolveFilePath('/bear.png')),
    deer: new ImageSource(resolveFilePath('/deer.png')),
    camera: new ImageSource(resolveFilePath('/camera.png')),
    frog: new ImageSource(resolveFilePath('/frog.png')),
    froggy: new ImageSource(resolveFilePath('/froggy.png')),
    condor: new ImageSource(resolveFilePath('/condor.png')),
}

const Sounds = {
    nope: new Sound(resolveFilePath('/audio/nope.mp3')),
    plop: new Sound(resolveFilePath('/audio/plop.mp3')),
    yeah: new Sound(resolveFilePath('/audio/yeah.mp3')),
    shutter: new Sound(resolveFilePath('/audio/camera.mp3')),
    music: new Sound(resolveFilePath('/audio/music.mp3')),
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
