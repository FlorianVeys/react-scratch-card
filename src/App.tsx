import { css, StyleSheet } from 'aphrodite';
import React, { useRef } from 'react';
import { ScratchCard } from './scratchCard/scratchCard';

const styles = StyleSheet.create({
  app: {
    width: '600px',
    height: '600px',
  },
  test: {
    // borderRadius: 200,
  },
});

function App() {
  const containerRef = useRef(null);
  return (
    <div className={css(styles.app, styles.test)} ref={containerRef}>
      <ScratchCard
        parentRef={containerRef}
        scratchConfig={{ scratchRadius: 5 }}
      >
        <p>TOTO</p>
      </ScratchCard>
    </div>
  );
}

export default App;
