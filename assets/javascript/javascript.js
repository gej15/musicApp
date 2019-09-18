$(document).ready(function(){
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyCyCbn5MvoPEzdxW_74N-f_cj0hm88IJBg",
      authDomain: "musicapp-66792.firebaseapp.com",
      databaseURL: "https://musicapp-66792.firebaseio.com",
      projectId: "musicapp-66792",
      storageBucket: "musicapp-66792.appspot.com",
      messagingSenderId: "933977892149",
      appId: "1:933977892149:web:7ad31136eac2c48bcf587c"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
      
        let database = firebase.database();


        let user = JSON.parse(localStorage.getItem('firstName'))
        // console.log(JSON.parse(localStorage.getItem('firstName')))
        // console.log(user)
        if (user === '') {
            user = 'Register/Login'
            // console.log(1)
        } else if (user == null) {
            user = 'Register/Login'
            // console.log(3)
        } else {
            $('#regButton').text(user)
            // console.log(2)
        }

        $('#regButton').text(user)
        function loginButtonStart(){
            if ($('#regButton').text() !== 'Register/Login') {
                document.querySelector('#signout').style.display = 'block'
                document.querySelector('#userLink').style.display = 'block'
                document.querySelector('#register').style.display = 'none'
                document.querySelector('#login').style.display = 'none'  
                if ($("body").data("title") === "artistPage") {
                 document.querySelector('#favorites').style.display = 'block'
                }
            }
        }
        loginButtonStart()

      $("#registerUser").on("click", function(event) {
          //Prevent form from submitting
          event.preventDefault();
          
          // Get the input values
          let userName = $('#userName').val().trim()
          let password = $('#password').val().trim()
          let firstName = $('#firstName').val().trim()
          let cityEnrty = $('#userLocation').val().trim()
          let city =  cityEnrty.charAt(0).toUpperCase() + cityEnrty.slice(1)
          console.log(city)
          
      
            // Save the new user  in Firebase
            database.ref(userName).set({
              password,
              firstName,
              city,
            })
            //console.log(userName)
            //console.log(password)
            //console.log(firstName)
          })

          $("#loginUser").on("click", function(event) {
            // Prevent form from submitting
            event.preventDefault();
            let userName = $('#userNameLogin').val().trim()
            console.log(userName)
    
            let name = ""
            let key = ""
            let passwordLogin = $('#passwordLogin').val().trim()

            var rootRef = firebase.database().ref(userName);
                rootRef.once("value")
                    .then(function(snapshot) {
                        key = snapshot.val().password;
                        console.log(key)
                        name = snapshot.val().firstName 
                        console.log(name)
                        //if (!userName.exists()) {
                        //  alert('user dose not exist')
                        if (key == passwordLogin ) {
                            $('#regButton').text(name)
                            localStorage.setItem('firstName', JSON.stringify(name))
                            localStorage.setItem('userName', JSON.stringify(userName))
                        } else {
                            console.log('wrong password')
                        }
        
                        if ($('#regButton').text() !== 'Register/Login') {
                        document.querySelector('#signout').style.display = 'block'
                        document.querySelector('#userLink').style.display = 'block'
                        document.querySelector('#register').style.display = 'none'
                        document.querySelector('#login').style.display = 'none'
                        }
                    })   
        })

        $('#signout').on('click', function(){
            user = ''
            $('#login').text('Login')
            $('#register').text('Register')
            $('#regButton').text('Register/Login')
            document.querySelector('#register').style.display = 'block'
            document.querySelector('#signout').style.display = 'none'
            document.querySelector('#userLink').style.display = 'none'
            document.querySelector('#login').style.display = 'block'
            if ($("body").data("title") === "artistPage") {
                document.querySelector('#favorites').style.display = 'none'
            }
            localStorage.setItem('firstName', JSON.stringify(''))
            localStorage.setItem('userName', JSON.stringify(''))
            console.log('hi')
          })

     
  
   $("#artistSearch").on("click", function(event) {
      event.preventDefault();
      let newArtist = $('#newArtist').val().trim()
      localStorage.setItem('artist', JSON.stringify(newArtist))
    //   console.log(newArtist) 
      location.href = 'artistPage.html'
   })


   let currentArtist = JSON.parse(localStorage.getItem('artist'))


   $('#favorites').on('click', function(){
    let userName = JSON.parse(localStorage.getItem('userName'))
        console.log(userName)
    
    var rootRef = firebase.database().ref(userName);
        rootRef.once("value")
            .then(function(snapshot) {
                let key = snapshot.val().password;
                console.log(key)
                let name = snapshot.val().firstName 
                console.log(name)
                let currentFavorites = [snapshot.val().favFolder + ',' + currentArtist]
                let location = snapshot.val().city
                console.log(location)
                    //resave user in Firebase
                    database.ref(userName).set({
                        firstName: name,
                        password: key,
                        favFolder: currentFavorites,
                        city: location,
                     })
                })
   })
  
 

  function addBandToFavorites() {
     $('#favorites').attr("bandOnFavorite", currentArtist)
    }
    addBandToFavorites()
  
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
                                    //   console.log(bandPic) 
                                      mainBandPic.attr('src', bandPic)
                                    //   console.log(mainBandPic)
                                      $('#artistImage').append(mainBandPic).val()
                                  
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
 
  
//   lastFM API 
  
  function lastFMevent() {
  
      let currentArtist = JSON.parse(localStorage.getItem('artist'))
      let lastFM_URL= "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + currentArtist + "&api_key=f917c10d1df728ef9f74047a980fb96b&format=json";        
      let x = "";
  
      $.ajax({
          url: lastFM_URL,
          method: 'GET',
      })
          .then(function(response){
            //   console.log(response);
              //console.log (response.artist.bio.summary);
              let lastFMsummary = response.artist.bio.summary;
              $('#bio').append(lastFMsummary);
              $('#artistName').text(response.artist.name)
              
              for (let i = 0; i < 5; i++){
                  //console.log(response.artist.similar.artist[i])
                  
                  let relatedBand = $('<div>');
                        relatedBand.attr('class', 'relatedArtist')

                  let relatedBandPic = $('<img>')
                        relatedBandPic.attr('class', 'relatedArtistPic')
                  let relatedBandName = $('<p>')
                  let band = response.artist.similar.artist[i].name
                //   console.log(band)
                  let testUrl = 'https://rest.bandsintown.com/artists/' + band + '?app_id=1e140eabdce95250b1ad6075934a113d'
                  let bandPic = ''
                      $.ajax({
                          url: testUrl,
                          method: 'GET',
                      })
                          .then(function(response){
                            //   console.log(response) 
                              
                                      bandPic = response.thumb_url  
                                    //   console.log(bandPic) 
                                      relatedBandPic.attr('src', bandPic)
                                      relatedBandName.text(band)
                                      relatedBandName.attr({
                                          class: 'link',
                                          'bandName': band,
                                      })
                                      relatedBand.append(relatedBandPic)
                                      relatedBand.append(relatedBandName)
                                      $('#relatedBand').append(relatedBand)
                                      //$('#relatedBand').attr('class', 'border')
                              })
                      }
  
                
              })     
          }
  lastFMevent();
  
  $(document).on('click', '.link', relatedMove)
  function relatedMove() {
    //   console.log($(this).attr('bandName'))
      let newArtist = $(this).attr('bandName')
      localStorage.setItem('artist', JSON.stringify(newArtist))
    //   console.log(newArtist)
  
      location.href = 'artistPage.html'   
  }
 

   $('#welcome').text('Welcome ' + JSON.parse(localStorage.getItem('firstName')))

   if ($("body").data("title") === "userPage") {
    // console.log(currentArtist)
            let userName = JSON.parse(localStorage.getItem('userName'))
            // console.log(userName)

                let rootRef = firebase.database().ref(userName);
                let favoriteBands = ''
                    rootRef.once("value")
                        .then(function(snapshot) {
                            console.log(userName)
                            favoriteBands = snapshot.val().favFolder
                            console.log(favoriteBands)
                            bandsString = favoriteBands.toString()
                            console.log(bandsString)
                            let bandsArray = bandsString.split(',')
                            console.log(bandsArray)
                            console.log(userName)
                            let location = snapshot.val().city
                            //console.log(location)
                            
                            for (let i = 1 ; i < bandsArray.length; i++) {
                                
                                //console.log(location)
                                let bandUrl = 'https://rest.bandsintown.com/artists/' + bandsArray[i] + '?app_id=1e140eabdce95250b1ad6075934a113d'
                                $.ajax({
                                    url: bandUrl,
                                    method: 'GET',
                                })
                                .then(function(response){
                                    
                                    //console.log(location)
                                    let favoriteBand = $('<div>');
                                    favoriteBand.attr('class', 'relatedArtist')

                                    let favoriteBandPic = $('<img>')
                                            favoriteBandPic.attr('class', 'relatedArtistPic')
                                            bandPic = response.thumb_url 
                                            favoriteBandPic.attr('src', bandPic)
                                    let favoriteBandName = $('<p>')                                        
                                    let band = response.name
                                    favoriteBandName.attr({
                                        class: 'link',
                                        'bandName': band,
                                        })
                                        let testUrlEvents = 'https://rest.bandsintown.com/artists/' + bandsArray[i] + '/events?app_id=1e140eabdce95250b1ad6075934a113d'
                                     $.ajax({
                                        url: testUrlEvents,
                                        method: 'GET',
                                            })
                                        .then(function(response){
                                            //console.log(response) 
                                                for (i = 0; i < response.length; i++){
                                                    let city = response[i].venue.city
                                                    console.log(location)
                                                    console.log(city)

                                                    if (city === location){
                                                    //console.log(city)
                                                    console.log('bingo')
                                                    let date = moment(response[i].datetime).format('MMM Do')
                                                    //console.log(response[i].datetime)
                                                    //let event = $('<p>').text(city)
                                                    let event = $('<p>').text(date + " " + city) 
                                                    event.attr({
                                                        src: response[i].offers[0].url,
                                                        class: 'eventClass'
                                                    })   
                                                    favoriteBand.append(event)
                                                    }    
                                        }
                                     })
                                    favoriteBandName.text(band)
                                    favoriteBand.append(favoriteBandPic)
                                    favoriteBand.append(favoriteBandName)
                                    $('#savedArtist').append(favoriteBand)
                                })
                            
                        }
                        

                    })  
    }
})   