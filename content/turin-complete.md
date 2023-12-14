---
title: Advanced use cases
description: As an example, we can create a turing comlete state machine
menus:
  main:
    weight: 15
---

{{< add-tailwind dark="true" >}}

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
