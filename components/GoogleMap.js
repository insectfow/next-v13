import { useEffect, useState } from "react";
import Script from "next/script";
const GoogleMap = () => {
  var config = {};

  const getLocation = () => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // position 객체 내부에 timestamp(현재 시간)와 coords 객체
          const time = new Date(position.timestamp);

          config = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  };

  const initMap = () => {
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: config,
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_OPEN_API}&callback=${initMap}&region=kr`}
      />
      <div id="map"></div>
    </>
  );
};

export default GoogleMap;
