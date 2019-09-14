$(document).ready()

$("#artistSearch").submit(function(e) {

        let search = $("#artist_name").val()
        
        e.preventDefault();

        var find = ' ';
        var re = new RegExp(find, 'g');

        search1 = search.replace(re, '+');
        
        let accessToken = "BQCa_1pGtqtfIfJQpLU_dDV_snkHaPreYIZyFtJkh7HIu9VKk2-UXJOPyZQ_3dFIJxrV5nK8iyxoW_fHJ6yOm4smw_APb6WbbN-aZ4EfRWgqFDk66Jw0rgeV80dCdbPh8wWVRLjy_-lPpnoYLrc96jwsUX4TpFw"
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
                $("#artistImage").attr("src", response.artists.items[0].images[0].url)
                $("#spotifyPlayer").attr("src", "https://open.spotify.com/embed/artist/"+ spotifyId )
            })
        
        
    })




    
