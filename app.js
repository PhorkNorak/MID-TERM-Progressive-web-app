let notes = [];

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
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
        notes.push(note);
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
        li.textContent = note;
        list.appendChild(li);
    });
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

// Load saved notes when the app starts
loadNotes();
