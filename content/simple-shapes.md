---
title: Shapes and patterns
description: The basics structures that power of the Game of Life
menus:
  main:
    weight: 11
---

{{< add-tailwind dark="true" >}}

The initial state of the grid, or "seed," can lead to various outcomes, ranging from stable patterns and oscillators to gliders and spaceships that move across the grid.

{{< cgol-simple-examples style="width: 80%; margin: 20px auto" />}}

The interactions between cells give rise to dynamic and evolving patterns that capture the essence of a simple yet highly intricate system.

Here are the basic shapes and patterns commonly observed in Conway's Game of Life:


## Still Lifes
  - **Block:** A square that doesn't change from generation to generation.
  - **Beehive:** A hexagonal shape that remains unchanged.
  - **Loaf:** Similar to the beehive but with an extra cell.
  - **Boat:** A rectangular shape with a small square at one end.

{{< game-of-life-examples-stable style="width: 80%; margin: 20px auto" />}}

## Oscillators
  - **Blinker:** A row of three cells that oscillates between horizontal and vertical positions.
  - **Toad:** A two-phase oscillator that oscillates between two configurations.
  - **Beacon:** A period-two oscillator that consists of two blocks.

{{< game-of-life-examples-oscillators style="width: 60%; margin: 20px auto" />}}


## Spaceships
  - **Glider:** The simplest spaceship that moves diagonally across the grid.
  - **LWSS (Lightweight Spaceship):** A larger spaceship that moves in a straight line.
  - **MWSS (Middleweight Spaceship) and HWSS (Heavyweight Spaceship):** Larger versions of the LWSS.

{{< game-of-life-examples-spaceships style="width: 80%; margin: 20px auto" />}}


## Guns
  - **Gosper Glider Gun:** A pattern that periodically produces gliders.

{{< game-of-life
  dark="true"
  view="html"
  style="width: 60%; margin: 20px auto; outline: gray solid 1px"
  title="Gosper Glider Gun"
  image="/presets/signals/glider_gun.png"
  delay="50"
  autoplay="true"  
/>}}


## Pulsars
  - **Pulsar:** A large, symmetric pattern that oscillates with a period of three.

{{< game-of-life
  dark="true"
  view="html"
  style="width: 20%; margin: 20px auto; outline: gray solid 1px"
  title="Pulsar"
  image="/presets/oscillators/pulsar.png"
  autoplay="true"  
  delay="250"
/>}}


## Methuselahs
  - **R-pentomino:** A small pattern that evolves into a chaotic state before stabilizing.


These are just a few examples, and there are countless other interesting patterns and structures that can emerge in the Game of Life. 