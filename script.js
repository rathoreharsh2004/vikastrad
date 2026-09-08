const $ = s => document.querySelector(s);


/* =========================================================
   OUR RECENT COLLECTION
   25 IMAGES: rc1.jpeg → rc25.jpeg
========================================================= */

const recentImages = Array.from(
  { length: 25 },
  (_, i) => `assets/rc${i + 1}.jpeg`
);


/* Temporary premium interior-design titles/descriptions */

const recentContent = [

  {
    title: "THE MARBLE STATEMENT",
    text: "Natural stone surfaces that bring depth, elegance and timeless character to contemporary interiors. Designed to become the visual focal point of a space."
  },

  {
    title: "TEXTURED WALLS",
    text: "Rich textures that transform plain walls into expressive architectural surfaces. A refined way to add dimension without overwhelming the space."
  },

  {
    title: "MODERN SURFACE PLAY",
    text: "A considered mix of materials, patterns and finishes created to give interiors a distinctive visual identity."
  },

  {
    title: "WOOD & WARMTH",
    text: "Warm wood-inspired elements that balance modern architecture with a more inviting and sophisticated atmosphere."
  },

  {
    title: "SCULPTED DETAILS",
    text: "Carefully selected decorative elements that add character through form, texture and shadow."
  },

  {
    title: "STATEMENT PANELS",
    text: "Contemporary wall panels designed to create strong visual moments across residential and commercial spaces."
  },

  {
    title: "LUXURY FLOORING",
    text: "Surfaces that ground the entire interior with refined textures, patterns and a premium finish."
  },

  {
    title: "THE ACCENT WALL",
    text: "One striking wall can redefine an entire room. These surfaces are designed to create that instant visual impact."
  },

  {
    title: "MATERIAL CONTRAST",
    text: "Smooth against textured, warm against cool — contrasting materials create interiors with depth and personality."
  },

  {
    title: "ARCHITECTURAL SURFACES",
    text: "Materials selected not just for function, but for the way they interact with light, space and architecture."
  },

  {
    title: "CONTEMPORARY MOULDING",
    text: "Clean architectural detailing that adds proportion, rhythm and sophistication to modern interiors."
  },

  {
    title: "LIGHT & SURFACE",
    text: "Surfaces that come alive under changing light, creating subtle variations throughout the day."
  },

  {
    title: "THE GREEN ELEMENT",
    text: "Carefully integrated greenery and organic textures bring freshness and natural character into designed spaces."
  },

  {
    title: "DESIGNER TEXTURES",
    text: "Expressive textures that turn everyday surfaces into tactile design features with a distinctive identity."
  },

  {
    title: "MINIMAL LUXURY",
    text: "Understated materials and refined details come together to create spaces that feel luxurious without being excessive."
  },

  {
    title: "BOLD INTERIORS",
    text: "Strong materials for spaces that are meant to be noticed — confident, dramatic and unmistakably individual."
  },

  {
    title: "SOFT TONES",
    text: "Subtle tones and delicate textures create calm interiors with a sophisticated, contemporary mood."
  },

  {
    title: "MATERIAL HARMONY",
    text: "Different materials come together in balance, creating a cohesive interior where every element has its place."
  },

  {
    title: "THE DETAIL LAYER",
    text: "Sometimes the smallest detail makes the biggest difference. Finishes that complete the character of a space."
  },

  {
    title: "MODERN CLASSICS",
    text: "Timeless visual language reinterpreted through contemporary materials, forms and finishes."
  },

  {
    title: "LUXURY BEYOND WALLS",
    text: "Design elements extending beyond walls to doors, floors, ceilings and architectural features for a complete interior language."
  },

  {
    title: "TACTILE LIVING",
    text: "Materials chosen to make spaces not only beautiful to see, but interesting to experience through texture and touch."
  },

  {
    title: "THE SIGNATURE FINISH",
    text: "Distinctive finishes that give a project its own personality and leave a lasting visual impression."
  },

  {
    title: "CURATED INTERIORS",
    text: "A thoughtful composition of surfaces, textures and details — selected to work together rather than simply stand alone."
  },

  {
    title: "THE NEW INTERIOR",
    text: "A contemporary approach to interior design where material, detail and individuality come together to create something truly different."
  }

];


const recentImage = $("#recentImage");
const recentTitle = $("#recentTitle");
const recentDescription = $("#recentDescription");
const recentCounter = $("#recentCounter");
const recentNumber = $("#recentNumber");
const recentProgress = $("#recentProgress");
const recentKicker = document.querySelector(".recent-kicker");

let recentIndex = 0;
let recentAuto;


/* Preload recent collection images */

recentImages.forEach(src => {
  const img = new Image();
  img.src = src;
});


function showRecent(n) {

  recentIndex =
    (n + recentImages.length) %
    recentImages.length;

  const data = recentContent[recentIndex];

  if (recentImage) {

    recentImage.style.opacity = "0";

    setTimeout(() => {

      recentImage.src =
        recentImages[recentIndex];

      recentImage.alt =
        `Vikas Trading Company - ${data.title}`;

      recentImage.onload = () => {
        recentImage.style.opacity = "1";
      };

    }, 150);

  }

  if (recentTitle) {
    recentTitle.textContent = data.title;
  }

  if (recentDescription) {
    recentDescription.textContent = data.text;
  }

  const number =
    String(recentIndex + 1).padStart(2, "0");

  if (recentCounter) {
    recentCounter.textContent = number;
  }

  if (recentNumber) {
    recentNumber.textContent =
      `${number} / 25`;
  }

  if (recentKicker) {
    recentKicker.textContent =
      `RECENT COLLECTION / ${number}`;
  }

  if (recentProgress) {
    recentProgress.style.width =
      `${((recentIndex + 1) / recentImages.length) * 100}%`;
  }

}


function restartRecent() {

  clearInterval(recentAuto);

  recentAuto = setInterval(() => {
    showRecent(recentIndex + 1);
  }, 5200);

}


if ($("#recentPrev")) {

  $("#recentPrev").onclick = () => {

    showRecent(recentIndex - 1);
    restartRecent();

  };

}


if ($("#recentNext")) {

  $("#recentNext").onclick = () => {

    showRecent(recentIndex + 1);
    restartRecent();

  };

}


showRecent(0);
restartRecent();



/* =========================================================
   OUR KEY PRODUCTS
   25 IMAGES: c1.jpeg → c25.jpeg
========================================================= */

const creations =
  Array.from(
    { length: 25 },
    (_, i) => `assets/c${i + 1}.jpeg`
  );


const gallery =
  Array.from(
    { length: 6 },
    (_, i) => `assets/g${i + 1}.jpeg`
  );


const track = $("#track");


if (track) {

  creations.forEach((id, i) => {

    const el =
      document.createElement("div");

    el.className = "slide";

    el.innerHTML = `
      <div
        class="slide-img"
        style="background-image:url('${id}')">
      </div>

      <div class="slide-name">
        KEY PRODUCT ${String(i + 1).padStart(2, "0")}
      </div>
    `;

    track.appendChild(el);

  });

}


if ($("#galleryGrid")) {

  gallery.forEach((id, i) => {

    const el =
      document.createElement("div");

    el.className = "g reveal";

    el.innerHTML = `
      <div
        style="background-image:url('${id}')">
      </div>
    `;

    $("#galleryGrid").appendChild(el);

  });

}


let index = 0;
let auto;


function show(n) {

  const list =
    document.querySelectorAll(".slide");

  if (!list.length || !track) return;

  index =
    (n + list.length) %
    list.length;

  track.style.transform =
    `translateX(-${index * 100}%)`;

  list.forEach((x, i) => {

    x.classList.toggle(
      "active",
      i === index
    );

  });

  if ($("#counter")) {

    $("#counter").textContent =
      String(index + 1).padStart(2, "0");

  }

  if ($("#slideTitle")) {

    $("#slideTitle").textContent =
      `KEY PRODUCT ${String(index + 1).padStart(2, "0")}`;

  }

  if ($("#progress")) {

    $("#progress").style.width =
      `${((index + 1) / 25) * 100}%`;

  }

}


function restart() {

  clearInterval(auto);

  auto = setInterval(() => {

    show(index + 1);

  }, 5200);

}


if ($("#prev")) {

  $("#prev").onclick = () => {

    show(index - 1);
    restart();

  };

}


if ($("#next")) {

  $("#next").onclick = () => {

    show(index + 1);
    restart();

  };

}


show(0);
restart();



/* =========================================================
   FAQ
========================================================= */

document.querySelectorAll(".faq").forEach(x => {

  const button =
    x.querySelector("button");

  if (!button) return;

  button.onclick = () => {

    document
      .querySelectorAll(".faq.open")
      .forEach(y => {

        if (y !== x) {
          y.classList.remove("open");
        }

      });

    x.classList.toggle("open");

  };

});



/* =========================================================
   SCROLL REVEAL
========================================================= */

const io =
  new IntersectionObserver(
    es => {

      es.forEach(e => {

        if (e.isIntersecting) {

          e.target.classList.add("visible");

          io.unobserve(e.target);

        }

      });

    },
    {
      threshold: .1
    }
  );


document
  .querySelectorAll(".reveal")
  .forEach(x => io.observe(x));



/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

document
  .querySelectorAll(".magnetic")
  .forEach(el => {

    el.addEventListener(
      "mousemove",
      e => {

        if (
          matchMedia("(hover:hover)").matches
        ) {

          const r =
            el.getBoundingClientRect();

          el.style.transform =
            `translate(${
              (e.clientX - r.left - r.width / 2) * .08
            }px,${
              (e.clientY - r.top - r.height / 2) * .08
            }px)`;

        }

      }
    );


    el.addEventListener(
      "mouseleave",
      () => {

        el.style.transform = "";

      }
    );

  });



/* =========================================================
   QUICK NAVIGATION MENU
========================================================= */

const menuButton = $("#menu");
const menuPanel = $("#menuPanel");
const menuClose = $("#menuClose");


function setMenu(open) {

  if (!menuButton || !menuPanel) return;

  menuPanel.classList.toggle(
    "open",
    open
  );

  menuButton.classList.toggle(
    "open",
    open
  );

  menuButton.setAttribute(
    "aria-expanded",
    String(open)
  );

  menuPanel.setAttribute(
    "aria-hidden",
    String(!open)
  );

  document.body.classList.toggle(
    "menu-open",
    open
  );

}


if (menuButton) {

  menuButton.onclick = () => {

    setMenu(
      !menuPanel.classList.contains("open")
    );

  };

}


if (menuClose) {

  menuClose.onclick = () => {
    setMenu(false);
  };

}


document
  .querySelectorAll(".menu-links a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => setMenu(false)
    );

  });


document.addEventListener(
  "keydown",
  e => {

    if (e.key === "Escape") {
      setMenu(false);
    }

  }
);



/* =========================================================
   LOADER
========================================================= */

let pct = 0;

const load =
  setInterval(() => {

    pct += 4;

    if ($("#loadNum")) {

      $("#loadNum").textContent =
        pct + "%";

    }

    if (pct >= 100) {

      clearInterval(load);

      setTimeout(() => {

        if ($("#loader")) {

          $("#loader")
            .classList
            .add("hide");

        }

      }, 300);

    }

  }, 35);
