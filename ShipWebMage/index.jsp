<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>比孚船舶网</title>
<link rel="Shortcut Icon" href="/ShipWebMage/img/ship.ico" >
<link rel="Bookmark" href="/ShipWebMage/img/ship.ico" >
<link href="/ShipWebMage/css/mycss.css" rel="stylesheet" type="text/css" />
<link href="/ShipWebMage/css/menu.css" rel="stylesheet" type="text/css"/>
<link href="/ShipWebMage/css/pagination.css" rel="stylesheet" type="text/css" />
<link href="/ShipWebMage/css/custom-theme/jquery-ui-1.9.2.css" rel="stylesheet" type="text/css" />
<link href="/ShipWebMage/skins/black.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/ShipWebMage/js/jquery-1.8.3.js"></script>
<script type="text/javascript" src="/ShipWebMage/js/jquery.easing.1.3.js"></script>
<script type="text/javascript" src="/ShipWebMage/js/mynewjs.js"></script>
<script type="text/javascript" src="/ShipWebMage/js/jquery.artDialog.js"></script>
<script type="text/javascript" src="/ShipWebMage/js/jquery-ui-1.9.2.js"></script>
<script type="text/javascript" src="/ShipWebMage/js/highstock.js" ></script>
<script type="text/javascript" src="/ShipWebMage/js/exporting.js"></script>
<script type="text/javascript" src="/ShipWebMage/js/ui.datepicker-zh-CN.js"></script>
<script type="text/javascript" src="/ShipWebMage/js/jquery.pagination.js"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=k5PCFTYCvv5WcuWsKi8T04eA"></script>
<script type="text/javascript" src="http://developer.baidu.com/map/jsdemo/demo/changeMore.js"></script>
<script type="text/javascript">
var isIE=!!window.ActiveXObject;
var isIE6=isIE&&!window.XMLHttpRequest;
var isIE8=isIE&&!!document.documentMode;
var isIE7=isIE&&!isIE6&&!isIE8;
if (isIE){
if (isIE6){
alert("您正在使用的 ie6 浏览器，请选择更高版本 ");
}else if (isIE8){
alert("您正在使用的 ie8 浏览器，请选择更高版本");
}else if (isIE7){
alert("您正在使用的 ie7 浏览器，请选择更高版本");
}
}
</script>
<!-- <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDUFtcSCp_1K0-vS1ZKrLmeVpfsRvYhg1c&sensor=false"></script> -->
</head>
 <%  ResourceBundle myResourcesBundle = ResourceBundle.getBundle("resource.myproperties",request.getLocale()); %>

<body>
        <div class="body">
          <!-- <div class="logo"><a href="#"><img src="../img/1.jpg" alt="logo" name="logo" width="100%" height="100" id="logo" style="background: #8090AB; display:block;" /></a> </div> -->
                <div class="body">
                                <div class="login">
                                        <div id="bar1">
                                                <a id="fanhui"><%=myResourcesBundle.getString("back")%></a>
                                        </div>
                                        <a href="http://localhost:8080/ShipWebMage/index.jsp" class="brand" ><%=myResourcesBundle.getString("webName")%></a>
                                        <div id="bar2">
                                        </div>
                                        <div id="user">
                                        </div>
                                </div>

                                <div class="body">
                                        <div class="float-open" id="float-open" style="left:-2px;">
                                                <a class="open-btn" id="open-btn" href="javascript:void(0);">&gt;</a>
                                        </div>
                                        <div class="float-news" id="float-news" style="left:-60px;">
                                                <a class="float-close" href="javascript:void(0);">X</a>
                                        </div>
                                        <div class="gps">
                                                <button type="button" id="baidu" title="Baidu Map">Baidu</button>
                                                <button type="button" id="google" title="Google Map">Google</button>
                                                <button type="button" id="haitu" title="Haitu Map">Haitu</button>
                                        </div>

                                        <div class="menu" id="menu">
                                                <div class="content">
                                                        <ul class="menu-one">
                                                                <li class="firstChild">
                                                                        <div class="header">
                                                                            <span class="txt" ><%=myResourcesBundle.getString("myFleet")%></span>
                                                                            <span class="txt"></span><span class="arrow"> </span>
                                                                        </div>
                                                                        <ul class="menu-two" id="shiplist">
                                                                        </ul>
                                                                </li>
                                                                <li >
                                                                        <div class="header">
                                                                                <span class="txt" ><%=myResourcesBundle.getString("fleetMag")%></span>
                                                                                <span class="arrow"> </span>
                                                                        </div>
                                                                        <ul class="menu-two">
                                                                                <li class="firstChild">
                                                                                        <a id="addshipclick" class="click" ><%=myResourcesBundle.getString("addShip")%></a>
                                                                                </li>
                                                                                <li>
                                                                                        <a id="getshiplist" class="click" ><%=myResourcesBundle.getString("shipList")%></a>
                                                                                </li>
                                                                        </ul>
                                                                </li>
                                                        </ul>
                                                </div>
                                       </div>


                                        <div class="main" id="main">
                                                <div id="map"> </div>
                                                <div id="map2"> </div>
                                                <div id="map3"> </div>
                                        </div>


                                        <div class="sheet" id="sheet">
                                                <div class="sheetbody" id="canvasDiv">
                                                </div>
                                        </div>

                                        <div class="shipbar" id="shipbar">
                                                <div id="showshiplist" >
                                                        <table class="gridtable" id="tab1" border="1"style="margin:0 auto; width:90%;">
                                                        <tr>
                                                        <th >id</th>
                                                        <th ><%=myResourcesBundle.getString("name")%></th>
                                                        <th ><%=myResourcesBundle.getString("company")%></th>
                                                        <th ><%=myResourcesBundle.getString("callNum")%></th>
                                                        <th>mmsi</th>
                                                        <th ><%=myResourcesBundle.getString("homePort")%></th>
                                                        <th ><%=myResourcesBundle.getString("length")%>（米）</th>
                                                        <th ><%=myResourcesBundle.getString("width")%>（米）</th>
                                                        <th ><%=myResourcesBundle.getString("load")%>（吨）</th>
                                                        <th ><%=myResourcesBundle.getString("operation")%></th>
                                                        </tr>
                                                        </table>
                                                        <div id="page" class="pagination">
                                                        </div>
                                                        <tr>
                                                                <td>
                                                                        <a id="shiplistqx" class="click" ><%=myResourcesBundle.getString("back")%></a>
                                                                </td>
                                                        </tr>
                                                </div>
                                        </div>
                                        <div class="shipbar" id="xushipbar">
                                                <div id="xgcb_div">
                                                        <table style="margin:0 auto;">
                                                                <tr>
                                                                        <td ><%=myResourcesBundle.getString("name")%>:</td>
                                                                        <td><input type="text" id="g_name" /></td>
                                                                </tr>
                                                                <tr>
                                                                        <td>IMEI:</td>
                                                                        <td><input type="number" id="g_imei" disabled/></td>
                                                                </tr>
                                                                <tr>
                                                                        <td ><%=myResourcesBundle.getString("category")%>:</td>
                                                                        <td><input type="text" id="g_category" /></td>
                                                                </tr>
                                                                <tr>
                                                                        <td ><%=myResourcesBundle.getString("company")%>:</td>
                                                                        <td><input type="text" id="g_company" /></td>
                                                                </tr>
                                                                <tr>
                                                                        <td ><%=myResourcesBundle.getString("callNum")%>:</td>
                                                                        <td><input type="text" id="g_callsign" /></td>
                                                                </tr>
                                                                <tr>
                                                                        <td>mmsi:</td>
                                                                        <td><input type="text" id="g_mmsi" /></td>
                                                                </tr>
                                                                <tr>
                                                                        <td ><%=myResourcesBundle.getString("homePort")%>:</td>
                                                                        <td><select id="g_port"></select></td>
                                                                </tr>
                                                                <tr>
                                                                        <td ><%=myResourcesBundle.getString("length")%>:</td>
                                                                        <td><input type="number" id="g_length" /></td>
                                                                </tr>
                                                                <tr>
                                                                        <td ><%=myResourcesBundle.getString("width")%>:</td>
                                                                        <td><input type="number" id="g_width" /></td>
                                                                </tr>
                                                                <tr>
                                                                        <td ><%=myResourcesBundle.getString("load")%>:</td>
                                                                        <td><input type="number" id="g_tload" /></td>
                                                                </tr>
                                                                <tr>
                                                                        <td><a id="xgcbtj" class="click" ><%=myResourcesBundle.getString("submit")%></a></td>
                                                                        <td><a id="gmqx" class="click" ><%=myResourcesBundle.getString("back")%></a></td>
                                                                </tr>
                                                        </table>
                                                </div>
                                        </div>
                                        <div class="shipbar" id="addshipbar">
                                                <div id="zjcb_div" >
                                                        <table class="form" style="margin:0 auto;">
                                                                <tr>
                                                                        <td><%=myResourcesBundle.getString("name")%>:</td>
                                                                        <td><input type="text" id="z_name" /></td>
                                                                </tr>
                                                                <tr>
                                                                        <td>IMEI:</td>
                                                                        <td><input type="number" id="z_imei" /></td>
                                                                </tr>
                                                                <tr>
                                                                        <td><%=myResourcesBundle.getString("category")%>:</td>
                                                                        <td><input type="number" id="z_category" /></td>
                                                                </tr>
                                                                <tr>
                                                                        <td><%=myResourcesBundle.getString("company")%>:</td>
                                                                        <td><input type="text" id="z_company" /></td>
                                                                </tr>
                                                                <tr>
                                                                        <td><%=myResourcesBundle.getString("callNum")%>:</td>
                                                                        <td><input type="text" id="z_callsign" /></td>
                                                                </tr>
                                                                <tr>
                                                                        <td>mmsi:</td>
                                                                        <td><input type="text" id="z_mmsi" /></td>
                                                                </tr>
                                                                <tr>
                                                                        <td><%=myResourcesBundle.getString("homePort")%>:</td>
                                                                        <td><select id="z_port"></select></td>
                                                                </tr>
                                                                <tr>
                                                                        <td><%=myResourcesBundle.getString("length")%>:</td>
                                                                        <td><input type="number" id="z_length" /></td>
                                                                </tr>
                                                                <tr>
                                                                        <td><%=myResourcesBundle.getString("width")%>:</td>
                                                                        <td><input type="number" id="z_width" /></td>
                                                                </tr>
                                                                <tr>
                                                                        <td><%=myResourcesBundle.getString("load")%>:</td>
                                                                        <td><input type="number" id="z_tload" /></td>
                                                                </tr>

                                                                <tr>
                                                                        <td><a id="zjcb_sb" class="click"><%=myResourcesBundle.getString("submit")%></a></td>
                                                                        <td><a id="zjqx" class="click" ><%=myResourcesBundle.getString("Cancel")%></a></td>
                                                                </tr>
                                                        </table>
                                                </div>
                                        </div>
                                </div>
                </div>
        </div>

        <div class="hide" id="register">
                <link href="/ShipWebMage/css/newcss.css" rel="stylesheet" tyle="text/css"/>
                <div id="tw"> 
                      <form >
                              <div id='name' class='outerDiv'>
                                      <label for="user"><%=myResourcesBundle.getString("username")%>:</label>
                                      <input type="text"  id="register_user"required placeholder="请输入用户名" />
                                      <div class='message' id='userDiv'> </div>
                              </div>
                              <div class='clearfix'></div>
                              <div id='username' class='outerDiv'>
                                      <label for="number" ><%=myResourcesBundle.getString("setpassword")%>:</label>
                                      <input type="password"  id="register_password" required placeholder="输入密码"  />
                                      <div class='message' id='passwordDiv' > </div>
                              </div>
                              <div class='clearfix'></div>
                              <div id='password' class='outerDiv'>
                                      <label for="password" ><%=myResourcesBundle.getString("password1")%>:</label>
                                      <input type="password"  required placeholder="确认密码"/>
                                      <div class='message' id='password1Div'> </div>
                              </div>
                              <div class='clearfix'></div>
                              <div id='email' class='outerDiv'>
                                      <label for="phone" ><%=myResourcesBundle.getString("phone")%>:</label>
                                      <input type="tel"  required placeholder="输入手机号" />
                                      <div class='message' id='phoneDiv'> aa </div>
                              </div>
                              <div class='clearfix'></div>
                              <div id='email' class='outerDiv'>
                                      <label for="email" ><%=myResourcesBundle.getString("email")%>:</label>
                                      <input type="email"  required  placeholder="输入邮箱地址"/>
                                      <div class='message' id='emailDiv'> </div>
                              </div>
                              <div class='clearfix'></div>
                      </form>
                <div class="clearfix"></div>
                </div>
        </div>


        <div class="hide" id="login">
                <link href="/ShipWebMage/css/newcss.css" rel="stylesheet" tyle="text/css"/>
                <div id="tw" style="width:400px">
                        <script>
                        </script>
                        <form >
                              <div id='name' class='outerDiv'>
                                      <label for="user" ><%=myResourcesBundle.getString("username")%>:</label>
                                      <input type="text" name="user" id="login_user"  placeholder="input username" />
                              </div>
                              <div class='clearfix'>
                              </div>
                              <div id='username' class='outerDiv'>
                                    <label for="number" ><%=myResourcesBundle.getString("password")%>:</label>
                                    <input type="password" name="password" id="login_password" placeholder="input password"  />
                              </div>
                        </form>
                        <div class="clearfix">
                        </div>
                </div>
        </div>
        <div id="shipinfo">
                <table>
                        <tr>
                                <td ><%=myResourcesBundle.getString("callNum")%>：</td>
                                <td id="callsign" ></td>
                                <td  ><%=myResourcesBundle.getString("latitude")%>：</td>
                                <td id="latitude"  ></td>
                        </tr>
                        <tr>
                                <td>MMSI:</td>
                                <td id="mmsi"></td>
                                <td><%=myResourcesBundle.getString("longitude")%>：</td>
                                <td id="longitude"></td>
                        </tr>
                        <tr>
                                <td><%=myResourcesBundle.getString("length")%>：</td>
                                <td id="length"></td>
                                <td><%=myResourcesBundle.getString("direction")%>：</td>
                                <td id="heading"></td>
                        </tr>
                        <tr>
                                <td><%=myResourcesBundle.getString("width")%>：</td>
                                <td id="width"></td>
                                <td><%=myResourcesBundle.getString("speed")%>：</td>
                                <td id="speed"></td>
                        </tr>
                        <tr>
                                <td><%=myResourcesBundle.getString("load")%>：</td>
                                <td id="tload"></td>
                                <td><%=myResourcesBundle.getString("time")%>：</td>
                                <td id="time"></td>
                        </tr>
                </table>
                <div id="seach" class="hide">
                        <%=myResourcesBundle.getString("startTime")%>:<input placeholder='开始日期' id="date1" type="text" /><br>
                        <%=myResourcesBundle.getString("endTime")%>:<input placeholder='结束日期' id="date2" type="text" />
                </div>
        </div>
</body>
</html>

