// global variables

const studentItems = document.querySelectorAll('.student-item');
const pageDiv = document.querySelector(".page");
let selectedPage = 1;




// only show 10 studentItems at a time

function showPage (array, page) {
  for (let i = 0; i < studentItems.length; i++) {
    // only show studentItems, that fall in the selected page range
    if ( i < page * 10 && i >= (page - 1) * 10) {
      array[i].style.display = "block";
    } else {
      array[i].style.display = "none";
    }
  }
}


showPage( studentItems, selectedPage );


// create the buttons to change pages

function appendPageLinks () {
  const requiredPages = Math.ceil(studentItems.length / 10);
  // create the HTML
  const linkDiv = document.createElement("div");
  linkDiv.classList.add("pagination");
  pageDiv.appendChild(linkDiv);
  const ul = document.createElement("ul");
  linkDiv.appendChild(ul);
  // add another list item (button) for the number of pages required
  for ( let i = 0; i < requiredPages; i++) {
    ul.innerHTML += `
      <li>
        <a class="page-links" href="#">${i+1}</a>
      </li>`;
  }
  const links = document.querySelectorAll(".page-links");
  links[0].className += " active"; //set the first link as active as default
  // add event listeners to every link
  for ( let i = 0; i < links.length; i++ ) {
    links[i].addEventListener("click", function() {
      //when clicked, remove all active classes from links
      for ( let i = 0; i < links.length; i++) {
        links[i].classList.remove("active");
      }
      // re-add active class to clicked link
      this.className += " active";
      // change the selectedPage, for the showPage function
      selectedPage = parseInt(this.textContent);
      // re-call the showPage function
      showPage( studentItems, selectedPage );
    })
  }

}
appendPageLinks();

// Searchbar
function createSearchbar () {
  // create HTML
  const searchbar = document.createElement("div");
  searchbar.classList.add("student-search");
  searchbar.innerHTML = `
  <input class="search-input" placeholder="Search for students...">
  <button class="search-button">Search</button>`;
  document.querySelector(".page-header").appendChild(searchbar);
  // add event listener to the searchbar
  const searchButton = document.querySelector(".search-button");
  const searchInput = document.querySelector(".search-input");
  // search, if the button is clicked
  searchButton.addEventListener("click", function () {
    const searchText = searchInput.value.toLowerCase(); //toLowerCase, to make the search case insensitive
    // Look through all the studentItems and see if the search value is included in their names
    for ( let i = 0; i < studentItems.length; i++) {
      const studentName = document.querySelectorAll(".student-details h3")[i].innerHTML.toLowerCase();
       //indexOf The indexOf() method returns the position of the first occurrence of a specified value in a string.
       //This method returns -1 if the value to search for never occurs. "https://www.w3schools.com/jsref/jsref_indexof.asp"
      if ( studentName.indexOf(searchText) != -1 ) {
        studentItems[i].style.display = "block";
      } else {
        studentItems[i].style.display = "none";
      }
      }
    })
    // search, every time you enter a letter into the searchbar
    searchInput.addEventListener("keyup", function () {
      const searchText = searchInput.value.toLowerCase();
      for ( let i = 0; i < studentItems.length; i++) {
        const studentName = document.querySelectorAll(".student-details h3")[i].innerHTML.toLowerCase();
        if ( studentName.indexOf(searchText) != -1 ) {
          studentItems[i].style.display = "block";
        } else {
          studentItems[i].style.display = "none";
        }
        }
      })
  }


createSearchbar();
