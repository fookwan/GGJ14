module.exports = {
  development: {
    name: 'incaptus_node',
    url: 'mongodb://localhost/incaptus_node'
  },
  production: {
    name: 'incaptus_node_prod',
    url: 'mongodb://clusterAccess01:ij38fhl219@dbh45.mongolab.com:27457/incaptus_prod_db_node'
  },
  staging: {
    name: 'incaptus_node_stage',
    url: 'mongodb://heroku_app19282594:hgrllf2ltgbss65o51tighou3n@ds053178.mongolab.com:53178/heroku_app19282594'
  },
  test: {
    name: 'incaptus_node_test',
    url: 'mongodb://localhost/incaptus_node_test'
  }
}