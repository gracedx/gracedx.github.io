// Apply saved theme before render to avoid flash
(function() {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

// Minimal JS: highlight active nav link based on URL
document.addEventListener('DOMContentLoaded',function(){
  var links=document.querySelectorAll('.site-nav a');
  links.forEach(function(a){
    if(location.pathname.endsWith(a.getAttribute('href')) || (location.pathname.endsWith('/') && a.getAttribute('href')==='index.html')){
      a.classList.add('active');
    }
  });

  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const next = isDark ? '' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  const projectCards = document.querySelectorAll('.project-card');
  if (projectCards.length) {
    const savedScroll = sessionStorage.getItem('createdScroll');
    const savedTab = sessionStorage.getItem('createdTab');
    if (savedScroll !== null) {
      if (savedTab) {
        document.querySelectorAll('.section-tab').forEach(t =>
          t.classList.toggle('active', t.getAttribute('data-target') === savedTab)
        );
        document.querySelectorAll('.created-section').forEach(s =>
          s.classList.toggle('active', s.id === savedTab)
        );
      }
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedScroll, 10));
        sessionStorage.removeItem('createdScroll');
        sessionStorage.removeItem('createdTab');
      });
    }

    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const activeTab = document.querySelector('.section-tab.active');
        sessionStorage.setItem('createdScroll', window.scrollY);
        sessionStorage.setItem('createdTab', activeTab ? activeTab.getAttribute('data-target') : 'all');
      });
    });
  }
});

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



const curiosities = [
  "p2p payments",
  "scarcity vs. trust",
  "individuation of app creation",
  "zero knowledge proofs",
  "donna tartt",
  "zeroclaw / agent harnesses"
];

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&";

const el = document.getElementById("scramble");

let curiositiesIndex = 0;

function scrambleTo(text) {
  let frame = 0;

  const interval = setInterval(() => {
    let output = "";

    for (let i = 0; i < text.length; i++) {
      if (i < frame) {
        output += text[i];
      } else {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
    }

    el.textContent = output;

    frame++;

    if (frame > text.length) {
      clearInterval(interval);

      setTimeout(() => {
        curiositiesIndex = (curiositiesIndex + 1) % curiosities.length;
        scrambleTo(curiosities[curiositiesIndex]);
      }, 2000);
    }
  }, 50);
}

scrambleTo(curiosities[0]);


const phrases = [
  "principles by ray dalio (book)      ",
  "spark by blonde suppermacy (song)         ",
  "zmh.github.io/personal-site-gallery (site)",
  "curtains ! by zaybeezy (song)",
  "pepita cafe (cafe)",
  "the mbta (the mbta)"
];

const ticker = document.getElementById("ticker");

const alphabet =
  " abcdefghijklmnopqrstuvwxyz()./ !-'";

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

if (ticker) {
  createTicker(currentPhrase);

  let index = 0;

  setInterval(() => {
    index = (index + 1) % phrases.length;
    animateTo(phrases[index]);
  }, 3500);
}
