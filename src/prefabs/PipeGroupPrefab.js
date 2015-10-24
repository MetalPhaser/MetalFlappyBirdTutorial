import PipePrefab from '../prefabs/PipePrefab';
import MGU from '../utils/MGU';

class PipeGroupPrefab extends Phaser.Group {
	// keep this method in your prefab
	constructor(game) {
		super(game);

		this.floorPipe = null;
		this.ceilingPipe = null;

		// PLACE PIPE UPPER AND LOWER LIMITS
		this.pipeOffsetCeiling = -200;
		this.pipeOffsetFloor = 300;
		this.highestPipeY = -90;
		this.lowestPipeY = 60;

		this.pipeSpeed = 70;

		this.addPipes();
		this.setRandomHeight();
	}

	// keep this method in your prefab
	static preload (game) {
		if ( !game ) {
			throw new ReferenceError('Game reference was empty');
		}
		PipePrefab.preload(this.game);
	}

	addPipes() {
		// PIPES
		this.ceilingPipe = new PipePrefab(this.game, 0, this.pipeOffsetCeiling);
		this.add(this.ceilingPipe);
		this.ceilingPipe.playCeiling();

		this.floorPipe = new PipePrefab(this.game, 0, this.pipeOffsetFloor);
		this.add(this.floorPipe);
		this.floorPipe.playFloor();

	}

	move(){
		this.ceilingPipe.x = this.game.world.width;
		this.floorPipe.x = this.game.world.width;
		this.ceilingPipe.body.velocity.x = -1 * Math.abs(this.pipeSpeed);
		this.floorPipe.body.velocity.x = -1 * Math.abs(this.pipeSpeed);
	}

	setRandomHeight(){
		console.log("Setting random height");
		//this.y = 60;
		this.y = MGU.random(this.highestPipeY, this.lowestPipeY); //-90, 60, valid range

	}

}
export default PipeGroupPrefab;