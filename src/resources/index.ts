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
    frailejon: new ImageSource(resolveFilePath('/frailejon.png')),
    medal: new ImageSource(resolveFilePath('/medal.png')),
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

loader.suppressPlayButton = true;
loader.playButtonText = 'Go';

loader.logo =
    "data:image/png;base64,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"

export { loader, Images, Sounds }
