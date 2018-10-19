![Animated gif of Mars](https://github.com/KonscienceGit/MarsJS/blob/master/Screenshoot/mars_gif.gif)
# MarsJS (English)
[Lire en Français](https://github.com/KonscienceGit/MarsJS/blob/master/README.md#marsjs-fran%C3%A7ais)

This is a Javascript 3D rendering of Mars using WebGL and custom maps (color, normal & displacement maps).

This rendering was part of a school project aiming at making a WebGL game, [Space Invaders](https://github.com/KonscienceGit/SpaceInvaders).

## How to use

Just access this link: [https://konsciencegit.github.io/MarsJS/](https://konsciencegit.github.io/MarsJS/).
This visualizer use JavaScript so you only need a WebGL capable browser!

Though it is recommended to use a personal computer, as it will be faster to load and easier to move the camera around the planet, you can also access it on a mobile device.

## What is this

This is a high fidelity 3D interactive visualization of Mars, with detailed  color, normal and displacement maps accurately depicting its surface.

By using the sliders on the GUI it is possible to accentuate the normal and displacement maps, increase the number of polygons of the model to increase the displacement map details (can freeze for some dozen of seconds at lod n°8) and some more options.

## How did I made this

This started as a school project. The assignment was to [make a video game through WebGL](https://github.com/KonscienceGit/SpaceInvaders), and in the making I was curious about how to generate high details models from textures. So I tried to make a high fidelity modelisation of mars, and searched if there was easy to use normal maps for mars.

In the end I didn't found any that satisfied my needs. So I decided to make my own using a precise laser height map from the MOLA laser altimeter orbiting mars, transformed it to a more usable png height map (since original file size was 11GB and used grey shades of 16+ bit depth) and then transformed it into normal and a displacement maps. Tools used are linked in the Acknowledgments section below.

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

### JavaScript libraries
* [three.min.js, the JS library implementing WebGL](https://threejs.org/build/three.min.js)
* [OrbitControls.min.js, allowing mouse control of the camera](https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.js)
* [dat.gui.min.js, for fast and easy creation of screen interfaces](https://github.com/dataarts/dat.gui)
### Tools, Textures and Cartographies
* [Color textures of Mars and the Milky Way](https://www.solarsystemscope.com/textures/)
* [Mars laser height map, created by MOLA (Mars Orbiter Laser Altimeter)](https://astrogeology.usgs.gov/search/map/Mars/Topography/HRSC_MOLA_Blend/Mars_HRSC_MOLA_BlendDEM_Global_200mp_v2)
* [OpenEV, geospatial data visualizer](http://openev.sourceforge.net/)
* [CrazyBump, tool for creating normal and displacement maps](http://crazybump.com/)
* [NormalMap Online, online tool for creating normal and displacement maps](http://cpetry.github.io/NormalMap-Online/)


# MarsJS (Français)
Ceci est un rendu 3D de la planète Mars, utilisant la technologie WebGL, ainsi que des textures personnalisées (color, normal & displacement maps).
Ce rendu fait partie d'un projet (scolaire) plus vaste visant à développer un jeu vidéo sous WebGL/Javascript, [Space Invaders](https://github.com/KonscienceGit/SpaceInvaders).

## Comment l'utiliser

Il suffit d'accéder à ce lien: [https://konsciencegit.github.io/MarsJS/](https://konsciencegit.github.io/MarsJS/).
Ce visualiseur utilise JavaScript, donc il vous suffit juste d'un navigateur supportant WebGL!
Bien qu'il soit recommandé d'utiliser un ordinateur personnel pour des question de bande passante, de performances et de facilité d'utilisation de la caméra, il est possible de visionner sur un appareil mobile tel qu'une tablette ou un smartphone.

## Qu'est-ce exactement

C'est une visualisation 3D interactive et hautement fidèle de la planète Mars, utilisant des textures (normal maps et displacement maps) permettant de représenter avec détail la surface de la planète. En utilisant les outils de l'interface, il est possible d'accentuer l'impact des normal et displacement maps, d'augmenter le nombre de polygones du modèle 3D afin d'augmenter le niveau de détail du displacement (la visualisation peut ne plus répondre pendant quelques dizaines de secondes au niveau 8) et quelques autres options.

## Comment fut il réalisé

Ce projet commença comme un devoir scolaire dont le but était de créer un jeu vidéo à l'aide de la techno WebGL. Dans la conception, j'était curieux de savoir comment créer des modèles hautement détaillés à l'aide de textures. J'ai donc essayé de produire un modèle de la planète Mars et suis parti à la recherche de normal maps, sans en trouver aucune. J'ai ensuite décidé de produire mes propres textures à partir de la cartographie d'élévation laser produite par MOLA, l'orbiteur d'altimétrie laser de Mars, j'ai ensuite convertis cette carte en un format utilisable (le fichier tiff mesurant 11GB et étant encodé en nuance de gris sur 16 bits ou plus) et j'ai convertis le résultat en une normal map et une displacement map. Les outils utilisés sont mentionnés dans la section Sources et remerciements ci dessous.

## License

Ce projet est sous la licence GNU General Public License v3.0 - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Sources et remerciements

### Bibliothèques JavaScript
* [three.min.js, la bibliotheque implémentant WebGL](https://threejs.org/build/three.min.js)
* [OrbitControls.min.js, permettant le control de la caméra](https://github.com/mrdoob/three.js/blob/dev/examples/js/controls/OrbitControls.js)
* [dat.gui.min.js, pour implémenter une interface simplement et rapidement](https://github.com/dataarts/dat.gui)
### Outils, Textures and Cartographies
* [Map de couleurs de Mars et de la Voie Lactée](https://www.solarsystemscope.com/textures/)
* [Map d'altitude de Mars, générée par le MOLA (Mars Orbiter Laser Altimeter) de la navette "Mars Global Surveyor" (MGS)](https://astrogeology.usgs.gov/search/map/Mars/Topography/HRSC_MOLA_Blend/Mars_HRSC_MOLA_BlendDEM_Global_200mp_v2)
* [OpenEV, visualiseur de données géospatiales](http://openev.sourceforge.net/)
* [CrazyBump, éditeur de map d'altitude et de normal maps](http://crazybump.com/)
* [NormalMap Online, éditeur de map d'altitude et de normal maps](http://cpetry.github.io/NormalMap-Online/)
