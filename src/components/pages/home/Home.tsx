import { useState } from 'react';
import { main, intro, content, fadeOut, slideUp } from './home.css';

type State = 'intro' | 'content';

export const Home = () => {
  const [state, setState] = useState<State>('intro');

  return (
    <main className={main}>
      <div
        className={intro.wrapper}
        style={{
          animationName: state === 'content' ? fadeOut : undefined,
          animationDuration: '1s',
          animationFillMode: 'forwards',
        }}
      >
        <div
          className={intro.container} style={{ opacity: 0 }}
        >
          <img
            src="/logo.png"
            width="256px"
            height="256px"
            alt="CatLord Logo"
          />
          <h1 className={intro.h1}>
            Welcome to <span className={intro.accent}>CatLord</span>
          </h1>
          <button
            className={intro.continue}
            onClick={() => setState('content')}
          >
            CONTINUE
          </button>
        </div>
      </div>
      <div
        className={content.wrapper}
        style={{
          animationName: state === 'content' ? slideUp : undefined,
          animationDuration: '1s',
          animationFillMode: 'forwards',
          display: state === 'content' ? 'block' : 'none',
          transform: 'translateY(100dvh)',
          animationDelay: '0.6s',
        }}
      >
        <h1>MAINTENANCE</h1>
        <p>The CatLord website is down for maintenance. Please check back soon.</p>
      </div>
    </main>
  );
};
