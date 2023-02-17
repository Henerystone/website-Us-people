(function () {
    var moreUrl;
    var baseUrl = "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes";
    var results;
    $("#submit-btn").on("click", function () {
        var userInput = $("input[name=user-input]").val();
        var albumOrArtist ='';

        $.ajax({
            url: baseUrl,
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "fe40d3bb9emshe6ab2e30544f3a2p19a074jsn1a329285a28f",
                "X-RapidAPI-Host": "tasty.p.rapidapi.com"
            },
            data: {
                q: userInput,
                type: albumOrArtist,
            },
            beforeSend: function() {
                $('#loading').show();
             },
             complete: function(){
                $('#loading').hide();
             },
            success: function (data) {
                data = data.results;
                if (!data.length) {
                    results = '<div>No results for "' + userInput + '"</div>';
                } else {
                    results =
                        '<div>Search results for: "' + userInput + '"</div>';
                }
                $("#results-info").html(results);
                generateResultsHtml(data);
                $("#results-container").html(generateResultsHtml(data));
            },
        });
    });

    function generateResultsHtml(spotifyData) {
        var imgUrl = "/default.jpg";
        var html = "";
        for (var i = 0; i < spotifyData.length; i++) {
            if (spotifyData[i].thumbnail_url.length > 0) {
                imgUrl = spotifyData[i].thumbnail_url;
            }
            if (spotifyData[i].name.length > 15) {
                spotifyData[i].name = spotifyData[i].name.slice(0, 15) + "...";
            }

            html +=
                '<div class="artist-container"><a href="details.html?id='+spotifyData[i].id+'"><img src="' +                imgUrl +
                '" class="artist-img"><p>' +
                spotifyData[i].name +
                "</p></a></div>";
        }
        return html;
    }
})();
