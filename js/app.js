
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
    //console.log(pokeDetailsAPI);

    fetch(pokeDetailsAPI).then((response) =>{
        return response.json();
    }).then((data) => {
        console.log(data['sprites']);
        const someDetails = {
            'abilities' : data['abilities'],
            'sprites'  : data['sprites'],
            'types' : data['types'],
            'moves' : data['moves']
        }

        let dummyObj = {};
        dummyObj['icons'] = someDetails.sprites['back_shiny'];

        someDetails.abilities.forEach(function(element){
            
            if(element['is_hidden'] === false){
                dummyObj['abilityArr'] = [{'name': element['ability']['name'], 'url': element['ability']['url']}];
                
            }
        })
        
        someDetails.types.forEach(function(element,index){
                dummyObj['type'] = [{'typeName': element['type']['name'], 'url': element['type']['url']}];
        })
        someDetails.moves.forEach(function(element){
            dummyObj['moves'] = [{'moveName': element['move']['name'], 'url': element['move']['url']}];
        })
        console.log(dummyObj);

        let newsHTML = `<div class="card"><img class="card-img-top" src="${dummyObj.icons}" alt="${pokeName}"><div class="card-body"><h5 class="card-title">Poke ID - ${pokeId}, Poke Name - "${pokeName}"</h5><hr>`;

        dummyObj.abilityArr.forEach(function(element){
            newsHTML += `<ul class="list-group list-group-flush">
            <h5>Ability:-</h5>
            <li class="list-group-item">${element['name']}</li>
            <li class="list-group-item">${element['url']}</li>
            </ul><hr>`;
        })
        dummyObj.type.forEach(function(element){
            newsHTML += `<ul class="list-group list-group-flush">
            <h5>Types:-</h5>
            <li class="list-group-item">${element['typeName']}</li>
            <li class="list-group-item">${element['url']}</li>
            </ul><hr>`;
        })
        dummyObj.moves.forEach(function(element){
            newsHTML += `<ul class="list-group list-group-flush">
            <h5>Moves:-</h5>
            <li class="list-group-item">${element['moveName']}</li>
            <li class="list-group-item">${element['url']}</li>
            </ul></div></div>`;
        })
        document.getElementById('pokeDetails').innerHTML = newsHTML;
    }).catch((error) => {
        console.error('Error:', error);
    });
}