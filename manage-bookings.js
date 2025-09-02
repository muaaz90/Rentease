// Manage Bookings functionality

let properties = [];
let ownerProperties = [];
let ownerBookings = [];
let currentBooking = null;

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
  
  // Load owner bookings
  loadOwnerBookings();
  
  // Setup filters
  setupFilters();
  
  // Setup modal
  setupModal();
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

function loadOwnerBookings() {
  const userEmail = sessionStorage.getItem('userEmail');
  document.getElementById('userEmail').textContent = userEmail;
  
  // Filter properties owned by current user
  ownerProperties = properties.filter(property => property.ownerEmail === userEmail);
  
  // Load bookings for owner's properties
  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  ownerBookings = bookings.filter(booking => {
    const property = properties.find(p => p.id === booking.propertyId);
    return property && property.ownerEmail === userEmail;
  });
  
  // Populate property filter
  populatePropertyFilter();
  
  // Display bookings
  displayBookings(ownerBookings);
  
  // Update stats
  updateStats();
}

function populatePropertyFilter() {
  const propertyFilter = document.getElementById('propertyFilter');
  propertyFilter.innerHTML = '<option value="">All Properties</option>';
  
  ownerProperties.forEach(property => {
    const option = document.createElement('option');
    option.value = property.id;
    option.textContent = property.title;
    propertyFilter.appendChild(option);
  });
}

function displayBookings(bookingsToShow) {
  const bookingsList = document.getElementById('bookingsList');
  
  if (bookingsToShow.length === 0) {
    bookingsList.innerHTML = `
      <div class="text-center py-4">
        <i class="bi bi-calendar-x fs-1 text-muted"></i>
        <p class="text-muted mt-2">No bookings or enquiries found</p>
      </div>
    `;
    return;
  }
  
  bookingsList.innerHTML = '';
  bookingsToShow.forEach(booking => {
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
                <button class="btn btn-success btn-sm mb-1" onclick="respondToBooking(${booking.id}, 'confirmed')">
                  <i class="bi bi-check"></i> Confirm
                </button>
                <button class="btn btn-danger btn-sm mb-1" onclick="respondToBooking(${booking.id}, 'cancelled')">
                  <i class="bi bi-x"></i> Reject
                </button>
              ` : ''}
              <button class="btn btn-outline-primary btn-sm mb-1" onclick="contactTenant('${booking.userEmail}')">
                <i class="bi bi-envelope"></i> Contact
              </button>
              <button class="btn btn-outline-info btn-sm" onclick="viewProperty(${booking.propertyId})">
                <i class="bi bi-eye"></i> View Property
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    bookingsList.appendChild(bookingCard);
  });
}

function setupFilters() {
  const statusFilter = document.getElementById('statusFilter');
  const typeFilter = document.getElementById('typeFilter');
  const propertyFilter = document.getElementById('propertyFilter');
  
  statusFilter.addEventListener('change', filterBookings);
  typeFilter.addEventListener('change', filterBookings);
  propertyFilter.addEventListener('change', filterBookings);
}

function filterBookings() {
  const statusFilter = document.getElementById('statusFilter').value;
  const typeFilter = document.getElementById('typeFilter').value;
  const propertyFilter = document.getElementById('propertyFilter').value;
  
  let filteredBookings = ownerBookings.filter(booking => {
    const matchesStatus = !statusFilter || booking.status === statusFilter;
    const matchesType = !typeFilter || booking.type === typeFilter;
    const matchesProperty = !propertyFilter || booking.propertyId == propertyFilter;
    
    return matchesStatus && matchesType && matchesProperty;
  });
  
  displayBookings(filteredBookings);
}

function clearFilters() {
  document.getElementById('statusFilter').value = '';
  document.getElementById('typeFilter').value = '';
  document.getElementById('propertyFilter').value = '';
  displayBookings(ownerBookings);
}

function respondToBooking(bookingId, newStatus) {
  currentBooking = ownerBookings.find(b => b.id === bookingId);
  if (currentBooking) {
    document.getElementById('responseStatus').value = newStatus;
    document.getElementById('responseMessage').value = '';
    
    const modal = new bootstrap.Modal(document.getElementById('responseModal'));
    modal.show();
  }
}

function setupModal() {
  document.getElementById('submitResponseBtn').addEventListener('click', function() {
    const responseStatus = document.getElementById('responseStatus').value;
    const responseMessage = document.getElementById('responseMessage').value;
    
    if (!responseStatus) {
      alert('Please select a response');
      return;
    }
    
    if (currentBooking) {
      // Update booking status
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const bookingIndex = bookings.findIndex(b => b.id === currentBooking.id);
      
      if (bookingIndex !== -1) {
        bookings[bookingIndex].status = responseStatus;
        bookings[bookingIndex].ownerResponse = responseMessage;
        bookings[bookingIndex].updatedAt = new Date().toISOString();
        
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        // Reload bookings
        loadOwnerBookings();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('responseModal'));
        modal.hide();
        
        alert(`Booking ${responseStatus} successfully!`);
      }
    }
  });
}

function contactTenant(tenantEmail) {
  window.location.href = `mailto:${tenantEmail}`;
}

function viewProperty(propertyId) {
  window.location.href = `property-details.html?id=${propertyId}`;
}

function updateStats() {
  const pendingCount = ownerBookings.filter(b => b.status === 'pending').length;
  const confirmedCount = ownerBookings.filter(b => b.status === 'confirmed').length;
  const cancelledCount = ownerBookings.filter(b => b.status === 'cancelled').length;
  const totalCount = ownerBookings.length;
  
  document.getElementById('pendingCount').textContent = pendingCount;
  document.getElementById('confirmedCount').textContent = confirmedCount;
  document.getElementById('cancelledCount').textContent = cancelledCount;
  document.getElementById('totalCount').textContent = totalCount;
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
