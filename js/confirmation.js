const actualUrl = new URLSearchParams(window.location.search);

const orderId = actualUrl.get("id");

const totalCoast = actualUrl.get("price")

console.log(orderId);

// on affiche les données

let container = document.querySelector(".text");

let comfimation = document.createElement("p");
comfimation.textContent = "La commande  N° " + orderId + ", pour un montant de : "+ totalCoast+ "$" + " a bien été validée";
container.appendChild(comfimation);
localStorage.clear();
