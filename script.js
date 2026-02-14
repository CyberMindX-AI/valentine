// --- MUSIC LOGIC (Auto-Start + Interaction Fallback) ---
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;

function playMusic(forcePlay = false) {
    if (!isPlaying || forcePlay) {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.classList.add('playing');
            musicBtn.textContent = '🎶';
        }).catch(err => {
            console.log("Auto-play prevented (Browser Policy). Waiting for user interaction.");
        });
    } else {
        // Toggle Pause if explicitly clicked
        bgMusic.pause();
        isPlaying = false;
        musicBtn.classList.remove('playing');
        musicBtn.textContent = '🎵';
    }
}

// 1. Try to Auto-Play Immediately on Load
window.addEventListener('load', () => {
    bgMusic.play().then(() => {
        isPlaying = true;
        musicBtn.classList.add('playing');
        musicBtn.textContent = '🎶';
    }).catch(err => {
        // 2. If blocked, play on FIRST click anywhere
        document.body.addEventListener('click', function () {
            playMusic(true);
        }, { once: true });
    });
});

musicBtn.addEventListener('click', () => playMusic());

// --- STAGE 1: HEARTS ANIMATION ---
window.onload = function () {
    // Attempt music start here too just in case
    bgMusic.play().catch(() => { });

    const mainScene = document.getElementById('mainScene');
    const heart1 = document.querySelector('.heart-1');
    const heart2 = document.querySelector('.heart-2');
    const heart3 = document.querySelector('.heart-3');

    // Animate initial hearts
    setTimeout(() => { heart1.style.opacity = '1'; }, 500);
    setTimeout(() => { heart2.style.opacity = '1'; }, 1500);
    setTimeout(() => { heart3.style.opacity = '1'; }, 2500);

    // Transition to Connected Hearts
    setTimeout(() => {
        heart1.style.opacity = '0';
        heart2.style.opacity = '0';
        heart3.style.opacity = '0';

        setTimeout(() => {
            const solid = document.querySelector('.solid');
            const scribble = document.querySelector('.scribble');

            solid.style.opacity = '1';
            solid.style.transform = 'translateY(-50%) scale(1)';
            solid.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

            setTimeout(() => {
                scribble.style.opacity = '1';
                document.querySelector('.scribble-path').style.animation = 'draw 2s ease-out forwards';
            }, 800);

            // Fade out hearts slightly before text appears to avoid clash
            setTimeout(() => {
                document.querySelector('.final-composition').style.opacity = '0.2'; // Dim hearts
            }, 5000);

            setTimeout(() => {
                // Show Text Message AFTER hearts dim
                document.querySelector('.message-wrapper').style.opacity = '1';
                document.querySelector('.message-wrapper').style.transform = 'translateY(0)';
                document.querySelector('.footer-row').style.opacity = '1';
            }, 5500); // 5.5s delay

        }, 1000);
    }, 4500);
};

// --- STAGE 2: PASSCODE SCREEN ---
document.getElementById('nextBtn').addEventListener('click', () => {
    const passcodeScreen = document.getElementById('passcodeScreen');
    passcodeScreen.classList.add('active');
    setTimeout(() => {
        const popup = document.getElementById('valentinePopup');
        popup.classList.add('show');
        popup.style.display = 'flex';
    }, 500);
});

// PASSCODE LOGIC
const correctPasscode = "1543";
let currentInput = "";
const dots = document.querySelectorAll('.dot');
const keys = document.querySelectorAll('.key');

document.getElementById('closePopupBtn').addEventListener('click', () => {
    const popup = document.getElementById('valentinePopup');
    popup.classList.remove('show');
    setTimeout(() => { popup.style.display = 'none'; }, 500);
});

keys.forEach(key => {
    key.addEventListener('click', () => {
        const value = key.getAttribute('data-key');
        if (value === null) return;
        if (currentInput.length < 4) {
            currentInput += value;
            updateDots();
            if (currentInput.length === 4) checkPasscode();
        }
    });
});

document.getElementById('deleteKey').addEventListener('click', () => {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        updateDots();
    }
});

document.getElementById('goBack').addEventListener('click', () => {
    document.getElementById('passcodeScreen').classList.remove('active');
    currentInput = "";
    updateDots();
});

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList[index < currentInput.length ? 'add' : 'remove']('filled');
    });
}

function checkPasscode() {
    if (currentInput === correctPasscode) {
        setTimeout(() => {
            document.getElementById('passcodeScreen').classList.remove('active');
            const timerScreen = document.getElementById('timerScreen');
            timerScreen.classList.add('active');
            updateTimer();
            setInterval(updateTimer, 1000);
        }, 300);
    } else {
        const dotsContainer = document.querySelector('.dots-container');
        dotsContainer.classList.add('shake');
        setTimeout(() => {
            dotsContainer.classList.remove('shake');
            currentInput = "";
            updateDots();
        }, 500);
    }
}

// --- TIMER LOGIC ---
const targetDate = new Date('2026-01-15T00:00:00');
function updateTimer() {
    const now = new Date();
    const diff = now - targetDate;
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;
    }
}

document.getElementById('timerNextBtn').addEventListener('click', () => {
    document.getElementById('timerScreen').classList.remove('active');
    document.getElementById('envelopeScreen').classList.add('active');
});

// --- SCROLL SCREEN LOGIC ---
const messageText = `My Dearest Praise, 👑

It’s hard to put into words just how much you mean to me, but on this special day, I want to try. ❤️

From the very first moment our paths crossed, my life changed in ways I never imagined possible. You brought light into my darkest days and warmth into my coldest nights. Your smile is my daily motivation, and your laughter is my favorite song.

Every day I spend with you feels like a beautiful dream I never want to wake up from. You are not just my Valentine; you are my best friend, my confidant, and the keeper of my heart. I cherish every little moment we share—the silly jokes, the quiet glances, the way you understand me without saying a word.

Thank you for being you. Thank you for your kindness, your patience, and your endless love. I promise to stand by your side, to support you, and to love you more with every passing second.

No matter where life takes us, my heart will always belong to you. You are my everything.

I love you, now and forever. 🌹`;

const typingSpeed = 40;
let charIndex = 0;

function typeWriter() {
    const typingElement = document.getElementById("typingMessage");
    const scrollContent = document.querySelector('.scroll-content');

    if (charIndex < messageText.length) {
        const char = messageText.charAt(charIndex);
        if (char === '\n') {
            typingElement.innerHTML += '<br>';
        } else {
            typingElement.innerHTML += char;
        }
        scrollContent.scrollTop = scrollContent.scrollHeight; // Auto-scroll
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
    } else {
        // Typing Finished -> Initiate Closing Sequence
        document.querySelector('.cursor').style.display = 'none';

        // Wait 5 seconds, then Close the Scroll
        setTimeout(() => {
            // This class triggers the CSS animation sequence:
            // 1. Content fades out
            // 2. Scroll collapses
            // 3. Final Message fades in
            document.querySelector('.scroll-screen').classList.add('closing');
        }, 5000);
    }
}

function openScrollScreen() {
    const envelopeScreen = document.querySelector('.envelope-screen');
    const scrollScreen = document.getElementById('scrollScreen');

    envelopeScreen.classList.remove('active');
    scrollScreen.style.display = 'flex';

    setTimeout(() => { scrollScreen.classList.add('active'); }, 100);

    setTimeout(() => {
        scrollScreen.classList.add('unrolled');
        setTimeout(() => {
            document.querySelector('.scroll-content').style.opacity = '1';
            typeWriter();
        }, 2000);
    }, 800);
}

document.getElementById('tapToOpen').addEventListener('click', openScrollScreen);
document.getElementById('envelope').addEventListener('click', openScrollScreen);
