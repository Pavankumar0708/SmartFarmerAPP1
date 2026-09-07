// Advanced Features JavaScript

// Voice Assistant Support
const voiceConfig = {
    supported: ('webkitSpeechRecognition' in window) || ('SpeechRecognition' in window),
    currentLanguage: 'en',
    synthesis: window.speechSynthesis,
    recognition: null
};

function initVoiceAssistant() {
    if (!voiceConfig.supported) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    voiceConfig.recognition = new SpeechRecognition();
    voiceConfig.recognition.onstart = () => {
        console.log('Listening...');
    };
    voiceConfig.recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        handleVoiceCommand(transcript.toLowerCase());
    };
    voiceConfig.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
    };
}

function startVoiceInput() {
    if (voiceConfig.recognition) {
        voiceConfig.recognition.start();
    }
}

function speakText(text) {
    if (!voiceConfig.synthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceConfig.currentLanguage === 'hi' ? 'hi-IN' : voiceConfig.currentLanguage === 'te' ? 'te-IN' : 'en-US';
    voiceConfig.synthesis.speak(utterance);
}

function handleVoiceCommand(command) {
    if (command.includes('weather')) {
        navigate('weather.html');
        speakText('Opening weather page for you.');
    } else if (command.includes('market') || command.includes('price')) {
        navigate('market.html');
        speakText('Opening market prices page.');
    } else if (command.includes('crop') || command.includes('advisor')) {
        navigate('crop-advisor.html');
        speakText('Opening AI crop advisor.');
    } else if (command.includes('sell') || command.includes('selling')) {
        navigate('sell.html');
        speakText('Opening selling platform.');
    } else if (command.includes('video') || command.includes('learn')) {
        navigate('videos.html');
        speakText('Opening educational videos.');
    }
}

// Notification System
const NotificationSystem = {
    container: null,
    init() {
        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        document.body.appendChild(this.container);
    },
    show(message, type = 'success', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        this.container.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, duration);
    },
    alert(message) { this.show(message, 'alert', 4000); },
    error(message) { this.show(message, 'error', 4000); }
};

// Selling Platform Functions
const SellingPlatform = {
    products: [],
    negotiations: [],
    salesHistory: [],
    init() {
        this.loadFromStorage();
        this.bindEvents();
    },
    loadFromStorage() {
        this.products = JSON.parse(localStorage.getItem('smartFarmerProducts') || '[]');
        this.negotiations = JSON.parse(localStorage.getItem('smartFarmerNegotiations') || '[]');
        this.salesHistory = JSON.parse(localStorage.getItem('smartFarmerSalesHistory') || '[]');
    },
    save() {
        localStorage.setItem('smartFarmerProducts', JSON.stringify(this.products));
        localStorage.setItem('smartFarmerNegotiations', JSON.stringify(this.negotiations));
        localStorage.setItem('smartFarmerSalesHistory', JSON.stringify(this.salesHistory));
    },
    bindEvents() {
        const form = document.querySelector('#listProductForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleProductSubmit(e));
        }
    },
    handleProductSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const product = {
            id: Date.now(),
            name: form.productName.value,
            quantity: form.quantity.value,
            unit: form.unit.value,
            price: form.price.value,
            grade: form.grade.value,
            description: form.description.value,
            location: form.location.value,
            postedAt: new Date().toLocaleString(),
            status: 'Active'
        };
        this.products.unshift(product);
        this.save();
        this.renderProducts();
        form.reset();
        showMessage('Product listed successfully! Buyers can now contact you.');
    },
    renderProducts() {
        const grid = document.querySelector('#productListings');
        if (!grid) return;
        grid.innerHTML = this.products.map(p => `
            <div class="product-card">
                <div class="product-image">🌾</div>
                <div class="product-info">
                    <h3>${p.name} (Grade ${p.grade})</h3>
                    <p>${p.quantity} ${p.unit}</p>
                    <p style="color: var(--muted); font-size: 0.8rem;">${p.location}</p>
                </div>
                <div class="product-price">₹${p.price}/${p.unit}</div>
                <button class="ghost-btn" onclick="SellingPlatform.contactBuyer(${p.id})" style="width: 100%; margin-top: 8px;">View Offers</button>
            </div>
        `).join('');
    }
};

// Video & Reels Functions
const VideoLibrary = {
    videos: [
        { id: 1, title: 'Tomato Farming Complete Guide', category: 'cultivation', views: 25000, likes: 340, duration: '12:45', level: 'Beginner', icon: '🍅', description: 'From seed selection to a healthy harvest.' },
        { id: 2, title: 'Drip Irrigation Installation', category: 'irrigation', views: 15000, likes: 450, duration: '08:20', level: 'Intermediate', icon: '💧', description: 'Save water and improve crop consistency.' },
        { id: 3, title: 'Soil Fertility Improvement', category: 'cultivation', views: 18000, likes: 280, duration: '10:30', level: 'Beginner', icon: '🌱', description: 'Build living soil with practical field methods.' },
        { id: 4, title: 'Organic Pest Control Methods', category: 'pest-control', views: 22000, likes: 390, duration: '11:15', level: 'Intermediate', icon: '🐞', description: 'Protect crops with safer natural solutions.' },
        { id: 5, title: 'Best Fertilizers for High Yield', category: 'fertilizer', views: 16000, likes: 310, duration: '09:40', level: 'Beginner', icon: '🧪', description: 'Choose the right nutrients for each crop stage.' },
        { id: 6, title: 'Smart Water Management', category: 'irrigation', views: 12000, likes: 245, duration: '07:55', level: 'Advanced', icon: '🌾', description: 'Plan irrigation around soil and weather signals.' }
    ],
    init() {
        this.bindFilters();
        const search = document.querySelector('#videoSearch');
        search?.addEventListener('input', () => this.renderVideos(document.querySelector('.filter-tag.active')?.dataset.category || 'all', search.value));
        document.querySelectorAll('.learn-category-grid button').forEach((button) => button.addEventListener('click', () => {
            document.querySelectorAll('.filter-tag').forEach((item) => item.classList.remove('active'));
            const matchingFilter = document.querySelector(`.filter-tag[data-category="${button.dataset.category}"]`);
            matchingFilter?.classList.add('active');
            this.renderVideos(button.dataset.category);
            document.querySelector('#recommended')?.scrollIntoView({ behavior: 'smooth' });
        }));
        this.renderVideos('all');
    },
    bindFilters() {
        document.querySelectorAll('.filter-tag').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-tag').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderVideos(btn.dataset.category, document.querySelector('#videoSearch')?.value || '');
            });
        });
    },
    renderVideos(category, searchTerm = '') {
        const grid = document.querySelector('#videoGrid');
        if (!grid) return;
        const term = searchTerm.toLowerCase().trim();
        const filtered = this.videos.filter((video) => (category === 'all' || video.category === category) && (!term || `${video.title} ${video.description} ${video.category}`.toLowerCase().includes(term)));
        grid.innerHTML = filtered.map(v => `
            <article class="learn-video-card" onclick="VideoLibrary.openVideo(${v.id})">
                <div class="learn-video-thumb"><span>${v.icon}</span><b>▶</b><time>${v.duration}</time></div>
                <div class="learn-video-info"><span>${v.category.replace('-', ' ')}</span><h3>${v.title}</h3><p>${v.description}</p><small>${v.level} · ◉ ${Math.round(v.views / 1000)}K views</small></div>
            </article>
        `).join('');
    },
    openVideo(id) {
        const video = this.videos.find(v => v.id === id);
        if (!video) return;
        const modal = document.querySelector('#videoModal');
        if (modal) {
            document.querySelector('#videoTitle').textContent = video.title;
            document.querySelector('#videoDescription').textContent = video.description;
            document.querySelector('#videoViews').textContent = video.views;
            document.querySelector('#videoLikes').textContent = video.likes;
            modal.style.display = 'flex';
        }
    }
};

// Expert Consultation Functions
const ExpertConsultation = {
    experts: [
        { id: 1, name: 'Dr. Anjali Verma', specialty: 'Plant Pathologist', category: 'crop', rating: 4.8, reviews: 124, experience: '12+ years', tags: 'Disease Control|Crop Protection|Tomato', description: 'Specialist in plant diseases and integrated pest management.', avatar: '👩🏽‍🔬' },
        { id: 2, name: 'Dr. Ravi Kumar', specialty: 'Soil Specialist', category: 'soil', rating: 4.7, reviews: 98, experience: '10+ years', tags: 'Soil Health|Fertilizers|Organic Farming', description: 'Expert in soil testing, soil health improvement and nutrient management.', avatar: '👨🏽‍🔬' },
        { id: 3, name: 'Dr. Meera Singh', specialty: 'Agricultural Scientist', category: 'irrigation', rating: 4.6, reviews: 76, experience: '8+ years', tags: 'Crop Management|Irrigation|Cotton', description: 'Specializes in crop production, water management and sustainable farming.', avatar: '👩🏽‍🌾' },
        { id: 4, name: 'Mr. Amit Patel', specialty: 'Pest Control Expert', category: 'pest', rating: 4.5, reviews: 64, experience: '7+ years', tags: 'Pest Management|Insect Control|Rice', description: 'Expert in organic and chemical pest control methods for better yield.', avatar: '👨🏽‍🌾' }
    ],
    consultations: [],
    init() {
        this.loadFromStorage();
        this.renderExperts();
        this.renderSessions();
        this.bindEvents();
    },
    loadFromStorage() {
        this.consultations = JSON.parse(localStorage.getItem('smartFarmerConsultations') || '[]');
    },
    save() {
        localStorage.setItem('smartFarmerConsultations', JSON.stringify(this.consultations));
    },
    renderExperts() {
        const grid = document.querySelector('#expertGrid');
        if (!grid) return;
        grid.innerHTML = this.experts.map(e => `
            <article class="premium-expert-card"><div class="expert-card-top"><div class="expert-avatar">${e.avatar}</div><span class="expert-online">● Online</span><button class="expert-favorite" aria-label="Save ${e.name}">♡</button></div><h3>${e.name} <b>✓</b></h3><p class="expert-specialty">${e.specialty}</p><div class="expert-stats"><span>★ ${e.rating} <small>(${e.reviews} reviews)</small></span><span>◷ ${e.experience}</span></div><div class="expert-tags">${e.tags.split('|').map(tag => `<span>${tag}</span>`).join('')}</div><p class="expert-description">${e.description}</p><button class="btn" onclick="ExpertConsultation.selectExpert(${e.id})">▣ Book Session</button></article>
        `).join('');
        const select = document.querySelector('#consultationExpert');
        if (select) {
            select.innerHTML = this.experts.map(e => `<option value="${e.id}">${e.name} - ${e.specialty}</option>`).join('');
        }
    },
    bindEvents() {
        const search = document.querySelector('#expertSearch');
        const category = document.querySelector('#expertCategory');
        const renderFiltered = () => {
            const term = search?.value.toLowerCase() || '';
            document.querySelectorAll('.premium-expert-card').forEach((card) => {
                const matchesText = card.textContent.toLowerCase().includes(term);
                const matchesCategory = !category?.value || card.querySelector('.expert-tags')?.textContent.toLowerCase().includes(category.value);
                card.style.display = matchesText && matchesCategory ? '' : 'none';
            });
        };
        search?.addEventListener('input', renderFiltered);
        category?.addEventListener('change', renderFiltered);
        const form = document.querySelector('#bookConsultationForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleBooking(e));
        }
    },
    handleBooking(e) {
        e.preventDefault();
        const form = e.target;
        const consultation = {
            id: Date.now(),
            expertId: form.consultationExpert.value,
            type: form.consultationType.value,
            date: form.consultationDate.value,
            time: form.consultationTime.value,
            topic: form.consultationTopic.value,
            status: 'Scheduled'
        };
        this.consultations.unshift(consultation);
        this.save();
        this.renderSessions();
        form.reset();
        showMessage('Consultation booked successfully!');
    },
    selectExpert(id) {
        const expert = this.experts.find(e => e.id === id);
        if (!expert) return;
        const select = document.querySelector('#consultationExpert');
        if (select) select.value = String(expert.id);
        document.querySelector('#bookConsultationForm')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        NotificationSystem.show(`${expert.name} selected. Choose a time to book your session.`);
    },
    renderSessions() {
        const container = document.querySelector('#upcomingSessions');
        if (!container) return;
        const sessions = this.consultations.length ? this.consultations : [
            { expertId: 1, type: 'text', date: '2025-05-24', time: '10:30', status: 'Confirmed' },
            { expertId: 2, type: 'video', date: '2025-05-26', time: '16:00', status: 'Pending' },
            { expertId: 4, type: 'text', date: '2025-05-29', time: '11:00', status: 'Confirmed' }
        ];
        container.innerHTML = sessions.map(c => {
            const expert = this.experts.find(e => e.id == c.expertId);
            return `
                <div class="session-card">
                    <strong>${expert?.name}</strong><br />
                    📅 ${c.date} at ${c.time}<br />
                    📱 ${c.type === 'text' ? 'Text Chat' : c.type === 'call' ? 'Voice Call' : 'Video Call'}<br />
                    <span style="font-size: 0.8rem; color: var(--muted);">${c.status}</span>
                </div>
            `;
        }).join('');
    }
};

// Community Forum Functions
const CommunityForum = {
    posts: [
        { id: 1, content: 'Tomato leaves are turning yellow from the edges. What could be the reason and how can I control it?', author: 'Ramesh Yadav', location: 'Warangal, Telangana', time: '2 hours ago', topic: 'Tomato Cultivation', likes: 12, comments: 8, image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=900&q=80', type: 'questions' },
        { id: 2, content: 'What is the best irrigation schedule for cotton crop during summer? Drip irrigation or sprinkler – which is better?', author: 'Suresh Patil', location: 'Nashik, Maharashtra', time: '5 hours ago', topic: 'Irrigation Tips', likes: 18, comments: 15, image: '', type: 'questions' },
        { id: 3, content: 'How can I control stem borer in paddy crop naturally? Please suggest some organic methods.', author: 'Hanumanthappa', location: 'Bellary, Karnataka', time: '7 hours ago', topic: 'Pest Management', likes: 22, comments: 10, image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=900&q=80', type: 'tips' }
    ],
    trending: ['Tomato Cultivation', 'Irrigation Tips', 'Pest Management', 'Soil Health', 'Weather', 'Market Prices', 'Farming Equipment'],
    announcements: ['New Government Scheme · PM Kisan 17th installment released.', 'Weather Alert · Heavy rainfall expected in Telangana.', 'Important Farming Update · New organic training program available.'],
    init() {
        this.loadFromStorage();
        this.renderTrending();
        this.renderAnnouncements();
        this.renderPosts();
        this.bindEvents();
    },
    loadFromStorage() {
        const saved = JSON.parse(localStorage.getItem('smartFarmerCommunityPosts') || 'null');
        if (Array.isArray(saved) && saved.length) this.posts = saved;
    },
    save() {
        localStorage.setItem('smartFarmerCommunityPosts', JSON.stringify(this.posts));
    },
    bindEvents() {
        const submitBtn = document.querySelector('#submitPostBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.createPost());
        }
        document.querySelectorAll('.filter-tag').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-tag').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderPosts(btn.dataset.filter);
            });
        });
    },
    createPost() {
        const textarea = document.querySelector('#postContent');
        if (!textarea || !textarea.value.trim()) {
            NotificationSystem.error('Please write something before posting.');
            return;
        }
        const post = {
            id: Date.now(),
            content: textarea.value,
            author: 'You',
            time: new Date().toLocaleString(),
            likes: 0,
            comments: 0,
            liked: false
        };
        this.posts.unshift(post);
        this.save();
        this.renderPosts();
        textarea.value = '';
        NotificationSystem.show('Post shared successfully!');
    },
    renderTrending() {
        const container = document.querySelector('#trendingTopics');
        if (!container) return;
        container.innerHTML = this.trending.map(t => `
            <div class="trending-item">#${t}</div>
        `).join('');
    },
    renderAnnouncements() {
        const container = document.querySelector('#announcements');
        if (!container) return;
        container.innerHTML = this.announcements.map(a => `
            <div class="announcement-item">📢 ${a}</div>
        `).join('');
    },
    renderPosts(filter = 'recent') {
        let postsToShow = [...this.posts];
        if (filter === 'popular') {
            postsToShow.sort((a, b) => b.likes - a.likes);
        }
        if (['questions', 'tips', 'expert'].includes(filter)) {
            postsToShow = postsToShow.filter((post) => post.type === filter);
        }
        if (filter === 'mine') {
            postsToShow = postsToShow.filter((post) => post.author === 'You');
        }
        const container = document.querySelector('#postsFeed');
        if (!container) return;
        container.innerHTML = postsToShow.map(p => `
            <article class="community-post-card">
                <div class="post-header"><div class="post-avatar">👨🏽‍🌾</div><div class="post-author-info"><p><b>${p.author}</b> <small>✓ Verified Farmer</small></p><p class="post-time">${p.location || 'India'} · ${p.time}</p></div><span class="post-topic">🌱 ${p.topic || 'Farm Talk'}</span><button class="post-more">⋮</button></div>
                <p class="post-content">${p.content}</p>${p.image ? `<div class="post-image"><img src="${p.image}" alt="${p.topic || 'Crop'} discussion image" onerror="this.parentElement.style.display='none'"></div>` : ''}
                <div class="post-meta"><span>👍 ${p.likes} Likes</span><span>▱ ${p.comments} Comments</span></div><div class="post-actions"><button onclick="CommunityForum.likePost(${p.id})">♧ Like</button><button>▱ Comment</button><button>⌁ Share</button><button>▱ Save</button><button class="report">Report</button></div>
            </article>
        `).join('');
    },
    likePost(id) {
        const post = this.posts.find(p => p.id === id);
        if (post) {
            post.liked = !post.liked;
            post.likes += post.liked ? 1 : -1;
            this.save();
            this.renderPosts();
        }
    }
};

// Notifications & Alerts
const SmartNotifications = {
    sendWeatherAlert() {
        NotificationSystem.alert('⛈️ Heavy rain expected tonight. Prepare your fields.');
    },
    sendMarketAlert() {
        NotificationSystem.show('📈 Tomato prices up 5% in your region.');
    },
    sendSchemeAlert() {
        NotificationSystem.show('🏛️ New PM-KISAN installment released!');
    },
    sendCropAlert() {
        NotificationSystem.alert('🦗 Pest alert: Armyworm detected in nearby farms.');
    },
    sendIrrigationReminder() {
        NotificationSystem.show('💧 It\'s time to irrigate. Soil moisture is low.');
    }
};

// Modal functionality
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Dashboard quick action handlers
function setupDashboardActions() {
    const voiceBtn = document.querySelector('#voiceAssistantBtn');
    if (voiceBtn) {
        voiceBtn.addEventListener('click', () => {
            startVoiceInput();
            NotificationSystem.show('🎤 Listening... Ask me about weather, markets, or farming.');
        });
    }

    const notificationBtn = document.querySelector('#notificationDemoBtn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', () => {
            SmartNotifications.sendWeatherAlert();
            setTimeout(() => SmartNotifications.sendMarketAlert(), 500);
            setTimeout(() => SmartNotifications.sendCropAlert(), 1000);
        });
    }
}

// Initialize all features on page load
function initAdvancedFeatures() {
    initVoiceAssistant();
    NotificationSystem.init();
    setupModals();
    setupDashboardActions();
    
    if (document.querySelector('#listProductForm')) {
        SellingPlatform.init();
    }
    if (document.querySelector('#videoGrid')) {
        VideoLibrary.init();
    }
    if (document.querySelector('#expertGrid')) {
        ExpertConsultation.init();
    }
    if (document.querySelector('#postsFeed')) {
        CommunityForum.init();
    }
    
    // Demo notifications - only if on dashboard
    if (window.location.pathname.includes('dashboard')) {
        setTimeout(() => SmartNotifications.sendWeatherAlert(), 4000);
        setTimeout(() => SmartNotifications.sendMarketAlert(), 7000);
    }
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdvancedFeatures);
} else {
    initAdvancedFeatures();
}
