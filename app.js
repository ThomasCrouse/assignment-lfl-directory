// Your work here

//"Widget" variables that create "divs" for their respective forms/search bars
let addWidget = document.createElement("div");
let verifyWidget = document.createElement("div");
let checkWidget = document.createElement("div");
let updateWidget = document.createElement("div");
let updateResult = document.createElement("div");
let deleteWidget = document.createElement("div");

//Had a problem with stacking widgets, created this function to clear forms/search bars before creation of new one
function clearWidgets(){
    addWidget.remove();
    verifyWidget.remove();
    checkWidget.remove();
    updateWidget.remove();
    deleteWidget.remove();
}

//Opens left-side navbar
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

//Closes left-side navbar
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//Views all employee information in cards
function viewAllEmployees(){
    document.getElementById('main_section').innerHTML = '';
    let viewAll=document.createElement('ul')
    for (let i = 0; i < employeeList.length; i++){
        viewAll.innerHTML += `
        <li>
            <ul>
                <li>${employeeList[i].name}</li>
                <li>${employeeList[i].officeNum}</li>
                <li>${employeeList[i].phoneNum}</li>
            </ul>
        </li>`
    }
    document.getElementById('main_section').appendChild(viewAll);
}

//Creates the form to enter new employee information
function addEmployeeWidget(){
    clearWidgets();
    addWidget.innerHTML = '<input id="name" type="text" placeholder="Name"> <input id="office_number" type="number" placeholder="Office Number"> <input id="telephone_number" type="tel" placeholder="Telephone Number"> <button id="add_employee" onclick="addEmployee()">Add</button>';
    document.getElementById("main_section").prepend(addWidget);
}

//Adds the new employee to "employee-list" when called from "addEmployeeWidget"
function addEmployee(){
    let name = document.getElementById("name").value;
    let officeNumber = document.getElementById("office_number").value;
    let telephoneNumber = document.getElementById("telephone_number").value;
    if (name && officeNumber && telephoneNumber){
        employeeList.push({
            name: document.getElementById("name").value,
            officeNum: document.getElementById("office_number").value,
            phoneNum: document.getElementById("telephone_number").value
        });
        viewAllEmployees();
    }else{
        alert ("All fields must be completed.")
    }
}

//Creates the search bar to look-up employee and clears employee cards from UI
function verifyEmployeeWidget(){
    document.getElementById('main_section').innerHTML = "";
    clearWidgets();
    verifyWidget.innerHTML = '<input id="name" type="text" placeholder="Name"> <button id="verify_employee" onclick="verifyEmployee()">Search</button>';
    document.getElementById("main_section").prepend(verifyWidget);
}

//Compares the search term from "verifyEmployeeWidget" to "employee-list" and returns a simple "yes" or "no" text indicator per requirement screenshots 
function verifyEmployee(){
    if(document.getElementById("name").value){
        let name = document.getElementById("name").value;
        let check = employeeList.filter(employee => employee.name.toLowerCase() === name);
        if(check.length === 1){
            checkWidget.innerHTML="<p>yes</p>"
        }else{
            checkWidget.innerHTML="<p>no</p>"
        }
    }else{
        alert("All fields must be completed.")
    }
    document.getElementById('main_section').appendChild(checkWidget);
}

//Creates form to update employee information and clears "main_section" of UI
function updateEmployeeWidget(){
    document.getElementById("main_section").innerHTML="";
    clearWidgets();
    updateWidget.innerHTML = '<input id="name" type="text" placeholder="Name"><button id="update_employee" onclick="updateEmployee()">Update</button>';
    document.getElementById("main_section").prepend(updateWidget);
}

//"Result" is used in the next few functions to check against the employee-list
let result;

//Creates form for updating office number and phone number after matching "name" from "employee-list"
function updateEmployee(){
    let name = document.getElementById("name").value.toLowerCase();
    result = employeeList.findIndex((obj => obj.name.toLowerCase() === name));
    if (result != -1){
        updateResult.innerHTML='<p>Please update the office number and phone number:</p> <input id="office_number" type="number" placeholder="Office Number"> <input id="telephone_number" type="tel" placeholder="Telephone Number"> <button id="save" onclick="saveEmployee()">Save</button>';
    } else{
        updateResult.innerHTML="<p>Employee not in directory.</p>"
    }
    document.getElementById('main_section').appendChild(updateResult);
}

//Saves data from form and updates the employee directory with a success message
function saveEmployee(){
    employeeList[result].officeNum = document.getElementById("office_number").value;
    employeeList[result].phoneNum = document.getElementById("telephone_number").value;
    updateResult.innerHTML='<p>Employee updated successfully!</p>';
    document.getElementById("main_section").appendChild(updateResult);
    result = null;
}

//Creates form to search employee for deletion
function deleteEmployeeWidget(){
    document.getElementById("main_section").innerHTML="";
    clearWidgets();
    deleteWidget.innerHTML = '<input id="name" type="text" placeholder="Name"><button id="delete_employee" onclick="deleteEmployee()">Delete</button>';
    document.getElementById("main_section").prepend(deleteWidget);
}

//Find and delete employee from "employee-list"
function deleteEmployee(){
    let name = document.getElementById("name").value.toLowerCase();
    result = employeeList.findIndex((obj => obj.name.toLowerCase() === name));
    if(result != -1){
        employeeList.splice(result, 1);
        deleteWidget.innerHTML = '<p>Employee has been deleted.</p>';
    }else{
        deleteWidget.innerHTML = '<p>Employee is not in directory.</p>';
    }
}