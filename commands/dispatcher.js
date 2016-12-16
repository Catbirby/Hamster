"use strict";

class Dispatcher {
    constructor(){
        this.commands = new Map();
    }

    register(name, command) {
        this.commands.set(name, command);
    } // I forgot the `this.` the first time

    get(name) {
        return this.commands.get(name);
    }

    has(name){
        return this.commands.has(name);
    }

    process(name, msg, args){
        if(this.has(name)){
            try {
                this.get(name).process(msg, args);
            } catch (e){
                msg.channel.createMessage(`**There was an error running your command!**\n\`\`\`js\n${e.stack}\n\`\`\``);
            }
        }
    }
}
module.exports = Dispatcher;