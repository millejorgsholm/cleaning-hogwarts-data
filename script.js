"use strict";

window.addEventListener("DOMContentLoaded", start);

//Creating empty array
const allStudents = [];

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

    //Del string over ved mellemrummen
    // adskil det fulde navn til for, mellem, efternavn
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

    //Make first letter upperCase and the rest of them lowerCase
    //firstname
    singleStudent.firstNameCapitalized =
      singleStudent.firstName.substring(0, 1).toUpperCase() +
      singleStudent.firstName.substring(1, firstSpace).toLowerCase();

    //middlename
    singleStudent.middleNameCapitalized =
      singleStudent.middleName.substring(1, 2).toUpperCase() +
      singleStudent.middleName.substring(2, lastSpace).toLowerCase();

    //lastname
    singleStudent.lastNameCapitalized =
      singleStudent.lastName.substring(0, 1).toUpperCase() +
      singleStudent.lastName
        .substring(1)
        .toLowerCase(singleStudent.lastName.length);

    //Names with a hyphen, must have the first letter after the hyphen capitalized as well -> one of the student's lastname includes a hyphen
    const ifHyphens = singleStudent.lastName.indexOf("-");

    if (ifHyphens == -1) {
      singleStudent.lastNameCapitalized =
        singleStudent.lastNameCapitalized.substring(0, 1).toUpperCase() +
        singleStudent.lastNameCapitalized.substring(1).toLowerCase();
    } else {
      singleStudent.lastNameCapitalized =
        singleStudent.lastName.substring(0, 1).toUpperCase() +
        singleStudent.lastName.substring(1, ifHyphens + 1).toLowerCase() +
        singleStudent.lastName
          .substring(ifHyphens + 1, ifHyphens + 2)
          .toUpperCase() +
        singleStudent.lastName.substring(ifHyphens + 2).toLowerCase();
    }

    //Gender
    singleStudent.gender = jsonObject.gender.substring(0).trim();
    singleStudent.genderCapitalized =
      singleStudent.gender.substring(0, 1).toUpperCase() +
      singleStudent.gender.substring(1).toLowerCase();

    //House
    singleStudent.house = jsonObject.house.substring(0).trim();
    singleStudent.houseCapitalized =
      singleStudent.house.substring(0, 1).toUpperCase() +
      singleStudent.house.substring(1).toLowerCase();

    //INDSÆT I PROTOTYPE -> ARRAYET
    singleStudent.firstName = singleStudent.firstNameCapitalized;
    singleStudent.middleName = singleStudent.middleNameCapitalized;
    singleStudent.lastName = singleStudent.lastNameCapitalized;
    // singleStudent.nickName = singleStudent.nickNameCapitalized;
    singleStudent.gender = singleStudent.genderCapitalized;
    singleStudent.house = singleStudent.houseCapitalized;

    //Adding all the objects into the array
    allStudents.push(singleStudent);
    console.log(singleStudent);
  });

  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allStudents.forEach(displayStudent);
  console.table(allStudents);
}

function displayStudent(student) {
  // create clone
  const clone = document
    .querySelector("template#studenttemplate")
    .content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=firstname]").textContent = student.firstName;
  clone.querySelector("[data-field=middlename]").textContent =
    student.middleName;
  clone.querySelector("[data-field=lastname]").textContent = student.lastName;
  clone.querySelector("[data-field=nickname]").textContent = student.nickName;
  clone.querySelector("[data-field=gender]").textContent = student.gender;
  clone.querySelector("[data-field=house]").textContent = student.house;
  clone.querySelector("[data-field=image] img").src = `/images/${
    student.lastName
  }_${student.firstName.charAt(0)}.png`;

  //append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
