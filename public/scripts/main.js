$(document).ready(function() {

    $(document).on('click', '.traveled', function() {
        var thisCountry = $(this).text();

        $.post('/traveled', {
            traveledCountry: thisCountry
        }, function(data) {
            console.log("traveled: ", data)
        })
    })


    $(document).on('click', '.load-countries', function() {

        $.get('/countries', function(data) {
            console.log(data);
            var $uList = $('<ul>')
            $uList.append(data.map(function(country) {
                var li = $('<li>', {
                    text: country.name
                });
                var chkB = $('<input>', {
                    type: 'checkbox',
                    text: country.name,
                    class: 'traveled'
                });
                if (country.hasOwnProperty('traveled')) {
                    country.traveled ? chkB.prop('checked', true) : chkB.prop('checked', true)
                }
                li.append(chkB);
                return li;
            }))
            $('body').append($uList);

        })

    })

    $(document).on('click', '.search-countries', function() {

        var searchQuery = $('.query').val();

        if (searchQuery === '') {
            console.log("not searching");
            return;
        };

        console.log(searchQuery)

        $.get('/search', {
            searchQuery: searchQuery
        }, function(data) {
            console.log(data);
            var $uList = $('<ul>')
            $uList.append(data.map(function(country) {
                var li = $('<li>', {
                    text: country.name
                });
                var chkB = $('<input>', {
                    type: 'checkbox',
                    text: country.name,
                    class: 'traveled'
                });
                if (country.hasOwnProperty('traveled')) {
                    country.traveled ? chkB.prop('checked', true) : chkB.prop('checked', true)
                }
                li.append(chkB);
                return li;
            }))
            $('body').append($uList);
        })

    })

})