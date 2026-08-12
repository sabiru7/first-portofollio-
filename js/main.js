/* =========================================================
   PORTFOLIO ENGINE
   Semua interaksi website berada di file ini.
========================================================= */


"use strict";


/* =========================================================
   BASIC
========================================================= */

const $ = (selector) =>
  document.querySelector(selector);

const $$ = (selector) =>
  document.querySelectorAll(selector);


/* =========================================================
   YEAR
========================================================= */

const year = $("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = $("#menu-button");
const mobileMenu = $("#mobile-menu");

if (menuButton && mobileMenu) {

  menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("hidden");

    const opened =
      !mobileMenu.classList.contains("hidden");

    menuButton.textContent =
      opened ? "CLOSE" : "MENU";

  });


  $$("#mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

      mobileMenu.classList.add("hidden");

      menuButton.textContent = "MENU";

    });

  });

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor = $("#cursor");
const cursorRing = $("#cursor-ring");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


if (cursor && cursorRing) {

  window.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.transform =
      `translate3d(
        ${mouseX - 4}px,
        ${mouseY - 4}px,
        0
      )`;

  });


  function animateCursor() {

    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursorRing.style.transform =
      `translate3d(
        ${ringX - 20}px,
        ${ringY - 20}px,
        0
      )`;

    requestAnimationFrame(animateCursor);

  }

  animateCursor();


  $$("#cursor, #cursor-ring");

  $$("a, button, .project-card").forEach(element => {

    element.addEventListener("mouseenter", () => {

      cursor.classList.add("cursor-hover");

      cursorRing.classList.add("cursor-ring-hover");

    });


    element.addEventListener("mouseleave", () => {

      cursor.classList.remove("cursor-hover");

      cursorRing.classList.remove("cursor-ring-hover");

    });

  });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
  $$("[data-reveal]");


const revealObserver =
  new IntersectionObserver(

    (entries, observer) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("revealed");

        observer.unobserve(entry.target);

      });

    },

    {
      threshold: 0.12
    }

  );


revealElements.forEach(element => {

  revealObserver.observe(element);

});


/* =========================================================
   PROJECT FILTER
========================================================= */

const filterButtons =
  $$(".filter-button");

const projectCards =
  $$(".project-card");


filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    const selectedFilter =
      button.dataset.filter;


    filterButtons.forEach(btn => {

      btn.classList.remove("active");

    });


    button.classList.add("active");


    projectCards.forEach(card => {

      const category =
        card.dataset.category;


      if (
        selectedFilter === "all" ||
        category === selectedFilter
      ) {

        card.classList.remove("project-hidden");

      } else {

        card.classList.add("project-hidden");

      }

    });

  });

});


/* =========================================================
   3D TILT
========================================================= */

const tiltCards =
  $$(".project-card");


tiltCards.forEach(card => {

  card.addEventListener("mousemove", event => {

    if (window.innerWidth < 768) {
      return;
    }


    const rect =
      card.getBoundingClientRect();


    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;


    const centerX =
      rect.width / 2;

    const centerY =
      rect.height / 2;


    const rotateX =
      ((y - centerY) / centerY) * -4;

    const rotateY =
      ((x - centerX) / centerX) * 4;


    card.style.transform =
      `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.015)
      `;

  });


  card.addEventListener("mouseleave", () => {

    card.style.transform =
      "";

  });

});


/* =========================================================
   MAGNETIC BUTTON
========================================================= */

const magneticButtons =
  $$(".magnetic");


magneticButtons.forEach(button => {

  button.addEventListener("mousemove", event => {

    if (window.innerWidth < 768) {
      return;
    }


    const rect =
      button.getBoundingClientRect();


    const x =
      event.clientX -
      rect.left -
      rect.width / 2;


    const y =
      event.clientY -
      rect.top -
      rect.height / 2;


    button.style.transform =
      `
      translate(
        ${x * 0.12}px,
        ${y * 0.12}px
      )
      `;

  });


  button.addEventListener("mouseleave", () => {

    button.style.transform =
      "";

  });

});


/* =========================================================
   GLITCH TEXT
========================================================= */

const glitchElement =
  $("[data-glitch]");


if (glitchElement) {

  const originalText =
    glitchElement.textContent;


  const characters =
    "!<>-_\\/[]{}—=+*^?#";


  function glitch() {

    let iteration = 0;


    const interval =
      setInterval(() => {

        glitchElement.textContent =
          originalText
            .split("")
            .map((character, index) => {

              if (index < iteration) {
                return originalText[index];
              }

              return characters[
                Math.floor(
                  Math.random() *
                  characters.length
                )
              ];

            })
            .join("");


        iteration += 0.5;


        if (iteration >= originalText.length) {

          clearInterval(interval);

          glitchElement.textContent =
            originalText;

        }

      }, 40);

  }


  setTimeout(glitch, 1000);

  setInterval(glitch, 6000);

}


/* =========================================================
   COMMAND PALETTE
========================================================= */

const commandPalette =
  $("#command-palette");

const commandInput =
  $("#command-input");


function openCommandPalette() {

  if (!commandPalette) {
    return;
  }

  commandPalette.classList.remove("hidden");

  document.body.style.overflow =
    "hidden";


  if (commandInput) {

    setTimeout(() => {

      commandInput.focus();

    }, 50);

  }

}


function closeCommandPalette() {

  if (!commandPalette) {
    return;
  }

  commandPalette.classList.add("hidden");

  document.body.style.overflow =
    "";

}


document.addEventListener("keydown", event => {

  if (
    (event.ctrlKey || event.metaKey) &&
    event.key.toLowerCase() === "k"
  ) {

    event.preventDefault();

    openCommandPalette();

  }


  if (event.key === "Escape") {

    closeCommandPalette();

  }

});


if (commandPalette) {

  commandPalette.addEventListener(
    "click",
    event => {

      if (
        event.target === commandPalette
      ) {

        closeCommandPalette();

      }

    }
  );

}


/* =========================================================
   COMMAND SEARCH
========================================================= */

const commandItems =
  $$(".command-item");


if (commandInput) {

  commandInput.addEventListener(
    "input",
    () => {

      const query =
        commandInput.value
          .toLowerCase()
          .trim();


      commandItems.forEach(item => {

        const text =
          item.textContent
            .toLowerCase();


        item.style.display =
          text.includes(query)
            ? "flex"
            : "none";

      });

    }
  );

}


/* =========================================================
   CLOSE COMMAND WHEN CLICKING LINK
========================================================= */

commandItems.forEach(item => {

  item.addEventListener("click", () => {

    closeCommandPalette();

  });

});


/* =========================================================
   SMOOTH SCROLL
========================================================= */

$$('a[href^="#"]').forEach(link => {

  link.addEventListener("click", event => {

    const targetId =
      link.getAttribute("href");


    if (
      !targetId ||
      targetId === "#"
    ) {
      return;
    }


    const target =
      document.querySelector(targetId);


    if (!target) {
      return;
    }


    event.preventDefault();


    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  });

});


/* =========================================================
   KONAMI / EASTER EGG
========================================================= */

let secretCode = "";

const secretWord =
  "matrix";


document.addEventListener("keydown", event => {

  secretCode +=
    event.key.toLowerCase();


  if (secretCode.length > 30) {

    secretCode =
      secretCode.slice(-30);

  }


  if (
    secretCode.includes(secretWord)
  ) {

    activateMatrixMode();

    secretCode = "";

  }

});


function activateMatrixMode() {

  document.body.classList.add(
    "matrix-mode"
  );


  setTimeout(() => {

    document.body.classList.remove(
      "matrix-mode"
    );

  }, 3000);

}


/* =========================================================
   PAGE LOADED
========================================================= */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "page-loaded"
    );

  }
);