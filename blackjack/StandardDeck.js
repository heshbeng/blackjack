class StandardDeck {
    #deck
    #graveyard
    
    constructor() {
        this.#deck = []
        this.#graveyard = []
    }

    get deck() {
        return this.#deck
    }
    
    get graveyard() {
        return this.#graveyard
    }

    set deck(d) {
        throw new Error('Cannot set attribute "deck" manually.')
    }

    set graveyard(g) {
        throw new Error('Cannot set attribute "graveyard" manually.')
    }

    shuffleNew() { // clears deck and graveyard and returns complete shuffled deck
        this.#deck = []
        this.#graveyard = []

        const suit = ['C', 'D', 'H', 'S']
        const face = ['A', 'J', 'K', 'Q', 'X']
        suit.forEach((s) => {
            for (let n = 2; n < 10; n++) {
                this.#deck.push(`${n}${s}`)
                // n of 1 is actually face value 10
            }
            for (let f of face) {
                this.#deck.push(`${f}${s}`)
            }
        }) // create an unshuffled standard deck 

        const shuffle = () => {
            let _deck = [] // array for sorting cards
            for (let d = 0; d < 52; d++) {
                _deck.push(null)
            } // populate _deck with 52 null slots

            let _deckNullSlots = [] // array of _deck indices
            const findNullSlots = () => {
                _deckNullSlots = []
                for (let slot in _deck) {
                    if (_deck[slot] === null) {
                        _deckNullSlots.push(slot)
                    }
                }
            } // populate _deckNullSlots with indices of null slots in _deck
            
            this.#deck.forEach((card) => {
                findNullSlots()
                let randomNullSlot = Math.floor(Math.random() * _deckNullSlots.length)

                _deck[_deckNullSlots[randomNullSlot]] = card
            }) // add cards in random order to _deck
            
            this.#deck = _deck
        }

        if (this.#deck.length != 52) {
            throw new Error('The number of cards in the deck does not equal 52.')
        } else {
            for (let x = 0; x < 7; x++) {
                shuffle()
            }
            return this.#deck
        }
    }

    drawCard() {
        this.#deck.pop()
    }

    discard(card) {
        this.#graveyard.push(card)
    }

    reshuffleDeck() {}

    shuffleGraveyard() {}

    replaceToBottomOfDeck() {}

    replaceToRandomSlotInDeck() {}

    drawFromGraveyard() {}

    depictLargeCard = (card) => {
        // method accepts single card string or array of card strings and outputs depiction of hand up to size of 14 cards

        let input = []
        Array.isArray(card) ? input = card : input.push(card)
        
        let numberOfCards = input.length
        if (numberOfCards > 14) {
            throw new Error('Cannot depict more than 14 cards with a single call of method depictLargeCard(Arr)')
        } else if (numberOfCards === 0) {
            throw new Error('Must pass at least one card to method depictLargeCard(Arr)')
        }

        // DEPICTION FUNCTIONS BLOCK START
        const depictOneCard = (face, suit) =>{
            const figure = `     ______  
    |      | 
    |${face}    ${suit}| 
    |      | 
    |      | 
    |${suit}    ${face}| 
    |______| 
            `;
            return figure
        }
        
        const depictTwoCard = (face1, suit1, face2, suit2) => {
            const f1 = face1
            const s1 = suit1
            const f2 = face2
            const s2 = suit2
        
            let figure = `     ______   ______  
    |      | |      | 
    |${f1}    ${s1}| |${f2}    ${s2}| 
    |      | |      | 
    |      | |      | 
    |${s1}    ${f1}| |${s2}    ${f2}| 
    |______| |______| 
            `;
            return figure
        }

        const depictThreeCard = (face1, suit1, face2, suit2, face3, suit3) => {
            const f1 = face1
            const s1 = suit1
            const f2 = face2
            const s2 = suit2
            const f3 = face3
            const s3 = suit3
        
            let figure = `     ______   ______   ______  
    |      | |      | |      | 
    |${f1}    ${s1}| |${f2}    ${s2}| |${f3}    ${s3}| 
    |      | |      | |      | 
    |      | |      | |      | 
    |${s1}    ${f1}| |${s2}    ${f2}| |${s3}    ${f3}| 
    |______| |______| |______| 
            `;
            return figure
        }

        const depictFourCard = (face1, suit1, face2, suit2, face3, suit3, face4, suit4) => {
            const f1 = face1
            const s1 = suit1
            const f2 = face2
            const s2 = suit2
            const f3 = face3
            const s3 = suit3
            const f4 = face4
            const s4 = suit4
        
            let figure = `     ______   ______   ______   ______  
    |      | |      | |      | |      | 
    |${f1}    ${s1}| |${f2}    ${s2}| |${f3}    ${s3}| |${f4}    ${s4}| 
    |      | |      | |      | |      | 
    |      | |      | |      | |      | 
    |${s1}    ${f1}| |${s2}    ${f2}| |${s3}    ${f3}| |${s4}    ${f4}| 
    |______| |______| |______| |______| 
            `;
            return figure
        }

        const depictFiveCard = (face1, suit1, face2, suit2, face3, suit3, face4, suit4, face5, suit5) => {
            const f1 = face1
            const s1 = suit1
            const f2 = face2
            const s2 = suit2
            const f3 = face3
            const s3 = suit3
            const f4 = face4
            const s4 = suit4
            const f5 = face5
            const s5 = suit5
        
            let figure = `     ______   ______   ______   ______   ______  
    |      | |      | |      | |      | |      | 
    |${f1}    ${s1}| |${f2}    ${s2}| |${f3}    ${s3}| |${f4}    ${s4}| |${f5}    ${s5}| 
    |      | |      | |      | |      | |      | 
    |      | |      | |      | |      | |      | 
    |${s1}    ${f1}| |${s2}    ${f2}| |${s3}    ${f3}| |${s4}    ${f4}| |${s5}    ${f5}| 
    |______| |______| |______| |______| |______| 
            `;
            return figure
        }
        
        const depictSixCard = (face1, suit1, face2, suit2, face3, suit3, face4, suit4, face5, suit5, face6, suit6) => {
            const f1 = face1
            const s1 = suit1
            const f2 = face2
            const s2 = suit2
            const f3 = face3
            const s3 = suit3
            const f4 = face4
            const s4 = suit4
            const f5 = face5
            const s5 = suit5
            const f6 = face6
            const s6 = suit6
        
            let figure = `     ______   ______   ______   ______   ______   ______  
    |      | |      | |      | |      | |      | |      | 
    |${f1}    ${s1}| |${f2}    ${s2}| |${f3}    ${s3}| |${f4}    ${s4}| |${f5}    ${s5}| |${f6}    ${s6}| 
    |      | |      | |      | |      | |      | |      | 
    |      | |      | |      | |      | |      | |      | 
    |${s1}    ${f1}| |${s2}    ${f2}| |${s3}    ${f3}| |${s4}    ${f4}| |${s5}    ${f5}| |${s6}    ${f6}| 
    |______| |______| |______| |______| |______| |______| 
            `;
            return figure
        }

        const depictSevenCard = (face1, suit1, face2, suit2, face3, suit3, face4, suit4, face5, suit5, face6, suit6, face7, suit7) => {
            const f1 = face1
            const s1 = suit1
            const f2 = face2
            const s2 = suit2
            const f3 = face3
            const s3 = suit3
            const f4 = face4
            const s4 = suit4
            const f5 = face5
            const s5 = suit5
            const f6 = face6
            const s6 = suit6
            const f7 = face7
            const s7 = suit7
        
            let figure = `     ______   ______   ______   ______   ______   ______   ______  
    |      | |      | |      | |      | |      | |      | |      | 
    |${f1}    ${s1}| |${f2}    ${s2}| |${f3}    ${s3}| |${f4}    ${s4}| |${f5}    ${s5}| |${f6}    ${s6}| |${f7}    ${s7}| 
    |      | |      | |      | |      | |      | |      | |      | 
    |      | |      | |      | |      | |      | |      | |      | 
    |${s1}    ${f1}| |${s2}    ${f2}| |${s3}    ${f3}| |${s4}    ${f4}| |${s5}    ${f5}| |${s6}    ${f6}| |${s7}    ${f7}| 
    |______| |______| |______| |______| |______| |______| |______| 
            `;
            return figure
        }

        const depictEightCard = (face1, suit1, face2, suit2, face3, suit3, face4, suit4, face5, suit5, face6, suit6, face7, suit7, face8, suit8) => {
            const f1 = face1
            const s1 = suit1
            const f2 = face2
            const s2 = suit2
            const f3 = face3
            const s3 = suit3
            const f4 = face4
            const s4 = suit4
            const f5 = face5
            const s5 = suit5
            const f6 = face6
            const s6 = suit6
            const f7 = face7
            const s7 = suit7
            const f8 = face8
            const s8 = suit8
        
            let figure = `     ______   ______   ______   ______  
    |      | |      | |      | |      | 
    |${f1}    ${s1}| |${f2}    ${s2}| |${f3}    ${s3}| |${f4}    ${s4}| 
    |      | |      | |      | |      | 
    |      | |      | |      | |      | 
    |${s1}    ${f1}| |${s2}    ${f2}| |${s3}    ${f3}| |${s4}    ${f4}| 
    |______| |______| |______| |______| 
     ______   ______   ______   ______  
    |      | |      | |      | |      | 
    |${f5}    ${s5}| |${f6}    ${s6}| |${f7}    ${s7}| |${f8}    ${s8}| 
    |      | |      | |      | |      | 
    |      | |      | |      | |      | 
    |${s5}    ${f5}| |${s6}    ${f6}| |${s7}    ${f7}| |${s8}    ${f8}| 
    |______| |______| |______| |______| 
            `;
            return figure
        }

        const depictNineCard = (face1, suit1, face2, suit2, face3, suit3, face4, suit4, face5, suit5, face6, suit6, face7, suit7, face8, suit8, face9, suit9) => {
            const f1 = face1
            const s1 = suit1
            const f2 = face2
            const s2 = suit2
            const f3 = face3
            const s3 = suit3
            const f4 = face4
            const s4 = suit4
            const f5 = face5
            const s5 = suit5
            const f6 = face6
            const s6 = suit6
            const f7 = face7
            const s7 = suit7
            const f8 = face8
            const s8 = suit8
            const f9 = face9
            const s9 = suit9
        
            let figure = `     ______   ______   ______   ______   ______
    |      | |      | |      | |      | |      |
    |${f1}    ${s1}| |${f2}    ${s2}| |${f3}    ${s3}| |${f4}    ${s4}| |${f9}    ${s9}|
    |      | |      | |      | |      | |      |
    |      | |      | |      | |      | |      |
    |${s1}    ${f1}| |${s2}    ${f2}| |${s3}    ${f3}| |${s4}    ${f4}| |${s9}    ${f9}|
    |______| |______| |______| |______| |______|

     ______   ______   ______   ______
    |      | |      | |      | |      |
    |${f5}    ${s5}| |${f6}    ${s6}| |${f7}    ${s7}| |${f8}    ${s8}|
    |      | |      | |      | |      |
    |      | |      | |      | |      |
    |${s5}    ${f5}| |${s6}    ${f6}| |${s7}    ${f7}| |${s8}    ${f8}|
    |______| |______| |______| |______|
            `;
            return figure
        }

        const depictTenCard = (face1, suit1, face2, suit2, face3, suit3, face4, suit4, face5, suit5, face6, suit6, face7, suit7, face8, suit8, face9, suit9, face10, suit10) => {
            const f1 = face1
            const s1 = suit1
            const f2 = face2
            const s2 = suit2
            const f3 = face3
            const s3 = suit3
            const f4 = face4
            const s4 = suit4
            const f5 = face5
            const s5 = suit5
            const f6 = face6
            const s6 = suit6
            const f7 = face7
            const s7 = suit7
            const f8 = face8
            const s8 = suit8
            const f9 = face9
            const s9 = suit9
            const f10 = face10
            const s10 = suit10
        
            let figure = `     ______   ______   ______   ______   ______
    |      | |      | |      | |      | |      |
    |${f1}    ${s1}| |${f2}    ${s2}| |${f3}    ${s3}| |${f4}    ${s4}| |${f9}    ${s9}|
    |      | |      | |      | |      | |      |
    |      | |      | |      | |      | |      |
    |${s1}    ${f1}| |${s2}    ${f2}| |${s3}    ${f3}| |${s4}    ${f4}| |${s9}    ${f9}|
    |______| |______| |______| |______| |______|
    
     ______   ______   ______   ______   ______
    |      | |      | |      | |      | |      |
    |${f5}    ${s5}| |${f6}    ${s6}| |${f7}    ${s7}| |${f8}    ${s8}| |${f10}    ${s10}|
    |      | |      | |      | |      | |      |
    |      | |      | |      | |      | |      |
    |${s5}    ${f5}| |${s6}    ${f6}| |${s7}    ${f7}| |${s8}    ${f8}| |${s10}    ${f10}|
    |______| |______| |______| |______| |______|
            `;
            return figure
        }
        
        const depictElevenCard = (face1, suit1, face2, suit2, face3, suit3, face4, suit4, face5, suit5, face6, suit6, face7, suit7, face8, suit8, face9, suit9, face10, suit10, face11, suit11) => {
            const f1 = face1
            const s1 = suit1
            const f2 = face2
            const s2 = suit2
            const f3 = face3
            const s3 = suit3
            const f4 = face4
            const s4 = suit4
            const f5 = face5
            const s5 = suit5
            const f6 = face6
            const s6 = suit6
            const f7 = face7
            const s7 = suit7
            const f8 = face8
            const s8 = suit8
            const f9 = face9
            const s9 = suit9
            const f10 = face10
            const s10 = suit10
            const f11 = face11
            const s11 = suit11
        
            let figure = `     ______   ______   ______   ______   ______   ______
    |      | |      | |      | |      | |      | |      |
    |${f1}    ${s1}| |${f2}    ${s2}| |${f3}    ${s3}| |${f4}    ${s4}| |${f9}    ${s9}| |${f11}    ${s11}|
    |      | |      | |      | |      | |      | |      |
    |      | |      | |      | |      | |      | |      |
    |${s1}    ${f1}| |${s2}    ${f2}| |${s3}    ${f3}| |${s4}    ${f4}| |${s9}    ${f9}| |${s11}    ${f11}|
    |______| |______| |______| |______| |______| |______|
    
     ______   ______   ______   ______   ______
    |      | |      | |      | |      | |      |
    |${f5}    ${s5}| |${f6}    ${s6}| |${f7}    ${s7}| |${f8}    ${s8}| |${f10}    ${s10}|
    |      | |      | |      | |      | |      |
    |      | |      | |      | |      | |      |
    |${s5}    ${f5}| |${s6}    ${f6}| |${s7}    ${f7}| |${s8}    ${f8}| |${s10}    ${f10}|
    |______| |______| |______| |______| |______|
            `;
            return figure
        }
        
        const depictTwelveCard = (face1, suit1, face2, suit2, face3, suit3, face4, suit4, face5, suit5, face6, suit6, face7, suit7, face8, suit8, face9, suit9, face10, suit10, face11, suit11, face12, suit12) => {
            const f1 = face1
            const s1 = suit1
            const f2 = face2
            const s2 = suit2
            const f3 = face3
            const s3 = suit3
            const f4 = face4
            const s4 = suit4
            const f5 = face5
            const s5 = suit5
            const f6 = face6
            const s6 = suit6
            const f7 = face7
            const s7 = suit7
            const f8 = face8
            const s8 = suit8
            const f9 = face9
            const s9 = suit9
            const f10 = face10
            const s10 = suit10
            const f11 = face11
            const s11 = suit11
            const f12 = face12
            const s12 = suit12
        
            let figure = `     ______   ______   ______   ______   ______   ______
    |      | |      | |      | |      | |      | |      |
    |${f1}    ${s1}| |${f2}    ${s2}| |${f3}    ${s3}| |${f4}    ${s4}| |${f9}    ${s9}| |${f11}    ${s11}|
    |      | |      | |      | |      | |      | |      |
    |      | |      | |      | |      | |      | |      |
    |${s1}    ${f1}| |${s2}    ${f2}| |${s3}    ${f3}| |${s4}    ${f4}| |${s9}    ${f9}| |${s11}    ${f11}|
    |______| |______| |______| |______| |______| |______|
        
     ______   ______   ______   ______   ______   ______
    |      | |      | |      | |      | |      | |      |
    |${f5}    ${s5}| |${f6}    ${s6}| |${f7}    ${s7}| |${f8}    ${s8}| |${f10}    ${s10}| |${f12}    ${s12}|
    |      | |      | |      | |      | |      | |      |
    |      | |      | |      | |      | |      | |      |
    |${s5}    ${f5}| |${s6}    ${f6}| |${s7}    ${f7}| |${s8}    ${f8}| |${s10}    ${f10}| |${s12}    ${f12}|
    |______| |______| |______| |______| |______| |______|
            `;
            return figure
        }
        
        const depictThirteenCard = (
            face1, suit1, face2, suit2, face3, suit3, face4, suit4, face5, suit5,
            face6, suit6, face7, suit7, face8, suit8, face9, suit9, face10, suit10,
            face11, suit11, face12, suit12, face13, suit13
        ) => {
            const f1 = face1
            const s1 = suit1
            const f2 = face2
            const s2 = suit2
            const f3 = face3
            const s3 = suit3
            const f4 = face4
            const s4 = suit4
            const f5 = face5
            const s5 = suit5
            const f6 = face6
            const s6 = suit6
            const f7 = face7
            const s7 = suit7
            const f8 = face8
            const s8 = suit8
            const f9 = face9
            const s9 = suit9
            const f10 = face10
            const s10 = suit10
            const f11 = face11
            const s11 = suit11
            const f12 = face12
            const s12 = suit12
            const f13 = face13
            const s13 = suit13
        
            let figure = `     ______   ______   ______   ______   ______   ______   ______
    |      | |      | |      | |      | |      | |      | |      |
    |${f1}    ${s1}| |${f2}    ${s2}| |${f3}    ${s3}| |${f4}    ${s4}| |${f9}    ${s9}| |${f11}    ${s11}| |${f13}    ${s13}|
    |      | |      | |      | |      | |      | |      | |      |
    |      | |      | |      | |      | |      | |      | |      |
    |${s1}    ${f1}| |${s2}    ${f2}| |${s3}    ${f3}| |${s4}    ${f4}| |${s9}    ${f9}| |${s11}    ${f11}| |${s13}    ${f13}|
    |______| |______| |______| |______| |______| |______| |______|
    
     ______   ______   ______   ______   ______   ______
    |      | |      | |      | |      | |      | |      |
    |${f5}    ${s5}| |${f6}    ${s6}| |${f7}    ${s7}| |${f8}    ${s8}| |${f10}    ${s10}| |${f12}    ${s12}|
    |      | |      | |      | |      | |      | |      |
    |      | |      | |      | |      | |      | |      |
    |${s5}    ${f5}| |${s6}    ${f6}| |${s7}    ${f7}| |${s8}    ${f8}| |${s10}    ${f10}| |${s12}    ${f12}|
    |______| |______| |______| |______| |______| |______|
            `;
            return figure
        }
        
        const depictFourteenCard = (face1, suit1, face2, suit2, face3, suit3, face4, suit4, face5, suit5, face6, suit6, face7, suit7, face8, suit8, face9, suit9, face10, suit10, face11, suit11, face12, suit12, face13, suit13, face14, suit14) => {
            const f1 = face1
            const s1 = suit1
            const f2 = face2
            const s2 = suit2
            const f3 = face3
            const s3 = suit3
            const f4 = face4
            const s4 = suit4
            const f5 = face5
            const s5 = suit5
            const f6 = face6
            const s6 = suit6
            const f7 = face7
            const s7 = suit7
            const f8 = face8
            const s8 = suit8
            const f9 = face9
            const s9 = suit9
            const f10 = face10
            const s10 = suit10
            const f11 = face11
            const s11 = suit11
            const f12 = face12
            const s12 = suit12
            const f13 = face13
            const s13 = suit13
            const f14 = face14
            const s14 = suit14
        
            let figure = `     ______   ______   ______   ______   ______   ______   ______
    |      | |      | |      | |      | |      | |      | |      |
    |${f1}    ${s1}| |${f2}    ${s2}| |${f3}    ${s3}| |${f4}    ${s4}| |${f9}    ${s9}| |${f11}    ${s11}| |${f13}    ${s13}|
    |      | |      | |      | |      | |      | |      | |      |
    |      | |      | |      | |      | |      | |      | |      |
    |${s1}    ${f1}| |${s2}    ${f2}| |${s3}    ${f3}| |${s4}    ${f4}| |${s9}    ${f9}| |${s11}    ${f11}| |${s13}    ${f13}|
    |______| |______| |______| |______| |______| |______| |______|
    
     ______   ______   ______   ______   ______   ______   ______
    |      | |      | |      | |      | |      | |      | |      |
    |${f5}    ${s5}| |${f6}    ${s6}| |${f7}    ${s7}| |${f8}    ${s8}| |${f10}    ${s10}| |${f12}    ${s12}| |${f14}    ${s14}|
    |      | |      | |      | |      | |      | |      | |      |
    |      | |      | |      | |      | |      | |      | |      |
    |${s5}    ${f5}| |${s6}    ${f6}| |${s7}    ${f7}| |${s8}    ${f8}| |${s10}    ${f10}| |${s12}    ${f12}| |${s14}    ${f14}|
    |______| |______| |______| |______| |______| |______| |______|
            `;
            return figure
        }
        // DEPICTION FUNCTIONS BLOCK END

        // sort faces and suits, and call depiction function
        let f = [] // array of face values from hand
        let s = [] //array of suits from hand

        const C = '\u2663' // clubs
        const D = '\u2666' // diamonds
        const H = '\u2665' // hearts
        const S = '\u2660' // spades
        const facedown = '\u2744' // snowflake

        input.forEach((c) => {
            if (c === 'facedown') {
                f.push(facedown)
            } else f.push(c[0])
            
            switch(c[1]) {
                case 'C':
                    s.push('\u2663')
                    break
                case 'D':
                    s.push('\u2666')
                    break
                case 'H':
                    s.push('\u2665')
                    break
                case 'S':
                    s.push('\u2660')
                    break
                default:
                    s.push(facedown)
                    break
                //
            }
        })

        switch(numberOfCards) {
            case 1:
                return depictOneCard(f[0], s[0])
            case 2:
                return depictTwoCard(f[0], s[0], f[1], s[1])
            case 3:
                return depictThreeCard(f[0], s[0], f[1], s[1], f[2], s[2])
            case 4:
                return depictFourCard(f[0], s[0], f[1], s[1], f[2], s[2], f[3], s[3])
            case 5:
                return depictFiveCard(f[0], s[0], f[1], s[1], f[2], s[2], f[3], s[3], f[4], s[4])
            case 6:
                return depictSixCard(f[0], s[0], f[1], s[1], f[2], s[2], f[3], s[3], f[4], s[4], f[5], s[5])
            case 7:
                return depictSevenCard(f[0], s[0], f[1], s[1], f[2], s[2], f[3], s[3], f[4], s[4], f[5], s[5], f[6], s[6])
            case 8:
                return depictEightCard(f[0], s[0], f[1], s[1], f[2], s[2], f[3], s[3], f[4], s[4], f[5], s[5], f[6], s[6], f[7], s[7])
            case 9:
                return depictNineCard(f[0], s[0], f[1], s[1], f[2], s[2], f[3], s[3], f[4], s[4], f[5], s[5], f[6], s[6], f[7], s[7], f[8], s[8])
            case 10:
                return depictTenCard(f[0], s[0], f[1], s[1], f[2], s[2], f[3], s[3], f[4], s[4], f[5], s[5], f[6], s[6], f[7], s[7], f[8], s[8], f[9], s[9])
            case 11:
                return depictElevenCard(f[0], s[0], f[1], s[1], f[2], s[2], f[3], s[3], f[4], s[4], f[5], s[5], f[6], s[6], f[7], s[7], f[8], s[8], f[9], s[9], f[10], s[10])
            case 12:
                return depictTwelveCard(f[0], s[0], f[1], s[1], f[2], s[2], f[3], s[3], f[4], s[4], f[5], s[5], f[6], s[6], f[7], s[7], f[8], s[8], f[9], s[9], f[10], s[10], f[11], s[11])
            case 13:
                return depictThirteenCard(f[0], s[0], f[1], s[1], f[2], s[2], f[3], s[3], f[4], s[4], f[5], s[5], f[6], s[6], f[7], s[7], f[8], s[8], f[9], s[9], f[10], s[10], f[11], s[11], f[12], s[12])
            case 14:
                return depictFourteenCard(f[0], s[0], f[1], s[1], f[2], s[2], f[3], s[3], f[4], s[4], f[5], s[5], f[6], s[6], f[7], s[7], f[8], s[8], f[9], s[9], f[10], s[10], f[11], s[11], f[12], s[12], f[13], s[13])
            default:
                throw new Error('Failed to depict card(s)')
            //
        }
    }    

    cardToUnicodeCharacter(card) {
        let input = []
        Array.isArray(card) ? input = card : input.push(card)
        let output = []

        input.forEach((c) => {
            let unicode;
            switch(c) {
                case 'AS': unicode = '\u1F0A1'; break;
                case '2S': unicode = '\u1F0A2'; break;
                case '3S': unicode = '\u1F0A3'; break;
                case '4S': unicode = '\u1F0A4'; break;
                case '5S': unicode = '\u1F0A5'; break;
                case '6S': unicode = '\u1F0A6'; break;
                case '7S': unicode = '\u1F0A7'; break;
                case '8S': unicode = '\u1F0A8'; break;
                case '9S': unicode = '\u1F0A9'; break;
                case '1S': unicode = '\u1F0AA'; break;
                case 'JS': unicode = '\u1F0AB'; break;
                case 'QS': unicode = '\u1F0AD'; break;
                case 'KS': unicode = '\u1F0AE'; break;
                case 'AH': unicode = '\u1F0B1'; break;
                case '2H': unicode = '\u1F0B2'; break;
                case '3H': unicode = '\u1F0B3'; break;
                case '4H': unicode = '\u1F0B4'; break;
                case '5H': unicode = '\u1F0B5'; break;
                case '6H': unicode = '\u1F0B6'; break;
                case '7H': unicode = '\u1F0B7'; break;
                case '8H': unicode = '\u1F0B8'; break;
                case '9H': unicode = '\u1F0B9'; break;
                case '1H': unicode = '\u1F0BA'; break;
                case 'JH': unicode = '\u1F0BB'; break;
                case 'QH': unicode = '\u1F0BD'; break;
                case 'KH': unicode = '\u1F0BE'; break;
                case 'AD': unicode = '\u1F0C1'; break;
                case '2D': unicode = '\u1F0C2'; break;
                case '3D': unicode = '\u1F0C3'; break;
                case '4D': unicode = '\u1F0C4'; break;
                case '5D': unicode = '\u1F0C5'; break;
                case '6D': unicode = '\u1F0C6'; break;
                case '7D': unicode = '\u1F0C7'; break;
                case '8D': unicode = '\u1F0C8'; break;
                case '9D': unicode = '\u1F0C9'; break;
                case '1D': unicode = '\u1F0CA'; break;
                case 'JD': unicode = '\u1F0CB'; break;
                case 'QD': unicode = '\u1F0CD'; break;
                case 'KD': unicode = '\u1F0CE'; break;
                case 'AC': unicode = '\u1F0D1'; break;
                case '2C': unicode = '\u1F0D2'; break;
                case '3C': unicode = '\u1F0D3'; break;
                case '4C': unicode = '\u1F0D4'; break;
                case '5C': unicode = '\u1F0D5'; break;
                case '6C': unicode = '\u1F0D6'; break;
                case '7C': unicode = '\u1F0D7'; break;
                case '8C': unicode = '\u1F0D8'; break;
                case '9C': unicode = '\u1F0D9'; break;
                case '1C': unicode = '\u1F0DA'; break;
                case 'JC': unicode = '\u1F0DB'; break;
                case 'QC': unicode = '\u1F0DC'; break;
                case 'KC': unicode = '\u1F0DD'; break;
                case 'facedown': unicode = '\u1F0A0'; break;
                default: unicode = '\u1F0DF';
            }
            output.push(unicode)
        })
        return output
    } // takes string or array of strings and returns array of unicode characters

    depictSmallCard = (card) => this.cardToUnicodeCharacter(card) // test before use in terminal
}
module.exports.StandardDeck = StandardDeck

module.exports.Blackjack = class Blackjack extends StandardDeck {
    #shoe
    #hole

    constructor(players) {
        super()
        this.#shoe = []
        this.#hole = {
            hand: []
        }
        this.dealer = {
            hand: [],
            count: [0]
        }
        this.player = []
        for (let p = 0; p < players; p++) {
            this.player.push({
                id: `${p}`,
                hand: [],
                count: [0],
                bet: 0,
                roll: 0
            })
        }
    } // arg players is an unsigned integer

    get shoe() {
        return this.#shoe
    }
    
    get hole() {
        return this.#hole
    }

    set shoe(s) {
        throw new Error('Cannot set attribute "shoe" manually.')
    }

    set hole(h) {
        throw new Error('Cannot set attribute "hole" manually.')
    }

    fillNewShoeAndShuffleAll(numberOfDecks) {
        this.#shoe = []

        for (let n = 0; n < numberOfDecks; n++) {
            this.shuffleNew().forEach((card) => this.#shoe.push(card))
        } // fill shoe with specified number of decks

        let _shoe = [] // array for sorting cards
        for (let s = 0; s < this.#shoe.length; s++) {
            _shoe.push(null)
        } // populate _deck with 52 null slots

        let _shoeNullSlots = [] // array of _shoe indices
        const findNullSlots = () => {
            _shoeNullSlots = []
            for (let slot in _shoe) {
                if (_shoe[slot] === null) {
                    _shoeNullSlots.push(slot)
                }
            }
        } // populate _deckNullSlots with indices of null slots in _deck
        
        this.#shoe.forEach((card) => {
            findNullSlots()
            let randomNullSlot = Math.floor(Math.random() * _shoeNullSlots.length)

            _shoe[_shoeNullSlots[randomNullSlot]] = card
        }) // add cards in random order to _deck
        
        this.#shoe = _shoe
        return this.#shoe
    }

    newShoeOf = (num) => this.fillNewShoeAndShuffleAll(num)

    deal = () => {
        this.#hole.hand = [] // clear hole card
        for (let c = 0; c < 2; c++) {
            for (let p = 0; p < this.player.length; p++) {
                this.hit(this.player[p])
            }
        } // deal two cards to each player
        this.hit(this.dealer) // deal up card
        this.dealer.hand.push('facedown') // facedown placeholder for hole card
        this.#hole.hand.push(this.#shoe.pop()) // deal hole card
    }

    hit = (player) => {
        player.hand.push(this.#shoe.pop())
        this.updateCount(player)
    }

    holeEmpty = () => {
        return this.#hole.length === 0 ? true : false
    }

    shoeEmpty = () => {
        return this.#shoe.length === 0 ? true : false
    }

    cutCardReached = () => {
        return this.#shoe.length < 25 ? true : false
    }

    peek = () => {
        if (this.holeEmpty()) {
            throw new Error('The hole is empty, but the method peek() was called.')
        } else {
            this.dealer.hand.pop() // remove facedown placeholder from dealer hand array
            this.dealer.hand.push(this.#hole.hand.pop()) // push hole card to dealer hand array
            this.updateCount(this.dealer) // update dealer hand count
        }
    } // reveal hole card and update dealer count

    updateCount(player) {
        // clear hand count
        player.count = []
        // update hand count
        for (let card of player.hand) {
            switch (card[0]) {
                case undefined:
                    player.count.push(0)
                    break
                case 'f': // facedown card not counted
                    player.count.push(0)
                    break
                case 'X':
                    player.count.push(10)
                    break
                case 'J':
                    player.count.push(10)
                    break
                case 'Q':
                    player.count.push(10)
                    break
                case 'K':
                    player.count.push(10)
                    break
                case 'A':
                    player.count.push([1, 11])
                    break
                default:
                    player.count.push(Number(card[0]))
                    break
                //
            }
        } // get array of face values with aces as nested arrays
        let faceCt = 0
        let aceCt = 0
        player.count.forEach((ct) => {
            Array.isArray(ct) ? aceCt++ : faceCt += ct
        }) // count aces and sum non-aces
        
        let runningCt = [] // working array for adding ace values to face count
        for (let a = 0; a <= aceCt; a++) {
                runningCt.push(faceCt)
                runningCt[runningCt.length - 1] += (aceCt - a) + 11 * a
        } // sum possible counts and list in array

        player.count = runningCt
    }

    clearTable = () => {
        // clear player hands
        this.player.forEach((p) => {
            while (p.hand.length !=0) {
                this.discard(p.hand.pop())
                this.updateCount(p)
            }
        })

        // clear dealer hand
        while (this.dealer.hand.length != 0) {
            this.discard(this.dealer.hand.pop())
        }
        this.updateCount(this.dealer)

        // clear hole card
        while (this.#hole.hand.length != 0) {
            this.discard(this.#hole.hand.pop())
        }
        this.updateCount(this.#hole)
    }

    BLACKJACK = () => {
        const figure = `


BBBBB   L       A    CCCCC  K   K   JJJJJJ  A    CCCCC  K   K
B    B  L      A A  C       K  K       J   A A  C       K  K
BBBBB   L     A   A C       KKK        J  A   A C       KKK
B    B  L     AAAAA C       K  K       J  AAAAA C       K  K
BBBBB   LLLLL A   A  CCCCC  K   K   JJJ   A   A  CCCCC  K   K

`;
        return figure
    }

}
