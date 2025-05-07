// Sample property data (replace with your actual data source)
const properties = [
    {
        id: 1,
        title: "Luxury Villa in Beverly Hills",
        location: "beverly hills",
        type: "villa",
        bedrooms: 5,
        price: 2500000,
        status: "buy",
        image: "images/property1.jpg"
    },
    {
        id: 2,
        title: "Modern Apartment in Manhattan",
        location: "new york",
        type: "apartment",
        bedrooms: 3,
        price: 1200000,
        status: "buy",
        image: "images/property2.jpg"
    },
    {
        id: 3,
        title: "Waterfront Mansion in Miami",
        location: "miami",
        type: "villa",
        bedrooms: 6,
        price: 3750000,
        status: "buy",
        image: "images/property3.jpg"
    },
    {
        id: 4,
        title: "Downtown Condo for Rent",
        location: "chicago",
        type: "condo",
        bedrooms: 2,
        price: 2500,
        status: "rent",
        image: "images/property4.jpg"
    }
];

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('propertySearchForm');
    const searchTabs = document.querySelectorAll('.search-tab');
    let currentSearchType = 'buy';
    
    // Tab switching
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            searchTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentSearchType = this.dataset.type;
        });
    });
    
    // Search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const location = document.getElementById('searchLocation').value.toLowerCase();
            const type = document.getElementById('propertyType').value;
            const bedrooms = document.getElementById('bedrooms').value;
            
            // Filter properties
            const results = properties.filter(property => {
                return (
                    property.status === currentSearchType &&
                    (location === '' || property.location.includes(location)) &&
                    (type === '' || property.type === type) &&
                    (bedrooms === '' || property.bedrooms >= parseInt(bedrooms))
                );
            });
            
            displaySearchResults(results);
        });
    }
    
    // Display results
    function displaySearchResults(results) {
        const propertiesGrid = document.querySelector('.properties-grid');
        
        if (results.length === 0) {
            propertiesGrid.innerHTML = '<p class="no-results">No properties match your search criteria.</p>';
            return;
        }
        
        propertiesGrid.innerHTML = results.map(property => `
            <div class="property-card">
                <div class="property-image">
                    <img src="${property.image}" alt="${property.title}">
                    <div class="property-actions">
                        <button><i class="far fa-heart"></i></button>
                        <button><i class="fas fa-share-alt"></i></button>
                    </div>
                </div>
                <div class="property-details">
                    <h3>${property.title}</h3>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                    <div class="features">
                        <span><i class="fas fa-bed"></i> ${property.bedrooms} Beds</span>
                        <span><i class="fas fa-vector-square"></i> ${property.type}</span>
                    </div>
                    <div class="price-favorite">
                        <p class="price">${property.status === 'buy' ? '$' + property.price.toLocaleString() : '$' + property.price + '/mo'}</p>
                        <button class="favorite-btn"><i class="far fa-heart"></i></button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Initialize with all properties
    displaySearchResults(properties);
});

