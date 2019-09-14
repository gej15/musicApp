
$("artistForm").submit(function(e) {

        let search = $("#newArtist").val()
        
        e.preventDefault();

        var find = ' ';
        var re = new RegExp(find, 'g');

        search1 = search.replace(re, '+');
        
        
        let accessToken = "BQAH7suxxeT3TuOYyaQtbz9n-TAXxEhx2x0euX0MR62BbAp3RmfZ9JPZ_ASy7BcK_TtO2haknKEmED1Z8P-cPoKSsviKhO9YVHOVCV7GwjbChe_D8XtplyWIuFRxh6c5rsLXVa4CjiwE3sCKrwCIwU4mvuyp0zI"
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




    
