import PipePrefab from '../prefabs/PipePrefab';


class PipeGroupPrefab extends Phaser.Group {
	// keep this method in your prefab
	constructor(game) {
		super(game);


		this.addPipes();
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

}
export default PipeGroupPrefab;
