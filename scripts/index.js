const initialCards = [
  {
    name: "Val Thornes",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Restaurnat terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },

  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    name: "Mountian house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-btn");
const editModal = document.querySelector("#edit-modal");
const editModalCloseButton = editModal.querySelector(".modal__close-button");

const photoModal = document.querySelector("#photo-modal");
const photoModalCloseButton = photoModal.querySelector(".modal__close-button");
const photoModalImage = photoModal.querySelector(".modal__photo");
const photoModalCaption = photoModal.querySelector(".modal__description");

const profileFormElement = document.forms["edit-profile"];

const nameInput = profileFormElement.querySelector("#name");
const jobInput = profileFormElement.querySelector("#description");

const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

const closeButtons = document.querySelectorAll(".modal__close-button");
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => {
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

  profileNameElement.textContent = newName;
  profileJobElement.textContent = newJob;

  closeModal(editModal);
}

// Connect the handler to the form, so it will watch for the submit event.
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card");

function getCardElements(data) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const likeButton = cardElement.querySelector(".card__button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  const cardImage = data.link;
  const cardName = data.name;
  const cardImageElement = cardElement.querySelector(".card__image");

  cardImageElement.src = cardImage;
  cardImageElement.alt = cardName;
  cardElement.querySelector(".card__name").textContent = cardName;

  deleteButton.addEventListener("click", () => {
    const parentCard = deleteButton.closest(".card");
    parentCard.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__button_liked");
  });

  cardImageElement.addEventListener("click", () => {
    photoModalImage.src = data.link;
    photoModalImage.alt = data.name;
    photoModalCaption.textContent = data.name;
    openModal(photoModal);
  });
  return cardElement;
}

initialCards.forEach((element) => {
  const card = getCardElements(element);
  cardsList.append(card);
});

const postAddButton = document.querySelector(".profile__new-btn");
const addModal = document.querySelector("#add-modal");
const addModalCloseButton = addModal.querySelector(".modal__close-button");

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
  cardsList.prepend(getCardElements(newCard));
  closeModal(addModal);
  linkInput.value = "";
  captionInput.value = "";
}
postFormElement.addEventListener("submit", handleAddFormSubmit);
