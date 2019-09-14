$("#artistSearch").submit(function(e) {

    let search = $("#artist_name").val()
    
    e.preventDefault();

    var find = ' ';
    var re = new RegExp(find, 'g');

    search1 = search.replace(re, '_');
    
    
    
    let wikiArticle = "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + search1 + "&callback=?"
    
  
    $.ajax({
        type: "GET",
        url: wikiArticle,
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {

            var markup = data.parse.text["*"];
            var blurb = $('<div></div>').html(markup);
            $('#article').html($(blurb).find('p'));

        },
        error: function (errorMessage) {
        }
    }); 
})
