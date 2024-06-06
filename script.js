document.addEventListener('DOMContentLoaded', function () {
    const loadCharactersDiv = document.querySelector('.loadcharacters');
    const searchButton = document.getElementById('search-button');
    const inputField = document.getElementById('input');
    const genderSelect = document.getElementById('gender');
    const loadMoreButton = document.getElementById('load-more-button');

    let currentPage = 1;
    let currentName = '';
    let currentGender = 'all';

    inputField.focus();

    async function fetchCharacters(name = '', gender = 'all', page = 1) {
        let url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`;
        if (gender !== 'all') {
            url += `&gender=${gender}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching characters:', error);
            return [];
        }
    }

    function createCharacterCard(character) {
        const card = document.createElement('div');
        card.className = 'character-card';

        const img = document.createElement('img');
        img.src = character.image;
        img.alt = character.name;

        const name = document.createElement('h3');
        name.textContent = character.name;

        const status = document.createElement('p');
        status.textContent = `Status: ${character.status}`;

        const species = document.createElement('p');
        species.textContent = `Species: ${character.species}`;

        const gender = document.createElement('p');
        gender.textContent = `Gender: ${character.gender}`;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(status);
        card.appendChild(species);
        card.appendChild(gender);

        return card;
    }

    async function loadCharacters(reset = false) {
        if (reset) {
            currentPage = 1;
            loadCharactersDiv.innerHTML = '';
        }

        const characters = await fetchCharacters(currentName, currentGender, currentPage);

        characters.forEach(character => {
            const card = createCharacterCard(character);
            loadCharactersDiv.appendChild(card);
        });

        currentPage++;
    }

    searchButton.addEventListener('click', () => {
        currentName = inputField.value;
        currentGender = genderSelect.value;
        loadCharacters(true);
    });

    loadMoreButton.addEventListener('click', () => {
        loadCharacters();
    });

    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });

    // Load initial characters
    loadCharacters();
});