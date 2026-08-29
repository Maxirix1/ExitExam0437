function getRequests() {
    return seedData.role_change_requests;
}

function getMemberName(id) {
    const m = seedData.members.find(function(x) {
        return x.id === id;
    });
    return m ? m.name : id;
}

function getDecisionForReq(reqId) {
    return seedData.decisions.filter(function(x) {
        return x.request_id === reqId;
    });
}

// -------------

function createRequest(reqId, targetId, newRole ) {

    if(reqId === targetId) {
        return {
            ok: false,
            message: "ผู้เสนอไม่สามารถเปลี่ยนบทบาทเป็นตัวเองได้"
        };
    }

    const pending = seedData.role_change_requests.find(function(x) {
        return x.target_id === targetId && x.status === "PENDING";
    });

    if(pending) {
        return {
            ok: false,
            message: "สมาชิกเป้าหมายนี้ มีคำขอแล้ว และอยู่ในสถานะ Pending"
        }
    }

    const newId = "C" + String(seedData.role_change_requests.length + 1).padStart(2, '0');

    const req = {
        id: newId,
        requester_id: reqId,
        target_id: targetId,
        new_role: newRole,
        status: "PENDING"
    };

    seedData.role_change_requests.push(req);

    return {
        ok: true,
        request: req
    };

}

function getVoters(reqId, targetId) {
    var list = [];

    for(var i = 0; i < seedData.members.length; i++) {
        var m = seedData.members[i];
        if(m.active && m.id !== reqId && m.id !== targetId) {
            list.push(m);
        }
    }
    return list;
}

function hasVoted(reqId, memId) {
    var list = getDecisionForReq(reqId);
    for (var i = 0; i < list.length; i++) {
        if(list[i].member_id === memId) {
            return true;
        }
    }
    return false;
}

function addDecision(reqId, memId, result) {
    var req = null;
    for(var i = 0; i < seedData.role_change_requests.length; i++) {
        if(seedData.role_change_requests[i].id === reqId) {
            req = seedData.role_change_requests[i];
            break;
        }
    }
    if(!req) {
        return { ok: false, message: "ไม่พบคำขอ"}
    }

    if(memId === req.requester_id) {
        return { ok : false, message: "ผู้เสนอไม่สามารถลงคว่าคิดเห็นได้"};
    }

    var member = null;
    for(var j = 0; j < seedData.members.length; j++) {
        if(seedData.members[j].id === memId) {
            member = seedData.members[j];
            break;
        }
    }
    if(!member || !member.active) {
        return { ok: false, message: "สมาชิกนี้ไม่มีสิทธิ์ลงความเห็น"}
    }

    if(hasVoted(reqId, memId)) {
        return { ok : false, message: "คุณลงความเห็นไปแล้ว"}
    }

    seedData.decistions.pusq({
        request_id: reqId,
        member_id: memId,
        result: result
    });

    return { ok : true};
}