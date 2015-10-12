import Config from '../config/game-config';
//import KeyboardUtils from '../utils/KeyboardUtils';
import BirdPrefab from '../prefabs/BirdPrefab';
import PipeGroupPrefab from '../prefabs/PipeGroupPrefab';
import PipePrefab from '../prefabs/PipePrefab';
import GroundPrefab from '../prefabs/GroundPrefab';
import BackgroundPrefab from '../prefabs/BackgroundPrefab';

class State extends Phaser.State {

	constructor() {
		super();

		this.pipeSpeed              = 200;

		this.backgroundSprite       = null;
		this.ground                 = null;
		this.bird                   = null;
		this.flapKey                = null;
		this.pipeGenerator          = null;
		this.pipeView               = null;

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
		PipeGroupPrefab.preload(this.game);
		GroundPrefab.preload(this.game);
		BackgroundPrefab.preload(this.game);

	}

	create() {
		// BACKGROUND
		this.backgroundSprite = new BackgroundPrefab(this.game, 0, 0);
		this.game.add.existing(this.backgroundSprite);

		// ADD A VIEW TO HOLD ALL PIPES
		this.pipeView = this.game.add.group();

		// GROUND
		this.ground = new GroundPrefab(this.game, 0, 0);
		this.ground.y = this.game.world.height - this.ground.height;
		this.game.add.existing(this.ground);

		// BIRD
		this.bird = new BirdPrefab(this.game, this.game.world.width/2, 200);
		this.game.add.existing(this.bird);
		this.bird.body.gravity.y    = Config.physics.gravityY;

		// START TIMER TO CREATE PIPES-A-FLOW'N
		this.startPipeGenerator();

	}
	startPipeGenerator () {
		this.pipeGenerator      = this.game.time.events.loop(Phaser.Timer.SECOND * 2.25, this.generatePipes, this);
		this.pipeGenerator.timer.start();
	}
	generatePipes() {
		var pipeGroup           = new PipeGroupPrefab(this.game);
		this.pipeView.add(pipeGroup);

		pipeGroup.forEachAlive(function (item) {
			item.x                = this.game.world.width;
			item.body.velocity.x  = -1 * Math.abs(this.pipeSpeed);
		}.bind(this));
	}

	flap() {
		this.bird.flap();
	}

	shutdown() {
		this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
	}

	update() {

		this.pipeView.forEachAlive(function (item) {
			this.game.physics.arcade.collide(this.bird, item, this.hitAPipe, this.isCollisionASuccess, this);
		}.bind(this));

		this.game.physics.arcade.collide(this.bird, this.ground);
	}

	hitAPipe() {
		console.log('we hit a pipe!');
	}
	isCollisionASuccess(/*obj1, obj2*/) {
		return true;
	}
	handleKeypress(/*keyboardEvent*/) {}



	renderHOLD() {
		super.render();

		this.pipeView.forEachAlive(this.renderItem, this);

		this.renderItem(this.bird);

		this.game.debug.bodyInfo(this.bird, 32, 32);

	}

	renderItem(item) {
		this.game.debug.body(item, 'rgba(255, 0, 0, 0.3)');
	}
}
export default State;
