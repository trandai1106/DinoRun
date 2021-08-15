import Phaser from '../lib/phaser.js';
import Cactus from '../game/Cactus.js';

export default class Preload extends Phaser.Scene {
    title
    progressBar
    processBarBorder
    progressText

    constructor() {
        super("preload");
    }

    preload() {
        // Title
        const style = { color: '#000000', fontSize: 50, fontFamily: 'monospace' };
        this.title = this.add.text(600, 140, 'DINO RUN', style)
            .setOrigin(0.5);
        this.progressText = this.add.text(600, 240, 'Loading 0%', style)
            .setOrigin(0.5);    
        
        // Loading bar
        this.progressBar = this.add.graphics({x: 300, y: 340});
        this.processBarBorder = this.add.graphics({x: 300, y: 340});
        this.processBarBorder.lineStyle(4, '0x000000', 1);
        this.processBarBorder.strokeRect(0, 0, 600, 30);

        // Load the background image
        this.load.image('bg', 'assets/sprites/environment/background/bg.png');

        // Load the platform
        this.load.image('platform', 'assets/sprites/environment/tiles/2.png');

        // Load objects
        this.load.image('cactus1', 'assets/sprites/environment/objects/Cactus(1).png')
        this.load.image('cactus2', 'assets/sprites/environment/objects/Cactus(2).png')
        this.load.image('cactus3', 'assets/sprites/environment/objects/Cactus(3).png')
        this.load.image('signpost', 'assets/sprites/environment/objects/SignArrow.png')
        this.load.image('grass1', 'assets/sprites/environment/objects/Grass(1).png')
        this.load.image('grass2', 'assets/sprites/environment/objects/Grass(2).png')

        // Load the dino sprite
        this.load.image('dino-idle1', 'assets/sprites/dino/Idle(1).png');
        this.load.image('dino-idle2', 'assets/sprites/dino/Idle(2).png');
        this.load.image('dino-idle3', 'assets/sprites/dino/Idle(3).png');
        this.load.image('dino-idle4', 'assets/sprites/dino/Idle(4).png');
        this.load.image('dino-idle5', 'assets/sprites/dino/Idle(5).png');
        this.load.image('dino-idle6', 'assets/sprites/dino/Idle(6).png');
        this.load.image('dino-idle7', 'assets/sprites/dino/Idle(7).png');
        this.load.image('dino-idle8', 'assets/sprites/dino/Idle(8).png');
        this.load.image('dino-idle9', 'assets/sprites/dino/Idle(9).png');
        this.load.image('dino-idle10', 'assets/sprites/dino/Idle(10).png');        
        this.load.image('dino-run1', 'assets/sprites/dino/Run(1).png'); 
        this.load.image('dino-run2', 'assets/sprites/dino/Run(2).png'); 
        this.load.image('dino-run3', 'assets/sprites/dino/Run(3).png'); 
        this.load.image('dino-run4', 'assets/sprites/dino/Run(4).png'); 
        this.load.image('dino-run5', 'assets/sprites/dino/Run(5).png'); 
        this.load.image('dino-run6', 'assets/sprites/dino/Run(6).png'); 
        this.load.image('dino-run7', 'assets/sprites/dino/Run(7).png'); 
        this.load.image('dino-run8', 'assets/sprites/dino/Run(8).png');
        this.load.image('dino-jump1', 'assets/sprites/dino/Jump(1).png');
        this.load.image('dino-jump2', 'assets/sprites/dino/Jump(2).png');
        this.load.image('dino-jump3', 'assets/sprites/dino/Jump(3).png');
        this.load.image('dino-jump4', 'assets/sprites/dino/Jump(4).png');
        this.load.image('dino-jump5', 'assets/sprites/dino/Jump(5).png');
        this.load.image('dino-jump6', 'assets/sprites/dino/Jump(6).png');
        this.load.image('dino-jump7', 'assets/sprites/dino/Jump(7).png');
        this.load.image('dino-jump8', 'assets/sprites/dino/Jump(8).png');
        this.load.image('dino-jump9', 'assets/sprites/dino/Jump(9).png');
        this.load.image('dino-jump10', 'assets/sprites/dino/Jump(10).png');
        this.load.image('dino-jump11', 'assets/sprites/dino/Jump(11).png');
        this.load.image('dino-jump12', 'assets/sprites/dino/Jump(12).png');
        this.load.image('dino-dead1', 'assets/sprites/dino/Dead(1).png');
        this.load.image('dino-dead2', 'assets/sprites/dino/Dead(2).png');
        this.load.image('dino-dead3', 'assets/sprites/dino/Dead(3).png');
        this.load.image('dino-dead4', 'assets/sprites/dino/Dead(4).png');
        this.load.image('dino-dead5', 'assets/sprites/dino/Dead(5).png');
        this.load.image('dino-dead6', 'assets/sprites/dino/Dead(6).png');
        this.load.image('dino-dead7', 'assets/sprites/dino/Dead(7).png');
        this.load.image('dino-dead8', 'assets/sprites/dino/Dead(8).png');
        
        // Sound effect
        this.load.audio('jump', 'assets/sounds/jump.wav');
        this.load.audio('lose', 'assets/sounds/lose.wav');

        // Loading statement
        this.load.on('progress', (val) => {
            // Text
            this.progressText.text = 'Loading ' + (Math.round(val * 100)) + '%';
            // Bar
            this.progressBar.clear();
            this.progressBar.fillStyle('0x444444', 1);
            this.progressBar.fillRect(0, 0, val * 600, 30);
        }, this);
    }

    create() {
        // Delay and change scene
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.start('play');
            },
            callbackScope: this
        });
    }
}