const text = document.getElementById("text");
const image = document.getElementById("image");
const button = document.getElementById("nextBtn");
const music = document.getElementById("music");
const starsContainer = document.getElementById("stars");

const texts = [
    "Tapsanım slm <3",
    "Seni cok seveym",
    "Hayatımın anlamı ve önemi",
    "Bebisimmmm<3",
    "Küçük jeneratörüm benim",
    "RREZIK!",
    "BAYATMIS 😛",
    "Evlenelim mi ?",
    "Tatlim benim",
    "...",
    "Sen benim başlangıcım değilsin,hiç bitmeyenimsin",
];

const images = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg",
    "images/photo6.jpg",
    "images/photo7.jpg",
    "images/photo8.jpg",
    "images/photo9.jpg",
    "images/photo10.jpg",
    "images/photo11.jpg"];

let index = -1;
let musicStarted = false;
let extraClicks = 0;
let isTransitioning = false;
let finaleStarted = false;

function createStars(count, durationMin = 5, durationMax = 10) {
   
    for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.classList.add("star");

        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";

        const size = Math.random() * 3 + 1;
        star.style.width = size + "px";
        star.style.height = size + "px";

        star.style.animationDuration =
        durationMin + Math.random() * (durationMax - durationMin) + "s";

        starsContainer.appendChild(star);
    }
}

createStars(50);

function showNext() {
    if (isTransitioning) return;
    isTransitioning = true;

    index++;

    let delay = 200;

    if (index === 0) delay = 600;
    if (index === images.length - 1) delay = 800;

    if (index >= images.length) {
        handleEnding();
        isTransitioning = false;
        return;
    }
    image.classList.remove("visible");

    setTimeout(() => {
        image.src = images[index];
        image.style.display = "block";
        text.innerText = index < texts.length ? texts[index] : "";

        setTimeout(() => {
            image.classList.add("visible");
            isTransitioning = false;
        }, 50);
    }, delay);
}

function handleEnding() {
    
    extraClicks++;

    image.src = images[images.length - 1];
    image.style.display = "block";
    image.classList.add("visible");


    if (extraClicks === 1) {
        text.innerText = "🐰";
        text.classList.add("emoji");
    }
     else if (extraClicks === 3) {
        text.innerText = "⭐";
        text.classList.add("emoji");
     }
     else if (extraClicks === 5) {
        text.innerText = "🌸";
        text.classList.add("emoji");
     }
     else if (extraClicks >= 6) {
        text.innerText = "BASMA DEDIM ISTE BOZDON CANCIK! 🐰 <3 🦊";
        text.classList.remove("emoji");
        
        if (!finaleStarted) {

            finaleStarted = true;
    
            let added = 0;

            const interval = setInterval(() => {

                createStars(5, 3, 6);
                added += 5;

                if (added >= 80) {
                    clearInterval(interval);
                }
            }, 80);
    }
}
    else {
        text.innerText = "...";
        text.classList.remove("emoji");
    }
}

button.onclick = function() {
 
    button.classList.add("shake");

    void button.offsetWidth;

    setTimeout(() => {
        button.classList.remove("shake");
    }, 300);

    if (!musicStarted) {
        music.play();
        musicStarted = true;
    }

    showNext();
};
