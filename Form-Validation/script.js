const userName = document.getElementById("txtUsername");
const email = document.getElementById("txtEmail");
const pwd = document.getElementById("txtPwd");
const conPwd = document.getElementById("txtConPwd");

const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isValid = validateInput();

    if (isValid) {
        showToast("Form Submitted Successfully!", "success");
    }
});

function validateInput() {
    // Get the latest values every time the form is submitted
    const username = userName.value.trim();
    const userEmail = email.value.trim();
    const password = pwd.value.trim();
    const confirmPassword = conPwd.value.trim();

    let isValid = true;


    if (username === "") {
       showToast("Username cannot be empty", "error");
        isValid = false;
    } else if (username.length < 3) {
        onError(userName, "Username must be at least 3 characters");
        isValid = false;
    } else {
        onSuccess(userName);
    }


    if (userEmail === "") {
        onError(email, "Email cannot be empty");
        isValid = false;
    } else if (!isValidEmail(userEmail)) {
        onError(email, "Please enter a valid email address");
        isValid = false;
    } else {
        onSuccess(email);
    }

 
    if (password === "") {
        onError(pwd, "Password cannot be empty");
        isValid = false;
    } else if (password.length < 8) {
        onError(pwd, "Password must be at least 8 characters");
        isValid = false;
    } else {
        onSuccess(pwd);
    }

    if (confirmPassword === "") {
        onError(conPwd, "Confirm password cannot be empty");
        isValid = false;
    } else if (password !== confirmPassword) {
        onError(conPwd, "Passwords do not match");
        isValid = false;
    } else {
        onSuccess(conPwd);
    }

    return isValid;
}

function onSuccess(input) {

    const parent = input.parentElement;

    parent.classList.remove("error");
    parent.classList.add("success");
}

function onError(input, message) {

    const parent = input.parentElement;

    parent.classList.remove("success");
    parent.classList.add("error");

    showToast(message, "error");
}
function isValidEmail(email) {
    const emailPattern =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    return emailPattern.test(email);
}

function showToast(message, type) {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "center",
        close: true,
        stopOnFocus: true,
        style: {
            background:
                type === "success"
                    ? "linear-gradient(to right, #00b09b, #96c93d)"
                    : "linear-gradient(to right, #ff416c, #ff4b2b)"
        }
    }).showToast();
}