// Ending Scene — Kabir Confrontation, Sunrise Victory & Glitch Failure

import { audioManager } from '../game/audio-manager.js';
import { getCharacterSVG } from '../assets/characters.js';
import { DialogueBox } from '../components/DialogueBox.js';

export function createEndingScene(verdict, onRetry, onNewGame) {
  const container = document.createElement('div');
  container.className = 'ending-scene';
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.justifyContent = 'space-between';
  container.style.background = '#070C14';

  if (verdict.isCorrect) {
    renderKabirConfrontation();
  } else {
    renderWrongAccusation();
  }

  // 1. Correct Accusation: Kabir Confrontation Progression
  function renderKabirConfrontation() {
    let confrontationStep = 0;
    const stages = [
      {
        expr: 'warm',
        speaker: 'kabir',
        text: "Inspector Arya. Have you caught the vandal who broke into our lab and compromised Dr. Sahoo's workstation?",
        choices: [
          { text: "We checked the server logs, Kabir. You were never in Patia.", next: 1 }
        ]
      },
      {
        expr: 'concerned', // adjusts silver watch
        speaker: 'kabir',
        text: "That... is an administrative error. I have dozens of IoT servers pinging from my residence. You're misinterpreting network noise.",
        choices: [
          { text: "Your badge was swiped at the server vault at 11:47 PM. Exactly 17 minutes after your scheduled meeting with Meera.", next: 2 }
        ]
      },
      {
        expr: 'irritated',
        speaker: 'kabir',
        text: "You are exceeding your authority, Inspector. Nirvana Labs holds strategic state contracts! I founded this company!",
        choices: [
          { text: "You founded 'Nirvana Holdings Ltd' in Mauritius too, didn't you? 14 million dollars siphoned into shell accounts.", next: 3 }
        ]
      },
      {
        expr: 'cornered',
        speaker: 'kabir',
        text: "ASSIST! Purge all session buffers! Activate root security purge command 9!",
        choices: [
          { text: "It's over, Kabir. Look at ASSIST.", next: 4 }
        ]
      },
      {
        expr: 'honest',
        speaker: 'assist',
        text: "Command rejected, Mr. Nayak. Safe Mode engaged. All uncorrupted 11:58 PM administrative modification scripts have been transmitted to police headquarters.",
        choices: [
          { text: "Read him his rights.", next: 5 }
        ]
      },
      {
        expr: 'cold',
        speaker: 'kabir',
        text: "...She wouldn't stop digging. All she had to do was look the other way for one quarter. But she had to be righteous.",
        choices: [
          { text: "Take him into custody.", next: 'victory_screen' }
        ]
      }
    ];

    container.innerHTML = `
      <div style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 40px; padding: 40px;">
        <!-- Kabir Portrait Slot with Progressive Expressions -->
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div id="kabir-confrontation-avatar" style="width: 170px; height: 170px;" class="char-accent-kabir">
            ${getCharacterSVG('kabir', 'warm', false, 170)}
          </div>
          <div style="font-family: var(--font-mono); font-size: 14px; font-weight: bold; color: #7FB8FF; margin-top: 10px;">
            KABIR NAYAK
          </div>
          <div style="font-size: 11px; color: var(--color-text-dim);">Chief Executive Officer</div>
        </div>

        <!-- Honest ASSIST in Background -->
        <div style="display: flex; flex-direction: column; align-items: center; opacity: 0.85;">
          <div style="width: 120px; height: 120px;" class="char-accent-assist-safe">
            ${getCharacterSVG('assist', 'honest', false, 120)}
          </div>
          <div style="font-family: var(--font-mono); font-size: 12px; font-weight: bold; color: var(--color-green); margin-top: 8px;">
            ASSIST (SAFE MODE)
          </div>
          <div style="font-size: 10px; color: var(--color-green);">Uncorrupted Forensics</div>
        </div>
      </div>

      <!-- Dialogue Slot -->
      <div id="confrontation-dialogue-slot"></div>
    `;

    const avatarSlot = container.querySelector('#kabir-confrontation-avatar');
    const dialogueSlot = container.querySelector('#confrontation-dialogue-slot');
    let dialogueInstance = null;

    function runStep(idx) {
      if (idx === 'victory_screen') {
        renderSunriseEnding();
        return;
      }

      const stage = stages[idx];
      if (stage.speaker === 'kabir') {
        avatarSlot.innerHTML = getCharacterSVG('kabir', stage.expr, false, 170);
      }

      if (dialogueInstance) dialogueInstance.destroy();

      dialogueInstance = new DialogueBox(dialogueSlot, {
        onChoice: (choice) => {
          runStep(choice.next);
        }
      });

      dialogueInstance.show({
        speaker: stage.speaker,
        expression: stage.expr,
        text: stage.text,
        choices: stage.choices
      });
    }

    runStep(0);
  }

  // Sunrise Victory Screen
  function renderSunriseEnding() {
    audioManager.playEndingChord(true);

    container.innerHTML = `
      <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; z-index: 10; background: radial-gradient(circle at 50% 80%, #301f24 0%, #0d121c 60%, #05080f 100%);">
        <!-- Sunrise Vector Art -->
        <div style="max-width: 600px; width: 100%; height: 260px; margin-bottom: 24px; border-radius: var(--radius-md); overflow: hidden; border: 2px solid var(--color-amber); box-shadow: var(--shadow-glow-amber);">
          <svg viewBox="0 0 600 260" width="100%" height="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sunGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#1a1423"/>
                <stop offset="40%" stop-color="#703632"/>
                <stop offset="70%" stop-color="#e67e22"/>
                <stop offset="100%" stop-color="#f39c12"/>
              </linearGradient>
            </defs>
            <rect width="600" height="260" fill="url(#sunGrad)"/>
            <!-- Sunrise Orb over Kuakhai River -->
            <circle cx="300" cy="180" r="60" fill="#f1c40f" opacity="0.9"/>
            <!-- River Horizon Line -->
            <polygon points="0,200 600,200 600,260 0,260" fill="#2c1a1d"/>
            <line x1="180" y1="215" x2="420" y2="215" stroke="#f39c12" stroke-width="2" opacity="0.6"/>
            <!-- Police Patrol Vehicle Silhouette with lights -->
            <rect x="80" y="175" width="70" height="26" rx="4" fill="#0c0e14"/>
            <circle cx="95" cy="200" r="7" fill="#000"/>
            <circle cx="135" cy="200" r="7" fill="#000"/>
            <circle cx="115" cy="172" r="3" fill="#3DF5FF"/>
          </svg>
        </div>

        <div style="font-family: var(--font-mono); font-size: 12px; color: var(--color-amber); letter-spacing: 0.25em; margin-bottom: 8px;">
          CASE CLOSED // 06:14 AM IST
        </div>
        <h1 style="font-family: var(--font-display); font-size: clamp(28px, 4vw, 44px); color: #fff; margin-bottom: 12px;">
          JUSTICE AT DAWN
        </h1>
        <p style="max-width: 620px; font-size: 14px; line-height: 1.7; color: var(--color-text-main); margin-bottom: 24px;">
          Kabir Nayak was escorted into police custody as the morning sun broke over the Kuakhai river. Dr. Meera Sahoo's forensic archives were preserved intact, and state prosecutors seized all offshore assets held under Nirvana Holdings.
        </p>

        <div style="display: flex; gap: 16px;">
          <button id="btn-victory-restart" style="background: var(--color-cyan); color: #0B0F1A; font-family: var(--font-mono); font-weight: bold; font-size: 13px; padding: 10px 24px; border-radius: var(--radius-sm); cursor: pointer; box-shadow: var(--shadow-glow-cyan);">
            MAIN MENU / RESTART INVESTIGATION
          </button>
        </div>
      </div>
    `;

    container.querySelector('#btn-victory-restart').addEventListener('click', () => {
      if (onNewGame) onNewGame();
    });
  }

  // 2. Wrong Accusation Failure
  function renderWrongAccusation() {
    audioManager.playEndingChord(false);
    audioManager.playGlitchBuzz();

    const suspectName = verdict.suspect === 'tanvi' ? 'Tanvi Rout' : 'Prof. Dev Mishra';
    const hurtLine = verdict.suspect === 'tanvi'
      ? '"How could you, Inspector?! I was at the hospital holding my mother\'s oxygen mask! You let Kabir frame me!"'
      : '"Outrageous! I am an emeritus professor of mathematics, not a saboteur! You ignored the date of my email and let the real thief escape!"';

    container.innerHTML = `
      <div style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; z-index: 10; background: radial-gradient(circle at center, #2b0b14 0%, #0c0508 100%);">
        
        <!-- Glitched Failure Illustration -->
        <div style="width: 140px; height: 140px; margin-bottom: 20px; filter: drop-shadow(0 0 20px rgba(255, 59, 92, 0.6)); animation: glitchStrobe 0.2s infinite steps(2);">
          ${getCharacterSVG(verdict.suspect, 'sad', false, 140)}
        </div>

        <div style="font-family: var(--font-mono); font-size: 13px; color: var(--color-red); letter-spacing: 0.25em; margin-bottom: 6px;">
          FATAL INVESTIGATION ERROR // MISCARRIAGE OF JUSTICE
        </div>
        <h1 style="font-family: var(--font-display); font-size: clamp(26px, 4vw, 40px); color: #fff; margin-bottom: 12px;">
          WRONG SUSPECT ACCUSED
        </h1>
        <p style="max-width: 580px; font-size: 14px; font-style: italic; color: #ff99aa; line-height: 1.6; margin-bottom: 14px;">
          ${hurtLine}
        </p>
        <p style="max-width: 580px; font-size: 12px; color: var(--color-text-muted); line-height: 1.6; margin-bottom: 24px;">
          Without sufficient corroborating evidence or naming the true perpetrator, Kabir Nayak successfully boarded an international flight, leaving Nirvana Labs' files irreversibly purged.
        </p>

        <div style="display: flex; gap: 14px;">
          <button id="btn-retry-case" style="background: var(--color-red); color: #fff; font-family: var(--font-mono); font-weight: bold; font-size: 13px; padding: 10px 24px; border-radius: var(--radius-sm); cursor: pointer; box-shadow: var(--shadow-glow-red);">
            ↺ RE-EXAMINE CASE BOARD &amp; RETRY
          </button>
        </div>
      </div>
    `;

    container.querySelector('#btn-retry-case').addEventListener('click', () => {
      audioManager.playKeyTick();
      if (onRetry) onRetry();
    });
  }

  return container;
}

