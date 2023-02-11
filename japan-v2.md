
<head>
<style>
  table, td {
    border: 1px solid white;
  }
  .btn-text-center{
    text-align: center;	
  }
</style>
</head>

<div>
  <h1>Japanese Recipies</h1>
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
<div>
    <form id = "addRecipe" >
      <div>
        <label for="recName">Recipe Name:</label>
        <input type="text" id="recName" name="recName">
      </div>
      <div>
        <label for="recName">Recipe Description:</label>
        <input type="text" id="recDesc" name="recDesc">
      </div>
      <table id = "createRecipe">
          <tr>
             <th>
              <label for="ingNum">Number</label>
            </th>
            <th>
              <label for="ingMeas">Measurement Type</label>
            </th>
             <th>
               <label for="ingName">Ingredient Name</label>
            </th>
            </tr>
            <tr>
              <td>
                <input type="text" id="ingNum" name="ingNum">
              </td>
              <td>
                <input type="text" id="ingMeas" name="ingMeas">
              </td>
              <td>
                <input type="text" id="ingName" name="ingName">
              </td>
              <td>
                <button type="button" id="delIng" onclick = "deleteIng(this)">x</button>
              </td>
          </tr>
        </table>
      <div>
        <button type="button" style = "margin-top: 20px" onclick = "addIngredient()">Add Ingredient</button>
      </div>
      <div class="btn-text-center">
        <button type="button" style = "margin-top : 10px" onclick = "submitRec()">Submit Recipe</button>
      </div>
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
    const addRecipe = document.getElementById('addRecipe');

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
totalIngredientRowIdx = 2;
function addIngredient(){
  var table = document.getElementById("createRecipe");
  var row = table.insertRow(totalIngredientRowIdx);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  cell1.innerHTML = '<input type="text" size="20" name="ingNum[]"/>'
  cell2.innerHTML = '<input type="text" size="20" name="ingMeas[]"/>'
  cell3.innerHTML = '<input type="text" size="20" name="ingName[]"/>'
  cell4.innerHTML = '<button type="button" id="delIng" onclick = "deleteIng(this)">x</button>'
  totalIngredientRowIdx++;
}

function deleteIng(r) {
  var i = r.parentNode.parentNode.rowIndex;
  document.getElementById("createRecipe").deleteRow(i);
}

function submitRec(){
  var table = document.getElementById("createRecipe");
  var count = table.rows.length - 1;
  var name = document.getElementById("recName");
  var descr = document.getElementById("recDesc");
  console.log(count);
  var jpFood = {
  Name: "xxxx",
  Description: "ddd",
  Ingredients: []
  };
  

  for(i=1; i <= count; i++) {
    var row = table.rows[i].getElementsByTagName('td');
  var tdNum = row[0];
  var tdMeas = row[1];
  var tdName = row[2];
  
  var inputNum = tdNum.getElementsByTagName('input')[0];
  inputAmnt = parseInt(inputNum.value);

  if (Number.isInteger(inputAmnt) === false) {
    alert(inputNum.value + " is not a number, please input a number.");
    return;
  }
  var inputMeas = tdMeas.getElementsByTagName('input')[1];
  var inputName = tdName.getElementsByTagName('input')[2];
  var ingred = {
    "type": inputName,
    "amount": inputNum,
    "unit": inputMeas,
  };
console.log(jpFood)
jpFood.Ingredients.push(ingred)
}
}

get_food();
</script>
