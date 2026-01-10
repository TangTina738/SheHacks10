import { useEffect, useState } from "react";

export default function Lesson1() {
  const [round, setRound] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Kids Game States
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
        body: JSON.stringify({ topic: "animals" }), 
      });
      const data = await res.json();
      setRound(data);
    } catch (err) {
      setRound({ error: "Try again later!" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadRound(); }, []);

  const handlePick = (i) => {
    if (status === "correct") return;

    if (i === round.answerIndex) {
      setStatus("correct");
      setScore(s => s + 10);
      setStreak(st => st + 1);
    } else {
      setStatus("wrong");
      setStreak(0); // Reset streak on mistake
    }
  };

  if (loading) return <div style={styles.center}>✨ Magic is happening... ✨</div>;

  return (
    <main style={styles.container}>
      {/* HUD (Heads Up Display) for Kids */}
      <header style={styles.hud}>
        <div style={styles.statBox}>⭐ Points: {score}</div>
        <div style={styles.statBox}>🔥 Streak: {streak}</div>
      </header>

      <div style={styles.gameCard}>
        <h2 style={styles.frenchWord}>{round?.challengeText}</h2>
        
        <div style={styles.grid}>
          {round?.options.map((opt, i) => (
            <button 
              key={i} 
              onClick={() => handlePick(i)}
              style={{
                ...styles.choiceBtn,
                backgroundColor: status === "correct" && i === round.answerIndex ? "#4CD137" : "white",
                transform: status === "wrong" && i !== round.answerIndex ? "scale(0.95)" : "scale(1)"
              }}
            >
              {opt}
            </button>
          ))}
        </div>

        <div style={styles.footer}>
          {!showHint && status !== "correct" && (
            <button onClick={() => setShowHint(true)} style={styles.hintBtn}>💡 Need a hint?</button>
          )}
          {showHint && <p style={styles.hintText}>{round?.hint}</p>}
          
          {status === "correct" && (
            <button onClick={loadRound} style={styles.nextBtn}>Play Next! ➔</button>
          )}
        </div>
      </div>
    </main>
  );
}

const styles = {
  container: { backgroundColor: '#F0F2F5', minHeight: '100vh', padding: '20px', fontFamily: '"Comic Sans MS", cursive, sans-serif' },
  hud: { display: 'flex', justifyContent: 'space-around', marginBottom: '30px' },
  statBox: { backgroundColor: '#FF9F43', color: 'white', padding: '10px 20px', borderRadius: '15px', fontWeight: 'bold', fontSize: '20px', boxShadow: '0 4px 0 #E67E22' },
  gameCard: { backgroundColor: 'white', maxWidth: '500px', margin: '0 auto', borderRadius: '30px', padding: '40px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' },
  frenchWord: { fontSize: '48px', color: '#2F3640', margin: '0 0 40px 0' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  choiceBtn: { padding: '20px', fontSize: '22px', border: '3px solid #DCDDE1', borderRadius: '20px', cursor: 'pointer', transition: '0.2s', fontWeight: 'bold', color: '#353B48' },
  nextBtn: { marginTop: '30px', padding: '15px 40px', fontSize: '24px', backgroundColor: '#487EB0', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', boxShadow: '0 5px 0 #273C75' },
  hintBtn: { background: 'none', border: 'none', color: '#7F8C8D', cursor: 'pointer', textDecoration: 'underline' },
  hintText: { color: '#E67E22', fontWeight: 'bold', marginTop: '10px' },
  center: { display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', fontSize: '30px', color: '#487EB0' }
};