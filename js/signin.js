



const mailinput = document.getElementById("exampleInputEmail1");
const PasswordInput = document.getElementById("exampleInputPassword1");
const btnsignin = document.getElementById("btnSignin");
const formSignin = document.getElementById("signinForm");




btnsignin.addEventListener("click", checkCredentials);

function checkCredentials() {

    let dataForm = new FormData(formSignin);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({

        "username": dataForm.get("email"),
        "password": dataForm.get("Password")
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    }

    fetch("http://127.0.0.1:8001/api/login", requestOptions)
        .then(response => {

            if (response.ok) {
                return response.json();



            }

            else {
                mailinput.classList.add("is-invalid")
                mailinput.classList.remove("is-valid")
            }
        })
        .then(result => {

            console.log(result);
            const token = result.apiToken;
            setToken(token);
            setCookie(roleCookieName, result.roles[0], 7);
            window.location.replace("/");


        })
        .catch((error) => console.error(error));






}