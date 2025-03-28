// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.getElementById("mailingListForm");
//     const formError = document.getElementById("formError");
//     const formSuccess = document.getElementById("formSuccess");
//     const submitButton = document.getElementById("submit_button");

//     if (submitButton) {
//         submitButton.addEventListener("click", function (event) {
//             let valid = true;

//             // Name validation
//             const name = document.getElementById("name");
//             if (!name.checkValidity()) {
//                 valid = false;
//             } 

//             // Email validation
//             const email = document.getElementById("email");
//             if (!email.checkValidity()) {
//                 valid = false;
//             } 

//             // Phone validation (optional, but must be 10 digits if filled)
//             const phone = document.getElementById("phone");
//             if (phone.value.trim() !== "") {
//                 const phoneRegex = /^[0-9]{10}$/;
//                 if (!phoneRegex.test(phone.value)) {
//                     valid = false;
//                 } 
//             }

//             // Zip code validation (optional, but must be 5 digits if filled)
//             const zipCode = document.getElementById("zipCode");
//             if (zipCode.value.trim() !== "") {
//                 const zipRegex = /^[0-9]{5}$/;
//                 if (!zipRegex.test(zipCode.value)) {
//                     valid = false;
//                 } else {
//                 }
//             }

//             // If form is valid, process submission
//             if (valid) {
//                 // Collect form data
//                 const formData = {
//                     name: name.value.trim(),
//                     email: email.value.trim(),
//                     smsConsent: document.getElementById("smsConsent").checked,
//                     phone: phone.value.trim() || null,
//                     zipCode: zipCode.value.trim() || null
//                 };

//                 console.log("Form submitted:", formData);
                
//                 form.reset();
//                 formSuccess.textContent = "Thank you for joining our mailing list!";
                
//             } else {
//                 formError.textContent = "Please correct the errors in the form.";
//             }
//         });
//     }
// });


$(document).ready(function() {
    $('#submit_button').on('click', function(event) {
        
        let valid = true;

        // Name validation
        const name = $('#name');
        if (!name[0].checkValidity()) {
            valid = false;
        }

        // Email validation
        const email = $('#email');
        if (!email[0].checkValidity()) {
            valid = false;
        }

        // Phone validation (optional, but must be 10 digits if filled)
        const phone = $('#phone');
        if (phone.val().trim() !== "") {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone.val())) {
                valid = false;
            } 
        }

        // Zip code validation (optional, but must be 5 digits if filled)
        const zipCode = $('#zipCode');
        if (zipCode.val().trim() !== "") {
            const zipRegex = /^[0-9]{5}$/;
            if (!zipRegex.test(zipCode.val())) {
                valid = false;
            }
        }

        // If form is valid, process submission
        if (valid) {
            // Collect form data
            const formData = {
                name: name.val().trim(),
                email: email.val().trim(),
                smsConsent: $('#smsConsent').is(':checked'),
                phone: phone.val().trim() || null,
                zipCode: zipCode.val().trim() || null
            };

            console.log("Form submitted:", formData);
            
            $('#mailingListForm')[0].reset();
            $('#formSuccess').text("Thank you for joining our mailing list!");
            
        } else {
            $('#formError').text("Please correct the errors in the form.");
        }
    });
});