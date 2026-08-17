document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('contactFormStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerText;

            submitBtn.disabled = true;
            submitBtn.innerText = 'Submitting...';

            formStatus.style.color = '#0b2545';
            formStatus.innerText = 'Sending your details...';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.style.color = '#10b981'; // Green
                    formStatus.innerText = 'Thank you! Your information has been submitted. We will add you to the WhatsApp group soon.';
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    formStatus.style.color = '#d90429'; // Red
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.innerText = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.innerText = 'Oops! There was a problem submitting your request.';
                    }
                }
            } catch (error) {
                formStatus.style.color = '#d90429';
                formStatus.innerText = 'Connection error. Please check your internet connection.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        });
    }
});