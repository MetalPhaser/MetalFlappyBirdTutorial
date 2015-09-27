import Config from '../config/game-config';
import KeyboardUtils from '../utils/KeyboardUtils';
import GroundPrefab from '../prefabs/GroundPrefab';
import BackgroundPrefab from '../prefabs/BackgroundPrefab';
import BirdPrefab from '../prefabs/BirdPrefab';


class State extends Phaser.State {

	constructor() {
		super();
		console.log('GameState: I am here');

		this.background = null;
		this.bird = null;
		this.ground = null;
		this.flapKey = null;


	}

	preload() {

		GroundPrefab.preload(this.game);
		BackgroundPrefab.preload(this.game);
		BirdPrefab.preload(this.game);

		this.flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.flapKey.onDown.add(this.flap, this);

		// CLICK HANDLER
		this.game.input.onDown.add(this.flap, this);

		// keep the spacebar from propagating up to the browser
		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

		//this.game.stage.backgroundColor      = Config.stage.backgroundColor;
	}

	create() {
		console.log('GameState.create(): I am here');

		// BACKGROUND
		this.background = new BackgroundPrefab(this.game, 0,0);
		this.game.add.existing(this.background);

		// GROUND
		this.ground = new GroundPrefab(this.game, 0, 0);
		this.ground.y =this.game.world.height - this.ground.height;
		this.game.add.existing(this.ground);

		// BIRD
		this.bird = new BirdPrefab(this.game, 205, 5);
		//this.bird.anchor.setTo(0.5, 0.5);
		this.bird.x = this.game.world.width/2;
		this.bird.y = this.game.world.height/2;
		this.game.add.existing(this.bird);
		this.bird.body.gravity.y = Config.physics.gravityY;

		//this.game.input.keyboard.onDownCallback = this.handleKeypress.bind(this);
	}

	shutdown() {
		//no longer listening to the spacebar key
		this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
	}

	update() {
		this.game.physics.arcade.collide(this.bird, this.ground);
	}

	handleKeypress(/*keyboardEvent*/) {}

	flap() {
		console.log("flap");
		this.bird.flap();
	}

}
export default State;