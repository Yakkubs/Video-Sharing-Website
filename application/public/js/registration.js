function registrationValidation() {
    let validUsername = false;
    let validPassword = false;
    let validPasswordConfirm = false;
    document.getElementById("username").addEventListener("input", function (ev) {
        let userInput = ev.currentTarget;
        let username = userInput.value;
        const errorMessage = document.querySelector('#username-error-message');
        if (username.length >= 3 && /[a-zA-Z]/.test(username.charAt(0))) {
            userInput.classList.add("valid-text");
            userInput.classList.remove("invalid-text");
            errorMessage.style.display = 'none';
            validUsername = true;
        } else {
            userInput.classList.add("invalid-text");
            userInput.classList.remove("valid-text");
            errorMessage.textContent = 'Usernames must be at least 3 characters and only consist letters';
            errorMessage.style.display = 'block';
            validUsername = false;
        }
    });
    document.getElementById("password").addEventListener("input", function (ev) {
        let userInput = ev.currentTarget;
        let password = userInput.value;
        let upperCase = /[A-Z]/;
        let specialChar = /[/*-+!@#$^&*]/;
        let number = /[0-9]/;
        const errorMessage = document.querySelector('#password-error-message');
        if (password.length >= 8 && upperCase.test(password) && specialChar.test(password) && number.test(password)) {
            userInput.classList.add("valid-text");
            userInput.classList.remove("invalid-text");
            errorMessage.style.display = 'none';
            validPassword = true;
        } else {
            userInput.classList.add("invalid-text");
            userInput.classList.remove("valid-text");
            errorMessage.textContent = 'Password must contain at least 1 upper case letter AND 1 number and 1 of the following special characters: / * - + ! @ # $ ^ & ~ [ ]';
            errorMessage.style.display = 'block';
            validPassword = false;
        }
    });
    document.getElementById("password confirm").addEventListener("input", function (ev) {
        let pass = document.getElementById("password").value;
        let userInput = ev.currentTarget;
        let passConfirm = userInput.value;
        const errorMessage = document.querySelector('#passwordConfirm-error-message');
        if (pass === passConfirm) {
            userInput.classList.add("valid-text");
            userInput.classList.remove("invalid-text");
            errorMessage.style.display = 'none';
            validPasswordConfirm = true;
        } else {
            userInput.classList.add("invalid-text");
            userInput.classList.remove("valid-text");
            errorMessage.textContent = 'Password must match the one entered above';
            errorMessage.style.display = 'block';
            validPasswordConfirm = false;
        }
    });
    document.getElementById("registration-form").addEventListener("submit",function(ev){
        ev.preventDefault();
        const errorMessage = document.querySelector('#submit-error');
        if(validUsername === false || validPassword === false || validPasswordConfirm === false){
            errorMessage.textContent = 'Must correctly fill out all of the forms above';
            errorMessage.style.display = 'block';
            return;
        }else{
            ev.currentTarget.submit();
        }
        console.log(ev);
    });
}

window.onload = registrationValidation();
