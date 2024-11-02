let notes = [];

// Updated Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js', { scope: './' })
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Check online status
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

function updateOnlineStatus() {
    const status = document.getElementById('offline-status');
    if (navigator.onLine) {
        status.style.display = 'none';
        status.classList.remove('offline');
    } else {
        status.style.display = 'block';
        status.textContent = 'You are currently offline';
        status.classList.add('offline');
    }
}

function addNote() {
    const input = document.getElementById('note-input');
    const note = input.value.trim();
    
    if (note) {
        notes.push({
            text: note,
            date: new Date().toLocaleString()
        });
        saveNotes();
        renderNotes();
        input.value = '';
    }
}

function renderNotes() {
    const list = document.getElementById('notes-list');
    list.innerHTML = '';
    
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="note-content">
                <span class="note-text">${note.text}</span>
                <span class="note-date">${note.date}</span>
                <button onclick="deleteNote(${index})" class="delete-btn">Delete</button>
            </div>
        `;
        list.appendChild(li);
    });
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
        renderNotes();
    }
}

loadNotes();