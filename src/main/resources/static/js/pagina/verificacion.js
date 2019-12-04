var verificationModule = (function() {
    var crear_cookie_sesion = function(usuario) {
      document.cookie = "nickname=" + encodeURIComponent(usuario);
      document.cookie = "sala=";
      var ca = document.cookie.split(";");
      //console.log("cookie inicial");
      //console.log(ca);
    };
  
    var readCookie = function(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");
      //console.log("cookie");
      //console.log(ca);
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
          return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }
      return null;
    };
  
    var check_cookie = function() {
      //console.log(document.cookie)
      var user = readCookie("nickname");
      if (user == null) {
        alert("Permiso denegado, debe logearse primero.");
        location.href = "/index.html";
      }
    };
  
    var borrar_cookie = function() {
      document.cookie = "nickname=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    };
  
    return {
      crear_cookie_sesion: crear_cookie_sesion,
      check_cookie: check_cookie,
      borrar_cookie: borrar_cookie,
      readCookie: readCookie
    };
  })();
  
