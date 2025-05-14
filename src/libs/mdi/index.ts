//Imports de comida
import { mdiAccountCircleOutline  } from '@mdi/js';
import { mdiCircle  } from '@mdi/js';
import { mdiClose } from '@mdi/js';
import { mdiMenu  } from '@mdi/js';
import { mdiBlockHelper } from '@mdi/js';
import { mdiEmailMultipleOutline } from '@mdi/js';
import { mdiPhoneInTalk } from '@mdi/js';
import { mdiMapMarker } from '@mdi/js';
import { mdiFacebook } from '@mdi/js';
import { mdiInstagram } from '@mdi/js';
import { mdiWhatsapp } from '@mdi/js';
import { mdiFood } from '@mdi/js';
import { mdiWater } from '@mdi/js';

//Imports de rede social
  interface InterfaceIconObject {
    [categoria: string]: {
      [nomeIcone: string]: string;
    };
  }
const icones: InterfaceIconObject = {
    geral: {
        AccountCircle: mdiAccountCircleOutline,
        Circle: mdiCircle,
        Close: mdiClose,
      },
      navegacao: {
        Menu: mdiMenu,
        Block: mdiBlockHelper,
      },
      contato: {
        Email: mdiEmailMultipleOutline,
        Phone: mdiPhoneInTalk,
        Location: mdiMapMarker,
      },
      social: {
        Facebook: mdiFacebook,
        Instagram: mdiInstagram,
        WhatsApp: mdiWhatsapp,
      },
      comidas: {
        food: mdiFood,
      },

};

export default icones;
