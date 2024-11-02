const mainForm = document.getElementById('mainForm');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalData = document.getElementById('modalData');

mainForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const fields = [
    document.querySelector('input[name="full-name"]'),
    document.querySelector('input[name="variant"]'),
    document.querySelector('input[name="phone-number"]'),
    document.querySelector('input[name="faculty"]'),
    document.querySelector('input[name="address"]'),
  ];

  fields.forEach((input) => {
    input.style.borderColor = '';
  });

  const fullNameRegex = /^[А-ЯІЇЄҐ][а-яіїєґ]+ [А-ЯІЇЄҐ]\. [А-ЯІЇЄҐ]\.$/;
  const variantRegex = /^\d{2}$/;
  const phoneNumberRegex = /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
  const facultyRegex = /^[A-ZА-ЯІЇЄҐ]{4}$/;
  const addressRegex = /^м\. [A-ZА-ЯІЇЄҐ][a-zа-яіїєґ]+$/;

  let incorrectCounter = 0;

  if (!fullNameRegex.test(fields[0].value.trim())) {
    fields[0].style.borderColor = 'red';
    incorrectCounter++;
  }

  if (!variantRegex.test(fields[1].value.trim())) {
    fields[1].style.borderColor = 'red';
    incorrectCounter++;
  }

  if (!phoneNumberRegex.test(fields[2].value.trim())) {
    fields[2].style.borderColor = 'red';
    incorrectCounter++;
  }

  if (!facultyRegex.test(fields[3].value.trim())) {
    fields[3].style.borderColor = 'red';
    incorrectCounter++;
  }

  if (!addressRegex.test(fields[4].value.trim())) {
    fields[4].style.borderColor = 'red';
    incorrectCounter++;
  }

  if (!incorrectCounter) {
    modalData.innerHTML = `
      <strong>ПІБ:</strong> ${fields[0].value}<br>
      <strong>Варіант:</strong> ${fields[1].value}<br>
      <strong>Телефон:</strong> ${fields[2].value}<br>
      <strong>Факультет:</strong> ${fields[3].value}<br>
      <strong>Адреса:</strong> ${fields[4].value}
    `;

    modal.style.display = 'flex';
  }
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const table = document.getElementById('numberTable');
  let counter = 1;
  const colorPicker = document.getElementById('colorPicker');
  let selectedCell = null;

  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 6; j++) {
      const cell = document.createElement('td');
      cell.textContent = counter;

      if (counter === 7) {
        cell.addEventListener('mouseover', () => {
          cell.style.backgroundColor = getRandomColor();
        });

        cell.addEventListener('click', () => {
          selectedCell = cell;
          colorPicker.click();
        });

        cell.addEventListener('dblclick', () => {
          const color = cell.style.backgroundColor;
          const rows = table.getElementsByTagName('tr');

          for (let r = i; r < rows.length; r += 2) {
            const children = rows[r].children;
            for (let c = j; c < children.length; c++) {
              children[c].style.backgroundColor = color;
            }
          }
        });
      }

      row.appendChild(cell);
      counter++;
    }
    table.appendChild(row);
  }

  colorPicker.addEventListener('input', (event) => {
    if (selectedCell) {
      selectedCell.style.backgroundColor = event.target.value;
    }
  });
});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
