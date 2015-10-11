import PipePrefab from '../prefabs/PipePrefab';


class PipeGroupPrefab extends Phaser.Group {
	// keep this method in your prefab
	constructor(game) {
		super(game);

		this.ceilingPipe = null;
		this.floorPipe = null;


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
		this.ceilingPipe = new PipePrefab(this.game, 0, -200);
		this.add(this.ceilingPipe);
		this.ceilingPipe.playCeiling();
		this.floorPipe = new PipePrefab(this.game, 0, 200);
		this.add(this.floorPipe);
		this.floorPipe.playFloor();
	}
	setRandomHeight() {
		this.y=-90;//-80 200 are the bounderies.



	}

}
export default PipeGroupPrefab;
