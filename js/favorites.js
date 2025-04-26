Object.keys(localStorage).forEach(function(key){
    // $("ul").append(`<li>${key}</a></li>`)
    dogId = localStorage.getItem(key) 
    dogId = dogId.replace("(", '')
    getDog(dogId, 1)

 });