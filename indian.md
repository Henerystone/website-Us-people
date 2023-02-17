<!--- This section is Cascading Style Sheet (CSS) and applies to HTML -->
<style>
/* "row style" is flexible size and aligns pictures in center */
.row {
  align-items: center;
  display: flex;
}

/* "column style" is one-third of the width with padding */
.column {
  flex: 33.33%;
  padding: 5px;
}

.indian{
  color: white

}
</style>

## Indian food

<h1 class = "indian">Indian food is one of the spiciest food in the world. This spicy feature of Indian foods makes it interesting to spice enthusiasts and people who do not like spice alike. Some of the best Indian foods are:</h1>
<h1></h1>
<h2 class = "indian">Indian restaurant locator</h2>
<h1></h1>
<h3>Enter your Zip code to find restaurants near you!</h3>
<p>
  Zip Code:
  <input type="text" name="name" id="name" required>
  <button type = "button" onclick = "getRestaurants(x.value)">Enter!</button>
</p>
<script>
  function getRestaurants(x) {
    const url = "https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/zipcode/90210/0";
    const headers = {
      "X-RapidAPI-Key": "dee5dcce83msh780914d639facb7p1f43c5jsn4c4a7717bb03",
      "X-RapidAPI-Host": "restaurants-near-me-usa.p.rapidapi.com"
    };
    fetch(url, { headers })
      .then(response => response.json())
      .then(data => {
        const zip = data.restaurants;
        const x = parseInt(prompt("Zip Code:"));
        console.log("Restaurants Near You:");
        for (const [key, value] of Object.entries(zip[0])) {
          console.log(key, value);
        }
        console.log("Restaurants");
        for (const zipCode of zip) {
          if (zipCode.zipCode === x) {
            for (const [key, value] of Object.entries(zipCode)) {
              document.getElementById("replace").innerHTML = "Restaurants"
              document.getElementById("replace").innerHTML = (key, value)
            }
          }
        }
    })
    .catch(error => console.error(error));
  }
</script> 
<p>
  <h3 id="replace"></h3>
</p>
<table>
  <tr>
    <th class = "indian">6</th>
    <th class = "indian">Masala Dosa</th>
    <th class = "indian"><img src="/images/dosa.jpg" alt="dosa"></th>
    <th class = "indian">A sort of Indian pancake, filled with spices and potatoes, a perfect mix of bland and spicy, makes for a good breakfast and is consumed regularly in South India.</th>
  
  </tr>
  <tr>
    <th class = "indian">5</th>
    <th class = "indian">Pav Bhaji</th>
    <th class = "indian"><img src="/images/pav.jpg" alt="pav bhaji"></th>
    <th class = "indian">A kind of bread, eaten with a mix of vegetables and masala</th>

  </tr>
  <tr>
    <th class = "indian">4</th>
    <th class = "indian">Aloo Paratha</th>
    <th class = "indian"><img src="/images/paratha.jpg" alt="aloo paratha"></th>
    <th class = "indian">A kind of flatbread stuffed with mashed potatoes</th>

  </tr>
  <tr>
    <th class = "indian">3</th>
    <th class = "indian">Paneer and Naan</th>
    <th class = "indian"><img src="/images/paneer.jpg" alt="panner and naan"></th>
    <th class = "indian">A kind of Indian flatbread eaten with Indian cottage cheese mixed with spinach</th>

  </tr>
  <tr>
    <th class = "indian">2</th>
    <th class = "indian">Puran Poli</th>
    <th class = "indian"><img src="/images/puran.jpg" alt="puran poli"></th>
    <th class = "indian">Indian Flatbrad filled with sugar and jaggery</th>
 
  </tr>
  <tr>
    <th class = "indian">1</th>
    <th class = "indian">Pani Puri</th>
    <th class = "indian"><img src="/images/pani.jpg" alt="pani puri"></th>
    <th class = "indian">Round,small and edible bowls filled with chutney and sweet water</th>

  </tr>
</table>