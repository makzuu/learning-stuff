window.addEventListener('keydown', evt => {
    if (isAlpha(evt.key)) {
        game.keyPressed = evt.key
        if (game.state === GAME_STATE.PLAYING)
            game.keyStrokes++
    } else {
        switch (evt.code) {
            case 'Space':
                if (game.state === GAME_STATE.UNDEFINED) {
                    game.state = GAME_STATE.PLAYING

                } else if (game.state === GAME_STATE.PLAYING) {
                    game.state = GAME_STATE.PAUSE

                } else if (game.state === GAME_STATE.PAUSE) {
                    game.state = GAME_STATE.PLAYING

                } else if (game.state === GAME_STATE.GAMEOVER) {
                    game = new Game()
                    game.state = GAME_STATE.PLAYING
                }

                break

            case 'Escape':
                if (game.state === GAME_STATE.UNDEFINED) {
                    game.state = GAME_STATE.PLAYING

                } else if (game.state === GAME_STATE.PLAYING) {
                    game.state = GAME_STATE.PAUSE

                } else if (game.state === GAME_STATE.PAUSE) {
                    game.state = GAME_STATE.PLAYING

                } else if (game.state === GAME_STATE.GAMEOVER) {
                    game = new Game()
                    game.state = GAME_STATE.PLAYING
                }

                break
        }
    }
})
