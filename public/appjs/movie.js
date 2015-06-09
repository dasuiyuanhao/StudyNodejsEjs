/**
 * Created by Administrator on 2015/5/26.
 */
/**
 * Created by Administrator on 2015/5/26.
 */
$(function() {
    var mdata={};
    var url = '/data/movie.json';
    $.getJSON(url, function(data) {
        mdata=data;
        render_editor_form(mdata);
        render_event_form(mdata);
    });
    var render_editor_form=function(data){
        $('#c_editor').val($.toJSON(data));
    };
    //插入JSON数据
    var render_event_form=function(){
        $('#c_save').on('click',function(event){
            var data = {};
            //data['content'] = mdata;
            data.content = mdata;
            $.ajax({
                type: "POST",
                url: '/movie/addOrUpdate',
                data: data,
                success: function (data, textStatus){
                    if(data.success){
                        $('#msg').html('成功保存!');
                        //$('#msg').addClass('alert alert-success');
                        //$(location).attr('href','/movie/'+mdata.name);
                        location.reload();
                    } else {
                        $('#msg').html(data.err);
                        //$('#msg').addClass('alert alert-error');
                    }
                }
            });
        });
    };

    //隐藏编辑框
    $("#movieEditor").hide();
});

//获取电影列表
function GetAllData(){
    $.ajax({
        type: "GET",
        url: '/movie/getAll',
        data: null,
        success: function (data, textStatus){
            if(data){
                $("#divListAll").html($.toJSON(data));
            }
        }
    });

}

//查询绑定
var app = angular.module('movieManageApp', []);
//app中的公共内容
app.factory('instance', function(){
    return {};
});
//app中的主体内容
app.controller('bodyContentController', function($scope, $http) {
    //注册事件
    //编辑电影
    $scope.$on('requestEditMovieEvent', function (e,data) {
        $scope.$broadcast('editMovieEvent',data);
    });
});

app.controller('tableController', function($scope, $http) {
    $scope.movies = [];
    $scope.contains = '';
    $scope.pageSize = 5;
    $scope.pageIndex = 1;
    $scope.skipEnd = 0;
    $scope.sortFields = ['_id','name', 'publish'];
    $scope.sortField ="_id";
    $scope.direction = "asc";
    $scope.getMovies = function(){
        $http({url: '/movie/query', method: "GET",
            params:{ pageSize:$scope.pageSize,
                pageIndex:$scope.pageIndex,
                sort:$scope.sortField,
                direction:$scope.direction,
                contains:$scope.contains }})
            .success(function(data, status, headers, config) {
                $scope.movies = data;
                $scope.skipEnd = $scope.pageSize *($scope.pageIndex-1) + $scope.movies.length;
            })
            .error(function(data, status, headers, config) {
                $scope.movies = [];
                $scope.skipEnd = $scope.skip + $scope.movies.length;
            });
    };
    $scope.find = function(){
        $scope.pageIndex = 1;
        $scope.skipEnd = 0;
        $scope.getMovies();
    };
    $scope.next = function(){
        if($scope.movies.length == $scope.limit){
            //$scope.skip += parseInt($scope.limit);
            $scope.pageIndex++;
            $scope.getMovies();
        }
    };
    $scope.prev = function(){
        //if($scope.skip > 0){
        //    if($scope.skip >= parseInt($scope.limit)){
        //        $scope.skip -= parseInt($scope.limit);
        //    } else{
        //        $scope.skip = 0;
        //    }
        //    $scope.getMovies();
        //}
        if($scope.pageIndex > 1){
            $scope.pageIndex--;
            $scope.getMovies();
        }
    };
    //编辑
    $scope.editMovie = function(data) {
        //angular.forEach(panes, function(pane) {
        //    pane.selected = false;
        //});
        //data.selected = true;

        var jqEditor=$("#movieEditor");
        jqEditor.show().focus();
        $("html,body").animate({scrollTop:jqEditor.offset().top},1000);
        //基于事件的,往父辈发送事件
        $scope.$emit('requestEditMovieEvent', data);

    };

    $scope.getMovies();
});

//编辑内容
app.controller('movieEditController', function($scope, $http) {
    $scope.movie = {
        name : "",
        alias : "",
        publish : "",

        images :{
            coverSmall:"",
            coverBig:"",
        },
        source :[],
        alias:""
    };
    //基于事件的监听
    $scope.$on('editMovieEvent', function(e, data) {
        $scope.movie = data;
        $scope.getMovie();
    });

    //$scope.id = $scope.movie["_id"];
    $scope.getMovie = function(){
        $scope.id = $scope.movie["_id"];
        if($scope.id && $scope.id!=""){
            var para={"id":$scope.id};
            $.ajax({
                type: "GET",
                url: '/movie/getMovie',
                data: para,
                success: function (data, textStatus){
                    if(data){
                        $scope.movie = data;
                    }
                    else{
                        $("#msg").html("获取数据出错");
                    }
                }
            });
        }
    };
    //提交
    $scope.submit = function(){
        var strURL="/movie/addOrUpdate";
        //if($scope.id && $scope.id!=""){
        //    strURL="/movie/update"; //更新
        //}
        //else{
        //    strURL="/movie/add"; //新增
        //
        //}
        var data = {};
        data.content = $scope.movie;
        //$http({url: strURL, method: "POST",
        //    params:data
        //})
        //    .success(function(data, status, headers, config) {
        //        if(data.success){
        //            if(data.data)
        //                $scope.movie = data.data;
        //            alert("保存成功");
        //            //隐藏form
        //            //$("#movieEditor").hide();
        //            location.reload();
        //        }
        //        else{
        //            $("#msg").html("保存出错");
        //        }
        //    })
        //    .error(function(data, status, headers, config) {
        //        //$scope.movie = data;
        //        $("#msg").html("保存出错");
        //    });
        $.ajax({
            type: "POST",
            url: '/movie/addOrUpdate',
            data: data,
            success: function (data, textStatus){
                if(data.success){
                    $('#msg').html('成功保存!');
                    //$('#msg').addClass('alert alert-success');
                    //$(location).attr('href','/movie/'+mdata.name);
                    location.reload();
                } else {
                    $('#msg').html(data.err);
                    //$('#msg').addClass('alert alert-error');
                }
            }
        });

        //$scope.getMovie();
    };
    //取消
    $scope.cancel = function(){
        $scope.movie={};
        $("#movieEditor").hide(500);
    };
    $scope.getMovie();
});




//参考学习代码
app.directive('richTabs', function() {
    return { restrict: 'E', transclude: true,
        scope: {},
        controller: function($scope) {
            var panes = $scope.panes = [];
            $scope.select = function(pane) {
                angular.forEach(panes, function(pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            };
            this.addPane = function(pane) {
                if (panes.length == 0) {
                    $scope.select(pane);
                }
                panes.push(pane);
            };
        },
        templateUrl: '/static/rich_tabs.html'
    };
});
app.directive('richPane', function() {
    return { require: '^richTabs', restrict: 'E',
        templateUrl: '/static/rich_pane.html',
        transclude: true, scope: { title: '@' },
        link: function(scope, element, attrs, tabsCtrl) {
            tabsCtrl.addPane(scope);
        }
    };
});
app.directive('richDraggable', function($document, $window) {
    return function(scope, element, attr) {
        var startX = 0, startY = 0;
        var x = Math.floor((Math.random()*500)+40);
        var y = Math.floor((Math.random()*360)+40);
        element.css({
            position: 'absolute',
            cursor: 'pointer',
            top: y + 'px',
            left: x + 'px'
        });
        element.on('mousedown', function(event) {
            event.preventDefault();
            startX = event.pageX - x;
            startY = event.pageY - y;
            $document.on('mousemove', mousemove);
            $document.on('mouseup', mouseup);
        });
        function mousemove(event) {
            y = event.pageY - startY;
            x = event.pageX - startX;
            element.css({
                top: y + 'px',
                left:  x + 'px'
            });
        }
        function mouseup() {
            $document.unbind('mousemove', mousemove);
            $document.unbind('mouseup', mouseup);
        }
    };
});

//删除并重建索引
function DeletAndCreateAllIndex(){
    if(confirm("确定要删除并重建所有索引")){
        $.ajax({
            type: "POST",
            url: '/movie/DeletAndCreateAllIndex',
            data: null,
            success: function (data, textStatus){
                if(data.success){
                    //$('#msg').html('成功保存!');
                    alert("执行成功！");
                    $('#msg').html("执行成功！共索引条数"+data.indexCount);
                } else {
                    //$('#msg').html(data.err);
                    alert("执行失败！");
                    $('#msg').html("执行失败！"+data.err);
                }
            },
            error:function (XMLHttpRequest, textStatus, errorThrown) {
                // 通常 textStatus 和 errorThrown 之中
                // 只有一个会包含信息
                //this; // 调用本次AJAX请求时传递的options参数
                alert("执行失败！");
                $('#msg').html("执行失败！"+errorThrown + " <br/> " +XMLHttpRequest.responseText);
            }
        });
    }
}
