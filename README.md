# 25 + 5 Clock :clock2:

This project is part of the FreeCodeCamp's Front End Certification.
It was built using [React](https://reactjs.org/)

## Functionality :white_check_mark:

-  When I click the element with the id of reset, any running timer should be stopped, the value within id="break-length" should return to 5, the value within id="session-length" should return to 25, and the element with id="time-left" should reset to its default state.

-  I should not be able to set a session or break length to <= 0 or > 60.

- When I first click the element with id="start_stop", the timer should begin running from the value currently displayed in id="session-length", even if the value has been incremented or decremented from the original value of 25.

- If the timer is running, the element with the id of time-left should display the remaining time in mm:ss format (decrementing by a value of 1 and updating the display every 1000ms).

- If the timer is running and I click the element with id="start_stop", the countdown should pause.

- If the timer is paused and I click the element with id="start_stop", the countdown should resume running from the point at which it was paused.

- When a countdown reaches zero (NOTE: timer MUST reach 00:00), and a new countdown begins, the element with the id of timer-label should display a string indicating a break/session has begun.

- When a countdown reaches zero (NOTE: timer MUST reach 00:00), a sound indicating that time is up should play. This should utilize an HTML5 audio tag and have a corresponding id="beep".

[25 + 5 Clock](https://filipy94.github.io/react-clock/)


## How To Run FCC Tests

Run any http server at root dir, example:

    $ python -m SimpleHTTPServer 8000