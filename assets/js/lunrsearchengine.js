---
layout: null
sitemap: false
---

{% assign counter = 0 %}
var documents = [{% for page in site.posts %}{
    "id": {{ counter }},
    "url": "{{ site.url }}{{site.baseurl}}{{ page.url }}",
    "title": "{{ page.title }}",
    "body": "{{ page.date | date: "%Y/%m/%d" }} - {{ page.content | markdownify | replace: '.', '. ' | replace: '</h2>', ': ' | replace: '</h3>', ': ' | replace: '</h4>', ': ' | replace: '</p>', ' ' | strip_html | strip_newlines | replace: '  ', ' ' | replace: '"', ' ' }}"{% assign counter = counter | plus: 1 %}
    }{% if forloop.last %}{% else %}, {% endif %}{% endfor %}];

function lunr_search(event) {
    event.preventDefault();
    $('#lunrsearchresults').show( 400 );
    $( "body" ).addClass( "modal-open" );
    document.getElementById('lunrsearchresults').innerHTML = '<div id="resultsmodal" class="modal fade show d-block"  tabindex="-1" role="dialog" aria-labelledby="resultsmodal"> <div class="modal-dialog shadow-lg" role="document"> <div class="modal-content"> <div class="modal-header" id="modtit"> <button type="button" class="close" id="btnx" data-dismiss="modal" aria-label="Փակել"> &times; </button> </div> <div class="modal-body"> <ul class="mb-0"> </ul>    </div> <div class="modal-footer"><button id="btnx" type="button" class="btn btn-danger btn-sm" data-dismiss="modal">Փակել</button></div></div> </div></div>';
    var searchInput = document.getElementById('lunrsearch').value;
    var term = searchInput.trim();
    var resultsCount = 0;
    if(term) {
        document.getElementById('modtit').innerHTML = "<h5 class='modal-title'>Որոնման արդիւնքները</h5>" + document.getElementById('modtit').innerHTML;
        //put results on the screen.   
        const regexpValue = term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regexp = new RegExp(term, "i");
        for(var i = 0; i < documents.length; i++){
            if(documents[i]['title'].search(regexp) >= 0 || documents[i]['body'].search(regexp) >= 0){
                var url = documents[i]['url'];
                var title = documents[i]['title'];
                var body = documents[i]['body'].substring(0,160)+'...';
                document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML + "<li class='lunrsearchresult'><a href='" + url + "'><span class='title'>" + title + "</span><br /><small><span class='body'>"+ body +"</span></small></a></li>";
                resultsCount++;
            }
        }
        if(resultsCount === 0){
            document.querySelectorAll('#lunrsearchresults ul')[0].innerHTML = "<li class='lunrsearchresult'>Ցաւօք ոչինչ չգտնուեց ։(</li>";
        }
    }
    return false;
}
    
$(function() {
    $("#lunrsearchresults").on('click', '#btnx', function () {
        $('#lunrsearchresults').hide( 5 );
        $( "body" ).removeClass( "modal-open" );
    });
});
