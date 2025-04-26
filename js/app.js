function toggle_element(element){
    document.getElementById(element).classList.toggle('hide')
}

function addFavorite(title, id, element){
    element.classList.toggle('hide')
    element.parentElement.insertAdjacentHTML("beforeend", `<span>Favorite <i class="fa fa-star" aria-hidden="true"></i></span>`)
    localStorage.setItem(title, id)
    console.log(localStorage)
}

function addCard(title, image, text, id) {
    if(localStorage.getItem(title)){
        strFavorites = `<span>Favorite <i class="fa fa-star" aria-hidden="true"></i></span>`
    } else {
        strFavorites = `<button onclick="addFavorite('${title}', '${id}', this)">Add to Favorites</button>`
    }    
    const cardHtml = `
        <div>
            <div>
                <img src="${image}" style="width:100%">
                <div>
                    <h4>${title}</h4>
                    <p>${text}</p>
                    <a href="view.html?id=${id}" >See Profile</a>
                    ${strFavorites}
                </div>
            </div>
        </div>    
    `;
    
    $('.main-content').append(cardHtml);
}

async function getDog(id, context=0) {
    const url = `https://api.freeapi.app/api/v1/public/dogs/${id}`;
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    let result = await fetch(url, options);
    let data = await result.json();
    const dog = data.data
    if(context === 0){
        $("#title").text(dog.name)
        $("#img").attr("src", dog.image.url);
        $("#temperament").text(dog.temperament)
        $("#weight").text(dog.weight.metric)
        $("#height").text(dog.height.metric)
        $("#bred_for").text(dog.bred_for)
        $("#life_span").text(dog.life_span)
    } else {
        addCard(dog.name, dog.image.url, dog.text, dog.id)
    }

}