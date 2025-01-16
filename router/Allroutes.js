import Route from "./route.js";


//Définir ici vos routes

export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", []),
    new Route("/galerie", "La galerie", "/pages/galerie.html", [], "/js/galerie.js"),
    new Route("/signin", "connexion", "/pages/signin.html", ["disconnected"], "/js/signin.js"),
    new Route("/signup", "inscription", "/pages/signup.html", ["disconnected"], "/js/signup.js"),
    new Route("/account", "Mon compte", "/pages/account.html", ["client", "admin"]),
    new Route("/editpassword", "changer mot de passe", "/pages/editpassword.html", ["client", "admin"]),
    new Route("/allresa", "Mes reservations", "/pages/reservations/allresa.html", ["client", "admin"]),
    new Route("/reserver", "Reserver", "/pages/reservations/reserver.html", ["client"]),
];


//Le titre s'affiche comme ceci : Route.titre - websitename

export const websiteName = "Quai Antique";