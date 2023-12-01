---
title: About Conway's Game of Life
description: A simple set of rules that can create complex forms of 'life'
---

{{< add-tailwind dark="true" >}}

# About the game

The **Game of Life** is a simulation (a form of [cellular automaton](https://en.wikipedia.org/wiki/Cellular_automaton "Cellular automaton")), that was devised by the British [mathematician](https://en.wikipedia.org/wiki/Mathematician "Mathematician") [John Horton Conway](https://en.wikipedia.org/wiki/John_Horton_Conway "John Horton Conway") in 1970. 

The game has a simple set of rules:

  1) A dead cell becomes alive if it has exactly 3 alive neighbours ([8 possible neighbours](https://en.wikipedia.org/wiki/Moore_neighborhood)).
  2) An alive cell remains alive if it has either 2 or 3 alive neighbours.
  3) All other cells will die in the next generation.

{{< game-of-life
  dark="true"
  style="width: 60%; margin: 20px auto; outline: gray solid 1px"
  title="Step by step example"
  image="/presets/basic/101.gif"
  scale="12"
  delay="1000"
/>}}

## Basic shapes and objects

With only these 3 rules, we can create interesting scenarios, where the cells start exhibiting predictable behaviour. This includes stable structures, repeating patterns (oscillators) and even moving "ships" and gliders.


| Stable | Repeater | Oscillator | Ship |
|--------|----------|------------|------------|
| {{< game-of-life title="Stable" image="/presets/basic/stable.gif" />}} | {{< game-of-life title="Demo of Life" image="/presets/basic/repeaters.gif" />}} | {{< game-of-life title="Demo of Life" image="/presets/basic/101.gif" />}} |  {{< game-of-life title="Demo of Life" image="/presets/ships/bship.gif" />}} |

## Signal generators and relays

Using these basic constructs, we can create more complex simulations, where signals and state can be manipulated in various ways. 

{{< game-of-life
  dark="true"
  style="width: 60%; margin: 20px auto; outline: gray solid 1px"
  view="canvas"
  title="Signal generators with memory"
  image="/presets/signals/memory.gif"
  delay="10"
/>}}

# Advanced usage and state machines

We can even create a [Turing complete](https://en.wikipedia.org/wiki/Turing_complete "Turing complete") state machine and can simulate a [universal constructor](https://en.wikipedia.org/wiki/Von_Neumann_universal_constructor "Von Neumann universal constructor") or any other [Turing machine](https://en.wikipedia.org/wiki/Turing_machine "Turing machine").


{{< game-of-life
  dark="true"
  style="width: 60%; margin: 20px auto; outline: gray solid 1px"
  view="canvas"
  title="Advanced usage"
  image="/presets/complex/primes.gif"
  delay="0"
/>}}