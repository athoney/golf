# Golf Game


### Favorite Code:
Paste this code in the console to figure out which elements are causing the horizontal scroll bar to appear (aka overflow x). Then, set elements to `max-width: 100%;` to fix the problem.
```js
var docWidth = document.documentElement.offsetWidth;
[].forEach.call(
  document.querySelectorAll('*'),
  function(el) {
    if (el.offsetWidth > docWidth) {
      console.log(el);
    }
  }
);
```