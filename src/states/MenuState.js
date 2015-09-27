//import Config from '../config/game-config';
//import KeyboardUtils from '../utils/KeyboardUtils';
import BirdPrefab from '../prefabs/BirdPrefab';
import GroundPrefab from '../prefabs/GroundPrefab';
import BackgroundPrefab from '../prefabs/BackgroundPrefab';

class State extends Phaser.State {

	constructor() {
		super();
		console.log('MenuState : I is HERE');

		this.backgroundSprite       = null;
		this.bird                   = null;
		this.ground                 = null;
		this.title                  = null;
		this.titleGroup             = null;
		this.startButton            = null;
	}

	preload() {

		this.game.load.image('title',         'images/title.png');
		this.game.load.image('startButton',   'images/start-button.png');

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
		this.bird = new BirdPrefab(this.game, 205, 5);
		this.game.add.existing(this.bird);

		// TITLE
		this.title = this.game.add.sprite(0,0, 'title');

		// TITLE GROUP
		this.titleGroup = this.game.add.group();
		this.titleGroup.add(this.title);
		this.titleGroup.add(this.bird);
		this.titleGroup.x = 30;
		this.titleGroup.y = 100;
		this.game.add.tween(this.titleGroup).to({y:115}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);


		// START BUTTON
		this.startButton = this.game.add.button(this.game.world.width/2, 300, 'startButton', this.startClick, this);
		this.startButton.anchor.setTo(0.5,0.5);

	}

	startClick() {
		console.log('yo. stop');
		this.game.state.start('GameState');
	}

	shutdown() {}

	update() {}
}
export default State;