import { getCurrentItem } from '/modules/itemctrl.js';

const UISelectors = {
  clearBtn: '.clear-btn',
  itemNameInput: '#item-name',
  itemCaloriesInput: '#item-calories',
  addBtn: '.add-btn',
  updateBtn: '.update-btn',
  deleteBtn: '.delete-btn',
  backBtn: '.back-btn',
  totalCalories: '.total-calories',
  itemList: '#item-list',
  listItems: '#item-list li',
};

function setInitialState() {
  // This method allows 'Enter' Keypress when not in Edit State
  document.querySelector(UISelectors.addBtn).disabled = false;

  changeDisplayStyle(
    'none',
    UISelectors.updateBtn,
    UISelectors.deleteBtn,
    UISelectors.backBtn
  );
  changeDisplayStyle('inline', UISelectors.addBtn);
}

function populateItemList(items) {
  let html = '';

  items.forEach(item => {
    html += `
      <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item medium material-icons">edit</i>
        </a>
      </li>
      `;
  });

  // Insert list items
  document.querySelector(UISelectors.itemList).innerHTML = html;
}

function addListItem(item) {
  changeDisplayStyle('block', UISelectors.itemList);
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.id = `item-${item.id}`;
  li.innerHTML = `
      <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item medium material-icons">edit</i>
      </a>
  `;

  document.querySelector(UISelectors.itemList).appendChild(li);
}

function showTotalCalories(totalCalories) {
  document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
}

function showItemToEdit() {
  document.querySelector(UISelectors.itemNameInput).value =
    getCurrentItem().name;
  document.querySelector(UISelectors.itemCaloriesInput).value =
    getCurrentItem().calories;
  showEditState();
}

function showEditState() {
  // Does NOT allow 'Enter' Keypress as the button is disabled
  document.querySelector(UISelectors.addBtn).disabled = true;

  changeDisplayStyle(
    'inline',
    UISelectors.updateBtn,
    UISelectors.deleteBtn,
    UISelectors.backBtn
  );
  changeDisplayStyle('none', UISelectors.addBtn);
}

function clearInput() {
  document.querySelector(UISelectors.itemNameInput).value = '';
  document.querySelector(UISelectors.itemCaloriesInput).value = '';
}

function hideList() {
  changeDisplayStyle('none', UISelectors.itemList);
}

function getSelectors() {
  return UISelectors;
}

function getItemInput() {
  return {
    name: document.querySelector(UISelectors.itemNameInput).value,
    calories: document.querySelector(UISelectors.itemCaloriesInput).value,
  };
}

function changeDisplayStyle(property, ...args) {
  args.forEach(arg => (document.querySelector(arg).style.display = property));
}

export {
  populateItemList,
  hideList,
  getSelectors,
  getItemInput,
  addListItem,
  setInitialState,
  clearInput,
  showTotalCalories,
  showItemToEdit,
};
