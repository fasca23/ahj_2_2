/* eslint-disable no-param-reassign */
const table = document.getElementById('table');

const header = ['id', 'title', 'year', 'imdb'];

// Задаем порядок вывода сортировки по header
const sortingsAttr = [];
header.forEach((head) => {
  sortingsAttr.push(head, head);
});

const library = [
  {
    id: 26,
    title: 'Побег из Шоушенка',
    imdb: 9.30,
    year: 1994,
  },
  {
    id: 25,
    title: 'Крёстный отец',
    imdb: 9.20,
    year: 1972,
  },
  {
    id: 27,
    title: 'Крёстный отец 2',
    imdb: 9.00,
    year: 1974,
  },
  {
    id: 1047,
    title: 'Тёмный рыцарь',
    imdb: 9.00,
    year: 2008,
  },
  {
    id: 223,
    title: 'Криминальное чтиво',
    imdb: 8.90,
    year: 1994,
  },
];

function renderTable() {
  // Чистим таблицу перед созданием
  document.querySelectorAll('tr').forEach((tr) => {
    tr.remove();
  });
  // Создаем шапку
  const headerTr = document.createElement('tr');
  header.forEach((item) => {
    const headerTd = document.createElement('td');
    headerTd.textContent = `${item}`;
    headerTr.appendChild(headerTd);
  });
  table.appendChild(headerTr);

  // Второй цикл нужен чтоб привязать порядок столбцов таблицы к header
  library.forEach((item) => {
    const tr = document.createElement('tr');
    header.forEach((head) => {
      const td = document.createElement('td');
      if (head === 'imdb') {
        td.textContent = `${head}: ${item[head].toFixed(2)}`;
      } else if (head === 'year') {
        td.textContent = `(${item[head]})`;
      } else {
        td.textContent = `${item[head]}`;
      }
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
}

// Выставляем направление стрелки сортировки и выделяем сортируемый столбец
function addArrow(arrow, attr) {
  let number = 0;
  let numberColor = 0;
  const headerLength = header.length;
  const cells = document.querySelectorAll('td');
  cells.forEach((cell) => {
    number += 1;
    if (cell.textContent === attr) {
      if (arrow === 'down') {
        cell.insertAdjacentText('beforeend', ' ↓');
      } else {
        cell.insertAdjacentText('beforeend', ' ↑');
      }
      numberColor = number;
    }
    if ((number - numberColor) % headerLength === 0) {
      cell.style.backgroundColor = ('#C0C0C0');
    }
  });
}

// Начальная сортировка
function sortNumbersGrow(attr) {
  library.sort((obj1, obj2) => obj1[attr] - obj2[attr]);
  renderTable();
  addArrow('down', attr);
}

function sortNumbersDecrease(attr) {
  library.sort((obj1, obj2) => obj2[attr] - obj1[attr]);
  renderTable();
  addArrow('up', attr);
}

// Сортировки после основной с учетом обратной сортировки
function sortStringsGrow(attr) {
  library.sort((obj1, obj2) => {
    if (obj1[attr] < obj2[attr]) return 1;
    if (obj1[attr] > obj2[attr]) return -1;
    return 0;
  });
  renderTable();
  addArrow('down', attr);
}

function sortStringsDecrease(attr) {
  library.sort((obj1, obj2) => {
    if (obj1[attr] < obj2[attr]) return -1;
    if (obj1[attr] > obj2[attr]) return 1;
    return 0;
  });
  renderTable();
  addArrow('up', attr);
}

const sortings = [
  sortNumbersGrow,
  sortNumbersDecrease,
  sortStringsGrow,
  sortStringsDecrease,
  sortNumbersGrow,
  sortNumbersDecrease,
  sortNumbersGrow,
  sortNumbersDecrease,
];

let counter = 0;

window.onload = () => {
  setInterval(() => {
    if (counter > sortings.length - 1) {
      counter = 0;
    }
    // Формируем исполняющую функцию поочередно выбирая из 2ух списков название её и атрибут её
    sortings[counter](sortingsAttr[counter]);
    counter += 1;
  }, 2000);
};
