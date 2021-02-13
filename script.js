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

    //Creating the singleStudent object
    const singleStudent = Object.create(Student);

    //Finde navnene ved at definerer mellemrum
    const firstSpace = jsonObject.fullname.trim().indexOf(" ");
    const lastSpace = jsonObject.fullname.trim().lastIndexOf(" ");

    //Define names and seperate them at spaces
    singleStudent.firstName = jsonObject.fullname
      .trim()
      .substring(0, firstSpace);
    singleStudent.middleName = jsonObject.fullname.substring(
      firstSpace,
      lastSpace
    );

    if (singleStudent.middleName.includes('"')) {
      singleStudent.nickName = singleStudent.middleName;
      singleStudent.middleName = "";
    }

    singleStudent.lastName = jsonObject.fullname
      .trim()
      .substring(lastSpace)
      .trim();
    //Make first letter uppercase - firstname
    singleStudent.firstNameCaptial =
      singleStudent.firstName.substring(0, 1).toUpperCase() +
      singleStudent.firstName.substring(1, firstSpace).toLowerCase();
    //Make first letter uppercase - middlename
    singleStudent.middleNameCaptial =
      singleStudent.middleName.substring(0, 1).toUpperCase() +
      singleStudent.middleName
        .substring(1, singleStudent.middleName.length)
        .toLowerCase(singleStudent.middleName.length);
    //Make first letter uppercase - lastname
    singleStudent.lastNameCaptial =
      singleStudent.lastName.substring(0, 1).toUpperCase() +
      singleStudent.lastName
        .substring(1)
        .toLowerCase(singleStudent.middleName.length);
    //Make first letter uppercase - nickname
    singleStudent.middleNameCapital =
      singleStudent.middleName.substring(0, 1).toUpperCase() +
      singleStudent.middleName
        .substring(1)
        .toLowerCase(singleStudent.middleName.length);

    //Gender

    //House

    //Adding all the objects into the array
    allStudents.push(singleStudent);
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
