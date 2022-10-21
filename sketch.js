var bg, bgImg;
var player, shooterImg, shooter_shooting;
var zumbi, zumbiImg, zumbiGroup;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
function preload() {

  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  zumbiImg = loadImage("assets/zombie.png");
  bgImg = loadImage("assets/bg.jpeg");
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
}

function setup() {


  createCanvas(windowWidth, windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth / 2 - 20, displayHeight / 2 - 40, 20, 20)
  bg.addImage(bgImg)
  bg.scale = 1.1


  //criando o sprite do jogador
  player = createSprite(displayWidth - 1150, displayHeight - 300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug = true
  player.setCollider("rectangle", 0, 0, 300, 300)

  heart1 = createSprite(displayWidth - 150, 40, 20, 20);
  heart1.visible = false
  heart1.addImage("heart1", heart1Img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth - 100, 40, 20, 20);
  heart2.visible = false
  heart2.addImage("heart2", heart2Img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth - 150, 40, 20, 20);
  heart3.addImage("heart3", heart3Img)
  heart3.scale = 0.4

  zumbiGroup = new Group()
}

function draw() {
  background(0);




  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
  if (keyDown("w") || touches.length > 0) {
    player.y = player.y - 30
  }
  if (keyDown("s") || touches.length > 0) {
    player.y = player.y + 30
  }
  if (keyDown("d") || touches.length > 0) {
    player.x = player.x + 30
  }
  if (keyDown("a") || touches.length > 0) {
    player.x = player.x - 30
  }


  //solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
  if (keyWentDown("space")) {

    player.addImage(shooter_shooting)

  }

  //o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
  else if (keyWentUp("space")) {
    player.addImage(shooterImg)
  }
  if (zumbiGroup.isTouching(player)) {
    for (var i = 0; i < zumbiGroup.length; i++) {
      if (zumbiGroup[i].isTouching(player)) {
        zumbiGroup[i].destroy();
      }
    }
  }
  inimigos()
  drawSprites();

}
function inimigos() {
  if (frameCount % 50 === 0) {
    zumbi = createSprite(random(500, 1100), random(100, 500), 40, 40);
    zumbi.addImage(zumbiImg);
    zumbi.scale = 0.15;
    zumbi.velocityX = -3;
    zumbi.debug = true;
    zumbi.setCollider("rectangle", 0, 0, 400, 400);
    zumbi.lifetime = 400;
    zumbiGroup.add(zumbi)
  }
}