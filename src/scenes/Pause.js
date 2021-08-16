import Phaser from '../lib/phaser.js';

export default class Pause extends Phaser.Scene {
    resumeButton

    constructor() {
        super("pause");
    }

    create() {
        this.resumeButton = this.add.image(1150, 50, 'resume-button');
        this.resumeButton.setInteractive();
        this.resumeButton.on('pointerover', ()=>{
            this.resumeButton.setTexture('resume-button-hover');
        });
        this.resumeButton.on('pointerdown', ()=>{
            this.resumeButton.setTexture('resume-button-click');
        });
        this.resumeButton.on('pointerup', ()=>{
            this.resumeButton.setTexture('resume-button');
            this.scene.bringToTop('play');
            this.scene.resume('play');
        });
        this.resumeButton.on('pointerout', ()=>{
            this.resumeButton.setTexture('resume-button');
        });
    }
}