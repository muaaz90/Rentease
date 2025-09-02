// Admin dashboard functionality

let properties = [];
let users = [];
let bookings = [];

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
  
  // Load data
  loadPropertiesData();
  loadUsersData();
  loadBookingsData();
  
  // Load admin dashboard
  loadAdminDashboard();
  
  // Initialize charts
  initializeCharts();
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

function loadUsersData() {
  users = [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      email: "john@example.com",
      phone: "+91 98765 43210",
      userType: "landlord",
      status: "active",
      registeredAt: "2025-01-01T10:00:00Z",
      lastLogin: "2025-01-20T15:30:00Z"
    },
    {
      id: 2,
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice@example.com",
      phone: "+91 87654 32109",
      userType: "tenant",
      status: "active",
      registeredAt: "2025-01-05T14:20:00Z",
      lastLogin: "2025-01-19T09:15:00Z"
    },
    {
      id: 3,
      firstName: "Bob",
      lastName: "Wilson",
      email: "bob@example.com",
      phone: "+91 76543 21098",
      userType: "both",
      status: "active",
      registeredAt: "2025-01-08T16:45:00Z",
      lastLogin: "2025-01-18T12:00:00Z"
    },
    {
      id: 4,
      firstName: "Admin",
      lastName: "User",
      email: "admin@rentease.com",
      phone: "+91 99999 99999",
      userType: "admin",
      status: "active",
      registeredAt: "2025-01-01T00:00:00Z",
      lastLogin: "2025-01-20T16:00:00Z"
    }
  ];
}

function loadBookingsData() {
  bookings = [
    {
      id: 1,
      propertyId: 1,
      propertyTitle: "2BHK Apartment",
      userEmail: "alice@example.com",
      type: "visit",
      status: "confirmed",
      visitDate: "2025-01-25",
      visitTime: "10:00 AM",
      message: "Interested in viewing the property",
      createdAt: "2025-01-20T10:00:00Z"
    },
    {
      id: 2,
      propertyId: 2,
      propertyTitle: "PG for Boys",
      userEmail: "bob@example.com",
      type: "enquiry",
      status: "pending",
      message: "Is the PG available for immediate move-in?",
      createdAt: "2025-01-19T15:30:00Z"
    },
    {
      id: 3,
      propertyId: 3,
      propertyTitle: "Commercial Store",
      userEmail: "alice@example.com",
      type: "booking",
      status: "confirmed",
      visitDate: "2025-01-22",
      visitTime: "2:00 PM",
      message: "Looking for commercial space for my business",
      createdAt: "2025-01-18T11:20:00Z"
    }
  ];
}

function loadAdminDashboard() {
  const userEmail = sessionStorage.getItem('userEmail');
  document.getElementById('userEmail').textContent = userEmail;
  
  // Update stats
  updateStats();
  
  // Load recent activity
  loadRecentActivity();
}

function updateStats() {
  const totalUsers = users.length;
  const totalProperties = properties.length;
  const pendingListings = properties.filter(p => p.status === 'pending').length;
  const totalBookings = bookings.length;
  
  document.getElementById('totalUsers').textContent = totalUsers;
  document.getElementById('totalProperties').textContent = totalProperties;
  document.getElementById('pendingListings').textContent = pendingListings;
  document.getElementById('totalBookings').textContent = totalBookings;
}

function loadRecentActivity() {
  const recentActivity = document.getElementById('recentActivity');
  
  // Combine recent activities from different sources
  const activities = [];
  
  // Add recent property submissions
  properties.forEach(property => {
    activities.push({
      type: 'property',
      action: property.status === 'pending' ? 'submitted' : property.status,
      title: property.title,
      user: property.owner,
      time: property.submittedAt,
      icon: 'bi-building'
    });
  });
  
  // Add recent user registrations
  users.forEach(user => {
    activities.push({
      type: 'user',
      action: 'registered',
      title: `${user.firstName} ${user.lastName}`,
      user: user.email,
      time: user.registeredAt,
      icon: 'bi-person-plus'
    });
  });
  
  // Add recent bookings
  bookings.forEach(booking => {
    activities.push({
      type: 'booking',
      action: booking.status,
      title: booking.propertyTitle,
      user: booking.userEmail,
      time: booking.createdAt,
      icon: 'bi-calendar-check'
    });
  });
  
  // Sort by time (most recent first)
  activities.sort((a, b) => new Date(b.time) - new Date(a.time));
  
  // Display recent activities
  if (activities.length === 0) {
    recentActivity.innerHTML = `
      <div class="text-center py-4">
        <i class="bi bi-activity fs-1 text-muted"></i>
        <p class="text-muted mt-2">No recent activity</p>
      </div>
    `;
    return;
  }
  
  recentActivity.innerHTML = '';
  activities.slice(0, 10).forEach(activity => {
    const activityItem = document.createElement('div');
    activityItem.className = 'd-flex align-items-center mb-3 p-3 border rounded';
    
    const statusBadge = getActivityBadge(activity.action);
    
    activityItem.innerHTML = `
      <div class="flex-shrink-0 me-3">
        <i class="bi ${activity.icon} fs-4 text-primary"></i>
      </div>
      <div class="flex-grow-1">
        <h6 class="mb-1">${activity.title}</h6>
        <p class="mb-1 text-muted small">${activity.user}</p>
        <small class="text-muted">${formatDate(activity.time)}</small>
      </div>
      <div class="flex-shrink-0">
        ${statusBadge}
      </div>
    `;
    
    recentActivity.appendChild(activityItem);
  });
}

function getActivityBadge(action) {
  const badges = {
    'submitted': '<span class="badge bg-warning">Submitted</span>',
    'approved': '<span class="badge bg-success">Approved</span>',
    'rejected': '<span class="badge bg-danger">Rejected</span>',
    'registered': '<span class="badge bg-info">Registered</span>',
    'pending': '<span class="badge bg-warning">Pending</span>',
    'confirmed': '<span class="badge bg-success">Confirmed</span>',
    'cancelled': '<span class="badge bg-danger">Cancelled</span>'
  };
  return badges[action] || '<span class="badge bg-secondary">Unknown</span>';
}

function initializeCharts() {
  // User Registration Chart
  const userCtx = document.getElementById('userChart').getContext('2d');
  new Chart(userCtx, {
    type: 'line',
    data: {
      labels: ['Jan 1', 'Jan 5', 'Jan 8', 'Jan 12', 'Jan 15', 'Jan 18', 'Jan 20'],
      datasets: [{
        label: 'New Users',
        data: [1, 2, 3, 3, 4, 4, 4],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  
  // Property Types Chart
  const propertyCtx = document.getElementById('propertyChart').getContext('2d');
  const propertyTypes = {};
  properties.forEach(property => {
    propertyTypes[property.type] = (propertyTypes[property.type] || 0) + 1;
  });
  
  new Chart(propertyCtx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(propertyTypes),
      datasets: [{
        data: Object.values(propertyTypes),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
