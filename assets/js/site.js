// Minimal JS: highlight active nav link based on URL
document.addEventListener('DOMContentLoaded',function(){
  var links=document.querySelectorAll('.site-nav a');
  links.forEach(function(a){
    if(location.pathname.endsWith(a.getAttribute('href')) || (location.pathname.endsWith('/') && a.getAttribute('href')==='index.html')){
      a.classList.add('active');
    }
  });
});

const phrases = [
  "principles by ray dalio (book)      ",
  "deep green by christian kuria (song)      ",
  "zmh.github.io/personal-site-gallery (site)",
  "backrooms wiki (site)",
  "felipe's (food)",
    "the mbta (the mbta)"
];

const ticker = document.getElementById("ticker");

const alphabet =
  " abcdefghijklmnopqrstuvwxyz()./ -'";

let currentPhrase = phrases[0];

function createTicker(phrase) {
  ticker.innerHTML = "";

  for (const char of phrase) {
    const slot = document.createElement("div");
    slot.className = "char";

    const track = document.createElement("div");
    track.className = "char-track";

    for (const letter of alphabet) {
      const row = document.createElement("div");
      row.textContent = letter;
      track.appendChild(row);
    }

    const index = alphabet.indexOf(char.toLowerCase());

    track.style.transform =
      `translateY(${-index}em)`;

    slot.appendChild(track);
    ticker.appendChild(slot);
  }
}

function animateTo(nextPhrase) {
  const maxLength = Math.max(
    currentPhrase.length,
    nextPhrase.length
  );

  while (ticker.children.length < maxLength) {
    const slot = document.createElement("div");
    slot.className = "char";

    const track = document.createElement("div");
    track.className = "char-track";

    for (const letter of alphabet) {
      const row = document.createElement("div");
      row.textContent = letter;
      track.appendChild(row);
    }

    slot.appendChild(track);
    ticker.appendChild(slot);
  }

  [...ticker.children].forEach((slot, i) => {
    const track = slot.querySelector(".char-track");

    const targetChar =
      (nextPhrase[i] || " ").toLowerCase();

    const targetIndex =
      alphabet.indexOf(targetChar);

    const STEP = 0.3;

    track.style.transition =
  "transform 1s cubic-bezier(.22,.61,.36,1)";

    track.style.transitionDelay =
      `${i * 30}ms`;

    track.style.transform =
      `translateY(${-targetIndex}em)`;
  });

  currentPhrase = nextPhrase;
}

createTicker(currentPhrase);

let index = 0;

setInterval(() => {
  index = (index + 1) % phrases.length;
  animateTo(phrases[index]);
}, 3500);

const galleryImage =
  document.getElementById('gallery-image');

if (galleryImage) {

  const images = [
    'assets/images/gdx1.jpg',
    'assets/images/gdx2.jpg',
    'assets/images/gdx3.jpg',
    'assets/images/gdx4.jpg',
    'assets/images/gdx5.jpg'
  ];

  let current = 0;

  galleryImage.addEventListener('click', () => {

    current =
      (current + 1) % images.length;

    galleryImage.src =
      images[current];

  });

}
