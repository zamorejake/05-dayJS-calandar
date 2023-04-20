// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  let button = document.getElementsByClassName("btn saveBtn col-2 col-md-1");

  for (var i = 0; i < button.length; i++) {
    button[i].addEventListener("click", saveContent);
  }

  function saveContent(e) {
    let text = this.previousElementSibling;
    let parent = e.target.parentElement.id;
    let combo = [parent, text.value];
    let currentCalendar = JSON.parse(localStorage.getItem("schedule"));

    if (currentCalendar) {
      for (var i = 0; i < currentCalendar.length; i++) {
        if (currentCalendar[i][0] === parent) break;
      }
      currentCalendar[i][1] = text.value;
      localStorage.setItem("schedule", JSON.stringify(currentCalendar));
    } else {
      let newCalendar = [
        ["hour-9", ""],
        ["hour-10", ""],
        ["hour-11", ""],
        ["hour-12", ""],
        ["hour-13", ""],
        ["hour-14", ""],
        ["hour-15", ""],
        ["hour-16", ""],
        ["hour-17", ""],
      ];
      for (var i = 0; i < newCalendar.length; i++) {
        if (newCalendar[i][0] === parent) break;
      }
      newCalendar[i][1] = text.value;
      localStorage.setItem("schedule", JSON.stringify(newCalendar));
    }
  }

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  let textDesc = document.getElementsByClassName("col-8 col-md-10 description");

  for (var i = 0; i < textDesc.length; i++) {
    textDesc[i].addEventListener("click", setFields);
  }

  function setFields(e) {
    let parent = e.target.parentElement.id;
    let currentCalendar = JSON.parse(localStorage.getItem("schedule"));

    if (currentCalendar) {
      for (var i = 0; i < currentCalendar.length; i++) {
        if (currentCalendar[i][0] === parent) {
          let fields = currentCalendar[i][1];
          e.target.value = fields;
          break;
        }
      }
    }
  }

  // TODO: Add code to display the current date in the header of the page.
  let currentDay = document.getElementById("currentDay");
  let currentTime = dayjs();
  $("<h3>").text(currentTime.format("dddd, MMMM D")).appendTo(currentDay);
});
