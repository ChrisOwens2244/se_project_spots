import { enableValidation, settings } from "../scripts/validation.js";
import "./index.css";
//import initialCards from "../utils/constants.js";
import Api from "../utils/Api.js";

import logoSrc from "../images/Logo.svg";
//import avatarSrc from "../images/avatar.jpg";
import penSrc from "../images/pen.svg";
import plusSrc from "../images/plus.svg";
import penWhiteSrc from "../images/pen-white.svg";

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
  const modal = document.querySelector(".modal_opened");
  if (evt.key === "Escape") {
    closeModal(modal);
  }
}

const modalList = document.querySelectorAll(".modal");
modalList.forEach((modal) => {
  modal.addEventListener("click", function (evt) {
    if (evt.target.parentElement.classList.contains("page")) {
      closeModal(modal);
    }
  });
});

const closeButtons = document.querySelectorAll(".modal__close-button");
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", (evt) => {
    if (button.classList.contains("modal__close-button_cancel")) {
      evt.preventDefault();
    }
    closeModal(popup);
  });
});

profileEditButton.addEventListener("click", () => {
  openModal(editModal);
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
});

// The form submission handler. Note that its name
// starts with a verb and concisely describes what it does.
function handleProfileFormSubmit(evt) {
  // Prevent default browser behavior, see explanation below.
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;

  api
    .updateProfileInfo({ name: newName, about: newJob })
    .then((data) => {
      profileNameElement.textContent = data["name"];
      profileJobElement.textContent = data["about"];
      closeModal(editModal);
    })
    .catch((err) => {
      console.error(err);
    });
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

  deleteButton.addEventListener("click", () => {
    const parentCard = deleteButton.closest(".card");
    handleDeleteCard(parentCard, data);
  });

  if (data.isLiked) {
    likeButton.classList.add("card__button_liked");
  }

  likeButton.addEventListener("click", (evt) => {
    handleLike(evt, data._id);
  });

  cardImageElement.addEventListener("click", () => {
    photoModalImage.src = cardImage;
    photoModalImage.alt = cardName;
    photoModalCaption.textContent = cardName;
    openModal(photoModal);
  });
  return cardElement;
}

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__prompt-buttons");

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data["_id"];
  //console.log(selectedCardId);
  openModal(deleteModal);
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();
  handleDeleting(true);
  api
    .deleteCard({ id: selectedCardId })
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(handleDeleting(false));
}

function handleLike(evt, id) {
  const isLiked = evt.target.classList.contains("card__button_liked");
  api
    .changeLikeStatus({ id: id, isLiked: isLiked })
    .then(() => {
      evt.target.classList.toggle("card__button_liked");
    })
    .catch((err) => {
      console.error(err);
    });
}

deleteForm.addEventListener("submit", handleDeleteSubmit);

const postAddButton = document.querySelector(".profile__new-btn");
const addModal = document.querySelector("#add-modal");

const postFormElement = document.forms["add-post"];

const linkInput = postFormElement.querySelector("#link");
const captionInput = postFormElement.querySelector("#caption");

postAddButton.addEventListener("click", () => {
  openModal(addModal);
});

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: captionInput.value,
    link: linkInput.value,
  };
  handleLoading(true);
  api
    .makeCard({ link: newCard.link, name: newCard.name })
    .then(() => {
      cardsList.prepend(getCardElements(newCard));
      closeModal(addModal);
      linkInput.value = "";
      captionInput.value = "";
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(handleLoading(false));
}
postFormElement.addEventListener("submit", handleAddFormSubmit);

const editAvatarModal = document.querySelector("#avatar-modal");
const avatarForm = document.forms["avatar-form"];
const avatarInput = avatarForm.querySelector("#avatar-pic");
const avatarBtn = document.querySelector(".profile__avatar-btn");
avatarBtn.addEventListener("click", () => {
  openModal(editAvatarModal);
});

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const newAvatar = avatarInput.value;
  handleLoading(true);
  api
    .updateAvatar({ avatar: newAvatar })
    .then(() => {
      imageAvatar.src = newAvatar;
      closeModal(editAvatarModal);
      avatarInput.value = "";
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(handleLoading(false));
}
avatarForm.addEventListener("submit", handleAvatarSubmit);
enableValidation(settings);

const loadingModal = document.getElementById("loading-modal");
const loadingText = loadingModal.querySelector(".modal__prompt");

function handleLoading(isLoading) {
  if (isLoading) {
    loadingText.textContent = "Saving...";
    loadingModal.classList.add("modal_opened");
  } else {
    loadingText.textContent = "";
    loadingModal.classList.remove("modal_opened");
  }
}

function handleDeleting(isDeleteing) {
  if (isDeleteing) {
    loadingText.textContent = "Deleteing...";
    loadingModal.classList.add("modal_opened");
  } else {
    loadingText.textContent = "";
    loadingModal.classList.remove("modal_opened");
  }
}
