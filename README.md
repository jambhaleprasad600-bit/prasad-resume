# Prasad Jambhale - Recruiter-Optimized Resume Website

A professional, high-converting interactive portfolio & resume website specifically engineered for tech recruiters, engineering hiring managers, and enterprise talent acquisition teams.

## 🚀 Live Preview
- The website is actively running on: **[http://localhost:8080](http://localhost:8080)**
- You can also directly open `index.html` in any modern web browser.

---

## ✨ Recruiter-Focused Features

1. **Recruiter Role-Fit Filter**:
   - One-click filters allowing recruiters to instantly highlight Prasad's qualifications for:
     - **Azure & Cloud Infrastructure Engineer**
     - **ITIL Incident & Problem Management Lead**
     - **Linux/Unix & Database Operations**
     - **AI & Automation Specialist**
2. **Instant Executive Pitch / Memo Copiers**:
   - 1-click **"Copy Recruiter Pitch"** & **"Copy Hiring Manager Memo"** buttons that copy perfectly formatted candidate summaries to clipboard for immediate forwarding to clients or hiring managers.
3. **Official PDF Resume Integration**:
   - Built-in **"Preview PDF"** interactive modal to view `Prasad_Jambhale_Resume.pdf` directly without leaving the page.
   - **"Download Resume (PDF)"** direct download link.
4. **Key Enterprise Client Engagements**:
   - **Duke Energy** (Utilities): L2/L3 infrastructure lead, mission-critical outage bridges, zero-downtime CAB governance.
   - **Credit Suisse** (Global Banking): Regulated financial operations, SQL diagnostics, Unix server troubleshooting, financial batch monitoring.
   - **Eriks** (Industrial Services): Hybrid Windows & Linux server administration, KEDB & SOP standardization accelerating MTTR.
5. **Interactive Skill Matrix & Live Search**:
   - Search bar that dynamically filters skills (e.g. typing *Azure*, *SQL*, *RCA*, *Python*, *ServiceNow*).
6. **AI Innovation & Anthropic Certifications Spotlight**:
   - Highlights 2x Anthropic Certifications (**CCAR-F**, **CCAO-F**) and real-world prompt engineering for automated runbooks, RCA drafting, and ~30% manual toil reduction.
7. **Direct Contact & Interview Scheduler**:
   - Direct click-to-call (`+91 8766992177`), direct WhatsApp chat link, and pre-formatted mailto generator for interview scheduling.
8. **ATS / Clean Print Format**:
   - Clean printable stylesheet (`window.print()`) that formats the resume into an ATS-friendly, distraction-free document.
9. **Dark & Light Themes**:
   - Sleek modern dark mode (default) with smooth toggle to high-contrast crisp light mode.

---

## 📁 File Structure
- `index.html` — Main responsive resume & portfolio page
- `styles.css` — Modern design system with dark/light variables, glassmorphism, responsive breakpoints, and print styles
- `app.js` — Client-side interaction logic (role filtering, live skill search, modal controls, clipboard copy, theme persistence)
- `Prasad_Jambhale_Resume.pdf` — Original official resume PDF document
- `start_website.bat` — One-click launcher to run the local server and open the browser

---

## 🛠️ How to Run Locally
Double-click `start_website.bat` or run:
```bash
python -m http.server 8080
```
Then navigate to `http://localhost:8080` in your browser.
