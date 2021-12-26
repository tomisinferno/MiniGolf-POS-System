/*
Modified by:Oluwatomi
Date: 02/04/2021
Purpose: Implemented jQuery
*/

//ready after page loads
$(document).ready();

//event listeners
window.addEventListener("load", init, false);

//main function calling other functions
function init() {
    document.getElementById("toggleDark").addEventListener("click", darkMode);
    document.getElementById("toggleLight").addEventListener("click", lightMode);
    document.getElementById("resetBtn").addEventListener("click", resetForm);
    document.getElementById("changeButton").addEventListener("click", calculateChange);
    document.getElementById("adults").addEventListener("change", updateTotals);
    document.getElementById("children").addEventListener("change", updateTotals);
    document.getElementById("caa").addEventListener("change", updateTotals);
    document.getElementById("mil").addEventListener("change", updateTotals);
    document.getElementById("fun").addEventListener("change", updateTotals);
}

// declare global vars
let $totalAfterTax = 0.00;

// create function to do the math calculation
function updateTotals() {
    // get the data
    let $adults = $("#adults").val();
    let $children = $("#children").val();

    // ensure a qty is selected for above
    if ($adults == 0 && $children == 0) {
        // they need to select a qty for children or adults
        alert("You must select a quantity for adults or children.");
    } else {
        // calculate costs

        document.getElementById("numAdults").value = $adults;
        let $adultTotal = $adults * 4.00;

        document.getElementById("numChildren").value = $children;
        let $childTotal = $children * 2.00;

        $("#totalAdultsDiv").html("$" + $adultTotal.toFixed(2));
        $("#totalChildrenDiv").html("$" + $childTotal.toFixed(2));

        let $totalBeforeTax = ($adultTotal + $childTotal);

        // get discount radio choice
        let $deduct = 0;
        let $discountString = "None";
        if (document.getElementById("caa").checked == true) {
            $deduct = $totalBeforeTax * .10;
            $totalBeforeTax = $totalBeforeTax - $deduct;
            $discountString = "CAA saved $" + $deduct.toFixed(2);
        } else if (document.getElementById("mil").checked == true) {
            $deduct = $totalBeforeTax * .25;
            $totalBeforeTax = $totalBeforeTax - $deduct;
            $discountString = "Military saved $" + $deduct.toFixed(2);
        } else if (document.getElementById("fun").checked == true) {
            $deduct = $totalBeforeTax * .50;
            $totalBeforeTax = $totalBeforeTax - $deduct;
            $discountString = "Super Fun Club saved $" + $deduct.toFixed(2);
        }
        $("#discountString").html($discountString);

        $totalAfterTax = $totalBeforeTax * 1.1;
        $("#totalBeforeTaxDiv").html("$" + $totalBeforeTax.toFixed(2));
        $("#totalAfterTaxDiv").html("$" + $totalAfterTax.toFixed(2));
    } // end if no adults or children selected


} // end update Totals function

//create function to reset the form
function calculateChange() {
    let $amountGiven = parseFloat(prompt("Enter amount client gave you"));
    let $changeDue = $amountGiven - $totalAfterTax;

    $("#changeDue").html("$" + $changeDue.toFixed(2));
    document.getElementById("changeOutput").style.display = "block";
}

//create function to reset the form
function resetForm() {
    window.location = "miniGolfKiosk.html";
}

//darkmode attributes
function darkMode() {
    $("#container").css("background-color", "black");
    $("#container").css("color", "white");
    $("#topArea fieldset, #topArea legend").css("background-color", "grey");
    $("#bottomArea fieldset, #bottomArea legend").css("background-color", "grey");
    $("button").css("background-color", "darkslategrey");

}

//lightmode attributes
function lightMode() {
    $("#container").css("background-color", "white");
    $("#container").css("color", "black");
    $("#topArea fieldset, #topArea legend").css("background-color", "#a8ff78");
    $("#bottomArea fieldset, #bottomArea legend").css("background-color", "#78ffd6");
    $("button").css("background-color", "#45b649");
    $("html").css("background-color", "grey");
}
