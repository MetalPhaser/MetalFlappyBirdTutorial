//import Config from '../config/game-config';
//import KeyboardUtils from '../utils/KeyboardUtils';
import BirdPrefab from '../prefabs/BirdPrefab';

class State extends Phaser.State {

	constructor() {
		super();
		console.log('MenuState: I am HERE');
		this.backgroundSprite = null;
		this.bird = null;
		this.ground = null;
		this.title = null;
		this.titleGroup = null;
		this.startButton = null;
	}

	preload() {
		this.game.load.image('background', 'images/background.png');
		this.game.load.image('ground', 'images/ground.png');
		this.game.load.image('title', 'images/title.png');
		this.game.load.image('startButton', 'images/start-button.png');
		//this.game.load.image('titleGroup', 'images/titleGroup.png');

		BirdPrefab.preload(this.game);
	}

	create() {
		// BACKGROUND
		this.backgroundSprite = this.game.add.sprite(0, 0, 'background');

		// GROUND

		this.ground = this.game.add.tileSprite(0, 0, 335, 112, 'ground');
		this.ground.y =this.game.world.height - this.ground.height;
		this.ground.autoScroll(-100, 0);

		// BIRD
		this.bird = new BirdPrefab(this.game, 205, 5);
        this.game.add.existing(this.bird);

		// TITLE
		this.title = this.game.add.sprite(0, 0, 'title');

		// TITLE GROUP
		this.titleGroup = this.game.add.group();
		this.titleGroup.add(this.title);
		this.titleGroup.add(this.bird);

		this.titleGroup.x = 30;
		this.titleGroup.y = 100;
		this.game.add.tween(this.titleGroup).to({y:115}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

		// START BUTTON
		this.startButton = this.game.add.button(100, 200, 'startButton', this.startClick, this);
		this.startButton.anchor.setTo(0.5, 0.5);
		this.startButton.x = this.game.world.width/2;
		this.startButton.y = this.game.world.height/2;

	}

	startClick() {
		console.log('ouch');

		// we want to know what half the button width and height is so we don't spill off the edge of the screen
		var halfButtonWidth = this.startButton.width; // x variable
		var halfButtonHeight = this.startButton.height; // y variable

		this.startButton.x = this.game.rnd.integerInRange(halfButtonWidth, this.game.world.width-halfButtonWidth);
		this.startButton.y = this.game.rnd.integerInRange(halfButtonHeight, this.game.world.height-halfButtonHeight);

	}

	shutdown() {
		//this.game.input.keyboard.onDownCallback = null;
	}

	update() {}

	handleKeypress(/*keyboardEvent*/) {}

}
export default State;