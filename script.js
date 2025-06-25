const scroll = new LocomotiveScroll({
  el: document.querySelector('#main'),
  smooth: true
});

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

