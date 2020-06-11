import '../style/style.scss';
import axios from 'axios';
import { debounce } from 'lodash';

const headerId = document.getElementById('id');
const headerFirstName = document.getElementById('firstName');
const headerSecondName = document.getElementById('secondName');
const headerAge = document.getElementById('age');
const tableElem = document.getElementById('Content');
const tbody = document.getElementById('TableBody');
const searchText = document.getElementById('search-text');
const cross = document.getElementById('cross');

let innerArr;
tableElem.appendChild(tbody);

const addContent = (array) => {
  let row; let cell; let text;

  array.forEach(({
    id, firstName, secondName, age,
  }) => {
    const infoPerson = [id, firstName, secondName, age];
    row = document.createElement('tr');
    tbody.appendChild(row);

    infoPerson.forEach((info) => {
      cell = document.createElement('td');
      text = document.createElement('p');

      text.innerHTML = info;
      row.appendChild(cell);
      cell.appendChild(text);
    });
  });
};

axios.get('https://my-json-server.typicode.com/Oleg944/database/person')
  .then((response) => {
    innerArr = response.data;
    addContent(innerArr);
  });

let sortDirection = 'ASC';
let sortField = headerId.id;
let currentArrow = document.getElementById('arrow-id');
currentArrow.className = 'Table__Arrow_ASC';
let newArrow;

const sortTable = (field) => {
  if (sortField !== field) {
    sortDirection = 'ASC';
    currentArrow.className = 'Arrow_None';
  }

  if (field === 'id' || field === 'age') {
    if (sortDirection === 'ASC') {
      innerArr.sort((a, b) => a[field] - b[field]);
      newArrow.className = 'Table__Arrow_ASC';
      sortDirection = 'DESC';
    } else {
      innerArr.sort((a, b) => b[field] - a[field]);
      newArrow.className = 'Table__Arrow_DESC';
      sortDirection = 'ASC';
    }
  } else if (sortDirection === 'ASC') {
    newArrow.className = 'Table__Arrow_ASC';
    sortDirection = 'DESC';
    innerArr.sort((a, b) => {
      if (a[field] < b[field]) return -1;
      return 0;
    });
  } else {
    newArrow.className = 'Table__Arrow_DESC';
    sortDirection = 'ASC';
    innerArr.sort((a, b) => {
      if (a[field] > b[field]) return -1;
      return 0;
    });
  }

  tbody.innerHTML = '';
  addContent(innerArr);
  sortField = field;
  currentArrow = newArrow;
};

const getID = (header) => {
  const idHeader = header.currentTarget.id;
  newArrow = document.getElementById(`arrow-${idHeader}`);
  sortTable(idHeader);
};

const findText = () => {
  const newArr = innerArr.filter(({
    firstName, secondName,
  }) => {
    let flag = false;
    const infoPerson = [firstName, secondName];
    infoPerson.forEach((info) => {
      if (info.toLowerCase().includes(searchText.value.toLowerCase(), 0)) {
        flag = true;
      }
    });
    return flag;
  });

  tbody.innerHTML = '';
  addContent(newArr);
};

const clearInput = () => {
  searchText.value = '';
  tbody.innerHTML = '';
  addContent(innerArr);
};

const findTextDebounced = debounce(findText, 500);
searchText.addEventListener('input', findTextDebounced);
headerId.addEventListener('click', getID);
headerFirstName.addEventListener('click', getID);
headerSecondName.addEventListener('click', getID);
headerAge.addEventListener('click', getID);
cross.addEventListener('click', clearInput);
