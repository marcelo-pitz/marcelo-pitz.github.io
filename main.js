particlesJS("particles-js", {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: ["#ffb3b3", "#d94f4f", "#a83232"],
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000",
      },
    },
    opacity: {
      value: 0.7,
      random: true,
      anim: {
        enable: true,
        speed: 0.8,
        opacity_min: 0.3,
        sync: false,
      },
    },
    size: {
      value: 4,
      random: true,
      anim: {
        enable: true,
        speed: 4,
        size_min: 0.5,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#d94f4f",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2.5,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 180,
        line_linked: {
          opacity: 0.7,
        },
      },
      bubble: {
        distance: 250,
        size: 8,
        duration: 2,
        opacity: 0.8,
        speed: 3,
      },
      repulse: {
        distance: 120,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});
