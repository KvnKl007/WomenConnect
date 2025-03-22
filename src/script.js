document.addEventListener('DOMContentLoaded', function() {
    // Password toggle functionality
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            
            // Toggle icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Menu toggle functionality
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuBtn && closeMenuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.warn('One or more mobile menu elements not found');
    }
});

// ajax for dynamic content rendering

// eventCards
$(document).ready(function() {
  $.ajax({
    url: 'http://localhost:3000/events',
    method: 'GET',
    success: function(data) {
      // Filter events by category
      const todayEvents = data.filter(event => event.category === 'today');
      const thisWeekEvents = data.filter(event => event.category === 'this-week');
      const upcomingEvents = data.filter(event => event.category === 'upcoming');

      // Function to create event cards
      function createEventCard(event) {
        return `
          <div class="event-card">
            <div class="event-image">
              <img src="${event.image}" alt="${event.title}" />
              <span class="event-timing">${event.timing}</span>
            </div>
            <div class="event-content">
              <h3>${event.title}</h3>
              <p class="event-location">
                <i class="fa-solid fa-location-dot"></i>
                ${event.location}
              </p>
              <p class="event-description">${event.description}</p>
              <button class="register-btn">Register Now</button>
            </div>
          </div>
        `;
      }

      // Append today's events to the "Happening Today" section
      const todayGrid = $('#today-events-grid');
      todayEvents.forEach(event => {
        todayGrid.append(createEventCard(event));
      });

      // Append this week's events to the "This Week" section
      const thisWeekGrid = $('#this-week-events-grid');
      thisWeekEvents.forEach(event => {
        thisWeekGrid.append(createEventCard(event));
      });

      // Append upcoming events to the "Upcoming Events" section
      const upcomingGrid = $('#upcoming-events-grid');
      upcomingEvents.forEach(event => {
        upcomingGrid.append(createEventCard(event));
      });
    },
    error: function(error) {
      console.error('Error fetching events:', error);
    }
  });
});

// Stories
$(document).ready(function() {
    $.ajax({
      url: 'http://localhost:3000/stories',
      method: 'GET',
      success: function(data) {
        const storyContainer = $('#story-container');
        data.forEach(story => {
          const storyCard = `
            <div class="story-card">
              <div class="top-cont">
                <h3>${story.title}</h3>
                <p>${story.content}</p>
              </div>
              <div class="image">
                <img src="${story.image}" alt="${story.title}" />
              </div>
              <div class="bottom-cont">
                <div class="flex">
                  <b>${story.postedTime}</b>
                  <p>By ${story.author} | ${story.readTime}</p>
                </div>
                <div class="divider"></div>
                <div class="icons">
                  <div class="like">
                    <i class="fa-solid fa-heart"></i>
                    <p>${story.likes}</p>
                  </div>
                  <div class="share">
                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                    <p>${story.shares}</p>
                  </div>
                  <div class="save">
                    <i class="fa-regular fa-bookmark"></i>
                    <p>${story.saves}</p>
                  </div>
                </div>
              </div>
            </div>
          `;
          storyContainer.append(storyCard);
        });
      },
      error: function(error) {
        console.error('Error fetching stories:', error);
      }
    });
  });

// Forum
$(document).ready(function() {
    // Fetch forum categories
    $.ajax({
      url: 'http://localhost:3000/forumCategories',
      method: 'GET',
      success: function(data) {
        const forumCategories = $('#forum-categories');
        data.forEach(category => {
          const categoryCard = `
            <div class="category-card">
              <i class="fa-solid ${category.icon}"></i>
              <h3>${category.name}</h3>
              <p>${category.topics} topics · ${category.posts} posts</p>
            </div>
          `;
          forumCategories.append(categoryCard);
        });
      },
      error: function(error) {
        console.error('Error fetching forum categories:', error);
      }
    });
  
    // Fetch recent discussions
    $.ajax({
      url: 'http://localhost:3000/discussions',
      method: 'GET',
      success: function(data) {
        const discussionList = $('#discussion-list');
        data.forEach(discussion => {
          const discussionCard = `
            <div class="discussion-card">
              <div class="discussion-avatar">
                <i class="fa-solid fa-user"></i>
              </div>
              <div class="discussion-content">
                <h3>${discussion.title}</h3>
                <p>Started by ${discussion.author} · ${discussion.time} · ${discussion.replies} replies</p>
              </div>
              <div class="discussion-stats">
                <span><i class="fa-solid fa-comment"></i> ${discussion.replies}</span>
                <span><i class="fa-solid fa-eye"></i> ${discussion.views}</span>
              </div>
            </div>
          `;
          discussionList.append(discussionCard);
        });
      },
      error: function(error) {
        console.error('Error fetching discussions:', error);
      }
    });
  });


// User registration 
$(document).ready(function() {
  $('#register-form').submit(function(event) {
    console.log("event is stopped");
    event.preventDefault(); // Prevent form submission

    // Get form data
    const name = $('#name').val();
    const email = $('#email').val();
    const password = $('#password').val();

    console.log('Form data:', { name, email, password }); // Debug form data

    // Fetch existing users from JSON Server
    $.ajax({
      url: 'http://localhost:3000/users',
      method: 'GET',
      success: function(users) {
        console.log('Existing users:', users); // Debug existing users

        // Check if the email already exists
        const userExists = users.some(u => u.email === email);
        console.log('User exists:', userExists); // Debug user existence check

        if (userExists) {
          alert('User with this email already exists. Please use a different email.');
          return; // Stop further execution
        }

        // Generate the next sequential ID
        const lastUserId = users.length > 0 ? users[users.length - 1].id : 0;
        const newUserId = lastUserId + 1;

        // Create user object
        const user = {
          id: newUserId,
          name: name,
          email: email,
          password: password
        };

        console.log('User object:', user); // Debug user object

        // Save user to JSON Server
        console.log('Making AJAX request to register user...'); // Debug before AJAX request
        $.ajax({
          url: 'http://localhost:3000/users',
          method: 'POST',
          contentType: 'application/json', // Set the Content-Type header
          data: JSON.stringify(user), // Convert the user object to JSON
          success: function(data) {
            console.log('Registration successful:', data); // Debug success response

            // Store user session in localStorage
            localStorage.setItem('userSession', JSON.stringify({
              id: data.id,
              name: data.name,
              email: data.email
            }));

            // Update profile section dynamically
            updateProfileSection(data);

            // Redirect to home page (if needed)
            console.log('Redirecting to home page...'); // Debug redirection
            window.location.href = '/src/pages/home.html';
          },
          error: function(error) {
            console.error('Error registering user:', error); // Debug error response
            alert('Registration failed. Please try again.');
          }
        });
      },
      error: function(error) {
        console.error('Error fetching users:', error); // Debug error response
        alert('Error fetching users. Please try again.');
      }
    });
    return false;
  });
});

// login handling
$(document).ready(function() {
  $('#login-form').submit(function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const email = $('#email').val();
    const password = $('#password').val();

    // Fetch existing users from JSON Server
    $.ajax({
      url: 'http://localhost:3000/users',
      method: 'GET',
      success: function(users) {
        // Check if the user exists
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
          console.log('Login successful:', user); // Debug success response

          // Store user session in localStorage
          localStorage.setItem('userSession', JSON.stringify({
            id: user.id,
            name: user.name,
            email: user.email
          }));

          // Update profile section dynamically
          updateProfileSection(user);

          // Redirect to home page (if needed)
          console.log('Redirecting to home page...'); // Debug redirection
          window.location.href = '/src/pages/home.html';
        } else {
          alert('Invalid email or password.');
        }
      },
      error: function(error) {
        console.error('Error fetching users:', error); // Debug error response
        alert('Error fetching users. Please try again.');
      }
    });
    return false;
  });
});

// profile 
// Function to update the profile section with user data
function updateProfileSection(user) {
  // Update profile-info section
  $('#profile-info').html(`
    <div class="profile-avatar">
      <img src="/src/assets/image 7.png" alt="Profile Picture" />
      <button class="edit-avatar">
        <i class="fa-solid fa-pen"></i>
      </button>
    </div>
    <div class="profile-details">
      <h1>${user.name}</h1>
    </div>
  `);

  // Update profile-card section
  $('#profile-card').html(`
    <div class="profile-form">
      <div class="form-group">
        <label>Username</label>
        <div class="input-wrapper">
          <input type="text" value="${user.name}" readonly />
          <i class="fa-regular fa-user icon"></i>
        </div>
      </div>
      <div class="form-group">
        <label>Email</label>
        <div class="input-wrapper">
          <input type="email" value="${user.email}" readonly />
          <i class="fa-regular fa-envelope icon"></i>
        </div>
      </div>
      <div class="form-group">
        <label>Password</label>
        <div class="input-wrapper">
          <input type="password" value="********" readonly />
          <i class="fa-regular fa-eye icon"></i>
        </div>
      </div>
      <button class="logout-button">
        <i class="fa-solid fa-right-from-bracket"></i>
        Logout
      </button>
    </div>
  `);
}
// session management Logout
$(document).ready(function() {

  // Check if user session exists
  const userSession = JSON.parse(localStorage.getItem('userSession'));

  if (userSession) {
    // User is logged in, update profile section with user info
    updateProfileSection(userSession);
  } else {
    // User is not logged in, show login prompt
    $('#profile-info').html(`
      <p>You are not logged in. <a href="/src/pages/login.html">Login</a> to continue.</p>
    `);
    $('#profile-card').html(''); // Clear profile card
  }

  // Logout button click event
  $(document).on('click', '.logout-button', function() {
    // Clear user session
    localStorage.removeItem('userSession');

    // Update UI to logged-out state
    $('#profile-info').html(`
      <p>You are not logged in. <a href="/src/pages/login.html">Login</a> to continue.</p>
    `);
    $('#profile-card').html(''); // Clear profile card
  });
})