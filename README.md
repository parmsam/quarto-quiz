# Quiz Extension For Quarto

Simple RevealJS that allows you to create multiple choice quiz questions in Quarto.

## Installing

This will install the extension under the `_extensions` subdirectory.
If you're using version control, you will want to check in this directory.

```bash
quarto add parmsam/quiz
```

## Using

Simply add the extension to the list of revealjs plugins like:

``` markdown
title: My Presentation
format:
    quiz: default
revealjs-plugins:
  - quiz
```

Then use the following syntax within a slide to create a quiz question.

``` markdown
## Quiz question goes here {.quiz-question}

- Option 1
- [Option 2 which is correct]{.correct}
- Option 3
- Option 4
```

By default, the key to check the quiz question is 'c'. You can change this by setting the `checkKey` option in your YAML header like:

```markdown
title: "Multiple Choice Quiz Example"
format:
  revealjs:
    quiz: 
      checkKey: 'c'
      resetKey: 'r'
      shuffleKey: 't'
revealjs-plugins:
  - quiz
```

You'll also notice a `resetKey` and `shuffleKey` option. These are the keys to reset the quiz and shuffle the quiz options respectively. By default they're set to 'r' and 't'. You can change these to any key you like.

## Example

Here is the source code for a minimal example: [example.qmd](example.qmd).

