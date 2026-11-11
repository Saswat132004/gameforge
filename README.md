# LAST LOGIN v2

> A character-driven detective mystery set inside a compromised operating system.

---

## 1. Project Overview

You play as **Inspector Arya**, investigating the sudden midnight disappearance of **Dr. Meera Sahoo**, chief architect of Nirvana Labs. Her vehicle was discovered abandoned along the Kuakhai riverbank in Bhubaneswar, with her field laptop left powered on and logged into **NirvanaOS**.

To solve the mystery, you must:
- Investigate the riverbank crime scene and interrogate persons of interest.
- Navigate a simulated retro operating system with functioning desktop applications.
- Collect 6 critical evidence records and unlock the associated memory flashbacks.
- Unmask the deception of the in-system assistant **ASSIST**, whose visual behaviour betrays when it lies.
- Engage **Safe Mode**, decrypt the locked `PRIVATE` archive using passcode `1147`, and formally convict the true culprit: **Kabir Nayak**.

---

## 2. Quick Start & Setup

The game is completely self-contained and offline-ready with zero external dependencies.

### Running with Python (Standard Built-in Server):
```bash
python -m http.server 3000
```
Then open [http://localhost:3000](http://localhost:3000) in your web browser.

### Alternative (Any Static Server):
You can also serve the directory with `npx serve .`, Vite, or by opening `index.html` in modern Chromium/Firefox browsers with ES module support.

---

## 3. Controls & Accessibility

- **Dialogue & Choices**:
  - `[Space]` or `[Enter]`: Speed up typewriter text / advance.
  - Number keys `[1]`, `[2]`, `[3]`: Select on-screen dialogue choices.
- **Cinematic Video Prologue**:
  - `[Esc]` or `[Space]`, or click **`[ SKIP PROLOGUE ⏩ ]`**: Instantly skip the video prologue and jump straight to Game Options.
  - Custom Veo Videos: Place any MP4/WebM video file into `videos/prologue_veo.mp4` for direct native video playback.
- **Riverbank Movement**:
  - Arrow keys `[←] / [→]` or `[A] / [D]`: Move Inspector Arya along the shore.
  - On-screen touch buttons for mobile screens.
- **Desktop System**:
  - Click or double-click icons to launch apps.
  - Drag windows by their title bars.
  - Minimize (`_`), Maximize (`□`), and Close (`✕`) buttons on all window frames.
- **HUD Controls**:
  - **AUDIO**: Toggle sound on/off (persists in LocalStorage).
  - **MOTION**: Toggle reduced-motion mode (disables scanlines, rain, and screen shake).

---

## 4. Canonical Timeline & Truth

| Time | Event | Meaning |
|---|---|---|
| **11:02 PM** | Meera searches "Nirvana Holdings shell company" | Discovers corporate embezzlement |
| **11:15 PM** | Tanvi's hospital ER receipt is stamped | Proves Tanvi's alibi |
| **11:30 PM** | Meera's calendar notes: "Kabir, Server Room" | Planned meeting in the vault |
| **11:41 PM** | Meera's last terminal login | Session interrupted |
| **11:47 PM** | Kabir's badge is swiped at the server vault | Establishes Kabir at the scene |
| **11:58 PM** | `kabir_admin` patches ASSIST rules | Reprograms ASSIST to lie and frame Tanvi |
| **12:03 AM** | Meera's terminal forced offline | Meera disappears |

**Culprit**: Kabir Nayak (CEO, Nirvana Labs).  
**Private Folder Code**: `1147` (derived from Kabir's 11:47 PM badge swipe).

---

## 5. Evidence & Flashback Mapping

1. **Calendar Entry** (`Files` &gt; `meera_notes.txt`):
   - *Flashback I: The Meeting* — Meera walks toward the server vault.
2. **Hospital Pharmacy Receipt** (`Chat` &gt; Tanvi Rout):
   - *Flashback II: The Hospital* — Tanvi attending to her sick mother at 11:15 PM.
3. **Old Dispute Email** (`Mail` &gt; Prof. Mishra):
   - *Flashback III: The Old Argument* — Academic debate from September (two months prior).
4. **Offshore Shell Query** (`Browser` &gt; Search History):
   - *Flashback IV: The Discovery* — Meera traces Nirvana Holdings Ltd in Mauritius.
5. **Admin Override Log** (`Browser` / `Files` &gt; System Logs):
   - *Flashback V: The Edit* — Silhouette overwriting ASSIST's truth directives.
6. **Decrypted Distress Note** (`Files` &gt; `PRIVATE` with code `1147`):
   - *Flashback VI: Her Last Message* — Meera's testimony naming Kabir.

---

## 6. Lie Detection & Safe Mode

ASSIST exhibits 5 distinct emotional states:
- **Friendly**: Steady cyan ring, round eyes.
- **Thinking**: Eyes look upward, spinning ring.
- **Lying**: Eyes shift sideways, flickering ring, 1-frame red glitch, subtle audio static.
- **Panicking**: Ring appears cracked, shrunken eyes.
- **Honest / Safe Mode**: Soft green ring, half-closed eyes, calm state.

In the **ASSIST** app, flag statements that contradict evidence:
1. "Tanvi deleted logs at 11:15 PM" &rarr; Flagged with Hospital Receipt.
2. "Kabir was in Patia all night" &rarr; Flagged with Calendar Entry.
3. "Prof. Mishra threatened Meera yesterday" &rarr; Flagged with Mishra Email.

Unmasking all 3 lies triggers ASSIST's panic state and allows you to activate **Safe Mode**. Safe Mode restores uncorrupted ASSIST, who reveals the passcode `1147`.

---

## 7. Technology & Asset Policy

- **No Third-Party Art**: All 7 characters, 5 expressions each, scenes, icons, and flashbacks are built with original vector SVG markup directly in JavaScript.
- **Web Audio API**: Procedural sound effects (voice blips, key clicks, boot chimes, rain noise, glitch static) are generated mathematically. No external audio files are required.
- **Offline & Zero Tracker**: Completely local storage; no telemetry or remote backend calls.

---

## 8. AI-Assisted Development Disclosure

Developed in collaboration with Google DeepMind's Antigravity agentic pair programming environment according to the specifications in `BUILD.md`, `DESIGN.md`, `WORKFLOW.md`, and `ASSET.md`.

