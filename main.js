

document.addEventListener('DOMContentLoaded', function () {

    function handleRegistration() {

        var firstName = firstNameInput.value;
        var lastName = lastNameInput.value;
        var username = usernameInput.value;
        var password = passwordInput.value;
        var rePassword = rePasswordInput.value;

        // Validate passwords match
        if (password !== rePassword) {
            alert('Passwords do not match. Please re-enter.');
            return;
        }

        var userData = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        };

        // For demonstration, we'll use local storage
        localStorage.setItem('userData', JSON.stringify(userData));

        // Display success message (you can redirect to another page or perform other actions)
        alert('Registration successful!');
    }

    // Attach the handleRegistration function to the button's click event
    var submitButton = document.getElementById('submit-Btn');
    submitButton.addEventListener('click', handleRegistration);
});

function showPostForm() {
  console.log("new post");
  
  showForm();
  
}

function showForm() {
  document.getElementById("create-post-form").style.display = "block";

}

function closeForm() {
  document.getElementById("create-post-form").style.display = "none"; 
}

function showDiscussion() {
  document.getElementById("forms__discussion").style.display = "block";
}
function closeDiscussion() {
  document.getElementById("forms__discussion").style.display = "none";
}

function createNewPost() {

}

function handleDiscussionSubmit(event) {
  event.preventDefault();
  var discussionTitle = document.getElementById("discussion-title").value;
  var discussionBody = document.getElementById("discussion-body").value;

  // Call submitPost with the obtained values
  addDiscussion(discussionTitle, discussionBody);
  document.getElementById("discussion-title").value = '';
  document.getElementById("discussion-body").value = '';
}


function addDiscussion(discussionTitle, discussionBody) {
  // Create a new feed item
  if (!discussionTitle || !discussionBody) {
    console.error("Incomplete information. Cannot create post.");
    return; // Terminate the function
  }
  var newFeed = document.createElement('div');
  newFeed.className = "feed-discussion";
  const currentDateTime = getCurrentDateTime();

  newFeed.innerHTML = `
  <div class="head">
      <div class="user">
          <div class="profile-picture">
              <img src="images/angel-pfp.jpg">
          </div>
          <div class="info">
              <h4>Angel Mohamed</h4>
                  <p class="text-muted"> <small class="time">${currentDateTime}</small></p>
                  
          </div>
      </div>
  </div>
  <div class="incident-type">
      <h2>${discussionTitle}</h2>
  </div>
  `;

  // Append the new feed item to the feeds container
  var feedsContainer = document.querySelector('.feeds');

  // Append the new post to the feeds container
  if (feedsContainer.childElementCount === 0) {
    // If empty, append the new post
    feedsContainer.appendChild(newFeed);
  } else {
    // If not empty, insert the new post before the first child
    var firstChild = feedsContainer.firstChild;
    feedsContainer.insertBefore(newFeed, firstChild);
  }
}

function handleSmallSubmit(event){
  event.preventDefault();
  var smallPostBody = document.getElementById("create-post").value;
  submitSmallPost(smallPostBody);
  document.getElementById("create-post").value = '';
}

function submitSmallPost(smallPostBody) {
  if (!smallPostBody) {
    console.error("Incomplete information. Cannot create post.");
    return; // Terminate the function
  }
  const currentDateTime = getCurrentDateTime();
  // Create a new post element
  var newPost = document.createElement("div");
  newPost.className = "feed";

  newPost.innerHTML = `
  <!-- Regular structure when mapLink is defined -->
  <div class="head">
      <div class="user">
          <div class="profile-picture">
              <img src="images/angel-pfp.jpg">
          </div>
          <div class="info">
              <h3>Angel Mohamed</h3>
              <small class="location">${currentDateTime}</small>
          </div>
      </div>
  </div>
  <div class="post-body">
      <p2>${smallPostBody}</p2>
      <br>
  </div>
  <div class="comments-section">
  <input type="text" class="comment-input" placeholder="Add a comment..." onkeydown="handleCommentInput(event, this.closest('.feed'))">
  </div>
  <div class="comments-list"></div>
  `;
  var feedsContainer = document.querySelector('.feeds');

  // Append the new post to the feeds container
  if (feedsContainer.childElementCount === 0) {
    // If empty, append the new post
    feedsContainer.appendChild(newPost);
  } else {
    // If not empty, insert the new post before the first child
    var firstChild = feedsContainer.firstChild;
    feedsContainer.insertBefore(newPost, firstChild);
  }
}
function submitDiscussionComment(postElement) {
  var commentInput = postElement.querySelector('.comment-input');
  var commentText = commentInput.value.trim();

  if (commentText !== "") {
      var commentsList = postElement.querySelector('.comments-list');
      var commentElement = document.createElement("div");
      commentElement.innerHTML = `
          <div class="comment">
              <div class="comment-user">
                  <div class="small-profile-picture">
                      <img src="images/angel-pfp.jpg" alt="Profile Picture">
                  </div>
                  <div class="user-info">
                      <span>Angel Mohamed · 1min</span>
                      <p>${commentText}</p>
                  </div>
              </div>
          </div>
      `;

      // Add comment element to comments list
      commentsList.appendChild(commentElement);

      // Clear the comment input field
      commentInput.value = '';
  }
}


function submitComment(postElement) {
  var commentInput = postElement.querySelector('.comment-input');
  var commentText = commentInput.value.trim();

  if (commentText !== "") {
      var commentsList = postElement.querySelector('.comments-list');
      var commentElement = document.createElement("div");
      commentElement.innerHTML = `
          <div class="comment">
              <div class="comment-user">
                  <div class="small-profile-picture">
                      <img src="images/angel-pfp.jpg" alt="Profile Picture">
                  </div>
                  <div class="user-info">
                      <span>Angel Mohamed · 1min</span>
                      <p>${commentText}</p>
                  </div>
              </div>
          </div>
      `;

      // Add comment element to comments list
      commentsList.appendChild(commentElement);

      // Clear the comment input field
      commentInput.value = '';
  }
}

function handleCommentInput(event, postElement) {
  if (event.key === 'Enter') {
      submitComment(postElement);
      event.preventDefault(); // Prevent the default behavior of the Enter key (form submission)
  }
}

function handleDiscussionComment(event, postElement){
  if (event.key ==='Enter'){
    submitDiscussionComment(postElement);
    event.preventDefault();
  }
}

function handleSubmit(event) {
  event.preventDefault();
  var incident = document.getElementById("incidentPrompt").value;
  var mapLink = document.getElementById("mapLinkPrompt").value;
  var postBody = document.getElementById("postBodyPrompt").value;
  var location = document.getElementById("locationPrompt").value;

  // Call submitPost with the obtained values
  submitPost(incident, mapLink, postBody, location);
  // Close the form
  closeForm();
  document.getElementById("incidentPrompt").value = '';
  document.getElementById("mapLinkPrompt").value = '';
  document.getElementById("postBodyPrompt").value = '';
  document.getElementById("locationPrompt").value = '';
}

function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
  const day = now.getDate().toString().padStart(2, '0');
  
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  const formattedDateTime = `${hours}:${minutes} · ${year}-${month}-${day}`;

  return formattedDateTime;
}


function submitPost(incident, mapLink, postBody, location) {
  if (!incident || !postBody || !location) {
    console.error("Incomplete information. Cannot create post.");
    return; // Terminate the function
  }
  const currentDateTime = getCurrentDateTime();
  // Create a new post element
  var newPost = document.createElement("div");
  newPost.className = "feed";

  // You can customize the content of the new post here
  if (mapLink) {
    // If mapLink is defined, create the regular structure
    newPost.innerHTML = `
      <!-- Regular structure when mapLink is defined -->
      <div class="head">
          <div class="user">
              <div class="profile-picture">
                  <img src="images/angel-pfp.jpg">
              </div>
              <div class="info">
                  <h3>Angel Mohamed</h3>
                  <small class="location">${location} · ${currentDateTime}</small>
              </div>
          </div>
      </div>
      <div class="incident-type">
          <h4>${incident}</h4>
      </div>
      <div class="post-body">
          <p2>${postBody}</p2>
          <br>
      </div>
      <div class="photo">${mapLink}</div>
      <div class="comments-section">
    <input type="text" class="comment-input" placeholder="Add a comment..." onkeydown="handleCommentInput(event, this.closest('.feed'))">
    </div>
  <div class="comments-list"></div>
    `;
  } else {
    newPost.innerHTML = `
      <!-- Regular structure when mapLink is defined -->
      <div class="head">
          <div class="user">
              <div class="profile-picture">
                  <img src="images/angel-pfp.jpg">
              </div>
              <div class="info">
                  <h3>Angel Mohamed</h3>
                  <small class="location">${location} · ${currentDateTime}</small>
              </div>
          </div>
      </div>
      <div class="incident-type">
          <h4>${incident}</h4>
      </div>
      <div class="post-body">
          <p2>${postBody}</p2>
          <br>
      </div>
      <div class="comments-section">
    <input type="text" class="comment-input" placeholder="Add a comment..." onkeydown="handleCommentInput(event, this.closest('.feed'))">
    </div>
  <div class="comments-list"></div>
    `;
  };
  
  var feedsContainer = document.querySelector('.feeds');

  // Append the new post to the feeds container
  if (feedsContainer.childElementCount === 0) {
    // If empty, append the new post
    feedsContainer.appendChild(newPost);
  } else {
    // If not empty, insert the new post before the first child
    var firstChild = feedsContainer.firstChild;
    feedsContainer.insertBefore(newPost, firstChild);
  }
}

// document.addEventListener('DOMContentLoaded', function() {
//   const backgrounds = [
//     'images/background_1.jpg',
//     'images/background_2.jpg',
//     'images/background_3.jpg',
//     'images/background_4.jpg',
//     'images/background_5.jpg',
//   ];

//   let idx = 0;

//   function setRandomBackground() {
//     const newBackground = `url('${backgrounds[idx]}')`;
  
//     const targetDiv = document.getElementById('log-in__main');
  
//     targetDiv.style.transition = 'background-image 1s ease';
//     targetDiv.style.backgroundImage = newBackground;

//     idx = (idx + 1) % backgrounds.length;
  
//     setTimeout(() => {
//       targetDiv.style.transition = '';
//     }, 1000);
//   }

//   setRandomBackground();

//   setInterval(setRandomBackground, 5000);
// });

const feeds = document.querySelectorAll(".feed");
const postSearch = document.querySelector("#post-search");

const searchPost = () => {
    const val = postSearch.value.trim().toLowerCase();
    feeds.forEach(feed => {
        const place_name = feed.querySelector(".location").textContent.trim().toLowerCase();
        const displayStyle = place_name.includes(val) ? "flex" : "none";
        feed.style.display = displayStyle;
    });
}

postSearch.addEventListener('input', searchPost);


