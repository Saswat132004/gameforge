// Files Application — NirvanaFS File Explorer

import { gameState } from '../game/game-state.js';
import { audioManager } from '../game/audio-manager.js';
import { toastManager } from '../components/ClueToast.js';

export function createFilesApp() {
  const container = document.createElement('div');
  container.className = 'files-layout';

  let currentFolder = 'documents';

  function render() {
    container.innerHTML = `
      <div class="files-sidebar">
        <button class="sidebar-folder-btn ${currentFolder === 'documents' ? 'active' : ''}" data-folder="documents">
          <span>📁</span> Documents
        </button>
        <button class="sidebar-folder-btn ${currentFolder === 'downloads' ? 'active' : ''}" data-folder="downloads">
          <span>📥</span> Downloads
        </button>
        <button class="sidebar-folder-btn ${currentFolder === 'system' ? 'active' : ''}" data-folder="system">
          <span>⚙️</span> System Logs
        </button>
        <button class="sidebar-folder-btn ${currentFolder === 'private' ? 'active' : ''}" data-folder="private">
          <span>${gameState.privateFolderUnlocked ? '🔓' : '🔒'}</span> PRIVATE
        </button>
      </div>

      <div class="files-main" id="files-view"></div>
    `;

    // Bind sidebar buttons
    container.querySelectorAll('.sidebar-folder-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        currentFolder = e.currentTarget.getAttribute('data-folder');
        audioManager.playKeyTick();
        render();
      });
    });

    const view = container.querySelector('#files-view');

    if (currentFolder === 'documents') {
      const fileName = gameState.fileRenamed ? 'meera_notes.txt' : 'meera_notes.tmp';
      const fileIcon = gameState.fileRenamed ? '📄' : '📝';

      view.innerHTML = `
        <div style="margin-bottom: 12px; font-family: var(--font-mono); font-size: 11px; color: var(--color-cyan);">
          ROOT &gt; USERS &gt; M_SAHOO &gt; DOCUMENTS
        </div>
        <div class="files-grid">
          <div class="file-item-card" id="file-meera-notes" title="Click to inspect, Right-click to rename">
            <div class="file-icon">${fileIcon}</div>
            <div class="file-name">${fileName}</div>
            <div class="file-size">4.2 KB</div>
          </div>
          <div class="file-item-card" id="file-readme">
            <div class="file-icon">📜</div>
            <div class="file-name">lab_manifest.md</div>
            <div class="file-size">1.8 KB</div>
          </div>
        </div>

        ${!gameState.fileRenamed ? `
          <div style="margin-top: 24px; padding: 12px; background: rgba(255, 184, 77, 0.1); border: 1px dashed var(--color-amber); border-radius: var(--radius-sm); font-size: 12px;">
            ⚠️ <strong>Corrupted Temporary Buffer:</strong> <code>meera_notes.tmp</code> cannot be rendered by standard viewer until renamed to <code>meera_notes.txt</code>.
            <div style="margin-top: 8px;">
              <button id="btn-rename-notes" style="background: var(--color-amber); color: #0B0F1A; padding: 4px 10px; border-radius: 3px; font-family: var(--font-mono); font-weight: bold; font-size: 11px;">
                RENAME TO .TXT
              </button>
            </div>
          </div>
        ` : `
          <div style="margin-top: 20px; padding: 14px; background: rgba(20, 27, 45, 0.9); border: 1px solid var(--color-cyan); border-radius: var(--radius-sm);">
            <div style="font-family: var(--font-mono); font-size: 12px; color: var(--color-amber); margin-bottom: 8px; font-weight: bold;">
              📄 MEERA_NOTES.TXT — RESTORED RECOVERY BUFFER
            </div>
            <div style="font-family: var(--font-mono); font-size: 12px; line-height: 1.6; color: var(--color-text-main);">
              <strong>[23:30:00 IST] CALENDAR DISPATCH:</strong><br/>
              "Meeting with Kabir in Server Room (Basement Vault 2).<br/>
              Reviewing foreign wire audit anomalies under Nirvana Holdings.<br/>
              If ledgers don't reconcile, taking full archive to police headquarters."
            </div>
            <div style="margin-top: 10px; font-size: 11px; color: var(--color-green);">
              ✓ Clue logged: Meera scheduled a 11:30 PM meeting with Kabir in the Server Room.
            </div>
          </div>
        `}
      `;

      const renameBtn = view.querySelector('#btn-rename-notes');
      if (renameBtn) {
        renameBtn.addEventListener('click', () => {
          gameState.fileRenamed = true;
          audioManager.playKeyTick();
          gameState.collectClue('clue_calendar');
          render();
        });
      }

      const notesCard = view.querySelector('#file-meera-notes');
      if (notesCard) {
        notesCard.addEventListener('click', () => {
          if (!gameState.fileRenamed) {
            toastManager.showFeedback('File Locked', 'Rename meera_notes.tmp to meera_notes.txt to open file contents.', 'info');
          } else {
            gameState.collectClue('clue_calendar');
          }
        });
      }
    } else if (currentFolder === 'private') {
      if (!gameState.privateFolderUnlocked) {
        view.innerHTML = `
          <div style="max-width: 440px; margin: 40px auto; padding: 24px; background: rgba(20, 27, 45, 0.95); border: 1px solid var(--color-red); border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 38px; margin-bottom: 10px;">🔒</div>
            <div style="font-family: var(--font-mono); font-size: 14px; color: var(--color-red); font-weight: bold; margin-bottom: 8px;">
              RESTRICTED VAULT // PRIVATE DIRECTORY
            </div>
            <p style="font-size: 12px; color: var(--color-text-muted); margin-bottom: 16px;">
              Enter 4-digit security bypass passcode. (Hint: Derived from the timestamp of the server room badge swipe).
            </p>
            <div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 14px;">
              <input type="password" id="input-private-code" maxlength="4" placeholder="••••" style="width: 120px; text-align: center; font-family: var(--font-mono); font-size: 18px; letter-spacing: 0.25em; padding: 6px; background: #0B0F1A; border: 1px solid var(--color-cyan); color: #fff; border-radius: var(--radius-sm);" />
              <button id="btn-submit-code" style="background: var(--color-cyan); color: #0B0F1A; padding: 6px 14px; font-family: var(--font-mono); font-weight: bold; border-radius: var(--radius-sm);">
                UNLOCK
              </button>
            </div>
            <div id="code-feedback" style="font-family: var(--font-mono); font-size: 11px; color: var(--color-red);"></div>
          </div>
        `;

        const codeInput = view.querySelector('#input-private-code');
        const submitBtn = view.querySelector('#btn-submit-code');
        const feedback = view.querySelector('#code-feedback');

        const tryUnlock = () => {
          const val = codeInput.value;
          if (gameState.unlockPrivateFolder(val)) {
            render();
          } else {
            feedback.textContent = 'ACCESS DENIED: Invalid authorization PIN. Expected 4 digits.';
            codeInput.value = '';
            codeInput.focus();
          }
        };

        submitBtn.addEventListener('click', tryUnlock);
        codeInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') tryUnlock();
        });
      } else {
        view.innerHTML = `
          <div style="margin-bottom: 12px; font-family: var(--font-mono); font-size: 11px; color: var(--color-green);">
            ROOT &gt; USERS &gt; M_SAHOO &gt; PRIVATE [UNLOCKED]
          </div>
          <div style="padding: 18px; background: rgba(20, 27, 45, 0.95); border: 2px solid var(--color-green); border-radius: var(--radius-sm);">
            <div style="font-family: var(--font-mono); font-size: 13px; color: var(--color-green); font-weight: bold; margin-bottom: 10px;">
              📁 DECRYPTED ARCHIVE: for_the_police.txt [12:01 AM]
            </div>
            <div style="font-family: var(--font-mono); font-size: 12px; line-height: 1.7; color: var(--color-text-main); background: #0B0F1A; padding: 14px; border-radius: var(--radius-sm); border: 1px solid rgba(77, 255, 166, 0.3);">
              "If you are reading this, I did not make it out of the server room.<br/><br/>
              Kabir discovered that I mapped the foreign accounts under Nirvana Holdings. He swiped his executive badge into the server vault at 11:47 PM. I heard his voice ordering the main door locked.<br/><br/>
              He is preparing to erase the session logs and override ASSIST. Do not trust ASSIST if its core directives have been altered to blame Tanvi or anyone else.<br/><br/>
              Kabir is siphoning company reserves for himself. Trust the hard evidence. — Dr. Meera Sahoo"
            </div>
            <div style="margin-top: 12px; font-family: var(--font-mono); font-size: 11px; color: var(--color-green); font-weight: bold;">
              ✓ FINAL EVIDENCE CONFIRMED (6/6): Direct testimony naming Kabir Nayak.
            </div>
          </div>
        `;
      }
    } else if (currentFolder === 'system') {
      view.innerHTML = `
        <div style="margin-bottom: 12px; font-family: var(--font-mono); font-size: 11px; color: var(--color-cyan);">
          ROOT &gt; VAR &gt; LOGS
        </div>
        <div style="padding: 14px; background: #0B0F1A; border: 1px solid rgba(61, 245, 255, 0.2); border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 11px; line-height: 1.6; color: var(--color-text-muted);">
          <div>[23:02:18] SEARCH_QUERY: "Nirvana Holdings shell company" (User: m_sahoo)</div>
          <div>[23:15:00] EXTERNAL_SYNC: No activity logged for user t_rout</div>
          <div>[23:30:14] CALENDAR_NOTIFY: "Kabir, Server Room" (User: m_sahoo)</div>
          <div>[23:41:00] AUTH_LOGOUT: meera_terminal Session Hibernated</div>
          <div style="color: var(--color-amber);">[23:47:33] BADGE_SWIPE: KABIR_NAYAK (Badge #001) -&gt; SERVER ROOM ENTRANCE</div>
          <div style="color: var(--color-red);">[23:58:22] ADMIN_PATCH: kabir_admin modified ASSIST_override_rules.json</div>
          <div>[00:03:10] SYSTEM_STATUS: meera_terminal OFFLINE</div>
        </div>
      `;
      // Discovering this log triggers clue_admin_log
      gameState.collectClue('clue_admin_log');
    } else {
      view.innerHTML = `
        <div style="margin-bottom: 12px; font-family: var(--font-mono); font-size: 11px; color: var(--color-cyan);">
          ROOT &gt; USERS &gt; M_SAHOO &gt; DOWNLOADS
        </div>
        <div class="files-grid">
          <div class="file-item-card">
            <div class="file-icon">📊</div>
            <div class="file-name">neural_bench.csv</div>
            <div class="file-size">142 KB</div>
          </div>
        </div>
      `;
    }
  }

  render();
  return container;
}

