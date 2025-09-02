// Manage Properties functionality

let properties = [];
let ownerProperties = [];
let currentProperty = null;

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
  
  // Load owner properties
  loadOwnerProperties();
  
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

function loadOwnerProperties() {
  const userEmail = sessionStorage.getItem('userEmail');
  document.getElementById('userEmail').textContent = userEmail;
  
  // Filter properties owned by current user
  ownerProperties = properties.filter(property => property.ownerEmail === userEmail);
  
  displayProperties(ownerProperties);
}

function displayProperties(propertiesToShow) {
  const propertiesList = document.getElementById('propertiesList');
  
  if (propertiesToShow.length === 0) {
    propertiesList.innerHTML = `
      <div class="text-center py-4">
        <i class="bi bi-building fs-1 text-muted"></i>
        <p class="text-muted mt-2">No properties found</p>
        <a href="add-property.html" class="btn btn-primary">Add Your First Property</a>
      </div>
    `;
    return;
  }
  
  propertiesList.innerHTML = '';
  propertiesToShow.forEach(property => {
    const propertyCard = document.createElement('div');
    propertyCard.className = 'card mb-3';
    
    const availabilityBadge = property.available ? 
      '<span class="badge bg-success">Available</span>' : 
      '<span class="badge bg-danger">Not Available</span>';
    
    propertyCard.innerHTML = `
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
              <strong>Status:</strong> ${availabilityBadge}
            </p>
          </div>
          <div class="col-md-4 text-end">
            <div class="btn-group-vertical w-100">
              <button class="btn btn-outline-primary btn-sm mb-1" onclick="viewProperty(${property.id})">
                <i class="bi bi-eye"></i> View Details
              </button>
              <button class="btn btn-outline-success btn-sm mb-1" onclick="editProperty(${property.id})">
                <i class="bi bi-pencil"></i> Edit
              </button>
              <button class="btn btn-outline-warning btn-sm mb-1" onclick="toggleAvailability(${property.id})">
                <i class="bi bi-toggle-${property.available ? 'on' : 'off'}"></i> 
                ${property.available ? 'Make Unavailable' : 'Make Available'}
              </button>
              <button class="btn btn-outline-danger btn-sm" onclick="deleteProperty(${property.id})">
                <i class="bi bi-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    propertiesList.appendChild(propertyCard);
  });
}

function setupFilters() {
  const statusFilter = document.getElementById('statusFilter');
  const typeFilter = document.getElementById('typeFilter');
  const locationFilter = document.getElementById('locationFilter');
  
  statusFilter.addEventListener('change', filterProperties);
  typeFilter.addEventListener('change', filterProperties);
  locationFilter.addEventListener('input', filterProperties);
}

function filterProperties() {
  const statusFilter = document.getElementById('statusFilter').value;
  const typeFilter = document.getElementById('typeFilter').value;
  const locationFilter = document.getElementById('locationFilter').value.toLowerCase();
  
  let filteredProperties = ownerProperties.filter(property => {
    const matchesStatus = !statusFilter || 
      (statusFilter === 'available' && property.available) ||
      (statusFilter === 'unavailable' && !property.available);
    
    const matchesType = !typeFilter || property.type === typeFilter;
    const matchesLocation = !locationFilter || property.location.toLowerCase().includes(locationFilter);
    
    return matchesStatus && matchesType && matchesLocation;
  });
  
  displayProperties(filteredProperties);
}

function clearFilters() {
  document.getElementById('statusFilter').value = '';
  document.getElementById('typeFilter').value = '';
  document.getElementById('locationFilter').value = '';
  displayProperties(ownerProperties);
}

function viewProperty(propertyId) {
  currentProperty = properties.find(p => p.id === propertyId);
  if (currentProperty) {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = currentProperty.title;
    
    const availabilityBadge = currentProperty.available ? 
      '<span class="badge bg-success">Available</span>' : 
      '<span class="badge bg-danger">Not Available</span>';
    
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
          <p><strong>Status:</strong> ${availabilityBadge}</p>
          <p><strong>Address:</strong> ${currentProperty.address}</p>
          <p><strong>Description:</strong> ${currentProperty.description}</p>
          <p><strong>Amenities:</strong> ${currentProperty.amenities.join(', ')}</p>
        </div>
      </div>
    `;
    
    document.getElementById('editPropertyBtn').onclick = () => editProperty(propertyId);
    
    const modal = new bootstrap.Modal(document.getElementById('propertyModal'));
    modal.show();
  }
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
    
    alert(`Property ${property.available ? 'made available' : 'made unavailable'} successfully!`);
  }
}

function deleteProperty(propertyId) {
  if (confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
    const propertyIndex = properties.findIndex(p => p.id === propertyId);
    if (propertyIndex !== -1) {
      properties.splice(propertyIndex, 1);
      
      // Update in localStorage (in a real app, this would be sent to backend)
      localStorage.setItem('properties', JSON.stringify(properties));
      
      // Reload the properties list
      loadOwnerProperties();
      
      alert('Property deleted successfully!');
    }
  }
}

function setupModal() {
  // Modal setup is handled in viewProperty function
}
