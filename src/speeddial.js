/***************************************************************************
   Copyright 2015 Ramkumar Shankar

   This file is part of the Opera extension Speedy Hacker News.

   Speedy Hacker News is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   Speedy Hacker News is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with Speedy Hacker News.  If not, see <http://www.gnu.org/licenses/>.
***************************************************************************/

window.addEventListener('load', function () {

    var dataItems = [];
    var url = "https://hacker-news.firebaseio.com/v0/topstories.json";
    var my_JSON = '';
    var timer = null;

    function init() {
      opr.speeddial.update({
        title: "Hacker News",
      });
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, false);
      xhr.send(null);
      my_JSON = JSON.parse(xhr.responseText);
      processData(my_JSON);
    }

    function processData(my_JSON) {
        var item = '';
        var itemUrl = '';
        var item_JSON = '';
        for (i=0; i < 10; i++) {
          item = my_JSON[i];
          itemUrl = "https://hacker-news.firebaseio.com/v0/item/" + item + ".json";
          var xhr = new XMLHttpRequest();
          xhr.open("GET", itemUrl, false);
          xhr.send(null);
          item_JSON = JSON.parse(xhr.responseText);
          dataItems.push({
              title      : item_JSON.title,
              url        : item_JSON.url,
          });
        }
        updateDisplay();
    }

    function updateDisplay(i) {
      var index = (i||0) % dataItems.length;
      var next = index + 1;
      document.getElementById('title').textContent = dataItems[index].title;

      opr.speeddial.update({
        url: dataItems[index].url,
      });

      timer = setTimeout(function(){updateDisplay(next)}, 10 * 1000);
    }

    init();

}, false);
