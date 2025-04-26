let nextPage = 1 

async function getData(query='') {
    $('#content').empty()
    const url = `https://api.freeapi.app/api/v1/public/dogs?page=${nextPage}&limit=25&query=${query}`;
    console.log(nextPage)
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    let result = await fetch(url, options);
    let data = await result.json();
    if(data.data.nextPage){
        nextPage += 1 
    } else {
        $("#btnNext").hide()
    }
    const pages = data.data.totalPages
    
    if(data.data.totalItems === 0){
        addAlert("warning", "No result found")
    } else {
        loadData(data['data']['data'])
    }
}

function loadData(data){
    for (let i = 0; i < data.length; i++) {
        addCard(data[i].name, data[i].image.url , data[i].temperament, data[i].id)
      }
}



$(document).ready(function(){
    getData()
})