# Robot Simulator

Robot Simulator is a browser-based programming game for learning to build programs with visual blocks. Guide a robot through grid-based levels using Blockly, then run your program or step through it in the debugger.

The interface and level instructions are in Dutch.

## Run locally

You need Python 3 and an internet connection. The app loads Blockly and a few presentation assets from public CDNs.

From the repository root, start a local web server:

```sh
python3 -m http.server 8000 --directory App
```

Open [http://localhost:8000/robot.html](http://localhost:8000/robot.html) in a modern browser. Stop the server with `Ctrl+C` when you are finished.

Serve the `App` directory because `robot.html` and its JavaScript modules use relative paths. Opening the HTML file directly may prevent those modules from loading.

## Play

1. Choose a level with **Levels**. Each level starts with a sample block program that you can edit.
2. Arrange blocks in the workspace to guide the robot from its start to the goal while avoiding obstacles.
3. Use **Run** to execute the program, or **Start debug** and **Step** to inspect it one block at a time.
4. Use **Stop** to halt execution. The **Terminal** panel displays debugging details, variables, and feedback.
5. Complete all displayed objectives to earn the level star.

The toolbox includes movement, conditionals, loops, comparisons, text, math, and variables. Objectives vary by level and can include reaching the end, avoiding faults, using loops or conditions, and staying within a block limit.

## Levels

| Level | Name | Focus |
| --- | --- | --- |
| 1 | Mijn eerste programma | Basic movement and reaching the end without faults |
| 2 | Doolhof | Navigating a maze and using a loop |
| 3 | Loops doolhof | Loops, variables, and a block limit |
| 4 | Experts doolhof | Conditions, loops, and a block limit |

## Project structure

```text
App/
  robot.html       Browser entry point
  css/             App and Blockly workspace styles
  img/             Game images and interface icons
  js/              Game, robot, level, Blockly, and debugger logic
  json/            Blockly locale and saved level workspaces
```

## Development notes

- This is a static browser app; there is no package installation or build step.
- Blockly is loaded from `unpkg.com` in `robot.html`. Font Awesome and the Roboto font are also loaded from external CDNs.
- Level layouts, goals, and their starting Blockly programs are defined in `App/js/game.js`; Blockly toolbox categories are in `App/js/toolBox.js` and custom blocks are in `App/js/customBlocks.js`.
- There is currently no automated test or build command configured.