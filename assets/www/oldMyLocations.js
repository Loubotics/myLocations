// Generated by CoffeeScript 1.6.3
(function() {
  var map, myLocationsFailAttrs, myLocationsGotAttrs, myLocsFailOffers, myLocsFailSaved, myLocsGotOffers, myLocsInfo, myLocsSaved;

  myLocsInfo = (function() {
    function myLocsInfo() {
      this.offersInfo = new Array();
      this.savedInfo = new Array();
      this.attrsInfo = new Array();
      this.mapChecker = 0;
    }

    myLocsInfo.prototype.setOffersInfo = function(key, offer) {
      return this.offersInfo[key] = offer;
    };

    myLocsInfo.prototype.setSavedInfo = function(key, offer) {
      this.savedInfo[key] = offer;
      return console.log('saved' + JSON.stringify(this.offer[key]));
    };

    myLocsInfo.prototype.setAttrsInfo = function(key, attr) {
      return this.attrsInfo[key] = attr;
    };

    myLocsInfo.prototype.getOffersInfo = function(key) {
      return this.offersInfo[key];
      return console.log('offers' + JSON.stringify(this.offersInfo[key]));
    };

    myLocsInfo.prototype.getSavedInfo = function(key) {
      return this.savedInfo[key];
    };

    myLocsInfo.prototype.getAttrsInfo = function(key) {
      return this.attrsInfo[key];
    };

    return myLocsInfo;

  })();

  myLocsInfo = new myLocsInfo();

  map = null;

  window.init = function() {
    var centerLatLon, comms, x;
    $.mobile.showPageLoadingMsg("a", "Please wait");
    centerLatLon = new google.maps.LatLng(51.855079, -8.296752);
    map = new google.maps.Map(document.getElementById('mapDiv'), {
      zoom: 14,
      center: centerLatLon,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    x = window.innerWidth;
    $('#my_locations_content').css('width', 'x');
    comms = new BTAjax();
    comms.pushToQ('#', {
      lat: 51.899138,
      lon: -8.297131
    }, myLocationsGotAttrs, myLocationsFailAttrs);
    comms.execute();
    comms.pushToQ("", {
      lat: 51.899138,
      lon: -8.297131
    }, myLocsGotOffers, myLocsFailOffers);
    comms.execute();
    comms.pushToQ("", {
      userID: '520b88d8e4b032fe34fd3c63'
    }, myLocsSaved, myLocsFailSaved);
    return comms.execute();
  };

  myLocsSaved = function(results) {
    console.log('saved' + JSON.stringify(results));
    if (results != null) {
      return $(results).each(function() {
        var contentString, infoWindow, latlng, marker;
        myLocsInfo.setSavedInfo(this.id, this);
        latlng = new google.maps.LatLng(this.lat, this.lon);
        marker = new google.maps.Marker({
          position: latlng,
          icon: 'http://maps.google.com/mapfiles/marker_purple.png',
          map: map
        });
        contentString = " <div id = \"info_link\"><a href=\"#\" id=" + this.id + ">" + this.name + "</a></div> ";
        infoWindow = new google.maps.InfoWindow({
          content: contentString
        });
        return google.maps.event.addListener(marker, 'click', function() {
          return infoWindow.open(map, this);
        });
      });
    }
  };

  myLocsGotOffers = function(results) {
    if (results != null) {
      $(results).each(function() {
        var contentString, id, infoWindow, latlng, marker;
        myLocsInfo.setOffersInfo(this.id, this);
        latlng = new google.maps.LatLng(this.lat, this.lon);
        marker = new google.maps.Marker({
          position: latlng,
          icon: 'http://maps.google.com/mapfiles/marker_purple.png',
          map: map
        }, contentString = " <div id = \"info_link\"><a href=\"#\" id=" + this.id + ">" + this.advertiser + "</a></div> ");
        infoWindow = new google.maps.InfoWindow({
          content: contentString
        });
        google.maps.event.addListener(marker, 'click', function() {
          return infoWindow.open(map, this);
        });
        id = '#' + this.id;
        return $(id).live('click', function() {
          return alert(JSON.stringify(myLocsInfo.getOffersInfo($(this).attr('id'))));
        });
      });
    } else {
      alert('a');
    }
    return $.mobile.hidePageLoadingMsg();
  };

  myLocationsGotAttrs = function(results) {
    if (results != null) {
      $(results).each(function() {
        var contentString, id, infoWindow, latlng, marker;
        myLocsInfo.setAttrsInfo(this.id, this);
        latlng = new google.maps.LatLng(this.lat, this.lon);
        marker = new google.maps.Marker({
          position: latlng,
          icon: 'http://maps.google.com/mapfiles/marker_yellow.png',
          map: map
        }, contentString = " <div id = \"info_link\"><a href=\"#\" id=" + this.id + ">" + this.name + "</a></div> ");
        infoWindow = new google.maps.InfoWindow({
          content: contentString
        });
        google.maps.event.addListener(marker, 'click', function() {
          return infoWindow.open(map, this);
        });
        id = '#' + this.id;
        return $(id).live('click', function() {
          return alert($(this).attr('id'));
        });
      });
    } else {
      alert('a');
    }
    return $.mobile.hidePageLoadingMsg();
  };

  myLocationsFailAttrs = function(error) {
    return console.log(error);
  };

  myLocsFailOffers = function(error) {
    return console.log(error);
  };

  myLocsFailSaved = function(error) {
    return console.log(error);
  };

}).call(this);
