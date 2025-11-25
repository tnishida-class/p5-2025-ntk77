// 最終課題を制作しよう

// 2D アニメーションゲームのようなインタラクション
let x, y;
let vy;
const g = 1;
let isOnGround = false;

let jumpCount = 0;
const maxJump = 2;

let particles = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  vy = 0;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);
  const size = height * 0.1; // キャラクターのサイズ

  // 地面を描く
  const groundY = height * 0.8;
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);

  // ---- 左右移動 ----
  let speed = 5;
  if (keyIsDown(SHIFT)) speed = 10;
  if (keyIsDown(LEFT_ARROW))  x -= speed;
  if (keyIsDown(RIGHT_ARROW)) x += speed;

  // ---- 重力 ----
  vy += g;

  // ---- 位置更新 ----
  y += vy;

  // ---- 地面との衝突 ----
  if (y + size / 2 >= groundY) {
    y = groundY - size / 2;
    vy = 0;
    isOnGround = true;
    jumpCount = 0;  // 着地でジャンプ回数リセット
  }

  // キャラクターを描く
  fill(0);
  ellipse(x, y, size, size);

  // パーティクル描画
  drawParticles();
}

// ================================
//   ジャンプの「押した瞬間」判定
// ================================
function keyPressed() {
  if (keyCode === 32 && jumpCount < maxJump) {
    vy = -20;
    jumpCount++;
    isOnGround = false;

    // ジャンプエフェクト
    const size = height * 0.1;
    createJumpEffect(x, y + size / 2);
  }
}

// -------------------------------
// ジャンプエフェクト（パーティクル）
// -------------------------------
function createJumpEffect(px, py){
  for (let i = 0; i < 10; i++){
    particles.push({
      x: px,
      y: py,
      vx: random(-3, 3),
      vy: random(-5, 0),
      life: 30
    });
  }
}

function drawParticles(){
  for (let i = particles.length - 1; i >= 0; i--){
    let p = particles[i];

    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.3;    // 重力
    p.life--;

    fill(255, 255, 255, p.life * 8);
    noStroke();
    ellipse(p.x, p.y, 10);

    if (p.life <= 0){
      particles.splice(i, 1);
    }
  }
}
