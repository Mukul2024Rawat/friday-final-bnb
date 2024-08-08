module.exports = {
    apps: [
      {
        name: 'airnb-next-dev',       
        script: './node_modules/next/dist/bin/next',
        args: `start --port 5010`,
        exp_backoff_restart_delay: 100, 
        watch: false, 
        cron_restart: '0 0 0/12 * * *',
        max_memory_restart: '300M',
        env_production: {
            NODE_ENV: 'production',
        },
        env_staging: {
            NODE_ENV: 'staging',
        },
        env_local: {
          NODE_ENV: 'local',
        },
      },
      {
        name: 'airnb-next-staging',       
        script: './node_modules/next/dist/bin/next',
        args: `start --port 3030`,
        exp_backoff_restart_delay: 100, 
        watch: false, 
        cron_restart: '0 0 0/12 * * *',
        max_memory_restart: '300M',
        env_production: {
            NODE_ENV: 'production',
        },
        env_staging: {
            NODE_ENV: 'staging',
        },
        env_local: {
          NODE_ENV: 'local',
        },
      },
    ]
  }