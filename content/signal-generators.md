---
title: Signal Generators
description: Using ships and gliders, we can generate singnals
menus:
  main:
    weight: 12
---

{{< add-tailwind dark="true" >}}

One interesting use case we observe, when combining spaceships and gliders, is that we can create a signal generator.

{{< game-of-life
  dark="true"
  style="width: 60%; margin: 20px auto; outline: gray solid 1px"
  title="Glider Gun"
  image="/presets/signals/glider_gun.png"
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