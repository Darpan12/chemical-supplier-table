
let invoices = JSON.parse(localStorage.getItem('invoices')) || [
    { id: 1, chemicalName: 'Ammonium Persulfate', vendor: 'ZEE Labs', density: 3525.92, viscosity: 60.63, packaging: 'Bag', packSize: 100.00, unit: 'kg', quantity: 6495.18 },
    { id: 2, chemicalName: 'Caustic Potash', vendor: 'Formosa', density: 3172.15, viscosity: 48.22, packaging: 'Bag', packSize: 100.00, unit: 'kg', quantity: 8751.90 },
    {
        id: 3,
        chemicalName: 'Sodium Hypochlorite',
        vendor: 'MKNIND',
        density: 2345.12,
        viscosity: 12.34,
        packaging: 'Drum',
        packSize: 200.00,
        unit: 'L',
        quantity: 5000.00
    },
    {
        id: 4,
        chemicalName: 'Hydrochloric Acid',
        vendor: 'Ajanta',
        density: 1865.33,
        viscosity: 9.87,
        packaging: 'Drum',
        packSize: 100.00,
        unit: 'L',
        quantity: 4500.00
    },
    {
        id: 5,
        chemicalName: 'Sulfuric Acid',
        vendor: 'ZEE Labs',
        density: 2200.00,
        viscosity: 19.44,
        packaging: 'Tank',
        packSize: 500.00,
        unit: 'L',
        quantity: 12000.00
    },
    {
        id: 6,
        chemicalName: 'Acetic Acid',
        vendor: 'Formosa',
        density: 1500.22,
        viscosity: 25.54,
        packaging: 'Drum',
        packSize: 150.00,
        unit: 'L',
        quantity: 7800.00
    },
    {
        id: 7,
        chemicalName: 'Nitric Acid',
        vendor: 'BASF',
        density: 1430.99,
        viscosity: 18.76,
        packaging: 'Tank',
        packSize: 1000.00,
        unit: 'L',
        quantity: 25000.00
    },
    {
        id: 8,
        chemicalName: 'Methanol',
        vendor: 'Ajanta',
        density: 791.84,
        viscosity: 0.75,
        packaging: 'Drum',
        packSize: 150.00,
        unit: 'L',
        quantity: 3100.00
    },
    {
        id: 9,
        chemicalName: 'Benzene',
        vendor: 'ZEE Labs',
        density: 876.50,
        viscosity: 0.65,
        packaging: 'Drum',
        packSize: 200.00,
        unit: 'L',
        quantity: 4000.00
    },
    {
        id: 10,
        chemicalName: 'Ethanol',
        vendor: 'MKNIND',
        density: 789.45,
        viscosity: 1.20,
        packaging: 'Drum',
        packSize: 150.00,
        unit: 'L',
        quantity: 6000.00
    },
    {
        id: 11,
        chemicalName: 'Glycerin',
        vendor: 'BASF',
        density: 1261.80,
        viscosity: 15.80,
        packaging: 'Drum',
        packSize: 150.00,
        unit: 'L',
        quantity: 7200.00
    },
    {
        id: 12,
        chemicalName: 'Sodium Chloride',
        vendor: 'Ajanta',
        density: 2170.75,
        viscosity: 0.90,
        packaging: 'Bag',
        packSize: 50.00,
        unit: 'kg',
        quantity: 2500.00
    },
    {
        id: 13,
        chemicalName: 'Potassium Nitrate',
        vendor: 'ZEE Labs',
        density: 2100.12,
        viscosity: 3.44,
        packaging: 'Bag',
        packSize: 50.00,
        unit: 'kg',
        quantity: 4000.00
    },
    {
        id: 14,
        chemicalName: 'Ammonium Nitrate',
        vendor: 'Formosa',
        density: 1800.50,
        viscosity: 5.20,
        packaging: 'Bag',
        packSize: 100.00,
        unit: 'kg',
        quantity: 5600.00
    },
    {
        id: 15,
        chemicalName: 'Sodium Sulfate',
        vendor: 'MKNIND',
        density: 2620.95,
        viscosity: 3.88,
        packaging: 'Bag',
        packSize: 50.00,
        unit: 'kg',
        quantity: 3000.00
    }
    
];

let sortDirection = 'ascending';
let editingRowIndex = null; 

let addButton = document.querySelector('.actions button.btn-add');
let deleteButton = document.querySelector('.actions button.btn-delete');
let refershButton = document.querySelector('.actions button.btn-reset');
let saveButton = document.querySelector('.actions button.btn-save');
let rowDownButton = document.querySelector('.actions button.btn-sort-desc');
let rowUpButton = document.querySelector('.actions button.btn-sort-asc');
const hoverButtons = document.querySelectorAll('[data-name]');
const hoverText = document.getElementById('hover-text');

hoverButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
      hoverText.textContent = button.getAttribute('data-name');
      hoverText.style.visibility = 'visible';
    });

    button.addEventListener('mousemove', (e) => {
        hoverText.style.top = e.pageY + 10 + 'px'; 
        hoverText.style.left = e.pageX + 10 + 'px'; 
      });

    button.addEventListener('mouseout', () => {
      hoverText.style.visibility = 'hidden';
    });
  });

function initializeLocalStorage() {
    if (!localStorage.getItem('invoices')) {
        localStorage.setItem('invoices', JSON.stringify(invoices));
    }
}

function saveToLocalStorage(updatedData) {
    localStorage.setItem('invoices', JSON.stringify(updatedData));
}

function getDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem('invoices'));
}

function renderTable(data) {
    const tableBody = document.querySelector('.table-body');
    tableBody.innerHTML = '';

    data.forEach((invoice, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="edit-checkbox"></td>
            <td class="non-editable">${index + 1}</td>
            <td class="non-editable">${invoice.chemicalName}</td>
            <td class="non-editable">${invoice.vendor}</td>
            <td><input type="text" value="${invoice.density}" class="editable" readonly></td>
            <td><input type="text" value="${invoice.viscosity}" class="editable" readonly></td>
            <td class="non-editable">${invoice.packaging}</td>
            <td class="non-editable">${invoice.packSize}</td>
            <td class="non-editable">${invoice.unit}</td>
            <td><input type="text" value="${invoice.quantity}" class="editable" readonly></td>
        `;
        tableBody.appendChild(row);

        addEditListener(row, index);
    });
}

function addRowForInput() {
    if (editingRowIndex !== null) {
        alert("Finish editing the current row before adding a new one.");
        return;
    }

    const tableBody = document.querySelector('.table-body');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="checkbox" class="edit-checkbox"></td>
        <td class="non-editable">${invoices.length + 1}</td>
        <td><input type="text" class="input-chemical-name"></td>
        <td><input type="text" class="input-vendor"></td>
        <td><input type="text" class="input-density"></td>
        <td><input type="text" class="input-viscosity"></td>
        <td><input type="text" class="input-packaging"></td>
        <td><input type="text" class="input-pack-size"></td>
        <td><input type="text" class="input-unit"></td>
        <td><input type="text" class="input-quantity"></td>
    `;
    tableBody.appendChild(row);

    saveButton.onclick = function() {
        saveNewRow(row);
        resetAddRowState();
    };
}
function resetAddRowState() {
    editingRowIndex = null; 
}

function saveNewRow(row) {
    const newInvoice = {
        id: invoices.length + 1,
        chemicalName: row.querySelector('.input-chemical-name').value,
        vendor: row.querySelector('.input-vendor').value,
        density: parseFloat(row.querySelector('.input-density').value),
        viscosity: parseFloat(row.querySelector('.input-viscosity').value),
        packaging: row.querySelector('.input-packaging').value,
        packSize: parseFloat(row.querySelector('.input-pack-size').value),
        unit: row.querySelector('.input-unit').value,
        quantity: parseFloat(row.querySelector('.input-quantity').value)
    };
    invoices.push(newInvoice);
    saveToLocalStorage(invoices);
    renderTable(invoices);
}

function addEditListener(row, index) {
    const editCheckbox = row.querySelector('.edit-checkbox');
    const inputs = row.querySelectorAll('.editable');

    editCheckbox.addEventListener('change', function () {
        inputs.forEach(input => {
            input.readOnly = !this.checked;
        });

        if (this.checked) {
            editingRowIndex = index; 
        } else {

            invoices[index].density = parseFloat(inputs[0].value);
            invoices[index].viscosity = parseFloat(inputs[1].value);
            invoices[index].quantity = parseFloat(inputs[2].value);

            
            saveToLocalStorage(invoices);
            editingRowIndex = null;
        }
    });
}
saveButton.addEventListener('click', () => {
    if (editingRowIndex !== null) {
        const row = document.querySelectorAll('.table-body tr')[editingRowIndex];
        const inputs = row.querySelectorAll('.editable');

        invoices[editingRowIndex].density = parseFloat(inputs[0].value);
        invoices[editingRowIndex].viscosity = parseFloat(inputs[1].value);
        invoices[editingRowIndex].quantity = parseFloat(inputs[2].value);

        saveToLocalStorage(invoices);
        editingRowIndex = null; 
    }
    window.location.reload()
    renderTable(invoices); 
});

function updateSerialNumbers() {
    const rows = document.querySelectorAll('.table-body tr'); 
    rows.forEach((row, index) => {
        
        const serialCell = row.cells[0]; 
        if (serialCell) {
            serialCell.textContent = index + 1;
        }
    });
}

function deleteSelectedRows() {
    const checkboxes = document.querySelectorAll('.edit-checkbox');
    const updatedInvoices = invoices.filter((invoice, index) => {
        return !checkboxes[index].checked;
    });
    invoices = updatedInvoices;
    saveToLocalStorage(invoices);
    window.location.reload()
    renderTable(invoices);
    updateSerialNumbers();
}

function sortDataBy(key, direction) {
    invoices.sort((a, b) => {
        if (direction === 'ascending') {
            return a[key] > b[key] ? 1 : -1;
        } else {
            return a[key] < b[key] ? 1 : -1;
        }
    });
    renderTable(invoices);
}

function handleHeaderClick(column) {
    const headers = document.querySelectorAll('.table-header th');
    headers.forEach(header => {
        header.addEventListener('click', function() {
            if (sortDirection === 'ascending') {
                sortDirection = 'descending';
            } else {
                sortDirection = 'ascending';
            }
            sortDataBy(column, sortDirection);
        });
    });
}

function attachHeaderListeners() {
    const headers = document.querySelectorAll('.table-header th');
    headers.forEach((header, index) => {
        const columnMap = {
            1: 'id',
            2: 'chemicalName',
            3: 'vendor',
            4: 'density',
            5: 'viscosity',
            6: 'packaging',
            7: 'packSize',
            8: 'unit',
            9: 'quantity'
        };

        header.addEventListener('click', function() {
            const columnKey = columnMap[index];
            handleHeaderClick(columnKey);
        });
    });
}
function saveDataInTable(){
    saveToLocalStorage(invoices);
    renderTable(invoices);
}
function moveRowUp() {
    const selectedCheckboxes = document.querySelectorAll('.edit-checkbox:checked');
    selectedCheckboxes.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const previousRow = row.previousElementSibling;

        if (previousRow) {
            const currentIndex = Array.from(row.parentNode.children).indexOf(row);
            const previousIndex = currentIndex - 1;

            [invoices[currentIndex], invoices[previousIndex]] = [invoices[previousIndex], invoices[currentIndex]];

            saveToLocalStorage(invoices);
            window.location.reload()
            renderTable(invoices);
        }
    });
}
function moveRowDown() {
    const selectedCheckboxes = document.querySelectorAll('.edit-checkbox:checked');
    selectedCheckboxes.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const nextRow = row.nextElementSibling;

        if (nextRow) {
            const currentIndex = Array.from(row.parentNode.children).indexOf(row);
            const nextIndex = currentIndex + 1;

            [invoices[currentIndex], invoices[nextIndex]] = [invoices[nextIndex], invoices[currentIndex]];

            saveToLocalStorage(invoices);
            window.location.reload()
            renderTable(invoices);
        }
    });
}

addButton.addEventListener('click', addRowForInput);
deleteButton.addEventListener('click', deleteSelectedRows);
refershButton.addEventListener('click', () => {
    window.location.reload();
});
rowUpButton.addEventListener('click', moveRowUp);
rowDownButton.addEventListener('click', moveRowDown);

initializeLocalStorage();
renderTable(getDataFromLocalStorage());
attachHeaderListeners();