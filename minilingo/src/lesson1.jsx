import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom"; 

export default function Lesson1() {
  const location = useLocation();
  const currentTopic = location.state?.topic || "animals";

  const [round, setRound] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Define missing states for kids' features
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);

  async function loadRound() {
    setLoading(true);
    setStatus(null);
    setShowHint(false);
    try {
      const res = await fetch("http://localhost:5000/api/match-round", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: currentTopic }), 
      });
      
      if (!res.ok) throw new Error("Server error");
      
      const data = await res.json();
      setRound(data);
    } catch (err) {
      console.error(err);
      setRound({ error: "Magic took too long! Is your Python server running?" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadRound(); }, [currentTopic]);

  const handlePick = (i) => {
    if (status === "correct") return;
    if (i === round.answerIndex) {
      setStatus("correct");
      setScore(s => s + 10);
      setStreak(st => st + 1);
    } else {
      setStatus("wrong");
      setStreak(0);
    }
  };

  // 1. Prevents blank page by showing a loading screen
  if (loading) return (
    <div style={{ textAlign: 'center', padding: '100px', backgroundColor: '#87D8D2', height: '100vh' }}>
      <h2 style={{ color: 'white', fontFamily: 'Sigmar One' }}>✨ Loading Magic... ✨</h2>
    </div>
  );

  // 2. Error display
  if (round?.error) return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <p style={{ color: 'red' }}>{round.error}</p>
      <button onClick={loadRound}>Try Again</button>
    </div>
  );

  return (
    <main style={{ backgroundColor: '#F0F2F5', minHeight: '100vh', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <div style={{ background: '#FF9F43', color: 'white', padding: '10px 20px', borderRadius: '15px' }}>⭐ {score}</div>
        <div style={{ background: '#FF9F43', color: 'white', padding: '10px 20px', borderRadius: '15px' }}>🔥 {streak}</div>
      </div>

      <div style={{ backgroundColor: 'white', maxWidth: '500px', margin: '0 auto', borderRadius: '30px', padding: '40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '48px', color: '#2F3640' }}>{round?.challengeText}</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
          {round?.options.map((opt, i) => (
            <button 
              key={i} 
              onClick={() => handlePick(i)}
              style={{
                padding: '20px',
                fontSize: '20px',
                borderRadius: '20px',
                border: '2px solid #DCDDE1',
                backgroundColor: status === "correct" && i === round.answerIndex ? "#4CD137" : "white",
                cursor: 'pointer'
              }}
            >
              {opt}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '30px' }}>
          {status === "correct" && (
            <button onClick={loadRound} style={{ padding: '15px 30px', backgroundColor: '#487EB0', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>
              Next Word! ➔
            </button>
          )}
        </div>
      </div>
    </main>
  );
}