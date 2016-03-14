// JavaScript Document
//全局变量
var urlbase = "/ShipManagement/";
var dialog;
var waitdialog;
var shipinfodialog;
var userbase;
var map;
var map2;
var gpsinfo;
var selectshipindex;
var locusmarker;
var start = 0;
var count = 20;
var sum = 0;
var xgcbid;
var flag;
var color = ["#300","#600","#900","#C00","#F00","#003","#303","#603","#903","#C03","#F03","#006","#306","#606","#906","#C06","#F06","#009","#309","#609","#909","#C09","#F09","#00C","#30C","#60C","#90C","#C0C","#F0C","#00F","#30F","#60F","#90F","#C0F","#F0F","#030","#330","#630","#930","#C30","#F30","#033","#333","#633","#933","#C33","#F33","#036","#336","#636","#936","#C36","#F36","#039","#339","#639","#939","#C39","#F39","#03C","#33C","#63C","#93C","#C3C","#F3C","#03F","#33F","#63F","#93F","#C3F","#F3F","#060","#360","#660","#960","#C60","#F60","#063","#363","#663","#963","#C63","#F63","#066","#366","#666","#966","#C66","#F66","#069","#369","#669","#969","#C69","#F69","#06C","#36C","#66C","#96C","#C6C","#F6C","#06F","#36F","#66F","#96F","#C6F","#F6F","#090","#390","#690","#990","#C90","#F90","#093","#393","#693","#993","#C93","#F93","#096","#396","#696","#996","#C96","#F96","#099","#399","#699","#999","#C99","#F99","#09C","#39C","#69C","#99C","#C9C","#F9C","#09F","#39F","#69F","#99F","#C9F","#F9F","#0C0","#3C0","#6C0","#9C0","#CC0","#FC0","#0C3","#3C3","#6C3","#9C3","#CC3","#FC3","#0C6","#3C6","#6C6","#9C6","#CC6","#FC6","#0C9","#3C9","#6C9","#9C9","#CC9","#FC9","#0CC","#3CC","#6CC","#9CC","#CCC","#FCC","#0CF","#3CF","#6CF","#9CF","#CCF","#FCF","#0F0","#3F0","#6F0","#9F0","#CF0","#FF0","#0F3","#3F3","#6F3","#9F3","#CF3","#FF3","#0F6","#3F6","#6F6","#9F6","#CF6","#FF6","#0F9","#3F9","#6F9","#9F9","#CF9","#FF9","#0FC","#3FC","#6FC","#9FC","#CFC","#FFC","#0FF","#3FF","#6FF","#9FF","#CFF"];
var alldata = new Array();
var labels = new Array();
var labels1 = new Array();
var seriesOptions = [];
var flightPath;//google map's polyline
var marker_Polyline_Array=new Array();//google map's Polyline_markers
var markersArray=new Array();//google map's markers
var date1format = {
	showMonthAfterYear : true, // 月在年之后显示
	changeMonth : true, // 允许选择月份
	changeYear : true, // 允许选择年份
	dateFormat : 'yy-mm-dd', // 设置日期格式
	closeText : '关闭', // 只有showButtonPanel: true才会显示出来
	duration : 'fast',
	showAnim : 'fadeIn',
	onSelect : function(dateText, inst) // 使结束时间大于开始时间
	{
		var arys = new Array();
		var arys = dateText.split('-');
		$('#date2').datepicker('option', 'minDate',
				new Date(arys[0], arys[1] - 1, arys[2]));
	}
};

var date2format = {
	showMonthAfterYear : true, // 月在年之后显示
	changeMonth : true, // 允许选择月份
	changeYear : true, // 允许选择年份
	dateFormat : 'yy-mm-dd', // 设置日期格式
	closeText : '关闭', // 只有showButtonPanel: true才会显示出来
	duration : 'fast',
	showAnim : 'fadeIn',
	onSelect : function(dateText, inst) {
		var arys = new Array();
		var arys = dateText.split('-');
		$('#date1').datepicker('option', 'maxDate',
				new Date(arys[0], arys[1] - 1, arys[2]));
	}
};
var date3format = {
	showMonthAfterYear : true, // 月在年之后显示
	changeMonth : true, // 允许选择月份
	changeYear : true, // 允许选择年份
	dateFormat : 'yy-mm-dd', // 设置日期格式
	closeText : '关闭', // 只有showButtonPanel: true才会显示出来
	duration : 'fast',
	showAnim : 'fadeIn',
	onSelect : function(dateText, inst) // 使结束时间大于开始时间
	{
		var arys = new Array();
		var arys = dateText.split('-');
		$('#date4').datepicker('option', 'minDate',
				new Date(arys[0], arys[1] - 1, arys[2]));
	}
};

var date4format = {
	showMonthAfterYear : true, // 月在年之后显示
	changeMonth : true, // 允许选择月份
	changeYear : true, // 允许选择年份
	dateFormat : 'yy-mm-dd', // 设置日期格式
	closeText : '关闭', // 只有showButtonPanel: true才会显示出来
	duration : 'fast',
	showAnim : 'fadeIn',
	onSelect : function(dateText, inst) {
		var arys = new Array();
		var arys = dateText.split('-');
		$('#date3').datepicker('option', 'maxDate',
				new Date(arys[0], arys[1] - 1, arys[2]));
	}
};
//初始化相关函数

$(function() {
	var w=document.body.offsetWidth;
	var h=document.body.offsetHeight;
	 h=h-40;//去掉logo
	 w=w-200;
	var width=w+"px";
	var height=h+"px";
	$("#shipbar").css("width",width);
	$("#xushipbar").css("width",width);
	$("#addshipbar").css("width",width);
	$("#map").css("height",height);
	$("#map2").css("height",height);
	$(".sheet").css("height",height);
	$(".shipbar").css("height",height);
	iflogin();
})

function init() {
	$("#getshiplist").click(shiplist_click);//船舶列表显示
	$("#xgcbtj").click(xgcbtj_click);//修改提交
	$("#gmqx").click(hidexushiplist);//修改返回
	$("#shiplistqx").click(hideshiplist);//shiplist返回
	$("#addshipclick").click(addship_click);//增加船舶
	$("#zjqx").click(hideaddshipbar);//取消
	$("#zjcb_sb").click(zjcb_sb_click);//增加提交
	$("#fanhui").click(hidesheet);//返回
	$(".open-btn").click(ml_open_demo);//左侧菜单窗口弹出
	$(".float-close").click(ml_close_demo);//左侧菜单窗口收回
	$("#baidu").css("right","122px");
	$("#google").css("right","66px");
	$("#haitu").css("right","10px");
	$("#baidu").click(baidu_click);
	$("#google").click(google_click);
	$("#haitu").click(haitu_click);
	loadship();
	loadgps();
	menuinit();
	$("#date1").datepicker(date1format);// .wrap('<div class="ll-skin-lugo"/>');
	$("#date2").datepicker(date2format);// .wrap('<div class="ll-skin-lugo"/>');
	//$("#date3").datepicker(date3format);// .wrap('<div class="ll-skin-lugo"/>');
	//$("#date4").datepicker(date4format);

}

function loadship() {
	var ul = urlbase + "GetShipsByUser.json?username=" + userbase + "&startNid=0" + "&count=10000";
	$.getJSON(ul, loadship_callback);
}

function loadship_callback(result) {
	if (result.stage < 0) {
		alert(result.msg);
		return false;

	} else {
		var str = "";
		$.each(result.data, function(key, val) {
			var strtemp = "";
			var shipid = val.id;
			var shipname = val.name;
			strtemp = "<li class=\"clickship\"><a>" + shipid + ":" + shipname + "</a></li>";
			str += strtemp;
		})
		$("#shiplist").empty();
		$("#shiplist").append(str);//我的船队下面船队列表
		$(".clickship").click(menufindshiponmap);
	}
}

function menufindshiponmap()
{
	hideshiplist();
	hideaddshipbar();
	hidexushiplist();
	var obj=$(this).children("a:eq(0)");
	var str=obj.text();
	var id=str.split(":")[0];
	var ship;
	if(gpsinfo==undefined)
	{
		alert("船舶数据异常");
	}else{
		for(var i=0;i<gpsinfo.length;i++)
		{
			if(gpsinfo[i].shipid==id)
			{
				ship=gpsinfo[i];
				showshipinfodialog(i);
				break;
			}
		}
	}
	if(ship==undefined)
	{
		alert("该船舶无定位数据");
	}
	var point = new BMap.Point(ship.longitude, ship.latitude); //创建点坐标  
	map.centerAndZoom(point, 15);
	
	if(map2!=undefined){//google map2
	map2.setZoom(15);
	var gps=GPS.gcj_encrypt(ship.latitude, ship.longitude);
	var myLatlng = new google.maps.LatLng(gps['lat'],gps['lon']);
	map2.setCenter(myLatlng);
	}
}




function loadgps() {
	flag=0;
	if(map==undefined)
	{	
		map = new BMap.Map("map");
		$("#baidu").css("background","blue");
		$("#baidu").css("color","white");
	}
	var ul = urlbase + "getalllastgps2.json?username=" + userbase;
	$.getJSON(ul, allsgpscallback);
}

createMark = function(gpspoint,index) {//单点
	var val=gpsinfo[index];
	if(val.speed!=0){
		var myIcon = new BMap.Symbol(BMap_Symbol_SHAPE_FORWARD_CLOSED_ARROW, {
		    scale: 1.25,
		    strokeWeight: 1,
		    rotation: val.heading,//顺时针旋转30度
		    fillColor: '#1f1',
		    fillOpacity: 0.8
		  })
	}
	else{
		var myIcon = new BMap.Symbol(BMap_Symbol_SHAPE_FORWARD_CLOSED_ARROW, {
		    scale: 1.25,
		    strokeWeight: 1,
		    rotation:val.heading,//顺时针旋转30度
		    fillColor: '#ff0',
		    fillOpacity: 0.8
		  })
	}
	var _marker = new BMap.Marker(gpspoint,{icon:myIcon});
	
	var label = new BMap.Label(val.name,{offset:new BMap.Size(20,-10)});
	label.setStyle({
		 color : "black",
		 borderColor:"black",
		 backgroundColor :"#FFF",
		 lineHeight : "12px",
		 fontFamily:"微软雅黑"
	 });
	_marker.setLabel(label); 
	
	_marker.addEventListener("click", function(e) {
		showshipinfodialog(index);
	});
	_marker.addEventListener("mouseover", function(e) {
		
		var str = "";
		var st = "";
		st += "船名：" + val.name + "\n";
		st += "呼号：" + val.callsign + "\n";
		str += st;
		st = "mmsi：" + val.mmsi + "\n";
		str += st;
		//var time1 =new Date('1900/1/1');
		var newTime = new Date(val.time);
		var tm = "";
		tm += newTime.getFullYear();
		tm += ".";
		tm += (newTime.getMonth()+1);
		tm += ".";
		tm += newTime.getDate();
		tm += "-";
		tm += newTime.getHours();
		tm += "：";
		tm += newTime.getMinutes();
		tm += "：";
		tm += newTime.getSeconds();
		st = "时间：" + tm ;
		str += st;
		this.setTitle(str);
	});
	return _marker;
};

createMark2 = function(point, index) {//多点   
			var myIcon = new BMap.Icon("/ShipWebMage/img/1.png", new BMap.Size(32, 32), {    
			// 指定定位位置。   
			// 当标注显示在地图上时，其所指向的地理位置距离图标左上    
			// 角各偏移10像素和25像素。您可以看到在本例中该位置即是   
  			 // 图标中央下端的尖角位置。    
  	 		anchor: new BMap.Size(16,16),    
  	 		// 设置图片偏移。   
  			 // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您   
   			// 需要指定大图的偏移位置，此做法与css sprites技术类似。    
  			 imageOffset: new BMap.Size(0, 0)   // 设置图片偏移    
 			});    
	var _marker = new BMap.Marker(point,{icon:myIcon});
	_marker.addEventListener("mouseover", function(e) {
		var val=gpsinfo[index];
		var str = "";
		var st = "";
		st = "吃水：" + val.draft + "米\n";
		str += st;
		st = "方向：" + val.heading + "度\n";
		str += st;
		st = "速度：" + val.speed + "节\n";
		str += st;
		var newTime = new Date(val.time);
		var tm = "";
		tm += newTime.getFullYear();
		tm += ".";
		tm += newTime.getMonth()+1;
		tm += ".";
		tm += newTime.getDate();
		tm += " ";
		tm += newTime.getHours();
		tm += "：";
		tm += newTime.getMinutes();
		st = "时间：" + tm + "\n";
		str += st;
		this.setTitle(str);
	});
	return _marker;
};

function allsgpscallback(result) {
	if (result.stage < 0) {
		alert(result.msg);
	} else {
		gpsinfo=result.data;
		if (gpsinfo.length > 0) {
			var point = new Array();
			var infowindow = new Array();
			var shipid = new Array();
			$.each(gpsinfo, function(key, val) {
				shipid.push(val.id);
				var j = val.longitude;
				var w = val.latitude;
				var ps;
				if (val.wore == 1) {
					j = 0 - j;
				}
				if (val.nors == 1) {
					w = 0 - w;
				}
				var p = new BMap.Point(j, w);					
				point.push(p);
				
				var str = "";
				var st = "";
				st += "船名：" + val.name + "\n";
				st += "呼号：" + val.callsign + "\n";
				str += st;
				st = "mmsi：" + val.mmsi + "\n";
				str += st;
				//var time1 =new Date('1900/1/1');
				var newTime = new Date(val.time);
				var tm = "";
				tm += newTime.getFullYear();
				tm += ".";
				tm += (newTime.getMonth()+1);
				tm += ".";
				tm += newTime.getDate();
				tm += " ";
				tm += newTime.getHours();
				tm += "：";
				tm += newTime.getMinutes();

				st = "时间：" + tm ;
				str += st;
				infowindow.push(str);
			});
			//map2================================================================
			if(map2!=undefined){
				var bounds = new google.maps.LatLngBounds ();
				deleteOverlays();//map2's all markers delete
				delete_polyline_Overlays();//map2's polyline delete
				for(var index in point){
					var gps=GPS.gcj_encrypt(point[index].lat,point[index].lng);
					var myLatlng = new google.maps.LatLng(gps['lat'],gps['lon']);
					bounds.extend(myLatlng);
					var marker = new google.maps.Marker({
						position: myLatlng,
						//icon: '../img/redShip.gif',
						title:gpsinfo[index].name,
						map:map2//等同于marker.setMap(map2);
					});
					markersArray.push(marker);//add into google map's markers for the delete 
					var infowindow1 = new google.maps.InfoWindow({
						content:gpsinfo[index].name
					});
					marker_click(marker,index);
					infowindow1.open(map2,marker);
				
				};
				map2.fitBounds (bounds);
			}
			//map================================================================
			map.clearOverlays();
			map.setViewport(point);
			map.enableScrollWheelZoom();//启用地图滚轮放大缩小
			map.addControl(new BMap.NavigationControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));//比例尺
			map.addControl(new BMap.MapTypeControl());//图层	
			
			var geolocationControl = new BMap.GeolocationControl();//定位
			    geolocationControl.addEventListener("locationSuccess", function(e){
			    // 定位成功事件
			    var address = '';
			    address += e.addressComponent.province;
			    address += e.addressComponent.city;
			    address += e.addressComponent.district;
			    address += e.addressComponent.street;
			    address += e.addressComponent.streetNumber;
			    alert("当前定位地址为：" + address);
			  });
			  geolocationControl.addEventListener("locationError",function(e){
			    // 定位失败事件
			    alert(e.message);
			  });
			map.addControl(geolocationControl);//定位
			
			/*for(var index in point){
				var gps=GPS.gcj_encrypt(point[index].lat,point[index].lng);//gps to google
				var gps1=GPS.bd_encrypt(gps['lat'],gps['lon']);//google to baidu
				var bpoint = new BMap.Point(gps1['lon'], gps['lat']);//create baidu point bpoint
				var marker = createMark(bpoint, index);
				map.addOverlay(marker);
			}	*/
			flag=1;
			BMap.Convertor.transMore(point,0,callback);//point最多是20个，callback函数第一次运行完，自动记录，下一次运行直接运行不在寻找callback名称的函数，所以callback2这个函数不会运行到，以后修改注意这一块。
			
			
		} else {
			var gpsPoint = new BMap.Point(116.403694, 39.915378);
			map.clearOverlays();
			map.centerAndZoom(gpsPoint, 5); // 初始化地图,设置中心点坐标和地图级别。
			map.enableScrollWheelZoom();
		}

	}

}
function marker_click(marker,index){
	google.maps.event.addListener(marker,'click',function() {
	 map2.setZoom(11);
	 map2.setCenter(marker.getPosition());
	});
	google.maps.event.addListener(marker, 'click', function() {
	showshipinfodialog(index);
	});
}
function callback(xyResults){//这里还存在问题，以后更改
	var xyResult = null;
	if(flag==1){
		for(var index in xyResults){
		xyResult = xyResults[index];
		if(xyResult.error != 0){continue;}//出错就直接返回;
		var point = new BMap.Point(xyResult.x, xyResult.y);
		var marker = createMark(point, index);
		map.addOverlay(marker);
		}		
	}	
	if(flag==2){//显示轨迹
		var points=new Array();
		for(var index in xyResults){
			xyResult = xyResults[index];
			if(xyResult.error != 0){continue;}//出错就直接返回;
			var point = new BMap.Point(xyResult.x, xyResult.y);
			points.push(point);
		}
		map.setViewport(points);
		var polyline = new BMap.Polyline(points);
		map.addOverlay(polyline, {
			strokeColor : "blue",
			strokeWeight : 6,
			strokeOpacity : 0.5
		});
		map.addOverlay(polyline);//连线
		for(var index in xyResults){
			xyResult = xyResults[index];
			if(xyResult.error != 0){continue;}//出错就直接返回;
			var point = new BMap.Point(xyResult.x, xyResult.y);
			var marker = createMark2(point, index);
			map.addOverlay(marker);//添加marker
		}	
	}
}
/*function callback2(xyResults){
	var xyResult = null;
	var points=new Array();
	for(var index in xyResults){
		xyResult = xyResults[index];
		if(xyResult.error != 0){continue;}//出错就直接返回;
		var point = new BMap.Point(xyResult.x, xyResult.y);
		points.push(point);
	}
	var polyline = new BMap.Polyline(points);
	map.addOverlay(polyline, {
		strokeColor : "blue",
		strokeWeight : 6,
		strokeOpacity : 0.5
	});
	map.addOverlay(polyline);
	for(var index in xyResults){
		xyResult = xyResults[index];
		if(xyResult.error != 0){continue;}//出错就直接返回;
		var point = new BMap.Point(xyResult.x, xyResult.y);
		var marker = createMark2(point, index);
		map.addOverlay(marker);
	}					
}*/
function addship_click() {
	showaddshipbar();
	var ul = urlbase + "GetPorts.json";
	$.getJSON(ul, getport_callback);
}
function getport_callback(result) {
	var str = "";
	$.each(result.data, function(key, val) {
		// alert(val.id);
		var st = "<option class=\"potdel\" value=\"" + val.id + "\">"
				+ val.cityZh + "</option>";
		str += st;
	});
	// alert(str);
	$(".potdel").remove();
	$("#z_port").append(str);
	// $("#zjcb_sb").click(zjcb_sb_click);
}
function baidu_click(){
	$('#map').css("right","0px");
	$("#baidu").css("background","blue");
	$("#baidu").css("color","white");
	$("#google").css("background","white");
	$("#google").css("color","black");
	$("#haitu").css("background","white");
	$("#haitu").css("color","black");
	$('#map2').css("right","-100%");
	$('#map3').css("right","-100%");
}
function haitu_click(){
	$('#map3').css("right","0px");
	$("#haitu").css("background","blue");
	$("#haitu").css("color","white");
	$("#baidu").css("background","white");
	$("#baidu").css("color","black");
	$("#google").css("background","white");
	$("#google").css("color","black");
	$('#map2').css("right","-100%");
	$('#map').css("right","-100%");
}
function loadScript() {
	  var script = document.createElement('script');
	  script.type = 'text/javascript';
	  script.src = 'http://maps.googleapis.com/maps/api/js?key=AIzaSyDUFtcSCp_1K0-vS1ZKrLmeVpfsRvYhg1c&sensor=false&v=3.exp' +
	      '&callback=initialize';
	  document.body.appendChild(script);
}
function google_click(){
	$('#map2').css("right","0px");
	$("#google").css("background","blue");
	$("#google").css("color","white");
	$("#baidu").css("background","white");
	$("#baidu").css("color","black");
	$("#haitu").css("background","white");
	$("#haitu").css("color","black");
	$("#map").css("right","-100%");
	$("#map3").css("right","-100%");
	if(map2==undefined)
	{   
		loadScript();//load google Script	
		loadgps();
	}	
}
function initialize(){
	var mapProp = {
			  center:new google.maps.LatLng(30.2168052,120.0896724),
			  zoom:12,  
			  zoomControl:false,				  
			  panControl:false,
			  streetViewControl:false,
			  mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	map2 = new google.maps.Map(document.getElementById("map2"),mapProp); 
}
function shiplist_click(){
	showshiplist();
	hideaddshipbar();
	hidexushiplist();
	var ul = urlbase + "GetShipsByUser.json?username=" + userbase + "&startNid=0" + "&count="+count;
	$.getJSON(ul, cblb_callback);
	var ul = urlbase + "GetShipsizeByUser.json?username=" + userbase;
	$.getJSON(ul, page_callback);
}

function page_callback(result) {
	var str = "";
	if (result.stage < 0) {

	} else {
		sum = result.data;
		$("#page").pagination(sum, {
			num_edge_entries: 1,
			// 边缘页数
			num_display_entries: 4,
			// 主体页数
			callback: pageselectCallback,
			items_per_page: count,
			prev_text: "前一页",
			next_text: "后一页"
			// 每页显示1项
		});

	}
}

function pageselectCallback(page_index, jq) {
	var st = start + count * page_index;
	var ul = urlbase + "GetShipsByUser.json?username=" + userbase + "&startNid=" + st + "&count=" + count;
	$.getJSON(ul, cblb_callback);

}

function cblb_callback(result) {
	if (result.stage < 0) {
		alert(result.msg);
		return false;

	} else {
		$(".potdel").remove();
		var tr = "";
		$.each(result.data, function(key, val) {
			tr += "<tr class=\"potdel\">";
			tr += "<td>" + val.id + "</td>";
			tr += "<td>" + val.name + "</td>";
			tr += "<td>" + val.company + "</td>";
			tr += "<td>" + val.callsign + "</td>";
			tr += "<td>" + val.mmsi + "</td>";
			tr += "<td>" + val.port.cityZh + "</td>";
			tr += "<td>" + val.length + "</td>";
			tr += "<td>" + val.width + "</td>";
			tr += "<td>" + val.tload + "</td>";
			tr += "<td>" + "<a class=\"dele\">删除<\a>&nbsp;&nbsp;&nbsp;"
					+ "<a class=\"xiug\">修改<\a>" + "</td>";
			tr += "</tr>";
		});
		$("#tab1").append(tr);
		$(".dele").click(dele_click);
		$(".xiug").click(xiug_click);
		return true;
	}
}

function dele_click() {
	var txt = $(this).parent().parent().children().eq(0).html();
	var ul = urlbase + "deleteShip.json?id=" + txt;
	$.getJSON(ul, dele_callback);

}

function dele_callback(result) {
	if (result.stage < 0) {
		alert(result.msg);
	} else {
		alert(result.msg);
		shiplist_click();
	}
}

function xiug_click() {
	showxushiplist();
	var txt = $(this).parent().parent().children().eq(0).html();
	var ul = urlbase + "GetPorts.json";
	$.getJSON(ul, getport_callback2);
	ul = urlbase + "getshipbyid.json?shipid=" + txt;
	$.getJSON(ul, getshipinfo_callback);
	// alert(txt);
}

function getshipinfo_callback(result) {
	if (result.stage < 0) {
		alert(result.msg);
	} else {
		result = result.data;
		xgcbid = result.id;
		$("#g_name").val(result.name);
		$("#g_imei").val(result.imei);
		$("#g_callsign").val(result.callsign);
		$("#g_mmsi").val(result.mmsi);
		$("#g_tload").val(result.tload);
		$("#g_length").val(result.length);
		$("#g_width").val(result.width);
		$("#g_company").val(result.company);
		$("#g_category").val(result.category);
		$("#g_port").val(result.port.id);
	}
}

function zjcb_sb_click() {
	// alert("zjcb_sb_click");
	var shipName = $("#z_name").val();
	var shipCallsign = $("#z_callsign").val();
	var imei = $("#z_imei").val();
	var shipMmsi = $("#z_mmsi").val();
	var shipLoad = $("#z_tload").val();
	var shipLength = $("#z_length").val();
	var shipWidth = $("#z_width").val();
	var shipCompany = $("#z_company").val();
	var shipCategory = $("#z_category").val();
	var portId = $("#z_port").val();
	var ul = urlbase + "addship2.json?userName=" + userbase + "&shipName="
			+ shipName + "&portId=" + portId + "&imei=" + imei
			+ "&shipCallsign=" + shipCallsign + "&shipMmsi=" + shipMmsi
			+ "&shipLoad=" + shipLoad + "&shipLength=" + shipLength
			+ "&shipWidth=" + shipWidth + "&shipCompany=" + shipCompany
			+ "&shipCategory=" + shipCategory;

		$.getJSON(ul, zjcb_sb_callback);
}

function zjcb_sb_callback(result) {
	if (result.stage < 0) {
		alert(result.msg);
		return;
	} else {
		alert("增加成功");
			hidexushiplist();
			shiplist_click();
	}
}

function getport_callback2(result) {
	var str = "";
	$.each(result.data, function(key, val) {
		// alert(val.id);
		var st = "<option class=\"potdel2\" value=\"" + val.id + "\">"
				+ val.cityZh + "</option>";
		str += st;
	});
	// alert(str);
	$(".potdel2").remove();
	$("#g_port").append(str);
	// $("#zjcb_sb").click(zjcb_sb_click);
}

function xgcbtj_click() {
	var shipName = $("#g_name").val();
	var imei = $("#g_imei").val();
	var shipCallsign = $("#g_callsign").val();
	var shipMmsi = $("#g_mmsi").val();
	var shipLoad = $("#g_tload").val();
	var shipLength = $("#g_length").val();
	var shipWidth = $("#g_width").val();
	var shipCompany = $("#g_company").val();
	var shipCategory = $("#g_category").val();
	var portid = $("#g_port").val();
	var ul = urlbase + "UpdateShip2.json?" + "shipId=" + xgcbid + "&shipName="
			+ shipName + "&imei=" + imei + "&portid=" + portid
			+ "&shipCallsign=" + shipCallsign + "&shipMmsi=" + shipMmsi
			+ "&shipLoad=" + shipLoad + "&shipLength=" + shipLength
			+ "&shipWidth=" + shipWidth + "&shipCompany=" + shipCompany
			+ "&shipCategory=" + shipCategory;
	$.getJSON(ul, function(result) {
		if (result.stage < 0) {
			alert(result.msg);

		} else {
			alert(result.msg);
			hidexushiplist();
			shiplist_click();
		}
	});
}

function menuinit() {
	var aMenuOneLi = $(".menu-one > li");
	var aMenuTwo = $(".menu-two");
	$(".menu-one > li > .header").each(function(i) {
		$(this).click(function() {
			if ($(aMenuTwo[i]).css("display") == "block") {
				$(aMenuTwo[i]).slideUp(300);
				$(aMenuOneLi[i]).removeClass("menu-show");
			}
			else {
				$(aMenuTwo[i]).slideDown(300);
				$(aMenuOneLi[i]).addClass("menu-show");
			}
		});
	});
}


//页面覆盖函数
function ml_open_demo() {
	$('.float-open').animate({
      	left: '-70px'
    }, 0, function(){
      	$('#menu').animate({
        	left: '0px'
      	});
      	$('#main').animate({
        	left: '200px'
      	});
      	
	    $('.float-news').animate({
	        left: '200px'
	      	}, 0);
    });
	
}function ml_close_demo() {
	$('.float-news').animate({
      	left: '-70px'
    }, 0, function(){
      	$('#menu').animate({
        	left: '-100%'
      	});
      	$('#main').animate({
        	left: '0px'
      	});
	    $('.float-open').delay(50).animate({
	        left: '0px'
	      	}, 0);
    });
	
}
function showsheet() {
	$("#fanhui").show();
	$("#sheet").animate({
		left: "0px"
	}, {
		easing: "easeOutBounce",
		duration: 0
	});
}
function hidesheet() {
	$("#fanhui").hide();
	$("#sheet").animate({
		left: "-100%"
	}, {
		easing: "easeOutBounce",
		duration: 2000
	});
}

function showshiplist() {
		$("#shipbar").animate({
		right: "0px"
	}, {
		easing: "easeOutBounce",
		duration: 2000
	});
}

function hideshiplist() {
		$("#shipbar").animate({
		right: "-100%"
	}, {
		easing: "easeOutBounce",
		duration: 2000
	});
}

function showxushiplist() {
		$("#xushipbar").animate({
		right: "0px"
	}, {
		easing: "easeOutBounce",
		duration: 2000
	});
}
function hidexushiplist() {
		$("#xushipbar").animate({
		right: "-100%"
	}, {
		easing: "easeOutBounce",
		duration: 2000
	});
}

function showaddshipbar() {
		$("#addshipbar").animate({
		right: "0px"
	}, {
		easing: "easeOutBounce",
		duration: 2000
	});
}
function hideaddshipbar() {
		$("#addshipbar").animate({
		right: "-100%"
	}, {
		easing: "easeOutBounce",
		duration: 2000
	});
}



//显示弹窗函数


function okfun() {
	return false
}


function showshipinfodialog(index) {
	selectshipindex=index;
	shipinfodialoginit(index);
	if(shipinfodialog==undefined)
	{
		shipinfodialog = $.dialog({
		content: $("#shipinfo").get(0), 
		close:showshipinfodialogclose,
		left: '1000px',//left:'100%',
    	top: '430px',//top:'120px'
		 button: [
        {
            name: '轨迹',
            callback:locus,
        },
        {
            name: '发动机',
            callback:lastEngines
        },
        {
            name: '定位',
			callback:findship
        },
        {
            name: '发动机|历史',
			callback:PeriodEngines
        }
    ],
	})
	shipinfodialog.title(gpsinfo[index].name);
	}else
	{
		shipinfodialog.title(gpsinfo[index].name);
		shipinfodialog.content($("#shipinfo").get(0)); 
		shipinfodialog.show();
	}
	
}
function PeriodEngines()//显示发动机历史数据
{
	showsheet();//首先显示区域
	getE_bb_click();//后台数据准备
	return true;
}

function getE_bb_click() {
	// getallEnginesf
	var newTime = new Date();
	
	var tm = "";
	tm += newTime.getFullYear();
	tm += "-";
	tm += newTime.getMonth()+1;
	tm += "-";
	tm += newTime.getDate();
	var date2 = tm;//endtime
	var t=newTime.getTime()-1000*60*60*24*60;//提取一个月的数据
	newTime = new Date(t);
	tm = "";
	tm += newTime.getFullYear();
	tm += "-";
	tm += newTime.getMonth()+1;
	tm += "-";
	tm += newTime.getDate();
	var date1 = tm;//begintime
	var shipid =gpsinfo[selectshipindex].shipid;;
	var ul = urlbase + "GetPeriodEnginesf.json?id=" + shipid
			+ "&begintime=" +date1 + "&endtime="
			+ date2 + "&sum=1000";//请求数据个数sum
	$.getJSON(ul, adddata);//请求shipid的数据
}
function adddata(result) {
	labels.length = 0; //定义过的全局数组
	alldata.length = 0;//定义过的全局数组
	labels1.length = 0;//定义过的全局数组
	if (result.stage < 0 || result.data == null || result.data.length == 0) {
		addsheelselect();
		//drawbb(-1);
		if (result.stage < 0) {
			hidesheet();
			alert(result.msg);
		} else {
			alert("没有记录！");
			hidesheet();
		}

		return;
	}
	$.each(result.data, function(index, content) {//请求成功时
		if (index == 0) {
			labels = content;//先把时间发送过来，时间是跳跃选取的
		} else {
			alldata.push(content);//每一次content是一个数据对象，每个数据对象内包括20个数据值
		}

	});
	for (var i = 0; i < labels.length; i++) {
		var temp = i + 1;
		labels1.push(temp);//图标横坐标
	}
	//addsheelselect();//添加右侧数据项选择列表
	drawbb();//显示图
}

function addsheelselect() {
	
	$("#engineslist").empty();
	if (alldata.length == 0) {
		return;
	}
	$.each(alldata, function(key, val) {
		str="<li><input type='checkbox' name='enginescheck' id='enginescheck' value="+key+">"+val.name+"<br></li>";
		$("#engineslist").append(str);
	});
}

function drawbb() {
		$("#canvasDiv").empty();
		for(var i=0;i<alldata.length;i++ )
		{
			var arr = new Array();
			var data= new Array();
			var pop = alldata[i];
			pop.color=color[i];
			//arr.push(pop);
			for(var j=0;j<pop.value.length;j++){
				var date=new Date(labels[j]);
				var time=date.getTime();
				data.push([time,parseInt(pop.value[j])]);//时间从1970年1月1日00:00:00:000开始
				arr.push(data[j]);
			}
			seriesOptions[i] = {
					name: pop.name,
					data: arr//这里要求data为数值型，而数据库提供给他的是“string”,2015年4月24日已近修改为数值型。
			}			
		}
	var w=	$("#canvasDiv").width();
	var h=	$("#canvasDiv").height();
	$("#shipbar").css("width",width);
	$("#xushipbar").css("width",width);
	$("#addshipbar").css("width",width);
	function createChart( ) {
		$('#canvasDiv').highcharts('StockChart', {
		    chart: {
		    	width : w,
				height : h,
		    },
		    title: {
		          text: 'Each parameter curve of engine'
		      },
		    subtitle: {
		            text: 'The data in two months.'
		    },
		    rangeSelector: {
		        selected: 4
		    },
		    navigation: {
	            buttonOptions: {
	                theme: {
	                    // Good old text links
	                    style: {
	                        color: '#039',
	                        textDecoration: 'underline'
	                    }
	                }
	            }
	        },

	        exporting: {
	            buttons: {
	                contextButton: {
	                    enabled: false
	                },
	                exportButton: {
	                    text: 'Download',
	                    // Use only the download related menu items from the default context button
	                    onclick:function(){
	                    	$.dialog({
	                    		content: $("#seach").get(0), 
	                    		button: [
	                    		         {
	                    		             name: '确定',
	                    		             callback:seachdata
	                    		         }]
	                    	});
	                    	/*
	                    	var shipid =gpsinfo[selectshipindex].shipid;
	                    	var minDate = $('input.highcharts-range-selector:eq(0)').val();
	                    	var maxDate = $('input.highcharts-range-selector:eq(1)').val();
	                    	var ul = "http://localhost:8080/"+urlbase + "ExportCvs.json?id=" + shipid
	                    			+ "&begintime=" +minDate + "&endtime="
	                    			+ maxDate;
	                    	//$getJSON(ul);
	                    	window.open(ul);*/
	                    	return false;
	                    }
	                },
	                printButton: {
	                    text: 'Print',
	                    onclick: function () {
	                        this.print();
	                    }
	                }
	            }
	        },
		    yAxis: {
		    	labels: {
		    		formatter: function() {
		    			return (this.value > 0 ? '+' : '') + this.value + '%';
		    		}
		    	},
		    	alternateGridColor: null,
		    	plotLines: [{
		    		value: 0,
		    		width: 2,
		    		color: 'silver'
		    	}]
		    },
		    
		    plotOptions: {
		    	series: {
		    		compare: 'percent'
		    	}	    			    	 
		    },	    
		    rangeSelector : {
                allButtonsEnabled: true,
                buttons: [{
                	type: 'day',
                	count: 1,
                	text: '1d'
                }, {
                	type: 'week',
                	count: 1,
                	text: '1w'
                }, {
                	type: 'month',
                	count: 1,
                	text: '1m'
                }, {
                	type: 'ytd',
                	text: 'YTD'
                }, {
                	type: 'year',
                	count: 1,
                	text: '1y'
                }, {
                	type: 'all',
                	text: 'All'
                }],
                selected: 1
            },
		    legend: {//图例
	            align: 'right',
            	enabled: true,
	            verticalAlign: 'middle',
	            width:100      
	        },
		    series:seriesOptions		    
		},function (chart) {

            // apply the date pickers
            setTimeout(function () {
                $('input.highcharts-range-selector', $(chart.container).parent())
                    .datepicker();
            }, 0);
        });
	}
	$.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        onSelect: function () {
            this.onchange();
            this.onblur();
        }
    });
	Highcharts.setOptions({
		global: {
			useUTC: false//中文区时间格式
		},
	    lang: {
	        shortMonths: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
	            weekdays: ['周日','周一','周二','周三','周四','周五','周六'],
	            rangeSelectorFrom: '起始',
	            rangeSelectorTo: '终止',
	            rangeSelectorZoom: '缩放'
	    }
	});
	createChart( );
	var chart = $('#canvasDiv').highcharts();
	for(var i=1;i<chart.series.length;i++){
	    var series = chart.series[i];//刚开始只显示油耗
	        series.hide();
	}
}
function zhuche_click() {
	var user = $("#z_username").val();
	var pass = $("#z_password").val();
	$.getJSON(urlbase + "RegisterUser.json?username=" + user + "&password="
			+ pass, zhuchecallback);
}


function locus() {
	showlocusdialog();
	return false;
}

function showlocusdialog(){
	 $.dialog({
		content: $("#seach").get(0),
		title:'轨迹',
		close: loadgps,
		 button: [
        {
            name: '2天',
            callback:seachlocus2,
        },
        {
            name: '3天',
            callback:seachlocus3
        },
        {
            name: '5天',
			callback:seachlocus5
        },
        {
            name: '查询',
			callback:seachlocus
        }]
	});
}
function seachdata(){
	var shipid =gpsinfo[selectshipindex].shipid;
	var minDate = $("#date1").val();
	var maxDate = $("#date2").val();
	if(date1==""||date2=="")
	{
		alert("输入起止时间");
		return false;
	}
	var ul = "http://mon.belfu.com"+urlbase + "ExportCvs.json?id=" + shipid 
	+ "&begintime=" +minDate + "&endtime="+ maxDate;
	window.open(ul);
}
function seachlocus()
{
	var shipid =gpsinfo[selectshipindex].shipid;
	var date1 = $("#date1").val();
	var date2 = $("#date2").val();
	if(date1==""||date2=="")
	{
		alert("输入起止时间");
		return false;
	}
	var ul = urlbase + "GetPeriodGps2.json?id=" + shipid + "&begintime="
			+ date1 + "&endtime=" + date2 + "&sum=300";
	$.getJSON(ul, getlocus_callback);
	return false;
}

function seachlocus5()
{
	var shipid =gpsinfo[selectshipindex].shipid;
	var newTime = new Date();
	
	var tm = "";
	tm += newTime.getFullYear();
	tm += "-";
	tm += newTime.getMonth()+1;
	tm += "-";
	tm += newTime.getDate();
	var date2 = tm;
	var t=newTime.getTime()-1000*60*60*24*5;
	newTime = new Date(t);
	 tm = "";
	tm += newTime.getFullYear();
	tm += "-";
	tm += newTime.getMonth()+1;
	tm += "-";
	tm += newTime.getDate();
	var date1 = tm;
	
	if(date1==""||date2=="")
	{
		alert("输入起止时间");
		return false;
	}
	var ul = urlbase + "GetPeriodGps2.json?id=" + shipid + "&begintime="
			+ date1 + "&endtime=" + date2 + "&sum=300";
	$.getJSON(ul, getlocus_callback);
	return false;
}
function seachlocus2()
{
	var shipid =gpsinfo[selectshipindex].shipid;;
	var newTime = new Date();
	
	var tm = "";
	tm += newTime.getFullYear();
	tm += "-";
	tm += newTime.getMonth()+1;
	tm += "-";
	tm += newTime.getDate();
	var date2 = tm;
	var t=newTime.getTime()-1000*60*60*24*2;
	newTime = new Date(t);
	tm = "";
	tm += newTime.getFullYear();
	tm += "-";
	tm += newTime.getMonth()+1;
	tm += "-";
	tm += newTime.getDate();
	var tt=newTime.toLocaleDateString();
	var date1 = tm;
	if(date1==""||date2=="")
	{
		alert("输入起止时间");
		return false;
	}
	var ul = urlbase + "GetPeriodGps2.json?id=" + shipid + "&begintime="
			+ date1 + "&endtime=" + date2 + "&sum=300";
	$.getJSON(ul, getlocus_callback);
	return false;
}
function seachlocus3()
{
	var shipid =gpsinfo[selectshipindex].shipid;;
	var newTime = new Date();
	
	var tm = "";
	tm += newTime.getFullYear();
	tm += "-";
	tm += newTime.getMonth()+1;
	tm += "-";
	tm += newTime.getDate();
	var date2 = tm;
	var t=newTime.getTime()-1000*60*60*24*3;
	newTime = new Date(t);
	 tm = "";
	tm += newTime.getFullYear();
	tm += "-";
	tm += newTime.getMonth()+1;
	tm += "-";
	tm += newTime.getDate();
	var tt=newTime.toLocaleDateString();
	var date1 = tm;
	if(date1==""||date2=="")
	{
		alert("输入起止时间");
		return false;
	}
	var ul = urlbase + "GetPeriodGps2.json?id=" + shipid + "&begintime="
			+ date1 + "&endtime=" + date2 + "&sum=300";
	$.getJSON(ul, getlocus_callback);
	return false;
}

function getlocus_callback(result) {
		if (result.stage < 0) {
			alert(result.msg);
		} else {
			if(result.data.length==0)
			{
				alert("无数据");
			}
			var point = new Array();
			var infowindow = new Array();
			$.each(result.data, function(key, val) {
				var j = val.longitude;
				var w = val.latitude;
				if (val.wore == 1) {
					j = 0 - j;
				}
				if (val.nors == 1) {
					w = 0 - w;
				}
				var p = new BMap.Point(j, w);
				point.push(p);
				
				var str = "";
				var st = "";
				st = "吃水：" + val.draft + "米\n";
				str += st;
				st = "方向：" + val.heading + "度\n";
				str += st;
				st = "速度：" + val.speed + "节\n";
				str += st;
				var newTime = new Date(val.time);
				var tm = "";
				tm += newTime.getFullYear();
				tm += ".";
				tm += newTime.getMonth()+1;
				tm += ".";
				tm += newTime.getDate();
				tm += " ";
				tm += newTime.getHours();
				tm += "：";
				tm += newTime.getMinutes();

				st = "时间：" + tm + "\n";
				str += st;
				infowindow.push(str);
			});
			//map==========================================
			flag=2;
			map.clearOverlays();
			//BMap.Convertor.transMore(point,0,callback);
			var points=new Array();
			map.addOverlay(polyline);
			for(var index in point){
			var gps=GPS.gcj_encrypt(point[index].lat,point[index].lng);//gps to google
			var gps1=GPS.bd_encrypt(gps['lat'],gps['lon']);//google to baidu
			var bpoint = new BMap.Point(gps1['lon'], gps['lat']);//create baidu point bpoint
			points.push(bpoint);
			var marker = createMark2(bpoint, index);
			map.addOverlay(marker);
			}
			var polyline = new BMap.Polyline(points);
			map.addOverlay(polyline, {
				strokeColor : "blue",
				strokeWeight : 6,
				strokeOpacity : 0.5
			});	
            //map2==========================================
			if(map2!=undefined){
			deleteOverlays();//delete mpa2's all markers
			delete_polyline_Overlays();//map2's polyline delete
			var points=new Array();
			var bounds = new google.maps.LatLngBounds ();
			for(var index in point){
				var gps=GPS.gcj_encrypt(point[index].lat,point[index].lng);
				var gps_google = new google.maps.LatLng(gps['lat'],gps['lon']);
				bounds.extend(gps_google);
				var marker=new google.maps.Marker({
					  position:gps_google,
					  icon:'/ShipWebMage/img/2.png',
					  map:map2,
					  title:infowindow[index]
					  });
				marker_Polyline_Array.push(marker);
				points.push(new google.maps.LatLng(gps['lat'],gps['lon']));		
			};
		   map2.fitBounds (bounds);
		   flightPath=new google.maps.Polyline({
				  path:points,
				  strokeColor:"#0000FF",
				  strokeOpacity:0.8,
				  strokeWeight:2,
				  map:map2
		    });}
		}
}
function delete_polyline_Overlays() {
	  if (marker_Polyline_Array) {
	    for (i in marker_Polyline_Array) {
	    	marker_Polyline_Array[i].setMap(null);
	    	flightPath.setMap(null);
	    }	    
	    marker_Polyline_Array.length = 0;
	  }
}
function deleteOverlays() {
	  if (markersArray) {
	    for (i in markersArray) {
	      markersArray[i].setMap(null);
	    }
	    markersArray.length = 0;
	  }
}
function lastEngines()
{
	var temp=gpsinfo[selectshipindex];
	var ul = urlbase + "getlastEnginesf.json?id=" + temp.shipid;
	$.getJSON(ul, showEngines);
	return false;
}

function findship ()
{
	var ship=gpsinfo[selectshipindex];
	var point = new BMap.Point(ship.longitude, ship.latitude);  // 创建点的坐标  
	map.centerAndZoom(point, 15);//由于这里的坐标没有转换过，导致地图中心点坐标依然是旧坐标。
	
	if(map2!=undefined){
		var gps=GPS.gcj_encrypt(ship.latitude, ship.longitude);
		var myLatlng = new google.maps.LatLng(gps['lat'],gps['lon']);
		map2.setZoom(15);
		map2.setCenter(myLatlng);
	}
	return false;	
}

function showEngines(data)
{
	if(data.stage<0||data.data==null)
	{
		alert(data.msg);
	}else
	{
		var temp=data.data;
		var str="采集时间：<br>";
		$.each(temp, function(key, val) {
			if(key==0)
			{
				var tm=val[0];
				tm+="<br>"
				str+=tm;
				str+="数据：<br><table>";
			}else
			{
				var tm="";
				tm+="<tr><td>"+val.name+"</td>";
				tm+="<td bgcolor="+"#00FF00"+">"+val.value[0]+"</td></tr>";
				str+=tm;
				
			}	
			
		});
		str+="</table>";
		 $.dialog({
		content: str,});
		
	}
}

function shipinfodialoginit(index)
{
	var temp=gpsinfo[index];
	
	$("#callsign").empty();
	$("#latitude").empty();
	$("#mmsi").empty();
	$("#longitude").empty();
	$("#length").empty();
	$("#heading").empty();
	$("#width").empty();
	$("#speed").empty();
	$("#tload").empty();
	$("#time").empty();
	
	var newTime = new Date(temp.time);
	var tm = "";
	tm += newTime.getFullYear();
	tm += ".";
	tm += (newTime.getMonth()+1);
	tm += ".";
	tm += newTime.getDate();//日期加一天
	tm += "-";
	tm += newTime.getHours();
	tm += "：";
	tm += newTime.getMinutes();
	tm += "：";
	tm += newTime.getSeconds();
	
	$("#callsign").append(temp.callsign);
	$("#latitude").append(temp.latitude);
	$("#mmsi").append(temp.mmsi);
	$("#longitude").append(temp.longitude);
	$("#length").append(temp.length);
	$("#heading").append(temp.heading);
	$("#width").append(temp.width);
	$("#speed").append(temp.speed);
	$("#tload").append(temp.tload);
	$("#time").append(tm);
}

function showshipinfodialogclose()
{
	shipinfodialog=undefined;
}


function showwaitdialog() {
	if(waitdialog==undefined)
	{
	waitdialog = $.dialog({
		content: '请稍候...',
		cancel: false
	})
	}else
	{
		waitdialog.content('请稍候...');
		waitdialog.show();
	}

}
function closewaitdialog() {
	if(waitdialog==undefined)
	{
	}else
	{
		waitdialog.close();
	}

}

function showregisterdialog() {
	var registerdialog = $.dialog({
		title: '注册',
		content: $("#register").get(0),
		cancel: false,
		ok: register,
		okVal: '注册账号',
		cancelVal: '已有账号',
		cancel: showlogindialog

	});
	dialog.show();
	return true;
}

function showlogindialog() {
	var logindialog = $.dialog({
		title: '登录',
		content: $("#login").get(0),
		cancel: false,
		ok: login,
		okVal: '登录',
		cancelVal: '注册账号',
		cancel: showregisterdialog
	});
	dialog = logindialog;
	return true;
}


//判断是否已经登陆

function iflogin() {
	$.getJSON(urlbase + "getusr.json", iflogincallback);
}

function iflogincallback(result) {
	if (result.stage > 0) {
		var st = "Welcome "+result.data+" Login.";
		st += "<a id=\"loginout\" class=\"click\" name=\"Logout\">注销</a>";
		$("#user").empty();
		$("#user").append(st);
		$("#loginout").click(loginout_click);
		userbase = result.data;
		init();
		return true;
	} else {
		showlogindialog();
		return;
	}
}

function login() {
	showwaitdialog();
	var user = $("#login_user").val();
	var pass = $("#login_password").val();
	$.getJSON(urlbase + "ValidateLogin.json?username=" + user + "&password=" + pass, logincallback);
}

function logincallback(result) {
	closewaitdialog();
	if (result.stage > 0) {
		var st = "Welcome "+result.data+" Login.";
		st += " <a id=\"loginout\" class=\"click\">注销</a>";
		$("#user").empty();
		$("#user").append(st);
		userbase = result.data;//用户名
		$("#loginout").click(loginout_click);
		
		init();
		return true;
	} else {
		alert(result.msg);
		showlogindialog();
		return false;
	}
}

function loginout_click() {
	var ul = urlbase + "logout.json?username=" + userbase;
	$.getJSON(ul, logout_callback);
}

function logout_callback(result) {
	if (result.stage > 0) {
		alert("注销成功！");
		location.reload();
	}
}

function register() {
	var user = $("#register_user").val();
	var pass = $("#register_password").val();
	$.getJSON(urlbase + "RegisterUser.json?username=" + user + "&password=" + pass, registercallback);
	showwaitdialog();
	return true;
}

function registercallback(result) {
	closewaitdialog();
	if (result.stage < 0) {
		waitdialog.close();
		alert(result.msg);
		showregisterdialog();
	} else {
		location.reload();//服务器端重新载入页面
	}
}
var GPS = {
	    PI : 3.14159265358979324,
	    x_pi : 3.14159265358979324 * 3000.0 / 180.0,
	    delta : function (lat, lon) {
	        // Krasovsky 1940
	        //
	        // a = 6378245.0, 1/f = 298.3
	        // b = a * (1 - f)
	        // ee = (a^2 - b^2) / a^2;
	        var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
	        var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
	        var dLat = this.transformLat(lon - 105.0, lat - 35.0);
	        var dLon = this.transformLon(lon - 105.0, lat - 35.0);
	        var radLat = lat / 180.0 * this.PI;
	        var magic = Math.sin(radLat);
	        magic = 1 - ee * magic * magic;
	        var sqrtMagic = Math.sqrt(magic);
	        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
	        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
	        return {'lat': dLat, 'lon': dLon};
	    },
	     
	    //WGS-84 to GCJ-02
	    gcj_encrypt : function (wgsLat, wgsLon) {
	        if (this.outOfChina(wgsLat, wgsLon))
	            return {'lat': wgsLat, 'lon': wgsLon};
	 
	        var d = this.delta(wgsLat, wgsLon);
	        return {'lat' : wgsLat + d.lat,'lon' : wgsLon + d.lon};
	    },
	    //GCJ-02 to WGS-84
	    gcj_decrypt : function (gcjLat, gcjLon) {
	        if (this.outOfChina(gcjLat, gcjLon))
	            return {'lat': gcjLat, 'lon': gcjLon};
	         
	        var d = this.delta(gcjLat, gcjLon);
	        return {'lat': gcjLat - d.lat, 'lon': gcjLon - d.lon};
	    },
	    //GCJ-02 to WGS-84 exactly
	    gcj_decrypt_exact : function (gcjLat, gcjLon) {
	        var initDelta = 0.01;
	        var threshold = 0.000000001;
	        var dLat = initDelta, dLon = initDelta;
	        var mLat = gcjLat - dLat, mLon = gcjLon - dLon;
	        var pLat = gcjLat + dLat, pLon = gcjLon + dLon;
	        var wgsLat, wgsLon, i = 0;
	        while (1) {
	            wgsLat = (mLat + pLat) / 2;
	            wgsLon = (mLon + pLon) / 2;
	            var tmp = this.gcj_encrypt(wgsLat, wgsLon)
	            dLat = tmp.lat - gcjLat;
	            dLon = tmp.lon - gcjLon;
	            if ((Math.abs(dLat) < threshold) && (Math.abs(dLon) < threshold))
	                break;
	 
	            if (dLat > 0) pLat = wgsLat; else mLat = wgsLat;
	            if (dLon > 0) pLon = wgsLon; else mLon = wgsLon;
	 
	            if (++i > 10000) break;
	        }
	        //console.log(i);
	        return {'lat': wgsLat, 'lon': wgsLon};
	    },
	    //GCJ-02 to BD-09
	    bd_encrypt : function (gcjLat, gcjLon) {
	        var x = gcjLon, y = gcjLat;  
	        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);  
	        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);  
	        bdLon = z * Math.cos(theta) + 0.0065;  
	        bdLat = z * Math.sin(theta) + 0.006; 
	        return {'lat' : bdLat,'lon' : bdLon};
	    },
	    //BD-09 to GCJ-02
	    bd_decrypt : function (bdLat, bdLon) {
	        var x = bdLon - 0.0065, y = bdLat - 0.006;  
	        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);  
	        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);  
	        var gcjLon = z * Math.cos(theta);  
	        var gcjLat = z * Math.sin(theta);
	        return {'lat' : gcjLat, 'lon' : gcjLon};
	    },
	    //WGS-84 to Web mercator
	    //mercatorLat -> y mercatorLon -> x
	    mercator_encrypt : function(wgsLat, wgsLon) {
	        var x = wgsLon * 20037508.34 / 180.;
	        var y = Math.log(Math.tan((90. + wgsLat) * this.PI / 360.)) / (this.PI / 180.);
	        y = y * 20037508.34 / 180.;
	        return {'lat' : y, 'lon' : x};
	        /*
	        if ((Math.abs(wgsLon) > 180 || Math.abs(wgsLat) > 90))
	            return null;
	        var x = 6378137.0 * wgsLon * 0.017453292519943295;
	        var a = wgsLat * 0.017453292519943295;
	        var y = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
	        return {'lat' : y, 'lon' : x};
	        //*/
	    },
	    // Web mercator to WGS-84
	    // mercatorLat -> y mercatorLon -> x
	    mercator_decrypt : function(mercatorLat, mercatorLon) {
	        var x = mercatorLon / 20037508.34 * 180.;
	        var y = mercatorLat / 20037508.34 * 180.;
	        y = 180 / this.PI * (2 * Math.atan(Math.exp(y * this.PI / 180.)) - this.PI / 2);
	        return {'lat' : y, 'lon' : x};
	        /*
	        if (Math.abs(mercatorLon) < 180 && Math.abs(mercatorLat) < 90)
	            return null;
	        if ((Math.abs(mercatorLon) > 20037508.3427892) || (Math.abs(mercatorLat) > 20037508.3427892))
	            return null;
	        var a = mercatorLon / 6378137.0 * 57.295779513082323;
	        var x = a - (Math.floor(((a + 180.0) / 360.0)) * 360.0);
	        var y = (1.5707963267948966 - (2.0 * Math.atan(Math.exp((-1.0 * mercatorLat) / 6378137.0)))) * 57.295779513082323;
	        return {'lat' : y, 'lon' : x};
	        //*/
	    },
	    // two point's distance
	    distance : function (latA, lonA, latB, lonB) {
	        var earthR = 6371000.;
	        var x = Math.cos(latA * this.PI / 180.) * Math.cos(latB * this.PI / 180.) * Math.cos((lonA - lonB) * this.PI / 180);
	        var y = Math.sin(latA * this.PI / 180.) * Math.sin(latB * this.PI / 180.);
	        var s = x + y;
	        if (s > 1) s = 1;
	        if (s < -1) s = -1;
	        var alpha = Math.acos(s);
	        var distance = alpha * earthR;
	        return distance;
	    },
	    outOfChina : function (lat, lon) {
	        if (lon < 72.004 || lon > 137.8347)
	            return true;
	        if (lat < 0.8293 || lat > 55.8271)
	            return true;
	        return false;
	    },
	    transformLat : function (x, y) {
	        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
	        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
	        ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
	        ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
	        return ret;
	    },
	    transformLon : function (x, y) {
	        var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
	        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
	        ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
	        ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
	        return ret;
	    }
	}



	