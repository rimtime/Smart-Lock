'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const app = new App();

app.use(
    new Alexa(),
    new GoogleAssistant(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
      this.$speech.addText('Welcome to you RIM smart lock. Would you like to lock the door? Check the lock status? Or unlock the door?');
      this.$reprompt.addText('Please say lock door, status of my door, or unlock the door.');
      this.ask(this.$speech, this.$reprompt);
    },

    lockIntent() {
        let expectedLockPrompt = 'Your door is locked.'
        let expectedUnLockPrompt = 'Your door is unlocked.'
        let lockStatus = this.$inputs.lockStatus.value
        if ( lockStatus === 'lock') {
          this.$speech.addText(expectedLockPrompt)
        } else {
          this.$speech.addText(expectedUnLockPrompt)
        }
        this.tell(this.$speech);
    }
});

module.exports.app = app;
