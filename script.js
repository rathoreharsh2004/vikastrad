"use strict";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

/* =========================================================
   CONFIG
========================================================= */
const CONFIG = {
  phone: "+917696292100",
  whatsapp: "+917696292100",
  instagram: "https://www.instagram.com/vikastradingcompan/"
};

/* =========================================================
   HERO
========================================================= */
const heroScenes = [
  {
    file: "hero-exterior.jpeg",
    caption: "Exterior / Entrance",
    tag: "A first impression"
  },
  {
    file: "hero-door.jpeg",
    caption: "Entrance / Reveal",
    tag: "Step inside"
  },
  {
    file: "s1.jpeg",
    caption: "Living Room",
    tag: "PVC Wallpaper • Marble Sheets • Flooring"
  },
  {
    file: "s2.jpeg",
    caption: "Bedroom",
    tag: "Wallpaper • Wall Panels • Flooring"
  },
  {
    file: "s3.jpeg",
    caption: "Office / Workspace",
    tag: "Wall Panels • Surface Finishes"
  },
  {
    file: "s4.jpeg",
    caption: "Surface Detail",
    tag: "Texture • Detail • Finish"
  }
];

const heroEls = $$(".hero-scene");
const heroCaption = $("#heroCaption");
const heroTag = $("#heroTag");
const heroNo = $("#heroNo");

let heroIndex = 0;

function setHero(n) {
  if (!heroEls.length) return;

  heroIndex = (n + heroEls.length) % heroEls.length;

  heroEls.forEach((el, i) => {
    el.classList.toggle("active", i === heroIndex);

    const scene = heroScenes[i];

    if (scene && scene.file) {
      el.style.backgroundImage =
        `linear-gradient(0deg,rgba(0,0,0,.45),transparent 65%),url("${scene.file}")`;
    }
  });

  const scene = heroScenes[heroIndex];

  if (heroCaption) {
    heroCaption.textContent = scene.caption;
  }

  if (heroTag) {
    heroTag.textContent = scene.tag;
  }

  if (heroNo) {
    heroNo.textContent = String(heroIndex + 1).padStart(2, "0");
  }
}

setHero(0);

setInterval(() => {
  setHero(heroIndex + 1);
}, 9500);


/* =========================================================
   TRENDING COLLECTION
   5 CATEGORIES
   One card per category
   Manual image navigation
========================================================= */

const trendCards = $$(".trend-card");

function createTrendState(card) {
  const prefix = card.dataset.prefix;
  const count = Number(card.dataset.count || 0);

  return {
    card,
    prefix,
    count,
    index: 0,
    image: card.querySelector(".trend-image"),
    current: card.querySelector(".trend-current")
  };
}

const trendStates = trendCards.map(createTrendState);

function trendSrc(state, index) {
  return `assets/${state.prefix}${index + 1}.jpeg`;
}

function showTrend(state, nextIndex) {
  if (!state || !state.count || !state.image) {
    return;
  }

  state.index =
    (nextIndex + state.count) % state.count;

  const src = trendSrc(state, state.index);

  state.image.style.opacity = "0";

  const preloaded = new Image();

  preloaded.onload = () => {
    state.image.style.backgroundImage =
      `url("${src}")`;

    requestAnimationFrame(() => {
      state.image.style.opacity = "1";
    });
  };

  preloaded.onerror = () => {
    state.image.style.opacity = "1";
    console.warn(`Image not found: ${src}`);
  };

  preloaded.src = src;

  if (state.current) {
    state.current.textContent =
      String(state.index + 1).padStart(2, "0");
  }
}


/* Initialize Trending Cards */
trendStates.forEach((state) => {
  showTrend(state, 0);

  const prev =
    state.card.querySelector(".trend-prev");

  const next =
    state.card.querySelector(".trend-next");

  if (prev) {
    prev.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      showTrend(
        state,
        state.index - 1
      );
    });
  }

  if (next) {
    next.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      showTrend(
        state,
        state.index + 1
      );
    });
  }
});


/* =========================================================
   TRENDING COLLECTION TOUCH SWIPE
========================================================= */

trendStates.forEach((state) => {
  let startX = 0;
  let startY = 0;

  state.card.addEventListener(
    "touchstart",
    (event) => {
      const touch =
        event.changedTouches[0];

      startX = touch.clientX;
      startY = touch.clientY;
    },
    { passive: true }
  );

  state.card.addEventListener(
    "touchend",
    (event) => {
      const touch =
        event.changedTouches[0];

      const dx =
        touch.clientX - startX;

      const dy =
        touch.clientY - startY;

      if (
        Math.abs(dx) > 45 &&
        Math.abs(dx) > Math.abs(dy)
      ) {
        showTrend(
          state,
          state.index +
            (dx < 0 ? 1 : -1)
        );
      }
    },
    { passive: true }
  );
});


/* =========================================================
   AFTER INSTALLATION
   15 IMAGES
   Manual slider
   Changing text
========================================================= */

const afterImages = Array.from(
  { length: 15 },
  (_, i) =>
    `assets/af${i + 1}.jpeg`
);

const afterContent = [
  {
    title: "THE FINISHED DIFFERENCE",
    text: "A surface becomes truly convincing when it settles into the finished space. See how the final installation brings depth, texture and character together."
  },
  {
    title: "DETAIL IN PLACE",
    text: "Once installed, the material begins working with the architecture around it — creating a finish that feels intentional rather than added on."
  },
  {
    title: "TEXTURE COMES ALIVE",
    text: "Light, shadow and texture interact differently after installation, giving the surface a richer visual presence throughout the day."
  },
  {
    title: "A STRONGER WALL",
    text: "The right wall finish can change the mood of an entire room, turning an ordinary surface into a clear design feature."
  },
  {
    title: "WARMTH UNDERFOOT",
    text: "Flooring completes the visual foundation of a space, adding warmth, rhythm and a more finished sense of proportion."
  },
  {
    title: "THE STATEMENT SURFACE",
    text: "Installed as a feature, the right surface becomes the detail people notice first — bold, refined and full of character."
  },
  {
    title: "CLEAN ARCHITECTURAL LINES",
    text: "Panels and louvers create rhythm and structure, helping the finished interior feel more composed and contemporary."
  },
  {
    title: "MATERIAL & LIGHT",
    text: "A finished surface changes with natural and artificial light, revealing tones and textures that are easy to miss in a sample."
  },
  {
    title: "THE ROOM FEELS COMPLETE",
    text: "Installation is where individual products become one visual language — walls, floors and details working together."
  },
  {
    title: "DESIGNED TO BELONG",
    text: "Good finishes should feel connected to the room, complementing furniture, lighting and architecture instead of competing with them."
  },
  {
    title: "FROM SAMPLE TO SPACE",
    text: "The finished result shows what a material can really do when scale, placement and surrounding elements are considered together."
  },
  {
    title: "A MORE DISTINCTIVE MOOD",
    text: "Pattern, colour and texture can shift the personality of a space instantly once the final installation is in place."
  },
  {
    title: "THE DETAIL LAYER",
    text: "Small material decisions become visible at full scale, adding the final layer of character to a carefully considered interior."
  },
  {
    title: "BUILT FOR THE VISUAL",
    text: "A premium finish earns its place by improving the whole composition — making the space feel sharper, richer and more resolved."
  },
  {
    title: "THE FINAL REVEAL",
    text: "The last step is seeing everything together: material, light, architecture and detail forming one finished visual statement."
  }
];

const afterImage = $("#afterImage");
const afterTitle = $("#afterTitle");
const afterText = $("#afterText");
const afterCounter = $("#afterCounter");
const afterNumber = $("#afterNumber");
const afterKicker = $("#afterKicker");
const afterProgress = $("#afterProgress");

const afterPrev = $("#afterPrev");
const afterNext = $("#afterNext");

let afterIndex = 0;

function showAfter(n) {
  afterIndex =
    (n + afterImages.length) %
    afterImages.length;

  const data =
    afterContent[afterIndex] ||
    afterContent[0];

  const src =
    afterImages[afterIndex];

  if (afterImage) {
    afterImage.style.opacity = "0";

    const img = new Image();

    img.onload = () => {
      afterImage.src = src;

      afterImage.alt =
        `Vikas Trading Company - ${data.title}`;

      requestAnimationFrame(() => {
        afterImage.style.opacity = "1";
      });
    };

    img.onerror = () => {
      afterImage.style.opacity = "1";

      console.warn(
        `Image not found: ${src}`
      );
    };

    img.src = src;
  }

  if (afterTitle) {
    afterTitle.textContent =
      data.title;
  }

  if (afterText) {
    afterText.textContent =
      data.text;
  }

  const number =
    String(afterIndex + 1)
      .padStart(2, "0");

  if (afterCounter) {
    afterCounter.textContent =
      number;
  }

  if (afterNumber) {
    afterNumber.textContent =
      `${number} / ${afterImages.length}`;
  }

  if (afterKicker) {
    afterKicker.textContent =
      `AFTER INSTALLATION / ${number}`;
  }

  if (afterProgress) {
    afterProgress.style.width =
      `${((afterIndex + 1) /
        afterImages.length) * 100}%`;
  }
}


/* After Installation Buttons */

if (afterPrev) {
  afterPrev.addEventListener(
    "click",
    () => {
      showAfter(afterIndex - 1);
    }
  );
}

if (afterNext) {
  afterNext.addEventListener(
    "click",
    () => {
      showAfter(afterIndex + 1);
    }
  );
}

showAfter(0);


/* =========================================================
   AFTER INSTALLATION TOUCH SWIPE
========================================================= */

const afterVisual =
  document.querySelector(
    ".after-visual"
  );

if (afterVisual) {
  let startX = 0;
  let startY = 0;

  afterVisual.addEventListener(
    "touchstart",
    (event) => {
      const touch =
        event.changedTouches[0];

      startX = touch.clientX;
      startY = touch.clientY;
    },
    { passive: true }
  );

  afterVisual.addEventListener(
    "touchend",
    (event) => {
      const touch =
        event.changedTouches[0];

      const dx =
        touch.clientX - startX;

      const dy =
        touch.clientY - startY;

      if (
        Math.abs(dx) > 45 &&
        Math.abs(dx) > Math.abs(dy)
      ) {
        showAfter(
          afterIndex +
            (dx < 0 ? 1 : -1)
        );
      }
    },
    { passive: true }
  );
}


/* =========================================================
   HEADER / MOBILE MENU
========================================================= */

const header = $("#header");
const menuButton = $("#menu");
const menuPanel = $("#menuPanel");
const menuClose = $("#menuClose");

if (header) {
  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle(
        "scrolled",
        window.scrollY > 50
      );
    },
    { passive: true }
  );
}

function setMenu(open) {
  if (!menuButton || !menuPanel) {
    return;
  }

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
  menuButton.addEventListener(
    "click",
    () => {
      const isOpen =
        menuPanel &&
        menuPanel.classList.contains(
          "open"
        );

      setMenu(!isOpen);
    }
  );
}

if (menuClose) {
  menuClose.addEventListener(
    "click",
    () => setMenu(false)
  );
}

$$(".menu-links a").forEach(
  (link) => {
    link.addEventListener(
      "click",
      () => setMenu(false)
    );
  }
);

document.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Escape") {
      setMenu(false);
    }
  }
);


/* =========================================================
   FAQ
========================================================= */

$$(".faq").forEach((item) => {
  const button =
    item.querySelector("button");

  if (!button) {
    return;
  }

  button.addEventListener(
    "click",
    () => {
      $$(".faq.open").forEach(
        (openItem) => {
          if (openItem !== item) {
            openItem.classList.remove(
              "open"
            );
          }
        }
      );

      item.classList.toggle(
        "open"
      );
    }
  );
});


/* =========================================================
   SCROLL REVEAL
========================================================= */

if (
  "IntersectionObserver" in window
) {
  const observer =
    new IntersectionObserver(
      (entries) => {
        entries.forEach(
          (entry) => {
            if (
              entry.isIntersecting
            ) {
              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          }
        );
      },
      {
        threshold: 0.1
      }
    );

  $$(".reveal").forEach(
    (element) => {
      observer.observe(element);
    }
  );
} else {
  $$(".reveal").forEach(
    (element) => {
      element.classList.add(
        "visible"
      );
    }
  );
}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

if (
  window.matchMedia(
    "(hover:hover)"
  ).matches
) {
  $$(".magnetic").forEach(
    (element) => {
      element.addEventListener(
        "mousemove",
        (event) => {
          const rect =
            element.getBoundingClientRect();

          const x =
            (event.clientX -
              rect.left -
              rect.width / 2) *
            0.08;

          const y =
            (event.clientY -
              rect.top -
              rect.height / 2) *
            0.08;

          element.style.transform =
            `translate(${x}px,${y}px)`;
        }
      );

      element.addEventListener(
        "mouseleave",
        () => {
          element.style.transform = "";
        }
      );
    }
  );
}


/* =========================================================
   CURSOR GLOW
========================================================= */

const glow = $("#glow");

if (
  glow &&
  window.matchMedia(
    "(hover:hover)"
  ).matches
) {
  window.addEventListener(
    "mousemove",
    (event) => {
      glow.style.opacity = "1";
      glow.style.left =
        `${event.clientX}px`;
      glow.style.top =
        `${event.clientY}px`;
    }
  );
}


/* =========================================================
   LOADER
   0% → 100%
   Then website appears
========================================================= */

(function startLoader() {
  const loader = $("#loader");
  const loadNum = $("#loadNum");

  if (!loader || !loadNum) {
    return;
  }

  let pct = 0;

  loadNum.textContent = "0%";

  const interval =
    setInterval(() => {
      pct = Math.min(
        100,
        pct + 4
      );

      loadNum.textContent =
        `${pct}%`;

      if (pct >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          loader.classList.add(
            "hide"
          );

          document.body.classList.remove(
            "menu-open"
          );
        }, 300);
      }
    }, 45);
})();
