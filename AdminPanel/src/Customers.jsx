import React, { useEffect, useRef, useState } from 'react';

function ScratchCoupon({ theme }) {
  const canvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [randomPrize, setRandomPrize] = useState(null);
  const prizes = [
    { message: "🎉 Congratulations! You won $100!", image: "src/code.jpg" },
    { message: "🎁 You won a Free Vacation!", image: "src/code1.jpg" },
    { message: "💰 You got a 50% Discount!", image: "src/code2.jpg" },
    { message: "😎 Sorry, better luck next time!", image: "src/next.jpg" }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Fill the canvas with metallic silver overlay for scratch-off
    ctx.fillStyle = "#C0C0C0"; // Metallic silver color #C0C0C0
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const scratch = (e) => {
      if (!isScratching || isRevealed) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2, false);
      ctx.fill();
    };

    const checkIfRevealed = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let pixels = imageData.data;
      let scratchedPixels = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
          scratchedPixels++;
        }
      }

      if (scratchedPixels / (pixels.length / 4) > 0.5 && !isRevealed) {
        revealPrize();
      }
    };

    const revealPrize = () => {
      const prize = prizes[Math.floor(Math.random() * prizes.length)];
      setIsRevealed(true);
      setRandomPrize(prize);
    };

    // Event listeners for scratch effect
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', () => {
      setIsScratching(false);
      checkIfRevealed();
    });

    return () => {
      canvas.removeEventListener('mousemove', scratch);
    };
  }, [isScratching, isRevealed, prizes]);

  return (
    <div id="container">
      <h2>Scratch the Coupon to Reveal Your Prize!</h2>
      <div className="coupon" onMouseDown={() => setIsScratching(true)}>
        <canvas ref={canvasRef} width="300" height="200" />
        {isRevealed && randomPrize && (
          <div className="result">
            <div className={`message show`}>{randomPrize.message}</div>
            <div className="prize-image">
              <img src={randomPrize.image} alt="Prize" />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .coupon {
          position: relative;
          width: 300px;
          height: 200px;
          background-color: black;
          border-radius: 10px;
          overflow: hidden;
          margin-top: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .result {
          position: absolute;
          text-align: center;
        }
        .message {
          font-size: 1.2em;
          color: ${theme === 'light' ? '#1E90FF' : '#FF8C00'};  
          
          margin-bottom: 10px;
          opacity: 0;
          transition: opacity 1s ease-in-out, transform 1s ease-in-out;
        }
        .message.show {
          opacity: 1;
          transform: translateY(-10px);
        }
        .prize-image img {
          animation: bounce 2s infinite;
          position: relative;
          width: 295px;
          height: 130px;
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}

function Customers({ theme }) {
  return (
    <div className={`customers-page ${theme}`}>
      <div className="customer-data">
        <h2>Customer Information</h2>
        <p><strong>Name:</strong> ANETTE FERNANDES</p>
        <p><strong>Phone:</strong> 123-456-7890</p>
        <p><strong>Gender:</strong> Female</p>
        <p><strong>Home-Address:</strong> 123 Main St, Springfield, USA</p>
        <p><strong>Work-Address:</strong> 123 Main St, Springfield, USA</p>
      </div>
      <center>
        <div>
          <img className="about" src="src/R.jpeg" alt="Customer Image" width="50%" />
        </div>
      </center>

      <style jsx>{`
        .customers-page.light {
          background-color: #f0f0f0;
          color: #333;
        }
        .customers-page.dark {
          background-color: #1f1f1f;
          color: white;
        }
        .customer-data {
          background-color: ${theme === 'light' ? '#fff' : '#2f2f2f'};
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #ccc;
          margin-bottom: 10px;
          width: fit-content;
        }
      `}</style>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`App ${theme}`}>
      <button onClick={toggleTheme}>
        Toggle to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <ScratchCoupon theme={theme} />
      <Customers theme={theme} />

      <style jsx>{`
        .App.light {
          background-color: #e0e0e0;
          color: #333;
        }
        .App.dark {
          background-color: #1a1a1a;
          color: white;
        }
        button {
          margin: 20px;
          padding: 10px;
          background-color: ${theme === 'light' ? '#007bff' : '#0056b3'};
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: ${theme === 'light' ? '#0056b3' : '#007bff'};
        }
      `}</style>
    </div>
  );
}

export default App;
