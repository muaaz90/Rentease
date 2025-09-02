// Property details page functionality

let currentProperty = null;
let properties = [];

// Load property details when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Load properties data first
  loadPropertiesData();
  
  const urlParams = new URLSearchParams(window.location.search);
  const propertyId = parseInt(urlParams.get('id'));
  
  if (propertyId) {
    loadPropertyDetails(propertyId);
  } else {
    // Redirect to home if no property ID
    window.location.href = 'index.html';
  }
  
  // Setup booking form
  setupBookingForm();
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
      image: "s.png",
      photos: [
        "s.png",
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
      image: "s1.jpeg",
      photos: [
        "s1.jpeg",
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
      image: "s2.jpeg",
      photos: [
        "s2.jpeg",
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
      image: "s.png",
      photos: [
        "s.png",
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

// Load property details
function loadPropertyDetails(propertyId) {
  // Find property from the properties array (imported from script.js)
  currentProperty = properties.find(p => p.id === propertyId);
  
  if (!currentProperty) {
    alert('Property not found');
    window.location.href = 'index.html';
    return;
  }
  
  // Populate property details
  document.getElementById('propertyTitle').textContent = currentProperty.title;
  document.getElementById('propertyLocation').textContent = currentProperty.location;
  document.getElementById('propertyBedrooms').textContent = currentProperty.bedrooms;
  document.getElementById('propertyArea').textContent = currentProperty.area;
  document.getElementById('propertyOwner').textContent = currentProperty.owner;
  document.getElementById('propertyContact').textContent = currentProperty.contact;
  document.getElementById('propertyPrice').textContent = currentProperty.priceDisplay;
  document.getElementById('propertyDescription').textContent = currentProperty.description;
  document.getElementById('propertyAddress').textContent = currentProperty.address;
  
  // Handle property images
  displayPropertyImages(currentProperty);
  
  // Set availability badge
  const availabilityBadge = document.getElementById('availabilityBadge');
  if (currentProperty.available) {
    availabilityBadge.textContent = 'Available';
    availabilityBadge.className = 'badge bg-success fs-6';
  } else {
    availabilityBadge.textContent = 'Not Available';
    availabilityBadge.className = 'badge bg-danger fs-6';
  }
  
  // Populate amenities
  const amenitiesList = document.getElementById('amenitiesList');
  amenitiesList.innerHTML = '';
  currentProperty.amenities.forEach(amenity => {
    const amenityItem = document.createElement('div');
    amenityItem.className = 'col-md-6';
    amenityItem.innerHTML = `
      <div class="d-flex align-items-center">
        <i class="bi bi-check-circle-fill text-success me-2"></i>
        <span>${amenity}</span>
      </div>
    `;
    amenitiesList.appendChild(amenityItem);
  });
  
  // Update page title
  document.title = `${currentProperty.title} - RentEase`;
}

// Setup booking form
function setupBookingForm() {
  const bookingForm = document.getElementById('bookingForm');
  
  bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      alert('Please login to book or enquire about properties');
      window.location.href = 'login.html';
      return;
    }
    
    const bookingType = document.getElementById('bookingType').value;
    const visitDate = document.getElementById('visitDate').value;
    const visitTime = document.getElementById('visitTime').value;
    const message = document.getElementById('message').value;
    
    if (!bookingType) {
      alert('Please select the type of request');
      return;
    }
    
    // Create booking object
    const booking = {
      id: Date.now(),
      propertyId: currentProperty.id,
      propertyTitle: currentProperty.title,
      propertyLocation: currentProperty.location,
      propertyPrice: currentProperty.priceDisplay,
      type: bookingType,
      visitDate: visitDate,
      visitTime: visitTime,
      message: message,
      status: 'pending',
      createdAt: new Date().toISOString(),
      userEmail: sessionStorage.getItem('userEmail')
    };
    
    // Save booking to localStorage
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    // Show success message
    alert('Your request has been submitted successfully! We will contact you soon.');
    
    // Reset form
    bookingForm.reset();
  });
}

// Toggle wishlist
function toggleWishlist() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    alert('Please login to add properties to wishlist');
    window.location.href = 'login.html';
    return;
  }
  
  let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const index = wishlist.indexOf(currentProperty.id);
  
  if (index > -1) {
    wishlist.splice(index, 1);
    alert('Removed from wishlist');
  } else {
    wishlist.push(currentProperty.id);
    alert('Added to wishlist');
  }
  
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Display property images with gallery functionality
function displayPropertyImages(property) {
  const mainImage = document.getElementById('propertyImage');
  const thumbnailsContainer = document.getElementById('propertyThumbnails');
  
  // Set main image
  const images = property.photos && property.photos.length > 0 ? property.photos : [property.image];
  mainImage.src = images[0];
  mainImage.alt = property.title;
  
  // Show thumbnails if there are multiple images
  if (images.length > 1) {
    thumbnailsContainer.style.display = 'block';
    thumbnailsContainer.innerHTML = '';
    
    images.forEach((imageUrl, index) => {
      const thumbnail = document.createElement('img');
      thumbnail.src = imageUrl;
      thumbnail.alt = `${property.title} - Image ${index + 1}`;
      thumbnail.className = 'img-thumbnail me-2 mb-2';
      thumbnail.style.width = '80px';
      thumbnail.style.height = '60px';
      thumbnail.style.objectFit = 'cover';
      thumbnail.style.cursor = 'pointer';
      thumbnail.style.border = index === 0 ? '3px solid #007bff' : '1px solid #dee2e6';
      
      thumbnail.addEventListener('click', function() {
        // Update main image
        mainImage.src = imageUrl;
        
        // Update thumbnail borders
        thumbnailsContainer.querySelectorAll('img').forEach((img, i) => {
          img.style.border = i === index ? '3px solid #007bff' : '1px solid #dee2e6';
        });
      });
      
      thumbnailsContainer.appendChild(thumbnail);
    });
  } else {
    thumbnailsContainer.style.display = 'none';
  }
}
