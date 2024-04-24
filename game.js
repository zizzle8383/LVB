// Preload images using promises
function preloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

// Define objects and their refresh order
const objects = [
    { name: 'background', src: 'cove_2013.png', order: 0 },
    { name: 'navmesh', src: 'navmesh.png', order: 1 }, // Navmesh image
    { name: 'player', src: 'player.png', order: 2 },
    // Add more objects as needed
];

let playerX = 0;
let playerY = 0;

// Load images and start the game
Promise.all(objects.map(obj => preloadImage(obj.src)))
    .then(images => {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        // Draw objects according to their refresh order
        function drawObjects() {
            objects.sort((a, b) => a.order - b.order).forEach(obj => {
                if (obj.img) {
                    // Draw navmesh image with opacity 0
                    if (obj.name === 'navmesh') {
                        ctx.globalAlpha = 0; // Set opacity to 0
                        ctx.drawImage(obj.img, 0, 0, canvas.width, canvas.height);
                        ctx.globalAlpha = 1; // Reset opacity to 1
                    } else {
                        ctx.drawImage(obj.img, 0, 0, canvas.width, canvas.height);
                    }
                }
            });
        }

        // Set image objects
        objects.forEach((obj, index) => {
            obj.img = images[index];
        });

        // Handle player movement on mouse click
        canvas.addEventListener('mousedown', function(event) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Check if clicked position corresponds to non-transparent pixel in navmesh
            const navmeshData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixelIndex = (Math.floor(mouseY) * canvas.width + Math.floor(mouseX)) * 4;
            const isNavmeshPixel = navmeshData.data[pixelIndex + 3] !== 0; // Check alpha channel
            if (isNavmeshPixel) {
                // Move player to clicked position
                playerX = mouseX;
                playerY = mouseY;
            }
        });

        // Start the game loop
        function gameLoop() {
            drawObjects();

            // Draw player
            ctx.drawImage(objects.find(obj => obj.name === 'player').img, playerX, playerY);

            requestAnimationFrame(gameLoop);
        }
        gameLoop();
    })
    .catch(error => {
        console.error('Error loading images:', error);
    });
