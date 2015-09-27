import Base from "../utils/BaseSprite";
let SPRITEKEY = 'ground';
let IMAGEPATH = 'images/ground.png';


class GroundPrefab extends Phaser.TileSprite {
	// keep this method in your prefab
	constructor(game, x, y) {
		super(game, x, y, 335, 112, SPRITEKEY);

		this.defineGeometry();
		this.definePhysics();
		this.defineAnimations();
	}
	// keep this method in your prefab
	static preload (game) {
		if ( !game ) {
			throw new ReferenceError('Game reference was empty');
		}

		game.load.image(SPRITEKEY, IMAGEPATH);
	}

	// these are optional
	defineGeometry() {
		this.autoScroll(-200,0);
	}
	definePhysics() {
		/**
		 *  Enable Physics
		 *  This is needed for collision detection
		 */
		this.game.physics.arcade.enableBody(this);

		/**
		 *  Collide with World
		 *  To make this prefab collide automatically
		 *  with the world bounds enable this
		 */
		//this.body.collideWorldBounds = true;

		/**
		 *  Unaffected by Gravity
		 *  Marking 'allowGravity' as false gives you
		 *  a prefab that does not respond to gravity
		 */
		//this.body.allowGravity = false;

		/**
		 *  Make Immovable
		 *  If you need your prefab to remain in place
		 *  until you move it yourself, this is your item
		 */
		this.body.immovable = true;

		/**
		 *  Bounciness
		 *  If you want to define a specific rebound
		 *  value for this prefab, this is the place
		 */
		//this.body.bounce.x     = 10;
		//this.body.bounce.y     = 10;

	}
	defineAnimations() {
		/**
		 *  Animations
		 *  This is needed for collision detection
		 */
		this.animations.add('flap');
		this.playFlap();
	}
	playFlap() {
		this.animations.play('flap', 12, true);
	}
	update() {}

	// these you do NOT need in your prefab
	static get key () {
		return SPRITEKEY;
	}
}
export default GroundPrefab;