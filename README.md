# Quiz Extension For Quarto

Simple RevealJS extension that allows you to create multiple choice quiz questions in Quarto.

Here's an example of what this extension looks like: 

<img src="example.png" alt="Example of Quiz Extension" width="70%"/>

## Installing

This will install the extension under the `_extensions` subdirectory.
If you're using version control, you will want to check in this directory.

```bash
quarto add parmsam/quiz
```

## Using

Simply add the extension to the list of revealjs plugins like:

``` yaml
title: My Presentation
format:
    revealjs: default
revealjs-plugins:
  - quiz
```

Then use the following syntax within a slide to create a quiz question. There will be a button for each option and buttons to check or reset each question.

``` markdown
## Quiz question goes here {.quiz-question}

- Option 1
- [Option 2 which is correct]{.correct}
- Option 3
- Option 4
```

By default, the keyboard shortcut to check the quiz question is 'c'. You can change this by setting the `checkKey` option in your YAML header like:

```yaml
title: "Multiple Choice Quiz Example"
format:
  revealjs:
    quiz: 
      checkKey: 'c'
      resetKey: 'q'
      shuffleKey: 't'
      allowNumberKeys: true
      disableOnCheck: false
      shuffleOptions: true
revealjs-plugins:
  - quiz
```

You'll also notice a `resetKey` and `shuffleKey` option. These are the keys to reset the quiz and shuffle the quiz options respectively. By default they're set to 'q' and 't'. You can change these to any key you like.

You can also set the `allowNumberKeys` option to `true` to allow users to select an answer by pressing the number key corresponding to the option. For example, if the correct answer is the second option, the user can press '2' to select the correct answer.

The `disableOnCheck` option will disable the quiz question after it has been checked. This means that the user can't change their answer after they've checked it unless they reset the question. This is false by default.

The `shuffleOptions` option will shuffle the order of the options when the question is displayed. This is true by default. You can refresh your browser to reshuffle the options. 

### Custom explanations for each option

Within a slide, you can use the `data-explanation` attributeto provide an explanation for the each option including the correct answer. This will be displayed when the user checks their answer. For example, here's what a math quiz question might look like:

``` markdown
## What is the formula for the area of a circle? {.quiz-question}

- [$πr^2$]{.correct}
- [$2πr$]{data-explanation="This is the formula for the circumference of a circle."}
- [$4πr^2$]{data-explanation="This is the formula for the surface area of a sphere."}
- [$\frac{4}{3}r^3$]{data-explanation="This is the formula for the volume of a sphere."}
```

## Example

Here is the source code for a minimal example: [example.qmd](example.qmd).

The output of `example.qmd` is [here](https://parmsam.github.io/quarto-quiz/).
