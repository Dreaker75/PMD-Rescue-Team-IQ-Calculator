document.addEventListener("DOMContentLoaded", () => {
    selected_types = [];
    
    Object.keys(Type).forEach(type => {
        document.getElementById("type-1-selection").innerHTML += `<br><input type="checkbox" id="checkbox-${type}" name="type-selection" value="${type}">
        <label for="checkbox-${type}">${type}</label>`;
    });

    function disableRemainingTypes() {
        Array.from(document.querySelectorAll('input[type="checkbox"][name="type-selection"]:not(:checked)')).forEach(function (element) {
            element.disabled = true;
        });
    }

    function enableAllTypes() {
        Array.from(document.querySelectorAll('input[type="checkbox"][name="type-selection"]')).forEach(function (element) {
            element.disabled = false;
        });
    }

    Array.from(document.querySelectorAll('input[type="checkbox"][name="type-selection"]')).forEach(function (checkbox) {
        checkbox.addEventListener('change', onCheckboxClick);
    })

    function onCheckboxClick() {
        if (this.checked)
            selected_types.push(this.value);
        else
            selected_types.splice(selected_types.indexOf(this.value), 1);

        selected_types.length > 1 ? disableRemainingTypes() : enableAllTypes();

        IQGains();
    }
})

function IQGains() {
    // TODO: Display how much IQ each gummi gives from the selected typing combination

    if (selected_types.length == 0) {
        document.getElementById("IQ-gained-div").innerHTML = "";
        return;
    }

    var type1 = selected_types.length > 0 ? selected_types[0] : "";
    var type2 = selected_types.length > 1 ? selected_types[1] : "";

    document.getElementById("IQ-gained-div").innerHTML = "";

    Gummi.forEach(gummi => {
        document.getElementById("IQ-gained-div").innerHTML += `${gummi} Gummi: ${IQGained(gummi, type1, type2)}<br>`;
    })
}

function IQGained(gummi, type1, type2 = "") {
    return Type[type1].gummies[gummi] + (type2 != "" ? Type[type2].gummies[gummi] : 0);
}