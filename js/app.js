let nextPage = 1 

async function getData(query='') {
    $('#content').empty()
    const url = `https://api.freeapi.app/api/v1/public/dogs?page=${nextPage}&limit=25&query=${query}`;
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    let result = await fetch(url, options);
    let data = await result.json();
    console.log(data)
    if(data.totalItems === 0){
        $('.main-content').append("<p>No results found</p>");
    } else {
        loadData(data['data']['data'])
    }
}

function loadData(data){
    for (let i = 0; i < data.length; i++) {
        addCard(data[i].name, data[i].image.url , data[i].temperament, data[i].id)
      }
}


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
        strFavorites = `<button onclick="addFavorite('${title}', '${id}', this)">Add to Favourites</button>`
    }    
    const cardHtml = `
        <div class="card">
            <div>
                <img src="${image}" style="width:100%" alt="Picture of a dog (${title})">
                <div>
                    <h3>${title}</h3>
                    <p>${text}</p>
                    <div class="card-footer">
                        <a href="view.html?id=${id}" >View More</a>
                        ${strFavorites}
                    </div>    
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
        addCard(dog.name, dog.image.url, dog.temperament, dog.id)
    }

}

$(document).ready(function(){
    $("#favourites").text("Favourites (" + localStorage.length + ")")
    $("#searchBtn").click(function(){   
        $(".main-content").empty()    
        getData($("#query").val())
    })
})
