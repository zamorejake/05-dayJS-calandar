$(function () {
  // TODO: Add a listener for click events on the save button.

  let button = document.getElementsByClassName("btn saveBtn col-2 col-md-1");

  for (var i = 0; i < button.length; i++) {
    button[i].addEventListener("click", saveContent);
  }

  function saveContent(e) {
    let text = this.previousElementSibling;
    let parent = e.target.parentElement.id;
    let currentCalendar = JSON.parse(localStorage.getItem("schedule"));

    if (currentCalendar) {
      for (var i = 0; i < currentCalendar.length; i++) {
        if (currentCalendar[i][0] === parent) break;
      }
      currentCalendar[i][1] = text.value.trim();
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
      newCalendar[i][1] = text.value.trim();
      localStorage.setItem("schedule", JSON.stringify(newCalendar));
    }
  }

  // TODO: Add code to apply the past, present, or future class to each time

  let currentHour = dayjs().hour();
  console.log(currentHour);
  let fields = document.getElementsByClassName("time-block");

  for (let i = 0; i < fields.length; i++) {
    let timeID = fields[i].id;
    let hourID = parseInt(timeID.split("-")[1]);

    if (hourID < currentHour) {
      fields[i].classList.add("past");
    } else if (hourID === currentHour) {
      fields[i].classList.add("present");
    } else {
      fields[i].classList.add("future");
    }
  }

  // TODO: Add code to get any user input that was saved in localStorage

  let textDesc = document.getElementsByClassName("col-8 col-md-10 description");

  for (var i = 0; i < textDesc.length; i++) {
    textDesc[i].addEventListener("click", setFields);
    //well it works... not great but it works...
    textDesc[i].click();
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
