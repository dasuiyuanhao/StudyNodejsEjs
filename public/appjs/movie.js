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
                url: '/movie/add',
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
    $scope.id = $scope.movie["_id"];
    $scope.getMovie = function(){
        if($scope.id && $scope.id!=""){
            $http({url: '/getMovie', method: "GET",
                params:{id:$scope.id}})
                .success(function(data, status, headers, config) {
                    $scope.movie = data;
                })
                .error(function(data, status, headers, config) {
                    $scope.movie = data;
                    //$("#msg").html()
                });
        }

    };
    $scope.submit = function(){
        var strURL="/movie/add";
        //if($scope.id && $scope.id!=""){
        //    strURL="/movie/update"; //更新
        //}
        //else{
        //    strURL="/movie/add"; //新增
        //
        //}
        $http({url: strURL, method: "POST",
            params:{"content" : $scope.movie}
        })
            .success(function(data, status, headers, config) {
                if(data.success){
                    if(data.data)
                        $scope.movie = data.data;
                    alert("保存成功");
                    //隐藏form
                    //$("#movieEditor").hide();
                }
                else{
                    $("#msg").html("保存出错");
                }
            })
            .error(function(data, status, headers, config) {
                //$scope.movie = data;
                $("#msg").html("保存出错");
            });
        $scope.getMovie();
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

