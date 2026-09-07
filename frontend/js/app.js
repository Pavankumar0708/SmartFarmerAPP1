const API_BASE = 'http://localhost:8080/api';
const STORAGE_USER = 'smartFarmerDemoUser';
const STORAGE_CART = 'smartFarmerCart';

const apiRequest = async (path, options = {}) => {
    const response = await fetch(`${API_BASE}${path}`, {
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options,
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'Server error.');
    }
    return data;
};

const toggleMobileNav = () => {
    const links = document.querySelector('.nav-links');
    if (!links) return;
    links.classList.toggle('open');
};

const showMessage = (message, type = 'success') => {
    const el = document.querySelector('.status-message');
    if (!el) return;
    el.textContent = message;
    el.className = `status-message ${type}`;
    setTimeout(() => {
        el.className = 'status-message';
    }, 3500);
};

const setDemoUser = (profile) => {
    localStorage.setItem(STORAGE_USER, JSON.stringify(profile));
};

const getDemoUser = () => JSON.parse(localStorage.getItem(STORAGE_USER) || 'null');

const saveProfilePhoto = (photoData) => {
    localStorage.setItem('smartFarmerProfilePhoto', photoData);
};

const getProfilePhoto = () => localStorage.getItem('smartFarmerProfilePhoto') || null;

const generateDefaultAvatar = (name = 'Farmer') => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    // Green gradient background
    const gradient = ctx.createLinearGradient(0, 0, 200, 200);
    gradient.addColorStop(0, '#136f3a');
    gradient.addColorStop(1, '#2fbf71');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 200, 200);
    
    // White circle for initials
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(100, 100, 60, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw initials
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    ctx.fillStyle = '#136f3a';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initials, 100, 100);
    
    return canvas.toDataURL();
};

const getCart = () => JSON.parse(localStorage.getItem(STORAGE_CART) || '[]');
const saveCart = (cart) => localStorage.setItem(STORAGE_CART, JSON.stringify(cart));

const updateActiveNav = () => {
    const path = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach((link) => {
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

const weatherDemo = {
    temperature: 31,
    description: 'Partly cloudy skies',
    humidity: 68,
    windSpeed: 14,
    uvIndex: 6,
    airQuality: 'Good',
    rainChance: '32%',
    alert: 'No severe weather alerts at this time.',
    alerts: 'No severe weather alerts at this time.',
    soilMoisture: 'Moderate',
    cropStress: 'Low',
    irrigationTip: 'Water in the early morning',
    harvestWindow: '2 days',
    tips: [
        'Use drip irrigation in the morning to conserve moisture.',
        'Avoid spraying during the afternoon wind gusts.',
        'Prepare drainage for forecasted showers.'
    ],
    forecast: [
        { day: 'Mon', icon: '☀️', label: 'Sunny', temp: '30°C', rain: '10%', description: 'Warm with light winds' },
        { day: 'Tue', icon: '🌤️', label: 'Mild', temp: '32°C', rain: '20%', description: 'Partly cloudy and dry' },
        { day: 'Wed', icon: '⛅', label: 'Breezy', temp: '29°C', rain: '45%', description: 'Clouds building with showers' },
        { day: 'Thu', icon: '🌧️', label: 'Wet', temp: '28°C', rain: '55%', description: 'Rain is likely, keep equipment covered' },
        { day: 'Fri', icon: '🌤️', label: 'Clear', temp: '31°C', rain: '25%', description: 'Good drying conditions after rain' },
        { day: 'Sat', icon: '☀️', label: 'Hot', temp: '33°C', rain: '15%', description: 'Sunny and ideal for field work' },
        { day: 'Sun', icon: '⛅', label: 'Cool', temp: '30°C', rain: '30%', description: 'Mix of sun and showers' }
    ],
    tempTrend: [
        { day: 'Mon', height: '68%', value: '30°C' },
        { day: 'Tue', height: '75%', value: '32°C' },
        { day: 'Wed', height: '63%', value: '29°C' },
        { day: 'Thu', height: '60%', value: '28°C' },
        { day: 'Fri', height: '70%', value: '31°C' },
        { day: 'Sat', height: '78%', value: '33°C' },
        { day: 'Sun', height: '68%', value: '30°C' }
    ],
    rainTrend: [
        { day: 'Mon', height: '20%', value: '8mm' },
        { day: 'Tue', height: '30%', value: '12mm' },
        { day: 'Wed', height: '55%', value: '20mm' },
        { day: 'Thu', height: '65%', value: '24mm' },
        { day: 'Fri', height: '35%', value: '14mm' },
        { day: 'Sat', height: '25%', value: '10mm' },
        { day: 'Sun', height: '40%', value: '16mm' }
    ]
};

const marketDemo = {
    ranges: {
        daily: [
            { crop: 'Tomato', price: '₹28/kg', change: '+4%' },
            { crop: 'Onion', price: '₹18/kg', change: '-3%' },
            { crop: 'Wheat', price: '₹1950/qtl', change: '+1.1%' }
        ],
        weekly: [
            { crop: 'Tomato', price: '₹25/kg', change: '+12%' },
            { crop: 'Onion', price: '₹16/kg', change: '+5%' },
            { crop: 'Potato', price: '₹12/kg', change: '+2%' }
        ],
        monthly: [
            { crop: 'Tomato', price: '₹22/kg', change: '+20%' },
            { crop: 'Rice', price: '₹2300/qtl', change: '+6%' },
            { crop: 'Wheat', price: '₹1920/qtl', change: '+3%' }
        ],
        yearly: [
            { crop: 'Tomato', price: '₹21/kg', change: '+24%' },
            { crop: 'Rice', price: '₹2250/qtl', change: '+8%' },
            { crop: 'Pulse', price: '₹320/kg', change: '+11%' }
        ]
    },
    trends: [
        { day: 'Mon', height: '60%', value: '₹25' },
        { day: 'Tue', height: '68%', value: '₹27' },
        { day: 'Wed', height: '72%', value: '₹28' },
        { day: 'Thu', height: '65%', value: '₹26' },
        { day: 'Fri', height: '75%', value: '₹29' }
    ],
    mandis: [
        'Delhi: Tomato ₹27/kg, Onion ₹19/kg',
        'Mumbai: Tomato ₹29/kg, Onion ₹18/kg',
        'Hyderabad: Tomato ₹28/kg, Onion ₹20/kg'
    ],
    intelligence: {
        Tomato: {
            unit: '₹/kg',
            series: {
                today: [27.2, 27.5, 27.8, 28.1, 28.4, 28.2, 28.6],
                '7-days': [25.4, 26.1, 26.8, 27.2, 27.8, 28.1, 28.6],
                '30-days': [22.8, 23.6, 24.4, 25.1, 26.2, 27.4, 28.6],
                '3-months': [19.5, 20.8, 22.1, 23.7, 25.2, 27.1, 28.6]
            },
            average: '₹27.7', highest: '₹28.6', lowest: '₹27.2', change: '+12.6%',
            gainer: 'Tomato', gainerChange: '+4.2%', loser: 'Onion', loserChange: '-2.1%',
            insight: 'Tomato prices are rising due to lower supply.', opportunity: 'Best selling opportunity: Mumbai Mandi.', forecastNote: 'Expected price increase in the next 3 days.',
            forecast: [28.9, 29.3, 29.8]
        },
        Onion: {
            unit: '₹/kg',
            series: { today: [18.9, 18.7, 18.5, 18.2, 18.1, 18.3, 18], '7-days': [19.4, 19.1, 18.8, 18.5, 18.3, 18.2, 18], '30-days': [21.5, 21, 20.2, 19.6, 19, 18.6, 18], '3-months': [24, 22.8, 21.4, 20.3, 19.5, 18.7, 18] },
            average: '₹18.4', highest: '₹18.9', lowest: '₹18.0', change: '-2.1%',
            gainer: 'Tomato', gainerChange: '+4.2%', loser: 'Onion', loserChange: '-2.1%',
            insight: 'Onion arrivals are increasing across southern mandis.', opportunity: 'Hold stock for stronger weekend demand.', forecastNote: 'Expected price stability in the next 3 days.', forecast: [18.1, 18.3, 18.5]
        },
        Wheat: { unit: '₹/qtl', series: { today: [1920, 1930, 1940, 1945, 1950, 1948, 1955], '7-days': [1880, 1895, 1910, 1925, 1935, 1945, 1955], '30-days': [1810, 1840, 1870, 1900, 1920, 1940, 1955], '3-months': [1720, 1770, 1820, 1870, 1910, 1935, 1955] }, average: '₹1,940', highest: '₹1,955', lowest: '₹1,920', change: '+1.8%', gainer: 'Wheat', gainerChange: '+1.8%', loser: 'Onion', loserChange: '-2.1%', insight: 'Wheat demand remains steady with firm procurement activity.', opportunity: 'A stable window to sell near Hyderabad Mandi.', forecastNote: 'Expected gradual increase in the next 3 days.', forecast: [1965, 1972, 1980] },
        Rice: { unit: '₹/qtl', series: { today: [2160, 2170, 2180, 2190, 2200, 2205, 2210], '7-days': [2110, 2130, 2150, 2165, 2180, 2195, 2210], '30-days': [2020, 2050, 2080, 2120, 2160, 2185, 2210], '3-months': [1940, 1980, 2020, 2070, 2120, 2170, 2210] }, average: '₹2,174', highest: '₹2,210', lowest: '₹2,160', change: '+3.0%', gainer: 'Rice', gainerChange: '+3.0%', loser: 'Onion', loserChange: '-2.1%', insight: 'Rice is gaining support from strong wholesale demand.', opportunity: 'Sell surplus at Vijayawada Mandi this week.', forecastNote: 'Expected price increase in the next 3 days.', forecast: [2220, 2240, 2265] },
        Cotton: { unit: '₹/qtl', series: { today: [6420, 6450, 6480, 6500, 6490, 6520, 6550], '7-days': [6320, 6360, 6400, 6440, 6480, 6510, 6550], '30-days': [6100, 6180, 6250, 6350, 6420, 6490, 6550], '3-months': [5850, 5980, 6120, 6280, 6400, 6490, 6550] }, average: '₹6,438', highest: '₹6,550', lowest: '₹6,420', change: '+3.7%', gainer: 'Cotton', gainerChange: '+3.7%', loser: 'Onion', loserChange: '-2.1%', insight: 'Cotton is supported by export demand and lower arrivals.', opportunity: 'Compare bids before committing large lots.', forecastNote: 'Expected firm prices in the next 3 days.', forecast: [6580, 6620, 6670] },
        Maize: { unit: '₹/qtl', series: { today: [2180, 2190, 2210, 2200, 2220, 2240, 2250], '7-days': [2110, 2140, 2160, 2180, 2200, 2225, 2250], '30-days': [1980, 2020, 2070, 2110, 2160, 2210, 2250], '3-months': [1860, 1920, 1980, 2050, 2120, 2190, 2250] }, average: '₹2,206', highest: '₹2,250', lowest: '₹2,180', change: '+4.1%', gainer: 'Maize', gainerChange: '+4.1%', loser: 'Onion', loserChange: '-2.1%', insight: 'Maize demand is rising from feed and starch processors.', opportunity: 'Warangal offers the strongest nearby bid today.', forecastNote: 'Expected price increase in the next 3 days.', forecast: [2270, 2295, 2320] }
    },
    recommendation: 'Sell tomatoes in Mumbai if you can transport within 24h. Watch onion prices in Delhi for a better entry point.',
    topGainer: 'Tomato +4%',
    topDecliner: 'Onion -3%'
};

const schemesDemo = [
    {
        id: 'pm-kisan',
        name: 'PM-KISAN',
        details: 'Direct income support for eligible landholding farmers.',
        eligibility: 'Cultivating farmers with registered land.',
        benefit: '₹6,000 per year in three installments.',
        steps: 'Submit Aadhaar, land records, and bank details.'
    },
    {
        id: 'soil-health-card',
        name: 'Soil Health Card',
        details: 'Farm-level soil testing and nutrient recommendations.',
        eligibility: 'All farmers with cultivable plots.',
        benefit: 'Free soil test and correct fertilizer advice.',
        steps: 'Upload soil sample and location details.'
    },
    {
        id: 'crop-insurance',
        name: 'Crop Insurance',
        details: 'Weather and yield protection assistance for sudden losses.',
        eligibility: 'Farmers growing notified crops.',
        benefit: 'Compensation for weather damage and crop failure.',
        steps: 'Provide crop area, expected yield and farmer details.'
    }
];

const updatesDemo = [
    {
        type: 'News',
        title: 'Pulse prices rise across southern mandis',
        summary: 'Strong demand and tight supply pushed pulses higher today.',
        time: '2h ago'
    },
    {
        type: 'Announcement',
        title: 'Government announces irrigation subsidy',
        summary: 'New support available for micro-irrigation systems in dry zones.',
        time: '5h ago'
    },
    {
        type: 'Alert',
        title: 'Heavy rain expected this evening',
        summary: 'Localized showers may affect harvest and transport.',
        time: '1d ago'
    },
    {
        type: 'Scheme',
        title: 'Organic farming incentive now open',
        summary: 'Apply for additional support on organic input purchases.',
        time: '2d ago'
    }
];

const SCHEME_APPLICATIONS_KEY = 'smartFarmerSchemeApplications';

async function registerUser(evt) {
    evt.preventDefault();
    const form = evt.target;
    const payload = {
        name: form.name.value,
        mobile: form.mobile.value,
        aadhaar: form.aadhaar.value,
        village: form.village.value,
        landSize: Number(form.landSize.value),
        crop: form.crop.value,
        password: form.password.value,
    };

    try {
        const user = await apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
        setDemoUser(user);
        showMessage(`Registration successful. Welcome ${user.name}!`);
        setTimeout(() => navigate('dashboard.html'), 1200);
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

async function loginUser(evt) {
    evt.preventDefault();
    const form = evt.target;
    const payload = {
        mobile: form.mobile.value,
        password: form.password.value,
    };
    try {
        const user = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
        setDemoUser(user);
        showMessage(`Welcome back, ${user.name}!`);
        setTimeout(() => navigate('dashboard.html'), 1000);
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

async function requestOtp(evt) {
    evt.preventDefault();
    const mobile = document.querySelector('#otpMobile')?.value;
    if (!mobile) return showMessage('Enter a mobile number first.', 'error');
    try {
        const data = await apiRequest('/auth/request-otp', {
            method: 'POST',
            body: JSON.stringify({ mobile }),
        });
        showMessage(`OTP sent to ${mobile}. Demo OTP: ${data.otp}`);
        // Show the OTP verification section
        const otpSection = document.querySelector('#otpVerificationSection');
        if (otpSection) {
            otpSection.style.display = 'block';
        }
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

async function verifyOtp(evt) {
    evt.preventDefault();
    const mobile = document.querySelector('#otpMobile')?.value;
    const otp = document.querySelector('#otpCode')?.value;
    
    if (!mobile) return showMessage('Mobile number is required.', 'error');
    if (!otp) return showMessage('OTP is required.', 'error');
    
    try {
        const data = await apiRequest('/auth/verify-otp', {
            method: 'POST',
            body: JSON.stringify({ mobile, otp }),
        });
        if (data.verified) {
            showMessage(`OTP verified successfully for ${mobile}!`);
            // Store mobile for later use if needed
            localStorage.setItem('verifiedMobile', mobile);
            // Redirect to dashboard after successful verification
            setTimeout(() => {
                navigate('dashboard.html');
            }, 1200);
        } else {
            showMessage('OTP verification failed. Please try again.', 'error');
        }
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

async function loadDashboardData() {
    const user = getDemoUser();
    const heroName = document.querySelector('#heroFarmerName');
    const heroWeatherSummary = document.querySelector('#heroWeatherSummary');
    const heroWeatherTemp = document.querySelector('#heroWeatherTemp');
    const heroMarketPulse = document.querySelector('#heroMarketPulse');
    const heroCropAdvice = document.querySelector('#heroCropAdvice');
    const alertMessage = document.querySelector('#alertMessage');
    const priceUpdates = document.querySelector('#priceUpdates');
    const farmRecommendation = document.querySelector('#farmRecommendation');
    const kpiOrders = document.querySelector('#kpiOrders');
    const kpiLoans = document.querySelector('#kpiLoans');
    const kpiProducts = document.querySelector('#kpiProducts');
    const kpiAdvice = document.querySelector('#kpiAdvice');

    const defaultWeatherText = 'Sunny skies with mild winds. Ideal for irrigation planning.';
    const defaultMarketText = 'Tomato market is trending upward in nearby mandis today.';
    const defaultAdviceText = 'Tomato is the best fit for your current farm conditions.';

    if (heroName) {
        heroName.textContent = user?.name || 'Farmer';
    }
    if (heroWeatherSummary) {
        heroWeatherSummary.textContent = defaultWeatherText;
    }
    if (heroWeatherTemp) {
        heroWeatherTemp.textContent = '28°C • Sunny';
    }
    if (heroMarketPulse) {
        heroMarketPulse.textContent = 'Tomato ₹28/kg';
    }
    if (heroCropAdvice) {
        heroCropAdvice.textContent = 'Irrigate before noon';
    }
    if (alertMessage) {
        alertMessage.textContent = 'Heat advisory for the afternoon. Protect young seedlings and irrigate early.';
    }
    if (priceUpdates) {
        priceUpdates.textContent = 'Tomato ₹28/kg, Onion ₹18/kg, Wheat ₹1950/qtl.';
    }
    if (farmRecommendation) {
        farmRecommendation.textContent = 'Schedule irrigation for early morning and monitor pest activity closely.';
    }
    if (kpiOrders) {
        kpiOrders.textContent = '12';
    }
    if (kpiLoans) {
        kpiLoans.textContent = '3';
    }
    if (kpiProducts) {
        kpiProducts.textContent = '8';
    }
    if (kpiAdvice) {
        kpiAdvice.textContent = '5';
    }

    try {
        const weatherData = await apiRequest('/weather');
        if (heroWeatherSummary) {
            heroWeatherSummary.textContent = `${weatherData.description || 'Stable conditions'} across your region.`;
        }
        if (heroWeatherTemp) {
            heroWeatherTemp.textContent = `${weatherData.temperature}°C • ${weatherData.description || 'Clear'}`;
        }
        if (alertMessage) {
            alertMessage.textContent = weatherData.alert || 'No severe weather alerts at this time.';
        }
    } catch (error) {
        console.warn('Dashboard weather sample used:', error.message);
    }

    try {
        const marketData = await apiRequest('/market');
        if (heroMarketPulse) {
            const prices = marketData.prices || { Tomato: '28/kg' };
            const first = Object.entries(prices)[0];
            heroMarketPulse.textContent = `${first[0]} ${first[1]}`;
        }
        if (priceUpdates) {
            const updates = marketData.trends || [{ day: 'Mon', height: '40%', price: 'Tomato ₹28/kg' }];
            priceUpdates.textContent = updates.slice(0, 3).map((item) => `${item.day}: ${item.price || item.height}`).join(' • ');
        }
    } catch (error) {
        console.warn('Dashboard market sample used:', error.message);
    }
}

async function loadWeatherPage() {
    const weatherElement = document.querySelector('#currentWeather');
    const weatherSummary = document.querySelector('#weatherSummary');
    const humidityValue = document.querySelector('#humidityValue');
    const windSpeedValue = document.querySelector('#windSpeedValue');
    const uvIndexValue = document.querySelector('#uvIndexValue');
    const airQualityValue = document.querySelector('#airQualityValue');
    const soilMoisture = document.querySelector('#soilMoisture');
    const cropStress = document.querySelector('#cropStress');
    const irrigationTip = document.querySelector('#irrigationTip');
    const harvestWindow = document.querySelector('#harvestWindow');
    const weatherAlerts = document.querySelector('#weatherAlerts');
    const forecastContainer = document.querySelector('#forecastCards');
    const temperatureChart = document.querySelector('#temperatureChart');
    const rainfallChart = document.querySelector('#rainfallChart');
    const weatherTips = document.querySelector('#weatherTips');

    const weatherData = { ...weatherDemo };
    try {
        const apiData = await apiRequest('/weather');
        Object.assign(weatherData, apiData);
        if (Array.isArray(apiData.forecast)) weatherData.forecast = apiData.forecast;
        if (Array.isArray(apiData.tempTrend)) weatherData.tempTrend = apiData.tempTrend;
        if (Array.isArray(apiData.rainTrend)) weatherData.rainTrend = apiData.rainTrend;
    } catch (error) {
        console.warn('Weather API not available:', error.message);
    }

    if (weatherElement) weatherElement.textContent = `${weatherData.temperature ?? '--'}°C`;
    if (weatherSummary) weatherSummary.textContent = `${weatherData.description || 'Clear skies'} • Humidity ${weatherData.humidity ?? '--'}% • Wind ${weatherData.windSpeed ?? '--'} km/h • Rain chance: ${weatherData.rainChance || '—'}`;
    if (humidityValue) humidityValue.textContent = `${weatherData.humidity ?? '--'}%`;
    if (windSpeedValue) windSpeedValue.textContent = `${weatherData.windSpeed ?? '--'} km/h`;
    if (uvIndexValue) uvIndexValue.textContent = weatherData.uvIndex ?? '—';
    if (airQualityValue) airQualityValue.textContent = weatherData.airQuality;
    if (soilMoisture) soilMoisture.textContent = weatherData.soilMoisture;
    if (cropStress) cropStress.textContent = weatherData.cropStress;
    if (irrigationTip) irrigationTip.textContent = weatherData.irrigationTip;
    if (harvestWindow) harvestWindow.textContent = weatherData.harvestWindow;
    if (weatherAlerts) weatherAlerts.textContent = weatherData.alert || weatherData.alerts || 'No severe weather alerts at this time.';
    if (weatherTips) weatherTips.innerHTML = weatherData.tips.map((tip) => `<li>${tip}</li>`).join('');
    if (temperatureChart) renderTrendChart(temperatureChart, weatherData.tempTrend);
    if (rainfallChart) renderBarChart(rainfallChart, weatherData.rainTrend);
    if (forecastContainer) {
        forecastContainer.innerHTML = weatherData.forecast.map((item) => {
            const day = item.day || 'Day';
            const icon = item.icon || '☀️';
            const label = item.label || 'Clear';
            const temp = item.temp || '--';
            const description = item.description || 'Forecast unavailable';
            const rain = item.rain || '—';
            return `
            <div class="forecast-item">
                <div class="forecast-top">
                    <span class="forecast-day">${day}</span>
                    <span class="forecast-badge">${label}</span>
                </div>
                <div class="forecast-icon">${icon}</div>
                <div class="forecast-temp">${temp}</div>
                <div class="forecast-desc">${description}</div>
                <div class="forecast-meta">Rain chance: ${rain}</div>
            </div>
        `;
        }).join('');
    }
}

function renderTrendChart(container, points) {
    if (!container) return;
    container.innerHTML = points.map((item) => `
        <div class="trend-point">
            <span class="trend-value">${item.value}</span>
            <div class="trend-bar" style="height:${item.height};"></div>
            <span class="trend-label">${item.day}</span>
        </div>
    `).join('');
}

function renderBarChart(container, points) {
    if (!container) return;
    container.innerHTML = points.map((item) => `
        <div class="bar" style="height:${item.height};"><span>${item.day}</span></div>
    `).join('');
}

async function loadMarketPage() {
    const marketData = { ...marketDemo };
    try {
        const apiData = await apiRequest('/market');
        if (apiData.ranges) marketData.ranges = apiData.ranges;
        if (Array.isArray(apiData.trends)) marketData.trends = apiData.trends;
        if (Array.isArray(apiData.mandis)) marketData.mandis = apiData.mandis;
        if (apiData.recommendation) marketData.recommendation = apiData.recommendation;
        if (apiData.topGainer) marketData.topGainer = apiData.topGainer;
        if (apiData.topDecliner) marketData.topDecliner = apiData.topDecliner;
    } catch (error) {
        console.warn('Market API not available:', error.message);
    }

    const cropSelect = document.querySelector('#intelligenceCrop');
    const periodButtons = document.querySelectorAll('#marketTimeFilters .time-filter');
    const trendCanvas = document.querySelector('#marketTrendChart');
    const forecastCanvas = document.querySelector('#priceForecastChart');
    if (!cropSelect || !trendCanvas || !forecastCanvas || typeof Chart === 'undefined') return;

    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let trendChart;
    let forecastChart;
    const setText = (id, value) => { const element = document.querySelector(`#${id}`); if (element) element.textContent = value; };

    const renderIntelligence = (crop = cropSelect.value, period = '7-days') => {
        const data = marketData.intelligence[crop] || marketData.intelligence.Tomato;
        const values = data.series[period];
        setText('chartCropName', `${crop} price`);
        setText('chartUnit', data.unit);
        setText('averagePrice', data.average);
        setText('highestPrice', data.highest);
        setText('lowestPrice', data.lowest);
        setText('weeklyChange', data.change);
        setText('topGainer', `${data.gainer} ${data.gainerChange}`);
        setText('topDecliner', `${data.loser} ${data.loserChange}`);
        setText('marketInsight', data.insight);
        setText('marketOpportunity', data.opportunity);
        setText('marketForecastNote', data.forecastNote);
        data.forecast.forEach((value, index) => setText(['forecastDayOne', 'forecastDayTwo', 'forecastDayThree'][index], `₹${value}`));
        const chartOptions = { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false }, plugins: { legend: { display: false }, tooltip: { callbacks: { label: (context) => ` ${context.parsed.y} ${data.unit}` } } }, scales: { y: { border: { display: false }, grid: { color: 'rgba(19,111,58,0.08)' }, ticks: { color: '#6a8172', callback: (value) => `₹${value}` } }, x: { border: { display: false }, grid: { display: false }, ticks: { color: '#6a8172' } } } };
        if (trendChart) trendChart.destroy();
        trendChart = new Chart(trendCanvas, { type: 'line', data: { labels, datasets: [{ data: values, borderColor: '#136f3a', backgroundColor: 'rgba(47,191,113,0.14)', fill: true, tension: 0.42, borderWidth: 3, pointRadius: 4, pointHoverRadius: 6, pointBackgroundColor: '#fff', pointBorderColor: '#136f3a', pointBorderWidth: 2 }] }, options: chartOptions });
        if (forecastChart) forecastChart.destroy();
        forecastChart = new Chart(forecastCanvas, { type: 'line', data: { labels: ['Today', '+1 day', '+2 days', '+3 days'], datasets: [{ data: [values[values.length - 1], ...data.forecast], borderColor: '#e39a32', backgroundColor: 'rgba(227,154,50,0.12)', fill: true, tension: 0.38, borderWidth: 2.5, pointRadius: 3, pointBackgroundColor: '#fff', pointBorderColor: '#e39a32', pointBorderWidth: 2 }] }, options: { ...chartOptions, scales: { y: { ...chartOptions.scales.y, ticks: { ...chartOptions.scales.y.ticks, maxTicksLimit: 4 } }, x: chartOptions.scales.x } } });
    };

    cropSelect.addEventListener('change', () => renderIntelligence(cropSelect.value, document.querySelector('.time-filter.active')?.dataset.period || '7-days'));
    periodButtons.forEach((button) => button.addEventListener('click', () => { periodButtons.forEach((item) => item.classList.remove('active')); button.classList.add('active'); renderIntelligence(cropSelect.value, button.dataset.period); }));
    renderIntelligence();
}

async function loadSchemesPage() {
    const schemeGrid = document.querySelector('#schemeGrid');
    const schemeSelect = document.querySelector('#schemeSelect');
    const schemeForm = document.querySelector('#schemeForm');
    const applicationStatus = document.querySelector('#applicationStatus');
    const schemeDetails = document.querySelector('#schemeDetails');

    const schemeData = [...schemesDemo];
    try {
        const apiData = await apiRequest('/schemes');
        if (Array.isArray(apiData) && apiData.length) {
            schemeData.splice(0, schemeData.length, ...apiData);
        }
    } catch (error) {
        console.warn('Scheme API not available:', error.message);
    }

    function renderSchemeCards() {
        if (!schemeGrid) return;
        schemeGrid.innerHTML = schemeData.map((scheme) => `
            <div class="scheme-card">
                <h3>${scheme.name}</h3>
                <p>${scheme.details}</p>
                <p><strong>Eligibility:</strong> ${scheme.eligibility}</p>
                <p><strong>Benefit:</strong> ${scheme.benefit}</p>
                <button class="btn scheme-select" data-scheme-id="${scheme.id}">Apply Now</button>
            </div>
        `).join('');
        schemeGrid.querySelectorAll('.scheme-select').forEach((button) => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-scheme-id');
                if (schemeSelect) schemeSelect.value = id;
                renderSelectedScheme();
                showMessage('Scheme selected. Complete the application details below.');
            });
        });
    }

    function renderSelectedScheme() {
        const selected = schemeData.find((scheme) => scheme.id === schemeSelect?.value) || schemeData[0];
        if (!selected || !schemeDetails) return;
        schemeDetails.innerHTML = `
            <strong>${selected.name}</strong><br />
            ${selected.details}<br />
            <strong>Eligibility:</strong> ${selected.eligibility}<br />
            <strong>Benefit:</strong> ${selected.benefit}<br />
            <strong>How to apply:</strong> ${selected.steps}
        `;
    }

    function getSchemeApplications() {
        return JSON.parse(localStorage.getItem(SCHEME_APPLICATIONS_KEY) || '[]');
    }

    function saveSchemeApplications(applications) {
        localStorage.setItem(SCHEME_APPLICATIONS_KEY, JSON.stringify(applications));
    }

    function renderApplicationStatus() {
        if (!applicationStatus) return;
        const applications = getSchemeApplications();
        if (!applications.length) {
            applicationStatus.textContent = 'No applications submitted yet.';
            return;
        }
        applicationStatus.innerHTML = applications.map((application) => `
            <div class="status-card">
                <strong>${application.schemeName}</strong><br />
                ${application.applicant} • ${application.location}<br />
                <span>${application.submittedAt} • ${application.status}</span>
            </div>
        `).join('');
    }

    function handleSchemeSubmit(evt) {
        evt.preventDefault();
        const form = evt.target;
        const schemeId = form.scheme.value;
        const scheme = schemeData.find((item) => item.id === schemeId);
        if (!scheme) return showMessage('Select a valid scheme.', 'error');

        const application = {
            schemeId,
            schemeName: scheme.name,
            applicant: form.applicantName.value,
            location: form.location.value,
            submittedAt: new Date().toLocaleString(),
            status: 'Submitted'
        };
        const applications = getSchemeApplications();
        applications.unshift(application);
        saveSchemeApplications(applications);
        renderApplicationStatus();
        showMessage('Application submitted successfully. You can track status below.');
        form.reset();
        if (schemeSelect) schemeSelect.value = schemeId;
        renderSelectedScheme();
    }

    renderSchemeCards();
    if (schemeSelect) {
        schemeSelect.innerHTML = schemeData.map((scheme) => `<option value="${scheme.id}">${scheme.name}</option>`).join('');
        schemeSelect.addEventListener('change', renderSelectedScheme);
    }
    if (schemeForm) schemeForm.addEventListener('submit', handleSchemeSubmit);
    renderSelectedScheme();
    renderApplicationStatus();
}

function loadHubPage() {
    const updatesFeed = document.querySelector('#updatesFeed');
    if (!updatesFeed) return;
    updatesFeed.innerHTML = updatesDemo.map((item) => `
        <article class="updates-card">
            <span class="badge">${item.type}</span>
            <h3>${item.title}</h3>
            <p>${item.summary}</p>
            <small>${item.time}</small>
        </article>
    `).join('');
}

function bindCropAdvisorPage() {
    const startCameraBtn = document.querySelector('#startCameraBtn');
    const stopCameraBtn = document.querySelector('#stopCameraBtn');
    const capturePhotoBtn = document.querySelector('#capturePhotoBtn');
    const cropImageUpload = document.querySelector('#cropImageUpload');
    const languageSelect = document.querySelector('#languageSelect');
    const sendChatBtn = document.querySelector('#sendChatBtn');
    const chatInput = document.querySelector('#chatInput');
    const voiceInputBtn = document.querySelector('#voiceInputBtn');
    const chatMessages = document.querySelector('#chatMessages');
    const imagePreview = document.querySelector('#imagePreview');

    let cameraStream = null;
    let recognition = null;

    const languageMap = {
        en: {
            placeholder: 'Ask farming questions...',
            responses: {
                disease: 'This looks like early blight. Remove affected leaves and apply a copper spray if needed.',
                pest: 'Aphids or mites may be present. Use neem spray and monitor daily.',
                fertilizer: 'Apply balanced NPK and mix in organic compost.',
                default: 'Follow best practices: crop rotation, proper irrigation, and soil testing.'
            }
        },
        hi: {
            placeholder: 'कृषि प्रश्न पूछें...',
            responses: {
                disease: 'यह रोग शुरुआती अवस्था जैसा दिखता है। प्रभावित पत्तियाँ हटा दें।',
                pest: 'यहाँ एफिड्स मौजूद हो सकते हैं। नीम का छिड़काव करें।',
                fertilizer: 'संतुलित NPK और जैविक खाद दें।',
                default: 'बेहतर परिणाम के लिए फसल परिवर्तन, समय पर सिंचाई, और मिट्टी परीक्षण करें।'
            }
        },
        bn: {
            placeholder: 'কৃষি প্রশ্ন করুন...',
            responses: {
                disease: 'এটি রোগের প্রাথমিক লক্ষণ দেখায়। আক্রান্ত পাতা সরান।',
                pest: 'এখানে পোকা থাকার সম্ভাবনা আছে। নিম স্প্রে করুন।',
                fertilizer: 'সুষম NPK এবং জৈব সারের ব্যবহার করুন।',
                default: 'ভাল ফলাফলের জন্য ফসল পরিবর্তন, সেচ, এবং মাটি পরীক্ষা করুন।'
            }
        }
    };

    function addChat(text, from) {
        if (!chatMessages) return;
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${from}`;
        bubble.textContent = text;
        chatMessages.appendChild(bubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getResponse(question, lang) {
        const config = languageMap[lang] || languageMap.en;
        const lower = question.toLowerCase();
        if (lower.includes('disease')) return config.responses.disease;
        if (lower.includes('pest')) return config.responses.pest;
        if (lower.includes('fertilizer') || lower.includes('fertiliser')) return config.responses.fertilizer;
        return config.responses.default;
    }

    function updateAnalysis(summary) {
        const analysisSummary = document.querySelector('#analysisSummary');
        const fertilizerAdvice = document.querySelector('#fertilizerAdvice');
        const pestAdvice = document.querySelector('#pestAdvice');
        const healthScore = document.querySelector('#healthScore');
        const cropStatus = document.querySelector('#cropStatus');
        const historyList = document.querySelector('#analysisHistory');
        if (analysisSummary) {
            analysisSummary.innerHTML = `
                <h4>Detection results</h4>
                <p>${summary.disease}</p>
            `;
        }
        if (fertilizerAdvice) fertilizerAdvice.textContent = summary.fertilizer;
        if (pestAdvice) pestAdvice.textContent = summary.pest;
        if (healthScore) healthScore.textContent = summary.healthScore;
        if (cropStatus) cropStatus.textContent = summary.cropStatus;
        if (historyList) {
            const entry = document.createElement('div');
            entry.className = 'status-card';
            entry.innerHTML = `
                <strong>${summary.type}</strong><br />
                ${summary.disease}<br />
                <small>${new Date().toLocaleString()}</small>
            `;
            historyList.prepend(entry);
        }
    }

    if (startCameraBtn) {
        startCameraBtn.addEventListener('click', async () => {
            try {
                cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
                const video = document.querySelector('#cameraPreview');
                if (video) video.srcObject = cameraStream;
            } catch (error) {
                showMessage('Camera access denied or unavailable.', 'error');
            }
        });
    }
    if (stopCameraBtn) {
        stopCameraBtn.addEventListener('click', () => {
            if (cameraStream) {
                cameraStream.getTracks().forEach((track) => track.stop());
                cameraStream = null;
            }
            const video = document.querySelector('#cameraPreview');
            if (video) video.srcObject = null;
        });
    }
    if (capturePhotoBtn) {
        capturePhotoBtn.addEventListener('click', () => {
            const video = document.querySelector('#cameraPreview');
            const preview = document.querySelector('#imagePreview');
            if (!video || !preview) return;
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            const photo = canvas.toDataURL('image/jpeg');
            preview.innerHTML = `<img src="${photo}" alt="Captured crop" />`;
            updateAnalysis({
                type: 'Camera analysis',
                disease: 'Detected minor leaf blight.',
                pest: 'Possible aphids detected.',
                fertilizer: 'Use balanced NPK and organic mulch.',
                healthScore: '76%',
                cropStatus: 'Moderate'
            });
        });
    }
    if (cropImageUpload) {
        cropImageUpload.addEventListener('change', (evt) => {
            const file = evt.target.files?.[0];
            if (!file || !file.type.startsWith('image/')) {
                showMessage('Select a valid image file.', 'error');
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                showMessage('Image must be smaller than 10 MB.', 'error');
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                if (imagePreview) imagePreview.innerHTML = `<img src="${event.target.result}" alt="Uploaded crop" />`;
                updateAnalysis({
                    type: 'Upload analysis',
                    disease: 'Detected early powdery mildew.',
                    pest: 'Low pest activity, monitor closely.',
                    fertilizer: 'Apply potassium-rich fertilizer.',
                    healthScore: '82%',
                    cropStatus: 'Healthy'
                });
            };
            reader.readAsDataURL(file);
        });
    }
    const dropzone = document.querySelector('#imagePreview');
    if (dropzone && cropImageUpload) {
        ['dragenter', 'dragover'].forEach((eventName) => dropzone.addEventListener(eventName, (evt) => {
            evt.preventDefault();
            dropzone.classList.add('is-dragging');
        }));
        ['dragleave', 'drop'].forEach((eventName) => dropzone.addEventListener(eventName, (evt) => {
            evt.preventDefault();
            dropzone.classList.remove('is-dragging');
        }));
        dropzone.addEventListener('drop', (evt) => {
            const file = evt.dataTransfer.files?.[0];
            if (!file) return;
            const transfer = new DataTransfer();
            transfer.items.add(file);
            cropImageUpload.files = transfer.files;
            cropImageUpload.dispatchEvent(new Event('change', { bubbles: true }));
        });
    }
    if (languageSelect) {
        languageSelect.addEventListener('change', () => {
            if (chatInput) chatInput.placeholder = languageMap[languageSelect.value]?.placeholder || languageMap.en.placeholder;
        });
        if (chatInput) chatInput.placeholder = languageMap[languageSelect.value]?.placeholder || languageMap.en.placeholder;
    }
    if (sendChatBtn && chatInput) {
        sendChatBtn.addEventListener('click', () => {
            const question = chatInput.value.trim();
            if (!question) return;
            addChat(question, 'user');
            const answer = getResponse(question, languageSelect?.value || 'en');
            setTimeout(() => addChat(answer, 'assistant'), 250);
            chatInput.value = '';
        });
    }
    if (voiceInputBtn) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            voiceInputBtn.disabled = true;
            voiceInputBtn.textContent = 'Voice unavailable';
        } else {
            recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.continuous = false;
            recognition.interimResults = false;
            voiceInputBtn.addEventListener('click', () => {
                recognition.start();
            });
            recognition.addEventListener('result', (event) => {
                const transcript = event.results[0][0].transcript;
                if (chatInput) chatInput.value = transcript;
            });
            recognition.addEventListener('error', () => {
                showMessage('Voice input failed. Please try again.', 'error');
            });
        }
    }
}

async function loadLoanPage() {
    const loanScore = document.querySelector('#loanScore');
    if (!loanScore) return;
    try {
        const data = await apiRequest('/loan-eligibility');
        loanScore.textContent = `Estimated eligibility: ${data.score}% - ${data.status}`;
    } catch (error) {
        console.warn('Loan eligibility unavailable:', error.message);
    }
}

async function loadProfilePage() {
    const user = getDemoUser();
    const profileName = document.querySelector('#profileName');
    const profileMobile = document.querySelector('#profileMobile');
    const profileAadhaar = document.querySelector('#profileAadhaar');
    const profileVillage = document.querySelector('#profileVillage');
    const profileLand = document.querySelector('#profileLand');
    const profileCrop = document.querySelector('#profileCrop');
    
    // Profile photo display
    const profilePhotoDisplay = document.querySelector('#profilePhotoDisplay');
    const profilePhotoName = document.querySelector('#profilePhotoSummaryName');
    const profilePhotoVillage = document.querySelector('#profilePhotoSummaryVillage');
    const profileHeroName = document.querySelector('#profileHeroName');
    const profileHeroLand = document.querySelector('#profileHeroLand');
    const profileHeroCrop = document.querySelector('#profileHeroCrop');
    const profileHeroVillage = document.querySelector('#profileHeroVillage');
    
    // Form fields for editing
    const editName = document.querySelector('#editName');
    const editMobile = document.querySelector('#editMobile');
    const editAadhaar = document.querySelector('#editAadhaar');
    const editVillage = document.querySelector('#editVillage');
    const editLandSize = document.querySelector('#editLandSize');
    const editCrop = document.querySelector('#editCrop');

    if (user) {
        // Display profile details
        if (profileName) profileName.textContent = user.name;
        if (profileMobile) profileMobile.textContent = user.mobile;
        if (profileAadhaar) profileAadhaar.textContent = user.aadhaar;
        if (profileVillage) profileVillage.textContent = user.village;
        if (profileLand) profileLand.textContent = `${user.landSize} acres`;
        if (profileCrop) profileCrop.textContent = user.crop;
        
        // Display profile hero and photo section
        if (profileHeroName) profileHeroName.textContent = user.name;
        if (profileHeroLand) profileHeroLand.textContent = `${user.landSize} acres`;
        if (profileHeroCrop) profileHeroCrop.textContent = user.crop;
        if (profileHeroVillage) profileHeroVillage.textContent = user.village;
        if (profilePhotoName) profilePhotoName.textContent = user.name;
        if (profilePhotoVillage) profilePhotoVillage.textContent = user.village;
        
        // Display profile photo or default avatar
        if (profilePhotoDisplay) {
            const photo = getProfilePhoto();
            profilePhotoDisplay.src = photo || generateDefaultAvatar(user.name);
        }
        
        // Populate edit form fields
        if (editName) editName.value = user.name;
        if (editMobile) editMobile.value = user.mobile;
        if (editAadhaar) editAadhaar.value = user.aadhaar;
        if (editVillage) editVillage.value = user.village;
        if (editLandSize) editLandSize.value = user.landSize;
        if (editCrop) editCrop.value = user.crop;
    } else {
        // Show default avatar if no user
        if (profilePhotoDisplay) {
            profilePhotoDisplay.src = generateDefaultAvatar('Farmer');
        }
    }
}

function toggleEditMode(show) {
    const viewSection = document.querySelector('#viewProfileSection');
    const editSection = document.querySelector('#editProfileSection');
    
    if (show) {
        if (viewSection) viewSection.style.display = 'none';
        if (editSection) editSection.style.display = 'block';
    } else {
        if (viewSection) viewSection.style.display = 'block';
        if (editSection) editSection.style.display = 'none';
    }
}

function handlePhotoUpload(evt) {
    const file = evt.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        showMessage('Please select a valid image file.', 'error');
        return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showMessage('Image size should be less than 5MB.', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const photoData = e.target.result;
        saveProfilePhoto(photoData);
        
        // Update profile photo display
        const profilePhotoDisplay = document.querySelector('#profilePhotoDisplay');
        if (profilePhotoDisplay) {
            profilePhotoDisplay.src = photoData;
        }
        
        showMessage('Profile photo updated successfully.');
    };
    reader.readAsDataURL(file);
}

async function handleProfileUpdate(evt) {
    evt.preventDefault();
    const user = getDemoUser();
    if (!user) return showMessage('Please sign in before updating your profile.', 'error');
    
    const form = evt.target;
    const payload = {
        village: form.village.value,
        landSize: Number(form.landSize.value),
        crop: form.crop.value,
    };

    try {
        const data = await apiRequest(`/profile/${user.mobile}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        });
        const updated = { ...user, village: data.village, landSize: data.landSize, crop: data.crop };
        setDemoUser(updated);
        showMessage('Profile updated successfully.');
        toggleEditMode(false);
        loadProfilePage();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

async function handleLoanApplication(evt) {
    evt.preventDefault();
    const form = evt.target;
    const payload = {
        applicantName: form.applicantName?.value || 'Farmer User',
        mobile: form.mobile?.value || getDemoUser()?.mobile || '',
        bankName: form.bankName.value,
        amount: Number(form.amount.value),
        purpose: form.purpose.value,
    };
    try {
        await apiRequest('/apply-loan', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
        showMessage('Loan application submitted. Our partner bank will contact you soon.');
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

const storeImagePool = [
    'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=700&q=80'
];
const storeCatalog = {
    Seeds: ['Hybrid Tomato Seeds', 'Paddy Gold Seeds', 'Cotton Boll Seeds', 'Green Chilli Seeds', 'Sweet Corn Seeds'],
    Fertilizers: ['NPK Fertilizer 19:19:19', 'Urea Fertilizer 45kg', 'DAP Fertilizer', 'Potash MOP 50kg', 'Vermicompost Plus'],
    'Plant Protection': ['Bio Pest Shield', 'Copper Fungicide', 'Neem Pest Control', 'Tricho Bio Control', 'Imidacloprid 17.8%'],
    'Tools & Equipment': ['Smart Sprayer Kit', 'Heavy Duty Pruning Shears', 'Steel Hand Hoe', 'Farm Measuring Tape', 'Harvesting Sickle'],
    Irrigation: ['Drip Irrigation Kit', 'Micro Sprinkler Set', 'PVC Farm Pipe 30m', 'Water Timer Controller', 'Venturi Fertilizer Injector'],
    'Organic Products': ['Organic Compost 25kg', 'Neem Cake Granules', 'Seaweed Growth Tonic', 'Panchagavya Liquid', 'Organic Potting Mix'],
    'Farm Machinery': ['Mini Power Weeder', 'Battery Crop Cutter', 'Solar Water Pump', 'Portable Thresher', 'Manual Seed Drill'],
    'Animal Care': ['Cattle Mineral Mix', 'Dairy Hygiene Wash', 'Calf Starter Feed', 'Poultry Vitamin Mix', 'Animal First Aid Kit'],
    'Farm Accessories': ['Reusable Crop Crates', 'Jute Grain Bags', 'Digital Weighing Scale', 'Harvest Gloves', 'Weatherproof Tarpaulin'],
    'Crop Nutrition': ['Tomato Fruit Booster', 'Paddy Zinc Supplement', 'Cotton Boron Spray', 'Maize Micronutrient Mix', 'Chilli Flower Booster']
};
const storeProducts = Object.entries(storeCatalog).flatMap(([category, names], categoryIndex) => names.map((name, itemIndex) => ({
    name, category, price: 260 + categoryIndex * 115 + itemIndex * 90, oldPrice: 330 + categoryIndex * 125 + itemIndex * 105,
    rating: Number((4.5 + ((categoryIndex + itemIndex) % 5) / 10).toFixed(1)), reviews: 28 + categoryIndex * 13 + itemIndex * 7,
    icon: ['🍅', '🌾', '🌱', '🛡', '🧴', '💧', '🚜', '🐄', '🧺', '🧪'][categoryIndex], image: storeImagePool[(categoryIndex + itemIndex) % storeImagePool.length],
    description: `Quality-assured ${category.toLowerCase()} for productive Indian farms.`, badge: itemIndex === 0 ? 'Best seller' : itemIndex === 1 ? '12% off' : 'Farm pick'
})));
let storeDiscount = 0;

function renderStoreProducts() {
    const productList = document.querySelector('#productList');
    if (!productList) return;
    const search = document.querySelector('#productSearch');
    const category = document.querySelector('#categoryFilter');
    const sort = document.querySelector('#sortProducts');
    const render = () => {
        const term = search?.value.toLowerCase() || '';
        let products = storeProducts.filter((product) => (!category?.value || category.value === 'all' || product.category === category.value) && `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(term));
        if (sort?.value === 'price-low') products.sort((a, b) => a.price - b.price);
        if (sort?.value === 'price-high') products.sort((a, b) => b.price - a.price);
        if (sort?.value === 'rating') products.sort((a, b) => b.rating - a.rating);
        productList.innerHTML = products.map((product) => `<article class="store-product-card"><button class="wishlist" aria-label="Add ${product.name} to wishlist">♡</button><span class="product-badge">${product.badge}</span><div class="product-visual"><img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='${storeImagePool[1]}'"><span>${product.icon}</span></div><span class="product-category">${product.category}</span><h3>${product.name}</h3><p>${product.description}</p><div class="product-rating">★★★★★ <small>${product.rating} (${product.reviews})</small></div><div class="product-price"><strong>₹${product.price.toLocaleString('en-IN')}</strong><del>₹${product.oldPrice.toLocaleString('en-IN')}</del></div><span class="stock-label">● In stock · Delivery in 3-5 days</span><div class="product-buttons"><button class="btn" data-add-cart="${product.name}">Add to cart</button><button class="buy-now" data-buy-now="${product.name}">Buy now</button></div></article>`).join('') || '<p class="empty-products">No products match those filters. Try another category.</p>';
        productList.querySelectorAll('[data-add-cart]').forEach((button) => button.addEventListener('click', () => { const cart = getCart(); cart.push(button.dataset.addCart); saveCart(cart); showMessage(`${button.dataset.addCart} added to cart.`); renderCart(); }));
        productList.querySelectorAll('[data-buy-now]').forEach((button) => button.addEventListener('click', () => { const cart = getCart(); cart.push(button.dataset.buyNow); saveCart(cart); document.querySelector('#storeCart')?.classList.add('open'); renderCart(); }));
        productList.querySelectorAll('.store-product-card').forEach((card) => card.addEventListener('click', (event) => {
            if (event.target.closest('button')) return;
            const product = storeProducts.find((entry) => entry.name === card.querySelector('h3')?.textContent);
            const modal = document.querySelector('#productModal');
            const content = document.querySelector('#modalProductContent');
            if (!product || !modal || !content) return;
            content.innerHTML = `<div class="modal-product-visual">${product.icon}</div><div><span class="store-kicker">${product.category}</span><h2>${product.name}</h2><div class="product-rating">★★★★★ <small>${product.rating} from ${product.reviews} farmers</small></div><p>${product.description}</p><h3>Why farmers choose it</h3><ul><li>Quality assured and field-tested</li><li>Suitable for Indian growing conditions</li><li>Delivery available across India</li></ul><p><b>Usage:</b> Follow the pack instructions and local crop guidance for best results.</p><strong class="modal-price">₹${product.price.toLocaleString('en-IN')}</strong><button class="btn modal-add" data-add-cart="${product.name}">Add to cart</button></div>`;
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            content.querySelector('.modal-add').addEventListener('click', () => { const cart = getCart(); cart.push(product.name); saveCart(cart); renderCart(); modal.classList.remove('open'); document.querySelector('#storeCart')?.classList.add('open'); });
        }));
    };
    [search, category, sort].forEach((control) => control?.addEventListener('input', render));
    document.querySelectorAll('[data-category]').forEach((button) => button.addEventListener('click', () => { if (category) category.value = button.dataset.category; render(); document.querySelector('#featuredProducts')?.scrollIntoView({ behavior: 'smooth' }); }));
    const productModal = document.querySelector('#productModal');
    productModal?.addEventListener('click', (event) => { if (event.target === productModal || event.target.closest('.modal-close')) { productModal.classList.remove('open'); productModal.setAttribute('aria-hidden', 'true'); } });
    document.querySelector('#applyCoupon')?.addEventListener('click', () => {
        const code = document.querySelector('#couponCode')?.value.trim().toUpperCase();
        const subtotal = getCart().reduce((sum, item) => sum + (storeProducts.find((product) => product.name === item)?.price || 0), 0);
        if (code === 'FARM10' && subtotal > 0) { storeDiscount = Math.round(subtotal * 0.1); showMessage('FARM10 applied. You saved 10% on this order.'); }
        else if (!code) { storeDiscount = 0; showMessage('Enter a coupon code first.', 'error'); }
        else { storeDiscount = 0; showMessage('Coupon not recognised. Try FARM10.', 'error'); }
        renderCart();
    });
    document.querySelector('#checkoutButton')?.addEventListener('click', () => {
        if (!getCart().length) { showMessage('Your cart is empty. Add a product before checkout.', 'error'); return; }
        showMessage('Order confirmed. Delivery tracking details will be shared shortly.');
        saveCart([]);
        storeDiscount = 0;
        renderCart();
        document.querySelector('#storeCart')?.classList.remove('open');
    });
    render();
}

function renderCart() {
    const legacyNames = { 'NPK Fertilizer': 'NPK Fertilizer 19:19:19' };
    const items = getCart().map((item) => legacyNames[item] || item).filter((item) => storeProducts.some((product) => product.name === item));
    if (items.length !== getCart().length) saveCart(items);
    const list = document.querySelector('#cartItems');
    if (!list) return;
    if (!items.length) {
        list.innerHTML = '<li class="empty-cart">Your cart is waiting for its first harvest essential.</li>';
        const count = document.querySelector('#cartCount'); if (count) count.textContent = '0';
        const total = document.querySelector('#cartTotal'); if (total) total.textContent = '₹0';
        const discount = document.querySelector('#discountValue'); if (discount) discount.textContent = '- ₹0';
        return;
    }
    const groupedItems = [...new Set(items)].map((name) => ({ name, quantity: items.filter((item) => item === name).length }));
    list.innerHTML = groupedItems.map((item, index) => { const product = storeProducts.find((entry) => entry.name === item.name); return `<li><span class="cart-product-icon"><img src="${product.image}" alt="${product.name}"><b>${product.icon}</b></span><div><b>${item.name}</b><small>₹${product.price.toLocaleString('en-IN')}</small><div class="cart-quantity"><button type="button" data-minus="${index}">−</button><span>${item.quantity}</span><button type="button" data-plus="${index}">+</button></div></div><button type="button" data-remove="${index}" class="remove-cart">×</button></li>`; }).join('');
    const count = document.querySelector('#cartCount'); if (count) count.textContent = items.length;
    const subtotal = items.reduce((sum, item) => sum + (storeProducts.find((entry) => entry.name === item)?.price || 0), 0);
    const total = document.querySelector('#cartTotal'); if (total) total.textContent = `₹${Math.max(0, subtotal - storeDiscount).toLocaleString('en-IN')}`;
    const discount = document.querySelector('#discountValue'); if (discount) discount.textContent = `- ₹${storeDiscount.toLocaleString('en-IN')}`;
    list.querySelectorAll('[data-remove]').forEach((button) => {
        button.addEventListener('click', () => {
            const groupedIndex = Number(button.getAttribute('data-remove'));
            const name = groupedItems[groupedIndex].name;
            const cart = getCart();
            saveCart(cart.filter((item) => (legacyNames[item] || item) !== name));
            renderCart();
        });
    });
    list.querySelectorAll('[data-plus]').forEach((button) => button.addEventListener('click', () => {
        const item = groupedItems[Number(button.dataset.plus)].name;
        const cart = getCart();
        cart.push(item);
        saveCart(cart);
        renderCart();
    }));
    list.querySelectorAll('[data-minus]').forEach((button) => button.addEventListener('click', () => {
        const item = groupedItems[Number(button.dataset.minus)].name;
        const cart = getCart();
        const itemIndex = cart.findIndex((entry) => (legacyNames[entry] || entry) === item);
        if (itemIndex >= 0) cart.splice(itemIndex, 1);
        saveCart(cart.map((entry) => legacyNames[entry] || entry));
        renderCart();
    }));
}

function bindSearch() {
    const search = document.querySelector('#productSearch');
    if (!search) return;
    search.addEventListener('input', () => {
        const term = search.value.toLowerCase();
        document.querySelectorAll('.product-card').forEach((item) => {
            item.style.display = item.textContent.toLowerCase().includes(term) ? 'grid' : 'none';
        });
    });
}

function bindCommunity() {
    document.querySelectorAll('[data-like]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const count = Number(btn.getAttribute('data-count') || 0) + 1;
            btn.setAttribute('data-count', count);
            btn.textContent = `👍 Like (${count})`;
        });
    });
}

function initPage() {
    updateActiveNav();

    const registerForm = document.querySelector('#registerForm');
    const loginForm = document.querySelector('#loginForm');
    const otpForm = document.querySelector('#otpForm');
    const otpVerifyForm = document.querySelector('#otpVerifyForm');
    const profileForm = document.querySelector('#profileForm');
    const loanForm = document.querySelector('#loanForm');
    const editProfileBtn = document.querySelector('#editProfileBtn');
    const cancelEditBtn = document.querySelector('#cancelEditBtn');
    const uploadPhotoBtn = document.querySelector('#uploadPhotoBtn');
    const photoUploadInput = document.querySelector('#photoUploadInput');

    if (registerForm) registerForm.addEventListener('submit', registerUser);
    if (loginForm) loginForm.addEventListener('submit', loginUser);
    if (otpForm) otpForm.addEventListener('submit', requestOtp);
    if (otpVerifyForm) otpVerifyForm.addEventListener('submit', verifyOtp);
    if (profileForm) profileForm.addEventListener('submit', handleProfileUpdate);
    if (loanForm) loanForm.addEventListener('submit', handleLoanApplication);
    if (editProfileBtn) editProfileBtn.addEventListener('click', () => toggleEditMode(true));
    if (cancelEditBtn) cancelEditBtn.addEventListener('click', () => toggleEditMode(false));
    if (uploadPhotoBtn) uploadPhotoBtn.addEventListener('click', () => photoUploadInput?.click());
    if (photoUploadInput) photoUploadInput.addEventListener('change', handlePhotoUpload);

    document.querySelectorAll('.mobile-menu').forEach((btn) => btn.addEventListener('click', toggleMobileNav));

    loadDashboardData();
    loadWeatherPage();
    loadMarketPage();
    loadLoanPage();
    loadSchemesPage();
    loadProfilePage();
    loadHubPage();
    renderStoreProducts();
    renderCart();
    bindSearch();
    bindCommunity();
    bindCropAdvisorPage();
}

window.addEventListener('DOMContentLoaded', initPage);

const navigate = (path) => {
    window.location.href = path;
};
