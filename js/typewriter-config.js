class Typewriter {
    constructor(element, languages, options = {}) {
        this.element = element;
        this.languages = languages;
        this.typeSpeed = options.typeSpeed || 150;
        this.deleteSpeed = options.deleteSpeed || 75;
        this.delayBetweenWords = options.delayBetweenWords || 2000;
        this.currentLanguageIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        
        this.init();
    }
    
    init() {
        try {
            this.element.style.borderRight = '2px solid';
            this.element.style.animation = 'blink 1s infinite';
            
            if (!document.getElementById('typewriter-styles')) {
                const style = document.createElement('style');
                style.id = 'typewriter-styles';
                style.textContent = `
                    @keyframes blink {
                        0%, 50% { border-color: transparent; }
                        51%, 100% { border-color: currentColor; }
                    }
                    .typewriter {
                        display: inline-block;
                        padding-right: 4px;
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.element.classList.add('typewriter');
            this.type();
        } catch (error) {
            console.error('Typewriter initialization error:', error);
        }
    }
    
    type() {
        try {
            const currentLanguage = this.languages[this.currentLanguageIndex];
            
            if (this.isDeleting) {
                // Remove characters
                this.element.textContent = currentLanguage.substring(0, this.currentCharIndex - 1);
                this.currentCharIndex--;
                
                if (this.currentCharIndex === 0) {
                    this.isDeleting = false;
                    this.currentLanguageIndex = (this.currentLanguageIndex + 1) % this.languages.length;
                    setTimeout(() => this.type(), 500);
                    return;
                }
                
                setTimeout(() => this.type(), this.deleteSpeed);
            } else {
                // Add characters
                this.element.textContent = currentLanguage.substring(0, this.currentCharIndex + 1);
                this.currentCharIndex++;
                
                if (this.currentCharIndex === currentLanguage.length) {
                    setTimeout(() => {
                        this.isDeleting = true;
                        this.type();
                    }, this.delayBetweenWords);
                    return;
                }
                
                setTimeout(() => this.type(), this.typeSpeed);
            }
        } catch (error) {
            console.error('Typewriter typing error:', error);
        }
    }
}

// Initialize typewriter when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        const typewriterElement = document.getElementById('typewriter-title');
        if (typewriterElement) {
            // Initialize with your custom languages - easily customizable!
            const customLanguages = [
                'नमस्ते',      // Hindi - Namaste
                'Hello',       // English 
                'Bonjour',     // French
                'Guten Tag',   // German
                'こんにちは',    // Japanese - Konnichiwa
            ];
            
            // Create a new typewriter instance with your custom languages
            new Typewriter(typewriterElement, customLanguages, {
                typeSpeed: 180,        // Slightly faster typing
                deleteSpeed: 80,       // Slightly faster deleting  
                delayBetweenWords: 2500 // Shorter delay between words
            });
            
            console.log('Typewriter initialized successfully');
        } else {
            console.warn('Typewriter element not found: #typewriter-title');
        }
    } catch (error) {
        console.error('Typewriter setup error:', error);
    }
}); 