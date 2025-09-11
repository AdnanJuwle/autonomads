// Hybrid Terminal-Professional JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.dataset.section;
            switchSection(targetSection);
        });
    });
    
    function switchSection(sectionName) {
        // Update navigation
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
        
        // Update content sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');
        
        // Add terminal output for new section
        addTerminalOutput(sectionName);
    }
    
    function addTerminalOutput(sectionName) {
        const section = document.getElementById(sectionName);
        const output = section.querySelector('.terminal-output');
        
        // Add new output line with typing effect
        const newLine = document.createElement('div');
        newLine.className = 'output-line';
        newLine.innerHTML = `
            <span class="prompt">autonomads@terminal:~$</span>
            <span class="command">./${sectionName}.sh</span>
        `;
        
        output.appendChild(newLine);
        
        // Type the command
        const commandElement = newLine.querySelector('.command');
        const commandText = `./${sectionName}.sh`;
        commandElement.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < commandText.length) {
                commandElement.textContent += commandText.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);
    }
    
    // Hero button actions
    const heroButtons = document.querySelectorAll('.terminal-btn[data-target]');
    heroButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            switchSection(target);
        });
    });
    
    // Image loading animation
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease-in-out';
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.team-card, .project-card, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add blinking cursor effect
    const addBlinkingCursor = () => {
        const prompts = document.querySelectorAll('.prompt');
        prompts.forEach(prompt => {
            if (!prompt.querySelector('.cursor')) {
                const cursor = document.createElement('span');
                cursor.className = 'cursor';
                cursor.textContent = '_';
                cursor.style.animation = 'blink 1s infinite';
                prompt.appendChild(cursor);
            }
        });
    };
    
    // Add CSS for blinking animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    addBlinkingCursor();
    
    // Add random terminal output effects (subtle)
    setInterval(() => {
        const outputs = document.querySelectorAll('.terminal-output');
        outputs.forEach(output => {
            if (Math.random() < 0.05) { // 5% chance - much less frequent
                const randomLine = document.createElement('div');
                randomLine.className = 'output-line';
                randomLine.innerHTML = `
                    <span class="output">System check: ${Math.random() > 0.5 ? 'OK' : 'Warning'}</span>
                `;
                output.appendChild(randomLine);
                
                // Remove after 3 seconds
                setTimeout(() => {
                    if (randomLine.parentNode) {
                        randomLine.parentNode.removeChild(randomLine);
                    }
                }, 3000);
            }
        });
    }, 5000); // Less frequent updates
});