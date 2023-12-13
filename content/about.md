---
title: About Conway's Game of Life
description: A "game" with simple rules that give rise to complex and emergent patterns on a grid of cells.
---

{{< add-tailwind dark="true" >}}

Conway's **Game of Life** is a cellular automaton devised by mathematician [John Horton Conway](https://en.wikipedia.org/wiki/John_Horton_Conway "John Horton Conway") in 1970. It's a zero-player game, meaning its evolution is determined by its initial state, with no further input from humans.

The "game" is played on a two-dimensional grid of cells, each of which can be in one of two states: _alive_ or _dead_.

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

## Game Rules

At the heart of the Game of Life are four simple rules that dictate the state of each cell in the next generation:

1. **Any live cell with fewer than two live neighbors dies, as if by underpopulation.**
2. **Any live cell with two or three live neighbors survives to the next generation.**
3. **Any live cell with more than three live neighbors dies, as if by overpopulation.**
4. **Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.**

These rules create complex and often unpredictable patterns, making the Game of Life a fascinating example of [emergent behavior](https://en.wikipedia.org/wiki/Emergence). The cells evolve over [discrete time](https://en.wikipedia.org/wiki/Discrete_time_and_continuous_time#:~:text=A%20discrete%20signal%20or%20discrete,from%20a%20continuous%2Dtime%20signal.) steps based on these set of rules.

{{< game-of-life
  dark="true"
  view="html"
  style="width: 60%; margin: 20px auto; outline: gray solid 1px"
  title="Step by step example"
  image="/presets/diamond.gif"
  scale="10"
  delay="2000"
  autoplay="true"
  xlocked="true"
  explain="true"
/>}}



## Simple shapes and patterns

The initial state of the grid, or "seed," can lead to various outcomes, ranging from stable patterns and oscillators to gliders and spaceships that move across the grid.

{{< cgol-simple-examples
  style="width: 80%; margin: 20px auto"
/>}}

The interactions between cells give rise to dynamic and evolving patterns that capture the essence of a simple yet highly intricate system.

## Signal Generators

One interesting use case we observe, when combining spaceships and gliders, is that we can create a signal generator.

{{< game-of-life
  dark="true"
  style="width: 60%; margin: 20px auto; outline: gray solid 1px"
  title="Glider Gun"
  image="/presets/simple/glider_gun.png"
  delay="50"
  locked="true"
  autoplay="true"
/>}}

Signals and relays in Conway's game of life can be used to implement logic gates and other building blocks typically used in boolean algebra and computer science.

{{< game-of-life
  dark="true"
  style="width: 60%; margin: 20px auto; outline: gray solid 1px"
  view="canvas"
  title="Signal generators with memory"
  image="/presets/signals/memory.gif"
  delay="10"
  locked="true"
  autoplay="true"
/>}}

## Complex patterns and behavour


Despite its simplicity, the game is [Turing complete](https://en.wikipedia.org/wiki/Turing_completeness#:~:text=In%20colloquial%20usage%2C%20the%20terms,purpose%20computer%20or%20computer%20language.), meaning it can simulate a universal computer, capable of performing any computation that can be expressed algorithmically. The following example was created by [Paul Rendell](http://rendell-attic.org/gol/tm.htm) and is considered Turin Complete.

{{< game-of-life
  dark="true"
  style="width: 100%; margin: 20px auto; outline: gray solid 1px"
  view="canvas"
  title="Turing Complete"
  image="/presets/complex/turing_complete.gif"
  delay="0"
  start="true"
/>}}


## Practical applications

The Game of Life has found applications in various fields, including computer science, biology, and artificial life. It serves as an educational tool for understanding complex systems, and its beauty lies in the way order and complexity emerge from a set of elementary rules, highlighting the elegance and power of cellular automata in modeling real-world phenomena.

