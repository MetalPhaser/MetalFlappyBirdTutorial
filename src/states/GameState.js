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
		this.backgroundSprite = null;
		this.ground = null;
		this.bird = null;
		this.ceilingPipe=null;
		this.floorPipe = null;
		console.log( "GameState : I is HERE");
		this.flapKey=null;
		this.pipeView=null;

	}


	preload() {
		//this.game.stage.backgroundColor      = Config.stage.backgroundColor;
		GroundPrefab.preload(this.game);
		BackgroundPrefab.preload(this.game);
		BirdPrefab.preload(this.game);
		PipePrefab.preload(this.game);
		this.flapKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.flapKey.onDown.add(this.flap, this);
		//mouse
		this.game.input.onDown.add(this.flap, this);
		//keep key
		this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
	}

	create() {
		console.log("frtdhCOG3CQGY");
		//=========================Background===================================================
		this.backgroundSprite = new BackgroundPrefab(this.game, 0,0);
		this.game.add.existing(this.backgroundSprite);
		this.pipeView = this.game.add.group();
		//=========================Ground=======================================================
		this.ground = new GroundPrefab(this.game, 0,0);
		this.ground.y 		= this.game.world.height - this.ground.height;
		this.game.add.existing(this.ground);
		//this.game.input.keyboard.onDownCallback = this.handleKeypress.bind(this);
		//=========================Bird==========================================================
		this.bird = new BirdPrefab(this.game, this.game.world.width/2,200);
		this.game.add.existing(this.bird);
		this.bird.body.gravity.y=Config.physics.gravityY;
		this.startPipeGenerator();
	}
	startPipeGenerator(){
		this.pipeGenerator=this.game.time.events.loop(Phaser.Timer.SECOND * 2.25, this.generatePipes, this);
		this.pipeGenerator.timer.start();
	}
	generatePipes() {

		var pipeGroup = new PipeGroupPrefab(this.game);
		this.pipeView.add(pipeGroup);
		pipeGroup.x = this.game.world.width;
		this.game.add.tween(pipeGroup).to({x: -70}, 3000).start();

	}
	shutdown() {
		this.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
	}

	update() {
		this.game.physics.arcade.collide(this.bird, this.ground);
	}
	handleKeypress(/*keyboardEvent*/) {}
	flap(){
		this.bird.flap();


	}
}
export default State;
//if the bird hits ground bring to dot menu state.