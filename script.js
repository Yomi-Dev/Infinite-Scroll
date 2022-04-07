const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 7;
const apiKey = 'A1GIN-VksQWmJo4DhIPnLKnLoFscGubLUXggnDZsO1I';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {


        // Create <a> (Anchor element) to link to Unsplash
const item = document.createElement('a');
setAttributes(item, {href: photo.links.html,
target: '_blank',
});



// Create <img> (Image) for photo
const img = document.createElement('img');
setAttributes(img, {
    src: photo.urls.regular,
    alt: photo.alt_description,
    title: photo.alt_description,
});
// Event Listener, check when each is finished loading
img.addEventListener('load', imageLoaded);


// Put <img> image inside <a> anchor, then put both inside imageContainer Element
item.appendChild(img);
imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function  getPhotos() {
    try {
const response = await fetch(apiUrl);
photosArray = await response.json();
displayPhotos();
    } catch (error) {
        // Catch Error Here
    }
}


// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
    
    
}
});

// On Load
getPhotos();