import Config from '../config/game-config';
import KeyboardUtils from '../utils/KeyboardUtils';
import GroundPrefab from '../prefabs/GroundPrefab';
import BackgroundPrefab from '../prefabs/BackgroundPrefab';
import BirdPrefab from '../prefabs/BirdPrefab';
import PipePrefab from '../prefabs/PipePrefab';
import PipeGroupPrefab from '../prefabs/PipeGroupPrefab';


class State extends Phaser.State {

	constructor() {
		super();
		console.log('GameState: I am here');

		this.background = null;
		this.bird = null;
		this.ground = null;
		this.flapKey = null;
		this.ceilingPipe = null;
		this.floorPipe = null;
		this.pipeView = null;
		this.pipeGenerator = null;

	}

	preload() {

		GroundPrefab.preload(this.game);
		BackgroundPrefab.preload(this.game);
		BirdPrefab.preload(this.game);
		PipePrefab.preload(this.game);

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

		// PIPE VIEW
		this.pipeView = this.game.add.group();


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

		this.startPipeGenerator();

		//this.game.input.keyboard.onDownCallback = this.handleKeypress.bind(this);
	}

		startPipeGenerator() {
			this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2.25, this.generatePipes, this);
			this.pipeGenerator.timer.start();
		}

		// This method will generate the pipes we need to scroll across the screen
		generatePipes() {
			var pipeGroup = new PipeGroupPrefab(this.game);
			this.pipeView.add(pipeGroup);
			pipeGroup.x = this.game.world.width;
			this.game.add.tween(pipeGroup).to({x:-70}, 3000).start();
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