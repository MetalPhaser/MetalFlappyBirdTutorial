//import Config from '../config/game-config';
//import KeyboardUtils from '../utils/KeyboardUtils';
import BirdPrefab from '../prefabs/BirdPrefab';

class State extends Phaser.State {

	constructor() {
		super();
		console.log('MenuState : I is HERE');

		this.backgroundSprite = null;
		this.bird = null;
	}

	preload() {
		this.game.load.image('background', 'images/background.png');
		BirdPrefab.preload(this.game);
	}

	create() {
		this.backgroundSprite = this.game.add.sprite(0, 0, 'background');


		this.bird = new BirdPrefab(this.game, this.game.world.width/2, 150);
		this.game.add.existing(this.bird);
	}

	shutdown() {}

	update() {}
}
export default State;