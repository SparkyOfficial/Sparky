// Matrix Rain Effect
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?СПАРКИ';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.init();
        this.animate();
    }
    
    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }
    
    draw() {
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff41';
        this.ctx.font = `${this.fontSize}px JetBrains Mono`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
    
    resize() {
        this.init();
    }
}

// Initialize Matrix Rain
document.addEventListener('DOMContentLoaded', () => {
    const matrix = new MatrixRain();
    
    window.addEventListener('resize', () => {
        matrix.resize();
    });
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Skill bars animation
const observeSkills = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
};

// Coffee counter animation
let coffeeCount = 0;
const maxCoffee = 42;

const animateCoffeeCounter = () => {
    const counter = document.getElementById('coffee-counter');
    if (counter) {
        const interval = setInterval(() => {
            coffeeCount++;
            counter.textContent = coffeeCount;
            if (coffeeCount >= maxCoffee) {
                clearInterval(interval);
                counter.style.color = '#ffd700';
                counter.style.textShadow = '0 0 10px #ffd700';
            }
        }, 100);
    }
};

// Drama level fluctuation
const animateDramaLevel = () => {
    const dramaLevel = document.getElementById('drama-level');
    if (dramaLevel) {
        setInterval(() => {
            const level = Math.floor(Math.random() * 100) + 1;
            dramaLevel.textContent = level;
            
            if (level > 80) {
                dramaLevel.style.color = '#ff6b35';
                dramaLevel.style.textShadow = '0 0 10px #ff6b35';
            } else if (level > 50) {
                dramaLevel.style.color = '#ffd700';
                dramaLevel.style.textShadow = '0 0 10px #ffd700';
            } else {
                dramaLevel.style.color = '#00ff41';
                dramaLevel.style.textShadow = '0 0 10px #00ff41';
            }
        }, 2000);
    }
};

// Typing effect for hero title
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Typing effect for hero title
    const heroTitle = document.querySelector('.typing-text');
    if (heroTitle) {
        const text = heroTitle.getAttribute('data-text');
        typeWriter(heroTitle, text, 150);
    }
    
    // Initialize skill bars observer
    observeSkills();
    
    // Start footer animations
    setTimeout(animateCoffeeCounter, 2000);
    setTimeout(animateDramaLevel, 3000);
});

// Parallax effect for floating icons
document.addEventListener('mousemove', (e) => {
    const icons = document.querySelectorAll('.floating-icons i');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    icons.forEach((icon, index) => {
        const speed = (index + 1) * 0.5;
        const xPos = (x - 0.5) * speed * 50;
        const yPos = (y - 0.5) * speed * 50;
        
        icon.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${xPos}deg)`;
    });
});

// Easter eggs and meme interactions
document.addEventListener('DOMContentLoaded', () => {
    // Konami code easter egg
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            activateEasterEgg();
        }
    });
    
    const activateEasterEgg = () => {
        document.body.style.animation = 'rainbow 2s infinite';
        
        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Show special message
        const message = document.createElement('div');
        message.innerHTML = '🎉 SPARKY MODE ACTIVATED! 🎉';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff6b35, #ffd700, #00ff41);
            color: #000;
            padding: 2rem;
            border-radius: 20px;
            font-size: 2rem;
            font-weight: bold;
            z-index: 10000;
            animation: bounce 1s infinite;
        `;
        
        const bounceStyle = document.createElement('style');
        bounceStyle.textContent = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translate(-50%, -50%) translateY(0); }
                40% { transform: translate(-50%, -50%) translateY(-30px); }
                60% { transform: translate(-50%, -50%) translateY(-15px); }
            }
        `;
        document.head.appendChild(bounceStyle);
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
            document.body.style.animation = '';
        }, 5000);
    };
    
    // Click counter for coffee addiction
    let clickCount = 0;
    document.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 100) {
            showCoffeeAddictionWarning();
        }
    });
    
    const showCoffeeAddictionWarning = () => {
        const warning = document.createElement('div');
        warning.innerHTML = '☕ ВНИМАНИЕ: Обнаружена кофеиновая зависимость! ☕';
        warning.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(255, 107, 53, 0.9);
            color: white;
            padding: 1rem;
            border-radius: 10px;
            font-family: 'JetBrains Mono', monospace;
            z-index: 1000;
            animation: shake 0.5s infinite;
        `;
        
        const shakeStyle = document.createElement('style');
        shakeStyle.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(shakeStyle);
        
        document.body.appendChild(warning);
        
        setTimeout(() => {
            warning.remove();
        }, 3000);
    };
});

// Glitch effect on scroll
window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    
    if (scrollPercent > 0.8) {
        document.querySelectorAll('.glitch').forEach(element => {
            element.style.animationDuration = '0.1s';
        });
    } else {
        document.querySelectorAll('.glitch').forEach(element => {
            element.style.animationDuration = '0.5s';
        });
    }
});

// Dynamic project status updates
const updateProjectStatuses = () => {
    const statuses = ['Active', 'Legendary', 'Completed', 'In Development', 'Revolutionary'];
    const statusClasses = ['active', 'legendary', 'completed', 'development', 'revolutionary'];
    
    document.querySelectorAll('.project-status').forEach((status, index) => {
        if (Math.random() > 0.95) { // 5% chance to change
            const randomIndex = Math.floor(Math.random() * statuses.length);
            status.textContent = statuses[randomIndex];
            status.className = `project-status ${statusClasses[randomIndex]}`;
        }
    });
};

// Update project statuses every 10 seconds for dynamic effect
setInterval(updateProjectStatuses, 10000);

// Console easter egg
console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║   ███████╗██████╗  █████╗ ██████╗ ██╗  ██╗██╗   ██╗                         ║
║   ██╔════╝██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝╚██╗ ██╔╝                         ║
║   ███████╗██████╔╝███████║██████╔╝█████╔╝  ╚████╔╝                          ║
║   ╚════██║██╔═══╝ ██╔══██║██╔══██╗██╔═██╗   ╚██╔╝                           ║
║   ███████║██║     ██║  ██║██║  ██║██║  ██╗   ██║                            ║
║   ╚══════╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝                            ║
║                                                                              ║
║   Добро пожаловать в консоль Sparky!                                        ║
║   Цифровой революционер и защитник виртуальных прав                         ║
║                                                                              ║
║   Попробуйте:                                                                ║
║   - Konami Code (↑↑↓↓←→←→BA) для активации Sparky Mode                      ║
║   - Кликните 100 раз для предупреждения о кофеиновой зависимости            ║
║   - Прокрутите до конца для усиления глитч-эффекта                           ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
`);

// Performance monitoring
const performanceMonitor = {
    start: performance.now(),
    
    logPerformance() {
        const loadTime = performance.now() - this.start;
        console.log(`🚀 Сайт загружен за ${loadTime.toFixed(2)}ms`);
        console.log(`⚡ Уровень мощности: ${loadTime < 1000 ? 'МАКСИМАЛЬНЫЙ' : 'ВЫСОКИЙ'}`);
    }
};

window.addEventListener('load', () => {
    performanceMonitor.logPerformance();
});

// Meme quotes rotation
const memeQuotes = [
    "Конституція Спарки < Конституция Украины",
    "64 кбит/с - это не баг, это фича",
    "/setblock grass - команда жизни",
    "BalDusa до сих пор должен лайки",
    "Creative+ vs Mineland: эпическая битва веков",
    "Кофе от 0 до ∞ - математика Спарки",
    "193 см роста, 69 кг веса, 100% мощности"
];

let currentQuoteIndex = 0;

const rotateQuotes = () => {
    const quoteElement = document.createElement('div');
    quoteElement.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: rgba(0, 255, 65, 0.95);
        border: 1px solid #00ff41;
        color: #000;
        padding: 1rem;
        border-radius: 8px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.9rem;
        max-width: 300px;
        z-index: 1500;
        animation: slideIn 0.5s ease;
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
    `;
    
    const slideStyle = document.createElement('style');
    slideStyle.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(slideStyle);
    
    quoteElement.textContent = memeQuotes[currentQuoteIndex];
    document.body.appendChild(quoteElement);
    
    setTimeout(() => {
        quoteElement.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => quoteElement.remove(), 500);
    }, 4000);
    
    currentQuoteIndex = (currentQuoteIndex + 1) % memeQuotes.length;
};

// Start quote rotation after 5 seconds, then every 15 seconds
setTimeout(() => {
    rotateQuotes();
    setInterval(rotateQuotes, 15000);
}, 5000);

// Add some chaos to the page
const addChaos = () => {
    // Random glitch effects
    setInterval(() => {
        if (Math.random() > 0.98) {
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 100);
        }
    }, 1000);
    
    // Random screen shake
    setInterval(() => {
        if (Math.random() > 0.995) {
            document.body.style.animation = 'shake 0.5s';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 500);
        }
    }, 2000);
};

// Initialize chaos after page load
setTimeout(addChaos, 10000);

// Secret developer mode
let devModeClicks = 0;
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('glitch')) {
        devModeClicks++;
        if (devModeClicks === 5) {
            activateDevMode();
        }
    }
});

const activateDevMode = () => {
    console.log('🔧 DEVELOPER MODE ACTIVATED');
    console.log('Available commands:');
    console.log('- sparky.getCoffeeLevel() - Get current coffee level');
    console.log('- sparky.getDramaLevel() - Get current drama level');
    console.log('- sparky.activateGodMode() - Activate god mode');
    console.log('- sparky.summonBalDusa() - Summon BalDusa for epic battle');
    
    window.sparky = {
        getCoffeeLevel: () => coffeeCount,
        getDramaLevel: () => document.getElementById('drama-level')?.textContent || 'Unknown',
        activateGodMode: () => {
            document.body.style.background = 'linear-gradient(45deg, #ff6b35, #ffd700, #00ff41)';
            document.body.style.animation = 'rainbow 1s infinite';
            console.log('🔥 GOD MODE ACTIVATED! 🔥');
        },
        summonBalDusa: () => {
            const baldusa = document.createElement('div');
            baldusa.innerHTML = '👹 BalDusa появился! Готовьтесь к эпической битве!';
            baldusa.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #ff0000;
                color: white;
                padding: 2rem;
                border-radius: 10px;
                font-size: 1.5rem;
                z-index: 10001;
                animation: shake 0.5s infinite;
            `;
            document.body.appendChild(baldusa);
            setTimeout(() => baldusa.remove(), 5000);
        }
    };
};
