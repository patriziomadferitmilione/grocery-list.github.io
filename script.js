const addItemModal = document.getElementById("add-modal");
const startAddItemButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddItemButton = addItemModal.querySelector(".btn--passive");
const confirmAddItemButton = cancelAddItemButton.nextElementSibling;
const userInputs = addItemModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteItemModal = document.getElementById("delete-modal");

const items = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const updateUI = () => {
  if (items.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const closeItemDeletionModal = () => {
  toggleBackdrop();
  deleteItemModal.classList.remove("visible");
};

const deleteItemHandler = (itemId) => {
  let itemIndex = 0;
  for (const item of items) {
    if (item.id === itemId) {
      break;
    }
    itemIndex++;
  }
  items.splice(itemIndex, 1);
  const listRoot = document.getElementById("grocery-list");
  listRoot.children[itemIndex].remove();
  closeItemDeletionModal();
  updateUI();
};

const startDeleteItemHandler = (itemId) => {
  deleteItemModal.classList.add("visible");
  toggleBackdrop();
  const cancelDeletionButton = deleteItemModal.querySelector(".btn--passive");
  let confirmDeletionButton = deleteItemModal.querySelector(".btn--danger");

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

  confirmDeletionButton = deleteItemModal.querySelector(".btn--danger");

  // confirmDeletionButton.removeEventListener(
  //   "click",
  //   deleteItemModal.bind(null, itemId)
  // );
  cancelDeletionButton.removeEventListener("click", closeItemDeletionModal);

  cancelDeletionButton.addEventListener("click", closeItemDeletionModal);
  confirmDeletionButton.addEventListener(
    "click",
    deleteItemHandler.bind(null, itemId)
  );
};

const renderNewItemElement = (id, title, category, quantity) => {
  const newItemElement = document.createElement("li");
  newItemElement.className = "grocery-element";
  newItemElement.innerHTML = `
    <div class='grocery-element__info'>
      <h3>${category}</h3>
      <div class='grocery-item'>
        <h1>${title}</h1>
        <p>${quantity}</p>
      </div>
    </div>
    <div class='grocery-element__delete'>
      <button id='remove-btn'>X</button>
    </div>
  `;
  const listRoot = document.getElementById("grocery-list");
  listRoot.append(newItemElement);

  const deleteButton = document.getElementById("remove-btn");
  deleteButton.addEventListener("click", startDeleteItemHandler.bind(null, id));
};

const closeItemModal = () => {
  addItemModal.classList.remove("visible");
};

const showItemModal = () => {
  addItemModal.classList.add("visible");
  toggleBackdrop();
};

const clearItemInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
};

const cancelAddItemHandler = () => {
  closeItemModal();
  toggleBackdrop();
  clearItemInput();
};

const addItemHandler = () => {
  const titleValue = userInputs[0].value;
  const categoryValue = userInputs[1].value;
  const quantityValue = userInputs[2].value;

  const newItem = {
    id: Math.random().toString(),
    title: titleValue,
    category: categoryValue,
    quantity: quantityValue,
  };

  items.push(newItem);
  closeItemModal();
  toggleBackdrop();
  clearItemInput();
  renderNewItemElement(
    newItem.id,
    newItem.title,
    newItem.category,
    newItem.quantity
  );
  updateUI();
};

const backdropClickHandler = () => {
  closeItemModal();
  closeItemDeletionModal();
  clearItemInput();
};

startAddItemButton.addEventListener("click", showItemModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddItemButton.addEventListener("click", cancelAddItemHandler);
confirmAddItemButton.addEventListener("click", addItemHandler);
