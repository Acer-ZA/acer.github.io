
/***********************************************************
    List of Items Viewer | Technical Assessment
    by Theo du Plooy
    081 415 6287 | tdpcorp@gmail.com
************************************************************/

document.addEventListener('DOMContentLoaded', function () {
    const getBody = document.body;
    const itemsContainer = document.querySelector('.items');
    const categorySelect = document.getElementById('category');
    const settingsCog = document.querySelector('.settings-icon');
    const settingsContainer = document.querySelector('.settings-container');
    const settingsTitle = document.querySelector('.settings-title');
    const lightTheme = document.getElementById('lightTheme');
    const darkTheme = document.getElementById('darkTheme');
    const categories = ['Cars', 'Animals', 'Fruits'];

    /// Check if the existing theme was set in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        /// Sets the theme name as a custom attribute on the Body for styling
        document.body.setAttribute('data-theme', savedTheme);
    }
    else {
        /// Sets the default theme
        document.body.setAttribute('data-theme', 'dark');
        darkTheme.classList.add('selected');
    }

    /// Build List of Items ///
    const items = [
        /// Cars
        { name: 'Audi', description: 'A stylish and reliable car for your everyday journeys.', category: 'Cars' },
        { name: 'BMW', description: 'A luxury car that offers a comfortable driving experience.', category: 'Cars' },
        { name: 'Ford', description: 'A popular choice known for its performance and versatility.', category: 'Cars' },
        { name: 'Mercedes', description: 'A premium car brand known for its innovative technology.', category: 'Cars' },
        { name: 'Nissan', description: 'A well-known car brand that offers a range of models.', category: 'Cars' },
        /// Animals
        { name: 'Cheetah', description: 'A magnificent creature that roams the South African savannah.', category: 'Animals' },
        { name: 'Crocodile', description: 'A fearsome reptile that lurks in the waters of South Africa.', category: 'Animals' },
        { name: 'Elephant', description: 'A majestic and intelligent animal found in South African national parks.', category: 'Animals' },
        { name: 'Giraffe', description: 'An iconic and gentle giant of the African plains.', category: 'Animals' },
        { name: 'Hippo', description: 'A semi-aquatic mammal known for its large size and powerful jaws.', category: 'Animals' },
        /// Fruits
        { name: 'Apple', description: 'A delicious and nutritious fruit enjoyed by many.', category: 'Fruits' },
        { name: 'Avocado', description: 'A creamy and nutritious fruit used in various culinary creations.', category: 'Fruits' },
        { name: 'Banana', description: 'A popular tropical fruit that provides a quick energy boost.', category: 'Fruits' },
        { name: 'Fig', description: 'A sweet and versatile fruit often enjoyed fresh or dried.', category: 'Fruits' },
        { name: 'Guava', description: 'A tropical fruit with a unique flavor and rich in vitamin C.', category: 'Fruits' },
    ];
    
    /// Sort items alphabetically by name
    items.sort((a, b) => a.name.localeCompare(b.name));

    /// Display the Items ///
    function displayItems(category) {
        const filteredItems = category === 'all' ? items : items.filter(item => item.category.toLowerCase() === category);
        itemsContainer.innerHTML = '';
        filteredItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            /// Build the item box
            itemElement.innerHTML = `
                <div class="item-inner-container">
                    <h2>${item.name}</h2>
                    <p>${item.description}</p>
                    <p>Category: ${item.category}</p>
                </div>
            `;
            itemsContainer.appendChild(itemElement);
        });
    }

    /// Append the available categories the category dropdown list by lowercase value
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    /// Display item list based on the selected category
    categorySelect.addEventListener('change', function () {
        displayItems(this.value);
    });

    /// Initial items display
    displayItems(categorySelect.value);

    /// Theme Control Settings Bindings ///
    settingsCog.addEventListener('click', function () {
        /// Slides the Theme Control In, and adds a 'settings-active' class to the Body to blur the layout elements
        settingsContainer.classList.toggle('active');
        getBody.classList.add('settings-active');
    });

     /// Hide theme selector on outside click
     document.addEventListener('click', function (event) {
        const targetElement = event.target;
        if (!settingsContainer.contains(targetElement) && !settingsCog.contains(targetElement)) {
            /// Hides the Theme Control Slider Container and Removes the Blur/settings-active class from the Body
            settingsContainer.classList.remove('active');
            getBody.classList.remove('settings-active');
        }
    });

    /// Allows the user to hide the Theme Control on Title click
    settingsTitle.addEventListener('click', function () {
        setTimeout(() => {
            settingsContainer.classList.remove('active');
            getBody.classList.remove('settings-active');
        }, 500);
    });

    /// Themes ///
    /// Sets the theme (body theme class, localStorage and hides the Theme Control Slider) 
    /// + sets an active state on the selected theme circle
    
    /// Sets the Light theme
    lightTheme.addEventListener('click', function () {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        lightTheme.classList.add('selected');
        darkTheme.classList.remove('selected');
        setTimeout(() => {
            /// Hides the Theme Control Slider Container and Removes the Blur/settings-active class from the Body
            settingsContainer.classList.remove('active');
            getBody.classList.remove('settings-active');
        }, 800);
    });

    /// Sets the Dark thme
    darkTheme.addEventListener('click', function () {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        darkTheme.classList.add('selected');
        lightTheme.classList.remove('selected');
        setTimeout(() => {
            /// Hides the Theme Control Slider Container and Removes the Blur/settings-active class from the Body
            settingsContainer.classList.remove('active');
            getBody.classList.remove('settings-active');
        }, 800);
    });

});
