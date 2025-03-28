document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("mailingListForm");
    const formError = document.getElementById("formError");
    const formSuccess = document.getElementById("formSuccess");
    const submitButton = document.getElementById("submit_button");

    if (submitButton) {
        submitButton.addEventListener("click", function (event) {
            let valid = true;

            // Name validation
            const name = document.getElementById("name");
            if (!name.checkValidity()) {
                valid = false;
            } 

            // Email validation
            const email = document.getElementById("email");
            if (!email.checkValidity()) {
                valid = false;
            } 

            // Phone validation (optional, but must be 10 digits if filled)
            const phone = document.getElementById("phone");
            if (phone.value.trim() !== "") {
                const phoneRegex = /^[0-9]{10}$/;
                if (!phoneRegex.test(phone.value)) {
                    valid = false;
                } 
            }

            // Zip code validation (optional, but must be 5 digits if filled)
            const zipCode = document.getElementById("zipCode");
            if (zipCode.value.trim() !== "") {
                const zipRegex = /^[0-9]{5}$/;
                if (!zipRegex.test(zipCode.value)) {
                    valid = false;
                } else {
                }
            }

            // If form is valid, process submission
            if (valid) {
                // Collect form data
                const formData = {
                    name: name.value.trim(),
                    email: email.value.trim(),
                    smsConsent: document.getElementById("smsConsent").checked,
                    phone: phone.value.trim() || null,
                    zipCode: zipCode.value.trim() || null
                };

                console.log("Form submitted:", formData);
                
                form.reset();
                formSuccess.textContent = "Thank you for joining our mailing list!";
                
            } else {
                formError.textContent = "Please correct the errors in the form.";
            }
        });
    }
});