// Add/Edit Property functionality

let properties = [];
let isEditMode = false;
let editPropertyId = null;

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
  
  // Check if we're in edit mode
  const urlParams = new URLSearchParams(window.location.search);
  const editId = urlParams.get('edit');
  
  if (editId) {
    isEditMode = true;
    editPropertyId = parseInt(editId);
    loadPropertyForEdit(editPropertyId);
  }
  
  // Setup form
  setupPropertyForm();
  
  // Initialize photo inputs
  initializePhotoInputs();
});

// Photo management functions
function addPhotoInput() {
  const photoInputs = document.getElementById('photoInputs');
  const currentInputs = photoInputs.querySelectorAll('.photo-input');
  
  if (currentInputs.length >= 4) {
    alert('Maximum 4 additional photos allowed (5 total including main image)');
    return;
  }
  
  const inputGroup = document.createElement('div');
  inputGroup.className = 'input-group mb-2';
  inputGroup.innerHTML = `
    <input type="url" class="form-control photo-input" placeholder="https://example.com/photo${currentInputs.length + 2}.jpg">
    <button type="button" class="btn btn-outline-danger" onclick="removePhotoInput(this)">
      <i class="bi bi-trash"></i>
    </button>
  `;
  
  photoInputs.appendChild(inputGroup);
  updateAddPhotoButton();
}

function removePhotoInput(button) {
  const inputGroup = button.closest('.input-group');
  inputGroup.remove();
  updateAddPhotoButton();
}

function updateAddPhotoButton() {
  const photoInputs = document.getElementById('photoInputs');
  const currentInputs = photoInputs.querySelectorAll('.photo-input');
  const addButton = document.querySelector('button[onclick="addPhotoInput()"]');
  
  if (currentInputs.length >= 4) {
    addButton.disabled = true;
    addButton.textContent = 'Maximum photos reached';
  } else {
    addButton.disabled = false;
    addButton.innerHTML = '<i class="bi bi-plus"></i> Add Photo';
  }
}

function initializePhotoInputs() {
  updateAddPhotoButton();
}

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

function loadPropertyForEdit(propertyId) {
  const property = properties.find(p => p.id === propertyId);
  const userEmail = sessionStorage.getItem('userEmail');
  
  if (!property) {
    alert('Property not found');
    window.location.href = 'owner-dashboard.html';
    return;
  }
  
  // Check if user owns this property
  if (property.ownerEmail !== userEmail) {
    alert('Access denied. You can only edit your own properties.');
    window.location.href = 'owner-dashboard.html';
    return;
  }
  
  // Update form title
  document.getElementById('formTitle').textContent = 'Edit Property';
  document.getElementById('submitText').textContent = 'Update Property';
  
  // Fill form with property data
  document.getElementById('title').value = property.title;
  document.getElementById('type').value = property.type;
  document.getElementById('bedrooms').value = property.bedrooms;
  document.getElementById('bathrooms').value = property.bathrooms;
  document.getElementById('area').value = property.area;
  document.getElementById('location').value = property.location;
  document.getElementById('price').value = property.price;
  document.getElementById('address').value = property.address;
  document.getElementById('description').value = property.description;
  document.getElementById('image').value = property.image;
  document.getElementById('owner').value = property.owner;
  document.getElementById('contact').value = property.contact;
  document.getElementById('available').checked = property.available;
  
  // Set amenities checkboxes
  const amenityCheckboxes = document.querySelectorAll('input[name="amenities"]');
  amenityCheckboxes.forEach(checkbox => {
    checkbox.checked = property.amenities.includes(checkbox.value);
  });
}

function setupPropertyForm() {
  const propertyForm = document.getElementById('propertyForm');
  
  propertyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(propertyForm);
    const amenities = Array.from(document.querySelectorAll('input[name="amenities"]:checked')).map(cb => cb.value);
    
    // Collect additional photos
    const photoInputs = document.querySelectorAll('.photo-input');
    const additionalPhotos = Array.from(photoInputs)
      .map(input => input.value.trim())
      .filter(url => url !== '');
    
    const mainImage = formData.get('image') || 'https://via.placeholder.com/400x200';
    const allPhotos = [mainImage, ...additionalPhotos];
    
    const propertyData = {
      title: formData.get('title'),
      type: formData.get('type'),
      bedrooms: parseInt(formData.get('bedrooms')),
      bathrooms: parseInt(formData.get('bathrooms')),
      area: formData.get('area') + ' sq ft',
      location: formData.get('location'),
      price: parseInt(formData.get('price')),
      priceDisplay: '₹' + parseInt(formData.get('price')).toLocaleString(),
      address: formData.get('address'),
      description: formData.get('description'),
      image: mainImage,
      photos: allPhotos,
      amenities: amenities,
      owner: formData.get('owner'),
      contact: formData.get('contact'),
      available: formData.get('available') === 'on',
      ownerEmail: sessionStorage.getItem('userEmail')
    };
    
    // Validate required fields
    if (!propertyData.title || !propertyData.type || !propertyData.location || !propertyData.price) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Validate photos (minimum 1, maximum 5)
    if (allPhotos.length < 1) {
      alert('Please add at least 1 photo for your property');
      return;
    }
    
    if (allPhotos.length > 5) {
      alert('Maximum 5 photos allowed per property');
      return;
    }
    
    // Validate photo URLs
    const invalidPhotos = allPhotos.filter(url => {
      try {
        new URL(url);
        return false;
      } catch {
        return true;
      }
    });
    
    if (invalidPhotos.length > 0) {
      alert('Please provide valid URLs for all photos');
      return;
    }
    
    if (isEditMode) {
      // Update existing property
      const propertyIndex = properties.findIndex(p => p.id === editPropertyId);
      if (propertyIndex !== -1) {
        properties[propertyIndex] = { ...properties[propertyIndex], ...propertyData };
        alert('Property updated successfully!');
      }
    } else {
      // Add new property
      const newId = Math.max(...properties.map(p => p.id)) + 1;
      propertyData.id = newId;
      properties.push(propertyData);
      alert('Property added successfully!');
    }
    
    // Save to localStorage (in a real app, this would be sent to backend)
    localStorage.setItem('properties', JSON.stringify(properties));
    
    // Redirect to owner dashboard
    window.location.href = 'owner-dashboard.html';
  });
}
