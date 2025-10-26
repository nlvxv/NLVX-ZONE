// Telegram Bot API Configuration
const BOT_TOKEN = '8229949103:AAFkPhK87mJtTDQ7zZS9qA17KKWW9127_5g';
const CHAT_ID = '6402487270';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

// --- Custom Modal Logic ---
function showModal(title, message, isError = false ) {
    const modalOverlay = document.getElementById('custom-modal-overlay');
    const modalTitle = modalOverlay.querySelector('.modal-title');
    const modalMessage = document.getElementById('modal-message');

    modalTitle.textContent = title;
    modalMessage.textContent = message;

    if (isError) {
        modalTitle.style.color = 'red';
    } else {
        modalTitle.style.color = '';
    }

    modalOverlay.style.display = 'flex';
}

function hideModal() {
    document.getElementById('custom-modal-overlay').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const modalCloseButton = document.getElementById('modal-close-button');
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', hideModal);
    }
    
    const modalOverlay = document.getElementById('custom-modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target.id === 'custom-modal-overlay') {
                hideModal();
            }
        });
    }
    
    // --- Form Submission Logic ---
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Disable button and show sending status
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Construct the message text with improved HTML formatting
            const now = new Date();
            const sentAt = now.toLocaleString('en-GB', { 
                year: 'numeric', month: 'short', day: '2-digit', 
                hour: '2-digit', minute: '2-digit', hour12: false 
            });

            // --- UPDATED MESSAGE FORMAT (without <pre> tag) ---
            const text = `
📬 <b>New Message from NLVXZONE Portfolio</b>
--------------------------------------
👤 <b>Name:</b>
${name}

📧 <b>Email:</b>
<a href="mailto:${email}">${email}</a>

✉️ <b>Message:</b>
${message}
--------------------------------------
🕒 <b>Sent At:</b> ${sentAt} (GMT)
            `.trim();

            // Send message to Telegram
            fetch(TELEGRAM_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: text,
                    parse_mode: 'HTML' 
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    showModal('Success!', 'Message sent successfully! You will receive a response soon.');
                    contactForm.reset();
                } else {
                    console.error('Telegram API Error:', data);
                    showModal('Error!', 'Failed to send message. Please try again later or contact me directly via email.', true);
                }
            })
            .catch(error => {
                console.error('Fetch Error:', error);
                showModal('Error!', 'An error occurred. Please check your internet connection or try again later.', true);
            })
            .finally(() => {
                // Re-enable button and restore text
                submitButton.textContent = 'SEND MESSAGE';
                submitButton.disabled = false;
            });
        });
    }

    // Simple scroll animation for navigation links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	    anchor.addEventListener('click', function (e) {
	        e.preventDefault();
	
	        const targetId = this.getAttribute('href').substring(1);
	        const targetElement = document.getElementById(targetId);
	
	        if (targetElement) {
	            targetElement.scrollIntoView({
	                behavior: 'smooth'
	            });
	        }
	    });
	});
	
	// --- Scroll Animation (Intersection Observer) Logic ---
	const observerOptions = {
	    root: null,
	    rootMargin: '0px',
	    threshold: 0.1 
	};
	
	const observer = new IntersectionObserver((entries, observer) => {
	    entries.forEach(entry => {
	        if (entry.isIntersecting) {
	            entry.target.classList.add('fade-in');
	            entry.target.classList.remove('animate-fade-in-up');
	            observer.unobserve(entry.target);
	        }
	    });
	}, observerOptions);
	
	document.querySelectorAll('.animate-fade-in-up').forEach(element => {
	    observer.observe(element);
	});
});
