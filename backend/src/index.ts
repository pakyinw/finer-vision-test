import { main, shutDown } from './main'

// Listening to the exit signal of the program
process.on('SIGTERM', shutDown)
process.on('SIGINT', shutDown)

main()
