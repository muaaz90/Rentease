// Admin listings management functionality

let properties = [];
let currentProperty = null;

document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in and is an admin
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const userEmail = sessionStorage.getItem('userEmail');
  
  if (!isLoggedIn) {
    window.location.href = 'login.html';
    return;
  }
  
  // Check if user is an admin
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  if (userData.userType !== 'admin') {
    alert('Access denied. This page is for administrators only.');
    window.location.href = 'dashboard.html';
    return;
  }
  
  // Load properties data
  loadPropertiesData();
  
  // Load listings
  loadListings();
  
  // Setup filters
  setupFilters();
  
  // Setup modals
  setupModals();
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
      ownerEmail: "john@example.com",
      status: "approved",
      submittedAt: "2025-01-15T10:30:00Z"
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
      ownerEmail: "rajesh@example.com",
      status: "pending",
      submittedAt: "2025-01-20T14:15:00Z"
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
      ownerEmail: "abc@example.com",
      status: "approved",
      submittedAt: "2025-01-10T09:45:00Z"
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
      ownerEmail: "mumbai@example.com",
      status: "rejected",
      submittedAt: "2025-01-18T16:20:00Z"
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
      ownerEmail: "pune@example.com",
      status: "approved",
      submittedAt: "2025-01-12T11:30:00Z"
    }
  ];
}

function loadListings() {
  const userEmail = sessionStorage.getItem('userEmail');
  document.getElementById('userEmail').textContent = userEmail;
  
  displayListings(properties);
  updateStats();
}

function displayListings(listingsToShow) {
  const listingsList = document.getElementById('listingsList');
  
  if (listingsToShow.length === 0) {
    listingsList.innerHTML = `
      <div class="text-center py-4">
        <i class="bi bi-building fs-1 text-muted"></i>
        <p class="text-muted mt-2">No listings found</p>
      </div>
    `;
    return;
  }
  
  listingsList.innerHTML = '';
  listingsToShow.forEach(property => {
    const listingCard = document.createElement('div');
    listingCard.className = 'card mb-3';
    
    const statusBadge = getStatusBadge(property.status);
    
    listingCard.innerHTML = `
      <div class="card-body">
        <div class="row">
          <div class="col-md-2">
            <img src="${property.image}" class="img-fluid rounded" alt="${property.title}" style="height: 100px; object-fit: cover;">
          </div>
          <div class="col-md-6">
            <h6 class="card-title">${property.title}</h6>
            <p class="card-text text-muted">
              <i class="bi bi-geo-alt"></i> ${property.location}
            </p>
            <p class="card-text">
              <i class="bi bi-house"></i> ${property.bedrooms} BHK • 
              <i class="bi bi-rulers"></i> ${property.area} •
              <span class="badge bg-secondary">${property.type}</span>
            </p>
            <p class="card-text text-success fw-bold">${property.priceDisplay}/month</p>
            <p class="card-text">
              <strong>Owner:</strong> ${property.owner} (${property.ownerEmail})
            </p>
            <p class="card-text">
              <strong>Status:</strong> ${statusBadge}
            </p>
            <small class="text-muted">Submitted: ${formatDate(property.submittedAt)}</small>
          </div>
          <div class="col-md-4 text-end">
            <div class="btn-group-vertical w-100">
              <button class="btn btn-outline-primary btn-sm mb-1" onclick="viewListing(${property.id})">
                <i class="bi bi-eye"></i> View Details
              </button>
              ${property.status === 'pending' ? `
                <button class="btn btn-success btn-sm mb-1" onclick="approveListing(${property.id})">
                  <i class="bi bi-check"></i> Approve
                </button>
                <button class="btn btn-danger btn-sm mb-1" onclick="rejectListing(${property.id})">
                  <i class="bi bi-x"></i> Reject
                </button>
              ` : ''}
              <button class="btn btn-outline-info btn-sm" onclick="contactOwner('${property.ownerEmail}')">
                <i class="bi bi-envelope"></i> Contact Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    listingsList.appendChild(listingCard);
  });
}

function setupFilters() {
  const statusFilter = document.getElementById('statusFilter');
  const typeFilter = document.getElementById('typeFilter');
  const locationFilter = document.getElementById('locationFilter');
  
  statusFilter.addEventListener('change', filterListings);
  typeFilter.addEventListener('change', filterListings);
  locationFilter.addEventListener('input', filterListings);
}

function filterListings() {
  const statusFilter = document.getElementById('statusFilter').value;
  const typeFilter = document.getElementById('typeFilter').value;
  const locationFilter = document.getElementById('locationFilter').value.toLowerCase();
  
  let filteredListings = properties.filter(property => {
    const matchesStatus = !statusFilter || property.status === statusFilter;
    const matchesType = !typeFilter || property.type === typeFilter;
    const matchesLocation = !locationFilter || property.location.toLowerCase().includes(locationFilter);
    
    return matchesStatus && matchesType && matchesLocation;
  });
  
  displayListings(filteredListings);
}

function clearFilters() {
  document.getElementById('statusFilter').value = '';
  document.getElementById('typeFilter').value = '';
  document.getElementById('locationFilter').value = '';
  displayListings(properties);
}

function viewListing(propertyId) {
  currentProperty = properties.find(p => p.id === propertyId);
  if (currentProperty) {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = currentProperty.title;
    
    const statusBadge = getStatusBadge(currentProperty.status);
    
    modalBody.innerHTML = `
      <div class="row">
        <div class="col-md-4">
          <img src="${currentProperty.image}" class="img-fluid rounded" alt="${currentProperty.title}">
        </div>
        <div class="col-md-8">
          <h6>Property Details</h6>
          <p><strong>Type:</strong> ${currentProperty.type}</p>
          <p><strong>Bedrooms:</strong> ${currentProperty.bedrooms}</p>
          <p><strong>Bathrooms:</strong> ${currentProperty.bathrooms}</p>
          <p><strong>Area:</strong> ${currentProperty.area}</p>
          <p><strong>Location:</strong> ${currentProperty.location}</p>
          <p><strong>Price:</strong> ${currentProperty.priceDisplay}/month</p>
          <p><strong>Status:</strong> ${statusBadge}</p>
          <p><strong>Address:</strong> ${currentProperty.address}</p>
          <p><strong>Description:</strong> ${currentProperty.description}</p>
          <p><strong>Amenities:</strong> ${currentProperty.amenities.join(', ')}</p>
          <hr>
          <h6>Owner Information</h6>
          <p><strong>Name:</strong> ${currentProperty.owner}</p>
          <p><strong>Email:</strong> ${currentProperty.ownerEmail}</p>
          <p><strong>Contact:</strong> ${currentProperty.contact}</p>
          <p><strong>Submitted:</strong> ${formatDate(currentProperty.submittedAt)}</p>
        </div>
      </div>
    `;
    
    // Update modal buttons based on status
    const approveBtn = document.getElementById('approveBtn');
    const rejectBtn = document.getElementById('rejectBtn');
    
    if (currentProperty.status === 'pending') {
      approveBtn.style.display = 'inline-block';
      rejectBtn.style.display = 'inline-block';
      approveBtn.onclick = () => approveListing(propertyId);
      rejectBtn.onclick = () => rejectListing(propertyId);
    } else {
      approveBtn.style.display = 'none';
      rejectBtn.style.display = 'none';
    }
    
    const modal = new bootstrap.Modal(document.getElementById('listingModal'));
    modal.show();
  }
}

function approveListing(propertyId) {
  if (confirm('Are you sure you want to approve this listing?')) {
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      property.status = 'approved';
      property.approvedAt = new Date().toISOString();
      property.approvedBy = sessionStorage.getItem('userEmail');
      
      // Update in localStorage (in a real app, this would be sent to backend)
      localStorage.setItem('properties', JSON.stringify(properties));
      
      // Reload listings
      loadListings();
      
      // Close modal
      const modal = bootstrap.Modal.getInstance(document.getElementById('listingModal'));
      modal.hide();
      
      alert('Listing approved successfully!');
    }
  }
}

function rejectListing(propertyId) {
  currentProperty = properties.find(p => p.id === propertyId);
  if (currentProperty) {
    const modal = new bootstrap.Modal(document.getElementById('rejectionModal'));
    modal.show();
  }
}

function setupModals() {
  document.getElementById('confirmRejectBtn').addEventListener('click', function() {
    const reason = document.getElementById('rejectionReason').value;
    const message = document.getElementById('rejectionMessage').value;
    
    if (!reason) {
      alert('Please select a reason for rejection');
      return;
    }
    
    if (currentProperty) {
      currentProperty.status = 'rejected';
      currentProperty.rejectedAt = new Date().toISOString();
      currentProperty.rejectedBy = sessionStorage.getItem('userEmail');
      currentProperty.rejectionReason = reason;
      currentProperty.rejectionMessage = message;
      
      // Update in localStorage (in a real app, this would be sent to backend)
      localStorage.setItem('properties', JSON.stringify(properties));
      
      // Reload listings
      loadListings();
      
      // Close modals
      const rejectionModal = bootstrap.Modal.getInstance(document.getElementById('rejectionModal'));
      rejectionModal.hide();
      
      const listingModal = bootstrap.Modal.getInstance(document.getElementById('listingModal'));
      if (listingModal) listingModal.hide();
      
      alert('Listing rejected successfully!');
    }
  });
}

function contactOwner(ownerEmail) {
  window.location.href = `mailto:${ownerEmail}`;
}

function updateStats() {
  const pendingCount = properties.filter(p => p.status === 'pending').length;
  const approvedCount = properties.filter(p => p.status === 'approved').length;
  const rejectedCount = properties.filter(p => p.status === 'rejected').length;
  const totalCount = properties.length;
  
  document.getElementById('pendingCount').textContent = pendingCount;
  document.getElementById('approvedCount').textContent = approvedCount;
  document.getElementById('rejectedCount').textContent = rejectedCount;
  document.getElementById('totalCount').textContent = totalCount;
}

function getStatusBadge(status) {
  const badges = {
    'pending': '<span class="badge bg-warning">Pending</span>',
    'approved': '<span class="badge bg-success">Approved</span>',
    'rejected': '<span class="badge bg-danger">Rejected</span>'
  };
  return badges[status] || '<span class="badge bg-secondary">Unknown</span>';
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
