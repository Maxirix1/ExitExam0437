function startApp() {
  const members = getMembers();
  const roles = getRoles();
  renderMembers(members);

  const select = document.getElementById("currentUserSelect");
  members.forEach((m) => {
    const opt = document.createElement("option");
    opt.value = m.id;
    opt.textContent = m.id + " - " + m.name + " (" + m.role + ")";
    select.appendChild(opt);
  });

  renderRequests(getRequests(), document.getElementById("currentUserSelect").value);
  bindVoteButtons();
}

document.addEventListener("DOMContentLoaded", startApp);

document.getElementById("btnShowCreateForm").onclick = function () {
  OpenCreateForm(true);

  const currentId = document.getElementById("currentUserSelect").value;

  const members = getMembers().filter(function (m) {
    return m.id !== currentId;
  });

  TargetSelected(getMemberExcept(currentId));
  RoleSelected(getRoles());
};

document.getElementById("currentUserSelect").onchange = function() {
    const form = document.getElementById('createRequestForm');

    if(form.style.display == "none") return;

    const currentId = this.value;
    const memebers = getMembers().filter(function(m) {
        return m.id !== currentId;
    });
    TargetSelected(getMemberExcept(currentId));
}

document.getElementById("createRequestForm").onsubmit = function (e) {
  e.preventDefault();
  clearError();

  const requestId = document.getElementById("currentUserSelect").value;
  const targetId = document.getElementById("targetSelected").value;
  const newRole = document.getElementById("roleSelected").value;

  const result = createRequest(requestId, targetId, newRole);

  if(!result.ok) {
    showError(result.message);
    return;
}

    renderRequests(getRequests());
    OpenCreateForm(false);
};


function refreshRequests() {
    var currentId = document.getElementById("currentUserSelect").value;
    renderRequests(getRequests(), currentId);
    bindVoteButtons();
}


function bindVoteButtons() {
    var currentId = document.getElementById("currentUserSelect").value;
    var approveBtns = document.querySelectorAll(".btn-approve");
    for (var i = 0; i < approveBtns.length; i++) {
      approveBtns[i].onclick = function() {
        clearError();
        var reqId = this.getAttribute("data-req");
        var result = addDecision(reqId, currentId, "APPROVE");
        if (!result.ok) {
          showError(result.message);
          return;
        }
        refreshPage();
      };
    }
    var rejectBtns = document.querySelectorAll(".btn-reject");
    for (var i = 0; i < rejectBtns.length; i++) {
      rejectBtns[i].onclick = function() {
        clearError();
        var reqId = this.getAttribute("data-req");
        var result = addDecision(reqId, currentId, "REJECT");
        if (!result.ok) {
          showError(result.message);
          return;
        }
        refreshPage();
      };
    }
  }