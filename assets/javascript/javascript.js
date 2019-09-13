
$(document).ready(function(){

    $("#artistSearch").on("click", function(event) {
    event.preventDefault();
    let newArtist = $('#newArtist').val().trim()
    localStorage.setItem('artist', JSON.stringify(newArtist))
    console.log(newArtist)
    
    location.href = 'artistPage.html'
   

})
//     $("#artistSearch").click(function(event){
//       event.preventDefault();
//       let newArtist = $('#artistSearch').val().trim()
//     console.log(newArtist)
// })
   
let currentArtist = JSON.parse(localStorage.getItem('artist'))

$('#artistName').text(currentArtist)

function testEvents() {
    let testUrlEvents = 'https://rest.bandsintown.com/artists/' + currentArtist + '/events?app_id=1e140eabdce95250b1ad6075934a113d'
    $.ajax({
        url: testUrlEvents,
        method: 'GET',
    })
        .then(function(response){
            // console.log(response) 
                for (i = 0; i < response.length; i++){
                    let city = response[i].venue.city
                    // console.log (city)
                    let date = moment(response[i].datetime).format('MMM Do');
                    console.log(response[i].datetime)
                    let event = $('<li>').text(date + " " + city) 
                    event.attr({
                        src: response[i].offers[0].url,

                    })   
                    $('#events').append(event) 
                }
            })
    }
testEvents()

$(document).on('click', 'li', move)

function move() {
    console.log($(this).attr('src'))
    window.open($(this).attr('src'))
}

});

//  lastFM API

function lastFMevent() {
    // let currentArtist = "Metallica"
    let lastFM_URL= "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + search1 + "&api_key=f917c10d1df728ef9f74047a980fb96b&format=json";    
    $.ajax({
        url: lastFM_URL,
        method: 'GET',
    })
    .then(function(response){
    console.log(response);
    console.log (response.artist.bio.summary);
    let lastFMsummary = response.artist.bio.summary;
    let relatedArtist = response.artist.similar.artist
    $('#bio').append(lastFMsummary);
    console.log(relatedArtist)
    })}
lastFMevent();