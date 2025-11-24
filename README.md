# Autonomads Terminal

A modern, terminal-themed portfolio website for **Autonomads** - a team of passionate engineers and developers creating innovative autonomous solutions for real-world challenges.

## Overview

Autonomads Terminal is a single-page application (SPA) with a unique terminal-inspired interface that showcases the team, their projects, and individual portfolios. The design combines a retro terminal aesthetic with modern web technologies to create an engaging user experience.

## Features

- **Terminal-Inspired UI**: Command-line style navigation with terminal prompts and output
- **Team Showcase**: Profiles of three team members with skills, social links, and portfolio pages
- **Project Gallery**: Interactive project cards with detailed modals showing:
  - Prana Soil Analysis Rover
  - Automata Planting & Weeding Rover
  - Swarm Drone System
  - Batman Suit
  - Batpod Bike
  - Smart Street Light System
- **Responsive Design**: Fully responsive layout optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Terminal-style animations and transitions
- **Individual Portfolios**: Dedicated portfolio pages for each team member

## Team Members

1. **Adnan Juwle** - AI Engineer & ML Developer
   - Skills: Machine Learning, Computer Vision, Robotics, Python
   - [GitHub](https://github.com/AdnanJuwle) | [LinkedIn](https://www.linkedin.com/in/adnan-juwle-b04816246/)

2. **Juned Jiya** - Hardware Engineer
   - Skills: Hardware Design, Embedded Systems, CAD, AutoLISP
   - [GitHub](https://github.com/juned-sudo) | [LinkedIn](https://www.linkedin.com/in/juned-jiya/)

3. **Siddhant Khobaragade** - UI/UX Designer & Kotlin Developer
   - Skills: UI/UX Design, Kotlin, Android Dev, Figma
   - [GitHub](https://github.com/sid-vid) | [LinkedIn](https://www.linkedin.com/in/sidvid/)

## Project Structure

```
autonomads/
├── index.html              # Main landing page (SPA)
├── team.html               # Team page (standalone)
├── projects.html           # Projects page (standalone)
├── portfolio-adnan.html   # Adnan's portfolio page
├── portfolio-juned.html   # Juned's portfolio page
├── portfolio-siddhant.html # Siddhant's portfolio page
├── styles.css              # Main stylesheet
├── script.js               # JavaScript functionality
├── requirements.txt        # Python dependencies (for preprocessing scripts)
├── create_proper_preprocessing.py  # Data preprocessing utility
├── fix_preprocessing.py    # Preprocessing fix utility
├── README.md              # This file
└── [image files]          # Team photos and project images
```

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS with CSS Variables, Flexbox, Grid
- **Icons**: Font Awesome 6.0
- **Fonts**: JetBrains Mono, Inter (Google Fonts)
- **No Build Process**: Pure vanilla JavaScript, no frameworks required

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. Clone the repository:
```bash
git clone git@github.com:AdnanJuwle/autonomads.git
cd autonomads
```

2. Open the website:
   - **Option 1**: Simply open `index.html` in your web browser
   - **Option 2**: Use a local web server for development:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     ```
   - Then navigate to `http://localhost:8000` in your browser

## Usage

### Navigation

The main page uses terminal-style navigation:
- `./start.sh` - Home section
- `./team.sh` - Team section
- `./projects.sh` - Projects section
- `./about.sh` - About section

### Mobile Navigation

On mobile devices, a hamburger menu appears in the top-right corner. Tap it to open the side navigation panel.

### Viewing Projects

1. Navigate to the Projects section
2. Click on any project card to view detailed information
3. A modal will open with:
   - Project description
   - Technology stack
   - Project timeline
   - Team members involved
   - Links to GitHub and documentation

### Viewing Team Portfolios

1. Navigate to the Team section
2. Click "View Portfolio" on any team member's card
3. This will open their dedicated portfolio page with:
   - Detailed bio
   - Skills breakdown
   - Project highlights
   - Social links

## Customization

### Colors

The color scheme is defined in CSS variables at the top of `styles.css`:

```css
:root {
    --terminal-bg: #0a0a0a;
    --terminal-surface: #1a1a1a;
    --terminal-text: #00ff00;
    --terminal-accent: #00ffff;
    --primary: #00ff88;
    --secondary: #0088ff;
    --accent: #ff8800;
}
```

### Adding New Projects

1. Add project data to the `projectData` object in `script.js`
2. Add a new project card in the Projects section of `index.html`
3. Update the project count in the hero section if needed

### Adding Team Members

1. Add a new team card in the Team section of `index.html`
2. Create a new portfolio page (e.g., `portfolio-newmember.html`)
3. Update the team member count in the hero section

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is for portfolio and educational purposes. All rights reserved.

## Contact

- **Email**: adnanjuwle1@gmail.com
- **Website**: [Autonomads Terminal](https://github.com/AdnanJuwle/autonomads)

## Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- The Autonomads team for their dedication to autonomous systems

---

**Note**: The Python preprocessing scripts (`create_proper_preprocessing.py` and `fix_preprocessing.py`) are utility scripts from a previous project and are not required for the website to function.
