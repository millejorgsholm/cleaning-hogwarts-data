"use strict";

window.addEventListener("DOMContentLoaded", start);

//Creating empty array
let allStudents = [];

//Creating the prototype (template)
const Student = {
  firstname: "",
  lastname: "",
  middlename: "",
  nickname: "",
  gender: "",
  house: "",
};
function start() {
  console.log("ready");

  loadJSON();
}

//Fetching json data
function loadJSON() {
  fetch("https://petlatkea.dk/2021/hogwarts/students.json")
    .then(response => response.json())
    .then(jsonData => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
  console.log("JSON data loaded");
}

function prepareObjects(jsonData) {
  jsonData.forEach(jsonObject => {
    // TODO: Create new object with cleaned data - and store that in the allAnimals array

    //Creating the object
    const student = Object.create(Student);
    //Splitting fullname
    let studentData = jsonObject.fullname.split(" ");
    console.log(studentData);

    //Firstname
    let studentFirstName = studentData[0];
    console.log(studentFirstName);
    student.firstname = studentFirstName;

    //Middlename
    let studentMidddleName = studentData[1];
    console.log(studentMidddleName);
    student.middlename = studentMidddleName;

    //Lastname
    let studentLastName = studentData[2];
    console.log(studentLastName);
    student.lastname = studentLastName;

    //Gør første bogstav stort og resten småt: firstname
    student.firstNameCapitalized =
      student.firstName.substring(0, 1).toUpperCase() +
      student.firstName.substring(1, firstSpace).toLowerCase();

    //Adding all the objects into the array
    allStudents.push(student);
  });

  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allStudents.forEach(displayStudent);
}

function displayStudent(student) {
  // create clone
  const klon = document
    .querySelector("template#student")
    .content.cloneNode(true);

  // set clone data

  klon.querySelector("[data-field=firstname]").textContent = student.firstName;
  klon.querySelector("[data-field=middlename]").textContent =
    student.middleName;
  klon.querySelector("[data-field=lastname]").textContent = student.lastName;
  klon.querySelector("[data-field=nickname]").textContent = student.nickName;
  klon.querySelector("[data-field=gender]").textContent = student.gender;
  klon.querySelector("[data-field=house]").textContent = student.house;
  klon.querySelector("img").src = `/images/${
    student.lastName
  }_${student.firstName.charAt(0)}.png`;

  //append clone to list
  document.querySelector("#list tbody").appendChild(klon);
}
