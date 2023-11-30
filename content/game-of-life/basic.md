---
title: The Basics
description: An introduction to the basic concepts
featured_image: /presets/basic/101.gif
language: en
layout: game-of-life
tags:
  - programming
---

# The basics of the Game of Life

Here is a simple example:

{{< add-tailwind dark="true" >}}
{{< game-of-life
  dark="true"
  style="width: 640px; height: 480px; outline: gray solid 1px"
  class="flex flex-col flex-1 justify-start w-full h-full"
  view="html"
  title="Demo of Life"
  image="/presets/simple/traffic-circle.gif"
  width="100"
  height="100"
  scale="10"
  delay="0"
/>}}