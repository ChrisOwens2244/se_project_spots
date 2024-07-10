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

function openModal() {
  editModal.classList.add("modal_opened");
}

function closeModal() {
  editModal.classList.remove("modal_opened");
}

closeModal();

profileEditButton.addEventListener("click", openModal);
editModalCloseButton.addEventListener("click", closeModal);


const profileFormElement = editModal.querySelector("#edit-profile");


const nameInput = profileFormElement.querySelector("#name");
const jobInput = profileFormElement.querySelector("#description");


const profileNameElement = document.querySelector(".profile__name");
const profileJobElement = document.querySelector(".profile__description");

nameInput.value = profileNameElement.textContent;
jobInput.value = profileJobElement.textContent;

// The form submission handler. Note that its name
// starts with a verb and concisely describes what it does.
function handleProfileFormSubmit(evt) {
  // Prevent default browser behavior, see explanation below.
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;

  profileNameElement.textContent = newName;
  profileJobElement.textContent = newJob;

  closeModal();
}

// Connect the handler to the form, so it will watch for the submit event.
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card");

function getCardElements(data) {
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardImage = data.link;
  const cardName = data.name;

  cardElement.querySelector(".card__image").src = cardImage;
  cardElement.querySelector(".card__image").alt = cardName;
  cardElement.querySelector(".card__name").textContent = cardName;

  return cardElement;
}

for (let i = 0; i < initialCards.length; i++) {
  const newCard = initialCards[i];
  cardsList.append(getCardElements(newCard));
}
