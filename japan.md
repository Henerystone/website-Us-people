
<div>
  <h1>MY rec</h1>
  <select id="recipiesDropDown">
  </select>
  <div id="recipeDisplay">
    <p>Test text</p>
  </div>
  <div>
    <form id = "submitPortions" >
      <label for="portions">Portions:</label>
      <input type="text" id="portions" name="portions"><br><br>
      <input type="submit" value="Submit">
    </form>
  </div>
  
  <div id = 'measurements'/>
  
</div>
<hr/>
<div id="createrec">
<h1>Add/Update/Delete Recipes</h1>
</div>

<script>
  let rec = null;

function get_food(){
    
  // const url = "http://172.18.185.251:8086/api/jpFood";
  const url = "http://localhost:8086/api/jpFood/" // (NOT WORKING; needs a fix)

  // prepare fetch GET options
  const options = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
     
    // prepare HTML search result container for new output
    //const resultContainer = document.getElementById("foodtable");
    const recipiesDropDown = document.getElementById("recipiesDropDown");
    const form = document.getElementById('submitPortions');
    form.addEventListener('submit', onPortionSubmit);
    const measurements = document.getElementById("measurements");
    
    //Async fetch API call to the database to create a new user
    fetch(url, options).then(response => {

        // response contains valid result
        response.json().then(data => {
            console.log('all food ', data);
            //add a table row for the new/created userId
            const tr = document.createElement("tr");
            for (let key in data) {
                 console.log (data[key].name);
                
            }
            for (let key in data) {
              let option = document.createElement("option");
              option.setAttribute('value', data[key].name);
              let optionText = document.createTextNode(data[key].name);
              option.appendChild(optionText);
              recipiesDropDown.appendChild(option);
              }
              recipiesDropDown.addEventListener("change", e => {
                console.log(e.target.value);
                 rec = filterByString(data, e.target.value);
                const recipeDesc = document.getElementById("recipeDisplay");
                recipeDesc.innerHTML = rec.directions;
                console.log ('Test ', rec);
                })
            
            //append the DOM row to the table
            // table.appendChild(tr);
        })
    })
}
function onPortionSubmit(e) {
  console.log(e.target.elements.portions.value);
  const portions = e.target.elements.portions.value ?? 1;
  e.preventDefault();
  
  if (rec != null)  {
    measurements.innerHTML = "Work in Progress, add measurements from backend for " + portions + rec.name;

  }

}
function filterByString(data, s) {
   return data.filter(e => e.name.includes(s) )[0]
  }
get_food()
</script>
