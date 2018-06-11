'use strict'

const CONFIG = {
  projectName: 'hypertunnel',
  serviceName: 'hypertunnel-service',
  deployUser: 'deploy',
  hosts: {
    vagrant: '192.168.33.10'
  }
}

module.exports = {
  apps: [
    {
      name: CONFIG.serviceName,
      script: 'app.js',
      env: {
        NODE_ENV: 'production',
        SERVER_PORT: 80,
        SERVER_DOMAIN: 'hypertunnel.ga',
        SERVER_TOKEN: 'free-server-please-be-nice'
      }
    }
  ],

  deploy: {
    vagrant: {
      key: `~/.ssh/${CONFIG.projectName}`,
      ssh_options: 'StrictHostKeyChecking=no',
      user: CONFIG.deployUser,
      host: CONFIG.hosts.vagrant,
      ref: 'origin/master',
      repo: 'https://github.com/berstend/hypertunnel.git',
      path: `/home/${CONFIG.deployUser}/${CONFIG.serviceName}`,
      'post-deploy': 'cd deploy/service && npm install hypertunnel-server@latest && pm2 reload ecosystem.config.js --env dev',
      env: {
        NODE_ENV: 'development',
        SERVER_DOMAIN: `${CONFIG.hosts.vagrant}.xip.io`
      }
    }
  }
}
