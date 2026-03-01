import { useState, useEffect } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const QUADRANTS = [
  {
    id: "q1",
    label: "🔥 Urgent & Important",
    sub: "Do First — Eat the Frog",
    color: "#FF4757",
    bg: "rgba(255,71,87,0.08)",
    border: "rgba(255,71,87,0.3)",
  },
  {
    id: "q2",
    label: "🎯 Important, Not Urgent",
    sub: "Schedule — Deep Work Zone",
    color: "#2ED573",
    bg: "rgba(46,213,115,0.08)",
    border: "rgba(46,213,115,0.3)",
  },
  {
    id: "q3",
    label: "⚡ Urgent, Not Important",
    sub: "Delegate — Quick Wins",
    color: "#FFA502",
    bg: "rgba(255,165,2,0.08)",
    border: "rgba(255,165,2,0.3)",
  },
  {
    id: "q4",
    label: "🗑️ Not Urgent & Not Important",
    sub: "Eliminate — Time Wasters",
    color: "#747D8C",
    bg: "rgba(116,125,140,0.08)",
    border: "rgba(116,125,140,0.3)",
  },
];

const HABITS = [
  "🏃 Olahraga",
  "📚 Baca Buku",
  "💧 Minum Air",
  "🧘 Meditasi",
  "✍️ Journaling",
  "🌙 Tidur 8 Jam",
];
const PARA = [
  {
    id: "projects",
    icon: "🚀",
    title: "Projects",
    desc: "Active work with deadlines",
    color: "#5352ED",
  },
  {
    id: "areas",
    icon: "🗂️",
    title: "Areas",
    desc: "Ongoing responsibilities",
    color: "#2ED573",
  },
  {
    id: "resources",
    icon: "💡",
    title: "Resources",
    desc: "Links, ideas & inspiration",
    color: "#FF6B81",
  },
  {
    id: "archives",
    icon: "📦",
    title: "Archives",
    desc: "Completed & dormant items",
    color: "#747D8C",
  },
];

function useLocalLike(key, init) {
  const [v, setV] = useState(init);
  return [v, setV];
}

function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const h = time.getHours(),
    m = time.getMinutes(),
    s = time.getSeconds();
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  const greeting =
    h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";
  const emoji = h < 12 ? "☀️" : h < 17 ? "🌤️" : "🌙";
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: 11,
          letterSpacing: "0.25em",
          color: "#A0A8B8",
          textTransform: "uppercase",
          marginBottom: 4,
        }}
      >
        {DAYS[time.getDay()]}, {MONTHS[time.getMonth()]} {time.getDate()},{" "}
        {time.getFullYear()}
      </div>
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 52,
          fontWeight: 700,
          color: "#E8EAF0",
          lineHeight: 1,
          letterSpacing: "-2px",
        }}
      >
        {String(h12).padStart(2, "0")}:{String(m).padStart(2, "0")}
        <span style={{ fontSize: 28, color: "#6C7A96", marginLeft: 6 }}>
          {String(s).padStart(2, "0")}
        </span>
        <span
          style={{
            fontSize: 16,
            color: "#6C7A96",
            marginLeft: 8,
            letterSpacing: "0.1em",
          }}
        >
          {ampm}
        </span>
      </div>
      <div style={{ marginTop: 8, fontSize: 15, color: "#A0A8B8" }}>
        {emoji} {greeting}, Warrior.
      </div>
    </div>
  );
}

function HabitTracker() {
  const today = new Date().toDateString();
  const [habits, setHabits] = useLocalLike(
    "habits",
    HABITS.reduce((a, h) => ({ ...a, [h]: false }), {})
  );
  const checked = Object.values(habits).filter(Boolean).length;
  const pct = Math.round((checked / HABITS.length) * 100);

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "20px 22px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              color: "#6C7A96",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Habit Tracker
          </div>
          <div
            style={{
              fontSize: 15,
              color: "#C8D0E0",
              fontWeight: 600,
              marginTop: 2,
            }}
          >
            Today's Streak
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: pct === 100 ? "#2ED573" : "#5352ED",
              fontFamily: "'Space Mono', monospace",
            }}
          >
            {pct}%
          </div>
          <div style={{ fontSize: 11, color: "#6C7A96" }}>
            {checked}/{HABITS.length} done
          </div>
        </div>
      </div>
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: 8,
          height: 6,
          marginBottom: 16,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background:
              pct === 100
                ? "linear-gradient(90deg, #2ED573, #7BED9F)"
                : "linear-gradient(90deg, #5352ED, #A29BFE)",
            borderRadius: 8,
            transition: "width 0.5s ease",
          }}
        />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {HABITS.map((h) => (
          <div
            key={h}
            onClick={() => setHabits((p) => ({ ...p, [h]: !p[h] }))}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 10,
              cursor: "pointer",
              background: habits[h]
                ? "rgba(83,82,237,0.15)"
                : "rgba(255,255,255,0.03)",
              border: `1px solid ${
                habits[h] ? "rgba(83,82,237,0.4)" : "rgba(255,255,255,0.06)"
              }`,
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: 5,
                border: `2px solid ${habits[h] ? "#5352ED" : "#3A4259"}`,
                background: habits[h] ? "#5352ED" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >
              {habits[h] && (
                <span style={{ color: "#fff", fontSize: 11, lineHeight: 1 }}>
                  ✓
                </span>
              )}
            </div>
            <span
              style={{
                fontSize: 12,
                color: habits[h] ? "#C8D0E0" : "#6C7A96",
                transition: "color 0.2s",
                userSelect: "none",
              }}
            >
              {h}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EisenhowerMatrix() {
  const [tasks, setTasks] = useLocalLike("tasks", {
    q1: ["Laporan deadline hari ini"],
    q2: ["Belajar skill baru", "Exercise plan"],
    q3: ["Balas email"],
    q4: ["Scroll sosmed"],
  });
  const [input, setInput] = useLocalLike("taskInput", {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
  });

  const addTask = (qid) => {
    if (!input[qid].trim()) return;
    setTasks((p) => ({ ...p, [qid]: [...p[qid], input[qid].trim()] }));
    setInput((p) => ({ ...p, [qid]: "" }));
  };
  const removeTask = (qid, i) =>
    setTasks((p) => ({ ...p, [qid]: p[qid].filter((_, idx) => idx !== i) }));

  return (
    <div>
      <div
        style={{
          fontSize: 12,
          color: "#6C7A96",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 4,
        }}
      >
        Task Manager
      </div>
      <div
        style={{
          fontSize: 15,
          color: "#C8D0E0",
          fontWeight: 600,
          marginBottom: 16,
        }}
      >
        Eisenhower Matrix
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {QUADRANTS.map((q) => (
          <div
            key={q.id}
            style={{
              background: q.bg,
              border: `1px solid ${q.border}`,
              borderRadius: 14,
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: q.color,
                marginBottom: 2,
              }}
            >
              {q.label}
            </div>
            <div style={{ fontSize: 10, color: "#6C7A96", marginBottom: 10 }}>
              {q.sub}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
                marginBottom: 8,
                minHeight: 40,
              }}
            >
              {tasks[q.id].map((t, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: q.color,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 11, color: "#A0A8B8", flex: 1 }}>
                    {t}
                  </span>
                  <span
                    onClick={() => removeTask(q.id, i)}
                    style={{
                      fontSize: 10,
                      color: "#3A4259",
                      cursor: "pointer",
                      padding: "0 2px",
                    }}
                  >
                    ✕
                  </span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <input
                value={input[q.id]}
                onChange={(e) =>
                  setInput((p) => ({ ...p, [q.id]: e.target.value }))
                }
                onKeyDown={(e) => e.key === "Enter" && addTask(q.id)}
                placeholder="Add task..."
                style={{
                  flex: 1,
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 7,
                  padding: "5px 8px",
                  fontSize: 11,
                  color: "#C8D0E0",
                  outline: "none",
                }}
              />
              <button
                onClick={() => addTask(q.id)}
                style={{
                  background: q.color,
                  border: "none",
                  borderRadius: 7,
                  width: 26,
                  color: "#fff",
                  fontSize: 14,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DailyIntention() {
  const [intention, setIntention] = useLocalLike("intention", "");
  const [gratitude, setGratitude] = useLocalLike("gratitude", "");
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      {[
        [
          "🎯 Daily Intention",
          "What's your ONE focus today?",
          intention,
          setIntention,
        ],
        ["🙏 Gratitude", "What are you grateful for?", gratitude, setGratitude],
      ].map(([label, ph, val, setVal]) => (
        <div
          key={label}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 14,
            padding: "14px 16px",
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "#A0A8B8",
              marginBottom: 8,
              fontWeight: 600,
            }}
          >
            {label}
          </div>
          <textarea
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder={ph}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              resize: "none",
              fontSize: 13,
              color: "#C8D0E0",
              lineHeight: 1.6,
              minHeight: 60,
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
        </div>
      ))}
    </div>
  );
}

function PARASection() {
  const [active, setActive] = useLocalLike("para_active", "projects");
  const [items, setItems] = useLocalLike("para_items", {
    projects: ["Website redesign — due Jun 30"],
    areas: ["Health & fitness notes", "Monthly budget"],
    resources: ["https://notion.so/templates", "Deep Work — Cal Newport"],
    archives: ["Q1 Report ✓", "Old project X ✓"],
  });
  const [inp, setInp] = useLocalLike("para_inp", "");
  const cur = PARA.find((p) => p.id === active);

  const add = () => {
    if (!inp.trim()) return;
    setItems((p) => ({ ...p, [active]: [...p[active], inp.trim()] }));
    setInp("");
  };
  const remove = (i) =>
    setItems((p) => ({
      ...p,
      [active]: p[active].filter((_, idx) => idx !== i),
    }));

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "20px 22px",
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: "#6C7A96",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 4,
        }}
      >
        Second Brain
      </div>
      <div
        style={{
          fontSize: 15,
          color: "#C8D0E0",
          fontWeight: 600,
          marginBottom: 14,
        }}
      >
        P.A.R.A System
      </div>
      <div
        style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}
      >
        {PARA.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            style={{
              padding: "7px 14px",
              borderRadius: 20,
              border: `1px solid ${
                active === p.id ? p.color : "rgba(255,255,255,0.08)"
              }`,
              background: active === p.id ? `${p.color}22` : "transparent",
              color: active === p.id ? p.color : "#6C7A96",
              fontSize: 12,
              cursor: "pointer",
              fontWeight: active === p.id ? 700 : 400,
              transition: "all 0.2s",
            }}
          >
            {p.icon} {p.title}
          </button>
        ))}
      </div>
      <div
        style={{
          background: `${cur.color}11`,
          border: `1px solid ${cur.color}33`,
          borderRadius: 12,
          padding: "12px 14px",
          minHeight: 120,
        }}
      >
        <div
          style={{
            fontSize: 11,
            color: cur.color,
            marginBottom: 10,
            opacity: 0.8,
          }}
        >
          {cur.desc}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            marginBottom: 10,
          }}
        >
          {items[active].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 8px",
                background: "rgba(255,255,255,0.04)",
                borderRadius: 8,
              }}
            >
              <span style={{ fontSize: 11, color: "#A0A8B8", flex: 1 }}>
                {item}
              </span>
              <span
                onClick={() => remove(i)}
                style={{ fontSize: 10, color: "#3A4259", cursor: "pointer" }}
              >
                ✕
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <input
            value={inp}
            onChange={(e) => setInp(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder={`Add to ${cur.title}...`}
            style={{
              flex: 1,
              background: "rgba(0,0,0,0.2)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              padding: "6px 10px",
              fontSize: 12,
              color: "#C8D0E0",
              outline: "none",
            }}
          />
          <button
            onClick={add}
            style={{
              background: cur.color,
              border: "none",
              borderRadius: 8,
              padding: "6px 12px",
              color: "#fff",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

function Ritual({ title, icon, items }) {
  const [checked, setChecked] = useLocalLike(
    `ritual_${title}`,
    items.reduce((a, i) => ({ ...a, [i]: false }), {})
  );
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, rgba(83,82,237,0.12), rgba(255,107,129,0.08))",
        border: "1px solid rgba(83,82,237,0.2)",
        borderRadius: 16,
        padding: "18px 20px",
        flex: 1,
      }}
    >
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: "#C8D0E0",
          marginBottom: 12,
        }}
      >
        {icon} {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {items.map((item) => (
          <div
            key={item}
            onClick={() => setChecked((p) => ({ ...p, [item]: !p[item] }))}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                border: `2px solid ${checked[item] ? "#5352ED" : "#3A4259"}`,
                background: checked[item] ? "#5352ED" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >
              {checked[item] && (
                <span style={{ color: "#fff", fontSize: 10 }}>✓</span>
              )}
            </div>
            <span
              style={{
                fontSize: 12,
                color: checked[item] ? "#5352ED" : "#7A849A",
                textDecoration: checked[item] ? "line-through" : "none",
                transition: "all 0.2s",
                userSelect: "none",
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DailyOS() {
  const [tab, setTab] = useLocalLike("tab", "dashboard");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0D0F17",
        fontFamily: "'DM Sans', sans-serif",
        color: "#C8D0E0",
        padding: "0 0 60px",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder, textarea::placeholder { color: #3A4259; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #2A2F45; borderRadius: 2px; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
        @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .fade { animation: fadeIn 0.4s ease both; }
      `}</style>

      {/* Header */}
      <div
        style={{
          background: "rgba(13,15,23,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 22 }}>⚡</div>
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#E8EAF0",
                  letterSpacing: "-0.3px",
                }}
              >
                Daily OS
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#4A5568",
                  letterSpacing: "0.1em",
                }}
              >
                PRODUCTIVITY · SECOND BRAIN
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["dashboard", "tasks", "brain"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  background: tab === t ? "rgba(83,82,237,0.2)" : "transparent",
                  color: tab === t ? "#A29BFE" : "#4A5568",
                  transition: "all 0.2s",
                }}
              >
                {t === "dashboard"
                  ? "🏠 Home"
                  : t === "tasks"
                  ? "✅ Tasks"
                  : "🧠 Brain"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>
        {/* Hero Clock */}
        <div
          style={{
            padding: "40px 0 24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Clock />
        </div>

        {tab === "dashboard" && (
          <div
            className="fade"
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <DailyIntention />
            <HabitTracker />
            <div style={{ display: "flex", gap: 14 }}>
              <Ritual
                title="Morning Launchpad"
                icon="🌅"
                items={[
                  "Review Daily Intention",
                  "Check Task Manager",
                  "10 min meditasi",
                  "Minum segelas air",
                  "Cek kalender hari ini",
                ]}
              />
              <Ritual
                title="Shutdown Ritual"
                icon="🌙"
                items={[
                  "Centang Habit Tracker",
                  "Pindah tugas selesai ke Archive",
                  "Brain dump pikiran hari ini",
                  "Tulis rencana besok",
                  "Matikan notifikasi",
                ]}
              />
            </div>
          </div>
        )}

        {tab === "tasks" && (
          <div className="fade">
            <EisenhowerMatrix />
          </div>
        )}

        {tab === "brain" && (
          <div className="fade">
            <PARASection />
          </div>
        )}

        {/* Footer tip */}
        <div
          style={{
            marginTop: 24,
            padding: "14px 18px",
            background: "rgba(83,82,237,0.07)",
            border: "1px dashed rgba(83,82,237,0.25)",
            borderRadius: 12,
            fontSize: 12,
            color: "#6C7A96",
            lineHeight: 1.7,
          }}
        >
          <span style={{ color: "#A29BFE", fontWeight: 700 }}>
            ⚡ Workflow:{" "}
          </span>
          <span style={{ color: "#5352ED" }}>Pagi</span> → Isi Intention + cek
          Tasks &nbsp;|&nbsp;
          <span style={{ color: "#FF6B81" }}>Siang</span> → Simpan ide ke
          Resources (Brain) &nbsp;|&nbsp;
          <span style={{ color: "#2ED573" }}>Malam</span> → Centang Habits +
          Archive tugas selesai
        </div>
      </div>
    </div>
  );
}
