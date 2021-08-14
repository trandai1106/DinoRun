import Phaser from '../lib/phaser.js';
import Cactus from '../game/Cactus.js'

const DINO_SCALE = 0.32;
const DINO_RUN_SPEED_MIN = 260;
const DINO_RUN_SPEED_MAX = 400;
const DINO_RUN_SPEED_GAIN = 0.04;
const DINO_JUMP_SPEED = 450;
const DINO_GRAVITY = 500;

export default class Level01 extends Phaser.Scene {
    bg
    platform
    platformCollider
    cactuses
    score
    scoreText
    replayText
    guideText
    isTransparencyText
    player
    speed
    playerState // 0: idle, 1: run infinitely, 2: jump, 3: dead, 4: dead and slide on platform,
                // -1: game over and stop
    cursors
    music

    constructor() {
        super("level01");
    }
    
    init() {
        this.score = 0;
        this.playerState = 0;
        this.speed = DINO_RUN_SPEED_MIN;
        this.replayText = null;
        this.guideText = null;
        this.isTransparencyText = true;
    }

    preload() {
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
    }

    create() {
        // Create background
        this.bg = this.add.tileSprite(0, 0, 1200, 580, 'bg');
        this.bg.setOrigin(0, 0).setScrollFactor(0);
        
        // Platform physic collider
        this.platformCollider = this.physics.add.image(0, 580, 'platform').setScale(10, 1).setOrigin(0, 1);
        this.platformCollider.setImmovable(true);
        this.platformCollider.setFrictionX(0);
        this.platformCollider.setGravity(0);

        // Create platform graph
        this.platform = this.add.tileSprite(0, 580, 128 * 10, 128 * 1, 'platform');
        this.platform.setOrigin(0, 1).setScrollFactor(0);

        // Create Signpost
        this.add.image(150, 452, 'signpost').setOrigin(0.5, 1);

        // Create Grasses
        this.add.image(70, 452, 'grass1').setOrigin(0.5, 1);
        this.add.image(400, 452, 'grass2').setOrigin(0.5, 1);

        // Create cactuses
        this.cactuses = this.physics.add.staticGroup({
            classType: Cactus
        });
        this.cactuses.create(1200, 452,'cactus1', true, true).setOrigin(0.5, 1);
        this.cactuses.create(1700, 452,'cactus2', true, true).setOrigin(0.5, 1);
        this.cactuses.create(2400, 452,'cactus2', true, true).setOrigin(0.5, 1);
        this.cactuses.create(3000, 452,'cactus3', true, true).setOrigin(0.5, 1);

        // Create player
        this.player = this.physics.add.sprite(200, 340, 'dino-idle1').setOrigin(0, 1).setScale(DINO_SCALE, DINO_SCALE);
        this.player.body.setSize(280, 380).setOffset(80, 46);
        this.player.setFrictionX(0);
        this.player.setBounce(0);
        this.player.setGravity(0, DINO_GRAVITY);
        this.player.setDepth(10);

        // Create animations
        this.anims.create({
            key: 'dino-idle', 
            frames: [
                { key: 'dino-idle1' },
                { key: 'dino-idle2' },
                { key: 'dino-idle3' },
                { key: 'dino-idle4' },
                { key: 'dino-idle5' },
                { key: 'dino-idle6' },
                { key: 'dino-idle7' },
                { key: 'dino-idle8' },
                { key: 'dino-idle9' },
                { key: 'dino-idle10' }
            ],
            repeat: -1,
            frameRate: 12,
        });
        this.anims.create({
            key: 'dino-run', 
            frames: [
                { key: 'dino-run1' },
                { key: 'dino-run2' },
                { key: 'dino-run3' },
                { key: 'dino-run4' },
                { key: 'dino-run5' },
                { key: 'dino-run6' },
                { key: 'dino-run7' },
                { key: 'dino-run8' }
            ],
            repeat: -1,
            frameRate: 12,
        });
        this.anims.create({
            key: 'dino-jump', 
            frames: [
                { key: 'dino-jump1' },
                { key: 'dino-jump2' },
                { key: 'dino-jump3' },
                { key: 'dino-jump4' },
                { key: 'dino-jump5' },
                { key: 'dino-jump6' },
                { key: 'dino-jump7' },
                { key: 'dino-jump8' },
                { key: 'dino-jump9' , duration: 900},
                { key: 'dino-jump10' },
                { key: 'dino-jump11' },
                { key: 'dino-jump12' }
            ],
            repeat: -1,
            frameRate: 12,
        });
        this.anims.create({
            key: 'dino-dead', 
            frames: [
                { key: 'dino-dead1' },
                { key: 'dino-dead2' },
                { key: 'dino-dead3' },
                { key: 'dino-dead4' },
                { key: 'dino-dead5' },
                { key: 'dino-dead6' },
                { key: 'dino-dead7' },
                { key: 'dino-dead8' }
            ],
            repeat: -1,
            frameRate: 12,
        });

        // Render the score
        const style = { color: '#6b4401', fontSize: 40, fontFamily: 'monospace' }
        this.scoreText = this.add.text(600, 60, this.score, style)
                                            .setScrollFactor(0)
                                            .setOrigin(0.5, 0.5);

        // Bound the camera
        this.cameras.main.setBounds(0, 0, 500000, 580);
        // Camera follow
        this.cameras.main.startFollow(this.player);
        this.cameras.main.followOffset.set(-450, 0);

        // Input handle
        this.cursors = this.input.keyboard.createCursorKeys();

        // Collision
        this.physics.add.collider(this.player, this.platformCollider);
        var colliderDinoCactus = this.physics.add.overlap(this.player, this.cactuses, () => {
            if (this.playerState != 3) this.playerState = 3;
            this.physics.world.removeCollider(colliderDinoCactus);
        });
    }

    update() {
        // If the dino collides with objects
        if (this.playerState == 3) {
            // Increase score
            this.score += 0.001 * this.speed;
            // console.log(this.player.body.velocity.x);
            this.scoreText.text = Math.round(this.score);
            // Animation
            this.player.anims.play('dino-dead', true);
            // Stop move camera
            this.cameras.main.setDeadzone(1000);
            if (this.player.anims.currentFrame.isLast) {
                // Change state to slide slow down on the platform
                this.playerState = 4;
                // Stop animation
                this.player.stop();
                return;
            }
        }
        // If the dino dead and slide on platform, bonus a little score
        else if (this.playerState == 4) {
            // Bonus score
            this.score += 0.001 * this.speed;
            this.scoreText.text = Math.round(this.score);
            // Slide slow down
            this.player.setVelocityX(this.speed);
            this.platformCollider.setVelocityX(this.speed);
            if (this.speed > DINO_RUN_SPEED_MIN * 0.15) this.speed *= 0.98;
             // Game over
            else {
                this.playerState = -1;
                this.speed = 0;
                this.player.setVelocityX(0);
                this.platformCollider.setVelocityX(0);
                return;
            }
        }
        // If the dino is idle
        else if (this.playerState == 0) {
            if (!this.guideText) {
            const style = { color: '#6b4401', fontSize: 40, fontFamily: 'monospace' }
            this.guideText = this.add.text(600, 140, 'Press SPACE to jump', style)
                                        .setOrigin(0.5).setScrollFactor(0);
            }
            // Transparency effect
            if (this.isTransparencyText)
            {
                this.guideText.alpha -= 0.01
            }
            else
            {
                this.guideText.alpha += 0.01
            }

            if (this.guideText.alpha <= 0.5 && this.isTransparencyText) {
                this.isTransparencyText = false
            }
            else if (this.guideText.alpha >= 1 && !this.isTransparencyText) {
                this.isTransparencyText = true
            }

            this.player.anims.play('dino-idle', true);
            if (this.cursors.space.isDown) {
                // Clear the guide text
                this.guideText.text = '';
                // Change state
                this.playerState = 1;
            }
        }
        // If the dino is running
        else if (this.playerState == 1) {
            // Increase score
            this.score += 0.001 * this.speed;
            this.scoreText.text = Math.round(this.score);
            // Run infinitely
            this.player.setVelocityX(this.speed);
            this.platformCollider.setVelocityX(this.speed);
            if (this.speed < DINO_RUN_SPEED_MAX) this.speed += DINO_RUN_SPEED_GAIN;
            // Animation
            this.player.anims.play('dino-run', true);
            
            // If press space, the dino will jump
            if (this.cursors.space.isDown) {
                this.playerState = 2;
                this.player.setVelocityY(- DINO_JUMP_SPEED);
                this.player.anims.play('dino-jump');
                return;
            }
        }
        // If the dino is jumping
        else if (this.playerState == 2) {
            // Increase score
            this.score += 0.001 * this.speed;
            this.scoreText.text = Math.round(this.score);
            // Run infinitely
            this.player.setVelocityX(this.speed);
            this.platformCollider.setVelocityX(this.speed);
            if (this.speed < DINO_RUN_SPEED_MAX) this.speed += DINO_RUN_SPEED_GAIN;
            // Animation
            this.player.anims.play('dino-jump', true);
            // After jump 1 time, the dino will run
            if (this.player.anims.currentFrame.isLast) {
                this.playerState = 1;
                return;
            }
            if (this.cursors.left.isDown) {
               this.playerState = 3;
               return;
            }
        }
        // If game over, press space to replay
        else {
            if (!this.replayText) {
            const style = { color: '#6b4401', fontSize: 40, fontFamily: 'monospace' }
            this.replayText = this.add.text(600, 140, 'Press SPACE to play again', style)
                                        .setOrigin(0.5).setScrollFactor(0);
            }
            // Transparency effect
            if (this.isTransparencyText)
            {
                this.replayText.alpha -= 0.01
            }
            else
            {
                this.replayText.alpha += 0.01
            }
            if (this.replayText.alpha <= 0.5 && this.isTransparencyText) {
                this.isTransparencyText = false
            }
            else if (this.replayText.alpha >= 1 && !this.isTransparencyText) {
                this.isTransparencyText = true
            }
            // If press Space then replay
            if (this.cursors.space.isDown) {
                this.scene.restart();
            }
        }

        // Scroll the texture of the tilesprite proportionally to the camera scroll
        this.bg.tilePositionX = this.cameras.main.scrollX;
        // Scroll platform follow the dino
        this.platform.tilePositionX = this.cameras.main.scrollX;

        // Spawn and destroy cactuses        
        const _cactuses = this.cactuses.children.entries;
        const firstCactusPositionX = _cactuses[0].x;
        if (firstCactusPositionX < this.player.body.x - 200) {
            // Destroy the cactus out of the screen at the left side
            _cactuses.shift();
            // Spawn a new one at the right side
            const lastCactusPositionX = _cactuses[_cactuses.length - 1].x;
            this.cactuses.create(lastCactusPositionX + Math.floor(Math.random() * (501)) + 500, 
                                452, 'cactus' + (Math.floor(Math.random() * 3) + 1), true, true).setOrigin(0.5, 1);
        }
        // Spawn and destroy other objects
        // Skip to version 2.0! I have to study for the exam
    }
}