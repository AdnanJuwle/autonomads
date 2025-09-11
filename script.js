// Hybrid Terminal-Professional JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const sidePanelNavItems = document.querySelectorAll('.side-panel-nav .nav-item');
    
    // Simple navigation function
    function switchSection(sectionName) {
        console.log('Switching to section:', sectionName);
        
        // Update navigation
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        const activeNavItem = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
        
        // Update side panel navigation
        sidePanelNavItems.forEach(item => {
            item.classList.remove('active');
        });
        const activeSideNavItem = document.querySelector(`.side-panel-nav [data-section="${sectionName}"]`);
        if (activeSideNavItem) activeSideNavItem.classList.add('active');
        
        // Update content sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        const activeSection = document.getElementById(sectionName);
        if (activeSection) {
            activeSection.classList.add('active');
        }
        
        // Update URL hash
        window.location.hash = sectionName;
        
        // Add terminal output for new section
        addTerminalOutput(sectionName);
    }
    
    // Handle hash navigation on page load
    function handleHashNavigation() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            // Always switch to the hash section, regardless of current state
            switchSection(hash);
        }
    }
    
    // Handle hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    // Check for hash on initial load
    handleHashNavigation();
    
    // Sync navigation state on page load
    function syncNavigationState() {
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
            const sectionId = activeSection.id;
            // Update navigation to match active section
            navItems.forEach(item => {
                item.classList.remove('active');
            });
            const activeNavItem = document.querySelector(`[data-section="${sectionId}"]`);
            if (activeNavItem) {
                activeNavItem.classList.add('active');
            }
        }
    }
    
    // Sync navigation state
    syncNavigationState();
    
    // Set up navigation listeners
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.dataset.section;
            switchSection(targetSection);
        });
    });
    
    // Mobile Side Panel Functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileSidePanel = document.getElementById('mobileSidePanel');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const closePanelBtn = document.getElementById('closePanelBtn');
    
    function openMobilePanel() {
        console.log('Opening mobile panel');
        if (mobileSidePanel) mobileSidePanel.classList.add('active');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        if (mobileMenuBtn) mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobilePanel() {
        console.log('Closing mobile panel');
        if (mobileSidePanel) mobileSidePanel.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Event listeners for mobile panel
    if (mobileMenuBtn) {
        console.log('Mobile menu button found');
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openMobilePanel();
        });
    } else {
        console.log('Mobile menu button NOT found');
    }
    
    if (closePanelBtn) {
        console.log('Close panel button found');
        closePanelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMobilePanel();
        });
    } else {
        console.log('Close panel button NOT found');
    }
    
    if (mobileOverlay) {
        console.log('Mobile overlay found');
        mobileOverlay.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeMobilePanel();
        });
    } else {
        console.log('Mobile overlay NOT found');
    }
    
    // Side panel navigation
    sidePanelNavItems.forEach((item, index) => {
        console.log(`Side panel nav item ${index} found`);
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const targetSection = item.dataset.section;
            console.log('Side panel nav clicked:', targetSection);
            switchSection(targetSection);
            closeMobilePanel();
        });
    });
    
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
    
    // Project modal functionality
    const projectButtons = document.querySelectorAll('.project-details-btn');
    const modal = document.getElementById('projectModal');
    const closeBtn = modal.querySelector('.close-btn');
    
    // Project data
    const projectData = {
        'prana': {
            title: 'Prana Soil Analysis Rover',
            image: 'automata.jpg',
            status: 'Research Phase',
            statusClass: 'research',
            description: 'AI-powered autonomous rover for comprehensive soil analysis and agricultural insights. The rover will analyze soil composition, moisture levels, pH, nutrient content, and other critical agricultural parameters to provide farmers with actionable insights for optimal crop management.',
            techStack: ['AI/ML', 'Robotics', 'IoT', 'Computer Vision', 'Python', 'TensorFlow', 'OpenCV', 'Arduino'],
            timeline: [
                { phase: 'Research & Planning', duration: 'April 2025 - August 2025', description: 'Initial research, field studies, and expert consultations' },
                { phase: 'Field Research', duration: 'August 2025', description: 'On-field research to study soil conditions and gather expert advice' },
                { phase: 'Development Phase', duration: 'TBD', description: 'Hardware design and AI model development' }
            ],
            team: ['Adnan Juwle (AI/ML Lead)', 'Juned Jiya (Hardware Design)', 'Siddhant Khobaragade (Software Integration)'],
            actions: [
                { text: 'View GitHub', url: '#', icon: 'fab fa-github', primary: true },
                { text: 'Documentation', url: '#', icon: 'fas fa-book', primary: false }
            ]
        },
        'automata': {
            title: 'Automata Planting & Weeding Rover',
            image: 'automata.jpg',
            status: 'In Development',
            statusClass: 'development',
            description: 'Autonomous agricultural rover for precision planting and intelligent weed management. The rover will use computer vision to identify weeds, perform precision planting, and maintain crops with minimal human intervention.',
            techStack: ['Computer Vision', 'Robotics', 'Automation', 'AI', 'Python', 'OpenCV', 'ROS', 'Arduino'],
            timeline: [
                { phase: 'Project Initiation', duration: 'September 2025', description: 'Project planning and initial software skeleton development' },
                { phase: 'Hardware Acquisition', duration: 'September 9, 2025', description: 'Procurement of necessary hardware components' },
                { phase: 'Development Phase', duration: 'September 10, 2025 - Present', description: 'Hardware design and software testing with IoT integration' },
                { phase: 'Testing & Optimization', duration: 'Ongoing', description: 'Field testing and system optimization' }
            ],
            team: ['Adnan Juwle (AI/ML Lead)', 'Juned Jiya (Hardware Design)', 'Siddhant Khobaragade (Software Integration)'],
            actions: [
                { text: 'View GitHub', url: '#', icon: 'fab fa-github', primary: true },
                { text: 'Progress Updates', url: '#', icon: 'fas fa-chart-line', primary: false }
            ]
        },
        'droneswarm': {
            title: 'Swarm Drone System',
            image: 'droneswarm.jpg',
            status: 'Planning Phase',
            statusClass: 'planning',
            description: 'Coordinated drone swarm for surveillance, mapping, and emergency response applications. The system will feature intelligent coordination algorithms, autonomous flight patterns, and real-time communication between drones.',
            techStack: ['Swarm Intelligence', 'UAV', 'Coordination', 'Communication', 'Python', 'ROS', 'Computer Vision', 'IoT'],
            timeline: [
                { phase: 'Planning Phase', duration: 'October 10, 2025 - October 31, 2025', description: 'System architecture design and technology selection' },
                { phase: 'Development Phase', duration: 'November 2025 - December 2025', description: 'Drone hardware integration and swarm coordination software' },
                { phase: 'Testing Phase', duration: 'January 2026', description: 'Field testing and performance optimization' }
            ],
            team: ['Adnan Juwle (AI/ML Lead)', 'Juned Jiya (Hardware Design)', 'Siddhant Khobaragade (Software Integration)'],
            actions: [
                { text: 'View GitHub', url: '#', icon: 'fab fa-github', primary: true },
                { text: 'Technical Specs', url: '#', icon: 'fas fa-cogs', primary: false }
            ]
        },
        'batman': {
            title: 'Batman Suit',
            image: 'batman.webp',
            status: 'Planning Phase',
            statusClass: 'planning',
            description: 'Advanced wearable technology suit with integrated sensors, communication systems, and smart features. This continuous side project will feature cutting-edge wearable technology, biometric monitoring, and integrated communication systems.',
            techStack: ['Wearable Tech', 'IoT', 'Sensors', 'Smart Materials', 'Arduino', 'Raspberry Pi', 'Bluetooth', 'WiFi'],
            timeline: [
                { phase: 'Mask Development', duration: 'October 10, 2025 - November 2025', description: 'Design and development of smart mask with HUD and communication features' },
                { phase: 'Suit Integration', duration: 'November 2025 - December 2025', description: 'Integration of sensors, communication systems, and smart materials' },
                { phase: 'Tech Integration', duration: 'December 2025', description: 'Final integration of all technological components' }
            ],
            team: ['Adnan Juwle (AI/ML Lead)', 'Juned Jiya (Hardware Design)', 'Siddhant Khobaragade (Software Integration)'],
            actions: [
                { text: 'View GitHub', url: '#', icon: 'fab fa-github', primary: true },
                { text: 'Design Gallery', url: '#', icon: 'fas fa-images', primary: false }
            ]
        },
        'batpod': {
            title: 'Batpod Bike',
            image: 'batpod.jpg',
            status: 'Planning Phase',
            statusClass: 'planning',
            description: 'Autonomous motorcycle with advanced navigation, safety systems, and smart connectivity features. This ambitious project will feature autonomous driving capabilities, advanced safety systems, and integration with smart city infrastructure.',
            techStack: ['Autonomous Vehicles', 'Navigation', 'Safety Systems', 'IoT', 'Computer Vision', 'Machine Learning', 'GPS', 'Sensors'],
            timeline: [
                { phase: 'Planning Phase', duration: 'January 2026 - February 2026', description: 'System architecture and technology research' },
                { phase: 'Development Phase', duration: 'March 2026 - June 2026', description: 'Hardware development and autonomous system integration' },
                { phase: 'Testing Phase', duration: 'July 2026 - August 2026', description: 'Safety testing and performance optimization' }
            ],
            team: ['Adnan Juwle (AI/ML Lead)', 'Juned Jiya (Hardware Design)', 'Siddhant Khobaragade (Software Integration)'],
            actions: [
                { text: 'View GitHub', url: '#', icon: 'fab fa-github', primary: true },
                { text: 'Safety Documentation', url: '#', icon: 'fas fa-shield-alt', primary: false }
            ]
        },
        'street-light': {
            title: 'Smart Street Light System',
            image: 'automata.jpg',
            status: 'Research Phase',
            statusClass: 'research',
            description: 'Intelligent street lighting system with adaptive brightness, energy efficiency, and IoT connectivity. The system will feature motion detection, weather adaptation, remote monitoring, and integration with smart city infrastructure.',
            techStack: ['IoT', 'Energy Efficiency', 'Smart City', 'Sensors', 'Arduino', 'Raspberry Pi', 'WiFi', 'Bluetooth'],
            timeline: [
                { phase: 'Research Phase', duration: 'Ongoing', description: 'Technology research and feasibility studies' },
                { phase: 'Prototype Development', duration: 'TBD', description: 'Hardware prototype and software development' },
                { phase: 'Testing Phase', duration: 'TBD', description: 'Field testing and performance evaluation' }
            ],
            team: ['Adnan Juwle (AI/ML Lead)', 'Juned Jiya (Hardware Design)', 'Siddhant Khobaragade (Software Integration)'],
            actions: [
                { text: 'View GitHub', url: '#', icon: 'fab fa-github', primary: true },
                { text: 'Energy Analysis', url: '#', icon: 'fas fa-bolt', primary: false }
            ]
        },
        // Personal Projects Data
        'medical-ai': {
            title: 'AI Medical Diagnosis System',
            image: 'medical-ai.jpg',
            status: 'Completed',
            statusClass: 'completed',
            description: 'Machine learning system for medical diagnosis using various health parameters and symptoms. Built with comprehensive data preprocessing and multiple ML algorithms for accurate preliminary diagnoses.',
            techStack: ['Python', 'Machine Learning', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'],
            timeline: [
                { phase: 'Data Collection & Preprocessing', duration: 'January 2025', description: 'Gathered and cleaned medical datasets' },
                { phase: 'Model Development', duration: 'January 2025', description: 'Developed multiple ML algorithms for diagnosis' },
                { phase: 'Testing & Validation', duration: 'January 2025', description: 'Validated model accuracy and performance' },
                { phase: 'Deployment', duration: 'January 22, 2025', description: 'Final deployment and documentation' }
            ],
            team: ['Adnan Juwle (Solo Developer)'],
            actions: [
                { text: 'View GitHub', url: 'https://github.com/AdnanJuwle/AI-Medical-Diagnosis-System', icon: 'fab fa-github', primary: true }
            ]
        },
        'vision-aid': {
            title: 'VisionAid - Computer Vision Assistant',
            image: 'vision-aid.jpg',
            status: 'In Development',
            statusClass: 'development',
            description: 'Computer vision application designed to assist visually impaired users by providing real-time object detection, text recognition, and navigation assistance.',
            techStack: ['Python', 'Computer Vision', 'OpenCV', 'TensorFlow', 'TTS', 'Speech Recognition'],
            timeline: [
                { phase: 'Planning & Design', duration: 'November 2024', description: 'Initial planning and system design' },
                { phase: 'Core Development', duration: 'November 2024 - Present', description: 'Developing core computer vision features' },
                { phase: 'Testing & Optimization', duration: 'September 2025', description: 'User testing and performance optimization' },
                { phase: 'Release', duration: 'September 2025', description: 'Final release and deployment' }
            ],
            team: ['Adnan Juwle (Solo Developer)'],
            actions: [
                { text: 'View GitHub', url: 'https://github.com/AdnanJuwle/VisionAid', icon: 'fab fa-github', primary: true }
            ]
        },
        'lecture-summarizer': {
            title: 'AI-Powered Smart Lecture Summarizer',
            image: 'lecture-summarizer.jpg',
            status: 'Completed',
            statusClass: 'completed',
            description: 'Mini project for third year coursework that automatically summarizes lecture content using transformer-based models for efficient note-taking.',
            techStack: ['Python', 'Transformers', 'Hugging Face', 'NLP', 'Summarization'],
            timeline: [
                { phase: 'Development', duration: '2 days', description: 'Rapid development of summarization system' },
                { phase: 'Testing', duration: '1 day', description: 'Testing and validation' }
            ],
            team: ['Adnan Juwle (Solo Developer)'],
            actions: [
                { text: 'View GitHub', url: 'https://github.com/AdnanJuwle/AI-Powered-Smart-Lecture-Summarizer-1', icon: 'fab fa-github', primary: true }
            ]
        },
        'kamil-ai': {
            title: 'Kamil AI Assistant',
            image: 'kamil-ai.jpg',
            status: 'Paused',
            statusClass: 'paused',
            description: 'Built-in offline AI brain using multiple LLMs to provide different functions. A comprehensive AI assistant designed to work without internet connectivity.',
            techStack: ['Python', 'LLMs', 'Offline AI', 'Local Processing', 'Multiple Models'],
            timeline: [
                { phase: 'Planning', duration: 'April 2025', description: 'Initial planning and architecture design' },
                { phase: 'Version 1 Development', duration: 'June 1-20, 2025', description: 'First version development' },
                { phase: 'Version 2 Development', duration: 'June 2025', description: 'Improved second version' },
                { phase: 'Paused', duration: 'June 20, 2025 - Present', description: 'Project currently paused' }
            ],
            team: ['Adnan Juwle (Solo Developer)'],
            actions: [
                { text: 'View v1 GitHub', url: 'https://github.com/AdnanJuwle/Kamil_v1', icon: 'fab fa-github', primary: true },
                { text: 'View v2 GitHub', url: 'https://github.com/AdnanJuwle/Kamil_v2', icon: 'fab fa-github', primary: false }
            ]
        },
        'player-tracking': {
            title: 'Player Tracking System',
            image: 'player-tracking.jpg',
            status: 'Completed',
            statusClass: 'completed',
            description: 'Computer vision system for tracking players in sports videos. Developed as an internship recruitment task with real-time object detection and tracking capabilities.',
            techStack: ['Python', 'Computer Vision', 'Object Tracking', 'OpenCV', 'YOLO'],
            timeline: [
                { phase: 'Development', duration: '3 days', description: 'Rapid development of tracking system' },
                { phase: 'Testing', duration: '1 day', description: 'Testing and validation' }
            ],
            team: ['Adnan Juwle (Solo Developer)'],
            actions: [
                { text: 'View GitHub', url: 'https://github.com/AdnanJuwle/player-tracking-system', icon: 'fab fa-github', primary: true }
            ]
        },
        'trader-analysis': {
            title: 'Trader Behaviour Analysis',
            image: 'trader-analysis.jpg',
            status: 'Completed',
            statusClass: 'completed',
            description: 'Machine learning system for analyzing trader behavior patterns in financial markets. Built for understanding market dynamics and trading patterns.',
            techStack: ['Python', 'Machine Learning', 'Pandas', 'NumPy', 'Financial Analysis'],
            timeline: [
                { phase: 'Development', duration: '3-4 days', description: 'Development of analysis system' },
                { phase: 'Testing', duration: '1 day', description: 'Testing and validation' }
            ],
            team: ['Adnan Juwle (Solo Developer)'],
            actions: [
                { text: 'View GitHub', url: 'https://github.com/AdnanJuwle/trader-behaviour-analysis', icon: 'fab fa-github', primary: true }
            ]
        },
        'sentiment-analysis': {
            title: 'Sentiment Analysis Tool',
            image: 'sentiment-analysis.jpg',
            status: 'Completed',
            statusClass: 'completed',
            description: 'Simple sentiment analysis tool for analyzing text data. Built as a quick side project to understand natural language processing basics.',
            techStack: ['Python', 'Sentiment Analysis', 'TextBlob', 'NLP'],
            timeline: [
                { phase: 'Development', duration: '1 day', description: 'Quick development of sentiment analysis tool' },
                { phase: 'Testing', duration: 'Few hours', description: 'Basic testing and validation' }
            ],
            team: ['Adnan Juwle (Solo Developer)'],
            actions: [
                { text: 'View GitHub', url: 'https://github.com/AdnanJuwle/Sentiment-Analysis', icon: 'fab fa-github', primary: true }
            ]
        }
    };
    
    projectButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.dataset.project;
            const project = projectData[projectId];
            
            if (project) {
                openProjectModal(project);
            }
        });
    });
    
    function openProjectModal(project) {
        // Update modal content
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalImage').src = project.image;
        document.getElementById('modalImage').alt = project.title;
        document.getElementById('modalStatus').textContent = project.status;
        document.getElementById('modalStatus').className = `status-badge ${project.statusClass}`;
        document.getElementById('modalDescription').textContent = project.description;
        
        // Update tech stack
        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = '';
        project.techStack.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            techContainer.appendChild(tag);
        });
        
        // Update timeline
        const timelineContainer = document.getElementById('modalTimeline');
        timelineContainer.innerHTML = '';
        project.timeline.forEach(phase => {
            const phaseDiv = document.createElement('div');
            phaseDiv.className = 'timeline-phase';
            phaseDiv.innerHTML = `
                <h4>${phase.phase}</h4>
                <p class="timeline-duration">${phase.duration}</p>
                <p class="timeline-description">${phase.description}</p>
            `;
            timelineContainer.appendChild(phaseDiv);
        });
        
        // Update team members
        const teamContainer = document.getElementById('modalTeam');
        teamContainer.innerHTML = '';
        project.team.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.className = 'team-member-item';
            memberDiv.textContent = member;
            teamContainer.appendChild(memberDiv);
        });
        
        // Update actions
        const actionsContainer = document.getElementById('modalActions');
        actionsContainer.innerHTML = '';
        project.actions.forEach(action => {
            const actionBtn = document.createElement('a');
            actionBtn.href = action.url;
            actionBtn.className = `modal-btn ${action.primary ? 'modal-btn-primary' : 'modal-btn-secondary'}`;
            actionBtn.innerHTML = `<i class="${action.icon}"></i> ${action.text}`;
            actionsContainer.appendChild(actionBtn);
        });
        
        // Show modal
        modal.style.display = 'block';
    }
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
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