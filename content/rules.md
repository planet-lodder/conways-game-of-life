---
title: Game Rules
draft: false
description: With 4 simple rules, interesting patterns emerge
menus:
  main:
    weight: 10
---

{{< add-tailwind dark="true" >}}

At the heart of the Game of Life are four simple rules that dictate the state of each cell in the next generation:

1. **Any live cell with fewer than two live neighbors dies, as if by underpopulation.**
2. **Any live cell with two or three live neighbors survives to the next generation.**
3. **Any live cell with more than three live neighbors dies, as if by overpopulation.**
4. **Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.**

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

These rules create complex and often unpredictable patterns, making the Game of Life a fascinating example of [emergent behavior](https://en.wikipedia.org/wiki/Emergence). The cells evolve over [discrete time](https://en.wikipedia.org/wiki/Discrete_time_and_continuous_time#:~:text=A%20discrete%20signal%20or%20discrete,from%20a%20continuous%2Dtime%20signal.) steps based on these set of rules.
