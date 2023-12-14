---
title: Conway's Game of Life
---

{{< add-tailwind dark="true" >}}

Conway's Game of Life is a classic example of a cellular automaton—a self-contained system where cells evolve based on simple rules. Invented by mathematician John Conway, the game unfolds on a grid where each cell can be alive or dead. The evolution of the grid occurs in discrete steps, solely determined by four rules: underpopulation, stable population, overpopulation, and reproduction.


---

{{< game-of-life
  dark="true"
  style="width: 60%; margin: 20px auto; outline: gray solid 1px"
  title="Basic example"
  image="/presets/basic/shapes.png"
  toolbar="false"
  locked="true"
/>}}

---

The game gives rise to an array of captivating patterns. "Still Lifes" are static configurations that remain unchanged, showcasing stability. "Oscillators" exhibit periodic motion, oscillating between different states. "Spaceships" are mobile patterns that traverse the grid, adding a dynamic element to the evolving landscape.

{{< cgol-simple-examples style="width: 80%; margin: 20px auto" />}}

Beyond these, more intricate structures emerge. "Guns" are fascinating constructs that autonomously generate patterns like gliders. "Pulsars" are large, symmetrical structures with periodic pulsating behavior. "Methuselahs," exemplified by the R-pentomino, introduce an element of unpredictability, as small initial configurations lead to complex and evolving patterns.


{{< game-of-life
  dark="true"
  style="width: 60%; margin: 20px auto; outline: gray solid 1px"
  title="Glider Gun"
  image="/presets/signals/glider_gun.png"
  delay="50"
  locked="true"
  autoplay="true"
/>}}

What makes the Game of Life particularly intriguing is the complexity that arises from simple rules. The interplay of life and death on the grid unfolds organically, creating a captivating exploration of emergent behavior. Whether observing stable structures, dynamic movements, or chaotic evolutions, Conway's Game of Life stands as a testament to the beauty and richness that can emerge from elementary principles.



## Practical applications

The Game of Life has found applications in various fields, including computer science, biology, and artificial life. It serves as an educational tool for understanding complex systems, and its beauty lies in the way order and complexity emerge from a set of elementary rules, highlighting the elegance and power of cellular automata in modeling real-world phenomena.
