//import Config from '../config/game-config';
//import KeyboardUtils from '../utils/KeyboardUtils';
import BirdPrefab from '../prefabs/BirdPrefab';
import GroundPrefab from '../prefabs/GroundPrefab';
import BackgroundPrefab from '../prefabs/BackgroundPrefab';
class State extends Phaser.State {

	constructor() {
		super();
		console.log("MenuState : I is HERE");

		this.backgroundSprite = null;
		this.bird = null;
		this.ground=null;
		this.titleGroup =null;
		this.title=null;
		this.startButton=null;

	}

	preload() {
		this.game.load.image('title', 'images/title.png');
		BirdPrefab.preload(this.game);
		GroundPrefab.preload(this.game);
		BackgroundPrefab.preload(this.game);
		this.game.load.image('startButton', 'images/start-button.png');
	}




	create() {
		//=========================Background===================================================
		this.backgroundSprite = new BackgroundPrefab(this.game, 0,0);
		this.game.add.existing(this.backgroundSprite);
		//=========================Ground=======================================================
		this.ground = new GroundPrefab(this.game, 0,0);
		this.ground.y 		= this.game.world.height - this.ground.height;
		this.game.add.existing(this.ground);
		//=========================Bird==========================================================
		this.bird = new BirdPrefab(this.game, 205,5);
		this.game.add.existing(this.bird);
		//=========================Title=========================================================
		this.title=this.game.add.sprite(0,0,"title");
		//=========================TitleGroup====================================================
		this.titleGroup=this.game.add.group();
		this.titleGroup.add(this.title);
		this.titleGroup.add(this.bird);
		this.titleGroup.x=30;
		this.titleGroup.y=100;
		this.game.add.tween(this.titleGroup).to({y:115}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
		//=========================Start Button===================================================

		this.startButton = this.game.add.button(100,250, 'startButton',this.startClick,this);
		this.startButton.anchor.setTo(0.5,0.5);
		this.startButton.x=this.game.world.width/2;
	}
	startClick(){
		//console.log("My name BoBo not crazy");
		//var bWHalf =this.startButton.width/2;
		//var bHHalf =this.startButton.height/2;
		//this.startButton.x=this.game.rnd.integerInRange(bWHalf, this.game.world.width-bWHalf);
		//this.startButton.y=this.game.rnd.integerInRange(bHHalf, this.game.world.height-bHHalf);
		this.game.state.start('GameState');
		;


	}
	shutdown() {
		this.game.input.keyboard.onDownCallback = null;
	}

    update() {}
    handleKeypress(/*keyboardEvent*/) {}

}
export default State;