# Robot Simulator

Robot Simulator is a browser-based game for learning programming with visual blocks. Use Blockly to guide a robot through grid-based levels, then run or debug your program. The game interface and level instructions are in Dutch.

https://netbeck22.github.io/robot-simulator/App/robot.html

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
