const $ = selector => document.querySelector(selector);


/* ========================================================= */
/* ================= TRENDING COLLECTION =================== */
/* ================================================= */

const trendingCollections = [

    {
        name: "GI METAL DOORS",
        images: Array.from(
            {length:15},
            (_,i) => `assets/g${i+1}.jpeg`
        )
    },

    {
        name: "CHARCOAL LOUVERS",
        images: Array.from(
            {length:10},
            (_,i) => `assets/l${i+1}.jpeg`
        )
    },

    {
        name: "MARBLE SHEETS",
        images: Array.from(
            {length:14},
            (_,i) => `assets/m${i+1}.jpeg`
        )
    },

    {
        name: "FLOORING",
        images: Array.from(
            {length:3},
            (_,i) => `assets/f${i+1}.jpeg`
        )
    },

    {
        name: "WALLPAPERS",
        images: Array.from(
            {length:8},
            (_,i) => `assets/w${i+1}.jpeg`
        )
    }

];


const trendingIndexes = [
    0,
    0,
    0,
    0,
    0
];


function showTrending(category,index){

    const collection = trendingCollections[category];

    if(!collection) return;

    const total = collection.images.length;

    index = (index + total) % total;

    trendingIndexes[category] = index;


    const imageElement =
        $(`#trendImage${category}`);

    const counterElement =
        $(`#trendCounter${category}`);


    imageElement.style.opacity = "0";


    setTimeout(() => {

        imageElement.style.backgroundImage =
            `url("${collection.images[index]}")`;

        imageElement.style.opacity = "1";

    },120);


    counterElement.textContent =
        String(index + 1).padStart(2,"0");

}


/* Initial trending images */

trendingCollections.forEach((collection,index) => {

    showTrending(index,0);

});


/* Trending manual controls */

document
    .querySelectorAll(".trend-prev")
    .forEach(button => {

        button.addEventListener("click",() => {

            const category =
                Number(button.dataset.category);

            showTrending(
                category,
                trendingIndexes[category] - 1
            );

        });

    });


document
    .querySelectorAll(".trend-next")
    .forEach(button => {

        button.addEventListener("click",() => {

            const category =
                Number(button.dataset.category);

            showTrending(
                category,
                trendingIndexes[category] + 1
            );

        });

    });


/* ========================================================= */
/* ================= TRENDING TOUCH SWIPE ================== */
/* ========================================================= */

document
    .querySelectorAll(".trend-image-wrap")
    .forEach((area,index) => {

        let startX = 0;
        let endX = 0;


        area.addEventListener(
            "touchstart",
            event => {

                startX =
                    event.touches[0].clientX;

            },
            {passive:true}
        );


        area.addEventListener(
            "touchend",
            event => {

                endX =
                    event.changedTouches[0].clientX;

                const difference =
                    startX - endX;


                if(Math.abs(difference) < 45){
                    return;
                }


                if(difference > 0){

                    showTrending(
                        index,
                        trendingIndexes[index] + 1
                    );

                }else{

                    showTrending(
                        index,
                        trendingIndexes[index] - 1
                    );

                }

            },
            {passive:true}
        );

    });


/* ========================================================= */
/* ================= AFTER INSTALLATION ==================== */
/* ========================================================= */

const installationImages =
    Array.from(
        {length:15},
        (_,i) => `assets/af${i+1}.jpeg`
    );


const installationContent = [

    {
        title:"DETAILS THAT COMPLETE THE SPACE.",
        text:"The right finish brings the entire design together. Explore completed spaces where material, texture and installation work as one."
    },

    {
        title:"FROM MATERIAL TO EXPERIENCE.",
        text:"A carefully selected surface can completely change the atmosphere of a room and create a more refined visual experience."
    },

    {
        title:"DESIGNED TO MAKE AN IMPRESSION.",
        text:"Every installation is an opportunity to add character, depth and a distinctive visual identity to the space."
    },

    {
        title:"SURFACES WITH PURPOSE.",
        text:"Texture and finish are not just decorative choices. They help define how a space feels, functions and is remembered."
    },

    {
        title:"A FINISH WORTH NOTICING.",
        text:"Premium materials become truly meaningful when they are installed with precision and complement the architecture around them."
    },

    {
        title:"THE RIGHT DETAIL CHANGES EVERYTHING.",
        text:"From walls to doors and decorative surfaces, the right product can become the defining detail of an entire interior."
    },

    {
        title:"BUILT AROUND YOUR VISION.",
        text:"Our collection gives designers, architects and homeowners the freedom to create spaces that feel individual and considered."
    },

    {
        title:"TEXTURE. DEPTH. CHARACTER.",
        text:"Layered materials and carefully selected finishes create visual depth while keeping the overall design sophisticated."
    },

    {
        title:"A SPACE COMES ALIVE.",
        text:"Once installation is complete, the relationship between material, lighting and architecture becomes part of the final story."
    },

    {
        title:"CRAFTED FOR MODERN SPACES.",
        text:"Contemporary interiors demand materials that feel current while remaining visually strong for years to come."
    },

    {
        title:"MATERIAL MEETS ARCHITECTURE.",
        text:"The best installations work with the architecture rather than against it, creating a seamless relationship between product and space."
    },

    {
        title:"DESIGN IN EVERY SURFACE.",
        text:"Walls, floors, doors and decorative elements can all become part of a cohesive design language when chosen thoughtfully."
    },

    {
        title:"BEYOND THE ORDINARY.",
        text:"Distinctive materials help create spaces that feel different from standard interiors and leave a stronger visual impression."
    },

    {
        title:"THE FINAL LOOK MATTERS.",
        text:"A successful installation is where product selection, proportion, texture and craftsmanship come together."
    },

    {
        title:"MAKING SPACES MEMORABLE.",
        text:"Our goal is simple — bring distinctive products into spaces where they can create a lasting impression."
    }

];


let installationIndex = 0;


const installationImage =
    $("#installationImage");

const installationNumber =
    $("#installationNumber");

const installationTitle =
    $("#installationTitle");

const installationText =
    $("#installationText");

const installationProgress =
    $("#installationProgress");


function showInstallation(index){

    installationIndex =
        (index + installationImages.length)
        % installationImages.length;


    installationImage.style.opacity = "0";


    setTimeout(() => {

        installationImage.style.backgroundImage =
            `url("${installationImages[installationIndex]}")`;

        installationImage.style.opacity = "1";

    },150);


    installationNumber.textContent =
        `${String(installationIndex + 1).padStart(2,"0")} / 15`;


    const content =
        installationContent[installationIndex];


    installationTitle.textContent =
        content.title;

    installationText.textContent =
        content.text;


    installationProgress.style.width =
        `${((installationIndex + 1) / installationImages.length) * 100}%`;

}


showInstallation(0);


/* Installation buttons */

$("#installationPrev").onclick = () => {

    showInstallation(
        installationIndex - 1
    );

};


$("#installationNext").onclick = () => {

    showInstallation(
        installationIndex + 1
    );

};


/* Installation swipe */

const installationArea =
    document.querySelector(".installation-image-area");


let installationStartX = 0;


installationArea.addEventListener(
    "touchstart",
    event => {

        installationStartX =
            event.touches[0].clientX;

    },
    {passive:true}
);


installationArea.addEventListener(
    "touchend",
    event => {

        const endX =
            event.changedTouches[0].clientX;

        const difference =
            installationStartX - endX;


        if(Math.abs(difference) < 45){
            return;
        }


        if(difference > 0){

            showInstallation(
                installationIndex + 1
            );

        }else{

            showInstallation(
                installationIndex - 1
            );

        }

    },
    {passive:true}
);


/* ========================================================= */
/* ================= FAQ ACCORDION ========================= */
/* ========================================================= */

document
    .querySelectorAll(".faq")
    .forEach(item => {

        const button =
            item.querySelector("button");


        button.onclick = () => {

            document
                .querySelectorAll(".faq.open")
                .forEach(openItem => {

                    if(openItem !== item){

                        openItem.classList.remove("open");

                    }

                });


            item.classList.toggle("open");

        };

    });


/* ========================================================= */
/* ================= SCROLL REVEAL ========================== */
/* ========================================================= */

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold:.1
        }

    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        revealObserver.observe(element);

    });


/* ========================================================= */
/* ================= MAGNETIC BUTTONS ======================= */
/* ========================================================= */

document
    .querySelectorAll(".magnetic")
    .forEach(element => {


        element.addEventListener(
            "mousemove",
            event => {

                if(
                    !matchMedia(
                        "(hover:hover)"
                    ).matches
                ){
                    return;
                }


                const rect =
                    element.getBoundingClientRect();


                const x =
                    (event.clientX -
                    rect.left -
                    rect.width / 2) * .08;


                const y =
                    (event.clientY -
                    rect.top -
                    rect.height / 2) * .08;


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

    });


/* ========================================================= */
/* ================= MENU ================================== */
/* ========================================================= */

$("#menu").onclick = () => {

    const firstLink =
        document.querySelector(".header nav a");

    if(firstLink){

        firstLink.click();

    }

};


/* ========================================================= */
/* ================= LOADER ================================ */
/* ========================================================= */

let pct = 0;


const load =
    setInterval(() => {

        pct += 4;

        $("#loadNum").textContent =
            pct + "%";


        if(pct >= 100){

            clearInterval(load);


            setTimeout(() => {

                $("#loader")
                    .classList
                    .add("hide");

            },300);

        }

    },35);
