import {
  enableValidation,
  disableButton,
  settings,
} from "../scripts/validation.js";
import "./index.css";
//import initialCards from "../utils/constants.js";
import Api from "../utils/Api.js";

import logoSrc from "../images/Logo.svg";
//import avatarSrc from "../images/avatar.jpg";
import penSrc from "../images/pen.svg";
import plusSrc from "../images/plus.svg";
import penWhiteSrc from "../images/pen-white.svg";
import { handleSubmit } from "../utils/utils.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d11d0e4f-579c-4c1f-9935-38514d3f14dc",
    "Content-Type": "application/json",
  },
});

const imageLogo = document.getElementById("image-logo");
const imageAvatar = document.getElementById("image-avatar");
const imagePenBlack = document.getElementById("image-pen");
const imagePenWhite = document.getElementById("image-pen-white");
const imagePlus = document.getElementById("image-plus");

imageLogo.src = logoSrc;
imagePenBlack.src = penSrc;
imagePenWhite.src = penWhiteSrc;
imagePlus.src = plusSrc;

const profileEditButton = document.querySelector(".profile__edit-btn");
const editModal = document.querySelector("#edit-modal");

const photoModal = document.querySelector("#photo-modal");
const photoModalImage = photoModal.querySelector(".modal__photo");
const photoModalCaption = photoModal.querySelector(".modal__description");

const profileFormElement = document.forms["edit-profile"];
const profileSaveBtn = profileFormElement.querySelector(".modal__save-button");

const nameInput = profileFormElement.querySelector("#name");
const jobInput = profileFormElement.querySelector("#description");

const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");

api
  .getAppInfo()
  .then((result) => {
    const savedCards = result[0];
    const savedProfile = result[1];
    imageAvatar.src = savedProfile["avatar"];
    imageAvatar.alt = savedProfile["name"];
    profileNameElement.textContent = savedProfile["name"];
    profileJobElement.textContent = savedProfile["about"];
    savedCards.forEach((card) => {
      const cardEl = getCardElements(card);
      cardsList.append(cardEl);
    });
  })
  .catch((err) => {
    console.error(err);
  });

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", escapeListener);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", escapeListener);
}

function escapeListener(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

const modalList = document.querySelectorAll(".modal");
modalList.forEach((modal) => {
  modal.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

const closeButtons = document.querySelectorAll(".modal__close-button");
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", (evt) => {
    closeModal(popup);
  });
});

profileEditButton.addEventListener("click", () => {
  openModal(editModal);

  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;

  disableButton(profileSaveBtn, settings);
});

function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return api
      .updateProfileInfo({ name: nameInput.value, about: jobInput.value })
      .then((userData) => {
        profileNameElement.textContent = userData["name"];
        profileJobElement.textContent = userData["about"];
        closeModal(editModal);
      })
      .catch((err) => console.error(err));
  }
  handleSubmit(makeRequest, evt);
}

// Connect the handler to the form, so it will watch for the submit event.
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card");

let selectedCard;
let selectedCardId;

function getCardElements(data) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const likeButton = cardElement.querySelector(".card__button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  const cardImage = data["link"];
  const cardName = data["name"];
  const cardImageElement = cardElement.querySelector(".card__image");

  cardImageElement.src = cardImage;
  cardImageElement.alt = cardName;
  cardElement.querySelector(".card__name").textContent = cardName;

  deleteButton.addEventListener("click", (evt) => {
    handleDeleteCard(evt, data["_id"]);
  });

  if (data.isLiked) {
    likeButton.classList.add("card__button_liked");
  }

  likeButton.addEventListener("click", (evt) => {
    handleLike(evt, data["_id"]);
  });

  cardImageElement.addEventListener("click", () => {
    photoModalImage.src = cardImage;
    photoModalImage.alt = cardName;
    photoModalCaption.textContent = cardName;
    openModal(photoModal);
  });
  return cardElement;
}

const postAddButton = document.querySelector(".profile__new-btn");
const addModal = document.querySelector("#add-modal");

const postFormElement = document.forms["add-post"];
const postSaveBtn = postFormElement.querySelector(".modal__save-button");

const linkInput = postFormElement.querySelector("#link");
const captionInput = postFormElement.querySelector("#caption");

postAddButton.addEventListener("click", () => {
  openModal(addModal);
  disableButton(postSaveBtn, settings);
});

function handleAddFormSubmit(evt) {
  function makeRequest() {
    return api
      .makeCard({ link: linkInput.value, name: captionInput.value })
      .then((data) => {
        cardsList.prepend(getCardElements(data));
        closeModal(addModal);
      })
      .catch((err) => console.error(err));
  }
  handleSubmit(makeRequest, evt);
}
postFormElement.addEventListener("submit", handleAddFormSubmit);

const editAvatarModal = document.querySelector("#avatar-modal");
const avatarForm = document.forms["avatar-form"];
const avatarSaveBtn = avatarForm.querySelector(".modal__save-button");
const avatarInput = avatarForm.querySelector("#avatar-pic");
const avatarBtn = document.querySelector(".profile__avatar-btn");

avatarBtn.addEventListener("click", () => {
  openModal(editAvatarModal);
  disableButton(avatarSaveBtn, settings);
});

function handleAvatarSubmit(evt) {
  function makeRequest() {
    return api
      .updateAvatar({ avatar: avatarInput.value })
      .then((data) => {
        imageAvatar.src = data["avatar"];
        closeModal(editAvatarModal);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  handleSubmit(makeRequest, evt);
}
avatarForm.addEventListener("submit", handleAvatarSubmit);
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__prompt-buttons");
const deleteButton = deleteForm.querySelector(".modal__delete-button");

function handleDeleteCard(evt, id) {
  selectedCard = evt.target.closest(".card");
  selectedCardId = id;
  //console.log(selectedCardId);
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  function makeRequest() {
    return api
      .deleteCard({ id: selectedCardId })
      .then(() => {
        selectedCard.remove();
        closeModal(deleteModal);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  handleSubmit(makeRequest, evt, "Deleting...");
}

deleteForm.addEventListener("submit", handleDeleteSubmit);

function handleLike(evt, id) {
  const liked = evt.target.classList.contains("card__button_liked");
  api
    .changeLikeStatus({ id: id, isLiked: liked })
    .then(() => {
      evt.target.classList.toggle("card__button_liked");
    })
    .catch((err) => {
      console.error(err);
    });
}
enableValidation(settings);
