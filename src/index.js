import MenuState from './states/MenuState';
import GameState from './states/GameState';
import HitState from './states/HitState';

class BunnyGame extends Phaser.Game {

	constructor() {
		super(288, 505, Phaser.AUTO, 'content', null);

		//this.state.add('MenuState', MenuState, false);
		//this.state.start('MenuState');

		this.state.add('GameState', GameState, false);
		this.state.start('GameState');

		//this.state.add('HitState', HitState, false);
		//this.state.start('HitState');

	}
}

new BunnyGame();
