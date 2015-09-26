//import Config from '../config/game-config';
//import KeyboardUtils from '../utils/KeyboardUtils';
import BirdPrefab from '../prefabs/BirdPrefab';
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
		this.game.load.image('background', 'images/background.png');
		this.game.load.image('grounds', 'images/ground.png');
		this.game.load.image('title', 'images/title.png');
		BirdPrefab.preload(this.game);
		this.game.load.image('BoBo', 'images/start-button.png');
	}




	create() {
		//=========================Background===================================================
		this.backgroundSprite = this.game.add.sprite(0,0, 'background');
		//=========================Ground=======================================================
		this.ground 		= this.game.add.tileSprite(0,0,335,112, 'grounds');
		this.ground.y 		= this.game.world.height - this.ground.height;
		this.ground.autoScroll(-200,0);
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

		this.startButton = this.game.add.button(100,250, 'BoBo',this.boBoClick,this);
		this.startButton.anchor.setTo(0.5,0.5);
		this.startButton.x=this.game.world.width/2;
	}
	boBoClick(){
		console.log("My name BoBo not crazy");
		var bWHalf =this.startButton.width/2;
		var bHHalf =this.startButton.height/2;
		this.startButton.x=this.game.rnd.integerInRange(bWHalf, this.game.world.width-bWHalf);
		this.startButton.y=this.game.rnd.integerInRange(bHHalf, this.game.world.height-bHHalf);
		;


	}
	shutdown() {
		//this.game.input.keyboard.onDownCallback = null;
	}

	update() {}
	handleKeypress(/*keyboardEvent*/) {}

}
export default State;