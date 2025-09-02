// Dashboard functionality

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
  
  // Load dashboard data
  loadDashboardData();
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

function loadDashboardData() {
  const userEmail = sessionStorage.getItem('userEmail');
  document.getElementById('userEmail').textContent = userEmail;
  
  // Load bookings
  loadBookings();
  
  // Load wishlist
  loadWishlist();
  
  // Load profile
  loadProfile();
  
  // Update stats
  updateStats();
}

function loadBookings() {
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const userEmail = sessionStorage.getItem('userEmail');
  const userBookings = bookings.filter(booking => booking.userEmail === userEmail);
  
  const bookingsList = document.getElementById('bookingsList');
  
  if (userBookings.length === 0) {
    bookingsList.innerHTML = `
      <div class="text-center py-4">
        <i class="bi bi-calendar-x fs-1 text-muted"></i>
        <p class="text-muted mt-2">No bookings or enquiries yet</p>
        <a href="index.html" class="btn btn-primary">Browse Properties</a>
      </div>
    `;
    return;
  }
  
  bookingsList.innerHTML = '';
  userBookings.forEach(booking => {
    const bookingCard = document.createElement('div');
    bookingCard.className = 'card mb-3';
    
    const statusBadge = getStatusBadge(booking.status);
    const typeBadge = getTypeBadge(booking.type);
    
    bookingCard.innerHTML = `
      <div class="card-body">
        <div class="row">
          <div class="col-md-8">
            <h6 class="card-title">${booking.propertyTitle}</h6>
            <p class="card-text text-muted">
              <i class="bi bi-geo-alt"></i> ${booking.propertyLocation}
            </p>
            <p class="card-text">
              <strong>Type:</strong> ${typeBadge}
              <span class="ms-3"><strong>Status:</strong> ${statusBadge}</span>
            </p>
            ${booking.visitDate ? `<p class="card-text"><strong>Visit Date:</strong> ${formatDate(booking.visitDate)}</p>` : ''}
            ${booking.visitTime ? `<p class="card-text"><strong>Time:</strong> ${booking.visitTime}</p>` : ''}
            ${booking.message ? `<p class="card-text"><strong>Message:</strong> ${booking.message}</p>` : ''}
            <small class="text-muted">Submitted: ${formatDate(booking.createdAt)}</small>
          </div>
          <div class="col-md-4 text-end">
            <p class="card-text text-success fw-bold">${booking.propertyPrice}/month</p>
            <a href="property-details.html?id=${booking.propertyId}" class="btn btn-outline-primary btn-sm">View Property</a>
          </div>
        </div>
      </div>
    `;
    
    bookingsList.appendChild(bookingCard);
  });
}

function loadWishlist() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const wishlistList = document.getElementById('wishlistList');
  
  if (wishlist.length === 0) {
    wishlistList.innerHTML = `
      <div class="text-center py-4">
        <i class="bi bi-heart fs-1 text-muted"></i>
        <p class="text-muted mt-2">No items in wishlist</p>
        <a href="index.html" class="btn btn-primary">Browse Properties</a>
      </div>
    `;
    return;
  }
  
  wishlistList.innerHTML = '';
  wishlist.forEach(propertyId => {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      const wishlistItem = document.createElement('div');
      wishlistItem.className = 'card mb-3';
      
      wishlistItem.innerHTML = `
        <div class="card-body">
          <div class="row">
            <div class="col-md-3">
              <img src="${property.image}" class="img-fluid rounded" alt="${property.title}">
            </div>
            <div class="col-md-6">
              <h6 class="card-title">${property.title}</h6>
              <p class="card-text text-muted">
                <i class="bi bi-geo-alt"></i> ${property.location}
              </p>
              <p class="card-text">
                <i class="bi bi-house"></i> ${property.bedrooms} BHK • 
                <i class="bi bi-rulers"></i> ${property.area}
              </p>
              <p class="card-text text-success fw-bold">${property.priceDisplay}/month</p>
            </div>
            <div class="col-md-3 text-end">
              <a href="property-details.html?id=${property.id}" class="btn btn-primary btn-sm mb-2">View Details</a>
              <br>
              <button class="btn btn-outline-danger btn-sm" onclick="removeFromWishlist(${property.id})">
                <i class="bi bi-heart-fill"></i> Remove
              </button>
            </div>
          </div>
        </div>
      `;
      
      wishlistList.appendChild(wishlistItem);
    }
  });
}

function loadProfile() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userEmail = sessionStorage.getItem('userEmail');
  
  const profileInfo = document.getElementById('profileInfo');
  
  profileInfo.innerHTML = `
    <div class="row">
      <div class="col-md-6">
        <h6>Personal Information</h6>
        <p><strong>Name:</strong> ${userData.firstName || 'N/A'} ${userData.lastName || 'N/A'}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Phone:</strong> ${userData.phone || 'N/A'}</p>
        <p><strong>User Type:</strong> ${userData.userType || 'N/A'}</p>
      </div>
      <div class="col-md-6">
        <h6>Account Information</h6>
        <p><strong>Member Since:</strong> ${userData.registeredAt ? formatDate(userData.registeredAt) : 'N/A'}</p>
        <p><strong>Total Bookings:</strong> ${getUserBookingsCount()}</p>
        <p><strong>Wishlist Items:</strong> ${getWishlistCount()}</p>
      </div>
    </div>
  `;
}

function updateStats() {
  const userEmail = sessionStorage.getItem('userEmail');
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const userBookings = bookings.filter(booking => booking.userEmail === userEmail);
  
  const totalBookings = userBookings.length;
  const pendingBookings = userBookings.filter(booking => booking.status === 'pending').length;
  const confirmedBookings = userBookings.filter(booking => booking.status === 'confirmed').length;
  const wishlistCount = getWishlistCount();
  
  document.getElementById('totalBookings').textContent = totalBookings;
  document.getElementById('pendingBookings').textContent = pendingBookings;
  document.getElementById('confirmedBookings').textContent = confirmedBookings;
  document.getElementById('wishlistCount').textContent = wishlistCount;
}

function getUserBookingsCount() {
  const userEmail = sessionStorage.getItem('userEmail');
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  return bookings.filter(booking => booking.userEmail === userEmail).length;
}

function getWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  return wishlist.length;
}

function removeFromWishlist(propertyId) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const index = wishlist.indexOf(propertyId);
  
  if (index > -1) {
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadWishlist();
    updateStats();
    alert('Removed from wishlist');
  }
}

function getStatusBadge(status) {
  const badges = {
    'pending': '<span class="badge bg-warning">Pending</span>',
    'confirmed': '<span class="badge bg-success">Confirmed</span>',
    'cancelled': '<span class="badge bg-danger">Cancelled</span>',
    'completed': '<span class="badge bg-info">Completed</span>'
  };
  return badges[status] || '<span class="badge bg-secondary">Unknown</span>';
}

function getTypeBadge(type) {
  const badges = {
    'enquiry': '<span class="badge bg-info">Enquiry</span>',
    'visit': '<span class="badge bg-primary">Visit</span>',
    'booking': '<span class="badge bg-success">Booking</span>'
  };
  return badges[type] || '<span class="badge bg-secondary">Unknown</span>';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
