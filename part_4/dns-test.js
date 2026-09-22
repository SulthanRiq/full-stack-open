const dns = require('node:dns/promises')

async function test() {
  try {
    console.log('DNS Server:', dns.getServers())

    const result = await dns.resolveSrv(
      '_mongodb._tcp.cluster0.ebjv8cc.mongodb.net'
    )

    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

test()