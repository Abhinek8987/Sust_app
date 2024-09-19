import React, { useEffect, useRef, useState } from 'react';

function ScratchCoupon() {
  const canvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [randomPrize, setRandomPrize] = useState('');

  const prizes = [
    "🎉 Congratulations! You won $100!",
    "🎁 You won a Free Vacation!",
    "💰 You got a 50% Discount!",
    "😎 Sorry, better luck next time!"
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Fill the canvas with a grey overlay
    ctx.fillStyle = "#aaa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add scratch-off effect
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
        setIsRevealed(true);
        revealPrize();  // Reveal a random prize
      }
    };

    const revealPrize = () => {
      const prize = prizes[Math.floor(Math.random() * prizes.length)];
      setRandomPrize(prize);
    };

    // Add event listeners
    const canvasElement = canvasRef.current;
    canvasElement.addEventListener('mousemove', scratch);
    canvasElement.addEventListener('mouseup', () => {
      setIsScratching(false);
      checkIfRevealed();
    });

    return () => {
      canvasElement.removeEventListener('mousemove', scratch);
    };
  }, [isScratching, isRevealed, prizes]);

  return (
    <div id="container">
      <h2>Scratch the Coupon to Reveal Your Prize!</h2>
      <div className="coupon" onMouseDown={() => setIsScratching(true)}>
        <canvas ref={canvasRef} width="300" height="200" />
      </div>
      <div className={`message ${isRevealed ? 'show' : ''} sparkle`}>
        {isRevealed ? randomPrize : ''}
      </div>

      <style jsx>{`
        .coupon {
          position: relative;
          width: 300px;
          height: 200px;
          background-color: #d3d3d3;
          border-radius: 10px;
          overflow: hidden;
          margin-top: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .message {
          display: none;
          font-size: 1.5em;
          color:D4AF37;
          margin-top: 20px;
          opacity: 0;
          transition: opacity 1s ease-in-out, transform 1s ease-in-out;
        }

        .message.show {
          display: block;
          opacity: 1;
          transform: translateY(-10px);
        }

        .sparkle {
          animation: sparkleEffect 1.5s infinite;
        }

        @keyframes sparkleEffect {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}

function Customers() {
  return (
    <div className="customers-page">
      <div className="customer-data">
        <h2>Customer Information </h2>
        <p><strong>Name:</strong>ANETTE FERNANDES</p>
        <p><strong>Phone:</strong> 123-456-7890</p>
        <p><strong>Gender:</strong>Female</p>
        <p><strong>Home-Address:</strong> 123 Main St, Springfield, USA</p>
        <p><strong>Work-Address:</strong> 123 Main St, Springfield, USA</p>
      </div>
     

      <style jsx>{`
        .customers-page {
          padding: 20px;
          background-color: #1f1f1f;
          color: white;
          width: fit-content;
        }

        .customer-data {
          background-color: #2f2f2f;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #ccc;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <ScratchCoupon />
      <Customers />
    </div>
  );
}

export default App;
