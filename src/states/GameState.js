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
		console.log('GameState : constructor');

		this.backgroundSprite       = null;
		this.ground                 = null;
		this.bird                   = null;
		this.flapKey                = null;
		this.pipeGenerator          = null;
		this.pipeView               = null;

		this.pipeGroups             = [];

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


		//var pipe = new PipePrefab(this.game, 600, 170);
		//this.game.add.existing(pipe);
		//this.game.add.tween(pipe).to({x:-70}, 3000).start();
		//this.lastPipes = pipe;
		//
		//this.bird2 = new BirdPrefab(this.game, 300, 200);
		//this.game.add.existing(this.bird2);
		////this.bird2.body.gravity.y    = Config.physics.gravityY;
		//this.game.add.tween(this.bird2).to({x:-70}, 5000).start();

	}
	startPipeGenerator () {
		this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2.25, this.generatePipes, this);
		this.pipeGenerator.timer.start();
	}
	generatePipes() {
		var pipeGroup = new PipeGroupPrefab(this.game);
		this.pipeView.add(pipeGroup);
		pipeGroup.x = this.game.world.width;
		this.game.add.tween(pipeGroup).to({x:-70}, 3000).start();

		//this.game.physics.enable(pipeGroup);
		//this.game.physics.arcade.enableBody(pipeGroup);

		this.pipeGroups.push(pipeGroup);

	}

	flap() {
		this.bird.flap();
	}

	shutdown() {
		this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
	}

	update() {
		this.game.physics.arcade.collide(this.bird, this.ground);

		for ( var i = 0, length = this.pipeGroups.length; i < length; ++i ) {
			this.game.physics.arcade.collide(this.bird, this.pipeGroups[i], this.hitAPipe, null, this);
		}

	}

	hitAPipe() {
		console.log('we hit a pipe!');
	}
	handleKeypress(/*keyboardEvent*/) {}



	//render() {
	//	super.render();
	//
	//	for ( var i = 0, length = this.pipeGroups.length; i < length; ++i ) {
	//		this.pipeGroups[i].forEachAlive(this.renderItem, this);
	//
	//		//this.game.debug.body(this.pipeGroups[i], 'rgba(255, 0, 0, 0.9)');
	//		//console.log('rending', this.pipeGroups[i].body);
	//	}
	//
	//	this.renderItem(this.bird);
	//
	//}
	//
	//renderItem(item) {
	//	this.game.debug.body(item, 'rgba(255, 0, 0, 0.3)');
	//}
}
export default State;
