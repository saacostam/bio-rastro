import {Color, ImageSource, Sound, Loader} from "excalibur";

const Images = {
    water: new ImageSource('/water.png'),
    player: new ImageSource('/player.png'),
    tree: new ImageSource('/tree.png'),
    leaf: new ImageSource('/leafs.png'),
    rock: new ImageSource('/rocks.png'),
    flower: new ImageSource('/flower.png'),
    grass: new ImageSource('/grass.png'),
    bushBlocker: new ImageSource('/bush-block.png'),
    waterProp: new ImageSource('/water-props.png'),
    forestProp: new ImageSource('/forest-props.png'),
    smallRock: new ImageSource('/small-rocks.png'),
    bear: new ImageSource('/bear.png'),
    deer: new ImageSource('/deer.png'),
    camera: new ImageSource('/camera.png'),
    frog: new ImageSource('/frog.png'),
    froggy: new ImageSource('/froggy.png'),
    condor: new ImageSource('/condor.png'),
}

const Sounds = {
    nope: new Sound('/audio/nope.mp3'),
    plop: new Sound('/audio/plop.mp3'),
    yeah: new Sound('/audio/yeah.mp3'),
    shutter: new Sound('/audio/camera.mp3'),
    music: new Sound('/audio/music.mp3'),
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
