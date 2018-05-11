import logo from './assets/images/zena.svg'
import * as files from './assets'

const galleries = files.images.tags
const documents = files.articles.types.document
const images = files.images.items

const events = [
  { id:'x',
  rank:1,
    title:"J.Cacciola Gallery",
    date:"february 24 - april 10",
    description:"35 Mill Street\nBernardsville, NJ 0792\n908-204-197\nGallery hours\nTuesday - Friday 10 am - 6 p\nSaturday 10 am - 5 pm\nSun/Mon closed",
    image:galleries.bouquets[7].src
  },
  { id:'0',
  rank:0,
    title:"SYRI ARTS exhibition and auction",
    date:"30th of October 2013 till 9th of November 2013",
    description:"Beirut Exhibition Center - Biel - Beirut - Lebanon"
  },
  { id:'1',
  rank:0,
    title:"ABU DHABI ART FAIR",
    date:"20th of November 2013 till 23rd of April 2013",
    description:"Opening : 20- NOV-2013 @ARTSAWA gallery booth - Abu Dhabi - UAE"
  },
  { id:'2',
    rank:0,
    title:"SOLO SHOW",
    date:"14th of March 2014 till 1st of April 2014",
    description:"ALWANE Gallery - Saifi Village - Beirut - Lebanon"
  }
]
const assets = { galleries, documents, logo, images, zena:files.images.directories.zena, events }

export default assets