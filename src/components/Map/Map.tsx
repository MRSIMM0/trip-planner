"use client";

import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { icon } from "leaflet";

import useContextMenuStore from "@/store/contextMenuStore";
import ContextMenu from "./ContextMenu/ContextMenu";
import ContextMenuHandler from "./MapUtils/ContextMenuHandler";
import SeachButton from "./Search/SearchButton/SeachButton";
import useSearchBarStore from "@/store/searchBarStore";
import useMapStore from "@/store/mapStore";
import { use, useEffect, useRef } from "react";
import ChangeView from "./MapUtils/ChangeView";
import useDayStore from "@/store/dayStore";

const ICON = icon({
  iconUrl: "/marker.png",
  iconSize: [48, 48],
});

export const Map = () => {
  const { isOpen: isMarkerOpen } = useContextMenuStore();
  const { isOpen: isSearchOpen, open, close } = useSearchBarStore();
  const { open: openContextMenu } = useContextMenuStore();
  const { getVisibleMarkers } = useDayStore();

  console.log(getVisibleMarkers());

  const markers = [{'id': '19.945608550.0567922', 'coordinates': {'lng': 19.9456085, 'lat': 50.0567922}}, {'id': '19.945526450.0567743', 'coordinates': {'lng': 19.9455264, 'lat': 50.0567743}}, {'id': '19.945470550.0567701', 'coordinates': {'lng': 19.9454705, 'lat': 50.0567701}}, {'id': '19.945399150.0567653', 'coordinates': {'lng': 19.9453991, 'lat': 50.0567653}}, {'id': '19.945363150.056765', 'coordinates': {'lng': 19.9453631, 'lat': 50.056765}}, {'id': '19.945358550.0567591', 'coordinates': {'lng': 19.9453585, 'lat': 50.0567591}}, {'id': '19.945349450.0567475', 'coordinates': {'lng': 19.9453494, 'lat': 50.0567475}}, {'id': '19.945315650.0567036', 'coordinates': {'lng': 19.9453156, 'lat': 50.0567036}}, {'id': '19.945311750.0566985', 'coordinates': {'lng': 19.9453117, 'lat': 50.0566985}}, {'id': '19.94530150.0566854', 'coordinates': {'lng': 19.945301, 'lat': 50.0566854}}, {'id': '19.945289650.0566714', 'coordinates': {'lng': 19.9452896, 'lat': 50.0566714}}, {'id': '19.945283450.0566634', 'coordinates': {'lng': 19.9452834, 'lat': 50.0566634}}, {'id': '19.945220950.0565839', 'coordinates': {'lng': 19.9452209, 'lat': 50.0565839}}, {'id': '19.945128850.0564707', 'coordinates': {'lng': 19.9451288, 'lat': 50.0564707}}, {'id': '19.945115150.0564545', 'coordinates': {'lng': 19.9451151, 'lat': 50.0564545}}, {'id': '19.944819750.0561068', 'coordinates': {'lng': 19.9448197, 'lat': 50.0561068}}, {'id': '19.944778450.0560565', 'coordinates': {'lng': 19.9447784, 'lat': 50.0560565}}, {'id': '19.944525850.0557328', 'coordinates': {'lng': 19.9445258, 'lat': 50.0557328}}, {'id': '19.944261750.055404', 'coordinates': {'lng': 19.9442617, 'lat': 50.055404}}, {'id': '19.944211950.0553402', 'coordinates': {'lng': 19.9442119, 'lat': 50.0553402}}, {'id': '19.944068450.0553894', 'coordinates': {'lng': 19.9440684, 'lat': 50.0553894}}, {'id': '19.943689550.0554262', 'coordinates': {'lng': 19.9436895, 'lat': 50.0554262}}, {'id': '19.943427750.0554516', 'coordinates': {'lng': 19.9434277, 'lat': 50.0554516}}, {'id': '19.943197150.0554737', 'coordinates': {'lng': 19.9431971, 'lat': 50.0554737}}, {'id': '19.942321250.0555592', 'coordinates': {'lng': 19.9423212, 'lat': 50.0555592}}, {'id': '19.941968950.0555936', 'coordinates': {'lng': 19.9419689, 'lat': 50.0555936}}, {'id': '19.941940450.0555961', 'coordinates': {'lng': 19.9419404, 'lat': 50.0555961}}, {'id': '19.941026750.0556848', 'coordinates': {'lng': 19.9410267, 'lat': 50.0556848}}, {'id': '19.940306950.0557546', 'coordinates': {'lng': 19.9403069, 'lat': 50.0557546}}, {'id': '19.940202350.0557648', 'coordinates': {'lng': 19.9402023, 'lat': 50.0557648}}, {'id': '19.940180550.0557669', 'coordinates': {'lng': 19.9401805, 'lat': 50.0557669}}, {'id': '19.940107150.0554697', 'coordinates': {'lng': 19.9401071, 'lat': 50.0554697}}, {'id': '19.939991150.0549994', 'coordinates': {'lng': 19.9399911, 'lat': 50.0549994}}, {'id': '19.93996750.054902', 'coordinates': {'lng': 19.939967, 'lat': 50.054902}}, {'id': '19.939929450.0547712', 'coordinates': {'lng': 19.9399294, 'lat': 50.0547712}}, {'id': '19.939860450.0546681', 'coordinates': {'lng': 19.9398604, 'lat': 50.0546681}}, {'id': '19.939777850.0546016', 'coordinates': {'lng': 19.9397778, 'lat': 50.0546016}}, {'id': '19.939603950.0544615', 'coordinates': {'lng': 19.9396039, 'lat': 50.0544615}}, {'id': '19.9393150.0542453', 'coordinates': {'lng': 19.93931, 'lat': 50.0542453}}, {'id': '19.939278450.0542151', 'coordinates': {'lng': 19.9392784, 'lat': 50.0542151}}, {'id': '19.93922650.0540981', 'coordinates': {'lng': 19.939226, 'lat': 50.0540981}}, {'id': '19.93921250.0541019', 'coordinates': {'lng': 19.939212, 'lat': 50.0541019}}, {'id': '19.939140650.0541216', 'coordinates': {'lng': 19.9391406, 'lat': 50.0541216}}, {'id': '19.938997550.0541609', 'coordinates': {'lng': 19.9389975, 'lat': 50.0541609}}, {'id': '19.938603550.054397', 'coordinates': {'lng': 19.9386035, 'lat': 50.054397}}, {'id': '19.938363950.0545596', 'coordinates': {'lng': 19.9383639, 'lat': 50.0545596}}, {'id': '19.938193350.0546675', 'coordinates': {'lng': 19.9381933, 'lat': 50.0546675}}, {'id': '19.938011950.0548159', 'coordinates': {'lng': 19.9380119, 'lat': 50.0548159}}, {'id': '19.937904550.0548991', 'coordinates': {'lng': 19.9379045, 'lat': 50.0548991}}, {'id': '19.937819650.0549822', 'coordinates': {'lng': 19.9378196, 'lat': 50.0549822}}, {'id': '19.93769350.0551204', 'coordinates': {'lng': 19.937693, 'lat': 50.0551204}}, {'id': '19.937572450.0552411', 'coordinates': {'lng': 19.9375724, 'lat': 50.0552411}}, {'id': '19.937478450.0552981', 'coordinates': {'lng': 19.9374784, 'lat': 50.0552981}}, {'id': '19.937383650.0553287', 'coordinates': {'lng': 19.9373836, 'lat': 50.0553287}}, {'id': '19.937282250.0553525', 'coordinates': {'lng': 19.9372822, 'lat': 50.0553525}}, {'id': '19.937035650.0553878', 'coordinates': {'lng': 19.9370356, 'lat': 50.0553878}}, {'id': '19.936801150.0554177', 'coordinates': {'lng': 19.9368011, 'lat': 50.0554177}}, {'id': '19.936689950.0554329', 'coordinates': {'lng': 19.9366899, 'lat': 50.0554329}}, {'id': '19.936536150.0554543', 'coordinates': {'lng': 19.9365361, 'lat': 50.0554543}}, {'id': '19.936264650.0554907', 'coordinates': {'lng': 19.9362646, 'lat': 50.0554907}}, {'id': '19.936068450.055505', 'coordinates': {'lng': 19.9360684, 'lat': 50.055505}}, {'id': '19.935879250.0555084', 'coordinates': {'lng': 19.9358792, 'lat': 50.0555084}}, {'id': '19.935769450.0554987', 'coordinates': {'lng': 19.9357694, 'lat': 50.0554987}}, {'id': '19.935656750.0554813', 'coordinates': {'lng': 19.9356567, 'lat': 50.0554813}}, {'id': '19.934838650.0553014', 'coordinates': {'lng': 19.9348386, 'lat': 50.0553014}}, {'id': '19.934687750.0552693', 'coordinates': {'lng': 19.9346877, 'lat': 50.0552693}}, {'id': '19.933503650.055013', 'coordinates': {'lng': 19.9335036, 'lat': 50.055013}}, {'id': '19.933461750.0550074', 'coordinates': {'lng': 19.9334617, 'lat': 50.0550074}}, {'id': '19.933413250.0550056', 'coordinates': {'lng': 19.9334132, 'lat': 50.0550056}}, {'id': '19.933359350.0550107', 'coordinates': {'lng': 19.9333593, 'lat': 50.0550107}}, {'id': '19.933296850.0550212', 'coordinates': {'lng': 19.9332968, 'lat': 50.0550212}}, {'id': '19.932615750.0551868', 'coordinates': {'lng': 19.9326157, 'lat': 50.0551868}}, {'id': '19.932259750.055271', 'coordinates': {'lng': 19.9322597, 'lat': 50.055271}}, {'id': '19.932108650.0553069', 'coordinates': {'lng': 19.9321086, 'lat': 50.0553069}}, {'id': '19.932004950.0553058', 'coordinates': {'lng': 19.9320049, 'lat': 50.0553058}}, {'id': '19.931866450.0553389', 'coordinates': {'lng': 19.9318664, 'lat': 50.0553389}}, {'id': '19.93157350.0554099', 'coordinates': {'lng': 19.931573, 'lat': 50.0554099}}, {'id': '19.931432250.0554443', 'coordinates': {'lng': 19.9314322, 'lat': 50.0554443}}, {'id': '19.930415550.0556876', 'coordinates': {'lng': 19.9304155, 'lat': 50.0556876}}, {'id': '19.930368350.0556226', 'coordinates': {'lng': 19.9303683, 'lat': 50.0556226}}, {'id': '19.930302150.055529', 'coordinates': {'lng': 19.9303021, 'lat': 50.055529}}, {'id': '19.930239250.0555079', 'coordinates': {'lng': 19.9302392, 'lat': 50.0555079}}, {'id': '19.930156750.0555016', 'coordinates': {'lng': 19.9301567, 'lat': 50.0555016}}, {'id': '19.929942650.0555451', 'coordinates': {'lng': 19.9299426, 'lat': 50.0555451}}, {'id': '19.929764450.0555796', 'coordinates': {'lng': 19.9297644, 'lat': 50.0555796}}, {'id': '19.929588150.0556178', 'coordinates': {'lng': 19.9295881, 'lat': 50.0556178}}, {'id': '19.929529350.0556554', 'coordinates': {'lng': 19.9295293, 'lat': 50.0556554}}, {'id': '19.929499350.0557177', 'coordinates': {'lng': 19.9294993, 'lat': 50.0557177}}, {'id': '19.929496850.0558123', 'coordinates': {'lng': 19.9294968, 'lat': 50.0558123}}, {'id': '19.929500450.0558461', 'coordinates': {'lng': 19.9295004, 'lat': 50.0558461}}, {'id': '19.929515950.0559095', 'coordinates': {'lng': 19.9295159, 'lat': 50.0559095}}, {'id': '19.92906950.0560256', 'coordinates': {'lng': 19.929069, 'lat': 50.0560256}}, {'id': '19.928935650.0560602', 'coordinates': {'lng': 19.9289356, 'lat': 50.0560602}}, {'id': '19.928898750.0560757', 'coordinates': {'lng': 19.9288987, 'lat': 50.0560757}}, {'id': '19.928865350.0560897', 'coordinates': {'lng': 19.9288653, 'lat': 50.0560897}}, {'id': '19.92882150.0561118', 'coordinates': {'lng': 19.928821, 'lat': 50.0561118}}, {'id': '19.928779150.0560784', 'coordinates': {'lng': 19.9287791, 'lat': 50.0560784}}, {'id': '19.92839950.0557766', 'coordinates': {'lng': 19.928399, 'lat': 50.0557766}}, {'id': '19.92838750.0557665', 'coordinates': {'lng': 19.928387, 'lat': 50.0557665}}, {'id': '19.928371950.0557545', 'coordinates': {'lng': 19.9283719, 'lat': 50.0557545}}]

  const mapRef = useRef(null);

  const keyDown = (e: any) => {
    if (e.ctrlKey && e.key === 'Alt') {
      open();
    }

    if (e.key === "Escape") {
      close();
    }
  }

  useEffect(() => {
    if(mapRef.current == null) return;
    mapRef.current.addEventListener('keyup', keyDown, false )
    //ts-ignore
  }, [mapRef]);


  const { center, zoom } = useMapStore();

  useEffect(() => {
    console.log(center);
  }, [center]);

  return (
    <main ref={mapRef} className={styles.map}>
      {isMarkerOpen && <ContextMenu />}
      <SeachButton />
      <MapContainer
        attributionControl={false}
        zoomControl={false}
        className={styles.map}
        center={center}
        zoom={zoom}
        scrollWhellZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, i) => (
          <Marker
          eventHandlers={{
            click: (e) => {
            },
            contextmenu: (e) => {
              openContextMenu({x: e.containerPoint.x, y: e.containerPoint.y}, marker.coordinates, true);
            }
          }} key={marker.id} icon={ICON} position={marker.coordinates}></Marker>
        ))}
        <ContextMenuHandler />
        <ChangeView center={center} zoom={zoom} />
      </MapContainer>
    </main>
  );
};

