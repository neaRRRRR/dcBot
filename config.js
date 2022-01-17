module.exports = {
    app: {
        px: '!',
        token: 'Njg3OTgzNDE0MzU1MTY1MjI5.XnCgtw.yJ5Ss6n1-W1MgslCWXhJTjsGJa0',
        playing: 'by kxxn'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
        loopMessage: false,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};
