
let KeyboardUtils = {

	arrowKeys         : [ Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT],
	numpadArrowKeys   : [ Phaser.Keyboard.NUMPAD_2, Phaser.Keyboard.NUMPAD_4, Phaser.Keyboard.NUMPAD_6, Phaser.Keyboard.NUMPAD_8],
	WASDKeys          : [ Phaser.Keyboard.W, Phaser.Keyboard.A, Phaser.Keyboard.S, Phaser.Keyboard.D ],
	numberKeys        : [ Phaser.Keyboard.ZERO, Phaser.Keyboard.ONE, Phaser.Keyboard.TWO, Phaser.Keyboard.THREE,
													Phaser.Keyboard.FOUR, Phaser.Keyboard.FIVE, Phaser.Keyboard.SIX, Phaser.Keyboard.SEVEN,
													Phaser.Keyboard.EIGHT, Phaser.Keyboard.NINE,
													Phaser.Keyboard.NUMPAD_0, Phaser.Keyboard.NUMPAD_1, Phaser.Keyboard.NUMPAD_2, Phaser.Keyboard.NUMPAD_3,
													Phaser.Keyboard.NUMPAD_4, Phaser.Keyboard.NUMPAD_5, Phaser.Keyboard.NUMPAD_6, Phaser.Keyboard.NUMPAD_7,
													Phaser.Keyboard.NUMPAD_8, Phaser.Keyboard.NUMPAD_9 ],

	isArrowKey        : function (code=-1) {
		return KeyboardUtils.moveKeys.indexOf(code) > -1;
	},
	isNumpadArrowKey  : function (code=-1) {
		return KeyboardUtils.numpadArrowKeys.indexOf(code) > -1;
	},
	isWASDKey         : function (code=-1) {
		return KeyboardUtils.WASDKeys.indexOf(code);
	},
	isNumberKey       : function (code=-1) {
		return KeyboardUtils.numberKeys.indexOf(code) > -1;
	},
	getStringValue    : function (code=-1) {
		return String.fromCharCode(code) || null;
	}

};
export default KeyboardUtils;