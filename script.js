const myLibrary = [];

//Created constructor function to create book object
function Book(ttl, auth, pgs, beenRead){
    this.title = ttl;
    this.author = auth;
    this.pages = pgs;
    if(beenRead === 'true'){
        this.beenRead = 'Completed'
    }else if(beenRead === 'false'){
        this.beenRead = 'Incompleted'
    }
}

//Adds new book object to library array
function addNewBook(book){
    myLibrary.push(book);
}

const shelf = document.querySelector('#shelf');
shelf.addEventListener('submit', (e) => {

    //Get book data from DOM when form is submitted
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const radios = document.getElementsByName('option');

    //Gets true or false value from radio
    let confirmedBeenRead;
    function checkRadio(){
        for(const radio of radios){
            if(radio.checked){
                confirmedBeenRead = radio.value;
                break;
            }
        }
    }
    checkRadio();

    //Creates new book object from book data
    let book;
    function createNewBook(){
        if(myLibrary.length >= 0){
            //Numbers the book objects appropriately
            book = 'book' + '' + myLibrary.length;
            myLibrary[book] = new Book(title, author, pages, confirmedBeenRead);

            //Adds the numbered book object to the library array
            myLibrary.push(myLibrary[book]);
        }
    }
    createNewBook();
    e.preventDefault();

    //Creating elements to display books
    const display = document.querySelector('#display-container');

    //Adds style to the display element
    display.classList.add('display');

    if(title === '' || author === '' || pages === '' || radios === null){
        alert('Please fill in all information');
     }else{
         displayBookInformation();
     }

    function displayBookInformation(f){
        var displayBox = document.createElement('div');
        displayBox.classList.add('displayBox');
        display.appendChild(displayBox);

        //Created palces where the specific data will be displayed
        var titleContainer = document.createElement('h1');
        var authorContainer = document.createElement('h3');
        var pagesContainer = document.createElement('p');
        var readContainer = document.createElement('p');
        
        //Added delete button to remove a display box if needed
        var deleteButton = document.createElement('button')

        displayBox.appendChild(titleContainer);
        displayBox.appendChild(authorContainer);
        displayBox.appendChild(pagesContainer);
        displayBox.appendChild(readContainer);
        displayBox.appendChild(deleteButton);

        deleteButton.classList.add('deleteButton')

        //Created array of display children elements to identify it with the index of the myLibrary array
        let displayBoxArray = Array.from(display.children);

        //Created loop to match displayBox information with myLibrary array
        for(let i = 0; i <= myLibrary.length; i++){
            if(displayBoxArray[i] === myLibrary[i]){
                titleContainer.innerText = myLibrary[book].title;
                authorContainer.innerText = myLibrary[book].author;
                pagesContainer.innerText = myLibrary[book].pages + ' pages';
                readContainer.innerText = myLibrary[book].beenRead;
                deleteButton.innerText = 'Delete'
            }
        }

        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';

        //Delete particular display box
        deleteButton.addEventListener('click', () => {
            deleteButton.parentElement.remove();
        })
    }
});