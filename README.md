# Robot Simulator

Robot Simulator is a browser-based game for learning programming with visual blocks. Use Blockly to guide a robot through grid-based levels, then run or debug your program. The game interface and level instructions are in Dutch.

## Run the game

Requirements: Python 3 and a modern browser. An internet connection is needed because the page loads Blockly, Font Awesome, and the Roboto font from public CDNs.

From the repository root, start a local web server:

```sh
python3 -m http.server 8000 --directory App
```

Open [http://localhost:8000/robot.html](http://localhost:8000/robot.html). Stop the server with `Ctrl+C`.

The app should be served over HTTP. Opening `App/robot.html` directly may prevent its JavaScript modules and JSON files from loading correctly.

## Install the npm dependency

The repository includes `package.json` and `package-lock.json`, which declare Blockly `^10.0.2`. To install the declared npm dependencies, run this from the repository root:

```sh
npm install
```

This creates `node_modules/` locally. The current game page loads Blockly directly from `unpkg.com`, and the repository does not define npm run, build, or test scripts. Installing the npm dependency is therefore not required to run the game. Do not commit `node_modules/`; commit the package manifests when changing project dependencies.

## Play

1. Select one of the four levels with **Levels**. Each level opens with a sample block program that you can edit.
2. Arrange movement and logic blocks to reach the goal while avoiding walls and trees.
3. Select **Run** to execute the program, or **Start debug** followed by **Step** to advance through it one step at a time.
4. Select **Stop** to halt execution. Open **Terminal** to view debug messages, variables, and feedback.
5. Complete the level's objectives to earn its star.

The toolbox includes movement, conditionals, loops, comparisons, text, math, and variables. Objectives include reaching the end, avoiding faults, using specific programming concepts, and limiting the number of blocks.

| Level | Name | Main concepts |
| --- | --- | --- |
| 1 | Mijn eerste programma | Movement and avoiding faults |
| 2 | Doolhof | Maze navigation and loops |
| 3 | Loops doolhof | Loops, variables, and a block limit |
| 4 | Experts doolhof | Conditions, loops, and a block limit |

## Repository contents

```text
.
├── App/
│   ├── robot.html       Browser entry point
│   ├── css/             App and Blockly styles
│   ├── img/             Game images and interface icons
│   ├── js/              Game, robot, level, Blockly, and debugger logic
│   └── json/            Blockly locale and saved level workspaces
├── package.json         Blockly dependency declaration
├── package-lock.json    Locked npm dependency versions
├── PSOPV_Analyse_Robot_simulator.pdf
└── RobotSimulator_diagram.png
```

## Project documents

- [Robot simulator analysis (PDF)](PSOPV_Analyse_Robot_simulator.pdf)
- [Robot simulator diagram](RobotSimulator_diagram.png)

## Code map

- `App/js/game.js` defines the level layouts, objectives, and starting workspaces.
- `App/js/toolBox.js` defines the Blockly toolbox; `App/js/customBlocks.js` defines the custom movement and control blocks.
- `App/js/debugger.js` manages program execution and step debugging.
- `App/json/` contains the Blockly Dutch locale and saved block workspaces for the levels.