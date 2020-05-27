import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faTwitter,
  faMastodon,
  faGoogle,
  faFacebook,
  faDropbox,
  faDiscourse,
  faGithub,
  faGitlab
} from '@fortawesome/free-brands-svg-icons'
import {
  faAddressCard,
  faBolt,
  faChartBar,
  faCircle,
  faClock,
  faCloudDownloadAlt,
  faColumns,
  faComment,
  faCopy,
  faDownload,
  faEye,
  faFileAlt,
  faFileCode,
  faGlobe,
  faHistory,
  faMoon,
  faPaste,
  faPencilAlt,
  faPlus,
  faQuestionCircle,
  faShareSquare,
  faSignOutAlt,
  faSort,
  faSortDown,
  faSortUp,
  faSync,
  faThumbtack,
  faTimes,
  faTrash,
  faTv,
  faUpload,
  faUser,
  faUsers
} from '@fortawesome/free-solid-svg-icons'

export const setUpFontAwesome: (() => void) = () => {
  library.add(faBolt, faPlus, faChartBar, faTv, faFileAlt, faCloudDownloadAlt,
    faTrash, faSignOutAlt, faComment, faDiscourse, faMastodon, faGlobe, faUser,
    faThumbtack, faClock, faTimes, faGithub, faGitlab, faGoogle, faFacebook,
    faDropbox, faTwitter, faUsers, faAddressCard, faEye, faPencilAlt, faColumns,
    faMoon, faQuestionCircle, faShareSquare, faHistory, faFileCode, faPaste,
    faCircle, faSort, faDownload, faUpload, faTrash, faSync, faSortUp, faSortDown, faCopy)
}
