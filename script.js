const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);


/* =========================================================
   TRENDING COLLECTION
   Each card has its own independent slider.
========================================================= */

const trendingCollections = {

  gi: Array.from(
    {length:15},
    (_,i) => `assets/g${i+1}.jpeg`
  ),

  louvers: Array.from(
    {length:10},
    (_,i) => `assets/l${i+1}.jpeg`
  ),

  marble: [
    "assets/m1.jpeg",
    "assets/w2.jpeg",
    "assets/w3.jpeg",
    "assets/w4.jpeg",
    "assets/w5.jpeg",
    "assets/w6.jpeg",
    "assets/m6.jpeg",
    "assets/m7.jpeg",
    "assets/m8.jpeg",
    "assets/m9.jpeg",
    "assets/m10.jpeg",
    "assets/m12.jpeg",
    "assets/m13.jpeg"
  ],

  flooring: Array.from(
    {length:3},
    (_,i) => `assets/f${i+1}.jpeg`
  ),

  wallpapers: [
    "assets/w1.jpeg",
    "assets/m11.jpeg",
    "assets/m2.jpeg",
    "assets/m3.jpeg",
    "assets/m4.jpeg",
    "assets/m5.jpeg",
    "assets/m14.jpeg",
    "assets/w7.jpeg",
    "assets/w8.jpeg"
  ]

};


$$(".trend-card").forEach(card => {

  const category = card.dataset.category;
  const images = trendingCollections[category];

  if(!images || !images.length) return;

  const image = card.querySelector(".trend-image");
  const current = card.querySelector(".trend-current");
  const total = card.querySelector(".trend-counter span:last-child");

  const prev = card.querySelector(".trend-prev");
  const next = card.querySelector(".trend-next");

  let index = 0;
  let startX = 0;
  let startY = 0;
  let dragging = false;


  function render(){

    image.style.opacity = "0";

    setTimeout(() => {

      image.style.backgroundImage = `url("${images[index]}")`;
      current.textContent = String(index + 1).padStart(2,"0");
      if(total) {
        total.textContent = `/ ${images.length}`;
      }

      image.style.opacity = "1";

    },140);

  }


  function show(n){

    index = (n + images.length) % images.length;
    render();

  }


  prev.addEventListener("click", e => {

    e.stopPropagation();
    show(index - 1);

  });


  next.addEventListener("click", e => {

    e.stopPropagation();
    show(index + 1);

  });


  /* Touch swipe */

  card.querySelector(".trend-image-wrap")
    .addEventListener("touchstart", e => {

      const touch = e.changedTouches[0];

      startX = touch.clientX;
      startY = touch.clientY;
      dragging = true;

    }, {passive:true});


  card.querySelector(".trend-image-wrap")
    .addEventListener("touchend", e => {

      if(!dragging) return;

      const touch = e.changedTouches[0];

      const diffX = touch.clientX - startX;
      const diffY = touch.clientY - startY;

      dragging = false;

      if(Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)){

        if(diffX < 0){
          show(index + 1);
        }else{
          show(index - 1);
        }

      }

    }, {passive:true});


  /* Mouse drag */

  card.querySelector(".trend-image-wrap")
    .addEventListener("mousedown", e => {

      startX = e.clientX;
      startY = e.clientY;
      dragging = true;

    });


  card.querySelector(".trend-image-wrap")
    .addEventListener("mouseup", e => {

      if(!dragging) return;

      const diffX = e.clientX - startX;
      const diffY = e.clientY - startY;

      dragging = false;

      if(Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)){

        if(diffX < 0){
          show(index + 1);
        }else{
          show(index - 1);
        }

      }

    });


  card.querySelector(".trend-image-wrap")
    .addEventListener("mouseleave", () => {

      dragging = false;

    });


  render();

});


/* =========================================================
   COMPLETED PROJECTS / AFTER INSTALLATION
========================================================= */

const completedProjects = Array.from(
  {length:15},
  (_,i) => `assets/af${i+1}.jpeg`
);

const projectTaglines = [
  "Luxury Marble Installation",
  "Premium Italian Marble",
  "Elegant Living Space",
  "Modern Stone Flooring",
  "Timeless Natural Stone",
  "Premium Wall Cladding",
  "Luxury Interior Finish",
  "Statement Marble Design",
  "Elegant Residential Project",
  "Premium Commercial Finish",
  "Contemporary Stone Installation",
  "Classic Marble Elegance",
  "Refined Interior Detailing",
  "Signature Stone Project",
  "Luxury Surface Design"
];


const projectImage = $("#projectMainImage");
const projectCounter = $("#projectCounter");
const projectTitle = $("#projectTitle");
const projectProgress = $("#projectProgress");

const projectPrev = $("#projectPrev");
const projectNext = $("#projectNext");

let projectIndex = 0;
let projectStartX = 0;
let projectStartY = 0;
let projectDragging = false;


function renderProject(){

  if(!projectImage) return;

  projectImage.style.opacity = "0";


  setTimeout(() => {

    projectImage.style.backgroundImage =
      `url("${completedProjects[projectIndex]}")`;

    projectCounter.textContent =
      String(projectIndex + 1).padStart(2,"0");

    // Safe fallback check if array index is within bounds
    projectTitle.textContent =
      projectTaglines[projectIndex] || `PROJECT ${String(projectIndex + 1).padStart(2,"0")}`;

    projectProgress.style.width =
      `${((projectIndex + 1) / completedProjects.length) * 100}%`;

    projectImage.style.opacity = "1";

  },160);

}


function showProject(n){

  projectIndex =
    (n + completedProjects.length) %
    completedProjects.length;

  renderProject();

}


if(projectPrev){

  projectPrev.onclick = () => {
    showProject(projectIndex - 1);
  };

}


if(projectNext){

  projectNext.onclick = () => {
    showProject(projectIndex + 1);
  };

}


/* Project swipe */

if($(".projects-showcase")){

  const showcase = $(".projects-showcase");


  showcase.addEventListener("touchstart", e => {

    const touch = e.changedTouches[0];

    projectStartX = touch.clientX;
    projectStartY = touch.clientY;

    projectDragging = true;

  }, {passive:true});


  showcase.addEventListener("touchend", e => {

    if(!projectDragging) return;

    const touch = e.changedTouches[0];

    const diffX = touch.clientX - projectStartX;
    const diffY = touch.clientY - projectStartY;

    projectDragging = false;

    if(
      Math.abs(diffX) > 45 &&
      Math.abs(diffX) > Math.abs(diffY)
    ){

      if(diffX < 0){
        showProject(projectIndex + 1);
      }else{
        showProject(projectIndex - 1);
      }

    }

  }, {passive:true});


  showcase.addEventListener("mousedown", e => {

    projectStartX = e.clientX;
    projectStartY = e.clientY;

    projectDragging = true;

  });


  showcase.addEventListener("mouseup", e => {

    if(!projectDragging) return;

    const diffX = e.clientX - projectStartX;
    const diffY = e.clientY - projectStartY;

    projectDragging = false;

    if(
      Math.abs(diffX) > 45 &&
      Math.abs(diffX) > Math.abs(diffY)
    ){

      if(diffX < 0){
        showProject(projectIndex + 1);
      }else{
        showProject(projectIndex - 1);
      }

    }

  });


  showcase.addEventListener("mouseleave", () => {
    projectDragging = false;
  });

}


showProject(0);


/* =========================================================
   FAQ ACCORDION
========================================================= */

$$(".faq").forEach(item => {

  const button = item.querySelector("button");

  button.onclick = () => {

    $$(".faq.open").forEach(other => {

      if(other !== item){
        other.classList.remove("open");
      }

    });

    item.classList.toggle("open");

  };

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold:.1
  }
);


$$(".reveal").forEach(element => {

  revealObserver.observe(element);

});


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

$$(".magnetic").forEach(el => {

  el.addEventListener("mousemove", e => {

    if(!matchMedia("(hover:hover)").matches) return;

    const rect = el.getBoundingClientRect();

    const x =
      (e.clientX - rect.left - rect.width / 2) * .08;

    const y =
      (e.clientY - rect.top - rect.height / 2) * .08;

    el.style.transform =
      `translate(${x}px,${y}px)`;

  });


  el.addEventListener("mouseleave", () => {

    el.style.transform = "";

  });

});


/* =========================================================
   MOBILE MENU DROPDOWN
========================================================= */

const menuBtn = $("#menu");

if(menuBtn){
  // Create dropdown popup element dynamically
  const dropdown = document.createElement("div");
  dropdown.className = "mobile-menu-dropdown";
  dropdown.innerHTML = `
    <div class="menu-dropdown-content">
      <a href="#about">ABOUT</a>
      <a href="#trending">COLLECTION</a>
      <a href="#projects">PROJECTS</a>
      <a href="#products">PRODUCTS</a>
      <a href="#reviews">REVIEWS</a>
      <a href="#faq">FAQ</a>
      <a href="#contact">CONTACT</a>
    </div>
  `;
  document.body.appendChild(dropdown);

  // Add CSS styles dynamically for the dropdown overlay menu
  const styleTag = document.createElement("style");
  styleTag.textContent = `
    .mobile-menu-dropdown {
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      height: 100vh;
      background: rgba(8, 8, 8, 0.96);
      backdrop-filter: blur(12px);
      z-index: 150;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    .mobile-menu-dropdown.active {
      opacity: 1;
      visibility: visible;
    }
    .menu-dropdown-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
    }
    .menu-dropdown-content a {
      font-family: 'Oswald', sans-serif;
      font-size: 28px;
      color: #fff;
      text-decoration: none;
      letter-spacing: 0.05em;
      transition: color 0.2s ease;
    }
    .menu-dropdown-content a:hover {
      color: #f4d800;
    }
  `;
  document.head.appendChild(styleTag);

  menuBtn.onclick = (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("active");
  };

  // Close dropdown when a section link inside is clicked
  dropdown.querySelectorAll("a").forEach(link => {
    link.onclick = () => {
      dropdown.classList.remove("active");
    };
  });

  // Close when clicking outside content
  dropdown.onclick = (e) => {
    if(e.target === dropdown) {
      dropdown.classList.remove("active");
    }
  };
}


/* =========================================================
   LOADER
========================================================= */

let pct = 0;

const load = setInterval(() => {

  pct += 4;

  const loadNum = $("#loadNum");

  if(loadNum){
    loadNum.textContent = pct + "%";
  }


  if(pct >= 100){

    clearInterval(load);

    setTimeout(() => {

      const loader = $("#loader");

      if(loader){
        loader.classList.add("hide");
      }

    },300);

  }

},35);
