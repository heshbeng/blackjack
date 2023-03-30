////////BLACKJACK////////

const readline = require('readline')
const StandardDeck = require('./StandardDeck')
let blackjack = new StandardDeck.Blackjack()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false // disable readline's default input/output handling
})

async function playBlackjack() {
    let playerScore = 0 // THIS VARIABLE IS NOT CURRENTLY SCALABLE FOR MULTIPLAYER
    let dealerScore = 0
    let numDecks // the number of decks in the shoe


    const scrollText = async (msg) => {
        for (let m = 0; m < msg.length; m++) {
            process.stdout.write(msg.at(m))

            await new Promise (resolve => setTimeout(resolve, 10))
        }
    } // must await this function when it is called

    const introCards = ['3S', '8D', '2C', '7H', 'AS']

    const runIntro = async () => {
        process.stdout.write('\x1Bc') // clear the console

        await new Promise (resolve => setTimeout(resolve, 350))

        for (let b = 0; b < blackjack.BLACKJACK().length; b++) {
            process.stdout.write('\x1Bc') // clear the console

            console.log(blackjack.BLACKJACK().slice(0, b + 1))

            await new Promise (resolve => setTimeout(resolve, 5))
        }

        await new Promise (resolve => setTimeout(resolve, 350))

        for (let b = 0; b < 2; b++) {
            console.log(blackjack.BLACKJACK())
            await new Promise (resolve => setTimeout(resolve, 150))
        }
        for (let b = 2; b > 0; b--) {
            process.stdout.write('\x1Bc') // clear the console

            for (let a = 0; a < b; a++) {
                console.log(blackjack.BLACKJACK())
            }

            await new Promise (resolve => setTimeout(resolve, 150))
        }
        
        await new Promise (resolve => setTimeout(resolve, 350))


        for (let i = 0; i < introCards.length; i++) {
            process.stdout.write('\x1Bc') // clear the console
            console.log(blackjack.BLACKJACK())
            console.log(blackjack.depictLargeCard(introCards.slice(0, i + 1)))
            await new Promise (resolve => setTimeout(resolve, 250))
        }

        await new Promise (resolve => setTimeout(resolve, 700))

        const readyMsg = 'Are you ready to play?'
        for (let m = 0; m < readyMsg.length; m++) {
            process.stdout.write(readyMsg.at(m))
            
            await new Promise (resolve => setTimeout(resolve, 10))
        }
        
        await new Promise (resolve => setTimeout(resolve, 700))

        process.stdout.write(' (y/n)  ')
    }

    const playHand = async () => {

        const reloadShoe = async () => {            
            process.stdout.write('\x1Bc') // clear the console
            console.log('')
            console.log('')
            await scrollText('Cut.')
            console.log('')

            const asyncReshuffle = async () => {
                blackjack.newShoeOf(numDecks) // initializes new shoe with specified number of decks
            }
            await asyncReshuffle()

            await new Promise (resolve => setTimeout(resolve, 500))

            await scrollText('Reshuffling . . .')

            await new Promise (resolve => setTimeout(resolve, 500))
        } // reload shoe
        
        blackjack.clearTable()

        const runDealingMsg = async () => {
            process.stdout.write('\x1Bc') // clear the console
            console.log('')
            console.log('')

            await new Promise (resolve => setTimeout(resolve, 700))

            const dealingMsg = 'The dealer is dealing . . .'
            for (let m = 0; m < dealingMsg.length; m++) {
                process.stdout.write(dealingMsg.at(m))

                if (dealingMsg.at(m + 1) === '.') {
                    await new Promise (resolve => setTimeout(resolve, 100))
                }
                
                await new Promise (resolve => setTimeout(resolve, 10))
            }

            await new Promise (resolve => setTimeout(resolve, 300))

            process.stdout.write('\x1Bc') // clear the console
            console.log('')
            console.log('')
            process.stdout.write('The dealer is dealing')

            const dotDotDot = ' . . .'
            for (let m = 0; m < dotDotDot.length; m++) {
                process.stdout.write(dotDotDot.at(m))

                if (dotDotDot.at(m + 1) === '.') {
                    await new Promise (resolve => setTimeout(resolve, 100))
                }
                
                await new Promise (resolve => setTimeout(resolve, 10))
            }

            await new Promise (resolve => setTimeout(resolve, 300))
        }
        
        const writeCount = (player) => {
            if (player.count.length === 1) {
                process.stdout.write(`${player.count[0]}`)
            } else {
                player.count.forEach((ct) => {
                    process.stdout.write(`${ct}  `)
                })
            }
        } // takes player ( e.g. blackjack.player[0] ) and returns card count(s) written to console

        const fastDisplayHand = () => {
            process.stdout.write('\x1Bc') // clear the console
            console.log('')
            console.log('')
            
            // log dealer hand
            process.stdout.write('DEALER:    ')
            writeCount(blackjack.dealer)
            console.log('')
            console.log(blackjack.depictLargeCard(blackjack.dealer.hand))
            console.log(`Score:  ${dealerScore}`)

            console.log('\n\n\n\n')// vertical space between dealer and player

            // log player hand
            /* DOES NOT SCALE FOR MULTIPLAYER. SINGLE PLAYER ONLY */
            console.log(`Score:  ${playerScore}`)
            console.log(blackjack.depictLargeCard(blackjack.player[0].hand))
            process.stdout.write('PLAYER:    ')
            writeCount(blackjack.player[0])
            console.log('')
        }

        const slowDisplayHand = async () => {
            process.stdout.write('\x1Bc') // clear the console
            console.log('')
            console.log('')
            
            // log dealer hand
            process.stdout.write('DEALER:    ')
            writeCount(blackjack.dealer)
            console.log('')
            console.log(blackjack.depictLargeCard(blackjack.dealer.hand))
            console.log(`Score:  ${dealerScore}`)

            console.log('\n\n\n\n')// vertical space between dealer and player

            // log player hand
            /* DOES NOT SCALE FOR MULTIPLAYER. SINGLE PLAYER ONLY */
            console.log(`Score:  ${playerScore}`)
            console.log(blackjack.depictLargeCard(blackjack.player[0].hand))
            process.stdout.write('PLAYER:    ')
            writeCount(blackjack.player[0])
            console.log('')
        } // CURRENTLY SAME AS fastDisplayHand

        let playerResult // value is set in fn hitNoHit and read in fn dealerPlayHand
        const dealerWinMsg = 'The dealer wins this hand. Play another? (y/n)'

        const playAnother = async (msg) => {
            fastDisplayHand()
            console.log('') // new line
            for (let m = 0; m < msg.length; m++) {
                process.stdout.write(msg.at(m))

                await new Promise (resolve => setTimeout(resolve, 10))
            }

            rl.once('line', async (answer) => {
                if (answer != 'y' && answer != 'n') {
                    console.log('Enter y to play another hand, or n to quit.')

                    await new Promise (resolve => setTimeout(resolve, 1000))

                    process.stdout.write('\x1Bc') // clear console
                    playAnother(msg)
                } else if (answer === 'n') {
                    rl.close() // end program
                } else if (answer === 'y') {
                    playHand() // deal a new hand
                }
            })
        }

        const dealerPlayHand = async () => {
            blackjack.peek()
            fastDisplayHand()

            const dealerBustTieMsg = "The dealer busts! It's a tie.\nWould you like to play another hand? (y/n)  "
            const dealerBustPlayerWinMsg = 'Dealer busts! YOU WIN!\nPlay another hand? (y/n)  '
            const tieMsg = "The dealer stands. It's a tie.\nWould you like to play another hand? (y/n)  "
            const playerWinMsg = 'The dealer stands. YOU WIN!\nPlay another hand? (y/n)  ' // will never be called in single player mode, because unless the count is tied, the dealer will hit until they exceed the player's count or they bust
            const dealerWinMsg = 'The dealer wins this hand. Would you like to play another? (y/n)  '
            const dealerBlackjackWinMsg = 'The dealer wins with BLACKJACK. Play another hand? (y/n)  '
            const playerBustDealerWinMsg = 'You bust.\nThe dealer wins this hand. Play another? (y/n)  '

            const dealerResult = () => {
                if (blackjack.dealer.count.every((ct) => ct > 21)) {
                    return 'bust'
                } else {
                    blackjack.dealer.count.sort((a, b) => a > b) // sort count array in ascending order
                    return blackjack.dealer.count.findLast((i) => i <= 21) // assign highest count <= 21 to variable
                }
            }

            // dealer's play logic
            const runDealerPlayLogic = async () => {
                if (playerResult === 'bust') {
                    await new Promise (resolve => setTimeout(resolve, 700))

                    dealerScore++
                    playAnother(playerBustDealerWinMsg)
                } else if (dealerResult() === 'bust') { // if dealer busts
                    await new Promise (resolve => setTimeout(resolve, 700))
                    
                    if (playerResult === 'bust') { // if player also busts
                        playAnother(dealerBustTieMsg) // should never be called, because dealer will stand if player busts
                    } else { // else player wins
                        playerScore++
                        playAnother(dealerBustPlayerWinMsg)
                    }
                } else if (dealerResult() === playerResult && dealerResult() > 15) { // if tie and dealer count > 15, dealer accepts tie
                    playAnother(tieMsg)
                } else if (dealerResult() > playerResult) {
                    dealerScore++
                    dealerResult() === 21 ? playAnother(dealerBlackjackWinMsg) : playAnother(dealerWinMsg)
                } else {
                    if (blackjack.shoeEmpty()) {
                        await reloadShoe()
                    }
                    blackjack.hit(blackjack.dealer)
                    fastDisplayHand()

                    await new Promise (resolve => setTimeout(resolve,1000))

                    runDealerPlayLogic()
                }
            }
            runDealerPlayLogic()
        }

        const hitNoHit = async (player) => {
            const twentyoneMsg = 'You got BLACKJACK!'
            const hitMsg = 'Would you like to hit or stand? (h/s)  '
            const dealerTurnMsg = "Now it's the dealer's turn to play."

            if (player.count.includes(21)) { // if player score is 21
                playerResult = 21

                await new Promise (resolve => setTimeout(resolve, 700))
                console.log('') // new line

                for (let m = 0; m < twentyoneMsg.length; m++) {
                    process.stdout.write(twentyoneMsg.at(m))

                    await new Promise (resolve => setTimeout(resolve, 10))
                }

                await new Promise (resolve => setTimeout(resolve, 700))
                console.log('') // new line

                for (let m = 0; m < dealerTurnMsg.length; m++) {
                    process.stdout.write(dealerTurnMsg.at(m))

                    await new Promise (resolve => setTimeout(resolve, 10))
                }

                await new Promise (resolve => setTimeout(resolve, 1000))

                dealerPlayHand()
            } else if (player.count.every((ct) => ct > 21)) { // if player busts
                playerResult = 'bust'

                await new Promise (resolve => setTimeout(resolve, 700))
                console.log('') // new line

                dealerPlayHand()
            } else {
                for (let m = 0; m < hitMsg.length; m++) {
                    process.stdout.write(hitMsg.at(m))

                    await new Promise (resolve => setTimeout(resolve, 10))
                }

                const initHit = () => {
                    rl.once('line', async (answer) => {
                        if (answer != 'h' && answer != 's') {
                            console.log('Please enter h for hit, or s for stand.')

                            await new Promise (resolve => setTimeout(resolve, 1000))

                            fastDisplayHand()
                            process.stdout.write(hitMsg)
                            initHit()
                        } else if (answer === 's') {
                            await new Promise (resolve => setTimeout(resolve, 700))
                            console.log('') // new line
            
                            for (let m = 0; m < dealerTurnMsg.length; m++) {
                                process.stdout.write(dealerTurnMsg.at(m))
            
                                await new Promise (resolve => setTimeout(resolve, 10))
                            }

                            await new Promise (resolve => setTimeout(resolve, 1000))

                            dealerPlayHand()
                        } else if (answer === 'h') {
                            if (blackjack.shoeEmpty()) {
                                await reloadShoe()
                            }                         blackjack.hit(player)
                            fastDisplayHand()
                            await hitNoHit(blackjack.player[0]) // NOT SCALABLE FOR MULTIPLAYER. SINGLE PLAYER ONLY
                        }
                    })
                }
                initHit()

                await new Promise (resolve => setTimeout(resolve, 700))

                playerResult = (() => {
                    player.count.sort((a, b) => a > b) // sort count array in ascending order
                    return player.count.findLast((i) => i <= 21) // assign highest count <= 21 to variable
                })()
            }
        }
        
        if (blackjack.cutCardReached()) {
            await reloadShoe()
        }
        await runDealingMsg()
        blackjack.deal() // deal a hand
        await slowDisplayHand()
        await hitNoHit(blackjack.player[0]) // NOT SCALABLE FOR MULTIPLAYER. SINGLE PLAYER ONLY
    }
    
    const selectNumberOfDecks = async () => {
        process.stdout.write('\x1Bc') // clear the console
        console.log('')
        console.log('')

        await new Promise (resolve => setTimeout(resolve, 700))

        const deckCountMsg = 'Please enter the number of decks you would like to play with:  '
        for (let m = 0; m < deckCountMsg.length; m++) {
            process.stdout.write(deckCountMsg.at(m))
            
            await new Promise (resolve => setTimeout(resolve, 10))
        }

        const selectNumDecks = () => {
            rl.once('line', async (answer) => {
                if (Number(answer) < 1 || Number(answer) > 7 || !Number.isInteger(Number(answer))) {
                    console.log('The number of decks must be an integer between 1 and 7.')

                    await new Promise (resolve => setTimeout(resolve, 1500))
                    
                    process.stdout.write('\x1Bc') // clear the console
                    console.log('')
                    console.log('')
                    process.stdout.write(deckCountMsg)
                    selectNumDecks()
                } else if (Number(answer) >= 1 && Number(answer) <= 7 && Number.isInteger(Number(answer))) {
                    process.stdout.write('\x1Bc') // clear the console
                    console.log('')
                    console.log('')

                    await new Promise (resolve => setTimeout(resolve, 700))
                    
                    const letsPlayMsg = "Let's play BLACKJACK!"
                    for (let m = 0; m < letsPlayMsg.length; m++) {
                        process.stdout.write(letsPlayMsg.at(m))

                        if (letsPlayMsg.at(m) === ' ') {
                            await new Promise (resolve => setTimeout(resolve, 700))
                        } // extra delay between words
                        
                        await new Promise (resolve => setTimeout(resolve, 10))
                    }

                    numDecks = Number(answer) // initialize numDecks variable

                    blackjack.newShoeOf(Number(answer)) // initializes new shoe with specified number of decks

                    await new Promise (resolve => setTimeout(resolve, 1500))

                    playHand()
                }
            })
        }
        selectNumDecks()
    }

    const selectPlayerCount = async () => {
        // only single player available in v1.0

        process.stdout.write('\x1Bc') // clear the console
        console.log('')
        console.log('')

        await new Promise (resolve => setTimeout(resolve, 700))

        const playerCountMsg = 'Please enter the number of players:  '
        for (let m = 0; m < playerCountMsg.length; m++) {
            process.stdout.write(playerCountMsg.at(m))
            
            await new Promise (resolve => setTimeout(resolve, 10))
        }

        const selectNumPlayers = () => {
            rl.once('line', async (answer) => {
                if (Number(answer) < 1 || Number(answer) > 7 || !Number.isInteger(Number(answer))) {
                    console.log('The number of players must be an integer between 1 and 7.')
                    
                    await new Promise (resolve => setTimeout(resolve, 1500))
                    
                    process.stdout.write('\x1Bc') // clear the console
                    console.log('')
                    console.log('')
                    process.stdout.write(playerCountMsg)
                    selectNumPlayers()
                } else if (Number(answer) > 1 && Number(answer) <= 7) {
                    console.log('Keep an eye out for updates including Multiplayer Mode!')

                    await new Promise (resolve => setTimeout(resolve, 1000))

                    console.log('For now, please enter the number 1')

                    await new Promise (resolve => setTimeout(resolve, 1500))
                    
                    process.stdout.write('\x1Bc') // clear the console
                    console.log('')
                    console.log('')
                    process.stdout.write(playerCountMsg)
                    selectNumPlayers()
                } else if (Number(answer) === 1) {
                    process.stdout.write('\x1Bc') // clear the console
                    console.log('')
                    console.log('')
                    console.log('\u263A') // smiley

                    blackjack = new StandardDeck.Blackjack(Number(answer)) // initializes new game with one player

                    await new Promise (resolve => setTimeout(resolve, 1000))
                    
                    selectNumberOfDecks()
                }
            })
        }
        selectNumPlayers()
    }

    const setupTable = async () => {
        await selectPlayerCount()
    }

    const startGame = () => {
        rl.once('line', async (answer) => {
            if (answer != 'y' && answer != 'n') {
                console.log('Invalid input. Please enter either y or n.')
                await new Promise (resolve => setTimeout(resolve, 1500))

                process.stdout.write('\x1Bc') // clear the console
                console.log(blackjack.BLACKJACK())
                console.log(blackjack.depictLargeCard(introCards))
                process.stdout.write('Are you ready to play? (y/n)  ')
                startGame()
            } else if (answer === 'n') {
                rl.close() // end the program
            } else if (answer === 'y') {
                process.stdout.write('\x1Bc') // clear the console

                for (let b = blackjack.BLACKJACK().length; b >= 0; b--) {
                    process.stdout.write('\x1Bc') // clear the console
        
                    console.log(blackjack.BLACKJACK().slice(0, b + 1))
        
                    await new Promise (resolve => setTimeout(resolve, 5))
                }

                await setupTable()
            }
        })
    }

    runIntro()
    startGame()
}

module.exports = playBlackjack()
