# MarsJS (English)
This is a Javascript 3D rendering of Mars using WebGL and custom maps (color, normal & displacement maps).

This rendering was part of a school project aiming at making a WebGL game, [Space Invaders](https://github.com/KonscienceGit/SpaceInvaders).

## How to use

Just access this link: [https://konsciencegit.github.io/MarsJS/](https://konsciencegit.github.io/MarsJS/).
This visualizer use JavaScript so you only need a WebGL capable browser!
Though it is recommended to use a personal computer, as it will be faster to load and easier to naviguate the camera around the planet, you can also access it on a mobile device.

## What is this

This is a high fidelity 3D interractive visualization of Mars, using detailed normal and displacement maps accurately depicting its surface. By using the sliders on the GUI it is possible to accentuate the normal and displacement maps, increase the number of polygons of the model to increase the displacement map details (can freeze for some dozen of seconds at lod n°8) and some more options.

## How did I made this

This started as a school project. The assignement was to make a video game through WebGL, and in the making I was curious about how to generate high details models from textures. So I tried to make a high fidelity modelisation of mars went to search if there was easy to use normal maps for mars and I didn't found any that satified my needs. I decided to make my own using a precise laser height map from the MOLA laser altimeter orbiting mars, converted it to a more usable png height map (since original file size was 11GB and using grey shades of 16bit depth or more) and the converted it to a normal map and a displacement map. Tools used are linked in the Acknowledgments section below.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

### JavaScript libraries
* [three.min.js, the JS library implementing WebGL](threejs.org/build/three.min.js)
* [OrbitControls.min.js, allowing mouse control of the camera](github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.js)
* [dat.gui.min.js, for fast and easy creation of a screen interface](github.com/dataarts/dat.gui)
### Tools, Textures and Cartographies
* [Color textures of Mars and the Milky Way](solarsystemscope.com/textures/)
* [Mars laser height map, created by MOLA (Mars Orbiter Laser Altimeter)](astrogeology.usgs.gov/search/map/Mars/Topography/HRSC_MOLA_Blend/Mars_HRSC_MOLA_BlendDEM_Global_200mp_v2)
* [OpenEV, geospatial data visualizer](openev.sourceforge.net/)
* [CrazyBump, tool for making normal and displacement maps](crazybump.com/)
* [NormalMap Online, online tool for making normal and displacement maps](cpetry.github.io/NormalMap-Online/)

# MarsJS (Français)
Ceci est un rendu 3D de la planète Mars, utilisant la technologie WebGL, ainsi que des textures personnalisées (color, normal & displacement maps).
Ce rendu fait partie d'un projet (scolaire) plus vaste visant à développer un jeu vidéo sous WebGL/Javascript, [Space Invaders](https://github.com/KonscienceGit/SpaceInvaders).

## Comment l'utiliser

Il suffit d'accéder à ce lien: [https://konsciencegit.github.io/MarsJS/](https://konsciencegit.github.io/MarsJS/).
Ce visualiseur utilise JavaScript, donc il vous suffit juste d'un navigateur supportant WebGL!
Bien qu'il soit recommendé d'utiliser un ordinateur personnel pour des question de bande passante, de performances et de facilité d'utilisation de la caméra, il est possible de visionner sur un appareil mobile tel qu'une tablette ou un smartphone.

## Qu'est-ce exactement

C'est une visualisation 3D intéractive et hautement fidèle de la planète Mars, utilisant des textures (nomal maps et displacement maps) permettant de représenter avec détail la surface de la planète. En utilisant les outils de l'interface, il est possible d'accentuer l'impact des normal et displacement maps, d'augmenter le nombre de polygones du modèle 3D afin d'augmenter le niveau de détail du displacement (la visualisation peut ne plus répondre pendant quelques dizaines de secondes au niveau 8) et quelques autres options.

## Comment fut il réalisé

Ce projet démarra comme un devoir scolaire dont le but était de créer un jeu vidéo à l'aide de la techno WebGL. Dans la conception, j'était curieux de savoir comment créer des modèles hautement détaillés à l'aide de textures. J'ai donc essayé de produire un modèle de la planète Mars et suis parti à la recherche de normal maps, sans en trouver aucune. J'ai ensuite décidé de produire mes propres textures à partir de la cartographie d'élévation laser produite par MOLA, l'orbiteur d'altimétrie laser de Mars, j'ai ensuite convertis cette carte en un format utilisable (le fichier tiff mesurant 11GB et étant encodé en nuance de gris sur 16 bits ou plus) et j'ai convertis le résultat en une normal map et une displacement map. Les outils utilisés sont mentionnés dans la section Sources et remerciements ci dessous.

## License

Ce projet est sous la licence GNU General Public License v3.0 - voir le fichier [LICENSE.md](LICENSE.md) pour plus de détails.

## Sources et remerciements

### Bibliothèques JavaScript
* [three.min.js, la bibliotheque implémentant WebGL](threejs.org/build/three.min.js)
* [OrbitControls.min.js, permettant le control de la caméra](github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.js)
* [dat.gui.min.js, pour implémenter une interface simplement et rapidement](github.com/dataarts/dat.gui)
### Outils, Textures and Cartographies
* [Map de couleurs de Mars et de la Voie Lactée](solarsystemscope.com/textures/)
* [Map d'altitude de Mars, générée par le MOLA (Mars Orbiter Laser Altimeter) de la navette "Mars Global Surveyor" (MGS)](astrogeology.usgs.gov/search/map/Mars/Topography/HRSC_MOLA_Blend/Mars_HRSC_MOLA_BlendDEM_Global_200mp_v2)
* [OpenEV, visualiseur de données géospatiales](openev.sourceforge.net/)
* [CrazyBump, éditeur de map d'altitude et de normal maps](crazybump.com/)
* [NormalMap Online, éditeur de map d'altitude et de normal maps](cpetry.github.io/NormalMap-Online/)