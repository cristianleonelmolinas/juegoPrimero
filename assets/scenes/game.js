export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  Init() {}

  preload() {
    this.load.image("sky", "./assets/image/sky.png");
    this.load.image("platform", "./assets/image/platform.png");
    this.load.image("ninja", "./assets/image/ninja.png");
    this.load.image("square", "./assets/image/square.png");
    this.load.image("diamond", "./assets/image/diamond.png");
    this.load.image("triangle", "./assets/image/triangle.png");
    
  }

  create() {
    //add background
    this.add.image(400, 300, "sky").setScale(0.555);

    //add static platforms
    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "platform").setScale(2).refreshBody();

    //add shapes
    this.shapesGroup = this.physics.add.group();


    this.time.addEvent({
      delay: 150000,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    })

    //add player
    this.player = this.physics.add.sprite(100, 450, "ninja");
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player,platforms);
    this.physics.add.collider(this.player,this.shapesGroup);
    this.physics.add.collider(platforms,this.shapesGroup);
    
  }

  update() {

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-250);
    } else {
      if(this.cursors.right.isDown){
        this.player.setVelocityX(250)
      } else {
        this.player.setVelocityX(0)
      };
    }
    if (this.cursors.up.isDown && this.player.body.touching.down){
      this.player.setVelocityY (-350)
    }
  }
  
addShape(){
  const randomShape = Phaser.Math.RND.pick(["diamond","square","triangle"]);
  const randomX = Phaser.Math.RND.between (0, 800);
  this.shapesGroup.create(randomX, 0 , randomShape)
  console.log ("shape is added", randomX, randomShape)
}
  

  
}
