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
function toggleMenu(){
  document.getElementById("menu").classList.toggle("open");
}
document.querySelectorAll(".menu a").forEach(function(a){
  a.addEventListener("click", function(){
    document.getElementById("menu").classList.remove("open");
  });
});

/* ---------- Typing effect ---------- */
var words = ["Aspiring Backend Developer", "Java Developer", "Web Developer","SQL & MySQL", "Problem Solving"];
var w = 0, c = 0, deleting = false;
function type(){
  var current = words[w];
  document.getElementById("typing").textContent = current.substring(0, c);
  if(!deleting && c < current.length){ c++; setTimeout(type, 90); }
  else if(!deleting){ deleting = true; setTimeout(type, 1400); }
  else if(c > 0){ c--; setTimeout(type, 45); }
  else { deleting = false; w = (w + 1) % words.length; setTimeout(type, 300); }
}
type();

/* ---------- Scroll reveal ---------- */
function reveal(){
  document.querySelectorAll(".reveal").forEach(function(el){
    if(el.getBoundingClientRect().top < window.innerHeight - 40){
      el.classList.add("show");
    }
  });
}

/* ---------- Counter animation ---------- */
var counted = false;
function runCounters(){
  if(counted) return;
  var box = document.querySelector(".stats");
  if(box.getBoundingClientRect().top < window.innerHeight){
    counted = true;
    document.querySelectorAll("[data-count]").forEach(function(el){
      var target = parseInt(el.getAttribute("data-count"));
      var n = 0;
      var t = setInterval(function(){
        n++;
        el.textContent = n + "+";
        if(n >= target) clearInterval(t);
      }, 150);
    });
  }
}

window.addEventListener("scroll", function(){
  document.getElementById("topBtn").style.display = window.scrollY > 400 ? "block" : "none";
  reveal();
  runCounters();
});
window.addEventListener("load", function(){ reveal(); runCounters(); });

/* ---------- Demo panels ---------- */
function toggleDemo(id){
  document.getElementById(id).classList.toggle("open");
}

/* =====================================================
   DEMO 1 : VOTING SYSTEM
===================================================== */
var votes = { Arjun: 0, Meena: 0, Karthik: 0 };
var voted = [];

function castVote(){
  var id = document.getElementById("voterId").value.trim().toUpperCase();
  var cand = document.getElementById("candidate").value;
  var msg = document.getElementById("voteMsg");

  if(id === ""){
    msg.className = "msg err"; msg.textContent = "Please enter a Voter ID."; return;
  }
  if(voted.indexOf(id) !== -1){
    msg.className = "msg err"; msg.textContent = "Voter " + id + " has already voted! Duplicate vote blocked."; return;
  }
  voted.push(id);
  votes[cand]++;
  msg.className = "msg ok"; msg.textContent = "Vote recorded for " + cand + ". Thank you, " + id + "!";
  document.getElementById("voterId").value = "";
  showResults();
}

function showResults(){
  var total = votes.Arjun + votes.Meena + votes.Karthik;
  var html = "";
  for(var name in votes){
    var pct = total === 0 ? 0 : Math.round((votes[name] / total) * 100);
    html += '<div class="bar-row"><div class="lbl"><span>' + name + '</span><span>' + votes[name] + ' votes (' + pct + '%)</span></div>' +
            '<div class="bar"><div style="width:' + pct + '%"></div></div></div>';
  }
  document.getElementById("voteResults").innerHTML = html;
}

function resetVotes(){
  votes = { Arjun: 0, Meena: 0, Karthik: 0 };
  voted = [];
  document.getElementById("voteMsg").textContent = "";
  showResults();
}
showResults();

/* =====================================================
   DEMO 2 : LIBRARY SYSTEM
===================================================== */
var books = [
  { title: "Core Java Basics", issued: false },
  { title: "Database Systems", issued: false },
  { title: "Data Structures", issued: false },
  { title: "Clean Code", issued: false }
];

function drawBooks(){
  var select = document.getElementById("bookSelect");
  var table = document.getElementById("bookTable");
  select.innerHTML = "";
  table.innerHTML = "";
  books.forEach(function(b, i){
    select.innerHTML += '<option value="' + i + '">' + b.title + '</option>';
    table.innerHTML += '<tr><td>' + b.title + '</td><td>' + (b.issued ? "Issued" : "Available") + '</td></tr>';
  });
}

function issueBook(){
  var i = document.getElementById("bookSelect").value;
  var msg = document.getElementById("libMsg");
  if(books[i].issued){
    msg.className = "msg err"; msg.textContent = "Sorry, this book is already issued."; return;
  }
  books[i].issued = true;
  msg.className = "msg ok"; msg.textContent = '"' + books[i].title + '" issued. Return within 7 days to avoid a fine.';
  drawBooks();
  document.getElementById("bookSelect").value = i;
}

function returnBook(){
  var i = document.getElementById("bookSelect").value;
  var days = parseInt(document.getElementById("daysKept").value);
  var msg = document.getElementById("libMsg");
  if(!books[i].issued){
    msg.className = "msg err"; msg.textContent = "This book is not issued."; return;
  }
  if(isNaN(days) || days < 1){
    msg.className = "msg err"; msg.textContent = "Enter how many days the book was kept."; return;
  }
  books[i].issued = false;
  var fine = days > 7 ? (days - 7) * 2 : 0;
  msg.className = fine > 0 ? "msg err" : "msg ok";
  msg.textContent = fine > 0 ? "Returned late by " + (days - 7) + " day(s). Fine: Rs. " + fine : "Returned on time. No fine.";
  drawBooks();
  document.getElementById("bookSelect").value = i;
}
drawBooks();

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

function runQuery(){
  var q = queries[document.getElementById("querySelect").value];
  document.getElementById("sqlText").textContent = q.sql;
  var html = "<table><thead><tr>";
  q.head.forEach(function(h){ html += "<th>" + h + "</th>"; });
  html += "</tr></thead><tbody>";
  q.rows.forEach(function(r){
    html += "<tr>";
    r.forEach(function(cell){ html += "<td>" + cell + "</td>"; });
    html += "</tr>";
  });
  html += "</tbody></table>";
  document.getElementById("sqlResult").innerHTML = html;
}
runQuery();

/* =====================================================
   CONTACT FORM (opens your email app)
===================================================== */
document.getElementById("contactForm").addEventListener("submit", function(e){
  e.preventDefault();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var message = document.getElementById("message").value;

  var body = "Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message;
  window.location.href = "mailto:abineshr599@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
});