const newalambtn = document.querySelector(".newAlaram");
const close = document.querySelector(".close");
const newAladiv = document.querySelector(".newaladiv");
const preAladiv = document.querySelector(".Main");
const stop = document.querySelector(".stop");
const snooze = document.querySelector(".snooze");
const snoozetimer = document.querySelector(".snoozetimer");
const createnewAlaram = document.querySelector(".createnewAlaram");
const Alaramsdiv = document.querySelector(".Alaramsdiv");
const hour = document.querySelector(".M-hour");
const minute = document.querySelector(".M-minute");
const am = document.querySelector(".M-am");
const seconds = document.querySelector(".M-second");
const alamdivs = document.querySelectorAll(".alamtime");
const daydiv = document.querySelectorAll(".day");

newalambtn.addEventListener("click", function () {
  newAladiv.classList.remove("hide");
  preAladiv.classList.add("hide");
});

close.addEventListener("click", function () {
  newAladiv.classList.add("hide");
  preAladiv.classList.remove("hide");
});

createnewAlaram.addEventListener("click", function () {
  newAladiv.classList.add("hide");
  preAladiv.classList.remove("hide");
});

daydiv.forEach((e) => {
  e.addEventListener("click", function () {
    e.classList.toggle("fill");
  });
});
const SetDate = function () {
  const dates = new Date();
  if (dates.getHours() > 12) {
    am.textContent = "PM";
    hour.textContent = String(dates.getHours() - 12).padStart(2, 0);
  } else {
    hour.textContent = String(dates.getHours()).padStart(2, 0);
    am.textContent = "AM";
  }

  minute.textContent = String(dates.getMinutes()).padStart(2, 0);
  seconds.textContent = String(dates.getSeconds()).padStart(2, 0);
};

SetDate();
setInterval(SetDate, 1000);

const incre = document.querySelectorAll(".in");
const decre = document.querySelectorAll(".de");
const numinc = function (e, text) {
  console.log(text);
  if (e === "hour") {
    if (Number(text) === 12) {
      return 1;
    } else return Number(text) + 1;
  }

  if (e === "minute") {
    if (Number(text) === 59) {
      return 0;
    } else return Number(text) + 1;
  }

  if (e === "second") {
    if (Number(text) === 59) {
      return 0;
    } else return Number(text) + 1;
  }
};

const numdec = function (e, text) {
  if (e === "hour") {
    if (Number(text) === 1) {
      return 12;
    } else return text - 1;
  }

  if (e === "minute") {
    if (Number(text) === 0) {
      return 59;
    } else return text - 1;
  }

  if (e === "second") {
    if (Number(text) === 0) {
      return 59;
    } else return Number(text) - 1;
  }
};

incre.forEach((e) => {
  e.addEventListener("click", function (e) {
    if (e.target.dataset.s) {
      document.querySelector(`.${e.target.dataset.s}`).textContent = String(
        numinc(
          e.target.dataset.s,
          document.querySelector(`.${e.target.dataset.s}`).textContent
        )
      ).padStart(2, 0);
    } else {
      return;
    }
  });
});

decre.forEach((e) => {
  e.addEventListener("click", function (e) {
    if (e.target.dataset.s) {
      document.querySelector(`.${e.target.dataset.s}`).textContent = String(
        numdec(
          e.target.dataset.s,
          document.querySelector(`.${e.target.dataset.s}`).textContent
        )
      ).padStart(2, 0);
    } else {
      return;
    }
  });
});
let Delalam;
const alamring = document.querySelector(".Alamring");
const alamtone = document.querySelector(".alamtone");
const amchange = document.querySelectorAll(".am");
const days = document.querySelectorAll(".day");
const amchangefun = function (text) {
  console.log("hello");
  return text === "AM" ? "PM" : "AM";
};
console.log(amchange);
amchange.forEach((e) => {
  e.addEventListener("click", function (e) {
    if (e.target.dataset.s) {
      document.querySelector(`.${e.target.dataset.s}`).textContent =
        amchangefun(
          document.querySelector(`.${e.target.dataset.s}`).textContent
        );
    } else {
      return;
    }
  });
});

let timearray = [];
let time = "";
let daytime = "";
let myinterval;
const alarmcheck = function () {
  myinterval = setInterval(function () {
    let curday = new Date()
      .toLocaleString("eng-US", { weekday: "long" })
      .slice(0, 3)
      .toUpperCase();
    let curtime =
      `${hour.textContent}${minute.textContent}${seconds.textContent}${am.textContent}` +
      curday;
    if (timearray.includes(curtime)) {
      alamtone.play();
      alamring.classList.remove("remove");
      preAladiv.classList.add("hide");
    }
  }, 1000);
};

const alastorage = [];

const alaramdivs = function (day, time) {
  return `<div class="alamdes"> <button data-day="${day}" class="Delalam">DELETE</button>  ${day} at ${time}</div>`;
};

createnewAlaram.addEventListener("click", function () {
  const curday = new Date()
    .toLocaleString("eng-US", { weekday: "long" })
    .slice(0, 3)
    .toUpperCase();
  console.log(curday);
  alamdivs.forEach((e) => {
    time = time + e.textContent;
  });

  days.forEach((e, i) => {
    if (e.classList.contains("fill")) {
      daytime = time + e.textContent;
      if (!timearray.includes(daytime)) {
        timearray.push(daytime);
        Alaramsdiv.insertAdjacentHTML(
          "afterbegin",
          alaramdivs(e.textContent, time)
        );

        alastorage.push(alaramdivs(e.textContent, time));
        console.log(alastorage);
      }
    }
  });

  time = "";

  clearInterval(myinterval);
  console.log(timearray);

  alarmcheck();
});
let snoozecheck;
let clicks;
stop.addEventListener("click", function () {
  alamtone.pause();
  clearInterval(snoozecheck);
  snooze.dataset.clicks = 0;
  snooze.classList.remove("events");
  alamring.classList.add("remove");
  preAladiv.classList.remove("hide");
});

snooze.addEventListener("click", function () {
  snooze.dataset.clicks = Number(snooze.dataset.clicks) + 1;
  clicks = Number(snooze.dataset.clicks) + 1;
  console.log(clicks);
  clearInterval(snoozecheck);
  snooze.classList.add("events");
  alamtone.pause();
  console.log(snoozetimer.textContent);
  let time = 10;
  snoozecheck = setInterval(function () {
    if (time !== 0) {
      snoozetimer.textContent = `Alaram Snoozed for ${time - 1} Seconds`;
      time--;
    }
    if (time === 0) {
      alamtone.play();
      if (clicks < 4) {
        snooze.classList.remove("events");
      }
    }
  }, 1000);
});
