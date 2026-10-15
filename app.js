/* ==========================================================================
   Prasad Jambhale - Recruiter Resume Web App Script
   Interactive Filters, PDF Preview Modal, 1-Click Pitch Copier & Theme Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIconDark = document.getElementById('themeIconDark');
  const themeIconLight = document.getElementById('themeIconLight');
  
  const viewPdfBtn = document.getElementById('viewPdfBtn');
  const pdfModal = document.getElementById('pdfModal');
  const closePdfModalBtn = document.getElementById('closePdfModalBtn');
  
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  
  const quickPitchCopyHeroBtn = document.getElementById('quickPitchCopyHeroBtn');
  const copySummaryBtn = document.getElementById('copySummaryBtn');
  const copyToolkitMemoBtn = document.getElementById('copyToolkitMemoBtn');
  const toolkitMemoContent = document.getElementById('toolkitMemoContent');
  
  const printResumeBtn = document.getElementById('printResumeBtn');
  const interviewForm = document.getElementById('interviewForm');
  
  const roleFilterTabs = document.querySelectorAll('.fit-tab-btn');
  const fitBannerTitle = document.getElementById('fitBannerTitle');
  const fitBannerDesc = document.getElementById('fitBannerDesc');
  
  const skillSearchInput = document.getElementById('skillSearchInput');
  const skillItems = document.querySelectorAll('.skill-item');
  const skillClusters = document.querySelectorAll('.skill-cluster');

  /* ==========================================================================
     1. Toast Notification Helper
     ========================================================================== */
  let toastTimer = null;
  function showToast(message) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage.textContent = message;
    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  /* ==========================================================================
     2. Copy to Clipboard Utility
     ========================================================================== */
  async function copyText(text, successMsg) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast(successMsg || 'Copied to clipboard!');
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      showToast('Error copying to clipboard');
    }
  }

  /* ==========================================================================
     3. Candidate Pitch Content Strings
     ========================================================================== */
  const executivePitch = 
`PRASAD JAMBHALE — CANDIDATE SUMMARY
Role: Technical Lead / Senior ITIL & Cloud Infrastructure Support Engineer
Experience: 4.5+ Years at Cognizant Technology Solutions
Location: Maharashtra, India (Open to Pan-India & Remote)
Phone: +91 8766992177 | Email: jambhaleprasad600@gmail.com

Key Qualifications:
• Leads 5-member support team across 24x7 production operations; 99.5%+ SLA compliance for P1/P2 issues.
• Azure Cloud & Systems: Azure IaaS VMs, Azure Monitor, Log Analytics, Linux (RHEL/Ubuntu/CentOS), Unix, Windows Server.
• Enterprise Engagements: Duke Energy (Utilities) and Credit Suisse (Banking & Financial Services).
• Incident & Problem Lead: Major incident bridges (P1/P2), Root Cause Analysis (RCA/CAPA), 25%+ recurring incident reduction.
• Automation & DB: Python health checks and SQL diagnostics cutting manual effort by ~30%.
• AI Edge: 2x Anthropic Claude Certified (CCAR-F, CCAO-F) with operational prompt engineering for runbooks.
• Education: B.Tech (7.7 CGPA, Aug 2021).`;

  if (quickPitchCopyHeroBtn) {
    quickPitchCopyHeroBtn.addEventListener('click', () => {
      copyText(executivePitch, 'Recruiter pitch copied! Ready to paste into Slack or email.');
    });
  }

  if (copySummaryBtn) {
    copySummaryBtn.addEventListener('click', () => {
      copyText(executivePitch, 'Executive candidate summary copied!');
    });
  }

  if (copyToolkitMemoBtn && toolkitMemoContent) {
    copyToolkitMemoBtn.addEventListener('click', () => {
      copyText(toolkitMemoContent.textContent.trim(), 'Hiring manager submittal memo copied!');
    });
  }

  /* ==========================================================================
     4. Theme Engine (Dark / Light Mode)
     ========================================================================== */
  const savedTheme = localStorage.getItem('pj_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('pj_theme', newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      themeIconDark.style.display = 'none';
      themeIconLight.style.display = 'block';
    } else {
      themeIconDark.style.display = 'block';
      themeIconLight.style.display = 'none';
    }
  }

  /* ==========================================================================
     5. PDF Preview Modal Controls
     ========================================================================== */
  if (viewPdfBtn && pdfModal) {
    viewPdfBtn.addEventListener('click', () => {
      pdfModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closePdfModalBtn && pdfModal) {
    closePdfModalBtn.addEventListener('click', closeModal);
  }

  if (pdfModal) {
    pdfModal.addEventListener('click', (e) => {
      if (e.target === pdfModal) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && pdfModal && pdfModal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    if (pdfModal) {
      pdfModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /* ==========================================================================
     6. Print Resume Function
     ========================================================================== */
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  /* ==========================================================================
     7. Interactive Recruiter Role-Fit Filter
     ========================================================================== */
  const roleSummaries = {
    all: {
      title: "Viewing Complete Profile",
      desc: "Showing all enterprise competencies across Cloud Infrastructure, Incident Leadership, Automation, Systems Engineering, and AI certifications."
    },
    cloud: {
      title: "Targeting: Azure & Cloud Infrastructure Roles",
      desc: "Highlighting Prasad's hands-on Azure IaaS VM administration, Azure Monitor, Log Analytics, storage/backup, and enterprise cloud operations for Duke Energy."
    },
    itil: {
      title: "Targeting: Senior ITIL / Incident & Problem Lead Roles",
      desc: "Highlighting 99.5%+ SLA compliance, 5-member team leadership, P1/P2 outage war rooms, CAB change management, and 25%+ recurring incident reduction via RCA/CAPA."
    },
    sysadmin: {
      title: "Targeting: Linux/Unix & Database Operations Roles",
      desc: "Highlighting Unix/Linux administration, financial system troubleshooting at Credit Suisse, complex SQL diagnostics, and hybrid server patching."
    },
    ai: {
      title: "Targeting: AI-Enhanced Operations & Automation Roles",
      desc: "Highlighting 2x Anthropic Claude Certifications (CCAR-F, CCAO-F), Python server health scripting (~30% toil reduction), and generative AI runbook creation."
    }
  };

  roleFilterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      roleFilterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const role = tab.getAttribute('data-role');
      if (roleSummaries[role]) {
        fitBannerTitle.textContent = roleSummaries[role].title;
        fitBannerDesc.textContent = roleSummaries[role].desc;
      }

      // Filter items across experience cards, clients, and skills
      filterElementsByRole(role);
    });
  });

  function filterElementsByRole(role) {
    const filterableCards = document.querySelectorAll('[data-tags]');
    filterableCards.forEach(card => {
      const tags = (card.getAttribute('data-tags') || '').split(' ');
      if (role === 'all' || tags.includes(role)) {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.display = '';
        if (role !== 'all') {
          card.style.borderColor = 'var(--accent-azure)';
        } else {
          card.style.borderColor = '';
        }
      } else {
        card.style.opacity = '0.35';
        card.style.transform = 'scale(0.98)';
        card.style.borderColor = '';
      }
    });

    // Also highlight matching skill clusters
    skillClusters.forEach(cluster => {
      const tags = (cluster.getAttribute('data-tags') || '').split(' ');
      if (role === 'all' || tags.includes(role)) {
        cluster.style.opacity = '1';
        cluster.style.borderColor = role === 'all' ? '' : 'var(--accent-azure)';
      } else {
        cluster.style.opacity = '0.4';
        cluster.style.borderColor = '';
      }
    });
  }

  /* ==========================================================================
     8. Live Skill Search & Matrix Filter
     ========================================================================== */
  if (skillSearchInput) {
    skillSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();

      if (!query) {
        skillItems.forEach(item => {
          item.classList.remove('highlighted');
          item.style.display = '';
        });
        skillClusters.forEach(c => c.style.display = '');
        return;
      }

      skillClusters.forEach(cluster => {
        let hasMatch = false;
        const items = cluster.querySelectorAll('.skill-item');
        
        items.forEach(item => {
          const skillKey = (item.getAttribute('data-skill') || '') + ' ' + item.textContent.toLowerCase();
          if (skillKey.includes(query)) {
            item.classList.add('highlighted');
            item.style.display = '';
            hasMatch = true;
          } else {
            item.classList.remove('highlighted');
            item.style.display = 'none';
          }
        });

        cluster.style.display = hasMatch ? '' : 'none';
      });
    });
  }

  /* ==========================================================================
     9. Interview Inquiry Form Handler (Pre-fills Recruiter's Mail Client)
     ========================================================================== */
  if (interviewForm) {
    interviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const recruiterName = document.getElementById('recruiterName').value.trim();
      const companyName = document.getElementById('companyName').value.trim();
      const roleTitle = document.getElementById('roleTitle').value.trim() || 'Technical Lead / Senior Infrastructure Engineer';
      const workModel = document.getElementById('workModel').value;
      const interviewNotes = document.getElementById('interviewNotes').value.trim();

      const subject = encodeURIComponent(`Interview Inquiry: ${roleTitle} at ${companyName}`);
      const body = encodeURIComponent(
`Hi Prasad,

My name is ${recruiterName} from ${companyName}.

We reviewed your background as a Technical Lead & ITIL Cloud Infrastructure Support Engineer at Cognizant and believe you would be an excellent match for our ${roleTitle} role (${workModel}).

Details:
${interviewNotes || 'We would like to invite you for an introductory screening call to discuss this opportunity and your career aspirations.'}

Best regards,
${recruiterName}
${companyName}`
      );

      // Open email client with pre-filled content
      window.location.href = `mailto:jambhaleprasad600@gmail.com?subject=${subject}&body=${body}`;
      showToast('Opening email client with pre-filled template...');
    });
  }

  /* ==========================================================================
     10. Scroll Spy Active Navigation Highlight
     ========================================================================== */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});
