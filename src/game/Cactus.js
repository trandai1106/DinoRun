import Phaser from '../lib/phaser.js'

export default class Cactus extends Phaser.Physics.Arcade.Image {
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
    */
    constructor(scene, x, y, key) {
       super(scene, x, y, key);
       this.setOrigin(0.5, 1);
    }
   
}