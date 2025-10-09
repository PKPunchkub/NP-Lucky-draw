// ดึง element จาก HTML
const numberDisplay = document.querySelector('.number-display');
const drawBtn = document.getElementById('drawBtn');
const restartBtn = document.getElementById('restartBtn');
const message = document.getElementById('message');

// ฟังก์ชัน format เลขเป็น 3 หลัก (001-500)
function formatNumber(num) {
    return num.toString().padStart(3, '0');
}

// ฟังก์ชันสุ่มเลข
function getRandomNumber() {
    return Math.floor(Math.random() * 500) + 1;
}

// Event เมื่อกดปุ่มเริ่มหมุน
drawBtn.addEventListener('click', function() {
    drawBtn.style.display = 'none'; // ซ่อนปุ่มเริ่ม
    message.textContent = 'กำลังหมุน...';
    numberDisplay.classList.add('spinning'); // เริ่ม animation

    let spinCount = 0;
    const maxSpins = 20; // จำนวนครั้งหมุนก่อนหยุด (ปรับได้เพื่อให้ช้าหรือเร็ว)
    const luckyNumber = getRandomNumber(); // สุ่มเลขจริงตั้งแต่แรก

    // Simulate การหมุนโดยเปลี่ยนเลขเร็วๆ
    const spinInterval = setInterval(function() {
        const tempNumber = getRandomNumber(); // สุ่มเลขชั่วคราวสำหรับแสดง
        numberDisplay.textContent = formatNumber(tempNumber);
        spinCount++;

        if (spinCount >= maxSpins) {
            clearInterval(spinInterval); // หยุด interval
            numberDisplay.textContent = formatNumber(luckyNumber); // แสดงเลขจริง
            numberDisplay.classList.remove('spinning'); // หยุด animation
            message.textContent = `เลขผู้โชคดีคือ ${formatNumber(luckyNumber)}!`;
            restartBtn.style.display = 'inline-block'; // แสดงปุ่มเริ่มใหม่
        }
    }, 100); // เปลี่ยนเลขทุก 100ms (0.1 วินาที) ปรับได้
});

// Event เมื่อกดปุ่มเริ่มใหม่
restartBtn.addEventListener('click', function() {
    restartBtn.style.display = 'none';
    drawBtn.style.display = 'inline-block';
    message.textContent = '';
    numberDisplay.textContent = '000';
});