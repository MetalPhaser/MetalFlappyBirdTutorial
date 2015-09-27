import MenuState from './states/MenuState';
import GameState from './states/GameState';

class Game extends Phaser.Game {

	constructor() {
		super(288, 505, Phaser.AUTO, 'content', null);
		this.state.add('MenuState', MenuState, false);
		this.state.add('GameState', GameState, false);
		//this.state.start('MenuState');
		this.state.start('GameState');
	}
}

new Game();
