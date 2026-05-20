/* ============================================
   VitalFlow — Main Application JavaScript
   3D Background, Scroll Animations, Search,
   Calorie Tracker, Diet Planner, Workout Library
   ============================================ */

// ==========================================
// BRAND & GLOBAL SITE SETTINGS
// ==========================================
const settingsManager = {
    settings: {
        siteTitle: "Saurabh Health",
        logoEmoji: "💚",
        defaultCalories: "2000"
    },
    init() {
        const saved = localStorage.getItem('vf_site_settings');
        if (saved) {
            this.settings = JSON.parse(saved);
        } else {
            this.save();
        }
        this.apply();
    },
    save() {
        localStorage.setItem('vf_site_settings', JSON.stringify(this.settings));
    },
    apply() {
        // Apply Site Title
        const title = this.settings.siteTitle || "Saurabh Health";
        document.title = `${title} — Your Premium Health Revolution`;
        
        document.querySelectorAll('.logo-text').forEach(el => {
            const parts = title.split(' ');
            if (parts.length > 1) {
                el.innerHTML = `${parts[0]}<span class="logo-accent">${parts.slice(1).join(' ')}</span>`;
            } else {
                el.innerHTML = `${title}`;
            }
        });
        
        // Apply Logo Emoji
        const emoji = this.settings.logoEmoji || "💚";
        document.querySelectorAll('.logo-icon').forEach(el => {
            el.textContent = emoji;
        });

        // Seed default calories in calculations
        localStorage.setItem('vf_admin_calorie_goal', this.settings.defaultCalories || '2000');
    }
};

settingsManager.init();

// ==========================================
// 1. THREE.JS 3D BACKGROUND
// ==========================================
(function init3DBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Floating geometric shapes
    const shapes = [];
    const geometries = [
        new THREE.IcosahedronGeometry(1, 0),
        new THREE.OctahedronGeometry(1, 0),
        new THREE.TetrahedronGeometry(1, 0),
        new THREE.TorusGeometry(0.7, 0.3, 8, 16),
        new THREE.DodecahedronGeometry(0.8, 0),
        new THREE.SphereGeometry(0.6, 16, 16),
        new THREE.TorusKnotGeometry(0.5, 0.2, 64, 8),
    ];

    const colors = [
        0xa8e6cf, // mint
        0x88d8b0, // green
        0xb8b0f5, // lavender
        0xffd3b6, // peach
        0xa8d8ea, // sky
        0x4ecdc4, // teal
        0x7c6cf0, // purple
        0x74b9ff, // blue
        0xffaaa5, // coral
        0xffb347, // orange
    ];

    for (let i = 0; i < 35; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = new THREE.MeshPhongMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            transparent: true,
            opacity: 0.15 + Math.random() * 0.15,
            shininess: 100,
            wireframe: Math.random() > 0.5,
        });
        const mesh = new THREE.Mesh(geometry, material);

        const scale = 0.5 + Math.random() * 2;
        mesh.scale.set(scale, scale, scale);
        mesh.position.set(
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 60,
            (Math.random() - 0.5) * 30 - 10
        );

        mesh.userData = {
            rotSpeed: { x: (Math.random() - 0.5) * 0.01, y: (Math.random() - 0.5) * 0.01, z: (Math.random() - 0.5) * 0.005 },
            floatSpeed: 0.3 + Math.random() * 0.5,
            floatOffset: Math.random() * Math.PI * 2,
            originalY: mesh.position.y,
        };

        scene.add(mesh);
        shapes.push(mesh);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xa8e6cf, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x7c6cf0, 0.5, 50);
    pointLight1.position.set(-15, 10, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4ecdc4, 0.5, 50);
    pointLight2.position.set(15, -10, 5);
    scene.add(pointLight2);

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Scroll offset
    let scrollY = 0;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    // Animation loop
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        shapes.forEach((mesh) => {
            const ud = mesh.userData;
            mesh.rotation.x += ud.rotSpeed.x;
            mesh.rotation.y += ud.rotSpeed.y;
            mesh.rotation.z += ud.rotSpeed.z;
            mesh.position.y = ud.originalY + Math.sin(time * ud.floatSpeed + ud.floatOffset) * 2;
        });

        // Parallax camera
        camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 3 - camera.position.y + scrollY * 0.005) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();


// ==========================================
// 2. FLOATING PARTICLES
// ==========================================
(function createParticles() {
    const overlay = document.getElementById('particles-overlay');
    if (!overlay) return;
    const particleColors = ['rgba(168,230,207,0.5)', 'rgba(78,205,196,0.4)', 'rgba(124,108,240,0.35)', 'rgba(116,185,255,0.4)', 'rgba(255,179,71,0.35)'];
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        const size = 4 + Math.random() * 10;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.background = particleColors[Math.floor(Math.random() * particleColors.length)];
        p.style.animationDuration = (12 + Math.random() * 20) + 's';
        p.style.animationDelay = (Math.random() * 15) + 's';
        overlay.appendChild(p);
    }
})();


// ==========================================
// 3. NAVIGATION
// ==========================================
(function initNav() {
    const nav = document.getElementById('main-nav');
    const toggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navLinks = document.querySelectorAll('.nav-link');
    const authBtn = document.getElementById('auth-btn');
    const mobileAuthLink = document.getElementById('mobile-auth-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Active nav link
        const sections = ['hero', 'calories', 'diet', 'workout', 'tracker', 'about', 'admin-panel', 'profile'];
        let current = 'hero';
        sections.forEach(id => {
            const section = document.getElementById(id);
            if (section && window.scrollY >= section.offsetTop - 200) {
                current = id;
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === current);
        });
    });


    // Mobile toggle
    if (toggle) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
})();


// ==========================================
// 4. GSAP SCROLL ANIMATIONS
// ==========================================
(function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        // Fallback: use IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.animate-scroll').forEach(el => observer.observe(el));
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Animate each .animate-scroll element
    document.querySelectorAll('.animate-scroll').forEach((el, i) => {
        gsap.fromTo(el,
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                }
            }
        );
    });

    // Parallax for section headers
    document.querySelectorAll('.section-title').forEach(title => {
        gsap.to(title, {
            y: -20,
            scrollTrigger: {
                trigger: title,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            }
        });
    });

    // Food cards stagger
    ScrollTrigger.batch('.food-card', {
        onEnter: (batch) => gsap.fromTo(batch,
            { opacity: 0, y: 40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.6, ease: 'back.out(1.2)' }
        ),
        start: 'top 85%',
    });

    // Exercise cards stagger
    ScrollTrigger.batch('.exercise-card', {
        onEnter: (batch) => gsap.fromTo(batch,
            { opacity: 0, y: 40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.6, ease: 'back.out(1.2)' }
        ),
        start: 'top 85%',
    });

    // Tracker cards stagger
    ScrollTrigger.batch('.tracker-card', {
        onEnter: (batch) => gsap.fromTo(batch,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' }
        ),
        start: 'top 85%',
    });
})();


// ==========================================
// 5. HERO COUNTER ANIMATION
// ==========================================
(function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                let current = 0;
                const increment = target / 60;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    el.textContent = Math.round(current).toLocaleString();
                }, 25);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
})();


// ==========================================
// 6. FOOD SEARCH
// ==========================================
(function initFoodSearch() {
    const input = document.getElementById('food-search');
    const btn = document.getElementById('food-search-btn');
    const suggestionsEl = document.getElementById('food-suggestions');
    const resultsEl = document.getElementById('food-results');

    if (!input || !btn) return;

    function searchFoods(query) {
        query = query.toLowerCase().trim();
        if (!query) return [];
        return FOOD_DATABASE.filter(f =>
            f.name.toLowerCase().includes(query) ||
            f.category.toLowerCase().includes(query)
        ).slice(0, 8);
    }

    function renderSuggestions(items) {
        if (items.length === 0) {
            suggestionsEl.classList.remove('active');
            return;
        }
        suggestionsEl.innerHTML = items.map(f => `
            <div class="suggestion-item" data-name="${f.name}">
                <span class="s-name">${f.emoji} ${f.name}</span>
                <span class="s-cal">${f.calories} cal</span>
            </div>
        `).join('');
        suggestionsEl.classList.add('active');

        suggestionsEl.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                input.value = item.dataset.name;
                suggestionsEl.classList.remove('active');
                performFoodSearch(item.dataset.name);
            });
        });
    }

    function performFoodSearch(query) {
        const results = searchFoods(query);
        if (results.length === 0) {
            resultsEl.innerHTML = `<div class="food-result-card"><p style="text-align:center;color:var(--text-light);">No results found for "${query}". Try another search.</p></div>`;
            resultsEl.classList.add('active');
            return;
        }
        resultsEl.innerHTML = results.map(f => `
            <div class="food-result-card">
                <div class="food-result-header">
                    <div>
                        <div class="food-result-name">${f.emoji} ${f.name}</div>
                        <div style="font-size:13px;color:var(--text-light);margin-top:2px;">${f.serving}</div>
                    </div>
                    <div class="food-result-cal">${f.calories} <span>cal</span></div>
                </div>
                <div class="food-result-macros">
                    <div class="macro-chip protein"><span class="mc-value">${f.protein}g</span><span class="mc-label">Protein</span></div>
                    <div class="macro-chip carbs"><span class="mc-value">${f.carbs}g</span><span class="mc-label">Carbs</span></div>
                    <div class="macro-chip fat"><span class="mc-value">${f.fat}g</span><span class="mc-label">Fat</span></div>
                    <div class="macro-chip fiber"><span class="mc-value">${f.fiber}g</span><span class="mc-label">Fiber</span></div>
                </div>
            </div>
        `).join('');
        resultsEl.classList.add('active');
        suggestionsEl.classList.remove('active');
    }

    input.addEventListener('input', () => {
        const q = input.value;
        if (q.length < 2) {
            suggestionsEl.classList.remove('active');
            return;
        }
        renderSuggestions(searchFoods(q));
    });

    btn.addEventListener('click', () => {
        performFoodSearch(input.value);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') performFoodSearch(input.value);
    });

    // Close suggestions on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-wrapper')) {
            suggestionsEl.classList.remove('active');
        }
    });
})();


// ==========================================
// 7. POPULAR FOODS GRID
// ==========================================
(function renderPopularFoods() {
    const grid = document.getElementById('popular-food-grid');
    if (!grid) return;

    const popular = [
        'Chicken Breast', 'Banana', 'Egg', 'Brown Rice', 'Oatmeal', 'Avocado',
        'Salmon', 'Greek Yogurt', 'Sweet Potato', 'Almonds', 'Broccoli', 'Protein Shake'
    ];

    let items = popular.map(name => FOOD_DATABASE.find(f => f.name === name)).filter(Boolean);

    // Merge in dynamic popular foods added by the Admin
    const customFoods = JSON.parse(localStorage.getItem('vf_custom_popular_foods') || '[]');
    items = [...customFoods, ...items];

    // Inject custom foods dynamically into the global FOOD_DATABASE so they can be searched as well!
    customFoods.forEach(food => {
        if (!FOOD_DATABASE.some(f => f.name.toLowerCase() === food.name.toLowerCase())) {
            FOOD_DATABASE.push(food);
        }
    });

    grid.innerHTML = items.map(f => `
        <div class="food-card">
            <span class="food-card-emoji">${f.emoji}</span>
            <div class="food-card-name">${f.name}</div>
            <div class="food-card-serving">${f.serving}</div>
            <div class="food-card-cals">${f.calories} <span>cal</span></div>
            <div class="food-card-macros">
                <span class="fm-tag protein">P: ${f.protein}g</span>
                <span class="fm-tag carbs">C: ${f.carbs}g</span>
                <span class="fm-tag fat">F: ${f.fat}g</span>
            </div>
        </div>
    `).join('');
})();


// ==========================================
// 8. CALORIE CALCULATOR
// ==========================================
(function initCalcualtor() {
    const btn = document.getElementById('calc-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const gender = document.getElementById('calc-gender').value;
        const age = parseFloat(document.getElementById('calc-age').value);
        const weight = parseFloat(document.getElementById('calc-weight').value);
        const height = parseFloat(document.getElementById('calc-height').value);
        const activity = parseFloat(document.getElementById('calc-activity').value);

        if (!age || !weight || !height) {
            alert('Please fill in all fields');
            return;
        }

        // Mifflin-St Jeor Equation
        let bmr;
        if (gender === 'male') {
            bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        const maintenance = Math.round(bmr * activity);
        const loss = Math.round(maintenance - 500);
        const gain = Math.round(maintenance + 400);

        document.getElementById('result-maintenance').textContent = maintenance.toLocaleString();
        document.getElementById('result-loss').textContent = loss.toLocaleString();
        document.getElementById('result-gain').textContent = gain.toLocaleString();

        const results = document.getElementById('calc-results');
        results.classList.remove('hidden');

        // Animate numbers
        if (typeof gsap !== 'undefined') {
            gsap.from(results, { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' });
        }
    });
})();


// ==========================================
// 9. DIET PLANNER
// ==========================================
(function initDietPlanner() {
    const goalCards = document.querySelectorAll('.goal-card');
    const mealPlanEl = document.getElementById('meal-plan');

    function renderMealPlan(goalKey) {
        const plan = DIET_PLANS[goalKey];
        if (!plan || !mealPlanEl) return;

        mealPlanEl.innerHTML = plan.meals.map(meal => {
            const total = meal.items.reduce((s, i) => s + i.cal, 0);
            return `
                <div class="meal-card">
                    <div class="meal-card-header">
                        <span class="meal-card-icon">${meal.icon}</span>
                        <div>
                            <h4>${meal.name}</h4>
                            <span class="meal-card-time">${meal.time}</span>
                        </div>
                    </div>
                    <ul class="meal-items">
                        ${meal.items.map(item => `
                            <li>
                                <span>${item.name}</span>
                                <span class="mi-cal">${item.cal} cal</span>
                            </li>
                        `).join('')}
                    </ul>
                    <div class="meal-total">
                        <span>Total</span>
                        <span class="mt-cal">${total} cal</span>
                    </div>
                </div>
            `;
        }).join('');

        // Update macro rings
        updateMacroRings(plan.macros);
    }

    function updateMacroRings(macros) {
        const maxes = { protein: 200, carbs: 350, fat: 150, fiber: 40 };
        Object.keys(macros).forEach(key => {
            const ring = document.querySelector(`#macro-${key} .ring-progress`);
            const val = document.querySelector(`#macro-${key} .ring-value`);
            if (ring && val) {
                const progress = Math.min(macros[key] / maxes[key], 1);
                ring.style.setProperty('--progress', progress);
                val.textContent = macros[key] + 'g';
            }
        });
    }

    goalCards.forEach(card => {
        card.addEventListener('click', () => {
            goalCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            renderMealPlan(card.dataset.goal);
        });
    });

    // Render default
    renderMealPlan('lose');
})();


// ==========================================
// 10. WORKOUT / EXERCISE SECTION
// ==========================================
(function initWorkoutSection() {
    const bodyPartBtns = document.querySelectorAll('.body-part-btn');
    const exerciseGrid = document.getElementById('exercise-grid');
    const searchInput = document.getElementById('exercise-search');
    const searchBtn = document.getElementById('exercise-search-btn');
    const suggestionsEl = document.getElementById('exercise-suggestions');
    const modal = document.getElementById('exercise-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    let currentPart = 'all';

    function getFiltered(part, query) {
        let list = EXERCISE_DATABASE;
        if (part !== 'all') {
            list = list.filter(e => e.bodyPart === part);
        }
        if (query) {
            query = query.toLowerCase();
            list = list.filter(e =>
                e.name.toLowerCase().includes(query) ||
                e.bodyPart.toLowerCase().includes(query) ||
                e.musclesWorked.some(m => m.toLowerCase().includes(query))
            );
        }
        return list;
    }

    function renderExercises(exercises) {
        if (!exerciseGrid) return;
        if (exercises.length === 0) {
            exerciseGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text-light);">No exercises found. Try a different filter or search.</div>`;
            return;
        }
        exerciseGrid.innerHTML = exercises.map((e, i) => `
            <div class="exercise-card" data-index="${EXERCISE_DATABASE.indexOf(e)}" style="animation-delay: ${i * 0.05}s">
                <div class="exercise-card-header">
                    <div class="exercise-card-name">${e.name}</div>
                    <span class="exercise-card-diff diff-${e.difficulty}">${e.difficulty}</span>
                </div>
                <div class="exercise-card-body">${e.bodyPart} • ${e.musclesWorked[0]}</div>
                <div class="exercise-card-desc">${e.description}</div>
                <div class="exercise-card-meta">
                    <span class="ec-meta-tag">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>
                        ${e.sets} sets × ${e.reps}
                    </span>
                    <span class="ec-meta-tag">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        ${e.caloriesBurn}
                    </span>
                </div>
            </div>
        `).join('');

        // Card click -> modal
        exerciseGrid.querySelectorAll('.exercise-card').forEach(card => {
            card.addEventListener('click', () => {
                const idx = parseInt(card.dataset.index);
                openExerciseModal(EXERCISE_DATABASE[idx]);
            });
        });

        // Re-trigger GSAP batch if available
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }

    function openExerciseModal(e) {
        if (!modal || !modalBody) return;
        modalBody.innerHTML = `
            <div class="modal-exercise-name">${e.name}</div>
            <div class="modal-exercise-body">${e.bodyPart} — ${e.musclesWorked.join(', ')}</div>
            <div class="modal-section">
                <h4>Description</h4>
                <p>${e.description}</p>
            </div>
            <div class="modal-section">
                <h4>How To Perform</h4>
                <ol>
                    ${e.steps.map(s => `<li>${s}</li>`).join('')}
                </ol>
            </div>
            <div class="modal-section">
                <h4>Workout Parameters</h4>
                <p><strong>Sets:</strong> ${e.sets} &nbsp;&nbsp; <strong>Reps:</strong> ${e.reps}</p>
                <p><strong>Calories Burn:</strong> ${e.caloriesBurn}</p>
                <p><strong>Equipment:</strong> ${e.equipment}</p>
            </div>
            <div class="modal-tags">
                <span class="modal-tag diff-${e.difficulty}">${e.difficulty}</span>
                ${e.musclesWorked.map(m => `<span class="modal-tag" style="background:rgba(78,205,196,0.1);color:var(--teal);">${m}</span>`).join('')}
            </div>
        `;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }

    // Body part filter
    bodyPartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            bodyPartBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPart = btn.dataset.part;
            renderExercises(getFiltered(currentPart, searchInput ? searchInput.value : ''));
        });
    });

    // Search
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const q = searchInput.value;
            if (q.length >= 2) {
                const results = getFiltered('all', q).slice(0, 6);
                if (results.length > 0) {
                    suggestionsEl.innerHTML = results.map(e => `
                        <div class="suggestion-item" data-name="${e.name}">
                            <span class="s-name">${e.name}</span>
                            <span class="s-part">${e.bodyPart}</span>
                        </div>
                    `).join('');
                    suggestionsEl.classList.add('active');
                    suggestionsEl.querySelectorAll('.suggestion-item').forEach(item => {
                        item.addEventListener('click', () => {
                            searchInput.value = item.dataset.name;
                            suggestionsEl.classList.remove('active');
                            renderExercises(getFiltered('all', item.dataset.name));
                            // reset body part btns
                            bodyPartBtns.forEach(b => b.classList.remove('active'));
                            document.querySelector('.body-part-btn[data-part="all"]').classList.add('active');
                            currentPart = 'all';
                        });
                    });
                } else {
                    suggestionsEl.classList.remove('active');
                }
            } else {
                suggestionsEl.classList.remove('active');
            }
        });

        searchBtn.addEventListener('click', () => {
            suggestionsEl.classList.remove('active');
            renderExercises(getFiltered('all', searchInput.value));
            bodyPartBtns.forEach(b => b.classList.remove('active'));
            document.querySelector('.body-part-btn[data-part="all"]').classList.add('active');
            currentPart = 'all';
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                suggestionsEl.classList.remove('active');
                renderExercises(getFiltered('all', searchInput.value));
            }
        });
    }

    // Initial render
    renderExercises(EXERCISE_DATABASE);
})();


const AUTH_USERS_KEY = 'vf_users';
const AUTH_CURRENT_KEY = 'vf_currentUser';
let refreshTracker = null;

function sanitizeUserId(value) {
    return value.trim().toLowerCase().replace(/\s+/g, '_');
}

const authManager = {
    users: [],
    currentUser: null,
    init() {
        this.users = JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || '[]');
        
        // Seed default Owner/Admin credentials using Base64 obfuscation to prevent plain text exposure in code
        let owner = this.users.find(u => u.role === 'owner');
        if (!owner) {
            owner = {
                username: atob('U2F1cmFiaGd1amFy'),
                email: 'admin@saurabhhealth.com',
                password: atob('UHJhbmphbEAxMTE='),
                role: 'owner'
            };
            this.users.push(owner);
            this.saveUsers();
        } else if (owner.username === 'admin' && owner.password === 'admin123') {
            // Automatically migrate old default credentials to the new secure ones!
            owner.username = atob('U2F1cmFiaGd1amFy');
            owner.password = atob('UHJhbmphbEAxMTE=');
            this.saveUsers();
            
            // Sync active session if logged in as 'admin'
            if (localStorage.getItem(AUTH_CURRENT_KEY) === 'admin') {
                localStorage.setItem(AUTH_CURRENT_KEY, owner.username);
            }
        }

        const saved = localStorage.getItem(AUTH_CURRENT_KEY);
        if (saved && this.users.some(u => u.username === saved)) {
            this.currentUser = saved;
        } else {
            this.currentUser = null;
        }
    },
    isOwner() {
        if (!this.currentUser) return false;
        const user = this.findUser(this.currentUser);
        return user && user.role === 'owner';
    },
    saveUsers() {
        localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(this.users));
    },
    setCurrentUser(username) {
        if (username) {
            localStorage.setItem(AUTH_CURRENT_KEY, username);
            this.currentUser = username;
        } else {
            localStorage.removeItem(AUTH_CURRENT_KEY);
            this.currentUser = null;
        }
    },
    findUser(identifier) {
        const target = identifier.trim().toLowerCase();
        return this.users.find(u => u.username.toLowerCase() === target || u.email.toLowerCase() === target);
    },
    login(identifier, password) {
        const user = this.findUser(identifier);
        if (!user) return 'No account found for that username or email.';
        if (user.suspended) return 'This account has been suspended by the website administrator.';
        if (user.password !== password) return 'Incorrect password. Please try again.';
        this.setCurrentUser(user.username);
        return null;
    },
    signup(username, email, password) {
        const cleanedUsername = username.trim();
        const cleanedEmail = email.trim().toLowerCase();
        if (!cleanedUsername || !cleanedEmail || !password) return 'Please fill out all fields.';
        if (this.users.some(u => u.username.toLowerCase() === cleanedUsername.toLowerCase())) return 'That username is already taken.';
        if (this.users.some(u => u.email.toLowerCase() === cleanedEmail)) return 'That email is already registered.';
        const newUser = {
            username: cleanedUsername,
            email: cleanedEmail,
            password,
        };
        this.users.push(newUser);
        this.saveUsers();
        this.setCurrentUser(newUser.username);
        return null;
    },
    logout() {
        this.setCurrentUser(null);
    },
    getStorageKey(part) {
        return this.currentUser ? `vf_${sanitizeUserId(this.currentUser)}_${part}` : `vf_${part}`;
    }
};

function initAuth() {
    authManager.init();

    const authModal = document.getElementById('auth-modal');
    const authCloseBtn = document.getElementById('auth-close-btn');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authLinks = document.querySelectorAll('.auth-link');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const authBtn = document.getElementById('auth-btn');
    const mobileAuthLink = document.getElementById('mobile-auth-link');
    const authStatus = document.getElementById('auth-status');
    const authGoogleBtn = document.getElementById('auth-google-btn');
    const authFacebookBtn = document.getElementById('auth-facebook-btn');
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenuEl = document.getElementById('mobile-menu');

    function renderAuthUI() {
        const loggedIn = Boolean(authManager.currentUser);
        if (authBtn) {
            authBtn.textContent = loggedIn ? `Hi, ${authManager.currentUser} | Logout` : 'Login / Sign up';
        }
        if (mobileAuthLink) {
            mobileAuthLink.textContent = loggedIn ? 'Logout' : 'Login / Sign up';
        }
        if (authStatus) {
            authStatus.textContent = loggedIn
                ? `Welcome back, ${authManager.currentUser}! Your tracker data is stored for this account.`
                : 'Sign in to save your progress and access your personalized tracker.';
            authStatus.classList.remove('hidden');
        }

        // Show/hide admin panel and inject dynamic navigation tabs
        const adminPanel = document.getElementById('admin-panel');
        const adminNav = document.getElementById('admin-nav-placeholder');
        const adminMobileNav = document.getElementById('admin-mobile-nav-placeholder');

        if (authManager.isOwner()) {
            if (adminPanel) adminPanel.classList.remove('hidden');
            if (adminNav) {
                adminNav.innerHTML = `<a href="#admin-panel" class="nav-link" data-section="admin-panel">Admin Panel</a>`;
            }
            if (adminMobileNav) {
                adminMobileNav.innerHTML = `<a href="#admin-panel" class="mobile-link">Admin Panel</a>`;
                const dynamicLink = adminMobileNav.querySelector('.mobile-link');
                if (dynamicLink) {
                    dynamicLink.addEventListener('click', () => {
                        const toggle = document.getElementById('nav-toggle');
                        const mobileMenu = document.getElementById('mobile-menu');
                        if (toggle) toggle.classList.remove('active');
                        if (mobileMenu) mobileMenu.classList.remove('open');
                        document.body.style.overflow = '';
                    });
                }
            }
            
            // Re-bind smooth scroll for dynamic admin anchor links
            document.querySelectorAll('a[href^="#admin-panel"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    const target = document.getElementById('admin-panel');
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        } else {
            if (adminPanel) adminPanel.classList.add('hidden');
            if (adminNav) adminNav.innerHTML = '';
            if (adminMobileNav) adminMobileNav.innerHTML = '';
        }
    }

    function openAuthModal(mode) {
        if (!authModal) return;
        authModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        switchAuthMode(mode);
    }

    function closeAuthModal() {
        if (!authModal) return;
        authModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    function switchAuthMode(mode) {
        authTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.mode === mode));
        if (loginForm) loginForm.classList.toggle('hidden', mode !== 'login');
        if (signupForm) signupForm.classList.toggle('hidden', mode !== 'signup');
    }

    let isProcessingLogin = false;

    function getOrCreateGoogleInlineOverlay() {
        let overlay = document.getElementById('google-inline-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'google-inline-overlay';
            overlay.className = 'google-inline-overlay';
            overlay.innerHTML = `
                <div class="google-inline-card">
                    <button class="google-inline-close" id="google-inline-close">&times;</button>
                    <iframe src="google-auth.html" class="google-inline-iframe"></iframe>
                </div>
            `;
            document.body.appendChild(overlay);

            // Bind close events
            overlay.querySelector('#google-inline-close').addEventListener('click', () => {
                overlay.classList.remove('active');
            });
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                }
            });
        }
        return overlay;
    }

    function completeGoogleLogin(email) {
        if (isProcessingLogin) return;
        isProcessingLogin = true;

        const normalizedEmail = email.toLowerCase().trim();
        let user = authManager.users.find(u => u.email.toLowerCase() === normalizedEmail);

        if (user && user.suspended) {
            alert('This Google account has been suspended by the website administrator.');
            const overlay = document.getElementById('google-inline-overlay');
            if (overlay) {
                overlay.classList.remove('active');
            }
            closeAuthModal();
            isProcessingLogin = false;
            return;
        }

        if (!user) {
            // Auto-signup with Google
            let username = `google_${normalizedEmail.split('@')[0].replace(/[^a-z0-9]/gi, '')}`;
            if (authManager.users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
                username = `${username}_${Date.now()}`;
            }
            user = { username, email: normalizedEmail, password: 'google_oauth_secure_token' };
            authManager.users.push(user);
            authManager.saveUsers();
        }

        authManager.setCurrentUser(user.username);
        
        // Hide inline overlay if active
        const overlay = document.getElementById('google-inline-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }

        closeAuthModal();
        renderAuthUI();
        if (refreshTracker) refreshTracker();
        alert(`Successfully signed in with Google as ${user.username}!`);

        setTimeout(() => {
            isProcessingLogin = false;
        }, 1000);
    }

    function handleGoogleSignIn() {
        const width = 460;
        const height = 620;
        const left = (window.screen.width / 2) - (width / 2);
        const top = (window.screen.height / 2) - (height / 2);

        let popup = null;
        try {
            popup = window.open(
                'google-auth.html',
                'GoogleAuthPopup',
                `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes,scrollbars=yes`
            );
        } catch (err) {
            console.warn('Popup failed to open:', err);
        }

        // Popup blocker detection
        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
            console.log('Popup blocked. Falling back to inline Google iframe modal...');
            const overlay = getOrCreateGoogleInlineOverlay();
            const iframe = overlay.querySelector('iframe');
            if (iframe) iframe.src = 'google-auth.html';
            overlay.classList.add('active');
        } else {
            if (popup.focus) popup.focus();
        }
    }

    // Set up global callback & event listeners for popup
    window.onGoogleAuthSuccess = function(data) {
        if (data && data.success && data.provider === 'Google') {
            completeGoogleLogin(data.email);
        }
    };

    window.addEventListener('message', (event) => {
        if (event.data && event.data.success && event.data.provider === 'Google') {
            completeGoogleLogin(event.data.email);
        }
    });

    function handleSocialSignIn(provider) {
        const email = prompt(`Enter your ${provider} email to continue:`)?.trim();
        if (!email) return;
        const normalizedEmail = email.toLowerCase();
        let user = authManager.users.find(u => u.email.toLowerCase() === normalizedEmail);
        if (!user) {
            let username = `${provider.toLowerCase()}_${normalizedEmail.split('@')[0].replace(/[^a-z0-9]/gi, '')}`;
            if (authManager.users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
                username = `${username}_${Date.now()}`;
            }
            user = { username, email: normalizedEmail, password: `${provider.toLowerCase()}_oauth` };
            authManager.users.push(user);
            authManager.saveUsers();
        }
        authManager.setCurrentUser(user.username);
        closeAuthModal();
        renderAuthUI();
        if (refreshTracker) refreshTracker();
        alert(`Signed in with ${provider} as ${user.username}`);
    }

    authTabs.forEach(tab => {
        tab.addEventListener('click', () => switchAuthMode(tab.dataset.mode));
    });

    authLinks.forEach(link => {
        link.addEventListener('click', () => switchAuthMode(link.dataset.target));
    });

    if (authGoogleBtn) {
        authGoogleBtn.addEventListener('click', () => handleGoogleSignIn());
    }
    if (authFacebookBtn) {
        authFacebookBtn.addEventListener('click', () => handleSocialSignIn('Facebook'));
    }

    if (authCloseBtn) {
        authCloseBtn.addEventListener('click', closeAuthModal);
    }

    if (authModal) {
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) closeAuthModal();
        });
    }

    if (authBtn) {
        authBtn.addEventListener('click', () => {
            if (authManager.currentUser) {
                authManager.logout();
                renderAuthUI();
                if (refreshTracker) refreshTracker();
            } else {
                openAuthModal('login');
            }
        });
    }

    if (mobileAuthLink) {
        mobileAuthLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (navToggle) navToggle.classList.remove('active');
            if (mobileMenuEl) mobileMenuEl.classList.remove('open');
            document.body.style.overflow = '';
            if (authManager.currentUser) {
                authManager.logout();
                renderAuthUI();
                if (refreshTracker) refreshTracker();
            } else {
                openAuthModal('login');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const identifier = document.getElementById('login-identifier')?.value || '';
            const password = document.getElementById('login-password')?.value || '';
            const error = authManager.login(identifier, password);
            if (error) {
                alert(error);
                return;
            }
            closeAuthModal();
            renderAuthUI();
            if (refreshTracker) refreshTracker();
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('signup-username')?.value || '';
            const email = document.getElementById('signup-email')?.value || '';
            const password = document.getElementById('signup-password')?.value || '';
            const error = authManager.signup(username, email, password);
            if (error) {
                alert(error);
                return;
            }
            closeAuthModal();
            renderAuthUI();
            if (refreshTracker) refreshTracker();
        });
    }

    renderAuthUI();
    switchAuthMode('login');
    initAdminPanel();
}

initAuth();

// ==========================================
// 11. DAILY TRACKER
// ==========================================
(function initTracker() {
    function getUserStorageKey(key) {
        return authManager.getStorageKey(key);
    }

    // State
    let mealLog = JSON.parse(localStorage.getItem(getUserStorageKey('mealLog')) || '[]');
    let workoutLog = JSON.parse(localStorage.getItem(getUserStorageKey('workoutLog')) || '[]');
    let waterCount = parseInt(localStorage.getItem(getUserStorageKey('water') ) || '0');
    let calorieGoal = parseInt(localStorage.getItem('vf_admin_calorie_goal') || '2000');
    let selectedMealType = 'breakfast';
    let selectedFood = null;

    // Date
    const dateEl = document.getElementById('today-date');
    if (dateEl) {
        const now = new Date();
        dateEl.textContent = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }

    // Check if logs are from today, reset if not
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem(getUserStorageKey('date'));
    if (savedDate !== today) {
        mealLog = [];
        workoutLog = [];
        waterCount = 0;
        localStorage.setItem(getUserStorageKey('date'), today);
        saveState();
    }

    function saveState() {
        localStorage.setItem(getUserStorageKey('mealLog'), JSON.stringify(mealLog));
        localStorage.setItem(getUserStorageKey('workoutLog'), JSON.stringify(workoutLog));
        localStorage.setItem(getUserStorageKey('water'), waterCount.toString());
    }

    // --- SUMMARY CARD ---
    function updateSummary() {
        const totalCal = mealLog.reduce((s, m) => s + m.calories, 0);
        const totalProtein = mealLog.reduce((s, m) => s + m.protein, 0);
        const totalCarbs = mealLog.reduce((s, m) => s + m.carbs, 0);
        const totalFat = mealLog.reduce((s, m) => s + m.fat, 0);

        const consumed = document.getElementById('cal-consumed');
        const goalDisplay = document.getElementById('cal-goal-display');
        const sumProtein = document.getElementById('sum-protein');
        const sumCarbs = document.getElementById('sum-carbs');
        const sumFat = document.getElementById('sum-fat');

        if (consumed) consumed.textContent = Math.round(totalCal);
        if (goalDisplay) goalDisplay.textContent = calorieGoal;
        if (sumProtein) sumProtein.textContent = Math.round(totalProtein);
        if (sumCarbs) sumCarbs.textContent = Math.round(totalCarbs);
        if (sumFat) sumFat.textContent = Math.round(totalFat);

        // Update ring
        const ring = document.querySelector('.main-cal-ring');
        if (ring) {
            const progress = Math.min(totalCal / calorieGoal, 1);
            ring.style.setProperty('--progress', progress);
        }
    }

    // --- MEAL LOGGING ---
    const mealTypeButtons = document.querySelectorAll('.meal-type');
    mealTypeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            mealTypeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedMealType = btn.dataset.type;
        });
    });

    // Meal food search
    const mealInput = document.getElementById('meal-food-input');
    const mealSuggestions = document.getElementById('meal-food-suggestions');

    if (mealInput) {
        mealInput.addEventListener('input', () => {
            const q = mealInput.value.toLowerCase().trim();
            if (q.length < 2) {
                mealSuggestions.classList.remove('active');
                selectedFood = null;
                return;
            }
            const results = FOOD_DATABASE.filter(f => f.name.toLowerCase().includes(q)).slice(0, 5);
            if (results.length > 0) {
                mealSuggestions.innerHTML = results.map(f => `
                    <div class="suggestion-item" data-name="${f.name}">
                        <span class="s-name">${f.emoji} ${f.name}</span>
                        <span class="s-cal">${f.calories} cal</span>
                    </div>
                `).join('');
                mealSuggestions.classList.add('active');
                mealSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
                    item.addEventListener('click', () => {
                        mealInput.value = item.dataset.name;
                        selectedFood = FOOD_DATABASE.find(f => f.name === item.dataset.name);
                        mealSuggestions.classList.remove('active');
                    });
                });
            } else {
                mealSuggestions.classList.remove('active');
            }
        });
    }

    const addMealBtn = document.getElementById('add-meal-btn');
    if (addMealBtn) {
        addMealBtn.addEventListener('click', () => {
            if (!selectedFood) {
                // Try to find by input value
                selectedFood = FOOD_DATABASE.find(f => f.name.toLowerCase() === (mealInput?.value || '').toLowerCase());
            }
            if (!selectedFood) {
                alert('Please select a food item from the suggestions.');
                return;
            }

            const qty = parseFloat(document.getElementById('meal-qty')?.value || 1);
            const entry = {
                id: Date.now(),
                name: selectedFood.name,
                emoji: selectedFood.emoji,
                type: selectedMealType,
                calories: selectedFood.calories * qty,
                protein: selectedFood.protein * qty,
                carbs: selectedFood.carbs * qty,
                fat: selectedFood.fat * qty,
            };
            mealLog.push(entry);
            saveState();
            renderMealLog();
            updateSummary();

            // Reset
            if (mealInput) mealInput.value = '';
            selectedFood = null;
            document.getElementById('meal-qty').value = 1;
        });
    }

    function renderMealLog() {
        const list = document.getElementById('meal-log-list');
        if (!list) return;

        if (mealLog.length === 0) {
            list.innerHTML = `<div class="empty-log"><p>No meals logged yet today. Start by adding your first meal!</p></div>`;
            return;
        }

        const typeLabels = { breakfast: '🌅 Breakfast', lunch: '☀️ Lunch', dinner: '🌙 Dinner', snack: '🍎 Snack' };
        list.innerHTML = mealLog.map(m => `
            <div class="log-item" data-id="${m.id}">
                <div class="log-item-info">
                    <span class="log-item-name">${m.emoji} ${m.name}</span>
                    <span class="log-item-type">${typeLabels[m.type] || m.type}</span>
                </div>
                <span class="log-item-cal">${Math.round(m.calories)} cal</span>
                <button class="log-item-remove" data-id="${m.id}">×</button>
            </div>
        `).join('');

        list.querySelectorAll('.log-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                mealLog = mealLog.filter(m => m.id !== id);
                saveState();
                renderMealLog();
                updateSummary();
            });
        });
    }

    // --- WATER TRACKER ---
    const waterFill = document.getElementById('water-fill');
    const waterAmount = document.getElementById('water-amount');
    const waterAdd = document.getElementById('water-add');
    const waterRemove = document.getElementById('water-remove');

    function updateWater() {
        if (waterAmount) waterAmount.textContent = waterCount;
        if (waterFill) waterFill.style.height = Math.min((waterCount / 8) * 100, 100) + '%';
    }

    function renderProfile() {
        const profileUsername = document.getElementById('profile-username');
        const profileEmail = document.getElementById('profile-email');
        const profileStatus = document.getElementById('profile-status');
        const profileMeals = document.getElementById('profile-meals-count');
        const profileWorkouts = document.getElementById('profile-workouts-count');
        const profileWater = document.getElementById('profile-water-count');
        const profileCalories = document.getElementById('profile-calories-count');
        const profileMessage = document.getElementById('profile-message');

        const loggedIn = Boolean(authManager.currentUser);
        if (profileMessage) {
            profileMessage.classList.toggle('hidden', loggedIn);
        }
        if (profileUsername) {
            profileUsername.textContent = loggedIn ? authManager.currentUser : '—';
        }
        if (profileEmail) {
            const user = authManager.users.find(u => u.username === authManager.currentUser);
            profileEmail.textContent = loggedIn && user ? user.email : '—';
        }
        if (profileStatus) {
            profileStatus.textContent = loggedIn ? 'Signed in' : 'Not signed in';
        }
        if (profileMeals) {
            profileMeals.textContent = mealLog.length.toString();
        }
        if (profileWorkouts) {
            profileWorkouts.textContent = workoutLog.length.toString();
        }
        if (profileWater) {
            profileWater.textContent = waterCount.toString();
        }
        if (profileCalories) {
            const totalCalories = mealLog.reduce((sum, entry) => sum + entry.calories, 0);
            profileCalories.textContent = Math.round(totalCalories).toString();
        }

        // Toggle Admin Card and Lock Overlay visibility based on owner status
        const profileAdminCard = document.getElementById('profile-admin-card');
        if (profileAdminCard) {
            if (authManager.isOwner()) {
                profileAdminCard.classList.remove('hidden');
            } else {
                profileAdminCard.classList.add('hidden');
            }
        }

        const adminLockOverlay = document.getElementById('admin-lock-overlay');
        if (adminLockOverlay) {
            if (authManager.isOwner()) {
                adminLockOverlay.classList.add('unlocked');
            } else {
                adminLockOverlay.classList.remove('unlocked');
            }
        }

        // --- PROFILE ADMIN CONSOLE CARD ---
        const adminUsersList = document.getElementById('admin-users-list');
        if (adminUsersList) {
            if (authManager.isOwner()) {
                adminUsersList.innerHTML = `
                    <div style="text-align:center; padding:15px; color:var(--text-secondary); font-size:13px;">
                        <span style="font-size:24px; display:block; margin-bottom:8px;">🛠️</span>
                        <strong>Admin Panel Activated!</strong>
                        <p style="margin-top:6px; font-size:12px; line-height:1.4; color:var(--text-light);">Use the dedicated <strong>Admin Panel</strong> in the navigation bar to customize the site, change credentials, or manage user suspensions.</p>
                        <a href="#admin-panel" class="btn btn-glass" style="margin-top: 12px; width: 100%; display: block; font-size:12px; padding:8px 12px; text-align:center;">Open Admin Panel</a>
                    </div>
                `;
            } else {
                adminUsersList.innerHTML = `<div class="admin-empty">Sign in to control this website.</div>`;
            }
        }

        // --- DEDICATED ADMIN DASHBOARD USER LIST ---
        const adminPanelUsersList = document.getElementById('admin-panel-users-list');
        if (adminPanelUsersList) {
            const allUsers = authManager.users || [];
            if (allUsers.length === 0) {
                adminPanelUsersList.innerHTML = `<div class="admin-empty">No accounts registered yet.</div>`;
            } else {
                adminPanelUsersList.innerHTML = allUsers.map(user => {
                    const isGoogle = user.password === 'google_oauth_secure_token' || user.password?.endsWith('_oauth');
                    const isCurrent = user.username === authManager.currentUser;
                    const isSuspended = user.suspended === true;
                    
                    let actionMarkup = '';
                    if (isCurrent) {
                        actionMarkup = '<span style="font-size:11px;color:var(--green);font-weight:600;">Active</span>';
                    } else {
                        actionMarkup = `
                            <div class="admin-actions-group">
                                <button class="admin-user-suspend ${isSuspended ? 'suspended-state' : 'active-state'}" data-username="${user.username}" title="${isSuspended ? 'Unsuspend Account' : 'Suspend Account'}">
                                    ${isSuspended ? 'Unsuspend' : 'Suspend'}
                                </button>
                                <button class="admin-user-delete" data-username="${user.username}" title="Delete Account">×</button>
                            </div>
                        `;
                    }
                    
                    return `
                        <div class="admin-user-item ${isSuspended ? 'suspended' : ''}">
                            <div class="admin-user-info">
                                <span class="admin-user-name">${user.username} ${isCurrent ? '⭐' : ''}</span>
                                <span class="admin-user-type">${isGoogle ? 'Google Account' : 'Standard Account'}</span>
                            </div>
                            ${actionMarkup}
                        </div>
                    `;
                }).join('');

                // Bind suspend buttons dynamically
                adminPanelUsersList.querySelectorAll('.admin-user-suspend').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const targetUser = btn.dataset.username;
                        const userObj = authManager.users.find(u => u.username === targetUser);
                        if (userObj) {
                            userObj.suspended = !userObj.suspended;
                            authManager.saveUsers();
                            
                            // Refresh UI
                            renderProfile();
                            renderAuthUI();
                            if (refreshTracker) refreshTracker();
                        }
                    });
                });

                // Bind delete buttons dynamically
                adminPanelUsersList.querySelectorAll('.admin-user-delete').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const targetUser = btn.dataset.username;
                        if (confirm(`Are you sure you want to delete the account "${targetUser}"? This will erase all their logged data.`)) {
                            // Remove user
                            authManager.users = authManager.users.filter(u => u.username !== targetUser);
                            authManager.saveUsers();
                            
                            // Clean up specific user storage keys
                            const prefix = `vf_${sanitizeUserId(targetUser)}_`;
                            const keysToRemove = [];
                            for (let i = 0; i < localStorage.length; i++) {
                                const key = localStorage.key(i);
                                if (key && key.startsWith(prefix)) {
                                    keysToRemove.push(key);
                                }
                            }
                            keysToRemove.forEach(k => localStorage.removeItem(k));
                            
                            // Clean up Google account chooser list if Google account
                            let googleAccounts = JSON.parse(localStorage.getItem('vf_google_accounts') || '[]');
                            const deletedUserObj = allUsers.find(u => u.username === targetUser);
                            if (deletedUserObj && deletedUserObj.email) {
                                googleAccounts = googleAccounts.filter(email => email.toLowerCase() !== deletedUserObj.email.toLowerCase());
                                localStorage.setItem('vf_google_accounts', JSON.stringify(googleAccounts));
                            }

                            // Refresh
                            renderProfile();
                            renderAuthUI();
                            if (refreshTracker) refreshTracker();
                        }
                    });
                });
            }
        }

        // Bind reset database button in admin panel danger zone
        const adminPanelResetBtn = document.getElementById('admin-panel-reset-btn');
        if (adminPanelResetBtn && !adminPanelResetBtn.dataset.bound) {
            adminPanelResetBtn.dataset.bound = "true";
            adminPanelResetBtn.addEventListener('click', () => {
                if (confirm("WARNING: Are you sure you want to RESET the entire database? This will delete all users, all meal logs, workout history, and water intake records!")) {
                    localStorage.clear();
                    alert("Database reset successfully! Reloading page...");
                    window.location.reload();
                }
            });
        }
   
        // Bind reset database button
        const adminResetBtn = document.getElementById('admin-reset-btn');
        if (adminResetBtn && !adminResetBtn.dataset.bound) {
            adminResetBtn.dataset.bound = "true";
            adminResetBtn.addEventListener('click', () => {
                if (confirm("WARNING: Are you sure you want to RESET the entire database? This will delete all users, all meal logs, workout history, and water intake records!")) {
                    localStorage.clear();
                    alert("Database reset successfully! Reloading page...");
                    window.location.reload();
                }
            });
        }
    }

    function initAdminPanel() {
        const adminPanel = document.getElementById('admin-panel');
        if (!adminPanel) return;

        // 1. Handle Admin Tabs switching
        const tabBtns = adminPanel.querySelectorAll('.admin-tab-btn');
        const tabContents = adminPanel.querySelectorAll('.admin-tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                const target = btn.dataset.tab;
                const content = document.getElementById(target);
                if (content) content.classList.add('active');
            });
        });

        // 2. Populate inputs with current settings values
        const titleInput = document.getElementById('admin-site-title');
        const emojiInput = document.getElementById('admin-logo-emoji');
        const caloriesInput = document.getElementById('admin-default-calories');

        if (titleInput) titleInput.value = settingsManager.settings.siteTitle || "Saurabh Health";
        if (emojiInput) emojiInput.value = settingsManager.settings.logoEmoji || "💚";
        if (caloriesInput) caloriesInput.value = settingsManager.settings.defaultCalories || "2000";

        // Populate security fields
        const newUsernameInput = document.getElementById('admin-new-username');
        if (newUsernameInput) {
            const owner = authManager.users.find(u => u.role === 'owner');
            if (owner) newUsernameInput.value = owner.username;
        }

        // 3. Admin Security Form Submit (Change Credentials)
        const securityForm = document.getElementById('admin-security-form');
        if (securityForm) {
            securityForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const newUsername = document.getElementById('admin-new-username').value.trim();
                const newPassword = document.getElementById('admin-new-password').value;
                const confirmPassword = document.getElementById('admin-confirm-password').value;

                if (newPassword !== confirmPassword) {
                    alert("Passwords do not match!");
                    return;
                }

                const owner = authManager.users.find(u => u.role === 'owner');
                if (owner) {
                    const oldUsername = owner.username;
                    
                    // Ensure new username doesn't conflict with another user
                    const conflict = authManager.users.some(u => u.username.toLowerCase() === newUsername.toLowerCase() && u.role !== 'owner');
                    if (conflict) {
                        alert("That username is already taken by a standard user!");
                        return;
                    }

                    owner.username = newUsername;
                    owner.password = newPassword;
                    authManager.saveUsers();

                    if (authManager.currentUser === oldUsername) {
                        authManager.setCurrentUser(newUsername);
                    }

                    alert("Owner credentials updated successfully! Reloading to apply changes...");
                    window.location.reload();
                }
            });
        }

        // 4. Site Customizations Form Submit
        const settingsForm = document.getElementById('admin-settings-form');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const titleVal = titleInput.value.trim();
                const emojiVal = emojiInput.value.trim();
                const caloriesVal = caloriesInput.value.trim();

                if (!titleVal || !emojiVal || !caloriesVal) {
                    alert("Please fill out all customization fields!");
                    return;
                }

                settingsManager.settings.siteTitle = titleVal;
                settingsManager.settings.logoEmoji = emojiVal;
                settingsManager.settings.defaultCalories = caloriesVal;
                settingsManager.save();
                settingsManager.apply();

                alert("Site brand customizations applied successfully! Reloading...");
                window.location.reload();
            });
        }

        // 5. Food Database Form Submit (Add Custom Foods)
        const foodForm = document.getElementById('admin-food-form');
        if (foodForm) {
            foodForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emojiVal = document.getElementById('admin-food-emoji').value.trim();
                const nameVal = document.getElementById('admin-food-name').value.trim();
                const servingVal = document.getElementById('admin-food-serving').value.trim();
                const caloriesVal = parseInt(document.getElementById('admin-food-calories').value);
                const proteinVal = parseFloat(document.getElementById('admin-food-protein').value);
                const carbsVal = parseFloat(document.getElementById('admin-food-carbs').value);
                const fatVal = parseFloat(document.getElementById('admin-food-fat').value);

                const customFood = {
                    emoji: emojiVal,
                    name: nameVal,
                    serving: servingVal,
                    calories: caloriesVal,
                    protein: proteinVal,
                    carbs: carbsVal,
                    fat: fatVal,
                    category: 'Popular'
                };

                const customFoods = JSON.parse(localStorage.getItem('vf_custom_popular_foods') || '[]');
                if (customFoods.some(f => f.name.toLowerCase() === nameVal.toLowerCase()) || FOOD_DATABASE.some(f => f.name.toLowerCase() === nameVal.toLowerCase())) {
                    alert("A food item with that name already exists in the database!");
                    return;
                }

                customFoods.unshift(customFood);
                localStorage.setItem('vf_custom_popular_foods', JSON.stringify(customFoods));

                alert(`"${nameVal}" has been successfully added to the Popular Foods grid for all users!`);
                window.location.reload();
            });
        }
    }

    if (waterAdd) {
        waterAdd.addEventListener('click', () => {
            if (waterCount < 20) {
                waterCount++;
                saveState();
                updateWater();
            }
        });
    }

    if (waterRemove) {
        waterRemove.addEventListener('click', () => {
            if (waterCount > 0) {
                waterCount--;
                saveState();
                updateWater();
            }
        });
    }

    // --- WORKOUT LOG ---
    const workoutNameInput = document.getElementById('workout-name-input');
    const workoutSets = document.getElementById('workout-sets');
    const workoutReps = document.getElementById('workout-reps');
    const workoutDuration = document.getElementById('workout-duration');
    const addWorkoutBtn = document.getElementById('add-workout-btn');

    if (addWorkoutBtn) {
        addWorkoutBtn.addEventListener('click', () => {
            const name = workoutNameInput?.value?.trim();
            if (!name) {
                alert('Please enter an exercise name.');
                return;
            }
            const entry = {
                id: Date.now(),
                name,
                sets: workoutSets?.value || '-',
                reps: workoutReps?.value || '-',
                duration: workoutDuration?.value || '-',
            };
            workoutLog.push(entry);
            saveState();
            renderWorkoutLog();

            // Reset
            if (workoutNameInput) workoutNameInput.value = '';
            if (workoutSets) workoutSets.value = '';
            if (workoutReps) workoutReps.value = '';
            if (workoutDuration) workoutDuration.value = '';
        });
    }

    function renderWorkoutLog() {
        const list = document.getElementById('workout-log-list');
        if (!list) return;

        if (workoutLog.length === 0) {
            list.innerHTML = `<div class="empty-log"><p>No workouts logged yet today.</p></div>`;
            return;
        }

        list.innerHTML = workoutLog.map(w => `
            <div class="workout-log-item">
                <div class="wl-info">
                    <span class="wl-name">${w.name}</span>
                    <span class="wl-details">${w.sets !== '-' ? w.sets + ' sets' : ''} ${w.reps !== '-' ? '× ' + w.reps + ' reps' : ''} ${w.duration !== '-' ? '• ' + w.duration + ' min' : ''}</span>
                </div>
                <button class="wl-remove" data-id="${w.id}">×</button>
            </div>
        `).join('');

        list.querySelectorAll('.wl-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                workoutLog = workoutLog.filter(w => w.id !== id);
                saveState();
                renderWorkoutLog();
            });
        });
    }

    // Initialize
    renderMealLog();
    updateSummary();
    updateWater();
    renderWorkoutLog();
    renderProfile();

    refreshTracker = function() {
        mealLog = JSON.parse(localStorage.getItem(getUserStorageKey('mealLog')) || '[]');
        workoutLog = JSON.parse(localStorage.getItem(getUserStorageKey('workoutLog')) || '[]');
        waterCount = parseInt(localStorage.getItem(getUserStorageKey('water')) || '0');
        const savedDate = localStorage.getItem(getUserStorageKey('date'));
        if (savedDate !== today) {
            mealLog = [];
            workoutLog = [];
            waterCount = 0;
            localStorage.setItem(getUserStorageKey('date'), today);
        }
        calorieGoal = parseInt(localStorage.getItem('vf_admin_calorie_goal') || '2000');
        renderMealLog();
        updateSummary();
        updateWater();
        renderWorkoutLog();
        renderProfile();
    };
})();


// ==========================================
// 12. SMOOTH SCROLL for anchor links (Event Delegation)
// ==========================================
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    
    const href = link.getAttribute('href');
    if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    try {
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    } catch (err) {
        console.warn('Invalid scroll selector:', href);
    }
});


// ==========================================
// 13. KEYBOARD SHORTCUT: Escape closes modal
// ==========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('exercise-modal');
        if (modal && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }
});

console.log('🌿 Saurabh Health loaded successfully!');
