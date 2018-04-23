import Typography from 'typography'

const config = {
  baseFontSize:"15.75px",
  baseLineHeight:1.58,
  blockMarginBottom:1,
  bodyFontFamily:["Open Sans","sans-serif"],
  bodyGray:20,
  bodyGrayHue:0,
  bodyWeight:400,
  boldWeight:700,
  googleFonts:[
    {
      name: "Open Sans",
      styles:["400"]
    },
    {
      name:"Open Sans",
      styles:["400","400i","700","700i"]
    }
  ],
  headerFontFamily:["Open Sans","sans-serif"],
  headerGray:0,
  headerGrayHue:0,
  headerWeight:"400",
  includeNormalize:true,
  scaleRatio:2,
  title:"Zena"
}

export const typography = new Typography(config)

export default typography
