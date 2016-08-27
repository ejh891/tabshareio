$(document).ready(function() {
    var exchangeRate = 0.77;

    var getExchangeRate = function () {
        $.get( "http://api.fixer.io/latest?base=CAD&symbols=CAD,USD", function(data) {
            exchangeRate = data.rates.USD || 0.77;
            displayExchangeRate(exchangeRate);
        });
    };

    var exchangeRate = getExchangeRate();

    var validateCurrency = function ($inputElem) {
        var numStr = $inputElem.val();
        if (validateNumber($inputElem) !== false)
            return (+numStr).toFixed(2);
        return false;
    };

    var validateNumber = function ($inputElem) {
        var numStr = $inputElem.val();
        var numNum = +numStr;
        if (isNaN(numNum) || numNum === 0)
            return false;
        return numNum;
    };

    var splitPossible = function (totalAmount, numPeople) {
        return totalAmount * 100 > numPeople;
    };

    var displaySplitCost = function (num) {
        $("#split-cost").text(num.toFixed(2));
    };

    var displayExchangeRate = function (num) {
        $("#exchange-rate-value").text(exchangeRate);
    };

    var calculateSplit = function () {
        var totalAmountCad = validateCurrency($("input[name=total_amount_cad]"));
        var numPeople = validateNumber($("select[name=num_people]"));

        if (totalAmountCad === false || numPeople === false || !splitPossible(totalAmountCad, numPeople)) {
            displaySplitCost(0); // reset display
            return;
        }

        var costPerPersonCad = totalAmountCad / numPeople;
        var costPerPersonUsd = costPerPersonCad * exchangeRate;

        displaySplitCost(costPerPersonUsd);
    };

    $(".input-parameter").on("change keyup paste", calculateSplit);
});
