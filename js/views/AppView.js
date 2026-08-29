function renderMembers(members) {
    const tbody = document.querySelector('#memberTable tbody');
    
    tbody.innerHTML = '';

    members.forEach((m) => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = 
        "<td>" + m.id + "</td>" +
        "<td>" + m.name + "</td>" +
        "<td>" + m.role + "</td>" +
        "<td>" + (m.active ? 'Active' : 'In-Active') + "</td>";
        tbody.appendChild(tr);
    });
}

function OpenCreateForm(show) {
    const form = document.getElementById('createRequestForm');
    form.style.display = show ? 'block' : 'none';
}

function TargetSelected(members) {
    const select = document.getElementById('targetSelected');

    select.innerHTML = '';
    members.forEach((m) => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = m.id + " - " + m.name;
        select.appendChild(opt);
    });
}

function RoleSelected(roles) {
    const select = document.getElementById('roleSelected');
    select.innerHTML = '';
    roles.forEach((r) => {
        const opt = document.createElement('option');
        opt.value = r;
        opt.textContent = r;
        select.appendChild(opt);
    })
}

function renderRequests(requests, currentId) {
    const tbody = document.querySelector('#requestTable tbody');
    tbody.innerHTML = '';

    requests.forEach((r) => {
        const from = getMemberName(r.requester_id);
        const to = getMemberName(r.target_id);

        const decision = getDecisionForReq(r.id);
        let decisionText = "-";
        if(decision.length > 0) {
            decisionText = decision.map(function(d) {
                return d.member_id + ": " + d.result;
            }).join(", ");
        }

        var action = "-";
        var canShowbtn = false;

        var voters = getVoters(r.requester_id, r.target_id);

        for(var i = 0; i < voters.length; i++) {
            if(voters[i].id === currentId) {
                canShowbtn = true;
                break;
            }
        }

        if(canShowbtn && !hasVoted(r.id, currentId)) {
            action =
            '<button type="button" class="btn-approve" data-req="' + r.id + '">อนุมัติ</button> ' +
            '<button type="button" class="btn-reject" data-req="' + r.id + '">ไม่อนุมัติ</button>';
        }

        const tr = document.createElement('tr');
        tr.innerHTML =
        "<td>" + r.id + "</td>" +
        "<td>" + r.requester_id + " (" + from + ")" + "</td>" +
        "<td>" + r.target_id + " (" + to + ")" + "</td>" +
        "<td>" + r.new_role + "</td>" +
        "<td>" + r.status + "</td>" +
        "<td>" + decisionText + "</td>" +
        "<td>" + action + "</td>";
 
        tbody.appendChild(tr);
    })
}


function showError(message) {
    const box = document.getElementById('err-box');
    box.textContent = message;
}

function clearError() {
    document.getElementById('err-box').textContent = '';
}