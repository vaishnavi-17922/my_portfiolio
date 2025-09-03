document.addEventListener('DOMContentLoaded', () => {
    // Step 3: Basic Interactivity
    
    // Toggle navigation menu
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Step 4: Interactivity for Portfolio Sections

    // Filter projects
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const projects = document.querySelectorAll('.project');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-filter');

            // Handle active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            projects.forEach(project => {
                const projectCategory = project.getAttribute('data-category');
                if (category === 'all' || projectCategory === category) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    // Lightbox for project images
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox .close');

    if (lightbox && lightboxImg && closeBtn) {
        document.querySelectorAll('.project img').forEach(image => {
            image.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = image.src;
            });
        });

        // Close lightbox
        const closeLightbox = () => {
            lightbox.style.display = 'none';
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }


    // Step 5: Form Validation
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual submission

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;

            // Reset errors
            resetError(name);
            resetError(email);
            resetError(message);

            // Validate Name
            if (name.value.trim() === '') {
                setError(name, 'Name is required.');
                isValid = false;
            }

            // Validate Email
            if (email.value.trim() === '') {
                setError(email, 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                setError(email, 'Please enter a valid email address.');
                isValid = false;
            }

            // Validate Message
            if (message.value.trim() === '') {
                setError(message, 'Message is required.');
                isValid = false;
            }

            if (isValid) {
                console.log('Form submitted successfully!');
                alert('Thank you for your message!');
                contactForm.reset();
            } else {
                console.log('Form has validation errors.');
            }
        });

        // Real-time feedback
        ['name', 'email', 'message'].forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', () => {
                    resetError(input);
                });
            }
        });
    }
});

// Helper functions for form validation
function setError(element, message) {
    const formControl = element.parentElement;
    const errorDisplay = formControl.querySelector('.error-message');
    if (errorDisplay) {
        errorDisplay.innerText = message;
        formControl.classList.add('error');
    }
}

function resetError(element) {
    const formControl = element.parentElement;
    const errorDisplay = formControl.querySelector('.error-message');
    if (errorDisplay) {
        errorDisplay.innerText = '';
        formControl.classList.remove('error');
    }
}

function isValidEmail(email) {
    // Simple regex for email validation
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}// Hamburger menu toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
if (menuToggle && nav) {
	// Show hamburger on small screens
	function handleResize() {
		if (window.innerWidth < 768) {
			menuToggle.style.display = 'block';
			nav.style.display = 'none';
		} else {
			menuToggle.style.display = 'none';
			nav.style.display = 'block';
		}
	}
	window.addEventListener('resize', handleResize);
	handleResize();
	menuToggle.addEventListener('click', () => {
		const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
		menuToggle.setAttribute('aria-expanded', !expanded);
		nav.style.display = expanded ? 'none' : 'block';
	});
}

// Smooth scrolling for nav links
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
	link.addEventListener('click', function(e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({ behavior: 'smooth' });
		}
		// Close menu on mobile after click
		if (window.innerWidth < 768 && nav) {
			nav.style.display = 'none';
			menuToggle.setAttribute('aria-expanded', 'false');
		}
	});
});

// Project filter (example: filter by category)
function filterProjects(category) {
	document.querySelectorAll('#projects article').forEach(article => {
		if (!category || article.dataset.category === category) {
			article.style.display = '';
		} else {
			article.style.display = 'none';
		}
	});
}
// Example: add filter buttons if needed
// document.getElementById('filter-all').addEventListener('click', () => filterProjects());

// Lightbox for project images
function createLightbox(imgSrc, altText) {
	const overlay = document.createElement('div');
	overlay.style.position = 'fixed';
	overlay.style.top = 0;
	overlay.style.left = 0;
	overlay.style.width = '100vw';
	overlay.style.height = '100vh';
	overlay.style.background = 'rgba(0,0,0,0.8)';
	overlay.style.display = 'flex';
	overlay.style.alignItems = 'center';
	overlay.style.justifyContent = 'center';
	overlay.style.zIndex = 1000;
	overlay.tabIndex = 0;
	const img = document.createElement('img');
	img.src = imgSrc;
	img.alt = altText;
	img.style.maxWidth = '90vw';
	img.style.maxHeight = '80vh';
	img.style.boxShadow = '0 0 20px #fff';
	overlay.appendChild(img);
	overlay.addEventListener('click', () => document.body.removeChild(overlay));
	overlay.addEventListener('keydown', e => { if (e.key === 'Escape') document.body.removeChild(overlay); });
	document.body.appendChild(overlay);
	overlay.focus();
}
document.querySelectorAll('#projects img').forEach(img => {
	img.style.cursor = 'pointer';
	img.addEventListener('click', () => createLightbox(img.src, img.alt));
});

// Contact form validation with real-time feedback
const form = document.querySelector('#contact form');
if (form) {
	const nameInput = form.querySelector('#name');
	const emailInput = form.querySelector('#email');
	const messageInput = form.querySelector('#message');

	function showError(input, message) {
		let error = input.nextElementSibling;
		if (!error || !error.classList.contains('error')) {
			error = document.createElement('span');
			error.className = 'error';
			error.style.color = 'red';
			input.parentNode.appendChild(error);
		}
		error.textContent = message;
	}
	function clearError(input) {
		let error = input.nextElementSibling;
		if (error && error.classList.contains('error')) {
			error.textContent = '';
		}
	}

	function validateName() {
		if (!nameInput.value.trim()) {
			showError(nameInput, 'Name is required.');
			return false;
		}
		clearError(nameInput);
		return true;
	}
	function validateEmail() {
		const email = emailInput.value.trim();
		const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
		if (!email) {
			showError(emailInput, 'Email is required.');
			return false;
		} else if (!valid) {
			showError(emailInput, 'Enter a valid email.');
			return false;
		}
		clearError(emailInput);
		return true;
	}
	function validateMessage() {
		if (!messageInput.value.trim()) {
			showError(messageInput, 'Message is required.');
			return false;
		}
		clearError(messageInput);
		return true;
	}

	nameInput.addEventListener('input', validateName);
	emailInput.addEventListener('input', validateEmail);
	messageInput.addEventListener('input', validateMessage);

	form.addEventListener('submit', function(e) {
		let valid = validateName() & validateEmail() & validateMessage();
		if (!valid) {
			e.preventDefault();
		} else {
			alert('Thank you for your message!');
		}
	});
}
