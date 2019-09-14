// var firebaseConfig = {
//     apiKey: "AIzaSyCyCbn5MvoPEzdxW_74N-f_cj0hm88IJBg",
//     authDomain: "musicapp-66792.firebaseapp.com",
//     databaseURL: "https://musicapp-66792.firebaseio.com",
//     projectId: "musicapp-66792",
//     storageBucket: "",
//     messagingSenderId: "933977892149",
//     appId: "1:933977892149:web:7ad31136eac2c48bcf587c"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

//   const database = firebase.database()

$(document).ready(function(){

    $("#artistSearch").on("click", function(event) {
    event.preventDefault();
    let newArtist = $('#newArtist').val().trim()
    localStorage.setItem('artist', JSON.stringify(newArtist))
    console.log(newArtist)
    
    location.href = 'artistPage.html'
   

})

let currentArtist = JSON.parse(localStorage.getItem('artist'))

function mainBandPic() {
    let testUrlPic = 'https://rest.bandsintown.com/artists/' + currentArtist + '?app_id=1e140eabdce95250b1ad6075934a113d'
                    $.ajax({
                        url: testUrlPic,
                        method: 'GET',
                    })
                        .then(function(response){
                            console.log(response)
                                    let mainBandPic = $('<img>')
                                    let bandPic = response.thumb_url  
                                    console.log(bandPic) 
                                    mainBandPic.attr('src', bandPic)
                                    console.log(mainBandPic)
                                    $('#artistImage').append(mainBandPic)
                                
                            })
                    }
mainBandPic()


function testEvents() {
    let testUrlEvents = 'https://rest.bandsintown.com/artists/' + currentArtist + '/events?app_id=1e140eabdce95250b1ad6075934a113d'
    $.ajax({
        url: testUrlEvents,
        method: 'GET',
    })
        .then(function(response){
            console.log(response) 
                for (i = 0; i < response.length; i++){
                    let city = response[i].venue.city
                    // console.log (city)
                    let date = moment(response[i].datetime).format('MMM Do');
                    //console.log(response[i].datetime)
                    let event = $('<li>').text(date + " " + city) 
                    event.attr({
                        src: response[i].offers[0].url,
                        class: 'eventClass'

                    })   
                    $('#events').append(event) 
                }
            })
    }
testEvents()

$(document).on('click', '.eventClass', move)

function move() {
    console.log($(this).attr('src'))
    window.open($(this).attr('src'))
}
});

// lastFM API 

function lastFMevent() {

    let currentArtist = JSON.parse(localStorage.getItem('artist'))
    let lastFM_URL= "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + currentArtist + "&api_key=f917c10d1df728ef9f74047a980fb96b&format=json";        
    let x = "";

    $.ajax({
        url: lastFM_URL,
        method: 'GET',
    })
        .then(function(response){
            //console.log(response);
            //console.log (response.artist.bio.summary);
            let lastFMsummary = response.artist.bio.summary;
            // for (i in response.artist.similar.artist) {
            //     x += "<h2>" + response.artist.similar.artist[i].name + "</h2>";
            //     for (j in response.artist.similar.artist[i].url) {
            //     x += response.artist.similar.artist[i].url[j];
            //     }
            // }
            //   We can try to add an img instead of a url link but I do not know how to extract it from the JSON
            //document.getElementById("relatedArtist").innerHTML = x;     
            $('#bio').append(lastFMsummary);
            $('#artistName').text(response.artist.name)
            
            for (let i = 0; i < 5; i++){
                //console.log(response.artist.similar.artist[i])
                
                let relatedBand = $('<div>');
                let relatedBandPic = $('<img>')
                let relatedBandName = $('<p>')
                let band = response.artist.similar.artist[i].name
                console.log(band)
                
                               //https://rest.bandsintown.com/artists/                                     metallica?app_id=1e140eabdce95250b1ad6075934a113d
                let testUrl = 'https://rest.bandsintown.com/artists/' + band + '?app_id=1e140eabdce95250b1ad6075934a113d'
                let bandPic = ''
                    $.ajax({
                        url: testUrl,
                        method: 'GET',
                    })
                        .then(function(response){
                            console.log(response) 
                            
                                    bandPic = response.thumb_url  
                                    console.log(bandPic) 
                                    relatedBandPic.attr('src', bandPic)
                                    relatedBandName.text(band)
                                    relatedBand.append(relatedBandPic)
                                    relatedBand.append(relatedBandName)
                                    $('#relatedBand').append(relatedBand)
                                
                            })
                    }

              
            })     
        }
    

lastFMevent();
