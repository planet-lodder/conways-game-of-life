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

<script src="https://cdn.tailwindcss.com?plugins=typography"></script>
<script>
  tailwind.config = { darkMode: "class" };
  document.body.classList.add('dark')
</script>
<script src="/game/js/web-component.js"></script>
<div class="flex" style="width: 640px; height: 480px; outline: gray solid 1px">
  <game-of-life
    class="flex flex-col flex-1 justify-start w-full h-full"
    view="html"
    title="Demo of Life"
    image="/presets/simple/traffic-circle.gif"
    width="100"
    height="100"
    scale="10"
    delay="0"
  ></game-board>
</div>
