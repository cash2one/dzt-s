//后台凡是带有nav导航，需要监视div大小变化，都需要包含此js
(function ($, h, c) {
    var a = $([]),
        e = $.resize = $.extend($.resize, {}),
        i,
        k = "setTimeout",
        j = "resize",
        d = j + "-special-event",
        b = "delay",
        f = "throttleWindow";
    e[b] = 250;
    e[f] = true;
    $.event.special[j] = {
        setup: function () {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.add(l);
            $.data(this, d, {
                w: l.width(),
                h: l.height()
            });
            if (a.length === 1) {
                g();
            }
        },
        teardown: function () {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.not(l);
            l.removeData(d);
            if (!a.length) {
                clearTimeout(i);
            }
        },
        add: function (l) {
            if (!e[f] && this[k]) {
                return false;
            }
            var n;

            function m(s, o, p) {
                var q = $(this),
                    r = $.data(this, d);
                r.w = o !== c ? o : q.width();
                r.h = p !== c ? p : q.height();
                n.apply(this, arguments);
            }
            if ($.isFunction(l)) {
                n = l;
                return m;
            } else {
                n = l.handler;
                l.handler = m;
            }
        }
    };

    function g() {
        i = h[k](function () {
                a.each(function () {
                    var n = $(this),
                        m = n.width(),
                        l = n.height(),
                        o = $.data(this, d);
                    if (m !== o.w || l !== o.h) {
                        n.trigger(j, [o.w = m, o.h = l]);
                    }
                });
                g();
            },
            e[b]);
    }
})(jQuery, this);

//后台导航及用户弹窗JS
var user_pop_html='<div id="user-menu" class="user-menu"><ul><li><a href="#"><span class="ico-font">&#xe605;</span>用户设置</a></li><li><a href="#"><span class="ico-font">&#xe607;</span>客服帮助</a></li><li><a href="#"><span class="ico-font">&#xe615;</span>退出</a></li></ul></div>'

$(function(){
    $(".nav-tree-box dt").each(function(i){
      if(!$(this).next("dd").is(":empty")){
        $(this).hover(
            function(e){
                if($(this).next("dd").is(":visible")){
                    $(this).addClass("fold");
                }else{
                    $(this).addClass("unfold");
                }
            },function(e){
                $(this).removeClass("fold");
                $(this).removeClass("unfold");
            });
        $(this).click(function(e){
            $(this).next("dd").toggleClass("hide");
            $(this).toggleClass("fold");
            $(this).toggleClass("unfold");
        })
      }else{
        $(this).click(function(e){
            $(".nav-tree-box a").removeClass("checked");
            $(this).find("a").toggleClass("checked");
        });
      }
    });
    $("#user-button").popover({
        trigger:'focus',
        placement:'bottom',
        html:true,
        content:user_pop_html
    });
    $("#pack-toggle-trigger").click(function(){
        $("body").toggleClass("hide-nav");
    });
})
function loadingPointer(div_id,des){
    html = '<div class="loading-point"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div>';
    if(des!=null & des!="" & des != undefined){
        html += '<div class="text-danger">' + des + '</div>';
    }
    html += '</div>';
    $("#"+div_id).html(html);
}
