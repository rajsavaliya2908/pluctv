import React from 'react';
import ScanIcon from '../assets/icons/ic_scan.svg';
import PowerIcon from '../assets/icons/ic_power.svg';
import SeatIcon from '../assets/icons/ic_seat.svg';
import MapMarker from '../assets/icons/ic_marker.svg';
import Drawer from '../assets/icons/ic_menu.svg';
import Back from '../assets/icons/ic_back.svg';
import Logo from '../assets/icons/rugged_logo.svg';
import Bike from '../assets/icons/ic_bike.svg';
import {Colors} from './Colors';

export const Icons = {
  scan: <ScanIcon width={16} height={16} />,
  power: <PowerIcon width={26} height={26} />,
  seat: <SeatIcon width={26} height={26} />,
  marker: <MapMarker width={56} height={56} fill={Colors.yellow} />,
  drawer: <Drawer />,
  arrow_back: <Back />,
  logo: <Logo />,
  bike: <Bike width={20} height={20} fill={Colors.charcoal_darkGrey} />,
};
