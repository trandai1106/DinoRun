import Phaser from './lib/phaser.js';

import Preload from './scenes/Preload.js';
import Play from './scenes/Play.js';

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 1200,
    height: 580,
    backgroundColor: '#f4cca1',
    scene: [
        Preload,
        Play
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