// Wishlist page functionality

// Import properties array from script.js
// Since we can't directly import, we'll define it here or access it from localStorage
let properties = [];

document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    window.location.href = 'login.html';
    return;
  }
  
  // Load properties data
  loadPropertiesData();
  
  // Load wishlist
  loadWishlist();
});

// Load properties data (same as in script.js)
function loadPropertiesData() {
  properties = [
    { 
      id: 1,
      title: "2BHK Apartment", 
      location: "Bangalore", 
      price: 15000, 
      priceDisplay: "₹15,000",
      image: "https://via.placeholder.com/400x200",
      photos: [
        "https://via.placeholder.com/400x200",
        "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Living+Room",
        "https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Bedroom+1",
        "https://via.placeholder.com/400x300/FF9800/FFFFFF?text=Kitchen"
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
        "https://via.placeholder.com/400x200",
        "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Room+1",
        "https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Common+Area"
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
        "https://via.placeholder.com/400x200",
        "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Store+Front",
        "https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Interior+1",
        "https://via.placeholder.com/400x300/FF9800/FFFFFF?text=Interior+2"
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
        "https://via.placeholder.com/400x200",
        "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Studio+View",
        "https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Kitchen+Area"
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
        "https://via.placeholder.com/400x200",
        "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Villa+Exterior",
        "https://via.placeholder.com/400x300/2196F3/FFFFFF?text=Living+Room",
        "https://via.placeholder.com/400x300/FF9800/FFFFFF?text=Garden+Area",
        "https://via.placeholder.com/400x300/9C27B0/FFFFFF?text=Master+Bedroom"
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
}

function loadWishlist() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const wishlistContainer = document.getElementById('wishlistContainer');
  
  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = `
      <div class="col-12">
        <div class="text-center py-5">
          <i class="bi bi-heart fs-1 text-muted" style="color: #6c757d !important;"></i>
          <h3 class="mt-3 text-muted">Your wishlist is empty</h3>
          <p class="text-muted">Start exploring properties and add them to your wishlist</p>
          <a href="index.html" class="btn btn-primary">Browse Properties</a>
        </div>
      </div>
    `;
    return;
  }
  
  wishlistContainer.innerHTML = '';
  wishlist.forEach(propertyId => {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      const availabilityBadge = property.available ? 
        '<span class="badge bg-success">Available</span>' : 
        '<span class="badge bg-danger">Not Available</span>';
      
      const wishlistItem = document.createElement('div');
      wishlistItem.className = 'col-md-4 mb-4';
      
      wishlistItem.innerHTML = `
        <div class="card property-card h-100">
          <img src="${property.image}" class="card-img-top" alt="${property.title}">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="card-title">${property.title}</h5>
              ${availabilityBadge}
            </div>
            <p class="card-text text-muted">
              <i class="bi bi-geo-alt"></i> ${property.location}
            </p>
            <div class="mb-2">
              <small class="text-muted">
                <i class="bi bi-house"></i> ${property.bedrooms} BHK • 
                <i class="bi bi-rulers"></i> ${property.area}
              </small>
            </div>
            <p class="card-text text-success fw-bold fs-5">${property.priceDisplay}/month</p>
            <p class="card-text text-muted small">${property.description.substring(0, 100)}...</p>
            <div class="mt-auto">
              <div class="d-flex gap-2">
                <a href="property-details.html?id=${property.id}" class="btn btn-primary flex-fill">View Details</a>
                <button class="btn btn-outline-danger" onclick="removeFromWishlist(${property.id})" title="Remove from Wishlist">
                  <i class="bi bi-heart-fill" style="color: #dc3545;"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      
      wishlistContainer.appendChild(wishlistItem);
    }
  });
}

function removeFromWishlist(propertyId) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const index = wishlist.indexOf(propertyId);
  
  if (index > -1) {
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadWishlist();
    alert('Removed from wishlist');
  }
}
