// Models
/**
 * Player
 *
 * @typedef {object} Player
 * @property {string} id
 * @property {string} name
 * @property {PlayerStyle} style
 * @property {"HUMAN"|"AI"} type
 * @property {number} levelAI
 * @property {number} [turnsGrounded]
 * @property {number} [turnsSpent]
 * @property {number} [realTimeUsed]
 * @property {number} [maxSpeed]
 * @property {number} [crashes]
 * @property {Point} [position]
 * @property {Point} [speed]
 * @property {Point[]} [prevPositions]
 * @property {boolean[]} [checkpointsPassed]
 */

/**
 * PlayerStyle
 *
 * @typedef {object} PlayerStyle
 * @property {string} id
 * @property {string} name
 * @property {string} dotColor
 * @property {number} dotSize
 * @property {string} round
 * @property {string} trailColor
 * @property {number} trailDotsSize
 * @property {number} trailWidth
 * @property {string} icon
 */

/**
 * Circuit config
 *
 * @typedef {object} CircuitConfig
 * @property {string} id
 * @property {string} name
 * @property {string} collisionImg Path to the png image that will say which pixels are collision or not
 * @property {string} bgImg Path to the background png image
 * @property {string} bgImg Path to the background png image
 * @property {string[]} checkpoints List of images used to detect that the players is passing through every checkpoint.
 * @property {number} maxPlayers Max players allowed for this circuit
 * @property {Point[]} startingPositions Staring position for each player
 * @property {Point} initialSpeed Initial speed for all players
 */

/**
 * Circuit
 *
 * @typedef {object} Circuit
 * @property {string} id
 * @property {string} name
 * @property {string} collisionImg Path to the png image that will say which pixels are collision or not
 * @property {string} bgImg Path to the background png image
 * @property {string} bgImg Path to the background png image
 * @property {string[]} checkpoints List of images used to detect that the players is passing through every checkpoint.
 * @property {number} maxPlayers Max players allowed for this circuit
 * @property {Point[]} startingPositions Staring position for each player
 * @property {Point} initialSpeed Initial speed for all players
 * @property {number} width
 * @property {number} height
 * @property {PixelGetter} collisionPixelGetter
 * @property {PixelGetter[]} checkpointPixelGetters
 * @property {Point[]} centerOfCheckpoints
 */

/**
 * Point
 *
 * @typedef {object} Point
 * @property {number} x
 * @property {number} y
 * @property {number} [dx]
 * @property {number} [dy]
 * @property {number} [baseX]
 * @property {number} [baseY]
 */

/**
 * Line
 *
 * @typedef {Point[]} Line
 */

/**
 * Pixel
 *
 * @typedef {object} Pixel
 * @property {number} r
 * @property {number} g
 * @property {number} b
 * @property {number} a
 */

/**
 * Size
 *
 * @typedef {object} Size
 * @property {number} width
 * @property {number} height
 */

/**
 * Viewport
 *
 * @typedef {object} Viewport
 * @property {Point} topLeft
 * @property {Size} size
 */

/**
 * Pixel getter: object that allows us to get pixels from a certain image
 *
 * @typedef {object} PixelGetter
 * @property {number} width
 * @property {number} height
 * @property {(x: number, y:number) => Pixel} getPixel
 */

// State

/**
 * RootState
 *
 * @typedef {object} RootState
 * @property {MainUIState} mainUI
 * @property {MapState} map
 * @property {GameState} game
 * @property {PlayersState} players
 */

/**
 * MainUI state
 *
 * @typedef {object} MainUIState
 * @property {string} currentScreen
 * @property {string} [selectedCircuit] Id of the selected circuit (if any)
 * @property {string[]} [selectedPlayerOrder]
 * @property {Player[]} [selectedPlayers]
 * @property {boolean} randomizePlayerOrderOnStart
 * @property {boolean} playWithTimer
 */

/**
 * Map state
 *
 * @typedef {object} MapState
 * @property {number} zoom
 * @property {number} gridSize
 */

/**
 * Game state
 *
 * @typedef {object} GameState
 * @property {Symbol} gameState
 * @property {Symbol} prevGameState We store one game state previous to the current so we can go back after pausing
 * @property {string[]} players
 * @property {string} currentTurnPlayerId
 * @property {CircuitConfig} circuitInfo
 * @property {boolean} latestHighScore If somebody achived a high score, it will be stored here until the next game starts
 * @property {Point} selectedPosition When we use a touch interface we can store the position that has been selected before confirming the move
 * @property {boolean} raceHistory Used when replaying a game
 * @property {Point} selectedAIMove Used when replaying a game
 */

/**
 * Players state
 *
 * @typedef {object} PlayersState
 * @property {Object.<string, Player>} byId
 */
