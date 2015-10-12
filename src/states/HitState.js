import Config from '../config/game-config';
import BirdPrefab from '../prefabs/BirdPrefab';
import PipePrefab from '../prefabs/PipePrefab';
import PipeTESTPrefab from '../prefabs/PipeTESTPrefab';

class State extends Phaser.State {

	constructor() {
		super();
		this.pipe                   = null;
		this.bird                   = null;
		this.flapKey                = null;
	}

	preload() {

		this.flapKey                = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.flapKey.onDown.add(this.flap, this);

		// CLICK HANDLER
		this.game.input.onDown.add(this.flap, this);

		// keep the spacebar from propogating up to the browser
		this.game.input.keyboard.addKeyCapture( [Phaser.Keyboard.SPACEBAR] );

		BirdPrefab.preload(this.game);
		PipeTESTPrefab.preload(this.game);
	}

	create() {

		// BIRD
		this.bird                   = new BirdPrefab(this.game, this.game.world.width/2, 200);
		this.game.add.existing(this.bird);
		this.bird.body.gravity.y    = Config.physics.gravityY;

		this.pipe                   = new PipeTESTPrefab(this.game, 0, 0);
		this.game.add.existing(this.pipe);
		//this.pipe.anchor.setTo(0.5, 0.5);
		this.pipe.x = 100;
		this.pipe.y = 450;
		//this.pipe.body.x = 100;
		//this.pipe.body.y = 450;
		//this.pipe.body.angle             = -90;

		this.pipe.angle             = -90;
		this.pipe.body.angle             = -90;

		console.log('this.pipe.body', this.pipe.body);


	}

	render() {
		super.render();
		this.game.debug.body(this.bird, 'rgba(255, 255, 255, 0.5)');
		this.game.debug.body(this.pipe, 'rgba(255, 255, 255, 0.5)');
	}
	flap() {
		this.bird.flap();
	}

	shutdown() {
		this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
	}

	update() {
		this.game.physics.arcade.collide(this.bird, this.pipe, this.collided, null, this);

	}
	collided() {
		console.log('collided', arguments);
	}

}
export default State;
