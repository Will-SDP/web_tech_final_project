const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);
const dogId = searchParams.get("id") 

getDog(dogId)