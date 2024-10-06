function apiSearch() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '017a490133c24f59920cd5581e6814f8'
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';
            for (i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);
            $('#searchResults').css('visibility', 'visible').dialog({
                width: $(window).width(),
                height: $(window).height(),
                close: function () {
                    $(this).css('visibility', 'hidden');
                }
            });
        })
        .fail(function () {
            alert('error');
        });
}

function feelingLucky() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '017a490133c24f59920cd5581e6814f8'
        }
    })
        .done(function (data) {
            if (data.webPages && data.webPages.value.length > 0) {
                var randomIndex = Math.floor(Math.random() * data.webPages.value.length);
                window.location.href = data.webPages.value[randomIndex].url;
            } 
        })
        .fail(function () {
            alert('error');
        });
}

document.getElementById('searchButton').addEventListener('click', apiSearch);
document.getElementById('luckyButton').addEventListener('click', feelingLucky);

var images = [
    'ocean.jpg',
    'ocean2.jpg',
    'ocean3.jpg',
    'ocean4.jpg'
];
var currentImageIndex = 0;

function changeBackgroundImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    document.body.style.backgroundImage = `url('${images[currentImageIndex]}')`;
}

document.getElementById('searchEngineName').addEventListener('click', changeBackgroundImage);

function showCurrentTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    var currentTime = hours + ':' + minutes + ' ' + ampm;
    $('#time').text(currentTime);
    $('#time').css('visibility', 'visible').dialog({
        close: function () {
            $(this).css('visibility', 'hidden');
        }
    });
}

document.getElementById('timeButton').addEventListener('click', showCurrentTime);