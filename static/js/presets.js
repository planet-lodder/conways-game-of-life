let presets = {
  // Stable shapes in textual representation
  stable: {
    title: "Simple and stable",
    scale: 32,
    delay: 100,
    text: [
      "        ",
      "  11    ",
      " 1  1   ",
      "  11    ",
      "        ",
      "        ",
      "   11   ",
      "   11   ",
    ].join("\n"),
  },
  // This sample gives raw data[x][y]
  repeater: {
    title: "Repeating Patterns",
    scale: 32,
    delay: 100,
    data: [
      [0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  // Advanced use case loaded from a PNG
  advanced: {
    title: "Advanced example",
    scale: 16,
    delay: 25,
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAmCAYAAACGeMg8AAAAAXNSR0IArs4c6QAAARBJREFUWEftmG0PwyAIhOv//9EubWJC3Coc5awu9KsM74HzbaXWWo8/+MoskFLKwawZFeQUL78eJBLODaKJ0CBOQC0H4ngXSBMwEiLHrIIbvMeCMEgv6m5yS0f6ij8GQRJYQZp1RmsEsY4We3WEBSInt9pLE3w3DltLLlK2OATKBRK94yCCQztindiyu1lzaXHujmiJ2ziy/qw5f8VNAfGcCygUHQQV5I1PEG/lWL/LjkRUNvJAfb0jUdvzqyBRENdNY9ZTN8KKoxwJwq4wmj87glaMHb9sR9AnwLIg8s1vuT0vD2KByHOEvXA9+Ze2FgKUIEi1GLFf/3jufGmUt+dtrdU/AbYF6e2aIIwF/CTnB95iD57N0V/WAAAAAElFTkSuQmCC",
  },
  complex: {
    title: "Complex example",
    scale: 5,
    delay: 0,
    wrapped: true,
    image:
      "data:image/gif;base64,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",
  },

  sample_relay: {
    title: "Sample - Signal Relay",
    scale: 20,
    delay: 15,
    image:
      "data:image/gif;base64,R0lGODlhNwAZAIAAAAAAAP///yH5BAEAAAEALAAAAAA3ABkAAAIujI+py+0Po5y02ouz3rz7D4biSJLAiablykpAe53wJCvp/c76zvf+DwwKh0RYAQA7",
  },
  sample_tndrbird: {
    title: "Sample - Tndrbird",
    scale: 16,
    delay: 15,
    image:
      "data:image/gif;base64,R0lGODlhKQApAIAAAAAAAP///yH5BAEAAAEALAAAAAApACkAAAJBjI+py+0Po5y02ouz3rz7D1LAGJYWkKCNmrEGOrrvJsupiR9xzoc2/8sFe8Si8YhMPnacocnG9Cmn1Kr1is1qMwUAOw==",
  },
  sample_spark2pi: {
    title: "Sample - Spark2pi",
    scale: 4,
    delay: 5,
    image:
      "data:image/gif;base64,R0lGODlhTQC2AIAAAAAAAP///yH5BAEAAAEALAAAAABNALYAAAL+jI+py+0Po5y02ouz3rz7D4biSJbmiabqCgTtegIvXM70jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fkckbmsh3Ri5n6wP7FFbI33G7Oj+pYfNT/xKfXM1dRyHN455doBBjYxzgoGRP5yFQJWHkTKdjmOAlqqNn0SQpZGrqH6hnE6Wrad5o6WzN6SZrpYMuy+Er7K7qaJDwsC6yyywrk2gt7RbyWfDzN0FkFvYOpi13bYJ0gTZ36PcVdZD5ELh4SjtBuwuyNvpk13/q+Pq3+h6u7fS+vWb6Baewtq2eMIDtz+EjEq2aQBcJnDRWOqygkIrJFXPIAQhRokdo+KBp9lESEMSQ4hic3PFS2pGW2hCpDjrQUkyNEj55A1vx104lMHUNxBI0JJ+dORilBNGz6M6rUqVSr/igAADs=",
  },
  sample_osc: {
    title: "Sample - Oscillerators",
    scale: 6,
    delay: 0,
    wrapped: true,
    image:
      "data:image/gif;base64,R0lGODlhzwBjAIAAAAAAAP///yH5BAEAAAEALAAAAADPAGMAAAL+jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh0SAwRhAKo/MZHPpjEKnz6rUSr1qs1ysd/vtgsdIovmMTqtLZUnb9J7E3Z45xf7Brxn6+l5n1AcR+FBGCBciSKIYwXjwBuDIF0d5hAdJZymJcCm4ORgV2vK50BdJKqqBavkS+Ydy6re6Z5rAOOeIm2qL4em5Mdso4pqBCZz72nNIXBHLydwrF5zsZ3upgrqE3FwKfDL9GASuSs3iLJ29u3JezsftfudgqtvYNm7HzhmOWP3u73JInroLuMaNMqhMWgd8A29gUmKsELQkExukI2gxHjn+fiAqCtQHcl87iQgdKmzCi1U0C/ngUcyjZhNDZNcmZXTZ7ZE2i/Z0RsQ5oqSPgBoLaclYEyOokUz1BPMoEtY/jlPl9Fv5Uh5UoEy7ev0KloOYsWHKkjFL9qzatGytRF0YNi5XuXQXbjU3Q2jVvN/qytBr1S8aoqP+suzI9yQbnk9TEMYmmNYncIB73W1X+W1KkkGxJurLo+WfzJFLjyS9NAbqvYhNh3QNm86s1Wdo38wjiV4r0K9sl7ocG1Et38EzLXqmAJJv4qmTAzcKyJCZ5+u6Ph5yXbX2ZtSf/dw9VyrVYcRmQi8qWPRQzSrDD2JuksYtYayRH8fxXWzx/UOw4f/mD5cs9RWzTXxZMYYeDP65V4RTAJamCG0LoqRgDqQZdEt3D2oyWIQN7jBhgtklp59ju4QoyoUbvraifBr+16J4420mkF4o0tiZY5MFGKNJN/aYY4LeGIYfb0AeGZd6SDJoYmuBGXhfcD8uSSUclCW2HZRwSVflNzdOueKItWFZYZAD8thlmmrK1dZaaL3pZpxtzgknnXJSuGaeeu7JZ59+/glooIIOSmihhh4aVgEAOw==",
  },
  sample_pinball: {
    title: "Sample - Pinball",
    scale: 10,
    delay: 5,
    wrapped: true,
    image:
      "data:image/gif;base64,R0lGODlhWABKAIAAAAAAAP///yH5BAEAAAEALAAAAABYAEoAAAL+jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrYuAxhxNc9vYsNcvvBk7Dvkgo1hMUAMJYGyZK+GPN6QzA7QaQJotbct94fAlowiaE/mMSvUO/QXJpa8n9F6hsmLj/JRvdTo91GFZrdjFphGOLeHKNg4BRkpOUlZCVYoydZmiSMYZrhJuFG1eFFq8TVoqsopRNUKG7snKqtJ89hyKrvL29uqqwKshNukIQxy/JDssGyVmcKaiwl2RTyx1bdSbS2HzY3a5SsOEd32jXxOZ5m+Nq7uHqbX3HySKoprc8guR4tnzaXK1ixW+fDl61SujBsnyYQBpAUNIg4xDiVq+7SGYhAuMlO8bOSXEduuhJ/2jTlSrQkeKZNIblPpclpHZcxowruJM6fOnTx7+vwJNCivAgA7",
  },
  sample_round: {
    title: "Sample - Round",
    scale: 8,
    delay: 0,
    image:
      "data:image/gif;base64,R0lGODlhWgBaAIAAAAAAAP///yH5BAEAAAEALAAAAABaAFoAAALhjI+py+0Po5y02ouz3rz7D4biSJbmiabqyrZuCwDvGS+yLNUzpSf41NtpYj+h8YhMKpcPIrMTPBQj0aehGrgBp9YmtwsOi8fksjmJlaKnaa+jvYrCGV/E/IzP6/f8vt/GVveXFThoJWiocIehpdQ4spiImEhZGdfjxPh4M5mC8/PJeKWWdVQDSpiRSdhp6foK0iope/GIZBtLa6gLC1n4KsfbO0xcbHxsMiccbIoY6fNr+iaMXG19jX323PWMe0Xtsl2qCB62mo2e/neeJ/4lPtM9Dm0Jr36Pn6+/z9/v71EAADs=",
  },

  sample_rake: {
    title: "Sample - Rake",
    scale: 8,
    delay: 0,
    wrapped: true,
    image:
      "data:image/gif;base64,R0lGODlhewA1AIAAAAAAAP///yH5BAEAAAEALAAAAAB7ADUAAAK2jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2HQAAzkv78esJIcGhqWhBIo2h4HKiiyqlTygTUdUoMU5hMfsBW3tU0TdzvpJ0nLL6DTfHmeK5jG3A22s7Z32v4gdINlhoGHg4I5j40gf0x9i0GNkCSXnk4Xa5krYZoddhyaIZhoUG5GV6IqrAGuNKlAD71sVFmnO7OZsn6wmz60vRGYwCSnyMnKy8zNzs/AwdLT3dUQAAOw==",
  },
  sample_randgun: {
    title: "Sample - RandGun",
    scale: 6,
    delay: 0,
    image:
      "data:image/gif;base64,R0lGODlheACZAIAAAAAAAP///yH5BAEAAAEALAAAAAB4AJkAAAL+jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNcRYOcVgOs5/+DhegugL2VkJB3Lo6zpjB6I0qr1aqAqtNgWNDvsvr4BoFDsOmt7XDSyXYa7UfK5/Y7P6/f8/pHsdwIYSFhoeIiYqLjI2Oj46FMHeTE4uUMlaQmxVKnT1Km5lTU1GmphlmmqVMaaCsLpahMWphSb8MUZZCvY0AZaBPcbJxu0sqtqiIq8M8q2LIE6exwqFD2tOZTN+qwLzM3kew15hkD+3Rt9Dr2tztRc2n4L7xx/u4b5KUytDTZcPzyrlThHRGix+0dv28BH5sz9ewgR4UJV+tRV1HDRUxKih4ImPmFnEKNHK84SimykLKJKMRm5tVwpJd9KMwJnvjv4sOFLmDx7+vwJNKjQoU44coxndCfDezwL5lF66ubINFNvkHIasSQ8iDqrEv0KNiwfqKbIij2LNq3atWzbun0LN67cuXTr2r2LF41ZSyFh0vxpdq/eDil7mmQ08rCivYI1bunbDhfODI2xkFWsUnFlQoWneE32Oa/o0aRLmz6N2kcBADs=",
  },
  sample_zip: {
    title: "Sample - Zip",
    scale: 16,
    delay: 50,
    image:
      "data:image/gif;base64,R0lGODlhQwAkAIAAAAAAAP///yH5BAEAAAEALAAAAABDACQAAAKUjI+py+0Po5y02ouz3rz7D4biSJbmiW4AwKyWa8IIG9CULeLKqk98zvu1DLQi8Xjo5YjBpvP5Yykvz5q1I71SswuXl1mECYXHqSSrlKlt62S4Zn4Yd2yxPYyfaV948l6DNkIGRQhlFXfDVXY114iEg/gCJ/a3FXmT8MVxaZmJxUmVCZpCWmp6ipqqusra6voKG5tSAAA7",
  },

  ship_pstrain: {
    title: "Ship - PS Train",
    scale: 8,
    delay: 5,
    wrapped: true,
    image:
      "data:image/gif;base64,R0lGODlhLQApAIAAAAAAAP///yH5BAEAAAEALAAAAAAtACkAAAJYjI+py+0Po5y02ouz3rz7D4aiApTAaJZIqoLn8Rpp0KJM7cXxePOo6Vvogo4dr/UyHnFEWFLWbCiDw6iTWZkSq9aEFrvZiYFgDWt17s667Lb7DY/L5/RgAQA7",
  },
  ship_bship: {
    title: "Ship - BShip",
    scale: 8,
    delay: 0,
    wrapped: true,
    image:
      "data:image/gif;base64,R0lGODlhLgAlAIAAAAAAAP///yH5BAEAAAEALAAAAAAuACUAAAJVjI+py+0Po5y02ouz3rz7D4aiBQAjVJano6pr475UaspJHeBkjOgwhtOlbrViJngYEn3HZI+XM+Y0yluEKUPaltgPdNvqrmhbxbeMTqvX7Lb7DY8bCgA7",
  },
  ship_wing: {
    title: "Ship - Wing",
    scale: 4,
    delay: 5,
    wrapped: true,
    image:
      "data:image/gif;base64,R0lGODlhQwBDAIAAAAAAAP///yH5BAEAAAEALAAAAABDAEMAAALKjI+py+0Po5y02ouz3rz7D4biSJbmiaYJAKge64JtnM2ITUvwsa9508LxeCzhz0c0zHpHhTHAhD1NTOgiiAvGqjeicUl77sBNK3I15ZaiYujUjNI6vWVGlvxuivOualu99WZTVNflhFf3dcWnwnblVih3Rlh4BmnGmLNX6fcI2CdIVwl3g1imeMh555l5Imno1rpVqlQ7OpR6C9v1ySmqi2YrmzgceQm8WHxqi5zbDKRM/PwwOI32am053bud7f0NHi4+Tl5ufh5RAAA7",
  },
  ship_slopuf: {
    title: "Ship - Slopuf",
    scale: 8,
    delay: 0,
    wrapped: true,
    image:
      "data:image/gif;base64,R0lGODlhZgBdAIAAAAAAAP///yH5BAEAAAEALAAAAABmAF0AAAL+jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8dyBwDzjdRBreMyz/PNgEJTsBgD2pAu3ZEp6i2k0KiNWF0pl1kVtgsOi5HUccnJ3ZTNhm8mnWbv4hf6bduK2/OJPQl/J5cCJ/jnV4iYSOGmqKbUyIG2xnKoVTl4cAkJobk5Qej5xhhKWmrq0Ik4mXnVtnM6N0fXSpQq+BVkG7pKmwsb4eSqq6o5fJvzK2GcrJcM/OgcLT3NuXwqab0LTc0wyn2dTQr6jUyO2ke5/aOOWV64uujpXTHOhuYBL5Zvzt//Mf8NUD9s/tr42cdNUkGDTwo2XFgNoTSB/Ag6DAcxo8YJjRw7evwIsmMBADs=",
  },
  ship_barge: {
    title: "Ship - Barge",
    scale: 7,
    delay: 0,
    wrapped: true,
    image:
      "data:image/gif;base64,R0lGODlhVwB5AIAAAAAAAP///yH5BAEAAAEALAAAAABXAHkAAAL+jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrYa4MYwHK8AXbN4ns68uvuZgsKSrzgMEJGh242ZXEI7xylIauU4sx8sN7P9dp9eMaVsPqc9z7Vb2D6QlXS5r6q81w1zfH8Pxic4GIdDUyjHZ5iYx1gXFziHEESZUDlpmYk5dqhwRPTp+SjamYkGAdnYuNMmqfjKeugnC/jiuLQoOqhZu3s6ATmDKBi2J5xLV7yoTDXqUAb98IsR61ScZx2crb09uT39dlKd7d1tZ66Ijk2u5dwQ/SxNEox9W+97b5y/PNyOr9tLH0BcjqhQohULljeFdhi+WqWlFaldiUphsliRIrH+DcJqXSrokZfGj/4s0vrX76TAlA9fHEwG6E9CPQ1pKsQTTsZLmxBnwZwJs2ZQW+5U5mKpaiUylZFwkgy5CeRTcKgkmtIYFJS7jL1wXkjVyifEhmMfulJ1lqhAXgSxro1KVRqrfRVZMiNmt58tjAvgvZNnpBy7dIPXWRN8+FzhnDXGJSb82PC1b46vRXIblYFfzfPm3k2WdyldvMg42hvYF+Q/tldelkUr9mzYmAgj8s06sevWjbrjmnIqEqrU4E+Jmmx5VHTS5KdTfd05tCftnwt5ymScA6weoD6tb68enRohRkjLKzffLu1U4uwzBwRj9SLWUFd7z39/xrXs2mTE9zuEjV8FyrGGWoEEsuFZaPZ8dsyCel0WYISbpRaYYpFRhthk32ToHHY6cFgZN4VhaKFl4t0WHECcxTMCPQyOBppoL35m2mpwURhQaachaAl/ZsUG5HSvURMfV1rdRp989u0FnHvrOdleM0UhR955VjbnW49aekedUN1Fd52HLnQo5l9lAnNmBFtkuYaJaar4plxsvjFnTl7FqSSePZIZ5516hvcnZoFGiKeff9bpBp+HEvomooM+Cmmkkk5KaaWWXjppAQA7",
  },

  sample_signal: {
    title: "Complex - Thick Signals",
    scale: 8,
    delay: 5,
    image:
      "data:image/gif;base64,R0lGODlhXQBGAIAAAAAAAP///yH5BAEAAAEALAAAAABdAEYAAAK5jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbu+wHwfAAy7cr23dg46XPwfotdJUhUIBnD4cOZrD0T0KioGsFaIUtJd2v6goVaZcA49l7E6SJV3YYbynEMuo6X0/PnvX9vBXjDdsZ3BGhIcZfIGLXYuIYI2TMnOfl2ucFjmdnp+QkaKjpKWmp6ipr3mDrHyuTBSRRbhEX4yTaLkku1+9KLp/Vbh2vrqlF8ikyqvGzs/AwdLT1NXW0NWQAAOw==",
  },
  complex_more_signals: {
    title: "Complex - More Signals",
    scale: 4,
    delay: 0,
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXsAAADABAMAAAAXat46AAAAD1BMVEX///8CAs/PAgICzwLmfhfNmKloAAADj0lEQVR4Ae3cQW7rOgyF4d/HWYCzgwOuIEA3kMHd/5oe4EFrlLkv7Y1ghQC/GduJYUgURcmhtdZaawUsV0pbKG2jmNbalcqWpXN+a6393HVLYSlbCitZqi0BrbVlS2El25bCzvmttfbDlnIO39xSu/Lcqi0BrbXr87BOSzmHnfNbe5FMZRFUFvKpLeUcviaGj6JtQuUpx4ycvzCGwlQWVCNRWlCa2dlEnNBSzuEIRlge31J+Ho5gjIhiOd9mJwTCVYu1KDaLwwAqmn8UQWEKmSOLUgKJI4N8Zks5hS8suMYjKs7lxMrTh+2WwiMqzu3cJUAAQuXyj3x4YtVsLyhAFq5ZiIZBkTddFTZe6e2/mISu48JfJk/x+hKwLMPC32eeA2tCzq/XZuvNb86ZxUp/pbjQxktowLb3XDafIoY0Ha7b+PDZDtcm+8eWzzY+fDbcbUZZzl8CXPqQSPkPdbK/bZz+VqbVb+fRo+MxURQaOvmlyz+uhpZtfPicIk9iOR6vataolvL4hrNy8sn/87ycnylS8L8VnTFvRaUPHUMO16304zAdxS5kqpBRHB8/12lmF2Sst/PDywUud/JkRJaQ8+zQk8dfrueEuz+HxxeADAFYxt9mtAIIswvz2HJWCNxTh83f3r7Q4/RkHtvmLgF57DudIcnYvB05ZR6RBhEGosAdtgAizM5UFYBLP77iq1KQc8X5cQOuJ4W/J38tDRFpMK2ssCznhL8WDn9NgJAxnpvzM/0tFAoILHaRKs4b3GaE/OGTDfEoNDaE+asP1tuM8HLhk430KLQAAos3c7nzSSA/Co1w6eQfqSidWTGPv5a6rnPCUdZJ4SAfk8J+97BymxCOmbsF3n6M7631ujWqavhY19uEcEDNNkH9innAfqWM57vF28eEcMBevUDiH98p6T5V/S7h5V66R3u/j+qQz9ks3gecT0x8/GGnQ2XP5vpktM+la98KqHsnY/yNmPHG30eqfxus7+L1Tcjy91Cj9C1giZ1NSRp5A36CAd8fFP/6o7+96S+fcsoMyomgJud9okUVIYQhOHKRFTjCCMGA740nsMDI9b72lvPbL9R1kNPYr0QgHzNPgDB1+PvPfIAoxMeOpwOhsh+ly4VWX4VMXYoACIoKAxIHUXXXi0wYUZIMioCgpDCS6/7OEMQeUI3NrlzNkA8QTZtHmNJEYUIUpHDlfo8xpZnCLN5Ma6211v4DPI1wVwR7xR8AAAAASUVORK5CYII=",
  },
  complex_memory: {
    title: "Complex - Memory",
    scale: 4,
    delay: 0,
    image:
      "data:image/gif;base64,R0lGODlhGAHNAIAAAAAAAP///yH5BAEAAAEALAAAAAAYAc0AAAL+jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJNQCi1OoJMF1grdwuJ5s9TLFhr/nsIAe22jL6DR+7xXO43Stn1O9867gP2PenFViotAfWZrhIxJbAhrgnJclYmaJWlokgR7nWaQkq4vg4qRh6ejMqJqWH6mqDuPY62yhLewurN4jL+6JKZ9sr7PG7Gen5Oaz8UGy8yxq8LD3S3Dx9/YWtvc3d7f1NYQ0+LiFOfo6err7O4pbMvhNmjqM2+Q4P+1fPfF+St9UP34xM8zwNrFNQIA15RYolVHgwYI199iA6cfTwCsD+jBZjUFSw76OMZx17MATpkGOIRIlK5tvkLCZKiR9a2qLpUhRBWRRFIhvpDmfOS8AeYVQ5lNbRpEybOn0KNaoloVJPkawq7So1n1iX6IumExoEpF1dLCUBaQLZslxsslW29i2uk3IriftKtS4Ut0UHxdXbMKhYY6YAm/mV1igrMHkNo+D6hStex0IaZ6BL2YflzJw7e/4MOrTo0aRLmz63+fQQxINV+4Hp7G5q176CEcyji/ZFlGB178Wt2Lfw0ohnD6+s9fghvpiMKx/ZGtnf5/Su8qXORJJz7O22c996mfF3HskrTB/vD7369ezbu38PP778+fTrv4VsP4j3kOfs80evudh//uUAEE/eDViTYAguyGCDDj5oF3AQphJgbxD2Z8Eu5emAH1MbmsDfgaLUJaJ5Ja6EIIYTgrdiiy6+CGOMMs5IYwMqKnXjXBaiptCJofhYY5BCDklkkUYeiWSS3uSYToegfPgUkFRI2Q2VSl6JZZZabslll15+6ZGVEzEpFZRViFkSmhOByWabbr4JZ5xyzrkimaM5yeGO7alJjH180glooIIOSmihhh46jZ38/OmbmWgF+SejiE5KaaWWXoppppoiiiehkgr56aaijkpqqaaeiuqRimrp6KChpgprrLLOSmuttt4qVwEAOw==",
  },
  complex_lonedots: {
    title: "Complex - Lonedots",
    scale: 5,
    delay: 0,
    image:
      "data:image/gif;base64,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",
  },
  complex_hotel: {
    title: "Complex - Hotel",
    scale: 1,
    delay: 0,
    image:
      "data:image/gif;base64,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",
  },
};
