## Frontend Engineer Assessment.

Check out the details of the assessment at home page of the project.

---
### Problem 1: Refactoring
For this task, your objective is to refactor the current page following your coding conventions and best practices. Look for opportunities to enhance code structure, eliminate redundancy, clarify variable names, and simplify complex logic.

* Achievement: Assessment Finished!

---
### Problem 2: Maze
For this task, your objective is to implement a page where a mouse traverses a maze to find cheese.

During server-side rendering, you need to hit the `/api/maze` endpoint to fetch the maze map array and display all the maps along with their respective start buttons on the screen. When the user clicks the start button, the mouse on that map will begin to solve the maze using Depth-First Search (DFS), with each step taking 100 ms.

Meanwhile, the start button will disappear, replaced by a reset button. Clicking the reset button will stop the mouse's movement, reset the map to its initial state, and the reset button will be replaced by the start button again.

[Click](https://youtube.com/shorts/uA744cMSNK8?si=U80OGTvH3rGV17zu) to watch a demonstration of the expected behavior.

Note that:

Put this page at the route `/find-the-cheese`, and title it `'Find the cheese'`.
Add description, "Click 'Start' to see how the mouse find the cheese by using DFS!", below page title
The color of the walls `isgreen-800`
The color of the path `islime-50`
The icon of the mouse `isLuRat` with color `neutral-500`
The icon of the cheese `isFaCheese` with color `amber-400`
Highlight current path with color `amber-200`
The button has a background color of `amber-500`, and a hover background color of `amber-400`.
`/api/mazes` imulates an endpoint on another server, so you need to use `axios` to fetch the data.

*  Achievement: 
Unfortunately, I cannot achieve auto runs..., but maybe have a look on me using mousemove event to trigger the dfs runner.

### Problem 3: Layout
For this task, your objective is to create and apply a global shared layout. The layout should consist of:

A header displaying'Jedi Software' that collapses when scrolling up and reappears when scrolling stops.
A collapsible menu offering redirection to the homepage and/find-the-cheese.

* Achievement: Meet the requirement!

### Environment
```
$ npm -v
9.8.1
$ node -v
v18.18.2
```

Run below script to see the result:
```
yarn dev
```
