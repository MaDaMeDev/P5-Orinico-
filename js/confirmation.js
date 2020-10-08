

const actualUrl = new URLSearchParams(window.location.search);

const orderId = actualUrl.get("id");


console.log(orderId);

let container = document.querySelector(".text")

let comfimation = document.createElement("p")
comfimation.textContent= "Commande  N° "+ orderId
container.appendChild(comfimation)