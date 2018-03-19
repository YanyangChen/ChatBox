import data  from "./data2.js";
const  myFunction6 = () => {

    //create searching object and its attributes
    let index = elasticlunr(function () {
        this.addField('title');
        this.addField('body');
        this.addField('updated');
        this.addField('comment');
        this.setRef('id');
    });



    // add data file from jason objects
    // let data = data2.data;
    for (let i = 0; i < data.length; i++) {
        index.addDoc(data[i]);
    }

    //create an in-memory object for comparison
    let memdoc ={
        "id" : "compare",
        "title": document.getElementById("Text4Search").value,
        "body" : document.getElementById("Text4Search").value
    }
    index.addDoc(memdoc);

    //start searching after setting the search options and then return the result stors it in rst
    let rst = index.search(document.getElementById("Text4Search").value, {
        fields: {
            title: {boost: 1,  bool: "OR"}, //boost: weighting     boll:"AND" or "OR" mode
            body: {boost: 0}
        }
    });

    console.log(rst);
    document.getElementById("searchbox").setAttribute("style","margin-left: 200px; margin-top: 200px");
    $("#srch_rst_ul").empty(); //clear the div with id srch_rst
    // $("#srch_rst_ul").setAttribute("style","width:994px")
    let fullmark = rst[0].score;

    let td = $('<td></td>');
    td.attr("align","center");
    //iterate each result object from the result array
    for (let i = 1; i < rst.length; i++) {
        let li = $('<div></div>').attr("id", rst[i].doc.id);
        // var supdate = $('<Strong></Strong>').text("Last update: ");
        let p0 = $('<p></p>').html("<Strong>Last update: </Strong>" + rst[i].doc.updated.substring(0,rst[i].doc.updated.length-11) + "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"
            + "<strong>Relevancy: </strong>" + (rst[i].score/fullmark * 100).toPrecision(4)+ "%");;


        let h2 = $('<h4></h4>').text(i+".\u00A0\u00A0"+ rst[i].doc.title);
        if(rst[i].doc.comment.includes("<br/"))
        {
            rst[i].doc.comment = rst[i].doc.comment.replace("<br/","<br/>")
        }
        let p = $('<p></p>').html(rst[i].doc.comment);
        let span = $('<span ng-bind-html="highlight(h2,  document.getElementById("Text4Search").value)"></span>');
        // h2.html(h2a);
        let h2t = h2.html();
        let words = document.getElementById("Text4Search").value;
        let wordsplit = words.split(" ");
        let wordregx =words.replace(new RegExp(" ",'gi'), "\\b|\\b");

        console.log(wordregx);
        // for (var i = 0; i < words.length - 1; i++) {
        h2t=h2t.replace( new RegExp(wordregx,'gi'), "<span class='highlight'>$&</span>");
        // }

        let h2a = $('<a></a>').html(h2t).attr('href', "http://helpdesk.hk.ncs-i.com/browse/WPSII-"+rst[i].doc.id);
        // var h2a = $('<a></a>').html(h2t).attr('href', "");
        h2.html(h2a);
        li.append(span);
        li.append(h2);
        // li.append(p1);
        li.append(p);
        li.append(p0);


        $("#srch_rst_ul").append(li);

    }
    ;

};
window.myFunction6 = myFunction6;
// export default myFunction6;