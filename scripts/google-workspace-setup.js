/**
 * Elevate Strategy — Google Workspace Setup Script
 *
 * Run this in Google Apps Script (script.google.com):
 * 1. Go to https://script.google.com
 * 2. Sign in with hello@elevatestrategy.co.in
 * 3. Create new project → name it "Workspace Setup"
 * 4. Paste this entire script
 * 5. Click Run → select "main" function
 * 6. Authorize when prompted (first run requires permissions)
 *
 * What it does:
 * - Creates the full folder structure in Google Drive
 * - Creates a Master Sheet for each client with pre-built tabs
 * - Creates a Credentials tracker sheet
 * - Logs all created URLs for reference
 */

function main() {
  Logger.log("=== Starting Elevate Strategy Workspace Setup ===");

  const root = DriveApp.getRootFolder();

  // 1. Create main folder structure
  const elevate = createFolder(root, "Elevate Strategy");
  const clients = createFolder(root, "Clients");

  // Internal folders
  const credentials = createFolder(elevate, "Credentials & Logins");
  const contracts = createFolder(elevate, "Contracts & Legal");
  const finance = createFolder(elevate, "Finance");
  const templates = createFolder(elevate, "Templates");

  // Client folders
  const sd18 = createFolder(clients, "SD18 Sports");
  const cv = createFolder(clients, "Chilli Vanilla");
  const saiDecor = createFolder(clients, "Sai Decor");

  // SD18 subfolders
  createFolder(sd18, "Official Docs (GST, PAN, Trademark)");
  createFolder(sd18, "Product Images");
  createFolder(sd18, "Proposals & Deliverables");
  createFolder(sd18, "Market Research");
  createFolder(sd18, "Website & Tech");
  createFolder(sd18, "Amazon");
  createFolder(sd18, "Monthly Reports");

  // Chilli Vanilla subfolders
  createFolder(cv, "Proposal");
  createFolder(cv, "Menu & Assets");
  createFolder(cv, "Tech Docs");

  // Sai Decor subfolders
  createFolder(saiDecor, "Proposal");
  createFolder(saiDecor, "Assets");

  Logger.log("\n--- Folder structure created ---\n");

  // 2. Create Credentials Sheet (in Elevate Strategy folder)
  const credSheet = createCredentialsSheet(credentials);
  Logger.log("Credentials sheet: " + credSheet.getUrl());

  // 3. Create SD18 Master Sheet
  const sd18Sheet = createSD18MasterSheet(sd18);
  Logger.log("SD18 Master Sheet: " + sd18Sheet.getUrl());

  // 4. Create Chilli Vanilla Master Sheet
  const cvSheet = createCVMasterSheet(cv);
  Logger.log("Chilli Vanilla Master Sheet: " + cvSheet.getUrl());

  Logger.log("\n=== Setup Complete ===");
  Logger.log("Check your Google Drive root for 'Elevate Strategy' and 'Clients' folders.");
}


// ============ HELPER FUNCTIONS ============

function createFolder(parent, name) {
  // Check if folder already exists to avoid duplicates
  const existing = parent.getFoldersByName(name);
  if (existing.hasNext()) {
    Logger.log("Folder already exists: " + name);
    return existing.next();
  }
  const folder = parent.createFolder(name);
  Logger.log("Created folder: " + name);
  return folder;
}


// ============ CREDENTIALS SHEET ============

function createCredentialsSheet(folder) {
  const ss = SpreadsheetApp.create("Elevate Strategy — Credentials & Logins");

  // Move to correct folder
  const file = DriveApp.getFileById(ss.getId());
  folder.addFile(file);
  DriveApp.getRootFolder().removeFile(file);

  // Sheet 1: All Logins
  const loginsSheet = ss.getActiveSheet();
  loginsSheet.setName("All Logins");

  const loginsHeaders = ["Client", "Service", "URL", "Username / Email", "Password", "API Keys", "Notes", "Last Updated"];
  loginsSheet.getRange(1, 1, 1, loginsHeaders.length).setValues([loginsHeaders]);
  loginsSheet.getRange(1, 1, 1, loginsHeaders.length).setFontWeight("bold").setBackground("#f0fdf4");

  // Pre-fill known credentials
  const loginsData = [
    ["Elevate", "Google Workspace", "admin.google.com", "hello@elevatestrategy.co.in", "", "", "Base plan, 1 user", ""],
    ["Elevate", "BigRock (Domain)", "bigrock.in", "adixavi7@gmail.com", "", "", "Customer ID: 33304048", ""],
    ["Elevate", "GitHub", "github.com", "MinotaurG", "", "", "Agency website repo", ""],
    ["Elevate", "Vercel", "vercel.com", "", "", "", "Auto-deploy from GitHub main", ""],
    ["SD18", "GoDaddy (Hosting + Domain)", "godaddy.com", "", "", "", "SSH: 107.180.118.126, user: utnitduui5vm", ""],
    ["SD18", "Razorpay", "dashboard.razorpay.com", "", "", "Key: rzp_live_Rr7SYwQvzg0AMS", "Live keys in .env on server", ""],
    ["SD18", "Google (Amazon/SEO)", "accounts.google.com", "sd18sports.seller@gmail.com", "", "", "Search Console, GA4, Amazon Seller", ""],
    ["SD18", "Website Admin", "sd18sports.com/admin/login", "", "", "", "Laravel admin panel", ""],
    ["SD18", "MySQL Database", "localhost:3306 (on GoDaddy)", "userSD18", "", "", "DB: dbSD18SPORTS", ""],
    ["Chilli Vanilla", "Zomato", "restaurant.zomato.com", "", "", "", "~35% commission", ""],
  ];

  loginsSheet.getRange(2, 1, loginsData.length, loginsData[0].length).setValues(loginsData);

  // Auto-fit columns
  for (var i = 1; i <= loginsHeaders.length; i++) {
    loginsSheet.autoResizeColumn(i);
  }

  // Sheet 2: API Keys & Secrets
  const apiSheet = ss.insertSheet("API Keys & Secrets");
  const apiHeaders = ["Client", "Service", "Key Name", "Value", "Environment", "Notes"];
  apiSheet.getRange(1, 1, 1, apiHeaders.length).setValues([apiHeaders]);
  apiSheet.getRange(1, 1, 1, apiHeaders.length).setFontWeight("bold").setBackground("#fef2f2");

  const apiData = [
    ["SD18", "Razorpay", "RAZORPAY_KEY_ID", "rzp_live_Rr7SYwQvzg0AMS", "Production", ""],
    ["SD18", "Razorpay", "RAZORPAY_SECRET", "(in server .env)", "Production", "DO NOT share"],
    ["SD18", "MSG91", "AUTH_KEY", "(to be created)", "Production", "For OTP"],
    ["SD18", "Shiprocket", "API Token", "(to be created)", "Production", "For shipping"],
    ["SD18", "Cloudinary", "Cloud Name", "(to be created)", "Production", "For images"],
  ];
  apiSheet.getRange(2, 1, apiData.length, apiData[0].length).setValues(apiData);

  // Sheet 3: Domains & DNS
  const dnsSheet = ss.insertSheet("Domains & DNS");
  const dnsHeaders = ["Domain", "Registrar", "Expires", "Nameservers", "Hosting", "SSL", "Notes"];
  dnsSheet.getRange(1, 1, 1, dnsHeaders.length).setValues([dnsHeaders]);
  dnsSheet.getRange(1, 1, 1, dnsHeaders.length).setFontWeight("bold").setBackground("#eff6ff");

  const dnsData = [
    ["elevatestrategy.co.in", "BigRock", "Check BigRock", "Vercel / Cloudflare?", "Vercel", "Vercel auto", ""],
    ["sd18sports.com", "GoDaddy", "July 9, 2026 (URGENT!)", "GoDaddy default", "GoDaddy cPanel", "Let's Encrypt?", "Auto-renew OFF! Renew immediately!"],
  ];
  dnsSheet.getRange(2, 1, dnsData.length, dnsData[0].length).setValues(dnsData);

  return ss;
}


// ============ SD18 MASTER SHEET ============

function createSD18MasterSheet(folder) {
  const ss = SpreadsheetApp.create("SD18 Sports — Master Sheet");

  const file = DriveApp.getFileById(ss.getId());
  folder.addFile(file);
  DriveApp.getRootFolder().removeFile(file);

  // Tab 1: Overview
  const overview = ss.getActiveSheet();
  overview.setName("Overview");

  const overviewData = [
    ["SD18 Sports — Client Overview", "", ""],
    ["", "", ""],
    ["Field", "Value", "Notes"],
    ["Client Name", "SD18 Sports", ""],
    ["Location", "Ground Floor, Payel Multiplaza, Asansol, 713301, WB", ""],
    ["Owner", "(Surname starts with S)", "Proprietorship firm"],
    ["GSTIN", "19AFQFS1742G1ZM", "From official certificate"],
    ["Website", "sd18sports.com", "Laravel template, GoDaddy hosting"],
    ["Phone", "8001818666", "WhatsApp active"],
    ["Phone (Alt)", "9800848482", ""],
    ["YouTube", "97,300 subscribers", "youtube.com/@sd18sports"],
    ["Instagram", "@sd18sports", "Dormant since Feb 2025"],
    ["Brand Ambassador", "Akash Deep", "Indian international cricketer"],
    ["Trademark", "Registered", "Confirmed"],
    ["", "", ""],
    ["Engagement", "", ""],
    ["One-time Setup", "₹85,000", "Website ₹45K + Amazon/Flipkart ₹40K"],
    ["Monthly Retainer", "₹40,000/month", "Steps to ₹50K at ₹1.5L revenue"],
    ["Growth Clause", "+4% above ₹3L/month", ""],
    ["Status", "Active — Pre-launch prep", "Amazon images + website planning"],
  ];

  overview.getRange(1, 1, overviewData.length, 3).setValues(overviewData);
  overview.getRange(1, 1, 1, 3).setFontWeight("bold").setFontSize(14);
  overview.getRange(3, 1, 1, 3).setFontWeight("bold").setBackground("#f1f5f9");
  overview.getRange(16, 1, 1, 3).setFontWeight("bold");

  // Tab 2: Links
  const links = ss.insertSheet("Links & Resources");
  const linksHeaders = ["Category", "Name", "URL / Path", "Notes"];
  links.getRange(1, 1, 1, linksHeaders.length).setValues([linksHeaders]);
  links.getRange(1, 1, 1, linksHeaders.length).setFontWeight("bold").setBackground("#f0fdf4");

  const linksData = [
    ["Website (Current)", "Live Site", "https://sd18sports.com", "Laravel template"],
    ["Website (Current)", "Admin Panel", "https://sd18sports.com/admin/login", ""],
    ["Website (Current)", "SSH Access", "107.180.118.126 (port 22)", "user: utnitduui5vm"],
    ["Code / Docs", "GitHub Repo", "github.com/... (agency-website)", "clients/sd18/ directory"],
    ["Code / Docs", "System Design", "docs/clients/sd18/system-design.md", "Medusa v2 architecture"],
    ["Code / Docs", "Learning Guide", "docs/clients/sd18/learning-guide.md", "Medusa concepts"],
    ["Code / Docs", "DB Dump (backup)", "clients/sd18/website/current-site-backup/sd18_dump.sql", "58 products, 7 orders"],
    ["Google", "Search Console", "search.google.com/search-console", "Verify with sd18sports.seller@gmail.com"],
    ["Google", "Analytics", "analytics.google.com", "Set up GA4 property"],
    ["Amazon", "Seller Central", "sellercentral.amazon.in", "sd18sports.seller@gmail.com"],
    ["Payments", "Razorpay Dashboard", "dashboard.razorpay.com", "Live keys active"],
    ["Social", "YouTube", "youtube.com/@sd18sports", "97.3K subs"],
    ["Social", "Instagram", "instagram.com/sd18sports", "Dormant"],
    ["Social", "Facebook", "facebook.com/p/SD18-Sports-61565351942622/", ""],
    ["Pitch", "Pitch Deck (PDF)", "(upload to this Drive folder)", "SD18-Pitch-Deck.pdf"],
    ["Pitch", "Service Proposal (PDF)", "(upload to this Drive folder)", "SD18-Service-Proposal-Revised.pdf"],
  ];
  links.getRange(2, 1, linksData.length, linksData[0].length).setValues(linksData);

  // Tab 3: Status / Tasks
  const status = ss.insertSheet("Status");
  const statusHeaders = ["Task", "Category", "Status", "Owner", "Blocked By", "Due", "Notes"];
  status.getRange(1, 1, 1, statusHeaders.length).setValues([statusHeaders]);
  status.getRange(1, 1, 1, statusHeaders.length).setFontWeight("bold").setBackground("#fef3c7");

  const statusData = [
    ["Renew domain (sd18sports.com)", "Infra", "URGENT", "SD18 Owner", "Payment", "Jul 9, 2026", "Auto-renew OFF!"],
    ["Product image BG removal (330+ images)", "Amazon", "Not Started", "Elevate", "—", "—", "remove.bg batch processing"],
    ["Model reshoot (polos, pants)", "Amazon", "Waiting on Client", "SD18", "—", "—", "Shot list delivered"],
    ["Product info spreadsheet", "Amazon", "Waiting on Client", "SD18", "—", "—", "Sizes, materials, HSN codes"],
    ["Google Search Console setup", "SEO", "In Progress", "Elevate", "DNS verification", "—", "sd18sports.seller@gmail.com"],
    ["Google Analytics 4 setup", "SEO", "Not Started", "Elevate", "Search Console first", "—", ""],
    ["Oracle Cloud instance setup", "Website (New)", "Not Started", "Elevate", "—", "—", "Mumbai region, A1.Flex"],
    ["Medusa v2 installation", "Website (New)", "Not Started", "Elevate", "Oracle instance", "—", ""],
    ["Razorpay module (Medusa)", "Website (New)", "Not Started", "Elevate", "Medusa setup", "—", "Reuse existing live keys"],
    ["Shipping module (Medusa)", "Website (New)", "Not Started", "Elevate", "Medusa setup", "—", "Shiprocket + Manual provider"],
    ["Product data migration (MySQL → Medusa)", "Website (New)", "Not Started", "Elevate", "Medusa setup", "—", "58 products from current DB"],
    ["Next.js storefront", "Website (New)", "Not Started", "Elevate", "Medusa setup", "—", ""],
    ["Amazon Seller Central setup", "Amazon", "Not Started", "Elevate", "Brand Registry", "—", ""],
    ["Amazon Brand Registry", "Amazon", "Not Started", "Elevate", "Trademark cert", "—", ""],
  ];
  status.getRange(2, 1, statusData.length, statusData[0].length).setValues(statusData);

  // Tab 4: Products (from DB)
  const products = ss.insertSheet("Products (Current)");
  const prodHeaders = ["ID", "Name", "Category", "MRP (₹)", "Selling Price (₹)", "HSN", "Tax %", "Status", "Has Variants"];
  products.getRange(1, 1, 1, prodHeaders.length).setValues([prodHeaders]);
  products.getRange(1, 1, 1, prodHeaders.length).setFontWeight("bold").setBackground("#ede9fe");

  // Sample products from the DB dump we have
  const prodData = [
    [22, "SD18 Kashmiri Willow Tennis Bat", "Bat", 4599, 2999, "9506", "12%", "Active", "No"],
    [23, "SD18 Test Red Ball", "Ball", 749, 549, "9506", "12%", "Active", "No"],
    [24, "SD18 Tournament Red Ball", "Ball", 599, 449, "9506", "12%", "Active", "No"],
    [25, "SD18 White Club Ball", "Ball", 449, 349, "9506", "12%", "Active", "No"],
    [27, "SD18 Pro Soft Batting Gloves", "Gloves", 2749, 1899, "9506", "12%", "Active", "Yes (sizes)"],
    [28, "SD18 Player Batting Gloves", "Gloves", 3799, 2449, "9506", "12%", "Active", "Yes (sizes)"],
    [55, "SD18 Pro Bag Pack Blue", "Bag", 2399, 1599, "4202", "18%", "Active", "Yes"],
    [56, "SD18 Green Camo Cap", "Cap", 649, 399, "650500", "5%", "Active", "Yes (colours)"],
    [57, "SD18 T Hole Cap", "Cap", 649, 399, "650500", "5%", "Active", "Yes (colours)"],
  ];
  products.getRange(2, 1, prodData.length, prodData[0].length).setValues(prodData);

  // Note about remaining products
  products.getRange(prodData.length + 3, 1).setValue("Note: 58 total products in database. Full list to be imported from MySQL dump. See current-site-backup/sd18_dump.sql");

  // Tab 5: Monthly Reports
  const reports = ss.insertSheet("Monthly Reports");
  const reportsHeaders = ["Month", "Amazon Revenue", "Website Revenue", "Total Revenue", "Orders (Amazon)", "Orders (Website)", "PPC Spend", "ROAS", "Notes"];
  reports.getRange(1, 1, 1, reportsHeaders.length).setValues([reportsHeaders]);
  reports.getRange(1, 1, 1, reportsHeaders.length).setFontWeight("bold").setBackground("#fce7f3");
  reports.getRange(2, 1).setValue("(Tracking starts after launch)");

  return ss;
}


// ============ CHILLI VANILLA MASTER SHEET ============

function createCVMasterSheet(folder) {
  const ss = SpreadsheetApp.create("Chilli Vanilla — Master Sheet");

  const file = DriveApp.getFileById(ss.getId());
  folder.addFile(file);
  DriveApp.getRootFolder().removeFile(file);

  const overview = ss.getActiveSheet();
  overview.setName("Overview");

  const overviewData = [
    ["Chilli Vanilla — Client Overview", "", ""],
    ["", "", ""],
    ["Field", "Value", "Notes"],
    ["Client Name", "Chilli Vanilla Restaurant", ""],
    ["Location", "Ranchi Patna Road, Opp District Court, Hazaribagh", ""],
    ["Phone", "+91 9560787874", ""],
    ["Cuisine", "North Indian, Chinese, South Indian, Italian", "Pure Vegetarian"],
    ["Zomato Rating", "4.2/5 (9,151 ratings)", "Most popular in Hazaribagh"],
    ["Hours", "9:30 AM to 12 Midnight", ""],
    ["Menu Size", "450+ items, 22 categories", ""],
    ["FSSAI", "11122012000068", ""],
    ["Current Platform", "Zomato only (NOT on Swiggy)", "~35% commission"],
    ["", "", ""],
    ["Engagement", "", ""],
    ["Project", "Direct Ordering App + Kitchen Dashboard + Delivery App", ""],
    ["Status", "Ideation / Proposal sent", ""],
    ["Stack", "Next.js + Supabase + React Native (Expo)", ""],
  ];

  overview.getRange(1, 1, overviewData.length, 3).setValues(overviewData);
  overview.getRange(1, 1, 1, 3).setFontWeight("bold").setFontSize(14);
  overview.getRange(3, 1, 1, 3).setFontWeight("bold").setBackground("#f1f5f9");

  // Tab 2: Links
  const links = ss.insertSheet("Links & Resources");
  const linksHeaders = ["Category", "Name", "URL / Path", "Notes"];
  links.getRange(1, 1, 1, linksHeaders.length).setValues([linksHeaders]);
  links.getRange(1, 1, 1, linksHeaders.length).setFontWeight("bold").setBackground("#f0fdf4");

  const linksData = [
    ["Docs", "System Design", "docs/clients/chilli-vanilla/system-design.md", "Full architecture"],
    ["Docs", "Data Model", "docs/clients/chilli-vanilla/data-model.md", "DDD, schemas, patterns"],
    ["Docs", "Build Plan", "docs/clients/chilli-vanilla/build-plan.md", "4-week timeline"],
    ["Docs", "Requirements", "docs/clients/chilli-vanilla/requirements.md", "Discovery answers"],
    ["Docs", "WhatsApp Flow", "docs/clients/chilli-vanilla/whatsapp-ordering.md", ""],
    ["Proposal", "PDF", "clients/chilli-vanilla/proposal/", "HTML + PDF versions"],
    ["Research", "Zomato Page (saved)", "docs/clients/chilli-vanilla/", "Menu data, ratings"],
  ];
  links.getRange(2, 1, linksData.length, linksData[0].length).setValues(linksData);

  return ss;
}
