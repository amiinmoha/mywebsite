document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'light';

    // Theme toggle functionality
    themeToggle.addEventListener('change', () => {
        const theme = themeToggle.checked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
});

const translations = {
    en: {
        // Header
        "about": "About Me",
        "experiences": "Experiences",
        "contact": "Contact",

        // About section
        "aboutTitle": "About Me",
        "aboutText1": "Hi! My name is Mohamed Osman Mohamed, and I'm an 18-year-old who loves programming and solving problems, especially when it comes to IT. This website is my very first project as I dive into the world of web development, starting with HTML and CSS.",
        "aboutText2": "I began my journey in programming by learning Python as my first language, which helped me understand the fundamentals of programming and problem-solving. Recently, I decided to shift my focus to building websites, but my passion for programming and learning new things continues to grow.",
        "aboutText3": "This site marks the start of my web development journey, and I'm excited to keep improving and exploring everything the tech world has to offer",

        // Experiences section
        "experiencesTitle": "Experiences",
        "trialApprenticeships": "Trial Apprenticeships",
        "computerScientist": "Computer Scientist",
        "ictComputerScientist": "ICT Computer Scientist",
        "polymechanic": "Polymechanic",
        "in": "in",
        "till": "till"
    },
    de: {
        // Header
        "about": "Über Mich",
        "experiences": "Erfahrungen",
        "contact": "Kontakt",

        // About section
        "aboutTitle": "Über Mich",
        "aboutText1": "Hallo! Ich bin Mohamed Osman Mohamed, ein 18-Jähriger, der Programmierung und Problemlösung liebt, besonders wenn es um IT geht. Diese Website ist mein erstes Projekt, während ich in die Welt der Webentwicklung mit HTML und CSS eintauche.",
        "aboutText2": "Ich begann meine Programmier-Reise mit Python als erste Sprache, was mir half, die Grundlagen der Programmierung und Problemlösung zu verstehen. Kürzlich beschloss ich, mich auf die Entwicklung von Websites zu konzentrieren, aber meine Leidenschaft für Programmierung und das Lernen neuer Dinge wächst weiter.",
        "aboutText3": "Diese Website markiert den Beginn meiner Webentwicklungs-Reise, und ich freue mich darauf, mich weiter zu verbessern und alles zu erkunden, was die Tech-Welt zu bieten hat",

        // Experiences section
        "experiencesTitle": "Erfahrungen",
        "trialApprenticeships": "Schnupperlehren",
        "computerScientist": "Informatiker",
        "ictComputerScientist": "ICT-Informatiker",
        "polymechanic": "Polymechaniker",
        "in": "bei",
        "till": "bis"
    }
};

// Initialize language settings
let currentLang = localStorage.getItem('preferred-language') || 'en';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    setupEventListeners();
});

function initializeLanguage() {
    try {
        const browserLang = navigator.language.split('-')[0];
        const defaultLang = ['en', 'de'].includes(browserLang) ? browserLang : 'en';
        
        // Set initial language
        currentLang = localStorage.getItem('preferred-language') || defaultLang;
        
        // Update select element
        const langSelect = document.getElementById('languageSelect');
        if (langSelect) {
            langSelect.value = currentLang;
        }
        
        // Apply translations
        changeLanguage(currentLang);
    } catch (error) {
        console.error('Error initializing language:', error);
        // Fallback to English if there's an error
        changeLanguage('en');
    }
}

function setupEventListeners() {
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }
}

function changeLanguage(lang) {
    try {
        if (!translations[lang]) {
            throw new Error(`Translation not found for language: ${lang}`);
        }

        document.documentElement.lang = lang;
        currentLang = lang;
        
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            } else {
                console.warn(`Translation missing for key: ${key} in language: ${lang}`);
            }
        });

        localStorage.setItem('preferred-language', lang);
    } catch (error) {
        console.error('Error changing language:', error);
    }
}