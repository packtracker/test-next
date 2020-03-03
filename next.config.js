const PacktrackerPlugin = require('@packtracker/webpack-plugin')

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer && process.env.GITHUB_EVENT_PATH) {
      const event = require(process.env.GITHUB_EVENT_PATH)
      config.plugins.push(
        new PacktrackerPlugin({
          upload: true,
          fail_build: true,
          branch: event.ref.replace('refs/heads/', ''),
          author: event.head_commit.author.email,
          message: event.head_commit.message,
          commit: process.env.GITHUB_SHA,
          committed_at: parseInt(+new Date(event.head_commit.timestamp) / 1000),
          prior_commit: event.before,
        })
      )
    }
    return config
  }
}
