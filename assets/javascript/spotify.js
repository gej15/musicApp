$(document).ready()

$("#artistSearch").submit(function(e) {

        let search = $("#artist_name").val()
        
        e.preventDefault();

        var find = ' ';
        var re = new RegExp(find, 'g');

        search1 = search.replace(re, '+');
        
        let accessToken = "BQA5iR8ltjj0UxZtIvalrqkkdkAeaqjA8fXn5OfaMnCcPbnpEuN7lbLkTeU74uSwJ3JuZQ-4DxXTQUNBt1EYbNmCeGAe64UOxul_CYQjLD1GDlxzjYaBWsbR3Rlt6rtVIw-5nnCJOGTciZeOyxi2oxEbNdPgk0s"
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
                $("#artistImage").attr("src", response.artists.items[0].images[1].url)
                $("#spotifyPlayer").attr("src", "https://open.spotify.com/embed/artist/"+ spotifyId )
            })
        
        
    })




    
