
// ==========================================
// M23 SPORT - MAIN SCRIPT
// ==========================================

// --- 5. CHAT INTEGRATION FROM DETAIL PAGE ---
window.openChatFromDetail = function () {
    if (!currentProduct) return;

    // Identify model (if window.products didn't fully sync, reconstruct or use title)
    // currentProduct is set in initProductDetailPage
    let modelId = currentProduct.modelId;

    // Fallback if modelId missing (legacy objects)
    if (!modelId) {
        // Try to parse from title or just use title
        modelId = currentProduct.title;
    }

    if (window.openChatWithProduct) {
        window.openChatWithProduct(modelId);
    } else {
        console.error("Chat function not found. Ensure chatbot.js is loaded.");
    }
};

// --- 1. CONFIGURATION & DATA ---

// Catalog Data
const productImages = [
    "https://i.ibb.co/gM1VmrX9/IMG-20250919-WA0059.jpg",
    "https://i.ibb.co/ZzqrVsf7/IMG-20250919-WA0060.jpg", "https://i.ibb.co/Qv7qR2R0/IMG-20250919-WA0061.jpg",
    "https://i.ibb.co/yFVYXjCf/IMG-20250919-WA0062.jpg", "https://i.ibb.co/XkLBZqYJ/IMG-20250919-WA0063.jpg",
    "https://i.ibb.co/kgDY2tRS/IMG-20250919-WA0064.jpg", "https://i.ibb.co/rKkpjjdL/IMG-20250919-WA0065.jpg",
    "https://i.ibb.co/Y7sc0MBM/IMG-20250919-WA0066.jpg", "https://i.ibb.co/CKCK7R3s/IMG-20250919-WA0067.jpg",
    "https://i.ibb.co/JR0Tf79S/IMG-20250919-WA0068.jpg", "https://i.ibb.co/8D25Z4sG/IMG-20250919-WA0069.jpg",
    "https://i.ibb.co/mCF9yhXg/IMG-20250919-WA0070.jpg", "https://i.ibb.co/JjxgSsTK/IMG-20250919-WA0071.jpg",
    "https://i.ibb.co/8ZP9Jz8/IMG-20250919-WA0072.jpg", "https://i.ibb.co/270rYLs7/IMG-20250919-WA0073.jpg",
    "https://i.ibb.co/hR4gRzh7/IMG-20250919-WA0074.jpg", "https://i.ibb.co/bypyJZk/IMG-20250919-WA0075.jpg",
    "https://i.ibb.co/DPmGdzRx/IMG-20250919-WA0076.jpg", "https://i.ibb.co/xKYbY1py/IMG-20250919-WA0077.jpg",
    "https://i.ibb.co/Qv34XvZJ/IMG-20250919-WA0078.jpg", "https://i.ibb.co/j9qy1J3Q/IMG-20250919-WA0079.jpg",
    "https://i.ibb.co/HDyv4SQf/IMG-20250919-WA0080.jpg", "https://i.ibb.co/N2Bp7GTf/IMG-20250919-WA0081.jpg",
    "https://i.ibb.co/rKfyxF2B/IMG-20250919-WA0082.jpg", "https://i.ibb.co/spFWYMf9/IMG-20250919-WA0083.jpg",
    "https://i.ibb.co/tMtnQM7K/IMG-20250919-WA0084.jpg", "https://i.ibb.co/vv1p5g82/IMG-20250919-WA0085.jpg",
    "https://i.ibb.co/spNVy8zg/IMG-20250919-WA0086.jpg", "https://i.ibb.co/MkqSwjzP/IMG-20250919-WA0087.jpg",
    "https://i.ibb.co/GfMn14cj/IMG-20250919-WA0088.jpg", "https://i.ibb.co/5XJdC3mF/IMG-20250919-WA0089.jpg",
    "https://i.ibb.co/fYvT55TZ/IMG-20250919-WA0090.jpg", "https://i.ibb.co/2033F2d6/IMG-20250919-WA0091.jpg",
    "https://i.ibb.co/d0Y82rdS/IMG-20250919-WA0092.jpg", "https://i.ibb.co/v48KQCsZ/IMG-20250919-WA0093.jpg",
    "https://i.ibb.co/S4N7sMxm/IMG-20250919-WA0094.jpg", "https://i.ibb.co/LzcXyKDN/IMG-20250919-WA0095.jpg",
    "https://i.ibb.co/m5kbSvSP/IMG-20250919-WA0097.jpg", "https://i.ibb.co/C35qdh9x/IMG-20250919-WA0098.jpg",
    "https://i.ibb.co/gMhcFsJc/IMG-20250919-WA0099.jpg", "https://i.ibb.co/d0qBbdv5/IMG-20250919-WA0100.jpg",
    "https://i.ibb.co/5Xztgy9z/IMG-20250919-WA0101.jpg", "https://i.ibb.co/KcCyxcNV/IMG-20250919-WA0102.jpg",
    "https://i.ibb.co/PvYtnpBy/IMG-20250919-WA0103.jpg", "https://i.ibb.co/7t1mjtCx/IMG-20250919-WA0104.jpg",
    "https://i.ibb.co/m5LH7sQc/IMG-20250919-WA0105.jpg", "https://i.ibb.co/mrvrCn36/IMG-20250919-WA0106.jpg",
    "https://i.ibb.co/KzFc0gN3/IMG-20250919-WA0107.jpg", "https://i.ibb.co/7dQ39VKQ/IMG-20250919-WA0108.jpg",
    "https://i.ibb.co/y1KBXJN/IMG-20250919-WA0109.jpg", "https://i.ibb.co/TDXWDZHj/IMG-20250919-WA0110.jpg",
    "https://i.ibb.co/4nTw83gB/IMG-20250919-WA0111.jpg", "https://i.ibb.co/6cYzj02q/IMG-20250919-WA0112.jpg",
    "https://i.ibb.co/Dgb9DJxN/IMG-20250919-WA0113.jpg", "https://i.ibb.co/chNzSRTV/IMG-20250919-WA0114.jpg",
    "https://i.ibb.co/5Xcfhqyr/IMG-20250919-WA0115.jpg", "https://i.ibb.co/0yFCN0k3/IMG-20250919-WA0116.jpg",
    "https://i.ibb.co/d4zPP60k/IMG-20250919-WA0117.jpg", "https://i.ibb.co/27vmmmw8/IMG-20250919-WA0118.jpg",
    "https://i.ibb.co/Vb98Mvq/IMG-20250919-WA0119.jpg", "https://i.ibb.co/23ZvFMvG/IMG-20250919-WA0120.jpg",
    "https://i.ibb.co/1JK35v2Z/IMG-20250919-WA0121.jpg", "https://i.ibb.co/HLRBgZJs/IMG-20250919-WA0122.jpg",
    "https://i.ibb.co/qMSLmKYQ/IMG-20250919-WA0123.jpg", "https://i.ibb.co/qM2b0h7j/IMG-20250919-WA0124.jpg",
    "https://i.ibb.co/jkTrWDts/IMG-20250919-WA0125.jpg", "https://i.ibb.co/N6drJ7jy/IMG-20250919-WA0126.jpg",
    "https://i.ibb.co/Pzhpm5LG/IMG-20250919-WA0127.jpg", "https://i.ibb.co/prv9dDCQ/IMG-20250919-WA0128.jpg",
    "https://i.ibb.co/4RKFzxY9/IMG-20250919-WA0129.jpg", "https://i.ibb.co/VcrygVXT/IMG-20250919-WA0130.jpg",
    "https://i.ibb.co/1GkBFSkz/IMG-20250919-WA0131.jpg", "https://i.ibb.co/9mDr6SfX/IMG-20250919-WA0132.jpg",
    "https://i.ibb.co/V14HqnH/IMG-20250919-WA0133.jpg", "https://i.ibb.co/QvxnW4GC/IMG-20250919-WA0134.jpg",
    "https://i.ibb.co/BVX4Jsjy/IMG-20250919-WA0135.jpg", "https://i.ibb.co/nMpXhBxg/IMG-20250919-WA0136.jpg",
    "https://i.ibb.co/SD2fF09f/IMG-20250919-WA0137.jpg", "https://i.ibb.co/xwYMBsH/IMG-20250919-WA0138.jpg",
    "https://i.ibb.co/nqL5vK2H/IMG-20250919-WA0139.jpg", "https://i.ibb.co/dscrCPrq/IMG-20250919-WA0140.jpg",
    "https://i.ibb.co/9kSDcnrx/IMG-20250919-WA0141.jpg", "https://i.ibb.co/SXnHmZhB/IMG-20250919-WA0142.jpg",
    "https://i.ibb.co/ymXM7Mzj/IMG-20250919-WA0143.jpg", "https://i.ibb.co/fYnqphWp/IMG-20250919-WA0144.jpg",
    "https://i.ibb.co/ZzW9FS7H/IMG-20250919-WA0145.jpg", "https://i.ibb.co/LhSRsKXV/IMG-20250919-WA0146.jpg",
    "https://i.ibb.co/m53J7hp2/IMG-20250919-WA0147.jpg", "https://i.ibb.co/DHr0L28m/IMG-20250919-WA0148.jpg",
    "https://i.ibb.co/FLD1C1HX/IMG-20250919-WA0149.jpg", "https://i.ibb.co/GvzTVMjd/IMG-20250919-WA0150.jpg",
    "https://i.ibb.co/rGM7vwjj/IMG-20250919-WA0151.jpg", "https://i.ibb.co/YF4mPMWs/IMG-20250919-WA0152.jpg",
    "https://i.ibb.co/9myqqwxd/IMG-20250919-WA0153.jpg", "https://i.ibb.co/hJpjcQRf/IMG-20250919-WA0154.jpg",
    "https://i.ibb.co/rRXFztzr/IMG-20250919-WA0170.jpg", "https://i.ibb.co/HT6DJGdM/IMG-20250919-WA0171.jpg",
    "https://i.ibb.co/yFY7w719/IMG-20250919-WA0172.jpg", "https://i.ibb.co/cSHL4FVc/IMG-20250919-WA0174.jpg",
    "https://i.ibb.co/RpYKjmS9/IMG-20250919-WA0175.jpg", "https://i.ibb.co/ksDzF1yv/IMG-20250919-WA0176.jpg",
    "https://i.ibb.co/JWCqCk2K/IMG-20250919-WA0177.jpg", "https://i.ibb.co/xtx3Kk1v/IMG-20250919-WA0178.jpg",
    "https://i.ibb.co/v4bGJTn1/IMG-20250919-WA0179.jpg", "https://i.ibb.co/YBZf8jrN/IMG-20250919-WA0180.jpg",
    "https://i.ibb.co/nq6K1nMc/IMG-20250919-WA0181.jpg", "https://i.ibb.co/t5nBkvv/IMG-20250919-WA0182.jpg",
    "https://i.ibb.co/7NrnqByW/IMG-20250919-WA0183.jpg", "https://i.ibb.co/rfQDkVJQ/IMG-20250919-WA0184.jpg",
    "https://i.ibb.co/jvXwFrN2/IMG-20250919-WA0185.jpg", "https://i.ibb.co/jkf4TGr0/IMG-20250919-WA0186.jpg",
    "https://i.ibb.co/DPV2mYTW/IMG-20250919-WA0187.jpg", "https://i.ibb.co/VWTjFVWm/IMG-20250919-WA0188.jpg",
    "https://i.ibb.co/9mCLnqsP/IMG-20250919-WA0189.jpg", "https://i.ibb.co/GfyBj1sx/IMG-20250919-WA0190.jpg",
    "https://i.ibb.co/FqJMhwJ0/IMG-20250919-WA0191.jpg", "https://i.ibb.co/n8KM07bw/IMG-20250919-WA0192.jpg",
    "https://i.ibb.co/G4Ts17vX/IMG-20250919-WA0193.jpg", "https://i.ibb.co/G4TXFzN2/IMG-20250919-WA0194.jpg",
    "https://i.ibb.co/kg1xqLJB/IMG-20250919-WA0195.jpg", "https://i.ibb.co/pvxVjPwq/IMG-20250919-WA0196.jpg",
    "https://i.ibb.co/NgdyBKTj/IMG-20250919-WA0197.jpg", "https://i.ibb.co/bjbMXgSf/IMG-20250919-WA0198.jpg",
    "https://i.ibb.co/gZyskB8x/IMG-20250919-WA0199.jpg", "https://i.ibb.co/hxbWKD1d/IMG-20250919-WA0200.jpg",
    "https://i.ibb.co/G4t4CYvp/IMG-20250919-WA0201.jpg", "https://i.ibb.co/1YK7jZfj/IMG-20250919-WA0202.jpg",
    "https://i.ibb.co/fhmhmdg/IMG-20250919-WA0203.jpg", "https://i.ibb.co/8LP1MrsL/IMG-20250919-WA0204.jpg",
    "https://i.ibb.co/6JvmC9L8/IMG-20250919-WA0205.jpg", "https://i.ibb.co/0ygGXjYQ/IMG-20250919-WA0206.jpg",
    "https://i.ibb.co/S4fg1DrS/IMG-20250919-WA0207.jpg", "https://i.ibb.co/RpzCDfmJ/IMG-20250919-WA0208.jpg",
    "https://i.ibb.co/wZHZ3Dh6/IMG-20250919-WA0209.jpg", "https://i.ibb.co/8LcHTrK1/IMG-20250919-WA0210.jpg",
    "https://i.ibb.co/LXq8dT3k/IMG-20250919-WA0211.jpg", "https://i.ibb.co/nqW178fr/IMG-20250919-WA0212.jpg",
    "https://i.ibb.co/VW7c0gtk/IMG-20250919-WA0213.jpg", "https://i.ibb.co/Z1JghP1j/IMG-20250919-WA0214.jpg",
    "https://i.ibb.co/PGnFx3NX/IMG-20250919-WA0215.jpg", "https://i.ibb.co/dsFGGXwk/IMG-20250919-WA0216.jpg",
    "https://i.ibb.co/5ChwpRq/IMG-20250919-WA0217.jpg", "https://i.ibb.co/fV4vbhBn/IMG-20250919-WA0218.jpg",
    "https://i.ibb.co/mYhzpgV/IMG-20250919-WA0219.jpg", "https://i.ibb.co/BVBSvRw7/IMG-20250919-WA0220.jpg",
    "https://i.ibb.co/VcCm1TyV/IMG-20250919-WA0221.jpg", "https://i.ibb.co/tTG5DhCm/IMG-20250919-WA0222.jpg",
    "https://i.ibb.co/4g3mtYpn/IMG-20250919-WA0223.jpg", "https://i.ibb.co/j9Hj5GDZ/IMG-20250919-WA0224.jpg",
    "https://i.ibb.co/tM8LTm95/IMG-20250919-WA0225.jpg", "https://i.ibb.co/x9VQ1L3/IMG-20250919-WA0226.jpg",
    "https://i.ibb.co/DHZ9Hfvf/IMG-20250919-WA0227.jpg", "https://i.ibb.co/sJ328C8y/IMG-20250919-WA0228.jpg",
    "https://i.ibb.co/rRKycMHQ/IMG-20250919-WA0229.jpg", "https://i.ibb.co/27ZJ8tPG/IMG-20250919-WA0230.jpg",
    "https://i.ibb.co/wrMf8k9v/IMG-20250919-WA0231.jpg", "https://i.ibb.co/Nk9VssZ/IMG-20250919-WA0232.jpg",
    "https://i.ibb.co/xSGkrRJX/IMG-20250919-WA0233.jpg", "https://i.ibb.co/fdz6fg7y/IMG-20250919-WA0234.jpg",
    "https://i.ibb.co/q3BQkW4c/IMG-20250919-WA0235.jpg", "https://i.ibb.co/ZrwWxs2/IMG-20250919-WA0236.jpg",
    "https://i.ibb.co/7NJg86Wn/IMG-20250919-WA0237.jpg", "https://i.ibb.co/cK9QNNRr/IMG-20250919-WA0238.jpg",
    "https://i.ibb.co/nsGmrvJF/IMG-20250919-WA0239.jpg"
];

window.products = productImages.map((img, index) => {
    const modelId = `U-${String(index + 1).padStart(2, '0')}`;
    return {
        id: index + 1,
        modelId: modelId,
        title: `Diseño Modelo ${59 + index}`,
        displayTitle: `Diseño: ${modelId}`,
        image: img,
        basePrice: 55000,
        description: "Uniforme profesional personalizable. Incluye camiseta, pantaloneta y medias."
    };
});

// Global State
let currentProduct = null;
let currentSize = null;
let currentQuantity = 1;
let cart = JSON.parse(localStorage.getItem('m23_cart')) || [];
let isPrintingEnabled = false;

// --- 2. INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
    // A. Inject Cart UI
    injectCartHTML();
    updateCartUI();

    // B. Mobile Menu Logic
    initMobileMenu();

    // C. Scroll Animations
    initScrollReveal();

    // D. Catalog Rendering (if present)
    const catalogGrid = document.getElementById('catalog-grid');
    if (catalogGrid) renderCatalog(catalogGrid);

    // E. Product Detail Logic (if present)
    const detailTitle = document.getElementById('detailTitle');
    if (detailTitle) {
        initProductDetailPage();
    }

    // F. Contact Form (if present)
    initContactForm();
});


// --- 3. CORE FUNCTIONS ---

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
            });
        });
    }
}

// Scroll Reveal
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.product-card, .step-card, .testimonial-card, .section-title');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once
}

// Catalog
function renderCatalog(container) {
    window.products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-model', product.modelId);

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
                <div class="product-overlay">
                    <a href="product.html?id=${product.id}" class="btn-icon"><i class="fas fa-eye"></i></a>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.title}</h3>
                <p class="model-id" style="color: #666; font-size: 0.95rem; margin-bottom: 8px;"><strong>Diseño:</strong> ${product.modelId}</p>
                <p class="price">Desde $${product.basePrice.toLocaleString('es-CO')}</p>
                
                <div class="card-actions" style="display: flex; flex-direction: column; gap: 8px; margin-top: 15px;">
                    <button onclick="window.openChatWithProduct('${product.modelId}')" class="btn-chat-product" style="background: var(--primary); color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer; width: 100%; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.3s;">
                        <i class="fas fa-comment-dots"></i> Consultar este diseño
                    </button>
                    <a href="product.html?id=${product.id}" class="btn-link" style="text-align: center; display: block; border: 1px solid var(--primary); padding: 8px; border-radius: 5px; color: var(--primary); background: transparent;">
                        VER DETALLES
                    </a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Product Detail Page Logic
function initProductDetailPage() {
    console.log("Initializing Product Detail Page...");
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Find Product
    if (!productId) {
        document.getElementById('detailTitle').innerText = "Producto no encontrado";
        return;
    }

    const product = products.find(p => p.id == productId);
    if (!product) {
        document.getElementById('detailTitle').innerText = "Producto no válido";
        return;
    }

    // Set Global State
    currentProduct = product;

    // Update UI Elements
    document.getElementById('detailTitle').innerText = product.title;
    document.getElementById('detailBasePrice').innerText = `$${product.basePrice.toLocaleString('es-CO')}`;
    document.getElementById('detailImg').src = product.image;

    // Update Price Logic - wait for inputs to exist? They should be in HTML already.
    updateProductPrice();
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            alert('¡Gracias! Tu mensaje simulado ha sido enviado.');
            contactForm.reset();
        });
    }
}


// --- 4. GLOBAL HELPER FUNCTIONS (Exposed to Window) ---

// Update Price Logic for Product Detail (Multi-Size)
window.updateSizeQty = function (size, change) {
    const input = document.getElementById(`qty-${size}`);
    if (!input) return;

    let newVal = (parseInt(input.value) || 0) + change;
    if (newVal < 0) newVal = 0;
    input.value = newVal;

    updateProductPrice();
};

window.updateProductPrice = function () {
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    let totalQty = 0;

    // Sum quantities
    sizes.forEach(size => {
        const input = document.getElementById(`qty-${size}`);
        if (input) {
            totalQty += parseInt(input.value) || 0;
        }
    });

    currentQuantity = totalQty;

    // Update UI Total Unit Display
    const totalUnitsDisplay = document.getElementById('totalUnitsDisplay');
    if (totalUnitsDisplay) totalUnitsDisplay.innerText = totalQty;

    const unitPrice = 55000;
    let finalTotal = 0;
    let messageHTML = '';

    // Checkbox state (Global Print Toggle for Cart logic can persist, or we use local toggle for visualization)
    // For Multi-Add, better to use just the toggle check
    const existingCheckbox = document.getElementById('printCheck');
    const isChecked = existingCheckbox ? existingCheckbox.checked : false;

    // DOM Elements for Summary
    const summaryPrint = document.getElementById('summaryPrint');
    const summaryDiscount = document.getElementById('summaryDiscount');
    const summaryTotalDisplay = document.getElementById('summaryTotalDisplay');
    const discountRow = document.getElementById('discountRow');
    const printRow = document.getElementById('printRow');
    const totalPriceEl = document.getElementById('detailTotalPrice');
    const dynamicOptions = document.getElementById('dynamicOptions');

    // Logic: Quantity >= 6
    if (currentQuantity >= 6) {
        // Wholesale Logic (15% OFF)
        const baseTotal = unitPrice * currentQuantity;
        const discountAmount = baseTotal * 0.15;
        finalTotal = baseTotal - discountAmount;

        // Update Summary
        if (printRow) printRow.style.display = 'none';
        if (discountRow) discountRow.style.display = 'flex';
        if (summaryDiscount) summaryDiscount.innerText = `-$${Math.round(discountAmount).toLocaleString('es-CO')}`;

        messageHTML = `
            <div class="wholesale-info">
                <strong>¡Descuento aplicado: 15% por compra al por mayor!</strong><br>
                Incluye estampado y medias sin costo adicional.
            </div>
        `;
    } else {
        // Retail Logic
        let printCost = 0;
        if (isChecked) {
            printCost = 5000 * currentQuantity;
        }
        finalTotal = (unitPrice * currentQuantity) + printCost;

        // Update Summary
        if (printRow) printRow.style.display = 'flex';
        if (discountRow) discountRow.style.display = 'none';
        if (summaryPrint) summaryPrint.innerText = `+$${printCost.toLocaleString('es-CO')}`;

        messageHTML = `
            <div class="checkbox-container">
                <input type="checkbox" id="printCheck" ${isChecked ? 'checked' : ''} onchange="updateProductPrice()">
                <label for="printCheck">Agregar estampado (+$5.000 COP por unidad)</label>
            </div>
        `;
    }

    // Dynamic Options Render
    if (dynamicOptions) {
        // Prevent clearing checkbox state if it exists, only update if wholesale state changes
        const isWholesaleMode = currentQuantity >= 6;
        const currentContentIsWholesale = dynamicOptions.innerHTML.includes('wholesale-info');

        if ((isWholesaleMode && !currentContentIsWholesale) || (!isWholesaleMode && (currentContentIsWholesale || dynamicOptions.innerHTML.trim() === ''))) {
            dynamicOptions.innerHTML = messageHTML;
        }
    }

    // Update Totals
    const totalStr = `$${Math.round(finalTotal).toLocaleString('es-CO')}`;
    if (totalPriceEl) totalPriceEl.innerText = totalStr;
    if (summaryTotalDisplay) {
        summaryTotalDisplay.innerText = totalStr;
        summaryTotalDisplay.style.color = currentQuantity >= 6 ? '#2e7d32' : 'var(--secondary)';
    }
};

window.addToCart = function () {
    if (!currentProduct) {
        alert("⚠️ Error: No se ha cargado el producto correctamente.");
        return;
    }

    // Validate: At least one item selected
    if (currentQuantity === 0) {
        alert("⚠️ Por favor selecciona al menos una unidad.");
        return;
    }

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    let itemsAdded = 0;

    sizes.forEach(size => {
        const input = document.getElementById(`qty-${size}`);
        const qty = parseInt(input ? input.value : 0) || 0;

        if (qty > 0) {
            const item = {
                id: currentProduct.id,
                title: currentProduct.title,
                image: currentProduct.image,
                basePrice: 55000,
                size: size,
                quantity: qty
            };

            // Merge duplicate
            const existingIndex = cart.findIndex(i => i.id === item.id && i.size === item.size);
            if (existingIndex > -1) {
                cart[existingIndex].quantity += item.quantity;
            } else {
                cart.push(item);
            }
            itemsAdded++;

            // Reset input visual
            if (input) input.value = 0;
        }
    });

    if (itemsAdded > 0) {
        saveCart();
        toggleCart();
        updateProductPrice(); // Reset UI totals
    }
};


// --- 5. CART SYSTEM IMPL (Global) ---

function injectCartHTML() {
    if (document.getElementById('cartSidebar')) return;

    const div = document.createElement('div');
    div.innerHTML = `
        <!-- Floating Button -->
        <div class="floating-cart-btn" onclick="toggleCart()">
            <i class="fas fa-shopping-cart"></i>
            <div class="cart-badge" id="cartBadge">0</div>
        </div>

        <!-- Sidebar Overlay & Cart -->
        <div class="cart-sidebar-overlay" id="cartOverlay" onclick="toggleCart()"></div>
        <div class="cart-sidebar" id="cartSidebar">
            <div class="cart-header">
                <h2><i class="fas fa-shopping-bag"></i> TU PEDIDO</h2>
                <button class="close-cart" onclick="toggleCart()">&times;</button>
            </div>
            
            <div class="cart-items-container" id="cartItemsContainer"></div>

            <div class="cart-footer">
                <!-- Printing Toggle -->
                <div class="checkbox-container" id="cartPrintContainer" style="margin-bottom: 15px; padding: 10px; background: #e3f2fd; border-radius: 6px; border: 1px solid #bbdefb; display: none;">
                    <input type="checkbox" id="globalPrintCheck" onchange="togglePrinting()">
                    <label for="globalPrintCheck" style="font-size: 0.9rem; color: #0d47a1; font-weight: bold; cursor: pointer;">
                        ¿Agregar estampado a todos? (+$5.000/u)
                    </label>
                    <div style="font-size: 0.8rem; margin-top: 5px; color: #555;">(Gratis si llevas 6 o más unidades)</div>
                </div>

                <div id="cartDiscountMsg" class="cart-discount" style="display: none;">
                    <span><i class="fas fa-gift"></i> Descuento Mayorista (15%)</span>
                    <span>APLICADO</span>
                </div>

                <div class="cart-summary-row">
                    <span>Subtotal:</span>
                    <span id="cartSubtotal">$0</span>
                </div>
                <div class="cart-summary-row" id="cartPrintRow" style="display:none;">
                    <span>Estampado:</span>
                    <span id="cartPrintCost">$0</span>
                </div>
                <div class="cart-total">
                    <span>TOTAL:</span>
                    <span id="cartTotal">$0</span>
                </div>

                <button class="btn-checkout" onclick="checkoutWhatsApp()">
                    <i class="fab fa-whatsapp"></i> COMPLETAR COMPRA
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(div);
}

window.toggleCart = function () {
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    if (overlay && sidebar) {
        overlay.classList.toggle('active');
        sidebar.classList.toggle('active');
        updateCartUI();
    }
};

window.togglePrinting = function () {
    const checkbox = document.getElementById('globalPrintCheck');
    if (checkbox) {
        isPrintingEnabled = checkbox.checked;
        updateCartUI();
    }
};

window.removeFromCart = function (index) {
    if (confirm('¿Eliminar este producto?')) {
        cart.splice(index, 1);
        saveCart();
        updateCartUI();
    }
};

window.updateCartItemQty = function (index, change) {
    const newQty = cart[index].quantity + change;
    if (newQty < 1) return;
    cart[index].quantity = newQty;
    saveCart();
    updateCartUI();
};

function saveCart() {
    localStorage.setItem('m23_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const container = document.getElementById('cartItemsContainer');
    const badge = document.getElementById('cartBadge');

    if (!container) return;

    // Calc Totals
    let totalQty = 0;
    let subtotal = 0;

    cart.forEach(item => {
        totalQty += item.quantity;
        subtotal += (item.basePrice * item.quantity);
    });

    // Badge
    if (badge) {
        badge.innerText = totalQty;
        badge.style.display = totalQty > 0 ? 'flex' : 'none';
    }

    // Render Items
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart-msg">
                <i class="fas fa-shopping-basket"></i>
                <p>Tu carrito está vacío.</p>
                <button onclick="toggleCart()" class="btn-link" style="margin-top:10px;">Ver Catálogo</button>
            </div>
        `;
        const footer = document.querySelector('.cart-footer');
        if (footer) {
            footer.style.opacity = '0.5';
            footer.style.pointerEvents = 'none';
        }
    } else {
        const footer = document.querySelector('.cart-footer');
        if (footer) {
            footer.style.opacity = '1';
            footer.style.pointerEvents = 'all';
        }

        container.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" class="cart-item-img" alt="Foto">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-meta">Talla: <strong>${item.size}</strong></div>
                    <div class="cart-item-price">$${(item.basePrice * item.quantity).toLocaleString('es-CO')}</div>
                    
                    <div class="cart-controls" style="margin-top: 8px;">
                        <button class="cart-qty-btn" onclick="updateCartItemQty(${index}, -1)">−</button>
                        <span style="font-weight:bold; width: 30px; text-align:center;">${item.quantity}</span>
                        <button class="cart-qty-btn" onclick="updateCartItemQty(${index}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');
    }

    // Advanced Pricing Logic (Global)
    const isWholesale = totalQty >= 6;

    const printCheckContainer = document.getElementById('cartPrintContainer');
    const printRow = document.getElementById('cartPrintRow');
    const printCostEl = document.getElementById('cartPrintCost');
    const discountMsg = document.getElementById('cartDiscountMsg');

    let printingCost = 0;

    if (isWholesale) {
        if (printCheckContainer) printCheckContainer.style.display = 'none'; // Auto included
        if (printRow) printRow.style.display = 'flex';
        if (printCostEl) {
            printCostEl.innerText = "¡GRATIS!";
            printCostEl.style.color = '#2e7d32';
        }
        if (discountMsg) discountMsg.style.display = 'flex';
    } else {
        if (printCheckContainer) printCheckContainer.style.display = 'block'; // Option available
        if (printRow) printRow.style.display = isPrintingEnabled ? 'flex' : 'none';
        if (isPrintingEnabled) {
            printingCost = 5000 * totalQty;
            if (printCostEl) {
                printCostEl.innerText = `+$${printingCost.toLocaleString('es-CO')}`;
                printCostEl.style.color = '#555';
            }
        }
        if (discountMsg) discountMsg.style.display = 'none';
    }

    // Discount Logic
    let discount = 0;
    if (isWholesale) {
        discount = subtotal * 0.15;
    }

    const finalTotal = subtotal + printingCost - discount;

    // Update Text
    if (document.getElementById('cartSubtotal')) document.getElementById('cartSubtotal').innerText = `$${subtotal.toLocaleString('es-CO')}`;
    if (document.getElementById('cartTotal')) document.getElementById('cartTotal').innerText = `$${Math.round(finalTotal).toLocaleString('es-CO')}`;
}

window.checkoutWhatsApp = function () {
    if (cart.length === 0) return;

    let msg = `*HOLA M23 SPORT, QUIERO HACER UN PEDIDO:*%0A%0A`;

    cart.forEach((item, i) => {
        msg += `🔹 *${item.quantity}x ${item.title}* (Talla ${item.size})%0A`;
    });

    const totalQty = cart.reduce((sum, i) => sum + i.quantity, 0);
    const isWholesale = totalQty >= 6;

    const subtotal = cart.reduce((sum, i) => sum + (i.basePrice * i.quantity), 0);
    let printCost = 0;
    let discount = 0;

    if (isWholesale) {
        discount = subtotal * 0.15;
        msg += `%0A🎁 *Descuento Mayorista (15%) Aplicado*`;
        msg += `%0A✅ *Estampado y Medias INCLUIDOS*`;
    } else {
        if (isPrintingEnabled) {
            printCost = 5000 * totalQty;
            msg += `%0A👕 *Con Estampado Adicional* (+$${printCost.toLocaleString()})`;
        }
    }

    const finalTotal = subtotal + printCost - discount;

    msg += `%0A%0A💰 *TOTAL A PAGAR: $${Math.round(finalTotal).toLocaleString('es-CO')}*`;
    msg += `%0A%0A📝 *Mis Datos:*%0A(Escribe tu nombre y dirección aquí)`;

    window.open(`https://wa.me/573001234567?text=${msg}`, '_blank');
};
