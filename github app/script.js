const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");

async function getUsers(user) {
    main.innerHTML = "";
    const resp = await fetch(APIURL + user);
    if(!resp.ok) return;
    const respData = await resp.json();
    createUserCard(respData);
    fetchRepos(user);
}

async function fetchRepos(user) {
    const resp = await fetch(APIURL + user + "/repos");
    const respData = await resp.json();
    addReposToCard(respData);
}

function addReposToCard(repos) {
    const reposEl = document.querySelector("#repos");

    repos.slice(0, 9).forEach(repo => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;
        reposEl.appendChild(repoEl);
    });
}

function createUserCard(user) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div>
            <img src="${user.avatar_url}" alt="${user.name}">
        </div>
        <div class="info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul>
                <li><i class="fa-solid fa-eye"></i> ${user.followers}</li>
                <li><i class="fa-solid fa-heart"></i> ${user.following}</li>
                <li><i class="fa-solid fa-comment"></i> ${user.public_repos}</li>
            </ul>
            <div class="repos" id="repos">

            </div>
        </div>
    `;

    main.appendChild(card);
}

form.addEventListener("submit", e => {
    e.preventDefault();
    if(search.value)
        getUsers(search.value); 
});