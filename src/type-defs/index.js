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

// State

/**
 * RootState
 *
 * @typedef {object} RootState
 * @property {MainUIState} mainUI
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
