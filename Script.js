/* =====================================================
   PROJECT LINKS
===================================================== */
var LINKS = {
  dskLive:      "https://dskagency.netlify.app",
  dskCode:      "https://github.com/abineshrajendiran/DSK-Agency-Business-",
  bashaLive:    "https://albashashoesmarts.netlify.app",
  bashaCode:    "https://github.com/abineshrajendiran/Basha-shoe-mart",
  newBashaLive: "https://new-basha-shoe-mart.netlify.app",
  newBashaCode: "https://github.com/abineshrajendiran/New-Basha-shoe-mart"
};

for (var id in LINKS) {
  var btn = document.getElementById(id);
  var url = LINKS[id];
  if (url !== "") {
    if (url.indexOf("http") !== 0) { url = "https://" + url; }
    btn.href = url;
  } else {
    btn.classList.add("off");
    btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Link coming soon';
  }
}

/* ---------- Mobile menu ---------- */
function toggleMenu() {
  document.getElementById("menu").classList.toggle("open");
}
document.querySelectorAll(".menu a").forEach(function (a) {
  a.addEventListener("click", function () {
    document.getElementById("menu").classList.remove("open");
  });
});

/* ---------- Typing effect ---------- */
var words = ["Aspiring Backend Developer", "Java Developer", "Web Developer", "SQL & MySQL", "Problem Solving"];
var w = 0, c = 0, deleting = false;
function type() {
  var current = words[w];
  document.getElementById("typing").textContent = current.substring(0, c);
  if (!deleting && c < current.length) { c++; setTimeout(type, 90); }
  else if (!deleting) { deleting = true; setTimeout(type, 1400); }
  else if (c > 0) { c--; setTimeout(type, 45); }
  else { deleting = false; w = (w + 1) % words.length; setTimeout(type, 300); }
}
type();

/* ---------- Scroll reveal ---------- */
function reveal() {
  document.querySelectorAll(".reveal").forEach(function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight - 40) {
      el.classList.add("show");
    }
  });
}

/* ---------- Counter animation ---------- */
var counted = false;
function runCounters() {
  if (counted) return;
  var box = document.querySelector(".stats");
  if (box.getBoundingClientRect().top < window.innerHeight) {
    counted = true;
    document.querySelectorAll("[data-count]").forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      var n = 0;
      var t = setInterval(function () {
        n++;
        el.textContent = n + "+";
        if (n >= target) clearInterval(t);
      }, 150);
    });
  }
}

window.addEventListener("scroll", function () {
  document.getElementById("topBtn").style.display = window.scrollY > 400 ? "block" : "none";
  reveal();
  runCounters();
});
window.addEventListener("load", function () { reveal(); runCounters(); });

/* ---------- Demo panels ---------- */
function toggleDemo(id) {
  document.getElementById(id).classList.toggle("open");
}

/* =====================================================
   DEMO 1 : VOTING SYSTEM
===================================================== */
var votes = {};
var voted = [];

// Build the votes object from the dropdown options (blank option skipped)
function initVotes() {
  votes = {};
  var options = document.getElementById("candidate").options;
  for (var i = 0; i < options.length; i++) {
    if (options[i].value !== "") {
      votes[options[i].value] = 0;
    }
  }
  voted = [];
}

function castVote() {
  var id = document.getElementById("voterId").value.trim().toUpperCase();
  var cand = document.getElementById("candidate").value;
  var msg = document.getElementById("voteMsg");

  if (id === "") {
    msg.className = "msg err";
    msg.textContent = "Please enter a Voter ID.";
    return;
  }
  if (cand === "") {
    msg.className = "msg err";
    msg.textContent = "Please select a candidate.";
    return;
  }
  if (voted.indexOf(id) !== -1) {
    msg.className = "msg err";
    msg.textContent = "Voter " + id + " has already voted! Duplicate vote blocked.";
    return;
  }

  voted.push(id);
  votes[cand]++;
  msg.className = "msg ok";
  msg.textContent = "Vote recorded for " + cand + ". Thank you, " + id + "!";
  document.getElementById("voterId").value = "";
  showResults();
}

function showResults() {
  var total = 0;
  for (var n in votes) {
    total += votes[n];
  }

  var html = "";
  for (var name in votes) {
    var pct = total === 0 ? 0 : Math.round((votes[name] / total) * 100);
    html += '<div class="bar-row">' +
              '<div class="lbl"><span>' + name + '</span><span>' + votes[name] + ' votes (' + pct + '%)</span></div>' +
              '<div class="bar"><div style="width:' + pct + '%"></div></div>' +
            '</div>';
  }
  document.getElementById("voteResults").innerHTML = html;
}

function resetVotes() {
  initVotes();
  document.getElementById("voteMsg").textContent = "";
  document.getElementById("voteMsg").className = "msg";
  showResults();
}

initVotes();
showResults();

/* =====================================================
   DEMO 2 : LIBRARY MANAGEMENT SYSTEM (100 BOOKS)
===================================================== */
// Format: [ "Author", "Category", [ "Book 1", "Book 2", ... ] ]
var catalog = [
  // ---------- EPICS ----------
  ["Valmiki", "Epic", ["Valmiki Ramayanam"]],
  ["Kambar", "Epic", [
    "Kamba Ramayanam - Bala Kandam",
    "Kamba Ramayanam - Ayodhya Kandam",
    "Kamba Ramayanam - Aranya Kandam",
    "Kamba Ramayanam - Kishkindha Kandam",
    "Kamba Ramayanam - Sundara Kandam",
    "Kamba Ramayanam - Yuddha Kandam"
  ]],
  ["Vyasa", "Epic", ["Mahabharatham"]],
  ["Villiputhurar", "Epic", ["Villiputhurar Bharatham"]],
  ["C. Rajagopalachari", "Epic", ["Vyasar Virundhu", "Chakravarthi Thirumagan"]],

  // ---------- TAMIL CLASSICS ----------
  ["Thiruvalluvar", "Tamil Classic", ["Thirukkural"]],
  ["Ilango Adigal", "Tamil Classic", ["Silappathikaram"]],
  ["Seethalai Sathanar", "Tamil Classic", ["Manimegalai"]],
  ["Avvaiyar", "Tamil Classic", ["Aathichudi", "Kondrai Vendhan"]],
  ["Subramania Bharati", "Tamil Classic", ["Panchali Sapatham", "Kuyil Paattu"]],
  ["Bharathidasan", "Tamil Classic", ["Kudumba Vilakku"]],

  // ---------- NOVELS ----------
  ["Kalki", "Novel", ["Ponniyin Selvan", "Sivagamiyin Sabadham", "Parthiban Kanavu", "Alai Osai"]],
  ["Sandilyan", "Novel", ["Kadal Pura", "Yavana Rani"]],
  ["Jayakanthan", "Novel", ["Sila Nerangalil Sila Manithargal", "Oru Nadigai Nadagam Parkiral"]],
  ["Sujatha", "Novel", ["Srirangathu Devathaigal", "Kanavu Thozhirchalai"]],
  ["Jeyamohan", "Novel", ["Vishnupuram", "Rubber"]],
  ["Perumal Murugan", "Novel", ["Madhorubagan (One Part Woman)", "Poonachi"]],
  ["Ashokamitran", "Novel", ["Thaneer"]],
  ["Pudhumaipithan", "Novel", ["Pudhumaipithan Kathaigal"]],
  ["Mu. Varadarajan", "Novel", ["Agal Vilakku"]],
  ["Akilan", "Novel", ["Chithira Pavai"]],
  ["R. K. Narayan", "Novel", ["Malgudi Days", "Swami and Friends", "The Guide"]],
  ["Arundhati Roy", "Novel", ["The God of Small Things"]],
  ["Rabindranath Tagore", "Novel", ["Gitanjali", "Gora"]],
  ["Premchand", "Novel", ["Godaan"]],
  ["Mark Twain", "Novel", ["The Adventures of Tom Sawyer"]],
  ["Paulo Coelho", "Novel", ["The Alchemist"]],

  // ---------- JOURNEYS / TRAVEL ----------
  ["Jules Verne", "Journey", ["Around the World in Eighty Days", "Journey to the Centre of the Earth"]],
  ["Daniel Defoe", "Journey", ["Robinson Crusoe"]],
  ["Jonathan Swift", "Journey", ["Gulliver's Travels"]],
  ["John Bunyan", "Journey", ["The Pilgrim's Progress"]],
  ["Rahul Sankrityayan", "Journey", ["Volga Se Ganga"]],
  ["Che Guevara", "Journey", ["The Motorcycle Diaries"]],
  ["Ibn Battuta", "Journey", ["The Travels of Ibn Battuta"]],
  ["Marco Polo", "Journey", ["The Travels of Marco Polo"]],

  // ---------- BIOGRAPHY ----------
  ["A. P. J. Abdul Kalam", "Biography", ["Wings of Fire", "Ignited Minds", "India 2020"]],
  ["M. K. Gandhi", "Biography", ["The Story of My Experiments with Truth"]],
  ["Jawaharlal Nehru", "Biography", ["The Discovery of India", "Glimpses of World History"]],

  // ---------- ENGINEERING ----------
  ["B. S. Grewal", "Engineering", ["Higher Engineering Mathematics"]],
  ["Erwin Kreyszig", "Engineering", ["Advanced Engineering Mathematics"]],
  ["R. K. Bansal", "Engineering", ["A Textbook of Fluid Mechanics and Hydraulic Machines"]],
  ["Herbert Schildt", "Engineering", ["Java: The Complete Reference"]],
  ["Thomas H. Cormen", "Engineering", ["Introduction to Algorithms"]],
  ["Abraham Silberschatz", "Engineering", ["Database System Concepts"]],
  ["Andrew S. Tanenbaum", "Engineering", ["Computer Networks", "Modern Operating Systems"]],
  ["Kernighan & Ritchie", "Engineering", ["The C Programming Language"]],
  ["E. Balagurusamy", "Engineering", ["Programming in ANSI C", "Object Oriented Programming with C++", "Programming with Java: A Primer"]],
  ["Yashavant Kanetkar", "Engineering", ["Let Us C"]],
  ["Robert L. Boylestad", "Engineering", ["Electronic Devices and Circuit Theory"]],
  ["V. K. Mehta", "Engineering", ["Principles of Electronics"]],
  ["M. Morris Mano", "Engineering", ["Digital Design"]],
  ["P. K. Palanisamy", "Engineering", ["Engineering Physics"]],
  ["P. C. Jain & Monika Jain", "Engineering", ["Engineering Chemistry"]],
  ["N. D. Bhatt", "Engineering", ["Engineering Drawing"]],
  ["Beer & Johnston", "Engineering", ["Vector Mechanics for Engineers"]],
  ["Reema Thareja", "Engineering", ["Python Programming: Using Problem Solving Approach"]],
  ["Roger S. Pressman", "Engineering", ["Software Engineering: A Practitioner's Approach"]],
  ["Russell & Norvig", "Engineering", ["Artificial Intelligence: A Modern Approach"]],
  ["P. K. Nag", "Engineering", ["Engineering Thermodynamics"]],
  ["Nagrath & Gopal", "Engineering", ["Control Systems Engineering"]],
  ["Alan V. Oppenheim", "Engineering", ["Signals and Systems"]],

  // ---------- TAMIL NADU STATE BOARD (TNSCERT) ----------
  ["Tamil Nadu State Board", "School Book", [
    "Std 6 - Tamil",
    "Std 7 - Mathematics",
    "Std 8 - Science",
    "Std 9 - Social Science",
    "Std 10 - Tamil",
    "Std 10 - English",
    "Std 10 - Mathematics",
    "Std 10 - Science",
    "Std 10 - Social Science",
    "Std 11 - Physics",
    "Std 11 - Computer Science",
    "Std 12 - Chemistry",
    "Std 12 - Mathematics"
  ]]
];

var books = [];   // flat list built from the catalog
var nextId = 1;
for (var a = 0; a < catalog.length; a++) {
  for (var b = 0; b < catalog[a][2].length; b++) {
    books.push({
      id: nextId++,
      title: catalog[a][2][b],
      author: catalog[a][0],
      category: catalog[a][1],
      issued: false
    });
  }
}

var FINE_PER_DAY = 2;
var FREE_DAYS = 7;

function fillDropdown() {
  var sel = document.getElementById("bookSelect");
  var html = "";
  var lastAuthor = "";
  for (var i = 0; i < books.length; i++) {
    var bk = books[i];
    if (bk.author !== lastAuthor) {
      if (lastAuthor !== "") html += "</optgroup>";
      html += '<optgroup label="' + bk.author + ' (' + bk.category + ')">';
      lastAuthor = bk.author;
    }
    html += '<option value="' + bk.id + '">' + bk.title + '</option>';
  }
  html += "</optgroup>";
  sel.innerHTML = html;
}

function renderBooks() {
  var q = document.getElementById("bookSearch").value.trim().toLowerCase();
  var html = "";
  for (var i = 0; i < books.length; i++) {
    var bk = books[i];
    var text = (bk.title + " " + bk.author + " " + bk.category).toLowerCase();
    if (q !== "" && text.indexOf(q) === -1) continue;
    var status = bk.issued
      ? '<span style="color:#ff3d9a;font-weight:700">Issued</span>'
      : '<span style="color:#22ff88;font-weight:700">Available</span>';
    html += "<tr><td>" + bk.title + "</td><td>" + bk.author + "</td><td>" + bk.category + "</td><td>" + status + "</td></tr>";
  }
  if (html === "") html = '<tr><td colspan="4">No books found.</td></tr>';
  document.getElementById("bookTable").innerHTML = html;
}

function findBook(id) {
  for (var i = 0; i < books.length; i++) {
    if (books[i].id === id) return books[i];
  }
  return null;
}

function issueBook() {
  var id = parseInt(document.getElementById("bookSelect").value, 10);
  var msg = document.getElementById("libMsg");
  var bk = findBook(id);

  if (bk === null) { msg.className = "msg err"; msg.textContent = "Please select a book."; return; }
  if (bk.issued) { msg.className = "msg err"; msg.textContent = '"' + bk.title + '" is already issued.'; return; }

  bk.issued = true;
  msg.className = "msg ok";
  msg.textContent = '"' + bk.title + '" by ' + bk.author + " issued successfully.";
  renderBooks();
}

function returnBook() {
  var id = parseInt(document.getElementById("bookSelect").value, 10);
  var days = parseInt(document.getElementById("daysKept").value, 10);
  var msg = document.getElementById("libMsg");
  var bk = findBook(id);

  if (bk === null) { msg.className = "msg err"; msg.textContent = "Please select a book."; return; }
  if (!bk.issued) { msg.className = "msg err"; msg.textContent = '"' + bk.title + '" is not issued, so it cannot be returned.'; return; }
  if (isNaN(days) || days < 1) { msg.className = "msg err"; msg.textContent = "Enter the number of days kept (1 or more)."; return; }

  var fine = days > FREE_DAYS ? (days - FREE_DAYS) * FINE_PER_DAY : 0;
  bk.issued = false;
  document.getElementById("daysKept").value = "";
  msg.className = "msg ok";
  msg.textContent = fine > 0
    ? '"' + bk.title + '" returned after ' + days + " days. Fine: Rs. " + fine
    : '"' + bk.title + '" returned on time. No fine.';
  renderBooks();
}

fillDropdown();
renderBooks();

/* =====================================================
   DEMO 3 : SQL QUERIES
===================================================== */
var queries = [
  {
    sql: "SELECT * FROM products;",
    head: ["product_id", "name", "price", "stock"],
    rows: [[1, "Keyboard", 1200, 25], [2, "Mouse", 599, 40], [3, "USB Cable", 199, 100], [4, "Headphones", 1599, 15]]
  },
  {
    sql: "SELECT name, price FROM products\nWHERE price < 1000;",
    head: ["name", "price"],
    rows: [["Mouse", 599], ["USB Cable", 199]]
  },
  {
    sql: "SELECT o.order_id, c.name, p.name AS product\nFROM orders o\nJOIN customers c ON o.customer_id = c.customer_id\nJOIN products p ON o.product_id = p.product_id;",
    head: ["order_id", "customer", "product"],
    rows: [[101, "Ravi", "Keyboard"], [102, "Priya", "Mouse"], [103, "Ravi", "Headphones"], [104, "Divya", "USB Cable"]]
  },
  {
    sql: "SELECT c.name, SUM(p.price) AS total_spent\nFROM orders o\nJOIN customers c ON o.customer_id = c.customer_id\nJOIN products p ON o.product_id = p.product_id\nGROUP BY c.name;",
    head: ["customer", "total_spent"],
    rows: [["Ravi", 2799], ["Priya", 599], ["Divya", 199]]
  }
];

function runQuery() {
  var q = queries[document.getElementById("querySelect").value];
  document.getElementById("sqlText").textContent = q.sql;
  var html = "<table><thead><tr>";
  q.head.forEach(function (h) { html += "<th>" + h + "</th>"; });
  html += "</tr></thead><tbody>";
  q.rows.forEach(function (r) {
    html += "<tr>";
    r.forEach(function (cell) { html += "<td>" + cell + "</td>"; });
    html += "</tr>";
  });
  html += "</tbody></table>";
  document.getElementById("sqlResult").innerHTML = html;
}
runQuery();

/* =====================================================
   CONTACT FORM (opens your email app)
===================================================== */
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  var body = "Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message;
  window.location.href = "mailto:abineshr599@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
});