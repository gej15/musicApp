
$(document).ready(function(){

    $("#artistSearch").on("click", function(event) {
    event.preventDefault();
    location.href = 'artistPage.html'
    let newArtist = $('#artistName').val().trim()
    console.log(newArtist)
})
//     $("#artistSearch").click(function(event){
//       event.preventDefault();
//       let newArtist = $('#artistSearch').val().trim()
//     console.log(newArtist)
// })
   

function testEvents() {
    let testUrlEvents = 'https://rest.bandsintown.com/artists/cold%20war%20kids/events?app_id=1e140eabdce95250b1ad6075934a113d'
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
                    // console.log(date)
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