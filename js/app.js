
let pokeContaint = document.getElementById('pokeData');
let pokeDetails = document.getElementById('pokeDetails');
function getDate(){
    url = 'https://pokeapi.co/api/v2/pokemon';
    fetch(url).then((response) =>{
        return response.json();
    }).then((data) => {
        console.log(data);
        paginationNext(data.next);
        paginationPrev(data.previous);
        let pokeUI = '<div class="row">';
        data['results'].forEach(element => {
            let url = `${element["url"]}`;
            let splitUrl = url.split('/');

            pokeUI += `<div class="col-sm-4 mb-3"><div class="card"><div class="card-body"><h5 class="card-title">${element["name"]}</h5><a href="/details.html?name=${element["name"]}&id=${splitUrl[6]}" target="_blank" class="btn btn-info btn-rounded">Poke Details</a></div></div></div>`;
        });
        pokeUI +="</div>";
        pokeContaint.innerHTML = pokeUI;
    }).catch((error) => {
        console.error('Error:', error);
    });
}

getDate();
function paginationNext(url){
    console.log(url);
    document.getElementById('next').addEventListener('click', function(){
        fetch(url).then((response) =>{
            return response.json();
        }).then((data) => {
            //console.log(data.next);
            paginationNext(data.next);
            if(data.previous != null){
                paginationPrev(data.previous);
                //document.getElementById('prev').addClass('btn btn-primary')
                document.getElementById("prev").classList.remove('disabled');
            }
            let pokeUI = '<div class="row">';
            data['results'].forEach(element => {
                let url = `${element["url"]}`;
                let splitUrl = url.split('/');

                pokeUI += `<div class="col-sm-4 mb-3"><div class="card"><div class="card-body"><h5 class="card-title">${element["name"]}</h5><a href="/details.html?name=${element["name"]}&id=${splitUrl[6]}" target="_blank" class="btn btn-info btn-rounded">Poke Details</a></div></div></div>`;
            });
            pokeUI +="</div>";
            pokeContaint.innerHTML = pokeUI;
        }).catch((error) => {
            console.error('Error:', error);
        });
    })
}
function paginationPrev(url){
    console.log(url);
        document.getElementById('prev').addEventListener('click', function(){
            fetch(url).then((response) =>{
                return response.json();
            }).then((data) => {
                //console.log(data.next);
                //paginationNext(data.next);
                paginationPrev(data.previous);
                let pokeUI = '<div class="row">';
                data['results'].forEach(element => {
                    let url = `${element["url"]}`;
                    let splitUrl = url.split('/');
    
                    pokeUI += `<div class="col-sm-4 mb-3"><div class="card"><div class="card-body"><h5 class="card-title">${element["name"]}</h5><a href="/details.html?name=${element["name"]}&id=${splitUrl[6]}" target="_blank" class="btn btn-info btn-rounded">Poke Details</a></div></div></div>`;
                });
                pokeUI +="</div>";
                pokeContaint.innerHTML = pokeUI;
            }).catch((error) => {
                console.error('Error:', error);
            });
        })
}

function fetchDetails() {
    
    var url = new URL(window.location);
    var pokeName = url.searchParams.get("name");
    var pokeId = url.searchParams.get("id");
    console.log(pokeName, pokeId);
    
    let pokeDetailsAPI = `https://pokeapi.co/api/v2/pokemon/${pokeId}`
    console.log(pokeDetailsAPI);

    fetch(pokeDetailsAPI).then((response) =>{
        return response.json();
    }).then((data) => {
        console.log(data);
        let newsHTML = "";
        data['stats'].forEach(function(element, index){
           console.log(element); 
           newsHTML += `<div class="accordion-item">
                            <h2 class="accordion-header" id="heading${index}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                                <span><strong>${pokeName} Start - ${index + 1}</strong></span>
                            </button>
                            </h2>
                            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#pokeDetails">
                            <div class="accordion-body">
                            <table class="table table-striped">
                                <tbody>
                                    <tr><th scope="row">1</th><td>Base Stat</td><td>${element["base_stat"]}</td></tr>
                                    <tr><th scope="row">2</th><td>Effort</td><td>${element["effort"]}</td></tr>
                                    <tr><th scope="row">3</th><td>stat Name</td><td>${element['stat']["name"]}</td></tr>
                                    <tr><th scope="row">3</th><td>stat URL</td><td>${element['stat']["url"]}</td></tr>
                                </tbody>
                            </table>
                            </div>
                            </div>
                        </div>`; 
        });
        pokeDetails.innerHTML = newsHTML;
    }).catch((error) => {
        console.error('Error:', error);
    });
}