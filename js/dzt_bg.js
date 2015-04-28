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
//	检查是否有消息需要弹出提示
	if($(".top-msg-container .top-msg").size()>0){
		var msg = $(".top-msg-container .top-msg");
		var delay = msg.attr("delay") == undefined? 3:Math.abs(parseInt(msg.attr("delay")));
		setTimeout(function(){
			msg.addClass("show")
		},300);

		setTimeout(function(){
			msg.removeClass("show");
		},delay*1000);
	}

    $(".nav-tree-box dt").each(function(i){
      if(!$(this).next("dd").is(":empty")){
//        $(this).hover(
//            function(e){
//                if($(this).next("dd").is(":visible")){
//                    $(this).addClass("fold");
//                }else{
//                    $(this).addClass("unfold");
//                }
//            },function(e){
//                $(this).removeClass("fold");
//                $(this).removeClass("unfold");
//            });
        $(this).click(function(e){
            $(this).next("dd").toggleClass("hide");
//            $(this).toggleClass("fold");
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


function getEChartOption(){
    var option = {
                    animationDuration:500,
                    animationEasing:'CircularInOut',
                    title : {
                        text: '按小时成交趋势',
                        itemGap:17,
                        textStyle:{
                            color: '#222',
                            fontFamily:'Arial,Helvetica,"微软雅黑","黑体","Hiragino Sans GB","WenQuanYi Micro Hei",sans-serif',
                            fontWeight:'normal',
                            fontSize:16
                        },
//                        subtext: '11月10日-12月8日'
                    },
                    color : ['#f35a4a','#4184f3'],
                    grid : {
                        x : 60,
                        y : 50,
                        x2 : 30,
                        borderWidth : 0
                    },
                    tooltip : {
                        trigger: 'axis',
                        showDelay:0,
                        hideDely:100,
                        transitionDuration:0,
                        backgroundColor:'rgba(255,255,255,0.9)',
                        borderColor:'#e7e7e7',
                        borderRadius:2,
                        borderWidth:1,
                        textStyle:{ color:'#777'},
//                        formatter:'时间：{b}:00<br/>{a}：{c} 件',
                        formatter:function(params,ticket,callback){
                            var res = "时间：" + params[0].name + ' 时 - ' + (parseInt(params[0].name)+1) + ' 时';
                            res += '<br/>' + params[0].seriesName + '：' + params[0].value + " 件";
                            return res;
                        },
                        axisPointer:{
                            type : 'line',
                            lineStyle : {
                                color: '#999',
                                width: 1,
                                type: 'dotted'
                            },
                            crossStyle : {
                                color: '#999',
                                width: 1,
                                type: 'dashed'
                            },
                            shadowStyle : {
                                size: 'auto',
                                color: 'rgba(150,150,150,0.3)'
                            }
                        }
                    },
                    legend: {
                        data:['销量'],
                        orient:'horizontal',
                        x:'left',
                        y:'bottom'
                    },
                    toolbox: {
                        show : true,
                        itemSize:12,
                        color:['#FF6B6B','#4184f3','#C7F464','#556270','#C44D58','#4ECDC4'],
                        feature : {
                            mark : {show: false},
                            dataView : {show: false, readOnly: false},
                            magicType : {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: false}
                        }
                    },
                    calculable : false,
                    xAxis : [
                        {
                            type : 'category',
                            splitLine:{show : false},
                            boundaryGap : true,
                            axisLine:{show:false},//边轴
                            axisTick:{show:false},
                            data : ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLine:{show:false},//边轴
                            splitNumber:6,
                            splitLine:{lineStyle:{type:'dotted'}},
                            axisLabel : {
                                formatter: function(value){
                                    return parseInt(value)+' 件';
                                }
                            }
                        }
                    ],
                    series : [
                        {
                            name:'销量',
                            type:'line',
                            smooth:true,
                            barMaxWidth:16,
                            symbolSize:3,
                            itemStyle:{
                                normal: {
                                    label : {
                                        show: true,
                                        position: 'top',
                                        textStyle:{
                                            fontSize:12,
//                                            color:"#4184f3"//标记文字颜色
                                        },
                                    },
//                                    lineStyle : {
//                                        color:'#4184f3'//线条
//                                    },
//                                    areaStyle : {
//                                        color:'rgba(65,132,243,0.2)',
//                                        type:'default'
//                                    },
                                },
                                emphasis : {

                                }
                            },
                            data:[10,5,1,0,0,0,0,3,8,16,29,26,31,29,33,36,34,38,27,29,35,36,42,15]
                        }
                    ]
                };
    return option;
}
