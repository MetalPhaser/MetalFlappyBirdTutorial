import PipePrefab from '../prefabs/PipePrefab';
import MGU from '../utils/MGU';


class PipeGroupPrefab extends Phaser.Group {
	// keep this method in your prefab
	constructor(game) {
		super(game);

		this.ceilingPipe = null;
		this.floorPipe = null;
		this.pipeSpeed=200;

		this.pipeOffset =220;
		this.highestPipeY =-50;
		this.lowestPipeY =120;

		this.addPipes();
		this.setRandomHeight();
	}

	// keep this method in your prefab
	static preload (game) {
		if ( !game ) {
			throw new ReferenceError('Game reference was empty');
		}

	}
	addPipes() {
		//=========================Pipe==========================================================
		this.ceilingPipe = new PipePrefab(this.game, 0, -1 * this.pipeOffset);
		this.add(this.ceilingPipe);
		this.ceilingPipe.playCeiling();
		this.floorPipe = new PipePrefab(this.game, 0, this.pipeOffset);
		this.add(this.floorPipe);
		this.floorPipe.playFloor();
	}
	setRandomHeight() {
		this.y=MGU.random(this.lowestPipeY, this.highestPipeY);//-80 200 are the bounderies.



	}
	move(){
		this.ceilingPipe.x=this.game.world.width;
		this.ceilingPipe.body.velocity.x=-1 * Math.abs(this.pipeSpeed);
		this.floorPipe.x=this.game.world.width;
		this.floorPipe.body.velocity.x=-1 * Math.abs(this.pipeSpeed);

	}
}
export default PipeGroupPrefab;
