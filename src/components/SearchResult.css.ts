import { style } from "@vanilla-extract/css"

export const resultContainer = style({
    display: 'inline-block',
    flexGrow: 1,
    maxWidth: '400px',
    minWidth: '300px',
    flexBasis: '300px',
    '@media': {
        'screen and (min-width: 1024px)': {
            maxWidth: '450px',
            minWidth: '400px',
            flexBasis: '400px',
        },
    },
})

export const resultImage = style({
    height: '100%',
    width: '100%',
    objectFit: "contain",
})
