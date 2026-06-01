/* =============================================
   Healthcare+ — Main Application Script
   All original functions preserved + enhancements
   ============================================= */

/* ---- REMEDY DATA (preserved exactly) ---- */
function getData(d){

let data = {

"Fever":`
<h3>🌡 Fever Care</h3>

<div class="remedy-box">
<img src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png">
<div>
<b>Hydration</b><br>
Drink water, ORS, coconut water regularly to prevent dehydration.
</div>
</div>

<div class="remedy-box">
<img src="https://cdn-icons-png.flaticon.com/512/4149/4149687.png">
<div>
<b>Rest</b><br>
Sleep properly so your immune system can recover.
</div>
</div>

<div class="remedy-box">
<img src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png">
<div>
<b>Cool Compress</b><br>
Use wet cloth on forehead to reduce temperature.
</div>
</div>

<b>⚠️ See doctor if fever >102°F or lasts 2+ days</b>
`,

"Cold":`
<h3>🤧 Cold Remedies</h3>

<div class="remedy-box">
<img src="https://cdn-icons-png.flaticon.com/512/4149/4149687.png">
<div>
<b>Steam</b><br>
Take steam 5–10 minutes to clear congestion.
</div>
</div>

<div class="remedy-box">
<img src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png">
<div>
<b>Ginger Tea</b><br>
Reduces inflammation and improves immunity.
</div>
</div>

<div class="remedy-box">
<img src="https://cdn-icons-png.flaticon.com/512/590/590836.png">
<div>
<b>Honey</b><br>
Soothes throat and reduces irritation.
</div>
</div>
`,

"Cough":`
<h3>😷 Cough Care</h3>

<div class="remedy-box">
<img src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png">
<div>
<b>Honey + Ginger</b><br>
Take twice daily for relief.
</div>
</div>

<div class="remedy-box">
<img src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png">
<div>
<b>Turmeric Milk</b><br>
Drink at night to reduce infection.
</div>
</div>

<div class="remedy-box">
<img src="https://cdn-icons-png.flaticon.com/512/4149/4149687.png">
<div>
<b>Steam</b><br>
Clears throat irritation.
</div>
</div>
`

};

return data[d] || "<b>Consult a doctor for proper treatment.</b>";
}

/* ---- MODAL (preserved) ---- */
function openModal(name){
document.getElementById("modal").style.display="flex";
document.getElementById("title").innerText=name;
document.getElementById("info").innerHTML=getData(name);
}

function closeModal(){
document.getElementById("modal").style.display="none";
}

/* ---- CHAT TOGGLE (enhanced with CSS class) ---- */
function toggleChat(){
  var popup = document.getElementById("chatPopup");
  if(popup.classList.contains("active")){
    popup.classList.remove("active");
  } else {
    popup.classList.add("active");
    var input = document.getElementById("chatInput");
    if(input) input.focus();
  }
}

/* ---- SEND MESSAGE (basic implementation) ---- */
function sendMsg(){
  var input = document.getElementById("chatInput");
  var body = document.getElementById("chatBody");
  var msg = input.value.trim();

  if(!msg) return;

  // User message
  var userDiv = document.createElement("div");
  userDiv.style.cssText = "text-align:right; margin-bottom:12px;";
  userDiv.innerHTML = '<span style="background:linear-gradient(135deg,#EC407A,#F06292); color:white; padding:10px 16px; border-radius:16px 16px 4px 16px; display:inline-block; max-width:80%; font-size:14px; line-height:1.5;">' + msg + '</span>';
  body.appendChild(userDiv);

  input.value = "";

  // Bot response (simple health tips)
  setTimeout(function(){
    var botDiv = document.createElement("div");
    botDiv.style.cssText = "text-align:left; margin-bottom:12px;";

    var responses = [
      "💡 That's a great question! For specific medical advice, please consult a healthcare professional.",
      "🩺 I recommend checking our Symptom Checker or Home Remedies section for guidance.",
      "💊 Remember to stay hydrated, get proper rest, and eat nutritious food.",
      "🏥 If symptoms persist or worsen, please visit a doctor or call our emergency helpline.",
      "🌿 Try our Home Remedies section — we have natural solutions for many common conditions!",
      "⏰ Don't forget to set medicine reminders to stay on track with your health routine."
    ];

    var response = responses[Math.floor(Math.random() * responses.length)];
    botDiv.innerHTML = '<span style="background:#F3F4F6; color:#1F2937; padding:10px 16px; border-radius:16px 16px 16px 4px; display:inline-block; max-width:80%; font-size:14px; line-height:1.5;">' + response + '</span>';
    body.appendChild(botDiv);
    body.scrollTop = body.scrollHeight;
  }, 600);

  body.scrollTop = body.scrollHeight;
}

/* ---- SYMPTOM CHECKER — go() function ---- */
function go(){
  var sym = document.getElementById("sym");
  if(sym){
    var value = sym.value.trim();
    if(value){
      // Navigate to result page with symptom data
      localStorage.setItem("symptomData", value);
      window.location.href = "result.html";
    } else {
      sym.style.borderColor = "#EF5350";
      sym.setAttribute("placeholder", "Please enter your symptoms...");
      setTimeout(function(){
        sym.style.borderColor = "";
        sym.setAttribute("placeholder", "e.g., fever, headache, cough...");
      }, 2000);
    }
  }
}

/* ---- MEDICINE REMINDER ---- */
function setReminder(){
  var timeInput = document.getElementById("time");
  var msg = document.getElementById("msg");

  if(timeInput && msg){
    var time = timeInput.value;
    if(time){
      msg.innerText = "✅ Reminder set for " + time + " — we'll notify you!";
      msg.style.color = "#4CAF50";

      // Calculate time difference
      var now = new Date();
      var parts = time.split(":");
      var reminderTime = new Date();
      reminderTime.setHours(parseInt(parts[0]), parseInt(parts[1]), 0);

      if(reminderTime <= now){
        reminderTime.setDate(reminderTime.getDate() + 1);
      }

      var diff = reminderTime - now;

      // Set timeout for notification
      setTimeout(function(){
        if(Notification.permission === "granted"){
          new Notification("Healthcare+ Reminder", {
            body: "⏰ Time to take your medicine!",
            icon: "💊"
          });
        } else {
          alert("⏰ Medicine Reminder: Time to take your medicine!");
        }
      }, diff);

      // Request notification permission
      if("Notification" in window && Notification.permission === "default"){
        Notification.requestPermission();
      }
    } else {
      msg.innerText = "⚠️ Please select a time first.";
      msg.style.color = "#FFB300";
    }
  }
}

/* ---- RESULT PAGE — Load symptom data ---- */
document.addEventListener("DOMContentLoaded", function(){
  var output = document.getElementById("output");
  if(output && window.location.pathname.includes("result")){
    var symptomData = localStorage.getItem("symptomData");
    if(symptomData){
      output.innerHTML = "<strong>Symptoms reported:</strong> " + symptomData +
        "<br><br><strong>Recommendation:</strong> Based on your symptoms, we recommend consulting a healthcare professional for proper diagnosis. " +
        "In the meantime, stay hydrated, get adequate rest, and monitor your condition." +
        "<br><br><em>⚠️ This is not a medical diagnosis. Always consult a doctor for proper treatment.</em>";
      localStorage.removeItem("symptomData");
    } else {
      output.innerHTML = "No symptoms were submitted. <a href='symptom.html' style='color:#EC407A; font-weight:600;'>Go to Symptom Checker →</a>";
    }
  }

  // Allow Enter key to send chat message
  var chatInput = document.getElementById("chatInput");
  if(chatInput){
    chatInput.addEventListener("keypress", function(e){
      if(e.key === "Enter") sendMsg();
    });
  }

  // Allow Enter key to check symptoms
  var symInput = document.getElementById("sym");
  if(symInput){
    symInput.addEventListener("keypress", function(e){
      if(e.key === "Enter") go();
    });
  }
});