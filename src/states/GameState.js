import Config from '../config/game-config';
//import KeyboardUtils from '../utils/KeyboardUtils';
import BirdPrefab from '../prefabs/BirdPrefab';
import GroundPrefab from '../prefabs/GroundPrefab';
import BackgroundPrefab from '../prefabs/BackgroundPrefab';

class State extends Phaser.State {

	constructor() {
		super();
		console.log('GameState : constructor');

		this.backgroundSprite       = null;
		this.ground                 = null;
		this.bird                   = null;

		this.flapKey                = null;
	}

	preload() {

		this.flapKey                = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.flapKey.onDown.add(this.flap, this);

		// CLICK HANDLER
		this.game.input.onDown.add(this.flap, this);

		// keep the spacebar from propogating up to the browser
		this.game.input.keyboard.addKeyCapture( [Phaser.Keyboard.SPACEBAR] );

		console.log('GameState : preload ');
		//this.game.stage.backgroundColor      = Config.stage.backgroundColor;
		BirdPrefab.preload(this.game);
		GroundPrefab.preload(this.game);
		BackgroundPrefab.preload(this.game);

	}

	create() {
		// BACKGROUND
		this.backgroundSprite = new BackgroundPrefab(this.game, 0, 0);
		this.game.add.existing(this.backgroundSprite);

		// GROUND
		this.ground = new GroundPrefab(this.game, 0, 0);
		this.ground.y = this.game.world.height - this.ground.height;
		this.game.add.existing(this.ground);

		// BIRD
		this.bird = new BirdPrefab(this.game, this.game.world.width/2, 200);
		this.game.add.existing(this.bird);
		this.bird.body.gravity.y    = Config.physics.gravityY;

		//this.game.input.keyboard.onDownCallback = this.handleKeypress.bind(this);
	}

	flap() {
		this.bird.flap();
	}

	shutdown() {
		this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
	}

	update() {
		this.game.physics.arcade.collide(this.bird, this.ground);
	}

	handleKeypress(/*keyboardEvent*/) {}

}
export default State;
