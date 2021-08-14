import Phaser from './lib/phaser.js'

import Level01 from './scenes/Level01.js'

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 1200,
    height: 580,
    scene: [
        Level01
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    }
});