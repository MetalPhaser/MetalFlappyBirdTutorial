import PipePrefab from '../prefabs/PipePrefab';
import MGU from '../utils/MGU';

class Prefab extends Phaser.Group {
	constructor(game) {
		super(game);

		this.floorPipe      = null;
		this.ceilingPipe    = null;

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
		this.ceilingPipe = new PipePrefab(this.game, 0, -200);
		this.add(this.ceilingPipe);
		this.ceilingPipe.playCeiling();

		this.floorPipe = new PipePrefab(this.game, 0, 200);
		this.add(this.floorPipe);
		this.floorPipe.playFloor();
	}
	setRandomHeight() {
		this.y = MGU.random(-100, 100);
	}
}
export default Prefab;