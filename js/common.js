$(function(){
    $.getJSON("data/members.json", function(members){

        $('#marathon-total').html(members.length);
        var membersTemplate = _.template($('#membersTemplate').html());
        $('#members').html(membersTemplate({ members: members}));

        function mappingStreak(result){
            return {
                yearOfContributions: {
                    total: result[0].span[1].content,
                    range: result[0].span[2].content
                },
                longestStreak: {
                    days:  result[1].span[1].content,
                    range: result[1].span[2].content
                },
                currentStreak: {
                    days:  result[2].span[1].content,
                    range: result[2].span[2].content
                }
            };
        }

        var appendMemberStreak = function (key, member){
            var queryString  = "select * from html where url = 'https://www.github.com/" + member.username + "'";
            queryString     += ' and xpath = \'//*[contains(concat(" ", normalize-space(@class), " "), " contrib-column ")]\'';
            var queryEnv     = 'store://datatables.org/alltableswithkeys';
            var queryData    = { q: queryString, format: 'json', env: queryEnv };
            $.getJSON( "https://query.yahooapis.com/v1/public/yql?", queryData, function(res) {
                result = mappingStreak (res.query.results.div);
                var streakTemplate = _.template($('#streakTemplate').html());
                $('#member_' + member.username).append(streakTemplate(result));
            });
        }

        $.each(members, appendMemberStreak);
    });
});
