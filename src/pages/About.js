import React from 'react'
import { Content } from '../wrappers/Content'

export const About = ({zena}) => (
  <Content>
    <h1>Zena Assi</h1>
    <img src={zena[1].src} alt={zena[1].basename.replace('-',' ')}/>
    <p>Born in 1974, Lebanon, Zena Assi lives and works in Beirut. She graduated with honors from l’Academie Libanaise des Beaux Arts (ALBA), worked in advertising and taught in universities.</p>
    <p>Her contemporary work on canvas draws inspiration from the relations and conflicts between the individual and his spatial environment, society and its surroundings. The artist uses various supports and mediums to document and explore the cultural and social changes of her country. Her work takes shape in installation, animation, sculpture, and mainly paintings on canvas.</p>
    <p>She has been present in the salon d’automne of the Sursock museum Beirut Lebanon, since 2005 where she received the prize ‘mention speciale du jury’ in 2009. She also won the BMW, mini cooper’s 50th anniversary, ‘best design for the middle east’, 2009. Her work is part of the Barjeel art foundation Sharjah UAE, the ALBA University, the Aoude collection , took part in the 12th Cairo biennale in 2011 and was repeatedly auctioned in Christie’s Dubai and Sotheby’s London.</p>
    <p>Assi has exhibited in solo as well as collective shows across Europe, the Middle East, and Northern America including- Alwane gallery (Beirut Lebanon), Artsawa gallery (Dubai UAE), Zoom (Miami USA), Contemparabia Dome (Beirut Lebanon), Paris Abu Dhabi art fair (Abu Dhabi UAE), Albareh gallery (Adliya kingdom of Bahrain), Shubbak (London UK), Menasart fair Biel (Beirut Lebanon), Rebirth Beirut Exhibition Center (Beirut Lebanon), Abu Dhabi art fair (Abu Dhabi UAE), Subtitled Apeal Royal college of art (London UK), Espace Claude Lemand (Paris France), Contemporary Art Platform Gallery Space (Kuwait), Overture Show of Contemporary Art (Miami USA), Art13 London fair (London UK) and Journeys through our heritage Beirut Exhibition Center (Beirut Lebanon).</p>
  </Content>
)
