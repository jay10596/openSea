module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            // Match any network id
            network_id: "*"
        },
    },
    // Place everything under React's src folder
    contracts_directory: './src/contracts/',
    contracts_build_directory: "./src/build",
    migrations_directory: './src/migrations/',
    compilers: {
        solc: {
            version: "^0.8.0",
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
}