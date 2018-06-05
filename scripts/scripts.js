(function($) {

  $(document).ready(function() {
    getComments();

    $submit = $("input[type='submit']"),
      $($submit).click(function() {
        var text1 = $("#text").html();
        if ($.trim(text1).length !== 0) {
          createComment();
        }
      });


    function createCommentsList(data) {
      var commentsMain = $("#comments-list");
      $.each(data, function(i, elem) {

        console.log(elem.createdAt);
        commentsMain.append("<li id=\"" + elem.id + "\">" + elem.content + "<br />"+ elem.createdAt+ "</li>");
      });

      $("#comments-list li").click(function() {
        removeComment(this.id);
      });

    }

    function removeComment(id) {

      $.ajax({
        type: "DELETE",
        url: "https://pure-lake-57348.herokuapp.com/comments/" + id,
        contentType: "application/json",
        success: function() {
          getComments();

        }
      });

    }

    function getComments() {
      if ($("#comments-list li").length !== 0) {
        $("#comments-list li").remove();
      }

      $.ajax({
        type: "GET",
        url: "https://pure-lake-57348.herokuapp.com/comments",
        contentType: "application/json",
        success: function(data) {
          console.log(data);
          createCommentsList(data);
        }
      });
    }

    function createComment() {
      var text = $("#text").html();
      console.log(text);
      _data = {};
      _data = {
        content: text
      };

      $.ajax({
        type: "POST",
        url: "https://pure-lake-57348.herokuapp.com/comments",
        contentType: "application/json",
        data: JSON.stringify(_data),
        success: function(html) {
          getComments();
        }
      });
    }
  });

})(jQuery);


