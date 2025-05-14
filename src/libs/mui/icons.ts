//Imports Geral
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from '@mui/icons-material/Menu';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import BlockIcon from '@mui/icons-material/Block';


interface InterfaceIconObject {
    [categoria: string]: {
      [nomeIcone: string]: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
    };
  }



const icones: InterfaceIconObject = {
    geral: {
        AccountCircle: AccountCircleIcon,
        Circle: CircleIcon,
        Close: CloseIcon,
      },
      navegacao: {
        Menu: MenuIcon,
        Block: BlockIcon,
      },
      contato: {
        Email: EmailIcon,
        Phone: PhoneIcon,
        LocationOn: LocationOnIcon,
      },
      social: {
        Facebook: FacebookIcon,
        Instagram: InstagramIcon,
        WhatsApp: WhatsAppIcon,
      },

};

export default icones;
