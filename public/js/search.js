var allCheckboxes = document.querySelectorAll('input[type=checkbox]');
var allPlayers = Array.from(document.querySelectorAll('.ctgr'));
var checked = {};

getChecked('category');

Array.prototype.forEach.call(allCheckboxes, function (el) {
    el.addEventListener('change', toggleCheckbox);
  });

  function toggleCheckbox(e) {
    getChecked(e.target.name);
    setVisibility();
  }

  function getChecked(name) {
    checked[name] = Array.from(document.querySelectorAll('input[name=' + name + ']:checked')).map(function (el) {
      return el.value;
    });
  }

  function setVisibility() {
    allPlayers.map(function (el) {
      var category = checked.category.length ? _.intersection(Array.from(el.classList), checked.category).length : true;
      if (category) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    });
  }