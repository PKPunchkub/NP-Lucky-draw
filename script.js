// ดึง element จาก HTML
const maxInput = document.getElementById('maxInput');
const digits = document.querySelectorAll('.digit');
const drawBtn = document.getElementById('drawBtn');
const restartBtn = document.getElementById('restartBtn');
const message = document.getElementById('message');

// ฟังก์ชัน format เลขเป็น 3 หลัก (001-999)
function formatNumber(num) {
    return num.toString().padStart(3, '0');
}

// ฟังก์ชันสุ่มเลขตาม max
function getRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

// Event เมื่อกดปุ่มเริ่มหมุน
drawBtn.addEventListener('click', function() {
    const max = parseInt(maxInput.value) || 500;
    if (max < 1 || max > 999) {
        message.textContent = 'กรุณาใส่จำนวนสูงสุดระหว่าง 1-999!';
        return;
    }
    maxInput.disabled = true; // ล็อก input หลังเริ่ม
    drawBtn.style.display = 'none';
    message.textContent = 'กำลังหมุน...';

    const luckyNumber = getRandomNumber(max);
    const luckyDigits = formatNumber(luckyNumber).split(''); // แยกเป็น array ['1', '2', '3']

    // เริ่มหมุนทั้งหมด
    digits.forEach(digit => digit.classList.add('spinning'));

    // Simulate หมุนเร็วๆ
    const spinInterval = setInterval(function() {
        digits.forEach((digit, index) => {
            if (digit.classList.contains('spinning')) {
                digit.textContent = Math.floor(Math.random() * 10); // สุ่ม 0-9 สำหรับแต่ละหลัก
            }
        });
    }, 50); // เปลี่ยนเร็วทุก 50ms

    // หยุดทีละหลัก: หลักแรกหลัง 2 วินาที, ถัดไป +1 วินาที
    setTimeout(() => stopDigit(0, luckyDigits[0], spinInterval), 2000);
    setTimeout(() => stopDigit(1, luckyDigits[1], spinInterval), 3000);
    setTimeout(() => stopDigit(2, luckyDigits[2], spinInterval), 4000);
});

// ฟังก์ชันหยุดหลักเฉพาะ (และตรวจว่าหยุดหมดแล้วประกาศผล)
function stopDigit(index, finalValue, spinInterval) {
    digits[index].classList.remove('spinning');
    digits[index].textContent = finalValue;

    // ถ้าหยุดหมดทุกหลัก
    if (!Array.from(digits).some(d => d.classList.contains('spinning'))) {
        clearInterval(spinInterval);
        message.textContent = `เลขผู้โชคดีคือ ${Array.from(digits).map(d => d.textContent).join('')}!`;
        restartBtn.style.display = 'inline-block';
    }
}

// Event เมื่อกดปุ่มเริ่มใหม่
restartBtn.addEventListener('click', function() {
    restartBtn.style.display = 'none';
    drawBtn.style.display = 'inline-block';
    maxInput.disabled = false;
    message.textContent = '';
    digits.forEach(digit => {
        digit.textContent = '0';
    });
});
