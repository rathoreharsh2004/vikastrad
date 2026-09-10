const $ = s => document.querySelector(s);

/* =========================================================
   SAFE MANUAL IMAGE SLIDER
   ========================================================= */

function createManualSlider({
  imageId,
  prevId,
  nextId,
  counterId,
  progressId,
  total,
  prefix,
  images
}) {
  const image = document.getElementById(imageId);
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);
  const counter = document.getElementById(counterId);
  const progress = document.getElementById(progressId);

  if (!image || !prev || !next || !images.length) return;

  let index = 0;

  function update(n) {
    index = (n + images.length) % images.length;

    const src = images[index];

    image.style.opacity = "0";

    const preload = new Image();

    preload.onload = () => {
      image.src = src;
      image.alt = `${prefix} ${index + 1}`;
      image.style.opacity = "1";
    };

    preload.onerror = () => {
      image.src = src;
      image.alt = `${prefix} ${index + 1}`;
      image.style.opacity = "1";
    };

    preload.src = src;

    if (counter) {
      counter.textContent =
        `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    }

    if (progress) {
      progress.style.width =
        `${((index + 1) / images.length) * 100}%`;
    }
  }

  prev.addEventListener("click", () => {
    update(index - 1);
  });

  next.addEventListener("click", () => {
    update(index + 1);
  });

  update(0);
}


/* =========================================================
   OUR TRENDING COLLECTION
   ========================================================= */

/* GI METAL DOOR — g1 to g15 */
createManualSlider({
  imageId: "giImage",
  prevId: "giPrev",
  nextId: "giNext",
  counterId: "giCounter",
  progressId: "giProgress",
  total: 15,
  prefix: "GI Metal Door",
  images: Array.from(
    { length: 15 },
    (_, i) => `assets/g${i + 1}.jpeg`
  )
});


/* CHARCOAL LOUVERS — l1 to l10 */
createManualSlider({
  imageId: "lImage",
  prevId: "lPrev",
  nextId: "lNext",
  counterId: "lCounter",
  progressId: "lProgress",
  total: 10,
  prefix: "Charcoal Louvers",
  images: Array.from(
    { length: 10 },
    (_, i) => `assets/l${i + 1}.jpeg`
  )
});


/* MARBLE SHEETS — m1 to m14 */
createManualSlider({
  imageId: "mImage",
  prevId: "mPrev",
  nextId: "mNext",
  counterId: "mCounter",
  progressId: "mProgress",
  total: 14,
  prefix: "Marble Sheets",
  images: Array.from(
    { length: 14 },
    (_, i) => `assets/m${i + 1}.jpeg`
  )
});


/* FLOORING — f1 to f3 */
createManualSlider({
  imageId: "fImage",
  prevId: "fPrev",
  nextId: "fNext",
  counterId: "fCounter",
  progressId: "fProgress",
  total: 3,
  prefix: "Flooring",
  images: Array.from(
    { length: 3 },
    (_, i) => `assets/f${i + 1}.jpeg`
  )
});


/* WALLPAPERS — w1 to w8 */
createManualSlider({
  imageId: "wImage",
  prevId: "wPrev",
  nextId: "wNext",
  counterId: "wCounter",
  progressId: "wProgress",
  total: 8,
  prefix: "Wallpapers",
  images: Array.from(
    { length: 8 },
    (_, i) => `assets/w${i + 1}.jpeg`
  )
});


/* =========================================================
   AFTER INSTALLATION
   af1 to af15
   Manual slider only
   ========================================================= */

const installationImages = Array.from(
  { length: 15 },
  (_, i) => `assets/af${i + 1}.jpeg`
);


/* Text changes according to image */
const installationContent = [
  [
    "FINISHED WITH CHARACTER.",
    "A finished installation shows how material, proportion and detail come together to complete the space."
  ],
  [
    "DETAIL MEETS SPACE.",
    "Once installed, the right surface becomes part of the architecture rather than simply sitting on it."
  ],
  [
    "A REFINED FINISH.",
    "Thoughtful installation brings texture, balance and a polished visual language into the room."
  ],
  [
    "DESIGNED TO BELONG.",
    "The final result is where product selection and installation work together to create a cohesive interior."
  ],
  [
    "FROM PRODUCT TO PRESENCE.",
    "A carefully installed finish adds depth and gives the surrounding space a stronger identity."
  ],
  [
    "THE FINAL TRANSFORMATION.",
    "See how a selected product changes the atmosphere once it is installed and integrated with the space."
  ],
  [
    "SURFACE, SCALE, DETAIL.",
    "Good installation lets the material work at the right scale, revealing its texture and character."
  ],
  [
    "MADE FOR MODERN SPACES.",
    "Clean lines and distinctive materials come together for a contemporary finished look."
  ],
  [
    "TEXTURE IN CONTEXT.",
    "The installed surface shows its true character when it interacts with light, furniture and architecture."
  ],
  [
    "A STRONGER FIRST IMPRESSION.",
    "From feature walls to entrances, the finished installation turns an idea into a visible statement."
  ],
  [
    "MATERIAL THAT COMPLETES.",
    "The right finish can connect separate elements and make the overall space feel intentionally designed."
  ],
  [
    "CRAFTED FOR IMPACT.",
    "Installation is the final layer that turns a premium material into a memorable design feature."
  ],
  [
    "ELEVATED EVERYDAY SPACES.",
    "Distinctive products bring an everyday interior closer to the look and feel of a design-led space."
  ],
  [
    "THE DETAIL THAT STAYS.",
    "Small choices in material and finish can create a lasting impression once the work is complete."
  ],
  [
    "THE FINISHED VIEW.",
    "A complete installation reveals the full relationship between material, architecture and atmosphere."
  ]
];


const installationImage = $("#installationImage");
const installationPrev = $("#installationPrev");
const installationNext = $("#installationNext");
const installationTitle = $("#installationTitle");
const installationDescription = $("#installationDescription");
const installationCounter = $("#installationCounter");
const installationKicker = $("#installationKicker");
const installationProgress = $("#installationProgress");

let installationIndex = 0;


function showInstallation(n) {

  if (
    !installationImage ||
    !installationPrev ||
    !installationNext
  ) {
    return;
  }

  installationIndex =
    (n + installationImages.length) %
    installationImages.length;

  const data =
    installationContent[installationIndex] ||
    installationContent[0];

  const src =
    installationImages[installationIndex];

  installationImage.style.opacity = "0";

  const preload = new Image();

  preload.onload = () => {
    installationImage.src = src;
    installationImage.style.opacity = "1";
  };

  preload.onerror = () => {
    installationImage.src = src;
    installationImage.style.opacity = "1";
  };

  preload.src = src;


  if (installationTitle) {
    installationTitle.textContent = data[0];
  }

  if (installationDescription) {
    installationDescription.textContent = data[1];
  }

  if (installationKicker) {
    installationKicker.textContent =
      `AFTER INSTALLATION / ${String(
        installationIndex + 1
      ).padStart(2, "0")}`;
  }

  if (installationCounter) {
    installationCounter.textContent =
      `${String(installationIndex + 1).padStart(2, "0")} / 15`;
  }

  if (installationProgress) {
    installationProgress.style.width =
      `${((installationIndex + 1) /
        installationImages.length) * 100}%`;
  }
}


if (installationPrev) {
  installationPrev.addEventListener(
    "click",
    () => showInstallation(installationIndex - 1)
  );
}


if (installationNext) {
  installationNext.addEventListener(
    "click",
    () => showInstallation(installationIndex + 1)
  );
}


showInstallation(0);


/* =========================================================
   FAQ ACCORDION
   ========================================================= */

document.querySelectorAll(".faq").forEach(item => {

  const button = item.querySelector("button");

  if (!button) return;

  button.addEventListener("click", () => {

    document.querySelectorAll(".faq.open").forEach(other => {

      if (other !== item) {
        other.classList.remove("open");
      }

    });

    item.classList.toggle("open");

  });

});


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealItems =
  document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

  const io = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          io.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.1
    }
  );


  revealItems.forEach(element => {
    io.observe(element);
  });

} else {

  revealItems.forEach(element => {
    element.classList.add("visible");
  });

}


/* =========================================================
   MAGNETIC BUTTONS
   ========================================================= */

document.querySelectorAll(".magnetic").forEach(element => {

  element.addEventListener("mousemove", event => {

    if (
      !window.matchMedia("(hover:hover)").matches
    ) {
      return;
    }

    const rect =
      element.getBoundingClientRect();

    const moveX =
      (event.clientX -
        rect.left -
        rect.width / 2) * 0.08;

    const moveY =
      (event.clientY -
        rect.top -
        rect.height / 2) * 0.08;

    element.style.transform =
      `translate(${moveX}px, ${moveY}px)`;

  });


  element.addEventListener(
    "mouseleave",
    () => {
      element.style.transform = "";
    }
  );

});


/* =========================================================
   MENU
   ========================================================= */

const menuButton = $("#menu");
const menuPanel = $("#menuPanel");
const menuClose = $("#menuClose");


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

      setMenu(
        !menuPanel.classList.contains("open")
      );

    }
  );

}


if (menuClose) {

  menuClose.addEventListener(
    "click",
    () => setMenu(false)
  );

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
  event => {

    if (event.key === "Escape") {
      setMenu(false);
    }

  }
);


/* =========================================================
   ROBUST LOADER
   0% → 100% → WEBSITE
   ========================================================= */

(function initLoader() {

  const loader = $("#loader");
  const loadNum = $("#loadNum");

  if (!loader) {
    return;
  }

  let percentage = 0;
  let finished = false;


  function finishLoader() {

    if (finished) {
      return;
    }

    finished = true;

    percentage = 100;

    if (loadNum) {
      loadNum.textContent = "100%";
    }

    setTimeout(() => {

      loader.classList.add("hide");

    }, 350);

  }


  const timer = setInterval(() => {

    percentage =
      Math.min(96, percentage + 4);

    if (loadNum) {
      loadNum.textContent =
        percentage + "%";
    }


    if (percentage >= 96) {

      clearInterval(timer);


      if (document.readyState === "complete") {

        finishLoader();

      } else {

        window.addEventListener(
          "load",
          finishLoader,
          { once: true }
        );

      }


      /*
       Safety fallback:
       loader can never remain stuck.
      */
      setTimeout(
        finishLoader,
        1800
      );

    }

  }, 35);


  /*
   If everything loads quickly,
   still complete the loader.
  */
  window.addEventListener(
    "load",
    finishLoader,
    { once: true }
  );

})();
