function toggleReservation() {
  const section = document.querySelector(".reservation-section_setting");
  if (section.style.display === "none" || section.style.display === "") {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
}

let reserveList;
const savedList = localStorage.getItem("reserveList");
if (savedList) { 
  reserveList =JSON.parse(savedList);
} else {
   reserveList = [
  {
    name: "Faq",
    middleName: "shola",
    lastName: "sule",
    email: "faruq1@gmail.com",
    time: "2:00pm-3:00pm",
    date: "1/1/2026",
    guest: "number of people",
    purpose: "birthday",
  },
  {
    name: "Faq",
    middleName: "bola",
    lastName: "sule",
    email: "faruq1@gmail.com",
    time: "2:00pm-3:00pm",
    date: "1/1/2026",
    guest: "number of people",
    purpose: "birthday",
  },
];
}

renderReseverList();

function renderReseverList() {
  let reserveListHTML = "";
  for (let i = 0; i < reserveList.length; i++) {
    const reserveObject = reserveList[i];
    const { name, middleName, lastName, email, time, date, guest, purpose } =
      reserveObject;
    reserveListHTML += `
        <p>
          ${name} ${middleName} ${lastName} ${email} ${time} ${date} ${guest} ${purpose}
          <button onclick="removeReservation(${i})" class="remove-button">Remove</button>
        </p>`;
  }
  document.querySelector(".js-reserve-list").innerHTML = reserveListHTML;
}

function reserveButton() {
  const inputElement = document.querySelector(".js-reserve-input");
  const name = inputElement.value;

  const middleInputElement = document.querySelector(".js-middle-input");
  const middleName = middleInputElement.value;

  const lastNameElement = document.querySelector(".js-lastName-input");
  const lastName = lastNameElement.value;

  const emailInputElement = document.querySelector(".js-email-input");
  const emailInput = emailInputElement.value;

  const timeInputElement = document.querySelector(".js-time-iput");
  const timeInput = timeInputElement.value;


  const dateInputElement = document.querySelector(".js-date-input");
  const dateInput = dateInputElement.value;

  const guestInputElement = document.querySelector(".js-guest-list");
  const guestInput = guestInputElement.value;

  const purposeInputElement = document.querySelector(".js-purpose-input");
  const purposeInput = purposeInputElement.value;


  reserveList.push({
    name,
    middleName,
    lastName,
    email: emailInput,
    time: timeInput,
    date: dateInput,
    guest: guestInput,
    purpose: purposeInput,
  });
  localStorage.setItem("reserveList", JSON.stringify(reserveList));


  inputElement.value = "";
  middleInputElement.value = "";
  lastNameElement.value = "";
  emailInputElement.value = "";
  timeInputElement.value = "";
  dateInputElement.value = "";
  guestInputElement.value = "";
  purposeInputElement.value = "";

  renderReseverList();
}

function removeReservation(index) {
  reserveList.splice(index, 1);
  localStorage.setItem("reserveList", JSON.stringify(reserveList));

  renderReseverList();
}

// slidersection

document.querySelectorAll(".slider").forEach((slider) => {
  let currentIndex = 0;
  const item = slider.querySelectorAll(".slides");
  const moveForward = slider.querySelector(".carousel__next");
  const moveBackward = slider.querySelector(".carousel__prev");

  const buttonHTML = Array.from(
    item,
    () => `<span class="carousel__button"></span>`,
  );

  slider.insertAdjacentHTML(
    "beforeend",
    `<div class="carousel__nav">
        ${buttonHTML.join("")}
        </div>`,
  );

  const buttons = slider.querySelectorAll(".carousel__button");

  function nextButton() {
    currentIndex++;

    if (currentIndex >= item.length) {
      currentIndex = 0;
    }
    updateCarousel(currentIndex);
  }
  function backForward() {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = item.length - 1;
    }
    updateCarousel(currentIndex);
  }

  function updateCarousel(index) {
    item.forEach((items) => items.classList.remove("slides--selected"));

    buttons.forEach((button) =>
      button.classList.remove("carousel__button--selected"),
    );
    item[index].classList.add("slides--selected");

    buttons[index].classList.add("carousel__button--selected");
  }
  moveForward.addEventListener("click", nextButton);
  moveBackward.addEventListener("click", backForward);

  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel(currentIndex);
    });
  });
  console.log(buttonHTML);
  setInterval(nextButton, 5000);
  updateCarousel(currentIndex);
});

// counter down for menu collection// counter down for menu collection
function startCounter(counterEl) {
  let start = parseInt(counterEl.dataset.start);
  let end = parseInt(counterEl.dataset.end);
  let duration = 10000;

  let steptime = duration / (end - start);

  let current = start;
  let timer = setInterval(() => {
    counterEl.textContent = current;
    if (current >= end) {
      clearInterval(timer);
    }
    current++;
  }, steptime);
}

// scroll trigger
let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.dataset.done) {
      entry.target.dataset.done = "true"; // FIXED
      startCounter(entry.target); // FIXED
    }
  });
});

// observe all counters
document.querySelectorAll(".counter").forEach((counter) => {
  observer.observe(counter);
});

//scroll to a particular section in using javascript and manipulating the pages

document.addEventListener("DOMContentLoaded", () => {
  const sectionToScroll = localStorage.getItem("scrollToSection");

  if (sectionToScroll) {
    localStorage.removeItem("scrollToSection"); // Clear it

    setTimeout(() => {
      // Try to find by ID first
      let targetSection = document.getElementById(sectionToScroll);
      
      // If not found by ID, try as a class selector
      if (!targetSection) {
        targetSection = document.querySelector(`.${sectionToScroll}`);
      }
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        console.log(`Section "${sectionToScroll}" not found`);
      }
    }, 1000);
  }
});
