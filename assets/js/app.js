(function($) {
  'use strict';
  $(function() {
    var html= "<div class='am-topbar-brand'><strong>咪咕中信<small> 后台监控系统</small></strong></div>"+
        "<button class='am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-success am-show-sm-only'"+ "data-am-collapse="+"{target: '#topbar-collapse'}>" +
        "<span class='am-sr-only'>导航切换</span> " +
        "<span class='am-icon-bars'></span>" +
        "</button>"
        +"<div class='am-collapse am-topbar-collapse' id=topbar-collapse>" +
        "<ul class='am-nav am-nav-pills am-topbar-nav am-topbar-right admin-header-list'>"+
            //"<li><a href='javascript:;'><span class=am-icon-envelope-o></span> 收件箱 <span class='am-badge am-badge-warning'>5</span></a></li>"+
            "<li class='am-dropdown' id='doc-dropdown-js'>"
              +"<a class='am-dropdown-toggle' href='javascript:; id='doc-dropdown-toggle'><span class=am-icon-users></span> 管理员 <span class='am-icon-caret-down'></span></a>"
              +"<ul class='am-dropdown-content'>"
              +"<li><a href='#'><span class='am-icon-user'></span> 资料</a></li>"
              +"<li><a href='#'><span class='am-icon-cog'></span> 设置</a></li>"
              +"<li><a href='#'><span class='am-icon-power-off'></span> 退出</a></li>"
              +"</ul>"
            +"</li>"
          +"<li class=am-hide-sm-only><a href=javascript:; id=admin-fullscreen><span class=am-icon-arrows-alt></span> <span class=admin-fullText>开启全屏</span></a></li>"
        "</ul>"
        +"</div>";
    $("#heade").append(html);

    var elHtml = "";
    elHtml += "<div class='am-offcanvas-bar admin-offcanvas-bar'>"+"<ul class='am-list admin-sidebar-list'>";
    $.ajax({
      url:"data/menu.json",
      type: "GET",//请求方式为get
      dataType: "json", //返回数据格式为json
      success:function(result){

        for(var j = 0; j<result.data.length; j++){
          if("secondlevel" in result.data[j]){
            elHtml +="<li class='admin-parent'>"
            +"<a href='"+result.data[j].router+"' class='am-cf am-toggle'><span class='am-icon-file' style='margin-right: 15px;'></span>"+ result.data[j].title +"<span class='am-icon-angle-right am-fr am-margin-right'></span></a>"+"<ul class='am-list am-collapse admin-sidebar-sub collapse-nav'>"
            for(var i =0; i<result.data[j].secondlevel.length; i++){
              elHtml +="<li><a href='"+result.data[j].router+"' class='am-cf'><span class="+result.data[j].secondlevel[i].icon+" style='margin-right: 15px;'></span>"+ result.data[j].secondlevel[i].title+'<span class=am-fr></span></a></li>'
            }
            elHtml +="</ul><li>"
          }else {
            elHtml += "<li><a href='"+result.data[j].router+"'><span style='margin-right: 15px;' class="+result.data[j].icon+"></span>"+ result.data[j].title+"</a></li>";
          }
        }
        elHtml+="</ul></div>";
        $("#admin-offcanvas").html(elHtml);


        $(".am-toggle").on('click',function(){
          $(this).siblings(".collapse-nav").collapse('toggle');
          return false;
        });
      },
    })



    var $dropdown = $('#doc-dropdown-js');
    $('.am-dropdown-toggle').on('click', function() {
      $dropdown.dropdown('toggle');
      return false;
    });




    var $fullText = $('.admin-fullText');
    $('#admin-fullscreen').on('click', function() {
      $.AMUI.fullscreen.toggle();
    });

    $(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
      $fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
    });
  });
})(jQuery);
