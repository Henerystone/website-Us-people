(function () {
    var moreUrl;
    var baseUrl = "https://tasty.p.rapidapi.com/recipes/get-more-info";
    var results;
    var urlParams = new URLSearchParams(window.location.search);
    var userInput = urlParams.get('id');

    $.ajax({
        url: baseUrl,
        method: "GET",
        headers: {
            "X-RapidAPI-Key": "fe40d3bb9emshe6ab2e30544f3a2p19a074jsn1a329285a28f",
            "X-RapidAPI-Host": "tasty.p.rapidapi.com"
        },
        data: {
            id: userInput
        },
        beforeSend: function() {
            $('#loading').show();
         },
         complete: function(){
            $('#loading').hide();
         },
        success: function (data) {
            $("#results-container").html(generateResultsHtml(data));
        },
    });


    function generateResultsHtml(spotifyData) {
        var imgUrl = "/default.jpg";
        var html = "";
        var htmlinstruction = "";
        for (var i = 0; i < spotifyData.instructions?.length; i++) {
            htmlinstruction +=
            
            '              <span>Step: '+spotifyData.instructions[i].position+'</span>'+
'                          <label for="red"><span>'+spotifyData.instructions[i].display_text+'</span></label>';
        }
            html +=
                '<div class="left-column">'+
                '<video width="70%" controls="controls" style="margin-left: 25px;margin-top: 135px;">'+
                 '<source src="'+spotifyData.original_video_url +'" type="video/mp4">  </video>'+
                  '		    </div>'+
                  '                <div class="right-column">'+
                  '                  <div class="product-description">'+
                  '                    <span>'+spotifyData.yields +'</span>'+
                  '                    <h1>'+spotifyData.name +'</h1>'+
                  '                    <p>'+spotifyData.description +'</p>'+
                  '                  </div>'+
                  '                  <div class="product-configuration">'+
                  '                    <div class="product-color">'+
                  htmlinstruction+
                  '                    </div>'+
                  '                    <div class="cable-config">'+
                  '                      <span>Nutritions</span>'+
                  '                      <div class="cable-choose">'+
                  '                        <button>Calories: '+spotifyData.nutrition?.calories +'</button>'+
                  '                        <button>Carbohydrates: '+spotifyData.nutrition?.carbohydrates
                  +'</button>'+
                  '                        <button>Fat: '+spotifyData.nutrition?.fat +'</button>'+
                  '                      </div>'+
                  '                      <div class="cable-choose">'+
                  '                        <button>Fiber: '+spotifyData.nutrition?.fiber +'</button>'+
                  '                        <button>Protein: '+spotifyData.nutrition?.protein +'</button>'+
                  '                        <button>Sugar: '+spotifyData.nutrition?.sugar +'</button>'+
                  '                      </div>'+
                  '                      Keywords: '+spotifyData.keywords +
                  '                    </div>'+
                  '                  </div>'+
                  '                  <div class="product-price">'+
                  '                    <a href="#" class="cart-btn">Rating ('+ spotifyData.user_ratings?.score +')</a>'+
                  '                  </div>'+
                  '                </div>';
        
        return html;
    }
})();
