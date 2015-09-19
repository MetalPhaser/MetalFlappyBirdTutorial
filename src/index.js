import MenuState from './states/MenuState';

class BunnyGame extends Phaser.Game {

	constructor() {
		super(288, 505, Phaser.AUTO, 'content', null);
		this.state.add('MenuState', MenuState, false);
		this.state.start('MenuState');
	}
}

new BunnyGame();
