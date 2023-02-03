
<img class=headcrop src="images/Pancake-Prep-016.jpg">

## Metric Mass to Imperial Volume Converter
<form>
    <p><label>
        Starting Value (no units): 
        <input type="text" name="name" id="name" required>
    </label></p>
    <p><label>
        <input type="radio" id="M2V" name="Direction" value="M2V">
        <label for="M2V">Mass (Grams) to Volume (Cups)</label>
        <input type="radio" id="V2M" name="Direction" value="V2M">
        <label for="V2M">Volume (Cups) to Mass (Grams)</label>
    </label></p>
    <p>
        <p id="demo"></p>
        <script>
        const cars = ["Flour", "Sugar", "Salt", "Milk", "Cinnamon", "Audi"];
        let text = "";
        for (let i = 0; i < cars.length; i++) {
            '<input type="radio" id="'+cars[i]+'" name="Ingredient" value="'+cars[i]+'"><br><label for="'+cars[i]+"'+cars[i]+'</label><br>';
        }
        document.getElementById("demo").innerHTML = text;
        </script>
    </p>
    <p><label>
        <input type="radio" id="001" name="Ingredient" value="001">
        <label for="001">Flour</label>
        <input type="radio" id="002" name="Ingredient" value="002">
        <label for="002">Sugar</label>
        <input type="radio" id="003" name="Ingredient" value="003">
        <label for="003">Salt</label>
        <input type="radio" id="004" name="Ingredient" value="004">
        <label for="004">Milk</label>
    </label></p>
    <p>
        <button>Convert!</button>
    </p>
</form>

<h3>Add an Ingredient</h3>
<form>
    <p><label>
        Name:
        <input type="text" name="name" id="name" required>
    </label></p>
    <p><label>
        Density in grams per tsp:
        <input type="text" name="uid" id="uid" required>
    </label></p>
    <p>
        <button>Create</button>
    </p>
</form>


