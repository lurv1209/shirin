const heartBtn = document.getElementById("heartBtn");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const card = modal.querySelector("img");
const birthdayMsg = document.getElementById("birthdayMsg");
const confettiContainer = document.getElementById("confettiContainer");
const sparkles = document.getElementById("sparkles");
const birthdaySong = document.getElementById("birthdaySong"); // audio element

// Generate sparkles randomly on screen
function createSparkles(num = 30) {
  for (let i = 0; i < num; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.style.top = `${Math.random() * 100}vh`;
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.animationDelay = `${Math.random() * 2}s`;
    sparkle.style.width = sparkle.style.height = `${3 + Math.random() * 5}px`;
    sparkles.appendChild(sparkle);
  }
}

// Create confetti emojis falling from top randomly
const confettiEmojis = ["🎉", "🎈", "✨", "🎂", "💖", "🎁", "🥳"];

function launchConfetti() {
  for (let i = 0; i < 20; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.textContent =
      confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDelay = `${i * 0.15}s`;
    confettiContainer.appendChild(confetti);

    // Remove confetti after animation
    confetti.addEventListener("animationend", () => confetti.remove());
  }
}

function stopAudio() {
  if (!birthdaySong.paused) {
    birthdaySong.pause();
    birthdaySong.currentTime = 0;
  }
}

heartBtn.addEventListener("click", () => {
  modal.classList.add("show");
  birthdayMsg.classList.remove("show");
  card.style.opacity = 0;
  card.style.transform = "scale(0.95)";

  // Play the birthday song from the start
  birthdaySong.currentTime = 0;
  birthdaySong.play().catch(() => {
    console.log("Audio playback requires user interaction.");
  });

  // Animate card fade-in + pop
  setTimeout(() => {
    card.style.opacity = 1;
    card.style.transform = "scale(1)";
  }, 100);

  // Show birthday message after card pops in
  setTimeout(() => {
    birthdayMsg.classList.add("show");
  }, 1700);

  // Launch confetti after message
  setTimeout(() => {
    launchConfetti();
  }, 2200);
});

function closeModal() {
  modal.classList.remove("show");
  birthdayMsg.classList.remove("show");
  confettiContainer.innerHTML = "";
  stopAudio();
}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Create sparkles once on page load
createSparkles();
