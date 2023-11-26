import {Engine, DisplayMode, Input, Color} from 'excalibur';

import './style.css';
import {loader, Sounds} from './resources';
import {Level, PictureScene, Pokedex, SCENES} from './scenes';

const game = new Engine({
  width: 256,
  height: 192,
  displayMode: DisplayMode.FitScreen,
  pointerScope: Input.PointerScope.Document,
  antialiasing: false,
  pixelRatio: 4,
  backgroundColor: Color.Black,
  canvasElementId: 'game',
})

game.addScene(SCENES.LEVEL1, new Level());
game.addScene(SCENES.PICTURE, new PictureScene());
game.addScene(SCENES.POKEDEX, new Pokedex());

game.goToScene(SCENES.LEVEL1);

game.start(loader).then(
    () => {
      Sounds.music.loop = true;
      Sounds.music.play(0.25);
    }
);
