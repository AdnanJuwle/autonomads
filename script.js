// Hybrid Terminal-Professional JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const sidePanelNavItems = document.querySelectorAll('.side-panel-nav .nav-item');
    
    // Enhanced navigation function with smooth transitions
    function switchSection(sectionName) {
        console.log('Switching to section:', sectionName);
        
        // Add transition class for smooth animation
        document.body.classList.add('transitioning');
        
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
        
        // Update content sections with smooth transition
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Use setTimeout for smooth transition
        setTimeout(() => {
            const activeSection = document.getElementById(sectionName);
            if (activeSection) {
                activeSection.classList.add('active');
                // Smooth scroll to section
                activeSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start',
                    inline: 'nearest'
                });
            }
            
            // Remove transition class
            document.body.classList.remove('transitioning');
        }, 150);
        
        // Update URL hash
        window.location.hash = sectionName;
        
    // Add terminal output for new section (throttled for performance)
    requestAnimationFrame(() => {
        addTerminalOutput(sectionName);
    });
    }
    
    // Handle hash navigation on page load with improved positioning
    function handleHashNavigation() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            // Prevent flashy jumps by hiding content initially
            document.body.style.visibility = 'hidden';
            
            // Switch to the hash section
            switchSection(hash);
            
            // Wait for content to load, then show and scroll smoothly
            setTimeout(() => {
                const targetSection = document.getElementById(hash);
                if (targetSection) {
                    // Account for fixed header height
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                // Show content after positioning
                document.body.style.visibility = 'visible';
            }, 100);
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
            team: ['Adnan Juwle (AI/ML Lead)', 'Juned Jiya (Hardware Design)'],
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
            team: ['Adnan Juwle (AI/ML Lead)', 'Juned Jiya (Hardware Design)'],
            actions: [
                { text: 'View GitHub', url: '#', icon: 'fab fa-github', primary: true },
                { text: 'Safety Documentation', url: '#', icon: 'fas fa-shield-alt', primary: false }
            ]
        },
        'street-light': {
            title: 'Smart Street Light System',
            image: 'automata.jpg',
            status: 'In Development',
            statusClass: 'development',
            description: 'AI-enhanced smart streetlight system with real-time monitoring, predictive maintenance, anomaly detection, and energy optimization. Features a comprehensive web dashboard, ML pipeline for failure prediction, and IoT connectivity.',
            techStack: ['IoT', 'Energy Efficiency', 'Smart City', 'Sensors', 'Arduino', 'Raspberry Pi', 'FastAPI', 'Next.js', 'Machine Learning', 'PostgreSQL'],
            timeline: [
                { phase: 'Research Phase', duration: 'Completed', description: 'Technology research and feasibility studies' },
                { phase: 'Prototype Development', duration: 'In Progress', description: 'Hardware prototype and software development with ML pipeline' },
                { phase: 'Testing Phase', duration: 'TBD', description: 'Field testing and performance evaluation' }
            ],
            team: ['Adnan Juwle (AI/ML Lead)', 'Juned Jiya (Hardware Design)'],
            actions: [
                { text: 'View GitHub', url: 'https://github.com/AdnanJuwle/streetlight', icon: 'fab fa-github', primary: true },
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
        },
        'staffroom': {
            title: 'Staffroom App',
            image: 'automata.jpg',
            status: 'Completed',
            statusClass: 'completed',
            description: 'A comprehensive educational management platform like Google Classroom, designed for teachers to manage students, organizations, classes, attendance, resources, and discussions. Features both web application (Flask) and mobile app (Flutter) with full CRUD operations, role-based access control, organization management, discussion forums, resource management, attendance tracking, and schedule system.',
            techStack: ['Flask', 'Flutter', 'Python', 'Dart', 'SQLite', 'REST API', 'Bootstrap', 'Provider', 'Werkzeug', 'Flask-CORS'],
            timeline: [
                { phase: 'Backend Development', duration: 'Ongoing', description: 'Flask backend with REST API, database schema design, authentication, and file uploads' },
                { phase: 'Mobile App Development', duration: 'Ongoing', description: 'Flutter mobile app with Provider state management, API integration, and UI/UX design' },
                { phase: 'Web Frontend', duration: 'Completed', description: 'Bootstrap-based web interface with full CRUD operations' },
                { phase: 'Deployment', duration: 'Completed', description: 'Deployed on Render.com with mobile APK release' }
            ],
            team: ['Adnan Juwle (Backend & Deployment)', 'Naveen Kalage (Flutter Mobile App)', 'Siddhant Khobaragade (Cybersecurity & Authentication)'],
            actions: [
                { text: 'View GitHub', url: 'https://github.com/AdnanJuwle/staffroom', icon: 'fab fa-github', primary: true }
            ]
        },
        // Juned's Projects
        'elevator-automation': {
            title: 'Elevator GAD Automation',
            image: 'automata.jpg',
            status: 'Completed',
            statusClass: 'completed',
            description: 'AutoLISP automation programs for generating General Arrangement Drawings (GAD) for different elevator types. Reduces drawing time from hours to minutes with precise, formula-driven AutoCAD drawings. The system automates complex engineering calculations and generates accurate technical drawings for various elevator configurations.',
            techStack: ['AutoLISP', 'AutoCAD', 'Automation', 'Engineering', 'CAD Programming', 'Formula-Based Design'],
            timeline: [
                { phase: 'Research & Planning', duration: 'Initial Phase', description: 'Analyzed elevator design requirements and drawing specifications' },
                { phase: 'Development', duration: 'Ongoing', description: 'Created AutoLISP scripts for automated GAD generation with formula-driven calculations' },
                { phase: 'Testing & Optimization', duration: 'Completed', description: 'Tested with various elevator types and optimized drawing accuracy' }
            ],
            team: ['Juned Jiya (Solo Developer)'],
            actions: []
        },
        'triwheel-trolley': {
            title: 'Triwheel Stair Climbing Trolley',
            image: 'automata.jpg',
            status: 'In Development',
            statusClass: 'development',
            description: 'Innovative trolley design with triwheel mechanism for efficient stair climbing. Features adaptive wheel system and intelligent load distribution for various terrains. The design enables smooth transitions between flat surfaces and stairs, making it ideal for logistics and material handling applications.',
            techStack: ['Mechanical Design', 'CAD', 'Prototyping', 'Materials', 'Mechanical Engineering', 'Product Design'],
            timeline: [
                { phase: 'Concept Design', duration: 'Initial Phase', description: 'Developed triwheel mechanism concept and initial design sketches' },
                { phase: 'CAD Modeling', duration: 'In Progress', description: 'Creating detailed 3D models and engineering drawings' },
                { phase: 'Prototyping', duration: 'Planned', description: 'Building physical prototype for testing and validation' }
            ],
            team: ['Juned Jiya (Hardware Design)'],
            actions: []
        },
        'rover-hardware': {
            title: 'Rover Hardware & Design',
            image: 'automata.jpg',
            status: 'In Development',
            statusClass: 'development',
            description: 'Hardware design and integration for Prana and Automata rovers. Includes sensor integration, power management, and mechanical systems for autonomous operation. The system features robust power distribution, sensor fusion, and reliable mechanical components for field operation.',
            techStack: ['Arduino', 'Sensors', 'Power Systems', 'Mechanical Design', 'Embedded Systems', 'IoT', 'Hardware Integration'],
            timeline: [
                { phase: 'System Architecture', duration: 'Completed', description: 'Designed overall hardware architecture and component selection' },
                { phase: 'Hardware Integration', duration: 'In Progress', description: 'Integrating sensors, power systems, and control modules' },
                { phase: 'Testing & Optimization', duration: 'Ongoing', description: 'Field testing and system optimization for reliability' }
            ],
            team: ['Juned Jiya (Hardware Design)', 'Adnan Juwle (AI/ML Integration)'],
            actions: []
        },
        'charging-stand': {
            title: '3D Printed Charging Stand',
            image: 'automata.jpg',
            status: 'Completed',
            statusClass: 'completed',
            description: 'Custom 3D printed charging stand with overhang design for efficient device charging. Features modular design and optimized cable management. The stand accommodates multiple devices simultaneously while maintaining a clean, organized workspace.',
            techStack: ['3D Printing', 'CAD Design', 'Prototyping', 'Materials', 'Product Design', 'FDM Printing'],
            timeline: [
                { phase: 'Design Phase', duration: 'Completed', description: 'Created CAD models with overhang design and cable management features' },
                { phase: 'Prototyping', duration: 'Completed', description: '3D printed and tested multiple iterations' },
                { phase: 'Final Production', duration: 'Completed', description: 'Finalized design and produced finished product' }
            ],
            team: ['Juned Jiya (Solo Developer)'],
            actions: []
        },
        // Siddhant's Projects
        'prana-prototype': {
            title: 'Prana Prototype App',
            image: 'automata.jpg',
            status: 'In Development',
            statusClass: 'development',
            description: 'Complete UI/UX design and Kotlin development for the Prana agricultural rover prototype app. Features intuitive farmer interface, real-time data visualization, and seamless rover control. The app provides farmers with easy-to-use tools for monitoring soil conditions, controlling rover operations, and accessing agricultural insights.',
            techStack: ['Kotlin', 'Android Studio', 'Figma', 'Material Design', 'UI/UX Design', 'Mobile Development', 'Android'],
            timeline: [
                { phase: 'UI/UX Design', duration: 'Completed', description: 'Created comprehensive design system and user interface mockups in Figma' },
                { phase: 'Development', duration: 'In Progress', description: 'Implementing Kotlin-based Android application with Material Design' },
                { phase: 'Testing & Integration', duration: 'Planned', description: 'Testing with rover hardware and refining user experience' }
            ],
            team: ['Siddhant Khobaragade (UI/UX & Development)', 'Adnan Juwle (AI/ML Backend)', 'Juned Jiya (Hardware Integration)'],
            actions: []
        },
        'sbi-redesign': {
            title: 'SBI Bank App Redesign',
            image: 'automata.jpg',
            status: 'Completed',
            statusClass: 'completed',
            description: 'Complete UI/UX redesign of SBI bank mobile application. Focused on improving user experience, accessibility, and modern design principles while maintaining brand consistency. The redesign enhances usability, reduces cognitive load, and improves accessibility for all users including those with disabilities.',
            techStack: ['Figma', 'Adobe XD', 'User Research', 'Accessibility', 'UI/UX Design', 'Design Systems', 'Prototyping'],
            timeline: [
                { phase: 'User Research', duration: 'Completed', description: 'Conducted user interviews and analyzed existing app pain points' },
                { phase: 'Design Phase', duration: 'Completed', description: 'Created new design system with improved accessibility and modern UI' },
                { phase: 'Prototyping & Testing', duration: 'Completed', description: 'Built interactive prototypes and conducted usability testing' }
            ],
            team: ['Siddhant Khobaragade (Solo Designer)'],
            actions: []
        },
        'mobile-design-system': {
            title: 'Mobile Design System',
            image: 'automata.jpg',
            status: 'Completed',
            statusClass: 'completed',
            description: 'Comprehensive design system for mobile applications. Includes component library, design tokens, accessibility guidelines, and responsive design patterns for consistent user experience. The system ensures design consistency across multiple applications and provides reusable components for rapid development.',
            techStack: ['Figma', 'Design Tokens', 'Component Library', 'Prototyping', 'Design Systems', 'UI/UX Design'],
            timeline: [
                { phase: 'Research & Planning', duration: 'Completed', description: 'Analyzed design requirements and established design principles' },
                { phase: 'Component Development', duration: 'Completed', description: 'Created comprehensive component library with variants and states' },
                { phase: 'Documentation', duration: 'Completed', description: 'Documented design tokens, usage guidelines, and accessibility standards' }
            ],
            team: ['Siddhant Khobaragade (Solo Designer)'],
            actions: []
        },
        'kotlin-apps': {
            title: 'Kotlin Mobile Apps',
            image: 'automata.jpg',
            status: 'In Development',
            statusClass: 'development',
            description: 'Collection of Kotlin-based mobile applications showcasing modern Android development practices. Features Jetpack Compose, MVVM architecture, and Material Design 3 implementation. The apps demonstrate best practices in Android development including clean architecture, reactive programming, and modern UI frameworks.',
            techStack: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Material Design 3', 'Android', 'Mobile Development', 'Architecture'],
            timeline: [
                { phase: 'Architecture Setup', duration: 'Completed', description: 'Established MVVM architecture and project structure' },
                { phase: 'Development', duration: 'In Progress', description: 'Building apps with Jetpack Compose and Material Design 3' },
                { phase: 'Testing & Refinement', duration: 'Ongoing', description: 'Testing apps and refining user experience' }
            ],
            team: ['Siddhant Khobaragade (Solo Developer)'],
            actions: []
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
        
        // Update status badge if it exists
        const modalStatus = document.getElementById('modalStatus');
        if (modalStatus) {
            modalStatus.textContent = project.status;
            modalStatus.className = `status-badge ${project.statusClass}`;
        }
        
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
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    window.addEventListener('click', (event) => {
        if (modal && event.target === modal) {
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
    
    // Debounced terminal effects - only when section is active
    const debouncedTerminalEffect = debounce(() => {
        const activeOutput = document.querySelector('.content-section.active .terminal-output');
        if (activeOutput && Math.random() < 0.3) { // Only 30% chance, only on active section
            const randomLine = document.createElement('div');
            randomLine.className = 'output-line';
            randomLine.innerHTML = `
                <span class="output">System check: ${Math.random() > 0.5 ? 'OK' : 'Warning'}</span>
            `;
            activeOutput.appendChild(randomLine);
            
            // Remove after 3 seconds
            setTimeout(() => {
                if (randomLine.parentNode) {
                    randomLine.parentNode.removeChild(randomLine);
                }
            }, 3000);
        }
    }, 2000); // Debounced to 2 seconds
    
    // Less frequent terminal effects
    setInterval(debouncedTerminalEffect, 8000); // Much less frequent updates
    
    // Performance optimization: Lazy loading for images
    function initializeLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Throttle function for performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Preload critical images
    function preloadCriticalImages() {
        const criticalImages = [
            'adnan.avif',
            'juned.jpg', 
            'siddhant.jpg',
            'automata.jpg',
            'batman.webp',
            'batpod.jpg',
            'droneswarm.jpg'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    // Initialize lazy loading and preload critical images
    initializeLazyLoading();
    preloadCriticalImages();
});