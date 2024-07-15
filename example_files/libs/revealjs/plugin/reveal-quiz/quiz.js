window.RevealQuiz = function () {
  var keyCodes = {
    backspace: 8, tab: 9, enter: 13, shift: 16, ctrl: 17, alt: 18, pausebreak: 19, capslock: 20,
    esc: 27, space: 32, pageup: 33, pagedown: 34, end: 35, home: 36, leftarrow: 37, uparrow: 38,
    rightarrow: 39, downarrow: 40, insert: 45, delete: 46, 0: 48, 1: 49, 2: 50, 3: 51, 4: 52,
    5: 53, 6: 54, 7: 55, 8: 56, 9: 57, a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72,
    i: 73, j: 74, k: 75, l: 76, m: 77, n: 78, o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85,
    v: 86, w: 87, x: 88, y: 89, z: 90, leftwindowkey: 91, rightwindowkey: 92, selectkey: 93,
    numpad0: 96, numpad1: 97, numpad2: 98, numpad3: 99, numpad4: 100, numpad5: 101, numpad6: 102,
    numpad7: 103, numpad8: 104, numpad9: 105, multiply: 106, add: 107, subtract: 109, decimalpoint: 110,
    divide: 111, f1: 112, f2: 113, f3: 114, f4: 115, f5: 116, f6: 117, f7: 118, f8: 119, f9: 120,
    f10: 121, f11: 122, f12: 123, numlock: 144, scrolllock: 145, semicolon: 186, equalsign: 187,
    comma: 188, dash: 189, period: 190, forwardslash: 191, graveaccent: 192, openbracket: 219,
    backslash: 220, closebracket: 221, singlequote: 222
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  return {
    id: "RevealQuiz",
    init: function (deck) {
      const config = deck.getConfig();
      console.log(config);
      const options = config.quiz || {};

      var settings = {};

      let buttonContainer = document.createElement('div'); // Step 1: Create a div container
      buttonContainer.classList.add('button-container'); // Optionally, add a class for styling

      let checkButton = document.createElement('button');
      let resetButton = document.createElement('button');
      let prevButton = document.createElement('button');
      let nextButton = document.createElement('button');
      let feedbackElement = document.createElement('div');
      
      checkButton.classList.add('check-button');
      resetButton.classList.add('reset-button');
      prevButton.classList.add('prev-button');
      nextButton.classList.add('next-button');
      feedbackElement.classList.add('feedback');

      checkButton.innerHTML = "Check";
      resetButton.innerHTML = "Reset";
      prevButton.innerHTML = "Prev";
      nextButton.innerHTML = "Next";
      feedbackElement.innerHTML = '';
      
      checkButton.classList.add('action-buttons');
      resetButton.classList.add('action-buttons');
      prevButton.classList.add('action-buttons');
      nextButton.classList.add('action-buttons');

      settings.shuffleKey = options.shuffleKey ? options.shuffleKey.toLowerCase() : "t";
      settings.shuffleKeyCode = keyCodes[settings.shuffleKey] || 84;

      deck.addKeyBinding({ keyCode: settings.shuffleKeyCode, key: settings.shuffleKey }, () => {
        deck.shuffle();
        deck.slide(0, 0, 0);
      });
        
      settings.checkKey = options.checkKey ? options.checkKey.toLowerCase() : "c";
      settings.checkKeyCode = keyCodes[settings.checkKey] || 67;

      deck.addKeyBinding({ keyCode: settings.checkKeyCode, key: settings.checkKey }, () => {
        let currentSlide = deck.getCurrentSlide();
        let checkBtn = currentSlide.querySelector('.check-button');
        checkBtn.click();
      });

      settings.resetKey = options.resetKey ? options.resetKey.toLowerCase() : "r";
      settings.resetKeyCode = keyCodes[settings.resetKey] || 82;
      
      deck.addKeyBinding({ keyCode: settings.resetKeyCode, key: settings.resetKey }, () => {
        let currentSlide = deck.getCurrentSlide();
        let resetBtn = currentSlide.querySelector('.reset-button');
        resetBtn.click();
      });
      
      settings.allowNumberKeys = options.allowNumberKeys || true;

      settings.disableOnCheck = options.disableOnCheck || false;

      settings.shuffleOptions = options.shuffleOptions || false;

      console.log(settings);
      
      deck.getSlides().forEach((slide, index) => {
        let quizQuestion = slide.classList.contains('quiz-question');
        if (quizQuestion) {
          let cloneCheckBtn = checkButton.cloneNode(true);
          let cloneResetBtn = resetButton.cloneNode(true);
          let clonePrevBtn = prevButton.cloneNode(true);
          let cloneNextBtn = nextButton.cloneNode(true);
          let cloneFeedbackElement = feedbackElement.cloneNode(true);
          let cloneButtonContainer = buttonContainer.cloneNode(true);

          let selectedOption = null;
          let isAnswered = false;

          // ensure each list element has a class of 'option-button'
          let options = slide.querySelectorAll('li');
          options.forEach(opt => {
            opt.classList.add('option-button');
          });

          if (settings.shuffleOptions) {
            options = shuffleArray(Array.from(options));
            options.forEach(opt => {
              slide.appendChild(opt);
            });
          };

          function resetQuiz() {
            options.forEach(opt => {
              opt.classList.remove('selected', 'correct', 'incorrect');
              opt.disabled = false;
            });
            selectedOption = null;
            isAnswered = false;
            cloneFeedbackElement.textContent = '';
          };
          
          options.forEach(option => {
            option.addEventListener('click', function () {
              if (!isAnswered) {
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                selectedOption = this;
                checkButton.disabled = false;
              }
            });
          });
          cloneResetBtn.addEventListener('click', () => {
            console.log("clicked reset");
            resetQuiz();
          });
          clonePrevBtn.addEventListener('click', () => {
            console.log("clicked prev slide")
            deck.prev();
          });
          cloneNextBtn.addEventListener('click', () => {
            console.log("clicked next slide")
            deck.next();
          });
          slide.appendChild(cloneButtonContainer);
          cloneButtonContainer.appendChild(cloneCheckBtn);
          cloneButtonContainer.appendChild(cloneResetBtn);
          cloneButtonContainer.appendChild(clonePrevBtn);
          cloneButtonContainer.appendChild(cloneNextBtn);

          slide.appendChild(cloneFeedbackElement);

          cloneCheckBtn.addEventListener('click', function () {
            console.log("clicked check")
            // console.log(cloneFeedbackElement);
            if (selectedOption && !isAnswered) {
              isAnswered = true;
              // console.log(selectedOption);
              //check if selected option has span and if it has class of correct
              let isCorrect = selectedOption.querySelector('span') && selectedOption.querySelector('span').classList.contains('correct');
              if (isCorrect) {
                selectedOption.classList.add('correct');
                cloneFeedbackElement.textContent = 'Correct!';
                cloneFeedbackElement.style.color = '#27ae60';
              } else {
                selectedOption.classList.add('incorrect');
                cloneFeedbackElement.textContent = 'Incorrect!';
                cloneFeedbackElement.style.color = '#c0392b';
              }

              if (settings.disableOnCheck) {
                checkButton.disabled = true;
                resetButton.disabled = false;
                nextButton.disabled = false;
                options.forEach(opt => opt.disabled = true);
              } else {
                isAnswered = false;
                checkButton.disabled = false;
                options.forEach(opt => opt.disabled = false);
              }
            }
          });

          if (settings.allowNumberKeys) {
            document.addEventListener('keydown', function (event) {
              // Assuming option buttons have class names like 'option-button' and are meant to be selected in order
              // const optionButtons = document.querySelectorAll('.option-button');

              // The key values for number keys are '1', '2', '3', etc.
              // Convert the key to an index (e.g., '1' becomes 0)
              const index = parseInt(event.key, 10) - 1;

              // Check if the pressed key is a number that corresponds to an option button
              if (index >= 0 && index < options.length) {
                // Simulate a click on the corresponding option button
                options[index].click();
              }
            });
          };
        }

      });

    },
  };
};

