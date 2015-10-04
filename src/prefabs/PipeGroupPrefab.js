import PipePrefab from '../prefabs/PipePrefab';

class PipeGroupPrefab extends Phaser.Group {
	// keep this method in your prefab
	constructor(game) {
		super(game);

		this.floorPipe = null;
		this.ceilingPipe = null;

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
		this.ceilingPipe = new PipePrefab(this.game, 0, -200);
		this.add(this.ceilingPipe);
		this.ceilingPipe.playCeiling();
		this.floorPipe = new PipePrefab(this.game, 0, 300);
		this.add(this.floorPipe);
		this.floorPipe.playFloor();

	}

	setRandomHeight(){

	}

}
export default PipeGroupPrefab;