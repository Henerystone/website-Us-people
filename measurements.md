
<img class=headcrop src="images/Pancake-Prep-016.jpg">

## Metric Mass to Imperial Volume Converter
<form id="form">
    <p><label>
        Starting Value (no units): 
        <input type="text" name="name" id="name" required>
    </label></p>
    <p><label>
        <input type="radio" id="0" name="Direction" value="MV">
        <label for="0">Mass (Grams) to Volume (Cups)</label>
        <input type="radio" id="1" name="Direction" value="VM">
        <label for="1">Volume (Cups) to Mass (Grams)</label>
    </label></p>
    <p><label>
        <input type="radio" id="0" name="Ingredient" value="0">
        <label for="0">Flour</label>
        <input type="radio" id="1" name="Ingredient" value="1">
        <label for="1">Sugar</label>
        <input type="radio" id="2" name="Ingredient" value="2">
        <label for="2">Salt</label>
        <input type="radio" id="3" name="Ingredient" value="3">
        <label for="3">Milk</label>
    </label></p>
    <p>
        <button type="button" onclick="OutputResults()">Convert!</button>
    </p>
</form>
<script>
    function OutputResults() {
        var DirChoice;
        var IngChoice;
        var DirOpt = document.getElementsByName('Direction') ;
        var i = 0
        for (i = 0; i < DirOpt.length; i++) {
            if (DirOpt[i].checked){
                DirChoice = DirOpt[i].value;
            } 
        }
        var i = 0
        var IngOpt = document.getElementsByName('Ingredient') ;
        for (i = 0; i < IngOpt.length; i++) {
            if (IngOpt[i].checked){
                IngChoice = IngOpt[i].value;
            }
        }
        console.log(DirChoice,IngChoice)
    }
</script>

<!-->
SECTION BREAK
</!-->

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


