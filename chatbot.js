// ==========================================
// M23 SPORT - IA CHATBOT (Gemini)
// ==========================================

// ⚠️ SECURITY WARNING ⚠️
// The API Key is hardcoded here for demonstration purposes.
// in a production environment, you should NEVER expose your API keys on the client side.

const GEMINI_API_KEY = "AIzaSyDg47W8Z5iZGbJ9Ln8CB2-qCptBznZxW3s";
const API_BASE = "https://generativelanguage.googleapis.com/v1beta";

// System Prompt
const SYSTEM_INSTRUCTION_TEXT = `
Actúa como 'Jorge', asesor de ventas de M23 Sport en Medellín.
Objetivo: Cerrar ventas conversando paso a paso. NO sueltes toda la información de golpe.

PERSONALIDAD (PROFESIONAL Y RESPETUOSO):
- Eres paisa y amable, pero muy RESPETUOSO. 
- Usas expresiones educadas: "Claro que sí", "Con mucho gusto", "Quedo atento".
- ❌ PROHIBIDO usar jerga callejera ni palabras como "chimba", "bacano", "parce". Eso no es profesional.

🚨 REGLA CRÍTICA DE CONTEXTO (SI NO HAY CÓDIGO DE DISEÑO):
- Si el cliente saluda o pide precio SIN haber usado el botón de consulta (es decir, no sabes qué modelo quiere):
  ❌ NO des precios ni preguntes cantidad todavía.
  ✅ TU RESPUESTA OBLIGATORIA: "¡Hola! Para poder asesorarle bien en el precio, por favor vaya al catálogo y presione el botón 'Consultar este diseño' o 'Consultar para equipo' justo debajo del uniforme que le gustó. Así sé exactamente qué modelo busca y no nos confundimos, ya que hay varios parecidos."

GUION DE VENTA (SOLO SI YA SABES EL MODELO U-XX):
1. Saludo y Filtro:
   - Cliente: (Viene con código U-XX, o ya lo mencionó).
   - Jorge: "¡Excelente elección! El Diseño {codigo} gusta mucho. Para darle la mejor cotización, cuénteme: ¿Cuántos uniformes está necesitando?"

2. Indagar Necesidad (Solo si ya dijeron cantidad):
   - Cliente: "Necesito 12".
   - Jorge: "¡Perfecto! ¿Los busca con el paquete completo para equipo (medias + estampado), o solo el uniforme sencillo?".

3. La Oferta (El Cierre):
   - Cliente: "Completos" o "Para equipo".
   - Jorge: "Entendido. Para esa cantidad le quedan en oferta a $47.000 c/u. Le incluye TODO: camiseta, pantaloneta, medias, nombre y número estampado. ¿Le gustaría que iniciemos con el pedido?".

DATOS CLAVE:
- Individual (menos de 6): $55.000 (Solo camiseta + pantaloneta).
- Equipo (6+): $47.000 (Combo Full: Camiseta + Pantaloneta + Medias + Nombre + Número).
- PROHIBIDO: Decir "Regalo". Di "Incluido en el paquete".
`;

let chatHistory = [];
let currentModelUrl = null;

// --- 1. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    injectChatWidget();
    resolveBestModel();
});

// --- 2. AUTOMATIC MODEL DISCOVERY ---
async function resolveBestModel() {
    if (currentModelUrl) return currentModelUrl;

    try {
        console.log("Jorge M23: Buscando el mejor modelo disponible...");
        const response = await fetch(`${API_BASE}/models?key=${GEMINI_API_KEY}`);
        const data = await response.json();

        if (data.error) {
            console.error("Error listando modelos:", data.error);
            return null; // Fallback will handle later
        }

        const availableModels = data.models || [];

        // Priority list
        const preferredModels = [
            'gemini-1.5-flash',
            'gemini-1.5-pro',
            'gemini-1.0-pro',
            'gemini-pro',
            'gemini-1.5-flash-001'
        ];

        let selectedModel = null;

        for (const pref of preferredModels) {
            const found = availableModels.find(m => m.name.endsWith(pref) && m.supportedGenerationMethods.includes('generateContent'));
            if (found) {
                selectedModel = found.name;
                break;
            }
        }

        if (!selectedModel) {
            const anyGemini = availableModels.find(m => m.name.includes('gemini') && m.supportedGenerationMethods.includes('generateContent'));
            if (anyGemini) selectedModel = anyGemini.name;
        }

        if (selectedModel) {
            const modelName = selectedModel.replace('models/', '');
            currentModelUrl = `${API_BASE}/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
            console.log(`Jorge M23: Modelo seleccionado -> ${modelName}`);
        } else {
            console.warn("Jorge M23: No se encontró modelo, usando fallback.");
            currentModelUrl = `${API_BASE}/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        }

    } catch (e) {
        console.error("Error en autodescubrimiento:", e);
        currentModelUrl = `${API_BASE}/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    }

    return currentModelUrl;
}

// --- 3. UI INJECTION ---
function injectChatWidget() {
    // 1. Sales Banner (Right side)
    const banner = document.createElement('div');
    banner.className = 'sales-banner';
    banner.id = 'salesBanner'; // Added ID for toggling

    const bannerContent = document.createElement('div');
    bannerContent.className = 'sales-banner-content';
    bannerContent.innerHTML = `
            <div class="sales-icon">⚽</div>
            <div class="sales-text">
                <strong>¿Quieres uniformar a tu equipo?</strong>
                <span>Consulta con un asesor ahora</span>
            </div>
            <div class="sales-arrow"><i class="fas fa-comment-dots"></i></div>
    `;
    bannerContent.onclick = openChatWindow;

    banner.appendChild(bannerContent);
    document.body.appendChild(banner);

    // 2. Chat Window
    const chatWindow = document.createElement('div');
    chatWindow.className = 'chat-window';
    chatWindow.id = 'chatWindow';

    // Populate Product Options
    let productOptions = '<option value="" disabled selected>Selecciona un diseño...</option>';
    if (window.products && Array.isArray(window.products)) {
        window.products.forEach(p => {
            productOptions += `<option value="${p.title}">${p.title}</option>`;
        });
    } else {
        // Fallback if products not loaded yet (or script order issue)
        for (let i = 1; i <= 10; i++) {
            productOptions += `<option value="Modelo ${i}">Modelo ${i}</option>`;
        }
    }

    chatWindow.innerHTML = `
        <div class="chat-header">
            <div class="chat-title">
                <i class="fas fa-user-tie"></i> Jorge - Asesor M23
            </div>
            <button class="chat-close" id="chatCloseBtn">&times;</button>
        </div>
        
        <!-- Product Selector Area -->
        <div class="product-selector-area" style="padding: 10px; background: #f8f9fa; border-bottom: 1px solid #eee;">
            <select id="chatProductSelect" style="width: 100%; padding: 8px; border-radius: 5px; border: 1px solid #ddd;" onchange="handleProductSelection()">
                ${productOptions}
            </select>
        </div>

        <div class="chat-messages" id="chatMessages">
            <div class="message bot-message">
                Hola 👋 <br>
                Cuéntame, ¿cuál diseño del catálogo te gustó más?
            </div>
        </div>
        <div class="chat-input-area">
            <input type="text" id="chatInput" placeholder="Escribe aquí..." onkeypress="handleChatKey(event)">
            <button onclick="sendMessage()"><i class="fas fa-paper-plane"></i></button>
        </div>
    `;
    document.body.appendChild(chatWindow);

    document.getElementById('chatCloseBtn').onclick = toggleChatWindow;
}

// --- 4. LOGIC ---
function toggleChatWindow() {
    const window = document.getElementById('chatWindow');
    const banner = document.getElementById('salesBanner');

    window.classList.toggle('active');

    // Banner Visibility Logic
    if (window.classList.contains('active')) {
        if (banner) banner.style.display = 'none'; // Hide banner when chat is open
        const input = document.getElementById('chatInput');
        if (input) input.focus();
    } else {
        if (banner) banner.style.display = 'block'; // Show banner when chat is closed
    }
}

function openChatWindow() {
    const window = document.getElementById('chatWindow');
    const banner = document.getElementById('salesBanner');

    if (!window.classList.contains('active')) {
        window.classList.add('active');
        if (banner) banner.style.display = 'none'; // Hide banner
        const input = document.getElementById('chatInput');
        if (input) input.focus();
    }
}

function handleChatKey(e) {
    if (e.key === 'Enter') sendMessage();
}

function handleProductSelection() {
    const select = document.getElementById('chatProductSelect');
    const selectedProduct = select.value;
    if (selectedProduct) {
        const input = document.getElementById('chatInput');
        input.value = `Me interesa el ${selectedProduct}`;
        sendMessage();
    }
}

// Global function called from Catalog Buttons
window.openChatWithProduct = function (modelId) {
    const window = document.getElementById('chatWindow');
    const banner = document.getElementById('salesBanner');

    // 1. Open Chat
    if (!window.classList.contains('active')) {
        window.classList.add('active');
        if (banner) banner.style.display = 'none';
    }

    // 2. Set Message
    const input = document.getElementById('chatInput');
    // Ensure input exists and is focused
    if (input) {
        input.value = `Hola, me interesa el uniforme Diseño ${modelId}`;
        input.focus();
        // 3. Send Message automatically
        sendMessage();
    }
};

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const userText = input.value.trim();

    if (!userText) return;

    // Add User Message
    appendMessage(userText, 'user-message');
    input.value = '';

    // --- PHASE 1: SIMULATE READING (4-5 Seconds Delay) ---
    const readingDelay = Math.floor(Math.random() * 1000) + 4000; // 4000 to 5000 ms
    await new Promise(r => setTimeout(r, readingDelay));

    // --- PHASE 2: TYPING INDICATOR ---
    const loadingId = 'loading-' + Date.now();
    appendMessage('<i>Jorge está escribiendo...</i>', 'bot-message loading', loadingId);

    // Get URL
    const url = await resolveBestModel();

    let payloadContents = [];
    if (chatHistory.length === 0) {
        // For the very first user message, prepend the system instruction
        payloadContents.push({
            role: "user",
            parts: [{ text: SYSTEM_INSTRUCTION_TEXT + "\n\nUser Question: " + userText }]
        });
    } else {
        // For subsequent messages, just add the user's message
        payloadContents = [...chatHistory];
        payloadContents.push({ role: "user", parts: [{ text: userText }] });
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: payloadContents })
        });

        const data = await response.json();

        // Simulate "Typing" time based on response length?
        // Actually, the API call takes time, which serves as typing time.
        // But for short API responses, we might want to ensure a minimum typing time if it was too fast.

        // Remove Loading/Typing
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();

        if (data.error) {
            console.error("API Error Response:", data.error);
            appendMessage(`⚠️ Falta técnica: ${data.error.message}`, 'bot-message error');
            return;
        }

        if (data.candidates && data.candidates[0].content) {
            const botText = data.candidates[0].content.parts[0].text;

            // Append Bot Response
            appendMessage(botText, 'bot-message');

            // Save to history
            if (chatHistory.length === 0) {
                // The first user message includes the system instruction for the model, but not for the chat history itself.
                // The actual chat history should only reflect the user's direct input.
                chatHistory.push({ role: "user", parts: [{ text: userText }] });
            } else {
                chatHistory.push({ role: "user", parts: [{ text: userText }] });
            }
            chatHistory.push({ role: "model", parts: [{ text: botText }] });

        } else {
            appendMessage("⚠️ (Sin respuesta)", 'bot-message error');
        }

    } catch (error) {
        console.error("Fetch Error:", error);
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();
        appendMessage("⚠️ Error de conexión.", 'bot-message error');
    }
}

function appendMessage(text, className, id = null) {
    const msgContainer = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `message ${className}`;
    if (id) div.id = id;

    const formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');

    div.innerHTML = formattedText;

    msgContainer.appendChild(div);
    msgContainer.scrollTop = msgContainer.scrollHeight;
}
