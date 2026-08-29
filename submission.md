# SUBMISSION - Exit Exam MVC 1/2569 (เสาร์บ่าย)

## 1. วิธีเปิดโปรแกรม

- ภาษา/เฟรมเวิร์ก: JS (Javascript)
- Entry point / คำสั่งเปิดโปรแกรม: เปิด index.html ขึ้นมาแล้วดูได้เลยครับ หรือใช้พวก nginx , live server ก็ได้ครับ
- หมายเหตุที่จำเป็น (ถ้ามี): ไม่ต้องลงอะไร ข้อมูลมัรอยู่ใน Member.js แล้วครับ รีหน้าจอแล้วข้อมูลจะหายนะครับ ไม่ได้เก็บใน cache ไว้

## 2. ตารางเชื่อมโยง Requirements


| Requirement | Model / Domain                                                                                                               | Controller / Action                                                               | View / Screen                                                                                |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| R1          | `seedData`, `getMembers()`, `getRequests()`, `getDecisionForReq()`, `getRoles()`                                             | `startApp()` โหลดข้อมูลละให้ View มันแสดงผล                                       | `renderMembers()`, `renderRequests()`, `#currentUserSelect`, `#memberTable`, `#requestTable` |
| R2          | `createRequest(reqId, targetId, newRole)`                                                                                    | `btnShowCreateForm.onclick`, `createRequestForm.onsubmit` เรียก `createRequest()` | `OpenCreateForm()`, `TargetSelected()`, `RoleSelected()`, `#createRequestForm`               |
| R3          | `addDecision()`, `getVoters()`, `hasVoted()`                                                                                 | `bindVoteButtons()` คลิกอนุมัติไม่อนุมัติ แล้วเรียก`addDecision()`                | ปุ่ม `.btn-approve` / `.btn-reject` ใน `#requestTable`                                       |
| R4          | `countVotes(reqId)` รวม APPROVE/REJECT ครบ 2 เสียง ปิดคำขอเป็น APPROVED/REJECTED ถ้า APPROVED เปลี่ยน `role` ของ `target_id` | หลัง `addDecision()` สำเร็จ เรียก `refreshRequests()` แสดงผงใหม่                  | `renderRequests()` แสดงstatus ใหม่, `renderMembers()`                                        |
| R5          | return `{ ok: false, message }` ถ้ามันผิ validate                                                                            | ถ้า `!result.ok` เรียก `showError(result.message)` ไม่รีตาราง                     | `showError()`, `clearError()`, `#err-box`                                                    |




## 3. ผลการทดสอบ


| กรณี | ผ่าน/ไม่ผ่าน | หมายเหตุ (เฉพาะที่จำเป็น) |
| ---- | ------------ | ------------------------- |
| T1   |              |                           |
| T2   |              |                           |
| T3   |              |                           |
| T4   |              |                           |
| T5   |              |                           |
| T6   |              |                           |




## 4. ความแตกต่างระหว่างแบบที่ออกกับโปรแกรมจริง (ถ้ามี)

ระบุไม่เกิน 3 ข้อ

## 5. บันทึกการใช้ Generative AI

หากไม่ได้ใช้ ให้ระบุ **ไม่ได้ใช้ Generative AI**


| เวลาโดยประมาณ | เครื่องมือ | ใช้เพื่ออะไร                         | นำคำแนะนำไปใช้อย่างไร |
| ------------- | ---------- | ------------------------------------ | --------------------- |
| 30 นาที       | Cursor     | ดูจุดที่มัน error ที่เขียน ตัวแปรผิด | ก็ปรับตาม แล้วแก้ไข   |
| 20 นาที       | Gemini     | สรุป Req                             | นำไปเขียนเป็นโค้ดหลัก |
|               |            |                                      |                       |


