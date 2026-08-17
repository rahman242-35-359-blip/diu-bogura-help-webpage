document.addEventListener('DOMContentLoaded', function () {
    const helpForm = document.getElementById('helpForm');
    const formStatus = document.getElementById('formStatus');

    if (helpForm) {
        helpForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // পেজ রিলোড হওয়া বন্ধ করবে

            // বাটন স্টেট এবং ইউজারকে মেসেজ সেন্ডিং আপডেট দেখাবে
            const submitBtn = helpForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerText;
            
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';
            
            formStatus.style.color = '#0b2545';
            formStatus.innerText = 'Sending your message...';

            const formData = new FormData(helpForm);

            try {
                // Formspree-তে ডাটা পোস্ট পাঠানো
                const response = await fetch(helpForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.style.color = '#2e7d32'; // Green Color
                    formStatus.innerText = 'Thank you! Your message has been sent successfully.';
                    helpForm.reset(); // ফর্মের ফিল্ডগুলো ক্লিয়ার করে দেবে
                } else {
                    const data = await response.json();
                    formStatus.style.color = '#d90429'; // Red Color
                    
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.innerText = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.innerText = 'Oops! There was a problem submitting your form. Please try again.';
                    }
                }
            } catch (error) {
                formStatus.style.color = '#d90429';
                formStatus.innerText = 'Connection error. Please check your internet connection and try again.';
            } finally {
                // বাটনের লেখা আগের অবস্থায় ফেরত আনা
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        });
    }
});