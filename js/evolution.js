let evolutionLog = [
    {id: 1, event: 'Вылупление', growthVal: 1, date: '01-10-2025'}, 
    {id: 2, event: 'Первый уход', growthVal: 2, date: '01-10-2025'}, 
    {id: 3, event: 'Стал подростком', growthVal: 5, date: '05-10-2025'},
    {id: 4, event: 'Победил в игру', growthVal: 0.5, date: '02-10-2025'}
];

let selectedEvents = new Set();
let currentGrowthValue = 1;


function addTableRowListeners() {
    const rows = document.querySelectorAll('#evolution-log-body tr[data-id]');
    
    rows.forEach(row => {
        row.addEventListener('click', (e) => {
            const eventId = parseFloat(row.getAttribute('data-id'));
            const isMultiSelect = e.ctrlKey || e.metaKey;
            
            handleRowSelection(eventId, isMultiSelect, row);
        });
    });
}

function handleRowSelection(eventId, isMultiSelect, rowElement) {
    if (isMultiSelect) {
        if (selectedEvents.has(eventId)) {
            selectedEvents.delete(eventId);
            rowElement.classList.remove('selected');
        } else {
            selectedEvents.add(eventId);
            rowElement.classList.add('selected');
        }
    } else {
        selectedEvents.clear();
        selectedEvents.add(eventId);
        
        document.querySelectorAll('#evolution-log-body tr').forEach(row => {
            row.classList.remove('selected');
        });
        rowElement.classList.add('selected');
    }
    
    updateSelectionCounter();
}

function updateSelectionCounter() {
    const counter = document.getElementById('selectedCount');
    if (counter) {
        counter.textContent = selectedEvents.size;
    }
}

function renderEvol(logToDisplay){
    if (!logToDisplay){
        logToDisplay = evolutionLog;
    }

    const logBody = document.getElementById('evolution-log-body');
    const totalGrowthEl = document.getElementById('total-growth');

    logBody.innerHTML = '';
    let totalGrowth = 0;

    if(logToDisplay.length === 0){
        logBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Журнал пуст. Начните новую историю!</td></tr>';
    } else{
        let rowsHTML = '';
        logToDisplay.forEach(entry => {
            totalGrowth += entry.growthVal;
            const isSelected = selectedEvents.has(entry.id);
            
            rowsHTML += `
                <tr class="${isSelected ? 'selected' : ''}" 
                    data-id="${entry.id}">
                    <td>${entry.id}</td>
                    <td>${entry.event}</td>
                    <td>+${entry.growthVal}</td>
                    <td class="log-item-actions">
                        <button class="remove-specific-btn" data-id="${entry.id}" title="Удалить это событие">
                            ❌
                        </button>
                    </td>
                </tr>
            `;
        });
        logBody.innerHTML = rowsHTML;
    }
    totalGrowthEl.textContent = totalGrowth.toFixed(1);
    
    updateSelectionCounter();
    addTableRowListeners();
    
    document.querySelectorAll('.remove-specific-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const idToRemove = parseFloat(e.currentTarget.getAttribute('data-id'));
            removeSpecificItem(idToRemove);
        });
    });
}

function removeRandItem(){
    if(evolutionLog.length === 0){
        alert("Журнал пуст, нечего удалять!");
        return;
    }

    const idxRemove = Math.floor(Math.random() * evolutionLog.length);
    evolutionLog.splice(idxRemove, 1);
    renderEvol();
    alert("Случайное событие удалено из истории!");
}

function removeSpecificItem(id) {
    evolutionLog = evolutionLog.filter(item => item.id !== id);
    selectedEvents.delete(id);
    renderEvol();
}

function addNewEvent() {
    showEventModal();
}

function applyFilter() {
    const minGrowth = parseFloat(document.getElementById('min-growth').value);
    const maxGrowth = parseFloat(document.getElementById('max-growth').value);
    
    if (isNaN(minGrowth) || isNaN(maxGrowth)) {
        alert("Введите корректные числа для фильтра.");
        return;
    }
    const filteredLog = evolutionLog.filter(entry => 
        entry.growthVal >= minGrowth && entry.growthVal <= maxGrowth
    );
    
    renderEvol(filteredLog);
}

function applySort() {
    const key = document.getElementById('sort-key').value;
    const order = document.getElementById('sort-order').value;
    const sortedArray = [...evolutionLog].sort((a, b) => {
        let comparison = 0;
        
        if (key === 'growthVal') {
            comparison = a.growthVal - b.growthVal;
        } else if (key === 'id') {
            comparison = a.id - b.id;
        }
        return order === 'asc' ? comparison : comparison * -1;
    });

    renderEvol(sortedArray);
}

function clearLog() {
    if (evolutionLog.length === 0) {
        alert("Журнал уже пуст.");
        return;
    }
    
    if (confirm("Вы уверены, что хотите полностью сбросить историю Тамагочи?")) {
        evolutionLog = [];
        selectedEvents.clear();
        renderEvol();
        alert("История Тамагочи сброшена.");
    }
}

function showEventModal() {
    const modal = document.getElementById('eventModal');
    const descriptionInput = document.getElementById('eventDescription');
    
    descriptionInput.value = "Новое событие";
    currentGrowthValue = 1;
    document.getElementById('growthValue').textContent = "1";
    
    modal.style.display = 'flex';
    
    initSlider();
    
    setTimeout(() => {
        descriptionInput.select();
    }, 100);
}

function hideEventModal() {
    const modal = document.getElementById('eventModal');
    modal.style.display = 'none';
}

function initSlider() {
    const track = document.getElementById('sliderTrack');
    const thumb = document.getElementById('sliderThumb');
    const fill = document.getElementById('sliderFill');
    const valueDisplay = document.getElementById('growthValue');
    
    let isDragging = false;
    
    thumb.style.transition = 'none';
    fill.style.transition = 'none';
    
    function updateSlider(percent) {
        percent = Math.max(0, Math.min(100, percent));
        
        requestAnimationFrame(() => {
            thumb.style.left = percent + '%';
            fill.style.width = percent + '%';
        });
        
        currentGrowthValue = Math.round((percent / 100) * 10 * 10) / 10;
        valueDisplay.textContent = currentGrowthValue.toFixed(1);
    }
    
    function handleMove(clientX) {
        const rect = track.getBoundingClientRect();
        let relativeX = clientX - rect.left;
        relativeX = Math.max(0, Math.min(relativeX, rect.width));
        const percent = (relativeX / rect.width) * 100;
        updateSlider(percent);
    }
    
    const handleMouseDown = (e) => {
        e.preventDefault();
        isDragging = true;
        handleMove(e.clientX);
    };
    
    const handleMouseMove = (e) => {
        if (isDragging) handleMove(e.clientX);
    };
    
    const handleMouseUp = () => {
        isDragging = false;
    };
    
    thumb.addEventListener('mousedown', handleMouseDown);
    track.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

function confirmEvent() {
    const description = document.getElementById('eventDescription').value.trim();
    
    if (description === "") {
        alert("Введите описание события!");
        return;
    }
    
    const newId = evolutionLog.length > 0 ? evolutionLog[evolutionLog.length-1].id + 1 : 1;
    const newEntry = {
        id: newId, 
        event: description, 
        growthVal: currentGrowthValue, 
        date: new Date().toISOString().split('T')[0]
    };
    
    evolutionLog.push(newEntry);
    renderEvol();
    hideEventModal();
}


document.addEventListener('DOMContentLoaded', () => {
    renderEvol();
    

    document.getElementById('remove-random-btn').addEventListener('click', removeRandItem);
    document.getElementById('clear-log-btn').addEventListener('click', clearLog);
    document.getElementById('acc-add-event-button').addEventListener('click', addNewEvent);
    
    document.getElementById('apply-filter-btn').addEventListener('click', applyFilter);
    document.getElementById('apply-sort-btn').addEventListener('click', applySort);
    

    document.getElementById('confirmEvent').addEventListener('click', confirmEvent);
    document.getElementById('cancelEvent').addEventListener('click', hideEventModal);
    
    document.getElementById('eventModal').addEventListener('click', function(e) {
        if (e.target === this) {
            hideEventModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideEventModal();
        }
    });
});