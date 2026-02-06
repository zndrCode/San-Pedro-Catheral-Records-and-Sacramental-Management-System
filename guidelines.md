---
title: San Pedro Catheral Record & Sacramental Management

author: Zander Gabriell P. Nacario & John Cyrelle Albarracin

description: Guidelines for structuring prompt intructions in Markdonw
---

# Project Context

The San Pedro Cathedral Record and Sacramental Management System is a web-based system designed to improve how parish records, sacramental services, events, and announcements are managed. It replaces manual logbooks with a digital platform to ensure faster record retrieval, improved data accuracy, and better communication between the church and parishioners.

The system supports two users: Admin and Members (Parishioners). Admin users can manage parish records, sacramental services, events, announcements, member information, and generate reports, as well as approve or reject sacramental requests. Members can view upcoming events, request sacramental services, track request status, receive announcements, and manage their personal accounts.

# Programming Language Used

- HTML, CSS, JavaScript [Frontend]
- PHP, MyPHPadmin [backend]

2/5/26
# San Pedro Cathedral - Current File Structure
```
SAN-PEDRO-CATHEDRAL-RECORD/
│
├── assets/
│   ├── sanpedro_bg.webp
│   └── sanpedro_logo.jpg
│
├── css/
│   ├── dashboard.css
│   ├── member-dashboard.css
│   ├── pages.css ✅ NEW
│   ├── signup.css
│   └── style.css
│
├── js/
│   ├── tests/
│   ├── dashboard.js
│   ├── member-dashboard.js
│   ├── members-list.js ✅ NEW
│   ├── main.js
│   └── signup.js
│
├── reference/
│   ├── DASHBOARD.png
│   ├── LOGIN.png
│   └── SIGNUP.png
│
├── .gitattributes
├── dashboard.html
├── member-dashboard.html ✅ NEW
├── members-list.html ✅ NEW
├── pending-requests.html ✅ NEW
├── guidelines.md
├── index.html
├── README.md
└── signup.html
```

**Total Files: 21**
- ✅ 5 HTML pages
- ✅ 5 CSS files  
- ✅ 5 JS files
- ✅ 2 Assets
- ✅ 4 Other files

---

**Still Need:**
- 11 more HTML pages (other admin navigation pages)
- PHP backend files
- Database structure