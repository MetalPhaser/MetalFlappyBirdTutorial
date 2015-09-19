//import Config from '../config/game-config';
//import KeyboardUtils from '../utils/KeyboardUtils';
import BirdPrefab from '../prefabs/BirdPrefab';

class State extends Phaser.State {

	constructor() {
		super();
		console.log('MenuState: I am HERE');
		this.backgroundSprite = null;
		this.bird = null;
	}

	preload() {
		this.game.load.image('background', 'images/background.png');
        BirdPrefab.preload(this.game);
	}

	create() {
		this.backgroundSprite = this.game.add.sprite(0, 0, 'background');
        this.bird = new BirdPrefab(this.game, 50, 20);
        this.game.add.existing(this.bird);
	}

	shutdown() {
		//this.game.input.keyboard.onDownCallback = null;
	}

	update() {}

	handleKeypress(/*keyboardEvent*/) {}

}
export default State;