const actualUrl = new URLSearchParams(window.location.search); 

const id = actualUrl.get("id"); 

const apiUrl = "http://localhost:3000/api/teddies/" + id; 

console.log(id)

const callApi = async function () {
    try {
        let response= await fetch(apiUrl)
        if (response.ok) {
            let data = await response.json()
            console.log(data)

            function detailProduct(data) {

                console.log(data)  
                let article = document.createElement("article")
                document.querySelector(".products").appendChild(article)
                article.classList.add("card")
                
                let img = document.createElement("img")
                img.classList.add("card-img-top")
                img.setAttribute('src', `${data.imageUrl}`)
                article.appendChild(img)
                
                let title = document.createElement("h3")
                article.appendChild(title)
                title.classList.add("card-title")
                title.textContent = `${data.name}`


            }

            detailProduct(data)
 
        } else {
            console.error("response server : ", response.status)
        }   
    } catch(e) {
        console.log(e)
    }

    
};

callApi() ;


