document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
});

async function fetchBooks() {
    try {
        const response = await fetch('http://localhost:5000/api/books', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

function displayBooks(books) {
    const bookContainer = document.getElementById('bookContainer');
    
    books.forEach(book => {
        const base64Image = arrayBufferToBase64(book.image.buffer);

        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        
        bookCard.innerHTML = `
            <img src="data:image/jpeg;base64,${base64Image}" alt="${book.title}">
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Description: ${book.description}</p>
            <p>Price: $${book.price}</p>
        `;
        
        bookContainer.appendChild(bookCard);
    });
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
