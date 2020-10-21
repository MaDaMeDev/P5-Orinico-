// Affichage du nombre de produits au panier (icone header)
loadCartNumbers();

function loadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}
// Affichage des produits selectionés (creation de la template panier)
function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products-cart");
  let cartCoast = localStorage.getItem("totalCoast");

  if (cartItems && productContainer) {
    Object.values(cartItems).forEach((item) => {
      let productContainer = document.querySelector(".products-cart");

      let prod = document.createElement("div");
      prod.classList.add("product-cart");
      productContainer.appendChild(prod);

      let img = document.createElement("img");
      img.setAttribute("src", `${item.image}`);
      img.classList.add("img-cart", "img-fluid");
      prod.appendChild(img);

      let title = document.createElement("p");
      title.classList.add("title");
      title.textContent = `${item.name}`;
      prod.appendChild(title);

      let price = document.createElement("p");
      price.classList.add("price");
      price.textContent = `${item.price}$`;
      prod.appendChild(price);

      let quantity = document.createElement("div");
      quantity.classList.add("quantity");
      prod.appendChild(quantity);

      let quant = document.createElement("p");
      quant.textContent = `${item.inCart}`;
      quantity.appendChild(quant);

      let totalArticle = document.createElement("div");
      totalArticle.classList.add("totalArticle");
      productContainer.appendChild(totalArticle);

      let totalArtTitle = document.createElement("h5");
      totalArtTitle.classList.add("totalArtTitle");
      totalArtTitle.textContent = "Total";
      totalArticle.appendChild(totalArtTitle);

      let total = document.createElement("p");
      total.classList.add("total");
      total.textContent = `${item.inCart * item.price},00$`;
      totalArticle.appendChild(total);
    });
    // affichage du prix total des produits et du panier
    let totalContainer = document.createElement("section");
    totalContainer.classList.add("total-container");
    let container = document.querySelector(".products-cart");
    container.appendChild(totalContainer);

    let totalTitle = document.createElement("h4");
    totalTitle.classList.add("totalTitle");
    totalTitle.textContent = "Panier Total";
    totalContainer.appendChild(totalTitle);

    let totalBasket = document.createElement("h4");
    totalBasket.classList.add("totalBasket");
    totalBasket.textContent = `${cartCoast}$`;
    totalContainer.appendChild(totalBasket);

    let removeCart = document.createElement("div");
    removeCart.classList.add("remove-cart");
    productContainer.appendChild(removeCart);
    // Affichage du bouton supprimer les articles du panier
    let remove = document.createElement("a");
    remove.classList.add("remove");
    remove.setAttribute("href", "./panier.html");
    removeCart.appendChild(remove);

    let removeText = document.createElement("p");
    removeText.textContent = "Vider votre panier";
    removeCart.appendChild(removeText);

    let removeIcon = document.createElement("i");
    removeIcon.classList.add("far", "fa-trash-alt");
    remove.appendChild(removeIcon);
    // fonction pour effacer les articles du  panier
    function deleteArticle() {
      remove.addEventListener("click", () => {
        localStorage.clear();
      });
    }
    form();
    deleteArticle();
  } else {
    let cartEmpty = document.createElement("p");
    cartEmpty.classList.add("cart-empty");
    cartEmpty.textContent = "Votre panier est vide";
    productContainer.appendChild(cartEmpty);
  }
}

loadCartNumbers();
displayCart();
// création et affichage du formulaire de validations de commande
function form() {
  let formContainer = document.createElement("div");
  formContainer.classList.add("form-container", "container");
  let container = document.querySelector(".products-container");
  container.appendChild(formContainer);

  formContainer.innerHTML = `

                    <h4 class="formTitle text-center"> Valider votre commande</h4>
                    <form method= "post">
                    <div class="form-group">
                      <label for="Name">Nom</label>
                      <input type="text" class="form-control" id="firstName"" aria-describedby="nameHelp" placeholder="Nom" required pattern='^[A-Z]{1}[a-z\ ]+$'>
                    </div>
                    <div class="form-group">
                      <label for="LastName">Prénom</label>
                      <input type="text" class="form-control" id="lastName" placeholder="Prénom" required pattern='^[A-Z]{1}[A-Za-zÀ-ÿ\ -]+$'>
                    </div>
                    <div class="form-group">
                      <label for="address"">Adresse</label>
                      <input type="text" class="form-control" id="address" placeholder="Adresse"  required pattern= "[0-9]{1,3}(?:(?:[,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)*">
                    </div>
                    <div class="form-group">
                      <label for="City">Ville</label>
                      <input type="Text" class="form-control" id="city" placeholder="Ville" required pattern='^[A-Z]{1}[a-zA-Z\- ]+$'>
                    </div>
                    <div class="form-group">
                        <label for="mail">Adresse Email</label>
                        <input type="email" class="form-control" id="email" placeholder="name@example.com" pattern="[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})" required >
                    </div>

                    <button type="submit" class="btn" id="validate" name= "validate">Valider</button>
                </form> `;
}
// fonction au click sur le boutons valider
var formValid = document.getElementById("validate");
formValid.addEventListener("click", (event) => {
    
  if (email.validity.valid || adress.validity.valid || firstName.validity.valid || lastName.validity.valid || city.validity.valid) {
    event.preventDefault()
    catchOrder()
  }
   
});



function catchOrder() {
  // on déclare un tableau de produits pour la requete POST plus tard
  let products = [];
  // on recupere les Id des produits en panier pour les pousser dans products
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  for (let id in cartItems) {
    products.push(id);
    console.log(typeof id);
  }
  console.log(cartItems);
  console.log(products);

  // On récupere la valeur des inputs saisie
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let email = document.getElementById("email").value;

  
  // on met les valeur dans un objet pour la requete Post
  let contact = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
  };

  //création de l'objet pour la requete post

  let obj = {
    contact,
    products,
  };
  console.log(obj);
  

  // on envoie les objets créer vers l'api avec un requete post pour recuperer le numero de commande
  const postApiUrl = "http://localhost:3000/api/teddies/order";

  let postDataApi = JSON.stringify(obj);

  const postDataCart = async function () {
    try {
      let response = await fetch( postApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: postDataApi,
      });
      console.log(response);

      //on recupere les donnée reçue de l'api
      
      if (response.ok){
        let data = await response.json();
        console.log("Infos récupérées :");
        console.log(data);

        let idPostApi = data["orderId"];
        console.log(idPostApi);

        let productsPostApi = products;
        console.log(productsPostApi);

        // Renvoie sur la page comfirmation de commande et affichage des données récuperer (order-id)
        window.location = `confirmation.html?id=${data["orderId"]}&price=${productsPostApi}`;
        
      } else {
        console.error("reponse serveur : ", response.status);
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  
  postDataCart();
  localStorage.clear();
}
