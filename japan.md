<head>
  <style>
    table,
    td {
      border: 1px solid white;
    }
    th {
      border: 2px solid white;
    }
    .tabx {
      tab-size: 8;
    }
    .recipeNameSelect {
        width: 320px;
        height: 30px;
        border: 1px solid #999;
        font-size: 18px;
        color: #1c87c9;
        background-color: #eee;
        border-radius: 5px;
        box-shadow: 4px 4px #ccc;
      }
    .button {
      text-align: center;
      border: none;
      color: white;
      padding: 10px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 12px;
      background-color: blue; /* Green */
   }
  </style>
</head>
<!-- Portion UI -->
<div>
  <h1>Japanese Recipies</h1>
</div>

<hr/>

<div id="createrec">
  <h1>Add, Update, or Delete Recipes</h1>
  
  <div style="margin-top:10px;margin-bottom:20px;">
    <select id="recipeNamesDropDown" class="recipeNameSelect"> </select>
  </div>
  <div id="addRecipe" style="margin-top:10px;margin-bottom:10px;">
    <div style="margin-top:10px;margin-bottom:10px;">
      <label for="recName">Recipe Name:</label>
      <input type="text" id="recName" name="recName" style="border:1px;border-radius:5px;" />
    </div>
    <div style="margin-top:10px;margin-bottom:10px;">
      <label for="recCalc">Recipe Portion Calculations:</label>
      <input type="text" id="recCalc" name="recCalc" value="1" style="border:1px;border-radius:5px;" />
    </div>
    <div style="margin-top:10px;margin-bottom:10px;">
      <label for="recDesc">Recipe Description:</label>
      <input type="text" id="recDesc" name="recDesc"  style="border:1px;border-radius:5px;"/>
    </div>
    <div id="createRecipeDiv" style="margin-top:10px;margin-bottom:10px;">
    </div>
    <div >
      <h1>Directions</h1>
      <p id="recDir" 
        style="margin-top:10px;margin-bottom:10px;padding:20px;border:1px solid white;border-radius:5px;" 
        contentEditable="true"></p>
      <!-- <label for="recDir">Recipe Directions:</label>
      <input type="textarea" id="recDir" name="recDir" style="width:500px;height:100px; border:1px;border-radius:5px;" /> -->
    </div>
    <div>
    <div style="margin-top:10px;margin-bottom:10px;">
      <button class = "button" type="button" style="margin-top: 20px;" onclick="addIngredient()">Add Ingredient</button>
      <button class = "button" type="button" style="margin-top: 10px;" onclick="submitRec()">Save Recipe</button>
      <button class = "button" type="button" style="margin-top: 10px;" onclick="deleteRec()">Delete Recipe</button>
      <button class = "button" type="button" style="margin-top: 10px;" onclick="calcRec()">Calculate Recipe Portions</button>
    </div>
    <div id="recResult" style="border: 1px solid blue;">
    </div>
  </div>

  <hr/>


  <script>
    let rec = null;
    // const url = "http://172.18.185.251:8091/api/jpFood";
    const url = "http://localhost:8091/api/jpFood/"; // (NOT WORKING; needs a fix)
    selectedRecName = "";

    // prepare fetch GET options
    const options = {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
    };


    function onPortionSubmit(e) {
      console.log(e.target.elements.portions.value);
      const portions = e.target.elements.portions.value ?? 1;
      e.preventDefault();
      var recInput =  extractRecipeUserInput();
      

      if (rec != null) {
        // for (const portions)
        measurements.innerHTML = "Work in Progress, add measurements from backend for " + portions + rec.name;
        console.log(portions)
        

      }
    }

    function calcRec() {
      rec = extractRecipeUserInput();
      const calculate_options = { 
      ...options, 
      method: 'POST',
      body: JSON.stringify(rec) 
      }; // clones and replaces method

      fetch(url + 'portions', calculate_options).then((response) => {
        // response contains valid result
        response.json().then((data) => {
          console.log("Portion Calculation Result:", data);
          var textbox = document.getElementById("recResult");
          text = `<b>${rec.name}</b>`;
          text = '<b>Ingredients:</b>';
          text = text + '<ul>';
          for (let ing of data.ingredients) {
            const itext = `<li>${ing.amount} ${ing.type} of ${ing.unit}</li>`;
            text += itext;
          }
          text += '</ul>';

          text += createDirections(data.directions);
          
          textbox.innerHTML = text;
        });
      });
    }
    
    function createDirections(dirs) {
      dirbox = '';
      i = 1;
      for (let dir of dirs) {
        const itext = `Step ${i++}   -   ${dir.step}<br>`;
        dirbox += itext;
      }
      return dirbox;
    }

    function filterByString(data, s) {
      return data.filter((e) => e.name.includes(s))[0];
    }
    totalIngredientRowIdx = 2;
    function addIngredient() {
      initIngredient(0, '', '',  totalIngredientRowIdx++);     
    }

    function initIngredient(amount = 0, type = "", unit = "", rowIdx) {
      var table = document.getElementById("createRecipe");
      var row = table.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      // Do string interpolation for each cell
      cell1.innerHTML = `<input type="text" size="20" name="ingNum[] "value="${amount}">`;
      cell2.innerHTML = `<input type="text" size="20" name="ingName[] "value="${type}">`;
      cell3.innerHTML = `<input type="text" size="20" name="ingMeas[] "value="${unit}">`;
      cell4.innerHTML = '<button type="button" id="delIng" onclick = "deleteIng(this)">x</button>';

      return totalIngredientRowIdx++;
    }

    function deleteIng(r) {
      var i = r.parentNode.parentNode.rowIndex;
      document.getElementById("createRecipe").deleteRow(i);
    }

    function submitRec() {
      var recInput =  extractRecipeUserInput();
      saveRec(recInput);

    }
    function extractRecipeUserInput() {
      var table = document.getElementById("createRecipe");
      var count = table.rows.length - 1;
      var name = document.getElementById("recName");
      var descr = document.getElementById("recDesc");
      
      var portions = document.getElementById("recCalc");
      if (portions.value === '') {
        intPortions = 1;
      }
      else {
        intPortions = parseInt(portions.value);
        if (Number.isInteger(intPortions) === false) {
          alert(portions.value + " is not a number, please input a number.");
          return;
        }
      }
      
      var jpFood = {
        name: name.value,
        description: descr.value,
        directions: extractDirectionValue(),
        portions : intPortions,
        ingredients: [],
      };

      for (i = 1; i <= count; i++) {
        var row = table.rows[i].getElementsByTagName("td");
        var tdNum = row[0];
        var tdMeas = row[1];
        var tdName = row[2];

        var inputNum = tdNum.getElementsByTagName("input")[0];
        inputAmnt = parseFloat(inputNum.value);

        function floatCheck() {
        isFloat(inputAmnt) === false
          alert(inputNum.value + " is not a number, please input a number.");
          return;
        }
        var inputMeas = tdMeas.getElementsByTagName("input")[0];
        var inputName = tdName.getElementsByTagName("input")[0];
        var ingred = {
          type: inputName?.value,
          amount: inputAmnt,
          unit: inputMeas?.value,
        };
        jpFood.ingredients.push(ingred);
      } // end for ingred
      return jpFood;
    }

    function extractDirectionValue(){
      const p = /\b(Step)\s+\d+\s+-\s+\b/;
      var text = document.getElementById("recDir").innerHTML;
      const lines = text.split('<br>');
      steps = [];
      for(l of lines) {
        s = l.replace('<div>', '').replace('</div>', '').replace(p, '');
        if (s !== '') {
          steps.push({id : 0, step: s});
        }
      }
      return steps;
    }
    function deleteRec() {
      rec = { name : selectedRecName };
      const delete_options = { 
      ...options, 
      method: 'POST',
      body: JSON.stringify(rec) 
      }; // clones and replaces method

      fetch(url + 'delete', delete_options).then((response) => {
        // response contains valid result
        response.json().then((data) => {
          console.log("all food ", data);
             
        getAllRecipes();
        });
      });
    }

    function getAllRecipes(name=undefined) { // gets recipes from API; adds to the recipe dropdown menu as well
      const recipesDropDown = document.getElementById("recipeNamesDropDown");
      document.querySelectorAll('#recipeNamesDropDown option').forEach(option => option.remove())
      
      //Async fetch API call to the database to create a new row
      fetch(url, options).then((response) => {
        let firstOptionKey = undefined;
        // response contains valid result
        response.json().then((data) => {
          console.log("all food ", data);
          //add a table row for the new/created food
          const tr = document.createElement("tr");
          for (let key in data) {
            let option = document.createElement("option");
            // Set first name on the dropdown so can fill in data form later
            firstOptionKey = firstOptionKey ?? data[key].name; // sets the first option at the top of the dropdown
            option.setAttribute("value", data[key].name);
            let optionText = document.createTextNode(data[key].name);
            option.appendChild(optionText);
            recipesDropDown.appendChild(option);
          }
          
          firstOptionKey = name ? name: firstOptionKey;
          selectedRecName = firstOptionKey;
          rec = filterByString(data, firstOptionKey);
          onRecipeNameChange(rec);
          recipesDropDown.addEventListener("change", (e) => { // changes dropdown based on what is clicked
            selectedRecName = e.target.value;
            rec = filterByString(data, e.target.value);
            onRecipeNameChange(rec); // when recipe name is clicked, display data is changed
          });
        });
      });
    }
    function onRecipeNameChange(rec) {
      var nameField = document.getElementById("recName"); // (recipe name)
      nameField.setAttribute('value', rec.name);
      var dirField = document.getElementById("recDir"); // (recipe directions)
      
      dirField.innerHTML =  createDirections(rec.directions);
      if (rec.description) {
        var descrField = document.getElementById("recDesc");
        descrField.setAttribute('value', rec.description);  // recipe description, puts recipe description
      }
      totalIngredientRowIdx = 0; // sets ingredient row (in the table) to 0, so rows can be added)
      createIngredientTable(rec.ingredients);
      
    }
    function removeIngredientRows() { // deletes ingredient rows by taking row total and subtracting; table outputs 1 less row
      const table = document.getElementById("createRecipe");
      if (table) {
        const rowLen = table.rows.length - 1;
        for(i=0; i < rowLen; i++) 
        {
          table.deleteRow(i);
        }
      }
    }

    function createIngredientTable(ingredients) { // creates ingredient table 
      
      const recipeDiv = document.getElementById("createRecipeDiv");
      
      let table = document.getElementById("createRecipe");
      if (table) {
        table.remove();
      }
      table = document.createElement('table'); // creates the table to house the recipe data
      table.setAttribute('id', 'createRecipe');

      var thead = table.insertRow(-1);
      ingHead = ['Number', 'Measurement Type', 'Ingredient Name'];
      for (var h = 0; h < ingHead.length; h++) {
        var th = document.createElement('th');              // TABLE HEADER.
        th.innerHTML = ingHead[h];
        thead.appendChild(th);
      }
      recipeDiv.appendChild(table); // appends ingredients to each row of the table
      if (ingredients) {
        rowIdx = 1;
        for (let ing of ingredients) {
          initIngredient(ing.amount, ing.unit, ing.type, rowIdx++); // displays as amount of ingredient (int), ing unit (cups, etc), and type (lemon, salt, etc)
        }
        totalIngredientRowIdx = rowIdx;
      }
      
    }
    function saveRec(rec) { // saves to database (sqlite)
      const post_options = { 
      ...options, 
      method: 'POST',
      body: JSON.stringify(rec) 
    }; // clones and replaces method

      fetch(url, post_options).then((response) => {
        // response contains valid result
        response.json().then((data) => {
          console.log("all food ", data);
             
        getAllRecipes(rec.name);
        });
      });
    }
    getAllRecipes(); // gets recipes from backend
  </script>
</div>