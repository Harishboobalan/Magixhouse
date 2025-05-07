// Sample Property Data (Replace with your actual data source)
const properties = [
    {
        id: 1,
        title: "Luxury Oceanview Villa",
        location: "malibu",
        type: "villa",
        bedrooms: 5,
        bathrooms: 4,
        price: 8500000,
        squareFootage: 6500,
        features: ["pool", "garage", "garden"],
        image: "images/properties/villa1.jpg",
        status: "buy"
    },
    {
        id: 2,
        title: "Modern Downtown Condo",
        location: "new york",
        type: "condo",
        bedrooms: 2,
        bathrooms: 2,
        price: 1200000,
        squareFootage: 1800,
        features: ["furnished"],
        image: "images/properties/condo1.jpg",
        status: "buy"
    },
    {
        id: 3,
        title: "Chic City Apartment",
        location: "chicago",
        type: "apartment",
        bedrooms: 1,
        bathrooms: 1,
        price: 2500,
        squareFootage: 850,
        features: ["furnished"],
        image: "images/properties/apartment1.jpg",
        status: "rent"
    },
    // Add more properties as needed
];

// DOM Elements
const searchForm = document.getElementById('propertySearchForm');
const resultsContainer = document.getElementById('searchResults');
const noResults = document.getElementById('noResults');
const resetSearch = document.getElementById('resetSearch');
const advancedToggle = document.querySelector('.advanced-search-toggle');
const advancedOptions = document.querySelector('.advanced-search-options');

// Toggle Advanced Search
advancedToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    advancedOptions.classList.toggle('show');
});

// Search Functionality
function performSearch() {
    // Get search values
    const location = document.getElementById('searchLocation').value.toLowerCase();
    const type = document.getElementById('propertyType').value;
    const bedrooms = document.getElementById('bedrooms').value;
    const priceRange = document.getElementById('priceRange').value;
    const bathrooms = document.getElementById('bathrooms').value;
    const squareFootage = document.getElementById('squareFootage').value;
    
    // Get checked features
    const features = Array.from(document.querySelectorAll('input[name="features"]:checked'))
                         .map(checkbox => checkbox.value);
    
    // Filter properties
    const results = properties.filter(property => {
        // Location filter
        if (location && !property.location.includes(location)) return false;
        
        // Type filter
        if (type && property.type !== type) return false;
        
        // Bedrooms filter
        if (bedrooms && property.bedrooms < parseInt(bedrooms)) return false;
        
        // Price range filter
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            if (max && (property.price < min || property.price > max)) return false;
            if (!max && property.price < min) return false;
        }
        
        // Bathrooms filter (advanced)
        if (bathrooms && property.bathrooms < parseInt(bathrooms)) return false;
        
        // Square footage filter (advanced)
        if (squareFootage) {
            const [min, max] = squareFootage.split('-').map(Number);
            if (max && (property.squareFootage < min || property.squareFootage > max)) return false;
            if (!max && property.squareFootage < min) return false;
        }
        
        // Features filter (advanced)
        if (features.length > 0 && !features.every(feat => property.features.includes(feat))) return false;
        
        return true;
    });
    
    displayResults(results);
}

// Display Results
function displayResults(results) {
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    results.forEach(property => {
        const propertyCard = document.createElement('div');
        propertyCard.className = 'property-card';
        propertyCard.innerHTML = `
            <div class="property-badge">${property.status.toUpperCase()}</div>
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
                <div class="property-actions">
                    <button><i class="far fa-heart"></i></button>
                    <button><i class="fas fa-share-alt"></i></button>
                </div>
            </div>
            <div class="property-details">
                <h3>${property.title}</h3>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${property.location.replace(/\b\w/g, l => l.toUpperCase())}</p>
                
                <div class="features">
                    <span><i class="fas fa-bed"></i> ${property.bedrooms} Beds</span>
                    <span><i class="fas fa-bath"></i> ${property.bathrooms} Baths</span>
                    <span><i class="fas fa-ruler-combined"></i> ${property.squareFootage.toLocaleString()} sq.ft.</span>
                </div>
                
                <div class="price-favorite">
                    <p class="price">${property.status === 'rent' ? '$' + property.price.toLocaleString() + '/mo' : '$' + property.price.toLocaleString()}</p>
                    <button class="favorite-btn"><i class="far fa-heart"></i></button>
                </div>
            </div>
        `;
        resultsContainer.appendChild(propertyCard);
    });
}

// Event Listeners
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    performSearch();
});

resetSearch.addEventListener('click', function() {
    searchForm.reset();
    performSearch();
});

// Initialize with all properties
window.addEventListener('load', function() {
    displayResults(properties);
});