const tokenCookieName = "accesstoken";
const signoutbtn = document.getElementById("signout-btn");
const roleCookieName = "role";


signoutbtn.addEventListener("click", signout);
getInfoUser();


function signout() {
    eraseCookie(tokenCookieName);
    eraseCookie(roleCookieName);
    window.location.reload();


}

function getrole() {
    return getCookie(roleCookieName);
}
function setToken(token) {
    setCookie(tokenCookieName, token, 7);

}

function getToken() {
    return getCookie(tokenCookieName);

}
function setCookie(name, value, days) {

    var expires = "";

    if (days) {

        var date = new Date();

        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

        expires = "; expires=" + date.toUTCString();

    }

    document.cookie = name + "=" + (value || "") + expires + "; path=/";

}

function getCookie(name) {

    var nameEQ = name + "=";

    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {

        var c = ca[i];

        while (c.charAt(0) == ' ') c = c.substring(1, c.length);

        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);

    }

    return null;

}

function eraseCookie(name) {

    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function isConnected() {

    if (getToken() == null || getToken == undefined) {

        return false;

    }

    else {

        return true;

    }

}
function showAndHideElementsForRoles() {
    const UserConnected = isConnected();
    const role = getrole();


    let allElementsToEdit = document.querySelectorAll('[data-show]');

    allElementsToEdit.forEach(element => {
        switch (element.dataset.show) {
            case 'disconnected':
                if (UserConnected) {
                    element.classList.add("d-none");
                }
                break;
            case 'connected':
                if (!UserConnected) {
                    element.classList.add("d-none");
                }
                break;
            case 'admin':
                if (!UserConnected || role != "admin") {
                    element.classList.add("d-none");
                }
                break;
            case 'client':
                if (!UserConnected || role != "client") {
                    element.classList.add("d-none");
                    break;

                }
        }

    })
}
function getInfoUser() {


    const myHeaders = new Headers();
    myHeaders.append("X-AUTH-token", getToken());

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch("http://127.0.0.1:8001/api/account/me", requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                console.log("impossible de recuperer les données de l'utilisateur");
            }

        })
        .then(result => {
            return (result);

        })
        .catch(error => {
            console.error("erreur lors de la recuperation des information utilisateur", error);
        });


}