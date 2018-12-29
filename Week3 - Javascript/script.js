
let table = document.getElementById("tbody");
let submitBtn = document.getElementById("submit");
let uniqueId = 1;

// SUBMIT EVENT
submitBtn.addEventListener("click", (event) => {
    event.preventDefault(); 
    let formName = document.getElementById("formName").value;
    let formAdress = document.getElementById("formAdress").value;
    let formCity = document.getElementById("formCity").value;
    let formPinCode = document.getElementById("formPinCode").value;
    let formCountry = document.getElementById("formCountry").value;

    // creating row
    let tr = document.createElement("tr");

    // creating table cells for every data
    let idTd = document.createElement("td");
    let nameTd = document.createElement("td");
    let adressTd = document.createElement("td");
    let cityTd = document.createElement("td");
    let pinCodeTd = document.createElement("td");
    let countryTd = document.createElement("td");
    let actionBtnsTd = document.createElement("td");

    // Putting Table elements and Values into Object
    let objData = {
        "tr" : tr,
        "idTd" : idTd,
        "nameTd" : nameTd,
        "adressTd" : adressTd,
        "cityTd" : cityTd,
        "pinCodeTd" : pinCodeTd,
        "countryTd" : countryTd,
        "actionBtnsTd" : actionBtnsTd,
        "id" : uniqueId,
        "nameValue" : formName,
        "adressValue" : formAdress,
        "cityValue" : formCity,
        "pinCodeValue" : formPinCode,
        "countryValue" : formCountry
    }
    // Calling insertData function and passing object with elements and values
    insertData(objData); 
    
    // Creating unique buttons for every row
    let readRowButton = document.getElementById(`readBtn${objData.id}`);
    let updateRowButton = document.getElementById(`updateBtn${objData.id}`);
    let deleteRowButton = document.getElementById(`deleteBtn${objData.id}`);

    // Read button event listener - calling readRow()
    readRowButton.addEventListener("click", () => {
        readRow(objData);
    });
    // Update/save button event listener - calling update_save_row()
    updateRowButton.addEventListener("click", () => {
        // change icon edit to save and vice versa
        let targetIcon = updateRowButton.getElementsByClassName("fas")[0];
        if(updateRowButton.value == "update"){
            targetIcon.classList.remove("fa-user-edit");
            targetIcon.classList.add("fa-save");
        }
        else {
            targetIcon.classList.remove("fa-save");
            targetIcon.classList.add("fa-user-edit");
        }
        // calling function update_save_row with passed objData and buttons
        update_save_row(objData, readRowButton, updateRowButton, deleteRowButton);
    });
    // Delete button even listener - calling deleteRow()
    deleteRowButton.addEventListener("click", () => {
        deleteRow(objData);
    });
    uniqueId += 1;
});
// END OF SUBMIT EVENT


// FUNCTIONS:
// Read row function
function readRow(objData){
        alert(
            "Name: "+ objData.nameValue 
            + "\nAdress: "+ objData.adressValue 
            + "\nCity: "+ objData.cityValue 
            + "\nPin code: "+ objData.pinCodeValue 
            + "\nCountry: "+ objData.countryValue);
    };
// Update/Save function
function update_save_row (objData, readRowButton, updateRowButton, deleteRowButton){
    switch (updateRowButton.value){
        // UPDATE - edit content
        case "update": {
            updateRowButton.value = "save";
            deleteRowButton.style.display = "none";
            readRowButton.style.display = "none";
            // Now we make table cells into input text fields
            objData.nameTd.innerHTML = `<input type="text" value="${objData.nameValue}" id="_name${objData.id}"/>`;
            objData.adressTd.innerHTML = `<input type="text" value="${objData.adressValue}" id="_adress${objData.id}"/>`;
            objData.cityTd.innerHTML = `<input type="text" value="${objData.cityValue}" id="_city${objData.id}"/>`;
            objData.pinCodeTd.innerHTML = `<input type="text" value="${objData.pinCodeValue}" id="_pinCode${objData.id}"/>`;
            objData.countryTd.innerHTML = `<input type="text" value="${objData.countryValue}" id="_country${objData.id}"/>`;
        }
        break;
         // SAVE button click event
        case "save": {
            updateRowButton.value = "update";
            deleteRowButton.style.display = "inline";
            readRowButton.style.display = "inline";
            // get values from changed data
            objData.nameValue = document.getElementById(`_name${objData.id}`).value;
            objData.adressValue = document.getElementById(`_adress${objData.id}`).value;
            objData.cityValue = document.getElementById(`_city${objData.id}`).value;
            objData.pinCodeValue = document.getElementById(`_pinCode${objData.id}`).value;
            objData.countryValue = document.getElementById(`_country${objData.id}`).value;
            // insert in cells
            objData.nameTd.innerHTML = objData.nameValue;
            objData.adressTd.innerHTML = objData.adressValue;
            objData.cityTd.innerHTML = objData.cityValue;
            objData.pinCodeTd.innerHTML = objData.pinCodeValue;
            objData.countryTd.innerHTML = objData.countryValue;
        }
        break;
    }
}
// Delete Row function
function deleteRow(objData){
    objData.tr.remove();
    // Rearranging row index after deleted row:
    for (i=0; i < table.rows.length; i++){
        table.rows[i].cells[0].innerHTML = i+1;
    }
}
// Function insertData - Inserting data from form to table
function insertData(objData) {
    // Putting value into cells
    objData.idTd.innerHTML = table.rows.length + 1;
    objData.nameTd.innerHTML = objData.nameValue;
    objData.adressTd.innerHTML = objData.adressValue;
    objData.cityTd.innerHTML = objData.cityValue;
    objData.pinCodeTd.innerHTML = objData.pinCodeValue;
    objData.countryTd.innerHTML = objData.countryValue;
    objData.actionBtnsTd.innerHTML = `
        <button id="readBtn${objData.id}" class="btn"><i class="fab fa-readme"></i></button>
        <button id="updateBtn${objData.id}" class="btn" value="update"><i class="fas fa-user-edit"></i></button>
        <button id="deleteBtn${objData.id}" class="btn"><i class="fa fa-trash"></i></button>
    `;
    // Appending td into row
    objData.tr.appendChild(objData.idTd);
    objData.tr.appendChild(objData.nameTd);
    objData.tr.appendChild(objData.adressTd);
    objData.tr.appendChild(objData.cityTd);
    objData.tr.appendChild(objData.pinCodeTd);
    objData.tr.appendChild(objData.countryTd);
    objData.tr.appendChild(objData.actionBtnsTd);
    // Appending row into table
    table.appendChild(objData.tr);
}
