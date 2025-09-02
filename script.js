// Enhanced property data with more details
const   properties = [
    { 
      id: 1,
      title: "2BHK Apartment", 
      location: "Bangalore", 
      price: 15000, 
      priceDisplay: "₹15,000",
      image: "https://via.placeholder.com/400x200",
      photos: [
        "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Living+Room",
        "https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Bedroom+1",
        "https://via.placeholder.com/400x300/FF9800/FFFFFF?text=Kitchen",
        "https://via.placeholder.com/400x300/9C27B0/FFFFFF?text=Bathroom"
      ],
      type: "apartment",
      bedrooms: 2,
      bathrooms: 2,
      area: "1200 sq ft",
      description: "Beautiful 2BHK apartment in prime location with modern amenities. Perfect for families or working professionals.",
      amenities: ["Parking", "Security", "Gym", "Swimming Pool", "Garden"],
      available: true,
      owner: "John Smith",
      contact: "+91 98765 43210",
      address: "123 MG Road, Bangalore, Karnataka 560001"
    },
  { 
    id: 2,
    title: "PG for Boys", 
    location: "Hyderabad", 
    price: 6000, 
    priceDisplay: "₹6,000",
    image: "https://via.placeholder.com/400x200",
    photos: [
      "https://via.placeholder.com/400x300/FF5722/FFFFFF?text=Room+View",
      "https://via.placeholder.com/400x300/607D8B/FFFFFF?text=Common+Area",
      "https://via.placeholder.com/400x300/795548/FFFFFF?text=Dining+Hall"
    ],
    type: "pg",
    bedrooms: 1,
    bathrooms: 1,
    area: "200 sq ft",
    description: "Clean and comfortable PG accommodation for boys. Includes meals and basic amenities.",
    amenities: ["Meals", "WiFi", "Laundry", "Security", "Common Area"],
    available: true,
    owner: "Mrs. Rajesh Kumar",
    contact: "+91 87654 32109",
    address: "456 Hitech City, Hyderabad, Telangana 500081"
  },
  { 
    id: 3,
    title: "Commercial Store", 
    location: "Chennai", 
    price: 25000, 
    priceDisplay: "₹25,000",
    image: "https://via.placeholder.com/400x200",
    photos: [
      "https://via.placeholder.com/400x300/3F51B5/FFFFFF?text=Store+Front",
      "https://via.placeholder.com/400x300/E91E63/FFFFFF?text=Interior+View",
      "https://via.placeholder.com/400x300/00BCD4/FFFFFF?text=Storage+Area",
      "https://via.placeholder.com/400x300/8BC34A/FFFFFF?text=Parking+Area",
      "https://via.placeholder.com/400x300/FFC107/FFFFFF?text=Office+Space"
    ],
    type: "commercial",
    bedrooms: 0,
    bathrooms: 1,
    area: "800 sq ft",
    description: "Prime commercial space in busy market area. Ideal for retail business or office setup.",
    amenities: ["Parking", "Security", "Power Backup", "Water Supply", "Main Road Access"],
    available: true,
    owner: "ABC Properties",
    contact: "+91 76543 21098",
    address: "789 Anna Salai, Chennai, Tamil Nadu 600002"
  },
  { 
    id: 4,
    title: "1BHK Studio", 
    location: "Mumbai", 
    price: 18000, 
    priceDisplay: "₹18,000",
    image: "https://via.placeholder.com/400x200",
    photos: [
      "https://via.placeholder.com/400x300/673AB7/FFFFFF?text=Studio+View",
      "https://via.placeholder.com/400x300/009688/FFFFFF?text=Kitchenette"
    ],
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: "600 sq ft",
    description: "Compact studio apartment in heart of Mumbai. Perfect for young professionals.",
    amenities: ["Parking", "Security", "Lift", "Balcony", "Near Metro"],
    available: true,
    owner: "Mumbai Realty",
    contact: "+91 65432 10987",
    address: "321 Bandra West, Mumbai, Maharashtra 400050"
  },
  { 
    id: 5,
    title: "3BHK Villa", 
    location: "Pune", 
    price: 35000, 
    priceDisplay: "₹35,000",
    image: "https://via.placeholder.com/400x200",
    photos: [
      "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Villa+Exterior",
      "https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Master+Bedroom",
      "https://via.placeholder.com/400x300/FF9800/FFFFFF?text=Living+Hall",
      "https://via.placeholder.com/400x300/9C27B0/FFFFFF?text=Garden+View",
      "https://via.placeholder.com/400x300/F44336/FFFFFF?text=Swimming+Pool"
    ],
    type: "villa",
    bedrooms: 3,
    bathrooms: 3,
    area: "2000 sq ft",
    description: "Spacious villa with garden and modern amenities. Perfect for large families.",
    amenities: ["Garden", "Parking", "Security", "Swimming Pool", "Gym", "Club House"],
    available: false,
    owner: "Pune Properties",
    contact: "+91 54321 09876",
    address: "654 Koregaon Park, Pune, Maharashtra 411001"
  }
];

const propertyContainer = document.getElementById("propertyContainer");
const searchBox = document.getElementById("searchBox");

// Function to display properties
function displayProperties(list) {
  propertyContainer.innerHTML = "";
  list.forEach(p => {
    const availabilityBadge = p.available ? 
      '<span class="badge bg-success">Available</span>' : 
      '<span class="badge bg-danger">Not Available</span>';
    
    // Check if property is in wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isInWishlist = wishlist.includes(p.id);
    const wishlistButtonClass = isInWishlist ? 'btn btn-danger' : 'btn btn-outline-secondary';
    const wishlistIcon = isInWishlist ? 'bi bi-heart-fill' : 'bi bi-heart';
    const wishlistTitle = isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist';
    
    propertyContainer.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card property-card h-100">
          <div class="position-relative">
            <img src="${p.photos && p.photos.length > 0 ? p.photos[0] : p.image}" class="card-img-top" alt="${p.title}">
            ${p.photos && p.photos.length > 1 ? `
              <div class="position-absolute top-0 end-0 m-2">
                <span class="badge bg-dark bg-opacity-75">
                  <i class="bi bi-images"></i> ${p.photos.length} photos
                </span>
              </div>
            ` : ''}
          </div>
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="card-title">${p.title}</h5>
              ${availabilityBadge}
            </div>
            <p class="card-text text-muted">
              <i class="bi bi-geo-alt"></i> ${p.location}
            </p>
            <div class="mb-2">
              <small class="text-muted">
                <i class="bi bi-house"></i> ${p.bedrooms} BHK • 
                <i class="bi bi-rulers"></i> ${p.area}
              </small>
            </div>
            <p class="card-text text-success fw-bold fs-5">${p.priceDisplay}/month</p>
            <p class="card-text text-muted small">${p.description.substring(0, 100)}...</p>
            <div class="mt-auto">
              <div class="d-flex gap-2">
                <a href="property-details.html?id=${p.id}" class="btn btn-primary flex-fill">View Details</a>
                <button class="${wishlistButtonClass}" onclick="toggleWishlist(${p.id})" title="${wishlistTitle}">
                  <i class="${wishlistIcon}" style="color: ${isInWishlist ? '#dc3545' : '#6c757d'};"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  });
}

// Enhanced search and filter functionality
function filterProperties() {
  const query = searchBox.value.toLowerCase();
  const typeFilter = document.getElementById('typeFilter')?.value || '';
  const priceMin = parseInt(document.getElementById('priceMin')?.value) || 0;
  const priceMax = parseInt(document.getElementById('priceMax')?.value) || Infinity;
  const bedrooms = document.getElementById('bedrooms')?.value || '';
  
  let filtered = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(query) || 
                         p.location.toLowerCase().includes(query) ||
                         p.description.toLowerCase().includes(query);
    const matchesType = !typeFilter || p.type === typeFilter;
    const matchesPrice = p.price >= priceMin && p.price <= priceMax;
    const matchesBedrooms = !bedrooms || p.bedrooms == bedrooms;
    
    return matchesSearch && matchesType && matchesPrice && matchesBedrooms;
  });
  
  displayProperties(filtered);
}

// Search functionality
if (searchBox) {
  searchBox.addEventListener("input", filterProperties);
}

// Filter event listeners
document.addEventListener('DOMContentLoaded', function() {
  const typeFilter = document.getElementById('typeFilter');
  const priceMin = document.getElementById('priceMin');
  const priceMax = document.getElementById('priceMax');
  const bedrooms = document.getElementById('bedrooms');
  
  if (typeFilter) typeFilter.addEventListener('change', filterProperties);
  if (priceMin) priceMin.addEventListener('input', filterProperties);
  if (priceMax) priceMax.addEventListener('input', filterProperties);
  if (bedrooms) bedrooms.addEventListener('change', filterProperties);
});

// Wishlist functionality
function toggleWishlist(propertyId) {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    alert('Please login to add properties to wishlist');
    window.location.href = 'login.html';
    return;
  }
  
  let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const index = wishlist.indexOf(propertyId);
  
  if (index > -1) {
    wishlist.splice(index, 1);
    alert('Removed from wishlist');
  } else {
    wishlist.push(propertyId);
    alert('Added to wishlist');
  }
  
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  
  // Update the wishlist button state
  updateWishlistButton(propertyId);
}

// Update wishlist button appearance
function updateWishlistButton(propertyId) {
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const isInWishlist = wishlist.includes(propertyId);
  
  // Find all wishlist buttons for this property
  const buttons = document.querySelectorAll(`button[onclick*="toggleWishlist(${propertyId})"]`);
  buttons.forEach(button => {
    const icon = button.querySelector('i');
    if (isInWishlist) {
      button.className = 'btn btn-danger';
      button.title = 'Remove from Wishlist';
      if (icon) {
        icon.className = 'bi bi-heart-fill';
        icon.style.color = '#dc3545';
      }
    } else {
      button.className = 'btn btn-outline-secondary';
      button.title = 'Add to Wishlist';
      if (icon) {
        icon.className = 'bi bi-heart';
        icon.style.color = '#6c757d';
      }
    }
  });
}

// Clear filters function
function clearFilters() {
  document.getElementById('searchBox').value = '';
  document.getElementById('typeFilter').value = '';
  document.getElementById('bedrooms').value = '';
  document.getElementById('priceMin').value = '';
  document.getElementById('priceMax').value = '';
  displayProperties(properties);
}

// Update navigation based on login status and user type
function updateNavigation() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const userEmail = sessionStorage.getItem('userEmail');
  
  if (isLoggedIn && userEmail) {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const userType = userData.userType;
    
    // Update navigation for logged-in users
    const navItems = document.querySelector('.navbar-nav');
    if (navItems) {
      let navigationHTML = `<li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>`;
      
                   if (userType === 'admin') {
               // Admin navigation
               navigationHTML += `
                 <li class="nav-item"><a class="nav-link" href="admin-dashboard.html">Admin Dashboard</a></li>
                 <li class="nav-item dropdown">
                   <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                     ${userEmail}
                   </a>
                   <ul class="dropdown-menu">
                     <li><a class="dropdown-item" href="admin-dashboard.html">Dashboard</a></li>
                     <li><a class="dropdown-item" href="admin-listings.html">Manage Listings</a></li>
                     <li><a class="dropdown-item" href="admin-users.html">Manage Users</a></li>
                     <li><a class="dropdown-item" href="admin-reports.html">Reports</a></li>
                     <li><hr class="dropdown-divider"></li>
                     <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                   </ul>
                 </li>
               `;
             } else if (userType === 'landlord' || userType === 'both') {
               // Owner navigation
               navigationHTML += `
                 <li class="nav-item"><a class="nav-link" href="owner-dashboard.html">Owner Dashboard</a></li>
                 <li class="nav-item dropdown">
                   <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                     ${userEmail}
                   </a>
                   <ul class="dropdown-menu">
                     <li><a class="dropdown-item" href="owner-dashboard.html">My Dashboard</a></li>
                     <li><a class="dropdown-item" href="add-property.html">Add Property</a></li>
                     <li><a class="dropdown-item" href="manage-properties.html">Manage Properties</a></li>
                     <li><a class="dropdown-item" href="manage-bookings.html">Manage Bookings</a></li>
                     ${userType === 'both' ? '<li><hr class="dropdown-divider"></li><li><a class="dropdown-item" href="dashboard.html">Tenant Dashboard</a></li><li><a class="dropdown-item" href="wishlist.html">Wishlist</a></li>' : ''}
                     <li><hr class="dropdown-divider"></li>
                     <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                   </ul>
                 </li>
               `;
             } else {
               // Tenant navigation
               navigationHTML += `
                 <li class="nav-item"><a class="nav-link" href="dashboard.html">Dashboard</a></li>
                 <li class="nav-item dropdown">
                   <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                     ${userEmail}
                   </a>
                   <ul class="dropdown-menu">
                     <li><a class="dropdown-item" href="dashboard.html">My Dashboard</a></li>
                     <li><a class="dropdown-item" href="wishlist.html">Wishlist</a></li>
                     <li><hr class="dropdown-divider"></li>
                     <li><a class="dropdown-item" href="#" onclick="logout()">Logout</a></li>
                   </ul>
                 </li>
               `;
             }
      
      navItems.innerHTML = navigationHTML;
    }
  }
}

// Logout function
function logout() {
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('userEmail');
  localStorage.removeItem('userEmail');
  window.location.href = 'index.html';
}

// Initial load
document.addEventListener('DOMContentLoaded', function() {
  updateNavigation();
  if (propertyContainer) {
    displayProperties(properties);
  }
});
