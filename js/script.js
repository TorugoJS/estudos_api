
const url = "https://jsonplaceholder.typicode.com/posts";

const loadingElement = document.querySelector("#loading")
const postContainer = document.querySelector("#posts-container")

// get all posts
async function getAllPosts() {

    const response = await fetch(url)

    console.log(response)

    //transformando em array de objetos (json)
    const data = await response.json()

    console.log(data)

    //escondendo os dados
    loadingElement.classList.add("hide");

    //pegar todos elementos da requisição e imprimir cada post
    data.map((post) => {
        const div = document.createElement("div")
        const title = document.createElement("h2")
        const body = document.createElement("p")
        const link = document.createElement("a")

        title.innerText = post.title;
        body.innerText = post.body;
        link.innerText = "Ler"
        link.setAttribute("href", `/post.html?id=${post.id}`);

        div.appendChild(title)
        div.appendChild(body)
        div.appendChild(link)

        postContainer.appendChild(div)

    })

}

getAllPosts();

