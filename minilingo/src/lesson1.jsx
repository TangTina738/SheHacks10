import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import Tree3 from "./assets/Tree3.png";

export default function Lesson1() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTopic = location.state?.topic || "animals";

  // Game Data States
  const [queue, setQueue] = useState([]); 
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Student Progress States
  const [score, setScore] = useState(0);
  const [backBtnPressed, setBackBtnPressed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);

  async function fetchWords() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://127.0.0.1:5000/api/match-round", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: currentTopic }), 
      });
      
      if (!res.ok) throw new Error("Server is busy");
      const data = await res.json();
      setQueue(data); // Fill the queue with 5 words at once
    } catch (err) {
      setError("The Magic is recharging! ✨ Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchWords(); }, [currentTopic]);

  const currentRound = queue[0]; // Always play the first word in the queue

  const handlePick = (i) => {
    if (status === "correct" || !currentRound) return;

    if (i === currentRound.answerIndex) {
      setStatus("correct");
      setScore(s => s + 10);
      setStreak(st => st + 1);
    } else {
      setStatus("wrong");
      setStreak(0);
    }
  };

  const handleNext = () => {
    setStatus(null);
    setShowHint(false);
    
    if (queue.length > 1) {
      // Move to the next word locally 
      setQueue(prev => prev.slice(1));
    } else {
      // If queue is empty, get 5 more from the server
      fetchWords();
    }
  };

  if (loading && queue.length === 0) return (
    <div style={styles.fullCenter}><h2>✨ Getting ready to play… ✨</h2></div>
  );

  if (error) return (
    <div style={styles.fullCenter}><p>{error}</p><button onClick={fetchWords}>Try Again</button></div>
  );

  return (
    <main style={styles.container}>

      {/* Back Button Functionality: Anisa */}
      <div style={{ position: "absolute", top: "95px", left: "50px"}}>
        <img
          src={Tree3}
          alt="Back"
          onClick={() => {
            setBackBtnPressed(true);
            setTimeout(() => {
              navigate("/select-game");
            }, 150);
          }}
          style={{ width: "70px", height: "70px", cursor: "pointer", 
            transition: "transform 0.15s ease"
           }}
           onMouseEnter={(e) => e.target.style.transform = "translateY(-5px)"}
           onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
          onMouseDown={(e) => e.target.style.transform = "translateY(2px) scale(0.95)"}
          onMouseUp={(e) => e.target.style.transform = "translateY(-5px)"}
        />
      </div>

      {/**I would style this here later for positioning - Anisa*/}
      <div style={styles.hud}>
        <div style={styles.statBox}>⭐ {score}</div>
        <div style={styles.statBox}>🔥 {streak}</div>
      </div>


      {/*When user chooses the wrong answer */} 
      <div style={styles.gameCard}>
        <h2 style={styles.frenchWord}>{currentRound?.challengeText}</h2>
        <div style={styles.grid}>
          {currentRound?.options.map((opt, i) => (
            <button key={i} onClick={() => handlePick(i)}
              style={{ ...styles.choiceBtn,
                backgroundColor: 
                status === "correct" && i === currentRound.answerIndex
                ? "#3ab627" 
                : status === "wrong" && i === currentRound.answerIndex
                ? "#4CD137" 
                : status === "wrong" && i !== currentRound.answerIndex
                ? "#E74C3C"
                : "white",   // this is deeefault colour
                
              }}>
              {opt}
            </button>
          ))}
        </div>

        <div style={styles.footer}>
          {!showHint && status !== "correct" && (
            <button onClick={() => setShowHint(true)} style={styles.hintBtn}>💡 Hint?</button>
          )}
          {showHint && <p style={styles.hintText}>{currentRound?.hint}</p>}
          
          {status !== null && (
            <button onClick={handleNext} style={styles.nextBtn}>Next Word! ➔</button>
          )}
        </div>
      </div>
    </main>
  );
}

const styles = {
  container: { backgroundColor: '#87D8D2', minHeight: '100vh', padding: '20px' },
  fullCenter: { backgroundColor: '#87D8D2', display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center', color: '#2F3640', fontFamily: 'var(--font-display)',},
  hud: { display: 'flex', justifyContent: 'space-around', marginBottom: '20px' },
  statBox: { background: '#FF9F43', color: 'white', padding: '10px 25px', borderRadius: '20px', fontWeight: 'bold', fontSize: '24px' },
  gameCard: { backgroundColor: 'white', maxWidth: '500px', margin: '0 auto', borderRadius: '30px', padding: '40px', textAlign: 'center' },
  frenchWord: { fontSize: '56px', color: '#2F3640', marginBottom: '40px', fontFamily: '"Sigmar One", cursive' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  choiceBtn: { padding: '20px', fontSize: '20px', borderRadius: '20px', border: '3px solid #f0f0f0', cursor: 'pointer', fontWeight: 'bold' },
  nextBtn: { marginTop: '30px', padding: '15px 40px', fontSize: '22px', backgroundColor: '#487EB0', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer' },
  hintBtn: { background: 'none', border: 'none', color: '#7F8C8D', cursor: 'pointer', marginTop: '20px' },
  hintText: { color: '#E67E22', fontWeight: 'bold', marginTop: '15px' }
};