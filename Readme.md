# Mirrors and beams

__WARNING__: Readme is not up-to-date!

## game.js

Provides module __game__.
Describes game logic.

### global
* enum: __OEn__ (Object Enum) - avaiable object types (Bulb, Mirror, Source)
* enum: __CEn__ (Color Enum) - avaiable color types (R, G, B, C, M, Y)
* enum: __DEn__ (Direction Enum) - avaiable directions (N, NE, E, SE, S, SW, W, NW, None)
* enum: __GSEn__ (Game State Enum) - avaiable game states (live, over)

### interface
* board - list (more strictly an array) with all game elements
* clip\_size - size of clip (additional fields not belonging to the game board)
* m - col number
* move(src, dest) - change mirror position on board from src to dest. Update the game state.
* n - row number
* newGame(level) - sets up the game logic.
* state - describes game state, __GSEn__.

### board structure
* obj - object type, __OEn__
* col - color, __CEn__ (Bulb, Source)
* dir - direction, __DEn__ (Mirror, Source)
* pos - position. All board positions are Java Script objects with key: __row__ and __col__(umn).

## levels.js

Provides module __levels__.
Contains hardcoded levels or functions to generate them.

## drawing.js

Provides module __draw__.
Describes graphical representation of the game.

### interface
* beams, bulbs, mirrors, sources - contain objects which describe graphical representation of ingame objecs.
* getRoot - returns root svg element containing graphical representation of board.
* fields - contain svgs of game board fields.
* init(game, settings) - sets up draw module. Generates all the svg objects.
* markChosen(mirror) - highlights mirror
* unmarkChosen(mirror) - removes higlight from mirror
* update(mirror) - updates moved mirror and all beams and bulb colors

### settings
* field\_size
* field\_stroke\_width
* root - html element to use to embed our board

## input.js

Provides module __input__.
Handles user interaction with the game.

### interface
* init(game, drawing) - initializes input module, assignes with-mouse-click actions to mirrors and fields.
* lockInterface - removes actions assigned in init function
* svgonmousedown(evt) - marks clicked mirror to be moved
* svgonmouseup(evt) - moves marked mirror to selected position

## utils.js

Helper functions for the entire project.

* id$(id) - returns element of given id.
* $(selector) - returns the first element found with given selector.
* $$(selector) - returns array with elements of given selector.
* getKeyByValue(obj, val) - returns key to which value val is assigned in Java Script Object.
* numbToColor(numb) - convert number numb to html color.
* setLumosity(col, lum) - return color col with modified lumosity.
* createSVG(element, root, ...) - return new svg element embeded in root svg. ... are pairs of attributes key-value to be set.
* setAttribs(element, ...) - ... are pairs of attributes key-value. This function sets attributes of element.
* isSubset(arr, of\_arr) - check wheter all elements of arr are present in array of\_arr.
* arrayEqual(arr1, arr2) - check wheter two arrays have the same value.
* MyException(data, msg, what) - create object with fields data, msg and what. Intended to use as exception.

## index.html

Structure of the application.  
Pins together all the project files.

## style.css
Generic styles.

