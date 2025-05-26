 document.addEventListener("DOMContentLoaded", () => {
  const viewerImages = document.querySelectorAll(".viewer-image");
  const overlay = document.getElementById("imageViewerOverlay");
  const enlargedImage = document.getElementById("enlargedImage");
  const closeViewer = document.getElementById("closeViewer");
  const prevArrow = document.getElementById("prevArrow");
  const nextArrow = document.getElementById("nextArrow");

  let currentImageIndex = 0;

  const openLightbox = (index) => {
    currentImageIndex = index;
    enlargedImage.src = viewerImages[currentImageIndex].src;
    overlay.style.display = "flex";
  };

  const closeLightbox = () => {
    overlay.style.display = "none";
  };

  const showPrevImage = () => {
    currentImageIndex = (currentImageIndex - 1 + viewerImages.length) % viewerImages.length;
    enlargedImage.src = viewerImages[currentImageIndex].src;
  };

  const showNextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % viewerImages.length;
    enlargedImage.src = viewerImages[currentImageIndex].src;
  };

  viewerImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  closeViewer.addEventListener("click", closeLightbox);
  prevArrow.addEventListener("click", showPrevImage);
  nextArrow.addEventListener("click", showNextImage);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (overlay.style.display === "flex") {
      if (e.key === "ArrowLeft") showPrevImage();
      if (e.key === "ArrowRight") showNextImage();
      if (e.key === "Escape") closeLightbox();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menuElement = document.getElementById("menu");
  const selectedFoodsTextarea = document.getElementById("selectedFoods");
  const totalPriceInput = document.getElementById("totalPrice");
  const warningMessage = document.getElementById("warningMessage");

  if (!menuElement || !selectedFoodsTextarea || !totalPriceInput || !warningMessage) {
    console.error("One or more menu-related elements are not found in the DOM.");
    return;
  }

  menuElement.addEventListener("change", function () {
    const selectedOptions = Array.from(menuElement.selectedOptions);

    let totalPrice = 0;
    const selectedFoods = selectedOptions.map(option => {
      const priceMatch = option.text.match(/₱(\d+)/);
      if (priceMatch) {
        totalPrice += parseInt(priceMatch[1]);  
      }
      return option.text;
    }).join('\n');

    selectedFoodsTextarea.value = selectedFoods;  
    totalPriceInput.value = `₱${totalPrice}`;  
    warningMessage.style.display = 'none';  
  });

  document.getElementById("orderNow").addEventListener("click", function () {
    const totalPrice = document.getElementById("totalPrice").value.replace('₱', '').trim();
    const selectedOptions = Array.from(menuElement.selectedOptions);  

    if (selectedOptions.length === 0 || totalPrice === "0") { 
      warningMessage.style.display = 'block';
    } else {
      warningMessage.style.display = 'none';  
      
      const orderNumber = selectedOptions.length;  
      const currentDate = new Date().toLocaleDateString();   
      const orderedItems = selectedOptions.map(option => option.text).join(', '); 
      window.location.href = `receipt.html?total=${totalPrice}&orderNumber=${orderNumber}&date=${encodeURIComponent(currentDate)}&items=${encodeURIComponent(orderedItems)}`;
    }
  });
});

const params = new URLSearchParams(window.location.search);
const orderNumber = params.get('orderNumber');
const date = params.get('date');
const total = params.get('total');
const orderedItems = params.get('items');  

document.getElementById('orderNumber').innerText = orderNumber || 'N/A';
document.getElementById('date').innerText = date || 'N/A';
document.getElementById('total').innerText = total || '0';

const orderedItemsList = document.getElementById('orderedItemsList');
if (orderedItems) {
  const itemsArray = orderedItems.split(',');  
  itemsArray.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item.trim(); 
    orderedItemsList.appendChild(listItem);
  });
} else {
  const noItemsMessage = document.createElement('li');
  noItemsMessage.textContent = "No items ordered.";
  orderedItemsList.appendChild(noItemsMessage);
}