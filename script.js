document.getElementById("loginBtn").addEventListener("click", function() {
    const username = document.getElementById("username").value;
    if (username) {
        localStorage.setItem("user", username);
        loadApp();
    }
});

document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.removeItem("user");
    location.reload();
});

document.getElementById("addReminderBtn").addEventListener("click", function() {
    const item = document.getElementById("reminderInput").value;
    if (item) {
        let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
        reminders.push(item);
        localStorage.setItem("reminders", JSON.stringify(reminders));
        updateReminders();
    }
});

function updateReminders() {
    const list = document.getElementById("reminderList");
    list.innerHTML = "";
    let reminders = JSON.parse(localStorage.getItem("reminders")) || [];
    
    reminders.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${item} <button onclick="removeReminder(${index})">❌</button>`;
        list.appendChild(li);
    });
}

function removeReminder(index) {
    let reminders = JSON.parse(localStorage.getItem("reminders"));
    reminders.splice(index, 1);
    localStorage.setItem("reminders", JSON.stringify(reminders));
    updateReminders();
}

function loadApp() {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("appPage").classList.remove("hidden");
    document.getElementById("logoutBtn").classList.remove("hidden");
    document.getElementById("reminderInput").value = "";
    updateReminders();
}

if (localStorage.getItem("user")) {
    loadApp();
}
