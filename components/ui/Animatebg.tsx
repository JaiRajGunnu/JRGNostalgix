import React, { useEffect } from 'react';

function AnimateBg() {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        html {
          height: 100%;
          overflow: hidden;
        }
        body {
          position: relative;
          height: 100%;
          margin: 0;
          /*  Make the body's background transparent, so the pseudo-element shows */
          background: transparent;
          
        }

        body::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(#6084d7 25%, rgba(162, 206, 244, 0.17) 50%, rgba(162, 206, 244, 0.17) 50%, #6084d7 100%);
          filter: blur(5px); /* Apply blur to the background */
          z-index: -1; /* Place it behind the body's content */
        }

        .animate-bg-wrap {
          width: 100%;
          height: 100%;
          position: absolute;
          margin: 0 auto;
          perspective: 360px;
          perspective-origin: 50% 50%;
        }
        .animate-bg-top-plane {
          width: 200%;
          height: 130%;
          position: absolute;
          bottom: -30%;
          left: -50%;
          background-image: linear-gradient(rgba(162, 206, 244, 0.17) 2px, transparent 2px), linear-gradient(to left,rgba(162, 206, 244, 0.17) 2px, transparent 2px);
          background-size: 100px 100px, 100px 100px;
          background-position: -1px -1px, -1px -1px;
          transform: rotateX(85deg);
          animation: planeMoveTop 2s infinite linear;
        }
        .animate-bg-bottom-plane {
          width: 200%;
          height: 130%;
          position: absolute;
          bottom: -30%;
          left: -50%;
          background-image: linear-gradient(rgba(162, 206, 244, 0.17) 2px, transparent 2px), linear-gradient(to left, rgba(162, 206, 244, 0.17) 2px, transparent 2px);
          background-size: 100px 100px, 100px 100px;
          background-position: -1px -1px, -1px -1px;
          transform: rotateX(-85deg);
          top: -30%;
          animation: planeMoveBot 2s infinite linear;
        }
        @keyframes planeMoveTop {
  from {
    background-position: 0px 0px, 0px 0px; /* start at zero */
  }
  to {
    background-position: 0px 0px, 100px 0px; /* move only the second gradient*/
  }
}
@keyframes planeMoveBot {
  from {
    background-position: 0px 0px, 0px 0px;
  }
  to {
    background-position: 0px 0px, 100px 0px;
  }
}
        @media (max-height: 350px) {
          .animate-bg-wrap {
            perspective: calc(360px - 150px);
          }
        }
      `;
      document.head.appendChild(styleElement);

      return () => {
        document.head.removeChild(styleElement);
      };
    }
  }, []);

  return (
    <div className="animate-bg-wrap">
      <div className="animate-bg-top-plane"></div>
      <div className="animate-bg-bottom-plane"></div>
    </div>
  );
}

export default AnimateBg;