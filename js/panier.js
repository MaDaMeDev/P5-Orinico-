// créer et stocker le nombre de produits dans le panier
function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  saveCard(product);
}

function saveCard(product) {
  let cartItems = localStorage.getItem("productsInCart", "cartNumbers");
  cartItems = JSON.parse(cartItems);

  if (cartItems !== null) {
    if (cartItems[product.id] == undefined) {
      cartItems = {
        ...cartItems,
        [product.id]: product,
      };
    }
    cartItems[product.id].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.id]: product,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCoast(product) {
  let cartCoast = localStorage.getItem("totalCoast");

  if (cartCoast != null) {
    cartCoast = parseInt(cartCoast);
    localStorage.setItem("totalCoast", cartCoast + product.price);
  } else {
    localStorage.setItem("totalCoast", product.price);
  }
}

loadCartNumbers();

function loadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

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

      let total = document.createElement("p");
      total.classList.add("total");
      total.textContent = `${item.inCart * item.price},00$`;
      prod.appendChild(total);

      let remove = document.createElement("a");
      remove.classList.add("remove");
      remove.setAttribute("href", "./panier.html");
      prod.appendChild(remove);

      let removeIcon = document.createElement("i");
      removeIcon.classList.add("far", "fa-trash-alt");
      remove.appendChild(removeIcon);
      // A voir -------------------------------------------------------
      function deleteArticle() {
        remove.addEventListener("click", () => {
          localStorage.removeItem("productsInCart", item);
          localStorage.removeItem("cartNumbers");
        });
      }

      deleteArticle();
    });

    let totalContainer = document.createElement("section");
    totalContainer.classList.add("total-container");
    let container = document.querySelector(".container-main");
    container.appendChild(totalContainer);

    let totalTitle = document.createElement("h4");
    totalTitle.classList.add("totalTitle");
    totalTitle.textContent = "Panier Total";
    totalContainer.appendChild(totalTitle);

    let totalBasket = document.createElement("h4");
    totalBasket.classList.add("totalBasket");
    totalBasket.textContent = `${cartCoast}$`;
    totalContainer.appendChild(totalBasket);

    let formContainer = document.createElement("div");
    formContainer.classList.add("form-container", "container");
    container.appendChild(formContainer);

    formContainer.innerHTML = `

                    <h4 class="formTitle"> Valider votre commande</h4>
                    <form>
                    <div class="form-group">
                      <label for="Name">Nom</label>
                      <input type="name" class="form-control" id="firstName"" aria-describedby="nameHelp" placeholder="Nom" required>
                    </div>
                    <div class="form-group">
                      <label for="LastName">Prénom</label>
                      <input type="text" class="form-control" id="lastName" placeholder="Prénom" required>
                    </div>
                    <div class="form-group">
                      <label for="Adresse"">Adresse</label>
                      <input type="text" class="form-control" id="address" placeholder="Adresse" required>
                    </div>
                    <div class="form-group">
                      <label for="City">Ville</label>
                      <input type="Text" class="form-control" id="city" placeholder="Ville" required>
                    </div>
                    <div class="form-group">
                        <label for="Email">Adresse Email</label>
                        <input type="email" class="form-control" id="email" placeholder="name@example.com" required>
                    </div>

                    <button type="submit" class="btn" id="validate">Valider</button>
                </form> `;

    
    
  } else {
    let cartEmpty = document.createElement("p");
    cartEmpty.textContent = "Votre panier est vide";
    productContainer.appendChild(cartEmpty);
  }
}

loadCartNumbers();  
displayCart();

    var formValid = document.getElementById("validate");
    formValid.addEventListener("click", order);

    function order() {
      // on déclare un tableau de produits pour la requete POST plus tard
      let products = [];
      // on recupere les Id des produits en panier pour les pousser dans products
      let cartItems = localStorage.getItem("productsInCart");
      cartItems = JSON.parse(cartItems);
      for (let id in cartItems) {
        products.push(id);
        console.log(typeof id)
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
      console.log(obj)

      const postApiUrl = "http://localhost:3000/api/teddies/order";

      let postDataApi = JSON.stringify(obj);

      const postDataCart = async function () {
        try {
          let response = await fetch(postApiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: postDataApi,
          });
          console.log(response)
          if (response.ok) {
            let data = await response.json();
            console.log("Infos récupérées :");
            console.log(data);

            let idPostApi = data["orderId"];
            console.log(idPostApi);

            let productsPostApi = products;
            console.log(productsPostApi);

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
