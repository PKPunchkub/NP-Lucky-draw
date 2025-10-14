// ดึง element จาก HTML
const maxInput = document.getElementById('maxInput');
const digits = document.querySelectorAll('.digit');
const drawBtn = document.getElementById('drawBtn');
const restartBtn = document.getElementById('restartBtn');
const message = document.getElementById('message');
const winnersList = document.getElementById('winnersList');
const heartsContainer = document.querySelector('.hearts-container');

// ตัวแปรเก็บสถานะและเลขผู้โชคดี
let winners = [];
let isDrawing = false;
let drawCount = 0;
const maxWinners = 10;

// ฟังก์ชันสุ่มตัวเลขที่ไม่ซ้ำ
function getRandomNumber(max) {
    let num;
    do {
        num = Math.floor(Math.random() * max) + 1;
        num = num.toString().padStart(3, '0'); // แปลงเป็น 3 หลัก
    } while (winners.includes(num));
    return num;
}

// ฟังก์ชันหมุนตัวเลขทีละหลัก
function spinDigit(digitElement, targetDigit, duration, callback) {
    let startTime = null;
    const spin = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;
        if (progress < 1) {
            digitElement.textContent = Math.floor(Math.random() * 10);
            digitElement.classList.add('spinning');
            requestAnimationFrame(spin);
        } else {
            digitElement.textContent = targetDigit;
            digitElement.classList.remove('spinning');
            callback();
        }
    };
    requestAnimationFrame(spin);
}

// ฟังก์ชันสร้างหัวใจลอย
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.textContent = '❤️';
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${Math.random() * 3 + 3}s`; // 3-6 วินาที
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}

// ฟังก์ชันเริ่มการสุ่ม
function startDraw() {
    if (isDrawing) return;
    isDrawing = true;
    drawBtn.disabled = true;

    const max = parseInt(maxInput.value);
    if (isNaN(max) || max < 10 || max > 999) {
        message.textContent = 'กรุณากรอกจำนวนสูงสุดระหว่าง 10 ถึง 999';
        isDrawing = false;
        drawBtn.disabled = false;
        return;
    }

    if (drawCount >= maxWinners) {
        message.textContent = 'ครบ 10 ผู้โชคดีแล้ว!';
        isDrawing = false;
        restartBtn.style.display = 'inline';
        return;
    }

    const number = getRandomNumber(max);
    winners.push(number);
    drawCount++;

    const digitsArray = number.split('');
    message.textContent = `กำลังสุ่มผู้โชคดีคนที่ ${drawCount}...`;

    spinDigit(digits[0], digitsArray[0], 1000, () => {
        createHeart(); // หัวใจลอยเมื่อหลักแรกหยุด
        spinDigit(digits[1], digitsArray[1], 1000, () => {
            createHeart();
            spinDigit(digits[2], digitsArray[2], 1000, () => {
                createHeart();
                message.textContent = `ผู้โชคดีคนที่ ${drawCount}: ${number}`;
                const li = document.createElement('li');
                li.textContent = `คนที่ ${drawCount}: ${number}`;
                winnersList.appendChild(li);
                isDrawing = false;
                drawBtn.disabled = false;
                if (drawCount === maxWinners) {
                    drawBtn.style.display = 'none';
                    restartBtn.style.display = 'inline';
                    message.textContent += ' - ครบ 10 ผู้โชคดี!';
                }
            });
        });
    });
}

// ฟังก์ชันรีเซ็ต
function restartGame() {
    winners = [];
    drawCount = 0;
    isDrawing = false;
    drawBtn.disabled = false;
    drawBtn.style.display = 'inline';
    restartBtn.style.display = 'none';
    message.textContent = '';
    winnersList.innerHTML = '';
    digits.forEach(digit => {
        digit.textContent = '0';
        digit.classList.remove('spinning');
    });
}

// สร้างหัวใจลอยแบบสุ่มทุก 500ms เพื่อ background
setInterval(createHeart, 500);

// Event listeners
drawBtn.addEventListener('click', startDraw);
restartBtn.addEventListener('click', restartGame);
