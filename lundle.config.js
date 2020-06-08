global.document = {}

export const rollup = (config) => {
  if (config.output[0].format === 'umd') {
    config.external = ['@dash-ui/styles', 'react']
    config.output[0].globals = {
      '@dash-ui/styles': 'Dash',
      react: 'React',
    }
  }

  return config
}
