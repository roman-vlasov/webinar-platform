import ArrowDown from 'Icons/arrow-down.svg'
import ArrowLeft from 'Icons/arrow-left.svg'
import ArrowRight from 'Icons/arrow-right.svg'
import GamePrimary from 'Icons/game-primary.svg'
import GameSecondary from 'Icons/game-secondary.svg'
import Done from 'Icons/done.svg'
import StarFill from 'Icons/star-fill.svg'
import StarEmpty from 'Icons/star-empty.svg'
import Close from 'Icons/close.svg'

const publicPath = process.env.VUE_APP_PUBLIC_PATH

const icons = {
    ArrowDown,
    GamePrimary,
    GameSecondary,
    Done,
    StarFill,
    StarEmpty,
    Close,
    ArrowLeft,
    ArrowRight
}

const images = {
    desktopLogo: `${publicPath}/logo.png`,
    mobileLogo: `${publicPath}/logo.png`
}

const titles = {
    siteTitle: 'Вебинары'
}

export { icons, images, titles }