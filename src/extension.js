import 'script-loader!fpsmeter';
import FPSMeter from 'fpsmeter';
import { msToHumanReadable } from './datetime';

const meterContainer = document.createElement('div');
const statsContainer = document.createElement('div');
const statsSkippedFramesContainer = document.createElement('div');
const statsLastSkippedFrameContainer = document.createElement('div');

const initLayout = () => {
  const meterStyles = document.createElement('style');

  meterStyles.type = 'text/css';
  meterStyles.innerHTML = `
  .wight-loop-health-check {
    position: absolute;
    right: 200px;
    top: 6px;

    width: 110px;
  }

  .wight-loop-health-check__stats {
    position: absolute;
    top: 42px;
    left: 0;

    padding: 6px;

    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 11px;
    line-height: 1.8;
    color: #fff;

    white-space: nowrap;
  }`;

  document.head.appendChild(meterStyles);

  meterContainer.className = 'wight-loop-health-check';
  document.body.appendChild(meterContainer);

  statsContainer.className = 'wight-loop-health-check__stats';
  meterContainer.appendChild(statsContainer);

  statsContainer.appendChild(statsSkippedFramesContainer);
  statsContainer.appendChild(statsLastSkippedFrameContainer);

  statsSkippedFramesContainer.textContent = 'Skipped: 0 frames';
  statsLastSkippedFrameContainer.textContent = 'Last: -';
};

let skippedFrames = 0;
let isGameRunning = false;
let lastSkipMs = 0;

const updateFramesRate = () => {
  statsSkippedFramesContainer.textContent = `Skipped: ${skippedFrames} frames`;
};

const updateLastSkipText = () => {
  if (lastSkipMs === 0) {
    return;
  }

  const now = Date.now();

  statsLastSkippedFrameContainer.textContent = `Last: ${msToHumanReadable(now - lastSkipMs)} ago`;
};

/**
 * StarMash listeners.
 */
SWAM.on('gamePrep', () => {
  isGameRunning = true;
});

SWAM.on('gameWipe', () => {
  isGameRunning = false;
});

SWAM.on('gameLoaded', () => {
  initLayout();

  const updateTimeOriginal = Tools.updateTime;
  const fpsmeter = new FPSMeter(meterContainer, {
    left: 'auto',
    top: '0',
    right: '0',

    graph: 1,
    history: 20,

    decimals: 0,
    maxFps: 60,
    heat: 58,
  });

  Tools.updateTime = (deltaTime) => {
    updateTimeOriginal(deltaTime);

    fpsmeter.tick();

    if (isGameRunning && deltaTime >= 2) {
      skippedFrames += 1;
      lastSkipMs = Date.now();

      updateFramesRate();
      updateLastSkipText();
    }
  };

  setInterval(updateLastSkipText, 1000);
});

SWAM.registerExtension({
  name: 'Game loop health check',
  id: 'wight.loop-health-check',
  description: '',
  author: 'wight',
  version: '1.0.0',
});
