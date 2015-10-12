let SPRITEKEY = 'pipeSprite';
let IMAGEPATH = 'images/pipes.png';

class Prefab extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, SPRITEKEY);

		console.log('constructed');

		this.game.physics.arcade.enableBody(this);
		//this.game.physics.ninja.enableBody(this);
		this.body.immovable = true;
		console.log('you have a pipe dude', this.body);

	}
	// keep this method in your prefab
	static preload (game) {
		game.load.image(SPRITEKEY, IMAGEPATH);
		console.log('preloaded');
	}
}
export default Prefab;