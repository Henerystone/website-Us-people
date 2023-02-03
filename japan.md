<thead>
  <tr>
    <th>Name</th>
    <th>ID</th>
    <th>Actions</th>
  </tr>
  </thead>
  <tbody id="foodtable">
    <!-- javascript generated data -->
  </tbody>
</table>

<script>
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
     
    //Async fetch API call to the database to create a new user
    fetch(url, options).then(response => {
        // prepare HTML search result container for new output
        const resultContainer = document.getElementById("foodtable");
        
        // response contains valid result
        response.json().then(data => {
            console.log('all food ', data);
            //add a table row for the new/created userId
            const tr = document.createElement("tr");
            for (let key in data) {
                 
                
            }
            //append the DOM row to the table
            table.appendChild(tr);
        })
    })
}
get_food()
</script>


<table>
  <th></th>
</table>