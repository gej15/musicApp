$(document).ready()

$("#artistSearch").submit(function(e) {

        let search = $("#artist_name").val()
        
        e.preventDefault();

        var find = ' ';
        var re = new RegExp(find, 'g');

        search1 = search.replace(re, '+');
        
        
        let accessToken = "BQAh-hy-9raCshnOpMx9sAzmvJ-ccHuQ3FZ51CURv0nC__T894txufAaKy26xiOvDm4vWhs-ovvMPGC9PH3B4cxI034johVlNZuN2PYBj2z1SQCO7PpfDh511V9eQo-hYEluY2TScKi84sF9DRp9RwH7kC4XWYQ"
        let spotifyApi = 'https://api.spotify.com/v1/search?query=' + search1 + '&type=artist'
        
        $.ajax({
            url: spotifyApi,
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + accessToken
            },
            success: function(data) {
              
                console.log(data);
            }
        })
            .then(function(response){
                let spotifyId = response.artists.items[0].id;
                
                $("#artistName").html(response.artists.items[0].name);
                $("#artistImage").attr("src", response.artists.items[0].images[0].url);
                $("#genre").text(response.artists.items[0].genres.join(', '));
                $("#spotifyPlayer").attr("src", "https://open.spotify.com/embed/artist/"+ spotifyId );
                console.log(response.artists.items[0].followers);
            })
           
            
        
    })




    
