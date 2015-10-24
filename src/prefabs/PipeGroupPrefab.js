import PipePrefab from '../prefabs/PipePrefab';
import MGU from '../utils/MGU';

class Prefab extends Phaser.Group {
	constructor(game) {
		super(game);

		this.floorPipe      = null;
		this.ceilingPipe    = null;

		this.pipeOffset     = 220;
		this.highestPipeY   = -50;
		this.lowestPipeY    = 120;

		this.pipeSpeed      = 200;

		this.addPipes();
		this.setRandomHeight();
	}
	static preload (game) {
		if ( !game ) {
			throw new ReferenceError('Game reference was empty');
		}
		PipePrefab.preload(game);
	}
	addPipes() {
		this.ceilingPipe = new PipePrefab(this.game, 0, -1 * this.pipeOffset);
		this.add(this.ceilingPipe);
		this.ceilingPipe.playCeiling();

		this.floorPipe = new PipePrefab(this.game, 0, this.pipeOffset);
		this.add(this.floorPipe);
		this.floorPipe.playFloor();
	}
	setRandomHeight() {
		this.y = MGU.random(this.lowestPipeY, this.highestPipeY);
	}

	//update() {
	//
	//}

	move() {
		this.floorPipe.x                = this.game.world.width;
		this.floorPipe.body.velocity.x  = -1 * Math.abs(this.pipeSpeed);

		this.ceilingPipe.x                = this.game.world.width;
		this.ceilingPipe.body.velocity.x  = -1 * Math.abs(this.pipeSpeed);


	}
	movePipe(pipeSprite) {
		pipeSprite.x                = this.game.world.width;
		pipeSprite.body.velocity.x  = -1 * Math.abs(this.pipeSpeed);
	}

}
export default Prefab;