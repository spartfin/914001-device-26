function writeUs() {
  var openPopupButton = document.querySelector(".contacts__btn");
  var popup = document.querySelector(".modal.write-us");
  var closePopupButton = popup.querySelector(".btn-modal-close");
  var nameField = popup.querySelector("[name=name]");
  var emailField = popup.querySelector("[name=email]");
  var textField = popup.querySelector("[name=text]");
  var input = popup.querySelectorAll('form [required]');
  var isStorageSupport = true;
  var nameStorage = "";
  var emailStorage = "";

  try {
    nameStorage = localStorage.getItem("nameField");
    emailStorage = localStorage.getItem("emailField");
  } catch (err) {
    isStorageSupport = false;
  }

  openPopupButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal__show");
    if (nameStorage) {
      nameField.value = nameStorage;
    } else {
      nameField.focus();
    }
    if (emailStorage) {
      emailField.value = emailStorage;
    }
    if (nameStorage && !emailStorage) {
      emailField.focus();
    }
    if (nameStorage && emailStorage) {
      textField.focus();
    }
  });

  closePopupButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal__show");
    popup.classList.remove("modal-error");
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (popup.classList.contains("modal__show")) {
        popup.classList.remove("modal__show");
        popup.classList.remove("modal-error");
      }
    }
  });

  sendForm.addEventListener("click", function (evt) {
    if (!nameField.value || !emailField.value || !textField.value) {
      evt.preventDefault();
      popup.classList.remove("modal-error");
      void popup.offsetWidth;
      popup.classList.add("modal-error");
      for (var i = 0; i < input.length; i++) {
        if (!input[i].value) input[i].classList.add('empty-field')
      }
    } else {
      if (isStorageSupport) {
        localStorage.setItem("nameField", nameField.value);
        localStorage.setItem("emailField", emailField.value);
      }
      for (var y = 0; y < input.length; y++) {
        input[y].classList.remove('empty-field');
      }
    }
  });
};

function map() {
  var openMap = document.querySelector(".contacts__map");
  var popup = document.querySelector(".modal-map");
  var closePopupButton = popup.querySelector(".btn-modal-close");

  openMap.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal__show");
  });
  closePopupButton.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal__show");
  });

  window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (popup.classList.contains("modal__show")) {
        popup.classList.remove("modal__show");
      }
    }
  });
}

if (document.querySelector(".contacts__btn") !== null && document.querySelector(".modal.write-us") !== null) {
  writeUs();
}

if (document.querySelector(".contacts__map") !== null && document.querySelector(".modal-map") !== null) {
  map();
};
