$(function(){
    // 照着手册实现的 - -!
    $.getJSON("data/members.json", function(members){
        $('#marathon-total').html(members.length);
        var items = [];
        $.each(members, function(key, member) {

            var html = "<div class='member'><h3><a href='https://github.com/"+member.username+"'>" + member.username + "</a> ";
            if (member.for_hire == true) {
                html += '(for hire)</h3>';
            } else {
                html += '</h3>';
            }
            html += '<div class="contributions">';
            html += '<iframe scrolling="no" src="http://jsonproxy.sinaapp.com/index.php?username='+member.username+'"></iframe>';
            html += '</div></div>';
            items.push(html);
        });
        var list = items.join("");
        $('#members').html(list);

    });
});