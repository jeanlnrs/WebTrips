$(function() {
  var allCheckboxes = document.querySelectorAll('input[type=checkbox]');
  var allPlayers = Array.from(document.querySelectorAll('.ctgr'));
  var checked = {};
  getChecked('category');

function showProducts(minPrice, maxPrice) {
  $("#products\\.prc").hide().filter(function() {
      var price = parseInt($(this).data("sprice"), 10);
      return price >= minPrice && price <= maxPrice;
    }).show();
  }

  var options = {
      range: true,
      min: 0,
      max: 7000,
      values: [0, 7000],
      slide: function(event, ui) {
          var min = ui.values[0],
              max = ui.values[1];

          $("#amount").val("$" + min + " - $" + max);
          showProducts(min, max);
      }
  }, min, max;

  $("#slider-range").slider(options);

  min = $("#slider-range").slider("values", 0);
  max = $("#slider-range").slider("values", 1);

  $("#amount").val("$" + min + " - $" + max);

  showProducts(min, max);
  
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
});

function search_animal() {
  let input = document.getElementById('searchbar').value 
  input=input.toLowerCase(); 
  let x = document.getElementsByClassName('search');
  console.log(input);
    
  for (i = 0; i < x.length; i++) {  
      if (!x[i].innerHTML.toLowerCase().includes(input)) { 
          x[i].style.display="none"; 
      } 
      else { 
          x[i].style.display="block";                  
      } 
  } 
}