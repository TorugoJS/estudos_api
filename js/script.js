
const url = "https://jsonplaceholder.typicode.com/posts";

const loadingElement = document.querySelector("#loading")
const postsContainer = document.querySelector("#posts-container")

const postPage = document.querySelector("#post")
const postContainer = document.querySelector("#post-container")
const commentsContainer = document.querySelector("#comments-container")

//get id frin URL
//entrega um objeto para acessar o parametro da URL
const urlSearchParams = new URLSearchParams(window.location.search)
const postId = urlSearchParams.get("id")

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

        postsContainer.appendChild(div)

    })

}

// get individual post

async function getPost(id){
    const [responsePost, responseComments] = await Promise.all ([
        fetch(`${url}/${id}`),
        fetch(`${url}/${id}/comments`)
    ])
    const dataPost = await responsePost.json()

    const dataComments = await responseComments.json()

    loadingElement.classList.add("hide")
    postPage.classList.remove("hide")
}

if(!postId){
    getAllPosts();
} else {
    getPost(postId)
}
