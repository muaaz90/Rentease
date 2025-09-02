// Owner dashboard functionality

let properties = [];
let ownerProperties = [];

document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in and is an owner
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const userEmail = sessionStorage.getItem('userEmail');
  
  if (!isLoggedIn) {
    window.location.href = 'login.html';
    return;
  }
  
  // Check if user is an owner
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  if (userData.userType !== 'landlord' && userData.userType !== 'both') {
    alert('Access denied. This page is for property owners only.');
    window.location.href = 'dashboard.html';
    return;
  }
  
  // Load properties data
  loadPropertiesData();
  
  // Load owner dashboard data
  loadOwnerDashboardData();
});

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
      address: "123 MG Road, Bangalore, Karnataka 560001",
      ownerEmail: "john@example.com"
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
      address: "456 Hitech City, Hyderabad, Telangana 500081",
      ownerEmail: "rajesh@example.com"
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
      address: "789 Anna Salai, Chennai, Tamil Nadu 600002",
      ownerEmail: "abc@example.com"
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
      address: "321 Bandra West, Mumbai, Maharashtra 400050",
      ownerEmail: "mumbai@example.com"
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
      address: "654 Koregaon Park, Pune, Maharashtra 411001",
      ownerEmail: "pune@example.com"
    }
  ];
}

function loadOwnerDashboardData() {
  const userEmail = sessionStorage.getItem('userEmail');
  document.getElementById('userEmail').textContent = userEmail;
  
  // Filter properties owned by current user
  ownerProperties = properties.filter(property => property.ownerEmail === userEmail);
  
  // Load owner properties
  loadOwnerProperties();
  
  // Load owner bookings
  loadOwnerBookings();
  
  // Load owner profile
  loadOwnerProfile();
  
  // Update stats
  updateOwnerStats();
}

function loadOwnerProperties() {
  const ownerPropertiesList = document.getElementById('ownerPropertiesList');
  
  if (ownerProperties.length === 0) {
    ownerPropertiesList.innerHTML = `
      <div class="text-center py-4">
        <i class="bi bi-building fs-1 text-muted"></i>
        <p class="text-muted mt-2">No properties listed yet</p>
        <a href="add-property.html" class="btn btn-primary">Add Your First Property</a>
      </div>
    `;
    return;
  }
  
  ownerPropertiesList.innerHTML = '';
  ownerProperties.forEach(property => {
    const propertyCard = document.createElement('div');
    propertyCard.className = 'card mb-3';
    
    const availabilityBadge = property.available ? 
      '<span class="badge bg-success">Available</span>' : 
      '<span class="badge bg-danger">Not Available</span>';
    
    propertyCard.innerHTML = `
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
            <p class="card-text">
              <strong>Status:</strong> ${availabilityBadge}
            </p>
          </div>
          <div class="col-md-3 text-end">
            <a href="property-details.html?id=${property.id}" class="btn btn-outline-primary btn-sm mb-2">View Details</a>
            <br>
            <button class="btn btn-outline-success btn-sm mb-2" onclick="editProperty(${property.id})">
              <i class="bi bi-pencil"></i> Edit
            </button>
            <br>
            <button class="btn btn-outline-warning btn-sm" onclick="toggleAvailability(${property.id})">
              <i class="bi bi-toggle-${property.available ? 'on' : 'off'}"></i> 
              ${property.available ? 'Make Unavailable' : 'Make Available'}
            </button>
          </div>
        </div>
      </div>
    `;
    
    ownerPropertiesList.appendChild(propertyCard);
  });
}

function loadOwnerBookings() {
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const userEmail = sessionStorage.getItem('userEmail');
  
  // Filter bookings for properties owned by current user
  const ownerBookings = bookings.filter(booking => {
    const property = properties.find(p => p.id === booking.propertyId);
    return property && property.ownerEmail === userEmail;
  });
  
  const ownerBookingsList = document.getElementById('ownerBookingsList');
  
  if (ownerBookings.length === 0) {
    ownerBookingsList.innerHTML = `
      <div class="text-center py-4">
        <i class="bi bi-calendar-x fs-1 text-muted"></i>
        <p class="text-muted mt-2">No bookings or enquiries yet</p>
      </div>
    `;
    return;
  }
  
  ownerBookingsList.innerHTML = '';
  ownerBookings.forEach(booking => {
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
            <p class="card-text"><strong>From:</strong> ${booking.userEmail}</p>
            ${booking.visitDate ? `<p class="card-text"><strong>Visit Date:</strong> ${formatDate(booking.visitDate)}</p>` : ''}
            ${booking.visitTime ? `<p class="card-text"><strong>Time:</strong> ${booking.visitTime}</p>` : ''}
            ${booking.message ? `<p class="card-text"><strong>Message:</strong> ${booking.message}</p>` : ''}
            <small class="text-muted">Submitted: ${formatDate(booking.createdAt)}</small>
          </div>
          <div class="col-md-4 text-end">
            <p class="card-text text-success fw-bold">${booking.propertyPrice}/month</p>
            <div class="btn-group-vertical w-100">
              ${booking.status === 'pending' ? `
                <button class="btn btn-success btn-sm mb-1" onclick="updateBookingStatus(${booking.id}, 'confirmed')">
                  <i class="bi bi-check"></i> Confirm
                </button>
                <button class="btn btn-danger btn-sm mb-1" onclick="updateBookingStatus(${booking.id}, 'cancelled')">
                  <i class="bi bi-x"></i> Reject
                </button>
              ` : ''}
              <button class="btn btn-outline-primary btn-sm" onclick="contactTenant('${booking.userEmail}')">
                <i class="bi bi-envelope"></i> Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    ownerBookingsList.appendChild(bookingCard);
  });
}

function loadOwnerProfile() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userEmail = sessionStorage.getItem('userEmail');
  
  const ownerProfileInfo = document.getElementById('ownerProfileInfo');
  
  ownerProfileInfo.innerHTML = `
    <div class="row">
      <div class="col-md-6">
        <h6>Personal Information</h6>
        <p><strong>Name:</strong> ${userData.firstName || 'N/A'} ${userData.lastName || 'N/A'}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Phone:</strong> ${userData.phone || 'N/A'}</p>
        <p><strong>User Type:</strong> ${userData.userType || 'N/A'}</p>
      </div>
      <div class="col-md-6">
        <h6>Business Information</h6>
        <p><strong>Properties Listed:</strong> ${ownerProperties.length}</p>
        <p><strong>Available Properties:</strong> ${ownerProperties.filter(p => p.available).length}</p>
        <p><strong>Total Bookings:</strong> ${getOwnerBookingsCount()}</p>
        <p><strong>Member Since:</strong> ${userData.registeredAt ? formatDate(userData.registeredAt) : 'N/A'}</p>
      </div>
    </div>
  `;
}

function updateOwnerStats() {
  const userEmail = sessionStorage.getItem('userEmail');
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  
  // Filter bookings for properties owned by current user
  const ownerBookings = bookings.filter(booking => {
    const property = properties.find(p => p.id === booking.propertyId);
    return property && property.ownerEmail === userEmail;
  });
  
  const totalProperties = ownerProperties.length;
  const availableProperties = ownerProperties.filter(p => p.available).length;
  const pendingBookings = ownerBookings.filter(booking => booking.status === 'pending').length;
  const totalBookings = ownerBookings.length;
  
  document.getElementById('totalProperties').textContent = totalProperties;
  document.getElementById('availableProperties').textContent = availableProperties;
  document.getElementById('pendingBookings').textContent = pendingBookings;
  document.getElementById('totalBookings').textContent = totalBookings;
}

function getOwnerBookingsCount() {
  const userEmail = sessionStorage.getItem('userEmail');
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  
  return bookings.filter(booking => {
    const property = properties.find(p => p.id === booking.propertyId);
    return property && property.ownerEmail === userEmail;
  }).length;
}

function editProperty(propertyId) {
  window.location.href = `add-property.html?edit=${propertyId}`;
}

function toggleAvailability(propertyId) {
  const property = properties.find(p => p.id === propertyId);
  if (property) {
    property.available = !property.available;
    
    // Update in localStorage (in a real app, this would be sent to backend)
    localStorage.setItem('properties', JSON.stringify(properties));
    
    // Reload the properties list
    loadOwnerProperties();
    updateOwnerStats();
    
    alert(`Property ${property.available ? 'made available' : 'made unavailable'} successfully!`);
  }
}

function updateBookingStatus(bookingId, newStatus) {
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  const booking = bookings.find(b => b.id === bookingId);
  
  if (booking) {
    booking.status = newStatus;
    booking.updatedAt = new Date().toISOString();
    
    localStorage.setItem('bookings', JSON.stringify(bookings));
    loadOwnerBookings();
    updateOwnerStats();
    
    alert(`Booking ${newStatus} successfully!`);
  }
}

function contactTenant(tenantEmail) {
  window.location.href = `mailto:${tenantEmail}`;
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
