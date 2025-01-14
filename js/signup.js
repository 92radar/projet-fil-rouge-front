// implementer le js de ma page
alert("coucou");


const inputNom = document.getElementById("NomInput");
const inputPrenom = document.getElementById("PrenomInput");
const inputEmail = document.getElementById("EmailInput");
const inputpassword = document.getElementById("PasswordInput");
const inputvalidation = document.getElementById("ValidatePasswordInput");
const btnvalidation = document.getElementById("btn-validationInscription");
const formInscription = document.getElementById("formulaireInscription");


inputNom.addEventListener("keyup", validateForm);
inputPrenom.addEventListener("keyup", validateForm);
inputEmail.addEventListener("keyup", validateForm);
inputpassword.addEventListener("keyup", validateForm);
inputvalidation.addEventListener("keyup", validateForm);
btnvalidation.addEventListener("click", inscrireUtilisateur);


function validateForm() {
    const NomOK = validateRequired(inputNom);
    const PrenomOK = validateRequired(inputPrenom);
    const EmailOK = validateMail(inputEmail);
    const PasswordOK = validatePassword(inputpassword);
    const validationPasswordOK = validateConfirmationPassword(inputpassword, inputvalidation);

    if (NomOK && PrenomOK && EmailOK && PasswordOK && validationPasswordOK) {
        btnvalidation.disabled = false;

    }
    else {
        btnvalidation.disabled = true;


    }


}

function validateMail(input) {
    //definir mon regex

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (mailUser.match(emailRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;




    }


}
function validateConfirmationPassword(inputPwd, inputConfirmPwd) {
    if (inputPwd.value == inputConfirmPwd.value) {
        inputConfirmPwd.classList.add("is-valid");
        inputConfirmPwd.classList.remove("is-invalid");
        return true;
    }
    else {
        inputConfirmPwd.classList.add("is-invalid");
        inputConfirmPwd.classList.remove("is-valid");
        return false;


    }
}

function validatePassword(input) {
    // definition de mon regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    const passwordUser = input.value;
    if (passwordUser.match(passwordRegex)) {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;

    }
    else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;

    }
}


function validateRequired(input) {
    if (input.value != '') {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;

    }
    else {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        return false;


    }
}

function inscrireUtilisateur() {

    let dataForm = new FormData(formInscription);


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "firstName": dataForm.get("Nom"),
        "lastName": dataForm.get("Prenom"),
        "email": dataForm.get("Email"),
        "password": dataForm.get("Password")
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://127.0.0.1:8001/api/registration", requestOptions)
        .then(response => {

            if (response.ok) {
                return response.json();



            }

            else {
                alert("cette adress mail existe deja");
            }
        })
        .then(result => {
            alert("Bravo " + dataForm.get("Prenom") + ", vous etes maintenant inscrit, vous pouvez vous connecter");

            document.location.href = "/signin";

        })
        .catch((error) => console.error(error));
}