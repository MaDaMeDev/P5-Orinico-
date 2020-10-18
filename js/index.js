// création de la methode fetch pour se connecter à l'api
const callApi = async function () {
  try {
    let response = await fetch("http://localhost:3000/api/teddies");
    if (response.ok) {
      let data = await response.json();
      console.log(data);

      // Mise en place de la template accueil
      // si la réponse de l'api est ok on creer la template pour inclure les valeurs récuperer
      data.forEach((value) => {
        console.log(value);
        let article = document.createElement("article");
        document.querySelector(".products").appendChild(article);
        article.classList.add("card", "col-lg-4", "col-md-6", "mb-3");

        let img = document.createElement("img");
        img.classList.add("card-img-top", "img-fluid");
        img.setAttribute("src", `${value.imageUrl}`);
        article.appendChild(img);

        let cardBody = document.createElement("section");
        article.appendChild(cardBody);
        cardBody.classList.add("card-body");

        let title = document.createElement("h3");
        cardBody.appendChild(title);
        title.classList.add("card-title");
        title.textContent = `${value.name}`;

        let price = document.createElement("p");
        cardBody.appendChild(price);
        price.classList.add("card-text");
        price.textContent = `${value.price}$`;

        let desc = document.createElement("p");
        cardBody.appendChild(desc);
        desc.classList.add("card-text");
        desc.textContent = value.description;

        let btn = document.createElement("a");
        cardBody.appendChild(btn);
        btn.classList.add("btn", "add");
        btn.setAttribute("href", "produit.html?id=" + value._id);
        btn.textContent = "voir article";
      });
    } else {
      console.error("response server : ", response.status);
    }
  } catch (e) {
    console.log(e);
  }
};

callApi();

// Fonction pour afficher le nombre de produits dans le panier
loadCartNumbers();

function loadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}
