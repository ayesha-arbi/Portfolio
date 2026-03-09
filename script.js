const locoScroll = new LocomotiveScroll({  el: document.querySelector('#main'),
  smooth: true
});
// ── FULLSCREEN MENU ──
(function initFullscreenMenu() {
    const menu     = document.getElementById('fullscreen-menu');
    const overlay  = document.getElementById('menu-overlay');
    const content  = document.getElementById('menu-content');
    const trigger  = document.getElementById('menu-trigger');
    const closeBtn = document.getElementById('menu-close');
    const links    = Array.from(document.querySelectorAll('.menu-link'));
    const mFooter  = document.getElementById('menu-footer');

    if (!menu || !trigger) return;

    let isOpen = false;

    // set initial hidden state
    gsap.set(overlay,  { yPercent: -100 });
    gsap.set(content,  { opacity: 0 });
    gsap.set(links,    { y: "110%" });
    gsap.set(mFooter,  { opacity: 0 });

    function openMenu() {
        if (isOpen) return;
        isOpen = true;
        menu.classList.add('is-open');
        locoScroll.stop();
        gsap.set(links, { y: "110%" });

        gsap.timeline()
            .to(overlay, { yPercent: 0,  duration: 0.85, ease: "expo.inOut" })
            .to(content,  { opacity: 1,  duration: 0.2  }, "-=0.15")
            .to(links,    { y: "0%", stagger: 0.06, duration: 0.7, ease: "expo.out" }, "-=0.1")
            .to(mFooter,  { opacity: 1,  duration: 0.4  }, "-=0.3");
    }

    function closeMenu() {
        if (!isOpen) return;
        isOpen = false;

        gsap.timeline({
            onComplete() {
                menu.classList.remove('is-open');
                locoScroll.start();
                gsap.set(overlay, { yPercent: -100 });
                gsap.set(content, { opacity: 0 });
                gsap.set(mFooter, { opacity: 0 });
            }
        })
        .to([...links].reverse(), { y: "-110%", stagger: 0.04, duration: 0.35, ease: "power2.in" })
        .to(overlay, { yPercent: -100, duration: 0.7, ease: "expo.inOut" }, "-=0.1");
    }

    trigger.addEventListener('click', () => isOpen ? closeMenu() : openMenu());
    closeBtn.addEventListener('click', closeMenu);

    // clicking a link closes menu then scrolls to section
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetEl = document.getElementById(
                link.getAttribute('href').replace('#', '')
            );
            closeMenu();
            setTimeout(() => {
                if (targetEl) locoScroll.scrollTo(targetEl);
            }, 950);
        });
    });
})();

function firstPageAnim() {
  var tl = gsap.timeline();
  tl.from("#nav", {
    y: '-10',
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut
  }, 0)
    .to(".boundingelement", {
      y: 0,
      delay: -1.5,
      ease: Expo.easeInOut,
      duration: 1.5,

    },)
    .from("#herofooter", {
      y: '-10',
      delay: -1,
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut
    },)
}
function circletransform() {
  var xscale = 1;
  var yscale = 1;
  var xprevious = 0;
  var yprevious = 0;
  window.addEventListener
    ("mousemove", function (dets) {
      xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprevious);
      yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprevious);

      xprevious = dets.clientX;
      yprevious = dets.clientY;
      circlemousefollower(xscale, yscale)
    })
};


function circlemousefollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    console.log(dets.clientX, dets.clientY);
    this.document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;

  })
}


circlemousefollower();
firstPageAnim();
circletransform();



document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power1,
      top: diff - 100,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    }), 0;
  });
});

gsap.utils.toArray(".experience-item").forEach(item => {
  gsap.from(item.querySelector(".exp-details"), {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    }
  });
});

function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById("clock").textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();

document.querySelectorAll('.distort-hover').forEach(el => {
  el.setAttribute('data-text', el.textContent);

  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--x', `${x}px`);
    el.style.setProperty('--y', `${y}px`);
  });
});


const btn = document.querySelector(".magnet-btn");

btn.addEventListener("mousemove", (e) => {
  const rect = btn.getBoundingClientRect();
  const relX = e.clientX - rect.left - rect.width / 2;
  const relY = e.clientY - rect.top - rect.height / 2;

  // Make it intense by increasing multiplier
  gsap.to(btn, {
    x: relX * 0.6,
    y: relY * 0.6,
    scale: 1.1,
    duration: 0.3,
    ease: "power3.out"
  });
});

btn.addEventListener("mouseleave", () => {
  gsap.to(btn, {
    x: 0,
    y: 0,
    scale: 1,
    duration: 0.4,
    ease: "power3.out"
  });
});
document.querySelectorAll('.bento-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 16;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 16;

    gsap.to(card, {
      rotateY: x,
      rotateX: -y,
      transformPerspective: 900,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto"
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
      overwrite: "auto"
    });
  });
});
