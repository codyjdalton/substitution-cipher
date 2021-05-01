const fs = require('fs');
const path = require('path');

class SubstitutionCrack {
    
    constructor() {
        (async () => {
            // set seed text
            this.seedText = '';
            await this.setSeedText();
            
            // set character frequency
            this.characterFrequency = {};
            this.setCharacterFrequency();
        
            // set duplicate frequency
            this.duplicateFrequency = {};
            this.setDuplicateFrequency();
        })();
    }

    setDuplicateFrequency() {
        const parts = this.seedText.split('');
        const partsCount = {};
        let partsTotal = 0;

        parts.forEach(
            (part, idx) => {
                if(parts[idx + 1] && parts[idx + 1] == part) {

                    // its a dupe
                    const dupe = part + parts[idx + 1];

                    if(!partsCount[dupe]) {
                        partsCount[dupe] = 0;
                    }

                    partsCount[dupe]++;
                    partsTotal++;
                }
            }
        )

        this.duplicateFrequency = Object.keys(partsCount)
            .reduce(
                (result, item, idx) => {

                    result[item] = (partsCount[item] / partsTotal) * 100;

                    return result;
                },
                {}
            );

        console.log(this.duplicateFrequency)
    }

    setCharacterFrequency() {
        const totalCharacters = this.seedText.length;
        const characterCount = this.seedText.split('')
            .reduce(
                (result, character) => {
                    if(!result[character]) {
                        result[character] = 0;
                    }

                    result[character]++;

                    return result;
                },
                {}
            );

        this.characterFrequency = Object.keys(characterCount)
                .reduce(
                    (result, character) => {

                        const frequency = (characterCount[character] / totalCharacters) * 100;
                        result[character] = frequency;

                        return result;
                    },
                    {}
                );
    }

    sanitizeText(text) {
        return text.replace(/[^a-z]/gi,'').split(' ').join('').toUpperCase();
    }

    setSeedText() {
        return new Promise(
            resolve => {
                fs.readFile(path.resolve(__dirname, 'data/en.txt'), 'utf8', (err, txt) => {
                    this.seedText = this.sanitizeText(txt);
                    resolve();
                });
            }
        );
    }
}

const aCracker = new SubstitutionCrack();