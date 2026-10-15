import { useCallback, useEffect, useMemo, useState } from "react";

const API = "http://localhost:5001/api";
const today = () => {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Something went wrong.");
  return data;
}

export default function App() {
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState([]);
  const [date, setDate] = useState(today());
  const [form, setForm] = useState({ rollNumber: "", name: "", className: "" });
  const [statuses, setStatuses] = useState({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const loadStudents = useCallback(async () => {
    const data = await request("/students");
    setStudents(data);
  }, []);

  const loadRecords = useCallback(async (selectedDate = date) => {
    const data = await request(`/attendance?date=${encodeURIComponent(selectedDate)}`);
    setRecords(data);
    const next = {};
    data.forEach(item => { if (item.student?._id) next[item.student._id] = item.status; });
    setStatuses(previous => ({ ...previous, ...next }));
  }, [date]);

  const refresh = useCallback(async () => {
    try {
      await Promise.all([loadStudents(), loadRecords(date)]);
    } catch (error) {
      setMessage(`${error.message} Make sure the backend and MongoDB are running.`);
    }
  }, [loadStudents, loadRecords, date]);

  useEffect(() => { refresh(); }, [refresh]);

  const presentCount = useMemo(() => records.filter(r => r.status === "Present").length, [records]);
  const absentCount = useMemo(() => records.filter(r => r.status === "Absent").length, [records]);
  const markedCount = records.length;

  async function addStudent(event) {
    event.preventDefault();
    setMessage("");
    setBusy(true);
    try {
      await request("/students", { method: "POST", body: JSON.stringify(form) });
      setForm({ rollNumber: "", name: "", className: "" });
      setMessage("Student added successfully.");
      await loadStudents();
    } catch (error) {
      setMessage(error.message);
    } finally { setBusy(false); }
  }

  async function markAttendance(studentId, status) {
    setStatuses(prev => ({ ...prev, [studentId]: status }));
    setMessage("");
    try {
      await request("/attendance", {
        method: "POST",
        body: JSON.stringify({ studentId, date, status })
      });
      await loadRecords(date);
      setMessage("Attendance saved.");
    } catch (error) {
      setMessage(error.message);
      await loadRecords(date).catch(() => {});
    }
  }

  async function deleteStudent(student) {
    if (!window.confirm(`Delete ${student.name} and their attendance records?`)) return;
    try {
      await request(`/students/${student._id}`, { method: "DELETE" });
      setMessage("Student deleted.");
      await refresh();
    } catch (error) { setMessage(error.message); }
  }

  async function deleteRecord(recordId) {
    try {
      await request(`/attendance/${recordId}`, { method: "DELETE" });
      setMessage("Attendance record deleted.");
      await loadRecords(date);
    } catch (error) { setMessage(error.message); }
  }

  const recordByStudent = Object.fromEntries(records.filter(r => r.student?._id).map(r => [r.student._id, r]));

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark">SA</div>
        <div><p className="eyebrow">FULL STACK MINI PROJECT</p><h1>Student Attendance Manager</h1></div>
        <span className="live-pill"><i /> Attendance workspace</span>
      </header>

      <section className="intro">
        <div>
          <p className="eyebrow">CLASSROOM OVERVIEW</p>
          <h2>Every class, <span>clearly tracked.</span></h2>
          <p className="intro-copy">Add students, record daily attendance, and review class status from one simple dashboard.</p>
        </div>
        <label className="date-box">Attendance date
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </label>
      </section>

      {message && <div className="notice" role="status">{message}</div>}

      <section className="stats-grid">
        <article className="stat-card"><span className="stat-icon">♧</span><p>Total students</p><strong>{students.length}</strong><small>Registered in this class</small></article>
        <article className="stat-card"><span className="stat-icon green">✓</span><p>Present</p><strong>{presentCount}</strong><small>Marked present on selected date</small></article>
        <article className="stat-card"><span className="stat-icon red">×</span><p>Absent</p><strong>{absentCount}</strong><small>Marked absent on selected date</small></article>
        <article className="stat-card"><span className="stat-icon purple">◷</span><p>Not marked</p><strong>{Math.max(students.length - markedCount, 0)}</strong><small>Awaiting attendance entry</small></article>
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-heading"><div><p className="eyebrow">STUDENT DIRECTORY</p><h3>Add a student</h3></div><span className="panel-symbol">＋</span></div>
          <form onSubmit={addStudent} className="student-form">
            <label>Roll number<input required value={form.rollNumber} onChange={e => setForm({...form, rollNumber:e.target.value})} placeholder="e.g. 01" /></label>
            <label>Student name<input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Full name" /></label>
            <label>Class / division<input required value={form.className} onChange={e => setForm({...form, className:e.target.value})} placeholder="e.g. SY BTech A" /></label>
            <button className="primary-button" disabled={busy}>{busy ? "Adding..." : "Add student"} <span>↗</span></button>
          </form>
          <div className="subheading"><h4>Registered students</h4><span>{students.length} students</span></div>
          {students.length === 0 ? <div className="empty-state"><strong>No students yet</strong><p>Add your first student using the form above.</p></div> :
            <div className="student-list">{students.map(student => <div className="student-row" key={student._id}>
              <div className="avatar">{student.name.split(" ").map(part => part[0]).slice(0,2).join("").toUpperCase()}</div>
              <div className="student-info"><strong>{student.name}</strong><small>Roll {student.rollNumber} · {student.className}</small></div>
              <button className="icon-button" title={`Delete ${student.name}`} onClick={() => deleteStudent(student)}>×</button>
            </div>)}</div>}
        </article>

        <article className="panel attendance-panel">
          <div className="panel-heading"><div><p className="eyebrow">DAILY REGISTER</p><h3>Mark attendance</h3></div><span className="date-tag">{date}</span></div>
          <p className="helper-text">Choose Present or Absent for each student. Your selection is saved to the database.</p>
          {students.length === 0 ? <div className="empty-state tall"><strong>Your register is ready</strong><p>Add students first, then their names will appear here.</p></div> :
            <div className="attendance-table-wrap"><table className="attendance-table"><thead><tr><th>Student</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>{students.map(student => {
                const current = recordByStudent[student._id]?.status || statuses[student._id] || "";
                return <tr key={student._id}><td><strong>{student.name}</strong><small>Roll {student.rollNumber}</small></td>
                  <td>{current ? <span className={`status-badge ${current.toLowerCase()}`}>{current}</span> : <span className="status-badge pending">Not marked</span>}</td>
                  <td><div className="action-buttons"><button className={`mark-button present ${current === "Present" ? "selected" : ""}`} onClick={() => markAttendance(student._id, "Present")}>P</button><button className={`mark-button absent ${current === "Absent" ? "selected" : ""}`} onClick={() => markAttendance(student._id, "Absent")}>A</button></div></td>
                </tr>;
              })}</tbody></table></div>}
          <div className="legend"><span><i className="legend-dot present-dot" /> Present</span><span><i className="legend-dot absent-dot" /> Absent</span><span><i className="legend-dot pending-dot" /> Not marked</span></div>
        </article>
      </section>

      <section className="panel records-panel">
        <div className="panel-heading"><div><p className="eyebrow">SAVED DATA</p><h3>Attendance records</h3></div><span className="records-count">{records.length} records · {date}</span></div>
        {records.length === 0 ? <div className="empty-state"><strong>No attendance records for this date</strong><p>Mark attendance above to create the first record.</p></div> :
          <div className="attendance-table-wrap"><table className="attendance-table records-table"><thead><tr><th>Roll no.</th><th>Student</th><th>Class</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>{records.map(record => <tr key={record._id}><td>{record.student?.rollNumber || "—"}</td><td><strong>{record.student?.name || "Deleted student"}</strong></td><td>{record.student?.className || "—"}</td><td>{record.date}</td><td><span className={`status-badge ${record.status.toLowerCase()}`}>{record.status}</span></td><td><button className="text-button" onClick={() => deleteRecord(record._id)}>Delete</button></td></tr>)}</tbody></table></div>}
      </section>
      <footer><span>Student Attendance Manager</span><span>React · Express · MongoDB</span></footer>
    </main>
  );
}
