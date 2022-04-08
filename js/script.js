// Header element

const selectHeader = document.querySelector(".select__header");
const selectBody = document.querySelector(".select__body");
const selectItem = document.querySelectorAll(".select__item");
const selectSpan = document.querySelector(".select__title");
const selectImg = document.querySelector(".select__header img");

selectHeader.addEventListener("click", () => {
  if (selectBody.classList.contains("select__body--active")) {
    selectBody.classList.remove("select__body--active");
    selectBody.style.maxHeight = null;
    selectImg.style.transform = "rotate(0deg)";
  } else {
    selectBody.classList.add("select__body--active");
    selectImg.style.transform = "rotate(180deg)";
    selectBody.style.maxHeight = selectBody.scrollHeight + "px";
  }
});

selectItem.forEach((item, i) => {
  item.addEventListener("click", () => {
    selectSpan.textContent = item.textContent;
    selectBody.classList.remove("select__body--active");
    selectBody.style.maxHeight = null;
    selectImg.style.transform = "rotate(0deg)";
  });
});

// Map element

let center = [55.606846115104304, 37.503191282160266];

function init() {
  let map = new ymaps.Map("map-element", {
    center: center,
    zoom: 9.5,
  });

  let placemark = new ymaps.Placemark(
    center,
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "img/maps/map-pick.svg",
      iconImageSize: [70, 99],
      iconImageOffset: [-25, -70],
    }
  );

  map.controls.remove("geolocationControl"); // удаляем геолокацию
  map.controls.remove("searchControl"); // удаляем поиск
  map.controls.remove("trafficControl"); // удаляем контроль трафика
  map.controls.remove("typeSelector"); // удаляем тип
  map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
  map.controls.remove("zoomControl"); // удаляем контрол зуммирования
  map.controls.remove("rulerControl"); // удаляем контрол правил
  map.behaviors.disable(["scrollZoom"]); // отключаем скролл карты

  map.geoObjects.add(placemark);
}

ymaps.ready(init);

// Mobile menu
const headerMobile = document.querySelector(".header__mobile");
const burger = document.querySelector(".header__burger");
const cross = document.querySelector(".header__cross");
const body = document.querySelector("body");

burger.addEventListener("click", () => {
  headerMobile.classList.toggle("active");
  burger.style.display = "none";
  cross.style.display = "block";
  body.classList.add("noscroll");
});

cross.addEventListener("click", () => {
  headerMobile.classList.toggle("active");

  burger.style.display = "block";
  cross.style.display = "none";

  body.classList.remove("noscroll");
});

// Modal element

const modal = document.querySelector(".modal");
const buttonModal = document.querySelectorAll(".button--modal");

buttonModal.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.add("active");
    body.classList.add("noscroll");
  });
});

modal.addEventListener("click", (e) => {
  const isModal = e.target.closest(".modal__inner");

  if (!isModal) {
    modal.classList.remove("active");
    body.classList.remove("noscroll");
  }

  if (headerMobile.classList.contains("active")) {
    body.classList.add("noscroll");
  }
});

//Slider element

const swiper = new Swiper(".slider", {
  loop: true,

  pagination: {
    el: ".slider__pagination",
  },
  navigation: {
    nextEl: ".slider__arrow-right",
    prevEl: ".slider__arrow-left",
  },
});

// Send form

const form = document.querySelector(".form__elements");

const sendForm = (data) => {
  return fetch("mail.php", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((res) => res.json());
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const dataForm = new FormData(form);
  const user = {};

  dataForm.forEach((val, key) => {
    user[key] = val;
  });

  sendForm(user).then((data) => {
    console.log("Письмо успешно отправленно!");
  });

  form.reset();
});
