

    let search = JSON.parse(localStorage.getItem('artist'))
    console.log(search)
    
    
    $("#relatedBand").empty();
    $("#events").empty();
    var find = ' ';
    var re = new RegExp(find, 'g');

    search1 = search.replace(re, '+');
    //let accessToken = "BQA6DBkFWU5jW2AN-vxoTlF0c-0FSxU6KhxD_jQY9pyWqNX4lrROMz7YYcwceMMGpj7T6af8u_Is4G76y5NEOvjMTj1aEyB5JaWEfrkglAxrfgjoLQa5EJ14Pl5zGZW3v66wmsHy7FJcmKOArSVM8TRyx59_9Lw"
    
    let accessToken = "BQDOR4We53SW9R7W61GAqIadDs5fbzsl3ZRQOmZv1IMb3ryghmERv40CN9DPxOqg7Tgqyo8OLZpEBxuYnzjTQHFnVMydRbDc9JGYmMr0h17T4fQrWjd1f2htSItCespsGn9kXPFW-dTT3yCVbK7sKymo_KtKAnRFnwgvGA"
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
            $("#genres").html("Genres: " + response.artists.items[0].genres.join(', '));
            $("#artistImage").attr("src", response.artists.items[0].images[0].url)
           // $("#spotifyPlayer").attr("src", "https://open.spotify.com/embed/artist/"+ spotifyId )
        })
  
        
            // let testUrlEvents = 'https://rest.bandsintown.com/artists/' + search1 + '/events?app_id=1e140eabdce95250b1ad6075934a113d'
            // $.ajax({
            //     url: testUrlEvents,
            //     method: 'GET',
            // })
            //     .then(function(response){
            //       //   console.log(response) 
            //             for (i = 0; i < response.length; i++){
            //                 let city = response[i].venue.city
            //                 // console.log (city)
            //                 let date = moment(response[i].datetime).format('MMM Do');
            //                 //console.log(response[i].datetime)
            //                 let event = $('<li>').text(date + " " + city) 
            //                 event.attr({
            //                     src: response[i].offers[0].url,
            //                     class: 'eventClass'
        
            //                 })   
            //                 $('#events').append(event) 
            //             }
            //         })
            
        
      
    //   let lastFM_URL= "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + search1 + "&api_key=f917c10d1df728ef9f74047a980fb96b&format=json";        
    //   let x = "";
  
    //   $.ajax({
    //       url: lastFM_URL,
    //       method: 'GET',
    //   })
    //       .then(function(response){
    //         //   console.log(response);
    //           //console.log (response.artist.bio.summary);
    //           let lastFMsummary = response.artist.bio.summary;
    //           $('#bio').html(lastFMsummary);
    //           $('#artistName').text(response.artist.name)
              
    //           for (let i = 0; i < 5; i++){
    //               //console.log(response.artist.similar.artist[i])
                  
    //               let relatedBand = $('<div>');
    //                     relatedBand.attr('class', 'relatedArtist')

    //               let relatedBandPic = $('<img>')
    //                     relatedBandPic.attr('class', 'relatedArtistPic')
    //               let relatedBandName = $('<p>')
    //               let band = response.artist.similar.artist[i].name
    //              console.log(response.artist.similar.artist)
    //               let testUrl = 'https://rest.bandsintown.com/artists/' + band + '?app_id=1e140eabdce95250b1ad6075934a113d'
    //               let bandPic = ''
    //                   $.ajax({
    //                       url: testUrl,
    //                       method: 'GET',
    //                   })
    //                       .then(function(response){
    //                         //   console.log(response) 
                              
    //                                   bandPic = response.thumb_url  
    //                                 //   console.log(bandPic) 
    //                                   relatedBandPic.attr('src', bandPic)
    //                                   relatedBandName.text(band)
    //                                   relatedBandName.attr({
    //                                       class: 'link',
    //                                       'bandName': band,
    //                                   })
    //                                   relatedBand.append(relatedBandPic)
    //                                   relatedBand.append(relatedBandName)
    //                                   $('#relatedBand').append(relatedBand)
                                      
    //                                   //$('#relatedBand').attr('class', 'border')
    //                           })
    //                   }
  
                
    //           })    
        






    
