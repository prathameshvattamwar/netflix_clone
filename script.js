// Check if the user is logged in
document.addEventListener('DOMContentLoaded', function() {
    // If the user is not logged in, show the login modal
    const isLoggedIn = localStorage.getItem('netflixLoggedIn');
    const loginModal = document.getElementById('login-modal');
    
    if (!isLoggedIn) {
        console.log('User not logged in, showing login modal');
        loginModal.style.display = 'flex';
    } else {
        console.log('User already logged in, hiding login modal');
        loginModal.style.display = 'none';
        // Load all movie data and populate the UI
        loadAllMovies();
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Setup event listeners
    setupEventListeners();
});

// Setup all event listeners
function setupEventListeners() {
    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (email && password) {
                // Store in localStorage for persistence
                localStorage.setItem('netflixLoggedIn', 'true');
                localStorage.setItem('netflixUser', email);
                
                // Hide login modal and load movies
                const loginModal = document.getElementById('login-modal');
                loginModal.style.display = 'none';
                
                // Load movies after login
                loadAllMovies();
                
                console.log('Login successful, modal should be hidden now');
            }
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('netflixLoggedIn');
            localStorage.removeItem('netflixUser');
            localStorage.removeItem('myList');
            // Redirect to landing page instead of showing login modal
            window.location.href = 'landing.html';
        });
    }

    // Modal close button
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            document.getElementById('movie-modal').style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('movie-modal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Add to My List button
    const addToListBtn = document.getElementById('add-to-list');
    if (addToListBtn) {
        addToListBtn.addEventListener('click', function() {
            const movieId = addToListBtn.getAttribute('data-id');
            addToMyList(movieId);
        });
    }
    
    // Remove from My List button
    const removeFromListBtn = document.getElementById('remove-from-list');
    if (removeFromListBtn) {
        removeFromListBtn.addEventListener('click', function() {
            const movieId = removeFromListBtn.getAttribute('data-id');
            removeFromMyList(movieId);
        });
    }
}

const movieDatabase = [
    // Trending Now
    {
        id: 't1',
        title: 'Stranger Things',
        description: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
        category: 'trending',
        year: 2022,
        rating: 'TV-14',
        duration: '3 Seasons',
        posterUrl: 'stranger_things.jpg'
    },
    {
        id: 't2',
        title: 'Wednesday',
        description: 'Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends — and foes — at Nevermore Academy.',
        category: 'trending',
        year: 2022,
        rating: 'TV-14',
        duration: '1 Season',
        posterUrl: 'wednesday.jpg'
    },
    {
        id: 't3',
        title: 'The Witcher',
        description: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
        category: 'trending',
        year: 2023,
        rating: 'TV-MA',
        duration: '3 Seasons',
        posterUrl: 'witcher.jpg'
    },
    {
        id: 't4',
        title: 'Squid Game',
        description: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits — with deadly high stakes.',
        category: 'trending',
        year: 2021,
        rating: 'TV-MA',
        duration: '1 Season',
        posterUrl: 'squid_game.jpg'
    },
    {
        id: 't5',
        title: 'Money Heist',
        description: 'Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan.',
        category: 'trending',
        year: 2021,
        rating: 'TV-MA',
        duration: '5 Parts',
        posterUrl: 'Money_Heist.jpg'
    },
    {
        id: 't6',
        title: 'The Queen\'s Gambit',
        description: 'In a 1950s orphanage, a young girl reveals an astonishing talent for chess and begins an unlikely journey to stardom while grappling with addiction.',
        category: 'trending',
        year: 2020,
        rating: 'TV-MA',
        duration: 'Limited Series',
        posterUrl: 'queen_gambit.jpg'
    },
    
    // Top Rated
    {
        id: 'r1',
        title: 'Breaking Bad',
        description: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family\'s future.',
        category: 'top-rated',
        year: 2013,
        rating: 'TV-MA',
        duration: '5 Seasons',
        posterUrl: 'breaking_bad.jpg'
    },
    {
        id: 'r2',
        title: 'The Crown',
        description: 'Based on historical events, this series dramatizes the story of Queen Elizabeth II and the political and personal events that have shaped her reign.',
        category: 'top-rated',
        year: 2022,
        rating: 'TV-MA',
        duration: '5 Seasons',
        posterUrl: 'the_crown.jpg'
    },
    {
        id: 'r3',
        title: 'Dark',
        description: 'A missing child sets four families on a frantic hunt for answers as they unearth a mind-bending mystery that spans three generations.',
        category: 'top-rated',
        year: 2020,
        rating: 'TV-MA',
        duration: '3 Seasons',
        posterUrl: 'the_Dark.jpg'
    },
    {
        id: 'r4',
        title: 'Mindhunter',
        description: 'In the late 1970s, two FBI agents expand criminal science by delving into the psychology of murder and getting uneasily close to all-too-real monsters.',
        category: 'top-rated',
        year: 2019,
        rating: 'TV-MA',
        duration: '2 Seasons',
        posterUrl: 'mindhunter.jpg'
    },
    {
        id: 'r5',
        title: 'Black Mirror',
        description: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.',
        category: 'top-rated',
        year: 2019,
        rating: 'TV-MA',
        duration: '5 Seasons',
        posterUrl: 'black_mirror.jpg'
    },
    {
        id: 'r6',
        title: 'Narcos',
        description: 'The true story of Colombia\'s infamously violent and powerful drug cartels fuels this gritty gangster drama series.',
        category: 'top-rated',
        year: 2017,
        rating: 'TV-MA',
        duration: '3 Seasons',
        posterUrl: 'narcos.jpg'
    },
    
    // Action Movies
    {
        id: 'a1',
        title: 'Extraction',
        description: 'A hardened mercenary\'s mission becomes a soul-searching race to survive when he\'s sent into Bangladesh to rescue a drug lord\'s kidnapped son.',
        category: 'action',
        year: 2020,
        rating: 'R',
        duration: '1h 56m',
        posterUrl: 'Extraction.jpg'
    },
    {
        id: 'a2',
        title: 'The Gray Man',
        description: 'When a shadowy CIA agent uncovers damning agency secrets, he\'s hunted across the globe by a sociopathic rogue operative who\'s put a bounty on his head.',
        category: 'action',
        year: 2022,
        rating: 'PG-13',
        duration: '2h 9m',
        posterUrl: 'the_gray_man.jpg'
    },
    {
        id: 'a3',
        title: 'Red Notice',
        description: 'An FBI profiler pursuing the world\'s most wanted art thief becomes his reluctant partner in crime to catch an elusive crook who\'s always one step ahead.',
        category: 'action',
        year: 2021,
        rating: 'PG-13',
        duration: '1h 57m',
        posterUrl: 'red_notice.jpg'
    },
    {
        id: 'a4',
        title: 'The Old Guard',
        description: 'A covert team of immortal mercenaries is suddenly exposed and must now fight to keep their identity a secret just as an unexpected new member is discovered.',
        category: 'action',
        year: 2020,
        rating: 'R',
        duration: '2h 5m',
        posterUrl: 'old_guard.jpg'
    },
    {
        id: 'a5',
        title: 'Project Power',
        description: 'An ex-soldier, a teen and a cop collide in New Orleans as they hunt for the source behind a dangerous new pill that grants users temporary superpowers.',
        category: 'action',
        year: 2020,
        rating: 'R',
        duration: '1h 53m',
        posterUrl: 'project_power.jpg'
    },
    {
        id: 'a6',
        title: 'Army of the Dead',
        description: 'After a zombie outbreak in Las Vegas, a group of mercenaries takes the ultimate gamble by venturing into the quarantine zone for the greatest heist ever.',
        category: 'action',
        year: 2021,
        rating: 'R',
        duration: '2h 28m',
        posterUrl: 'army_of_the_dead.jpg'
    },
    
    // Comedies
    {
        id: 'c1',
        title: 'The Good Place',
        description: 'Due to an error, self-absorbed Eleanor Shellstrop arrives at the Good Place after her death. Determined to stay, she tries to become a better person.',
        category: 'comedy',
        year: 2020,
        rating: 'TV-14',
        duration: '4 Seasons',
        posterUrl: 'the_good_place.jpg'
    },
    {
        id: 'c2',
        title: 'Brooklyn Nine-Nine',
        description: 'The hilarious heroics of New York\'s funniest police precinct continue for a new season, with a brand-new home: NBC.',
        category: 'comedy',
        year: 2021,
        rating: 'TV-14',
        duration: '8 Seasons',
        posterUrl: 'nine_nine.jpg'
    },
    {
        id: 'c3',
        title: 'Schitt\'s Creek',
        description: 'Suddenly broke, the formerly filthy-rich Rose family is reduced to living in a ramshackle motel in a town they once bought as a joke: Schitt\'s Creek.',
        category: 'comedy',
        year: 2020,
        rating: 'TV-14',
        duration: '6 Seasons',
        posterUrl: 'Schitt_Creek.jpg'
    },
    {
        id: 'c4',
        title: 'Never Have I Ever',
        description: 'After a traumatic year, an Indian-American teen just wants to spruce up her social status — but friends, family and feelings won\'t make it easy on her.',
        category: 'comedy',
        year: 2023,
        rating: 'TV-14',
        duration: '4 Seasons',
        posterUrl: 'never_i_have_ever.jpg'
    },
    {
        id: 'c5',
        title: 'Emily in Paris',
        description: 'After landing her dream job in Paris, Chicago marketing exec Emily Cooper embraces her adventurous new life while juggling work, friends and romance.',
        category: 'comedy',
        year: 2022,
        rating: 'TV-MA',
        duration: '3 Seasons',
        posterUrl: 'emily_in_paris.jpg'
    },
    {
        id: 'c6',
        title: 'Sex Education',
        description: 'Insecure Otis has all the answers when it comes to sex advice, thanks to his therapist mom. So rebel Maeve proposes a school sex-therapy clinic.',
        category: 'comedy',
        year: 2023,
        rating: 'TV-MA',
        duration: '4 Seasons',
        posterUrl: 'sex_education.jpg'
    }
];

// Load all movie categories
function loadAllMovies() {
    // Populate each row with the appropriate movies
    populateMovies('trending', movieDatabase.filter(movie => movie.category === 'trending'));
    populateMovies('top-rated', movieDatabase.filter(movie => movie.category === 'top-rated'));
    populateMovies('action', movieDatabase.filter(movie => movie.category === 'action'));
    populateMovies('comedy', movieDatabase.filter(movie => movie.category === 'comedy'));
    
    // Load My List from localStorage
    loadMyList();
}

// Populate a specific row with movies
function populateMovies(rowId, movies) {
    const rowElement = document.getElementById(rowId);
    if (!rowElement) return;
    
    rowElement.innerHTML = '';
    
    movies.forEach(movie => {
        const posterElement = document.createElement('div');
        posterElement.className = 'row-poster';
        posterElement.innerHTML = `
            <img src="${movie.posterUrl}" alt="${movie.title}" class="poster-img">
            <div class="poster-info">
                <h3 class="poster-title">${movie.title}</h3>
                <div class="poster-buttons">
                    <div class="poster-btn"><i class="fa-solid fa-play"></i></div>
                    <div class="poster-btn add-list-btn" data-id="${movie.id}"><i class="fa-solid fa-plus"></i></div>
                </div>
            </div>
        `;
        
        // Add click event to open modal with movie details
        posterElement.addEventListener('click', function() {
            openMovieModal(movie);
        });
        
        rowElement.appendChild(posterElement);
    });
    
    // Add event listeners to all Add to List buttons in this row
    const addButtons = rowElement.querySelectorAll('.add-list-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent opening the modal
            const movieId = this.getAttribute('data-id');
            addToMyList(movieId);
        });
    });
    
    // Check if any of the movies in this row are in My List
    // and update their UI accordingly
    const myList = getMyList();
    myList.forEach(id => {
        const button = rowElement.querySelector(`.add-list-btn[data-id="${id}"]`);
        if (button) {
            const icon = button.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-check');
            }
        }
    });
}

// My List functions
function getMyList() {
    // Get My List from localStorage or return empty array if not found
    const storedList = localStorage.getItem('myList');
    return storedList ? JSON.parse(storedList) : [];
}

function saveMyList(list) {
    // Save My List to localStorage
    localStorage.setItem('myList', JSON.stringify(list));
}

function addToMyList(movieId) {
    const myList = getMyList();
    
    // Only add if not already in list
    if (!myList.includes(movieId)) {
        myList.push(movieId);
        saveMyList(myList);
        
        // Update the UI
        const buttons = document.querySelectorAll(`.add-list-btn[data-id="${movieId}"]`);
        buttons.forEach(button => {
            const icon = button.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-check');
            }
        });
        
        // If modal is open, update its buttons
        const addButton = document.getElementById('add-to-list');
        const removeButton = document.getElementById('remove-from-list');
        if (addButton && addButton.getAttribute('data-id') === movieId) {
            addButton.style.display = 'none';
            removeButton.style.display = 'block';
        }
        
        // Refresh the My List row
        loadMyList();
    }
}

function removeFromMyList(movieId) {
    let myList = getMyList();
    
    // Remove the movie ID from the list
    myList = myList.filter(id => id !== movieId);
    saveMyList(myList);
    
    // Update the UI
    const buttons = document.querySelectorAll(`.add-list-btn[data-id="${movieId}"]`);
    buttons.forEach(button => {
        const icon = button.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-check');
            icon.classList.add('fa-plus');
        }
    });
    
    // If modal is open, update its buttons
    const addButton = document.getElementById('add-to-list');
    const removeButton = document.getElementById('remove-from-list');
    if (removeButton && removeButton.getAttribute('data-id') === movieId) {
        addButton.style.display = 'block';
        removeButton.style.display = 'none';
    }
    
    // Refresh the My List row
    loadMyList();
}

function loadMyList() {
    const myList = getMyList();
    const myListMovies = [];
    
    // Find all movies in the user's list
    myList.forEach(id => {
        const movie = movieDatabase.find(movie => movie.id === id);
        if (movie) {
            myListMovies.push(movie);
        }
    });
    
    // Populate the My List row
    const myListRow = document.getElementById('my-list');
    if (myListRow) {
        // Show a message if the list is empty
        if (myListMovies.length === 0) {
            myListRow.innerHTML = '<p class="empty-list">Your list is empty. Add titles by clicking the + icon.</p>';
        } else {
            populateMovies('my-list', myListMovies);
        }
    }
}

// Open movie details modal
function openMovieModal(movie) {
    // Set modal content
    document.getElementById('modal-title').textContent = movie.title;
    document.getElementById('modal-year').textContent = movie.year;
    document.getElementById('modal-rating').textContent = movie.rating;
    document.getElementById('modal-duration').textContent = movie.duration;
    document.getElementById('modal-description').textContent = movie.description;
    document.getElementById('modal-poster-img').src = movie.posterUrl;
    
    // Set the movie ID for the Add/Remove buttons
    const addButton = document.getElementById('add-to-list');
    const removeButton = document.getElementById('remove-from-list');
    addButton.setAttribute('data-id', movie.id);
    removeButton.setAttribute('data-id', movie.id);
    
    // Check if movie is in My List to show the appropriate button
    const myList = getMyList();
    if (myList.includes(movie.id)) {
        addButton.style.display = 'none';
        removeButton.style.display = 'block';
    } else {
        addButton.style.display = 'block';
        removeButton.style.display = 'none';
    }
    
    // Show the modal
    document.getElementById('movie-modal').style.display = 'block';
}

// Setup search functionality
function setupSearch() {
    const searchIcon = document.querySelector('.fa-magnifying-glass');
    const navbar = document.querySelector('.navbar-container');
    
    // Create search input element (initially hidden)
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" class="search-input" placeholder="Titles, people, genres">
        <div class="search-results"></div>
    `;
    
    // Insert the search container after the logo container
    const logoContainer = document.querySelector('.logo-container');
    navbar.insertBefore(searchContainer, logoContainer.nextSibling);
    
    // Toggle search input visibility when clicking the search icon
    searchIcon.addEventListener('click', function() {
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchContainer.querySelector('.search-input').focus();
        } else {
            searchContainer.querySelector('.search-input').value = '';
            clearSearchResults();
        }
    });
    
    // Handle search input
    const searchInput = searchContainer.querySelector('.search-input');
    const searchResults = searchContainer.querySelector('.search-results');
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 2) {
            clearSearchResults();
            return;
        }
        
        // Search in movie database
        const results = movieDatabase.filter(movie => {
            return movie.title.toLowerCase().includes(query) || 
                   movie.description.toLowerCase().includes(query) ||
                   movie.category.toLowerCase().includes(query);
        });
        
        displaySearchResults(results, query);
    });
    
    // Clear search when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target) && e.target !== searchIcon) {
            searchContainer.classList.remove('active');
            searchInput.value = '';
            clearSearchResults();
        }
    });
}

// Display search results
function displaySearchResults(results, query) {
    const searchResults = document.querySelector('.search-results');
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = `<p class="no-results">No results found for "${query}"</p>`;
        searchResults.style.display = 'block';
        return;
    }
    
    // Limit to first 6 results
    const limitedResults = results.slice(0, 6);
    
    limitedResults.forEach(movie => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <img src="${movie.posterUrl}" alt="${movie.title}">
            <div class="search-result-info">
                <h3>${highlightText(movie.title, query)}</h3>
                <p>${movie.year} | ${movie.rating}</p>
            </div>
        `;
        
        // Open movie modal when clicking on a search result
        resultItem.addEventListener('click', function() {
            openMovieModal(movie);
            // Clear search after selecting a result
            document.querySelector('.search-container').classList.remove('active');
            document.querySelector('.search-input').value = '';
            clearSearchResults();
        });
        
        searchResults.appendChild(resultItem);
    });
    
    searchResults.style.display = 'block';
}

// Clear search results
function clearSearchResults() {
    const searchResults = document.querySelector('.search-results');
    searchResults.innerHTML = '';
    searchResults.style.display = 'none';
}

// Highlight matching text in search results
function highlightText(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Call this function during initial setup
document.addEventListener('DOMContentLoaded', function() {
    // Add this line to your existing DOMContentLoaded event
    if (localStorage.getItem('netflixLoggedIn')) {
        setupSearch();
    }
});

// Rating System Functions
function setupRatingSystem() {
    // First, update the modal HTML structure to include rating buttons
    // This should be done once when the page loads
    const modalButtons = document.querySelector('.modal-buttons');
    
    // Create rating container if it doesn't exist
    if (!document.querySelector('.rating-container')) {
        const ratingContainer = document.createElement('div');
        ratingContainer.className = 'rating-container';
        ratingContainer.innerHTML = `
            <p>Rate this title:</p>
            <div class="rating-buttons">
                <button class="btn-rating btn-thumbs-up" title="I like this">
                    <i class="fa-regular fa-thumbs-up"></i>
                </button>
                <button class="btn-rating btn-thumbs-down" title="Not for me">
                    <i class="fa-regular fa-thumbs-down"></i>
                </button>
            </div>
        `;
        
        // Insert rating container after modal buttons
        modalButtons.parentNode.insertBefore(ratingContainer, modalButtons.nextSibling);
    }
}

// Get ratings from localStorage
function getRatings() {
    const storedRatings = localStorage.getItem('netflixRatings');
    return storedRatings ? JSON.parse(storedRatings) : {};
}

// Save ratings to localStorage
function saveRating(movieId, rating) {
    let ratings = getRatings();
    ratings[movieId] = rating;
    localStorage.setItem('netflixRatings', JSON.stringify(ratings));
}

// Update rating buttons in the modal based on existing ratings
function updateRatingButtons(movieId) {
    const thumbsUp = document.querySelector('.btn-thumbs-up');
    const thumbsDown = document.querySelector('.btn-thumbs-down');
    
    // Reset button states
    thumbsUp.classList.remove('active');
    thumbsDown.classList.remove('active');
    
    // Make thumbs-up icons regular (outlined)
    thumbsUp.innerHTML = '<i class="fa-regular fa-thumbs-up"></i>';
    thumbsDown.innerHTML = '<i class="fa-regular fa-thumbs-down"></i>';
    
    // Check if movie has been rated
    const ratings = getRatings();
    if (ratings[movieId]) {
        if (ratings[movieId] === 'like') {
            thumbsUp.classList.add('active');
            thumbsUp.innerHTML = '<i class="fa-solid fa-thumbs-up"></i>';
        } else if (ratings[movieId] === 'dislike') {
            thumbsDown.classList.add('active');
            thumbsDown.innerHTML = '<i class="fa-solid fa-thumbs-down"></i>';
        }
    }
    
    // Add event listeners to rating buttons
    thumbsUp.addEventListener('click', function() {
        if (thumbsUp.classList.contains('active')) {
            // Remove rating if already liked
            saveRating(movieId, null);
            thumbsUp.classList.remove('active');
            thumbsUp.innerHTML = '<i class="fa-regular fa-thumbs-up"></i>';
        } else {
            // Add like rating
            saveRating(movieId, 'like');
            thumbsUp.classList.add('active');
            thumbsDown.classList.remove('active');
            thumbsUp.innerHTML = '<i class="fa-solid fa-thumbs-up"></i>';
            thumbsDown.innerHTML = '<i class="fa-regular fa-thumbs-down"></i>';
            
            // Update the UI to show this movie is liked
            updateMovieCardsWithRatings();
        }
    });
    
    thumbsDown.addEventListener('click', function() {
        if (thumbsDown.classList.contains('active')) {
            // Remove rating if already disliked
            saveRating(movieId, null);
            thumbsDown.classList.remove('active');
            thumbsDown.innerHTML = '<i class="fa-regular fa-thumbs-down"></i>';
        } else {
            // Add dislike rating
            saveRating(movieId, 'dislike');
            thumbsDown.classList.add('active');
            thumbsUp.classList.remove('active');
            thumbsDown.innerHTML = '<i class="fa-solid fa-thumbs-down"></i>';
            thumbsUp.innerHTML = '<i class="fa-regular fa-thumbs-up"></i>';
            
            // Update the UI to show this movie is disliked
            updateMovieCardsWithRatings();
        }
    });
}

// Update movie cards in all rows to show ratings
function updateMovieCardsWithRatings() {
    const ratings = getRatings();
    const movieCards = document.querySelectorAll('.row-poster');
    
    movieCards.forEach(card => {
        const addListBtn = card.querySelector('.add-list-btn');
        if (!addListBtn) return;
        
        const movieId = addListBtn.getAttribute('data-id');
        
        // Remove any existing rating badges
        const existingBadge = card.querySelector('.rating-badge');
        if (existingBadge) {
            existingBadge.remove();
        }
        
        // Add rating badge if movie is rated
        if (ratings[movieId]) {
            const posterInfo = card.querySelector('.poster-info');
            
            // Create rating badge
            const ratingBadge = document.createElement('div');
            ratingBadge.className = 'rating-badge';
            
            if (ratings[movieId] === 'like') {
                ratingBadge.innerHTML = '<i class="fa-solid fa-thumbs-up"></i>';
                ratingBadge.classList.add('like');
            } else if (ratings[movieId] === 'dislike') {
                ratingBadge.innerHTML = '<i class="fa-solid fa-thumbs-down"></i>';
                ratingBadge.classList.add('dislike');
            }
            
            posterInfo.appendChild(ratingBadge);
        }
    });
}

// Modify the existing openMovieModal function to include rating functionality
const originalOpenMovieModal = openMovieModal;
openMovieModal = function(movie) {
    // Call the original function first
    originalOpenMovieModal(movie);
    
    // Then add our rating functionality
    setupRatingSystem();
    updateRatingButtons(movie.id);
};

// Add this to your existing DOM ready function
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('netflixLoggedIn')) {
        // Initialize ratings on movie cards
        setTimeout(() => {
            updateMovieCardsWithRatings();
        }, 1000); // Small delay to ensure movies are loaded
    }
});

// Continue Watching Feature
function setupContinueWatching() {
    // Create a new row for "Continue Watching" if it doesn't exist yet
    if (!document.getElementById('continue-watching')) {
        const moviesContainer = document.querySelector('.movies-container');
        const continueWatchingRow = document.createElement('div');
        continueWatchingRow.className = 'movies-row';
        continueWatchingRow.innerHTML = `
            <h2 class="row-title">Continue Watching</h2>
            <div class="row-posters" id="continue-watching">
                <!-- Will be populated via JavaScript -->
            </div>
        `;
        
        // Insert after the hero section, before other rows
        moviesContainer.insertBefore(continueWatchingRow, moviesContainer.firstChild);
    }
    
    // Load watch history
    loadWatchHistory();
}

// Get watch history from localStorage
function getWatchHistory() {
    const storedHistory = localStorage.getItem('netflixWatchHistory');
    return storedHistory ? JSON.parse(storedHistory) : [];
}

// Save watch history to localStorage
function saveWatchHistory(history) {
    localStorage.setItem('netflixWatchHistory', JSON.stringify(history));
}

// Add a movie to watch history when play button is clicked
function addToWatchHistory(movieId) {
    let history = getWatchHistory();
    
    // Remove the movie if it's already in history
    history = history.filter(id => id !== movieId);
    
    // Add movie to the beginning of the array (most recent)
    history.unshift(movieId);
    
    // Limit history to 10 items
    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    
    saveWatchHistory(history);
    
    // Reload the continue watching section
    loadWatchHistory();
}

// Load watch history and populate the row
function loadWatchHistory() {
    const history = getWatchHistory();
    const watchHistoryMovies = [];
    
    // Find all movies in the watch history
    history.forEach(id => {
        const movie = movieDatabase.find(movie => movie.id === id);
        if (movie) {
            watchHistoryMovies.push({
                ...movie,
                progress: getMovieProgress(id) // Add progress property
            });
        }
    });
    
    // Populate the Continue Watching row
    const watchHistoryRow = document.getElementById('continue-watching');
    if (watchHistoryRow) {
        if (watchHistoryMovies.length === 0) {
            watchHistoryRow.innerHTML = '<p class="empty-list">Your watch history is empty. Play a title to see it here.</p>';
            // Hide the entire row if there's no history
            watchHistoryRow.parentElement.style.display = 'none';
        } else {
            // Show the row if there's history
            watchHistoryRow.parentElement.style.display = 'block';
            
            watchHistoryRow.innerHTML = '';
            
            watchHistoryMovies.forEach(movie => {
                const posterElement = document.createElement('div');
                posterElement.className = 'row-poster';
                posterElement.innerHTML = `
                    <img src="${movie.posterUrl}" alt="${movie.title}" class="poster-img">
                    <div class="poster-info">
                        <h3 class="poster-title">${movie.title}</h3>
                        <div class="poster-buttons">
                            <div class="poster-btn play-btn" data-id="${movie.id}"><i class="fa-solid fa-play"></i></div>
                            <div class="poster-btn add-list-btn" data-id="${movie.id}">
                                <i class="fa-solid ${getMyList().includes(movie.id) ? 'fa-check' : 'fa-plus'}"></i>
                            </div>
                        </div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${movie.progress}%"></div>
                    </div>
                `;
                
                // Add click event to open modal with movie details
                posterElement.addEventListener('click', function() {
                    openMovieModal(movie);
                });
                
                watchHistoryRow.appendChild(posterElement);
            });
            
            // Add play button event listeners
            const playButtons = watchHistoryRow.querySelectorAll('.play-btn');
            playButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent opening the modal
                    const movieId = this.getAttribute('data-id');
                    playMovie(movieId);
                });
            });
            
            // Add list button event listeners
            const addButtons = watchHistoryRow.querySelectorAll('.add-list-btn');
            addButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent opening the modal
                    const movieId = this.getAttribute('data-id');
                    const myList = getMyList();
                    
                    if (myList.includes(movieId)) {
                        removeFromMyList(movieId);
                    } else {
                        addToMyList(movieId);
                    }
                });
            });
        }
    }
}

// Get random progress percentage for a movie (simulating actual progress)
function getMovieProgress(movieId) {
    // In a real app, this would be the actual watch progress
    // For this demo, we'll generate a random percentage or use stored value
    const storedProgress = localStorage.getItem(`movieProgress_${movieId}`);
    if (storedProgress) {
        return parseInt(storedProgress);
    }
    
    // Generate a random progress between 10% and 95%
    const progress = Math.floor(Math.random() * 85) + 10;
    localStorage.setItem(`movieProgress_${movieId}`, progress.toString());
    return progress;
}

// Simulate playing a movie
function playMovie(movieId) {
    // Add to watch history
    addToWatchHistory(movieId);
    
    // Simulate updating the progress (in a real app, this would track actual viewing progress)
    const currentProgress = getMovieProgress(movieId);
    const newProgress = Math.min(currentProgress + 10, 95); // Increment progress
    localStorage.setItem(`movieProgress_${movieId}`, newProgress.toString());
    
    // In a real app, this would open a video player
    // For this demo, we'll just show an alert
    alert(`Playing movie ${movieDatabase.find(m => m.id === movieId).title}`);
    
    // Reload watch history to show updated progress
    loadWatchHistory();
}

// Add play functionality to the modal's play button
function setupModalPlayButton() {
    const modalPlayButton = document.querySelector('.modal-buttons .btn-play');
    
    if (modalPlayButton) {
        modalPlayButton.addEventListener('click', function() {
            const movieId = document.getElementById('add-to-list').getAttribute('data-id');
            playMovie(movieId);
            
            // Close the modal
            document.getElementById('movie-modal').style.display = 'none';
        });
    }
}

// Modify the existing openMovieModal function to update modal play button
const originalOpenMovieModal2 = openMovieModal;
openMovieModal = function(movie) {
    // Call the previous function (which might include rating functionality)
    originalOpenMovieModal2(movie);
    
    // Setup modal play button
    setupModalPlayButton();
};

// Add this to your existing DOM ready function
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('netflixLoggedIn')) {
        setupContinueWatching();
    }
});

// Profile Selection
function setupProfileSelection() {
    // Create profiles modal HTML
    const profilesModal = document.createElement('div');
    profilesModal.className = 'profiles-modal';
    profilesModal.id = 'profiles-modal';
    profilesModal.innerHTML = `
        <div class="profiles-container">
            <h1>Who's watching?</h1>
            <div class="profiles-list">
                <div class="profile-item" data-name="Profile 1">
                    <img src="profile_icon2.png" alt="Profile 1">
                    <span>Guest</span>
                </div>
                <div class="profile-item" data-name="Profile 2">
                    <img src="profile_icon2.png" alt="Profile 2">
                    <span>User</span>
                </div>
                <div class="profile-item add-profile">
                    <div class="add-icon">+</div>
                    <span>Add Profile</span>
                </div>
            </div>
            <button class="profiles-manage-btn">Manage Profiles</button>
        </div>
    `;
    
    // Add profiles modal to the body
    document.body.appendChild(profilesModal);
    
    // Setup profile selection event handlers
    const profileItems = document.querySelectorAll('.profile-item:not(.add-profile)');
    profileItems.forEach(item => {
        item.addEventListener('click', function() {
            const profileName = this.getAttribute('data-name');
            selectProfile(profileName, this.querySelector('img').src);
        });
    });
    
    // Add profile button handler
    const addProfileBtn = document.querySelector('.add-profile');
    if (addProfileBtn) {
        addProfileBtn.addEventListener('click', function() {
            // In a real app, this would open a form to create a new profile
            alert('Add Profile functionality would be implemented here.');
        });
    }
    
    // Manage profiles button handler
    const manageProfilesBtn = document.querySelector('.profiles-manage-btn');
    if (manageProfilesBtn) {
        manageProfilesBtn.addEventListener('click', function() {
            // In a real app, this would open the profile management screen
            alert('Manage Profiles functionality would be implemented here.');
        });
    }
}

// Select a profile and hide the profiles modal
function selectProfile(profileName, profileImage) {
    // Store the selected profile in localStorage
    localStorage.setItem('netflixSelectedProfile', profileName);
    localStorage.setItem('netflixProfileImage', profileImage);
    
    // Update profile picture in the navbar
    document.querySelector('.profile-pic').src = profileImage;
    
    // Update dropdown profile images
    document.querySelectorAll('.dropdown-profile').forEach(img => {
        img.src = profileImage;
    });
    
    // Hide the profiles modal
    document.getElementById('profiles-modal').style.display = 'none';
    
    // Load all movie data
    loadAllMovies();
    
    // Set up additional features
    setupSearch();
    setupContinueWatching();
    setTimeout(() => {
        updateMovieCardsWithRatings();
    }, 1000);
}

// Check if a profile is selected before showing movies
function checkProfileSelection() {
    const selectedProfile = localStorage.getItem('netflixSelectedProfile');
    const profileImage = localStorage.getItem('netflixProfileImage');
    
    if (selectedProfile && localStorage.getItem('netflixLoggedIn')) {
        // A profile is already selected, update UI
        document.querySelector('.profile-pic').src = profileImage;
        document.querySelectorAll('.dropdown-profile').forEach(img => {
            img.src = profileImage;
        });
        
        // Hide profiles modal if it's visible
        const profilesModal = document.getElementById('profiles-modal');
        if (profilesModal) {
            profilesModal.style.display = 'none';
        }
        
        return true;
    } else if (localStorage.getItem('netflixLoggedIn')) {
        // User is logged in but no profile selected, show profiles
        document.getElementById('profiles-modal').style.display = 'flex';
        return false;
    }
    
    return false;
}

// Modify the existing DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // First, check if the user is logged in
    const isLoggedIn = localStorage.getItem('netflixLoggedIn');
    const loginModal = document.getElementById('login-modal');
    
    if (!isLoggedIn) {
        console.log('User not logged in, showing login modal');
        loginModal.style.display = 'flex';
    } else {
        console.log('User already logged in, checking profile selection');
        loginModal.style.display = 'none';
        
        // Setup profile selection screen
        setupProfileSelection();
        
        // Check if a profile is selected
        if (checkProfileSelection()) {
            // Profile is selected, load movies and features
            loadAllMovies();
            setupSearch();
            setupContinueWatching();
            setTimeout(() => {
                updateMovieCardsWithRatings();
            }, 1000);
        }
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Setup event listeners
    setupEventListeners();
});

// Enhance the poster info with more metadata
function enhancePosterInfo() {
    // Update the populateMovies function to include more information in the poster info
    const originalPopulateMovies = populateMovies;
    populateMovies = function(rowId, movies) {
        // Call the original function
        originalPopulateMovies(rowId, movies);
        
        // Get all the posters in this row
        const posters = document.getElementById(rowId).querySelectorAll('.row-poster');
        
        // Loop through each poster and enhance its info
        posters.forEach((poster, index) => {
            const movie = movies[index];
            const posterInfo = poster.querySelector('.poster-info');
            
            // Add metadata and tags if they don't exist
            if (!poster.querySelector('.poster-metadata')) {
                // Create metadata div
                const metadataDiv = document.createElement('div');
                metadataDiv.className = 'poster-metadata';
                
                // Add match percentage (simulated)
                const matchPercentage = Math.floor(Math.random() * 30) + 70; // Random 70-99%
                metadataDiv.innerHTML = `<span class="match">${matchPercentage}% Match</span>`;
                
                // Add year
                metadataDiv.innerHTML += `<span>${movie.year}</span>`;
                
                // Add rating
                metadataDiv.innerHTML += `<span>${movie.rating}</span>`;
                
                // Add duration/seasons
                metadataDiv.innerHTML += `<span>${movie.duration}</span>`;
                
                // Add metadata before the buttons
                const buttonsDiv = posterInfo.querySelector('.poster-buttons');
                posterInfo.insertBefore(metadataDiv, buttonsDiv);
                
                // Create tags div
                const tagsDiv = document.createElement('div');
                tagsDiv.className = 'poster-tags';
                
                // Add genre tags (based on category)
                let genreTags = [];
                switch (movie.category) {
                    case 'trending':
                        genreTags = ['Trending', 'Popular', 'Exciting'];
                        break;
                    case 'top-rated':
                        genreTags = ['Critically Acclaimed', 'Award-Winning'];
                        break;
                    case 'action':
                        genreTags = ['Action', 'Thrilling', 'Adventure'];
                        break;
                    case 'comedy':
                        genreTags = ['Comedy', 'Witty', 'Feel-Good'];
                        break;
                    default:
                        genreTags = ['Recommended'];
                }
                
                // Add a random subset of tags
                const numTags = Math.floor(Math.random() * 2) + 1; // 1-2 tags
                const selectedTags = [];
                
                for (let i = 0; i < numTags && i < genreTags.length; i++) {
                    const randomIndex = Math.floor(Math.random() * genreTags.length);
                    const tag = genreTags[randomIndex];
                    
                    if (!selectedTags.includes(tag)) {
                        selectedTags.push(tag);
                    }
                }
                
                tagsDiv.innerHTML = selectedTags.map(tag => `<span>${tag}</span>`).join('');
                
                // Add tags before the buttons
                posterInfo.insertBefore(tagsDiv, buttonsDiv);
            }
        });
    };
}

// Call this function during initial setup
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('netflixLoggedIn')) {
        enhancePosterInfo();
    }
});

// Integration helper to ensure all features are properly initialized
function initializeAllFeatures() {
    // Make sure the profile is selected
    if (!localStorage.getItem('netflixSelectedProfile') && localStorage.getItem('netflixLoggedIn')) {
        setupProfileSelection();
        document.getElementById('profiles-modal').style.display = 'flex';
        return; // Wait for profile selection before proceeding
    }
    
    // Setup search functionality
    if (!document.querySelector('.search-container') && localStorage.getItem('netflixLoggedIn')) {
        setupSearch();
    }
    
    // Setup continue watching section
    if (!document.getElementById('continue-watching') && localStorage.getItem('netflixLoggedIn')) {
        setupContinueWatching();
    }
    
    // Setup rating system
    if (document.getElementById('movie-modal') && !document.querySelector('.rating-container')) {
        setupRatingSystem();
    }
    
    // Enhance poster info
    enhancePosterInfo();
    
    // Update movie cards with ratings
    setTimeout(() => {
        updateMovieCardsWithRatings();
    }, 1000);
}

// Add event listener for when the user logs in
function onLoginSuccess() {
    // Hide login modal
    document.getElementById('login-modal').style.display = 'none';
    
    // Show profile selection
    setupProfileSelection();
    document.getElementById('profiles-modal').style.display = 'flex';
}

// Update the login form event listener
const loginForm = document.getElementById('login-form');
if (loginForm) {
    // Remove existing event listeners
    const newLoginForm = loginForm.cloneNode(true);
    loginForm.parentNode.replaceChild(newLoginForm, loginForm);
    
    // Add new event listener
    newLoginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (email && password) {
            // Store in localStorage for persistence
            localStorage.setItem('netflixLoggedIn', 'true');
            localStorage.setItem('netflixUser', email);
            
            // Call the login success handler
            onLoginSuccess();
        }
    });
}

// Call the initialization function when the page loads
// This ensures all our features are properly set up
window.addEventListener('load', function() {
    if (localStorage.getItem('netflixLoggedIn')) {
        initializeAllFeatures();
    }
});

// Function to update the profile dropdown to show only the selected profile
function updateProfileDropdown(profileName, profileImage) {
    // Get the dropdown content
    const dropdownContent = document.querySelector('.dropdown-content');
    
    if (dropdownContent) {
        // Get all profile links elements (the first two are profile options)
        const profileOptions = dropdownContent.querySelectorAll('.profile-links');
        
        // If we have profile options, update them
        if (profileOptions.length >= 2) {
            // Hide the second profile option
            if (profileName === "Profile 1") {
                // Show Profile 1, hide Profile 2
                profileOptions[0].style.display = 'flex';
                profileOptions[1].style.display = 'none';
            } else {
                // Show Profile 2, hide Profile 1
                profileOptions[0].style.display = 'none';
                profileOptions[1].style.display = 'flex';
            }
        }
    }
}

// Update the selectProfile function to call updateProfileDropdown
const originalSelectProfile = selectProfile;
selectProfile = function(profileName, profileImage) {
    // Call the original function first
    originalSelectProfile(profileName, profileImage);
    
    // Then update the dropdown
    updateProfileDropdown(profileName, profileImage);
};

// Also update the checkProfileSelection function
const originalCheckProfileSelection = checkProfileSelection;
checkProfileSelection = function() {
    // Call the original function first
    const result = originalCheckProfileSelection();
    
    // If a profile is selected, update the dropdown
    if (result) {
        const profileName = localStorage.getItem('netflixSelectedProfile');
        const profileImage = localStorage.getItem('netflixProfileImage');
        updateProfileDropdown(profileName, profileImage);
    }
    
    return result;
};

// Make sure this is applied when the page loads
window.addEventListener('load', function() {
    if (localStorage.getItem('netflixLoggedIn') && localStorage.getItem('netflixSelectedProfile')) {
        const profileName = localStorage.getItem('netflixSelectedProfile');
        const profileImage = localStorage.getItem('netflixProfileImage');
        updateProfileDropdown(profileName, profileImage);
    }
});

// Mobile-specific functionality
function setupMobileFeatures() {
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;
    
    // Add grid view class to movies container by default for mobile
    const moviesContainer = document.querySelector('.movies-container');
    if (moviesContainer) {
        // Start in grid view on mobile by default
        moviesContainer.classList.add('grid-view');
    }
    
    // Setup mobile grid toggle with reversed functionality
    const gridToggleBtn = document.querySelector('.grid-toggle-btn');
    if (gridToggleBtn) {
        // Style the button
        gridToggleBtn.style.position = 'fixed';
        gridToggleBtn.style.right = '15px';
        gridToggleBtn.style.bottom = '70px';
        gridToggleBtn.style.zIndex = '999';
        gridToggleBtn.style.width = '40px';
        gridToggleBtn.style.height = '40px';
        gridToggleBtn.style.borderRadius = '50%';
        gridToggleBtn.style.backgroundColor = '#e50914';
        gridToggleBtn.style.color = 'white';
        gridToggleBtn.style.border = 'none';
        
        // Since we start in grid view, show the list icon initially
        gridToggleBtn.innerHTML = '<i class="fa-solid fa-list"></i>';
        
        // Toggle between grid and list view on click
        gridToggleBtn.addEventListener('click', function() {
            const moviesContainer = document.querySelector('.movies-container');
            moviesContainer.classList.toggle('list-view');
            
            // Change icon based on view
            if (moviesContainer.classList.contains('list-view')) {
                gridToggleBtn.innerHTML = '<i class="fa-solid fa-grip"></i>';
            } else {
                gridToggleBtn.innerHTML = '<i class="fa-solid fa-list"></i>';
            }
        });
    }
    
    // Setup mobile navigation
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav) {
        const navItems = mobileNav.querySelectorAll('.mobile-nav-item');
        
        navItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                navItems.forEach(navItem => navItem.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Handle search button click
                if (index === 1) {
                    const searchIcon = document.querySelector('.fa-magnifying-glass');
                    if (searchIcon) {
                        searchIcon.click();
                    }
                }
            });
        });
    }
}

// Call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Call after a small delay to ensure all elements are loaded
    setTimeout(setupMobileFeatures, 1000);
});

// Setup mobile features when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Only run on mobile
    if (window.innerWidth <= 768 && localStorage.getItem('netflixLoggedIn')) {
        setupMobileGridView();
    }
});

// Setup mobile grid view with toggle button
function setupMobileGridView() {
    // Get movies container
    const moviesContainer = document.querySelector('.movies-container');
    
    // Create grid toggle button if it doesn't exist
    if (!document.querySelector('.grid-toggle-btn')) {
        const gridToggleBtn = document.createElement('button');
        gridToggleBtn.className = 'grid-toggle-btn';
        gridToggleBtn.innerHTML = '<i class="fa-solid fa-list"></i>';
        document.body.appendChild(gridToggleBtn);
        
        // Toggle between grid and list view
        gridToggleBtn.addEventListener('click', function() {
            moviesContainer.classList.toggle('list-view');
            
            // Change icon based on current view
            if (moviesContainer.classList.contains('list-view')) {
                gridToggleBtn.innerHTML = '<i class="fa-solid fa-grip"></i>';
            } else {
                gridToggleBtn.innerHTML = '<i class="fa-solid fa-list"></i>';
            }
        });
    }
    
    // Add mobile bottom navigation if it doesn't exist
    if (!document.querySelector('.mobile-nav')) {
        const mobileNav = document.createElement('div');
        mobileNav.className = 'mobile-nav';
        mobileNav.innerHTML = `
            <div class="mobile-nav-item active">
                <i class="fa-solid fa-house"></i>
                <span>Home</span>
            </div>
            <div class="mobile-nav-item">
                <i class="fa-solid fa-magnifying-glass"></i>
                <span>Search</span>
            </div>
            <div class="mobile-nav-item">
                <i class="fa-solid fa-download"></i>
                <span>Downloads</span>
            </div>
            <div class="mobile-nav-item">
                <i class="fa-solid fa-ellipsis"></i>
                <span>More</span>
            </div>
        `;
        document.body.appendChild(mobileNav);
    }
}

// Fix for mobile profile dropdown
function fixMobileProfileDropdown() {
    // Only run on mobile
    if (window.innerWidth > 768) return;
    
    const profileContainer = document.querySelector('.profile-container');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    if (profileContainer && dropdownContent) {
        // Remove the hover behavior
        profileContainer.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle dropdown visibility
            if (dropdownContent.style.display === 'block') {
                dropdownContent.style.display = 'none';
                dropdownContent.style.visibility = 'hidden';
                dropdownContent.style.opacity = '0';
            } else {
                dropdownContent.style.display = 'block';
                dropdownContent.style.visibility = 'visible';
                dropdownContent.style.opacity = '1';
            }
        });
        
        // Close dropdown when clicking anywhere else
        document.addEventListener('click', function(e) {
            if (!profileContainer.contains(e.target)) {
                dropdownContent.style.display = 'none';
                dropdownContent.style.visibility = 'hidden';
                dropdownContent.style.opacity = '0';
            }
        });
    }
}

// Call this function after DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('netflixLoggedIn')) {
        fixMobileProfileDropdown();
    }
});

// Fix search functionality for mobile
function fixMobileSearch() {
    // Only run on mobile
    if (window.innerWidth > 768) return;
    
    const searchIcon = document.querySelector('.right-container .fa-magnifying-glass');
    const mobileSearchIcon = document.querySelector('.mobile-nav-item:nth-child(2)');
    const searchContainer = document.querySelector('.search-container');
    
    if (searchIcon && mobileSearchIcon && searchContainer) {
        // Create back button for mobile search if it doesn't exist
        if (!document.querySelector('.back-button')) {
            const backButton = document.createElement('button');
            backButton.className = 'back-button';
            backButton.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Back';
            backButton.style.display = 'none';
            backButton.style.background = 'transparent';
            backButton.style.border = 'none';
            backButton.style.color = 'white';
            backButton.style.fontSize = '16px';
            backButton.style.marginBottom = '15px';
            backButton.style.cursor = 'pointer';
            
            // Add back button at the start of search container
            searchContainer.insertBefore(backButton, searchContainer.firstChild);
            
            // Close search when back button is clicked
            backButton.addEventListener('click', function() {
                searchContainer.classList.remove('active');
                backButton.style.display = 'none';
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    searchInput.value = '';
                }
                const searchResults = document.querySelector('.search-results');
                if (searchResults) {
                    searchResults.style.display = 'none';
                }
            });
        }
        
        // Function to open search
        function openSearch() {
            searchContainer.classList.add('active');
            searchContainer.style.display = 'flex';
            document.querySelector('.back-button').style.display = 'block';
            document.querySelector('.search-input').focus();
        }
        
        // Set up click handlers for both search icons
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            openSearch();
        });
        
        mobileSearchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            openSearch();
        });
    }
}

// Call this function after DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('netflixLoggedIn')) {
        fixMobileSearch();
    }
});
