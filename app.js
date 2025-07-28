const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	const scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled');
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.remove('active');
		mobile_menu.classList.remove('active');
	});
});


/*Particles javascript code*/

/* Otherwise just put the config content (json): */

/* ---- particles.js config ---- */

function initParticles() {
	let particleSettings = {
		particles: {
			number: {
				value: 70, 
				density: {
					enable: true,
					value_area: 800
				}
			},
			color: {
				value: "#ffffff"
			},
			shape: {
				type: "circle"
			},
			opacity: {
				value: 0.5
			},
			size: {
				value: 3,
				random: true
			},
			line_linked: {
				enable: true,
				distance: 150,
				color: "#ffffff",
				opacity: 0.4,
				width: 1
			},
			move: {
				enable: true,
				speed: 6,
				direction: "none",
				random: false,
				straight: false,
				out_mode: "out",
				bounce: false
			}
		},
		interactivity: {
			detect_on: "canvas",
			events: {
				onhover: {
					enable: true,
					mode: "grab"
				},
				onclick: {
					enable: true,
					mode: "push"
				},
				resize: true
			},
			modes: {
				grab: {
					distance: 170,
					line_linked: {
						opacity: 1
					}
				}
			}
		},
		retina_detect: true
	};

	// Adjust particle settings based on screen size
	if (window.innerWidth < 768) {  // Small screens
		particleSettings.particles.number.value = 100;
		particleSettings.particles.size.value = 3;
		particleSettings.particles.move.speed = 5;
	} else if (window.innerWidth < 1024) { // Medium screens
		particleSettings.particles.number.value = 125;
		particleSettings.particles.size.value = 3;
		particleSettings.particles.move.speed = 5;
	} else { // Large screens
		particleSettings.particles.number.value = 150;
		particleSettings.particles.size.value = 3;
		particleSettings.particles.move.speed = 5;
	}

	// Initialize particles with the updated settings
	particlesJS("particles-js", particleSettings);
}

// Initialize particles on page load
window.onload = initParticles;

// Reinitialize particles on window resize
let currentWidth = window.innerWidth;

window.addEventListener("resize", () => {
  if (window.innerWidth !== currentWidth) {
    currentWidth = window.innerWidth;
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      initParticles();
    }, 300);
  }
});

// Enable click-to-copy for contact items
document.querySelectorAll('.contact-item').forEach(item => {
	item.style.cursor = 'pointer';
	item.title = 'Click to copy';

	const h2 = item.querySelector('.contact-info h2');

	item.addEventListener('click', () => {
		if (!h2) return;

		const originalHTML = h2.innerHTML;
		const text = h2.innerText;

		navigator.clipboard.writeText(text).then(() => {
			h2.innerHTML = '<span style="color: black;">Copied!</span>';
			setTimeout(() => {
				h2.innerHTML = originalHTML;
			}, 1500);
		}).catch(err => {
			console.error('Failed to copy text: ', err);
		});
	});
});
  
// Enable click-to-copy on contact info
document.querySelectorAll('.contact-item').forEach(item => {
	item.style.cursor = 'pointer';
	item.title = 'Click to copy';

	const h2 = item.querySelector('.contact-info h2');
	let isCooldown = false;

	item.addEventListener('click', () => {
		if (!h2 || isCooldown) return;

		const originalHTML = h2.innerHTML;
		const text = h2.innerText;

		navigator.clipboard.writeText(text).then(() => {
			isCooldown = true;

			const feedbackSpan = document.createElement('span');
			feedbackSpan.textContent = 'Copied!';
			feedbackSpan.classList.add('copied-feedback');
			h2.innerHTML = ''; // Clear h2
			h2.appendChild(feedbackSpan);

			// Trigger animation
			setTimeout(() => {
				feedbackSpan.classList.add('show');
			}, 10);

			setTimeout(() => {
				h2.innerHTML = originalHTML;
				isCooldown = false;
			}, 1500);
		}).catch(err => {
			console.error('Failed to copy text: ', err);
		});
	});
});
