const Discord = require('discord.js');
const fs = require('fs');
const { parse } = require('path');
const client = new Discord.Client();

const token = 'NzUxNTQyOTAxMDcwMjMzNjQw.X1Km3g.cfjCC3qjKDmdwiZ3u5PxdNELmKo';

client.on('ready', () =>{
    console.log('COCT Bot is online');
    client.user.setActivity('https://coct.online');
});

var numTeams = {};

var round;

var log = fs.createWriteStream("log.txt", {flags:'a'});

function Team(teamName, r1Score, r2Score, r3Score, semiScore, finalScore, unknownScore) {
    this.teamName = teamName;
    this.unknownScore = unknownScore;
    this.r1Score = r1Score;
    this.r2Score = r2Score;
    this.r3Score = r3Score;
    this.semiScore = semiScore;
    this.finalScore = finalScore;
    this.logScore = logScore;
    this.totalScore = totalScore;
    this.pointsPerRound = pointsPerRound;
}

function pointsPerRound(){
    return this.totalScore() / round;
}

function totalScore(){
    return this.r1score + this.r2Score + this.r3Score + this.semiScore + this.finalScore;
}

function logScore(){
    log.write(this.teamName + " – " + parseInt(date.getMonth(), 10) + 1 + "." + date.getDate() + "." + date.getFullYear() + "\n");
    log.write("Round 1: " + this.r1Score + " | Round 2: " + this.r2Score + " | Round 3: " + this.r3Score + " | Semis: " + this.semiScore + " | Finals: " + this.finalScore);
}

var uhsa = new Team("UHS A", 0, 0, 0, 0, 0, 0);
var uhsb = new Team("UHS B", 0, 0, 0, 0, 0, 0);
var uhsc = new Team("UHS C", 0, 0, 0, 0, 0, 0);
var uhsd = new Team("UHS D", 0, 0, 0, 0, 0, 0);
var harkera = new Team("Harker A", 0, 0, 0, 0, 0, 0);
var harkerb = new Team("Harker B", 0, 0, 0, 0, 0, 0);
var harkerc = new Team("Harker C", 0, 0, 0, 0, 0, 0);
var crossroadsa = new Team("Crossroads A", 0, 0, 0, 0, 0, 0);
var crossroadsb = new Team("Crossroads B", 0, 0, 0, 0, 0, 0);
var harvardwestlake = new Team("Harvard-Westlake", 0, 0, 0, 0, 0, 0);
var marlborough = new Team("Marlborough", 0, 0, 0, 0, 0, 0);
var stignatius = new Team("St. Ignatius", 0, 0, 0, 0, 0, 0);

var teams = [uhsa, uhsb, uhsc, uhsd, harkera, harkerb, harkerc, crossroadsa, crossroadsb, harvardwestlake, marlborough, stignatius];

//-scorelogcertamenbot



client.on('message', async msg=> {

    var prefix = "-scorelogcertamenbot"
    if (msg.content.includes("-scorelogcertamenbot")){
        msg.delete();
        var content = msg.content.slice(prefix.length);
        teams.forEach(team => {
            if (content.includes(team.teamName)){
                score = content.slice(team.teamName.length + 1);
                score = parseInt(score);
                if (typeof round != undefined){
                    if (round == 1 && team.r1Score != "Did not score."){
                        team.r1Score = score;
                    } else if (round == 2 && team.r2Score != "Did not score."){
                        team.r2Score = score;
                    } else if (round == 3 && team.r3Score != "Did not score."){
                        team.r3Score = score;
                    } else if (round == 4 && team.semiScore != "Did not score."){
                        team.semiScore = score;
                    } else if (round == 5 && team.finalScore != "Did not score."){
                        team.finalScore = score;
                    }
                }
            }
        })
    }

    if (msg.content.includes("-r1")){
        teams.sort((a, b) => b.r1Score - a.r1Score);
        const r1embed = new Discord.MessageEmbed()
            .setTitle("ROUND 1 SCORES")
            .setColor('#FFFCF2')
            .setThumbnail('https://cdn.discordapp.com/attachments/726708300854591491/751686746265223308/coctlogo_copy.png');

        teams.forEach(team => {
            var index = teams.indexOf(team) + 1;
            r1embed.addField(index + ". " + team.teamName, team.r1Score);
        });

        msg.channel.send(r1embed);
    }

    if (msg.content.includes("-r2")){
        teams.sort((a, b) => b.r2Score - a.r2Score);
        const r2embed = new Discord.MessageEmbed()
            .setTitle("ROUND 2 SCORES")
            .setColor('#FFFCF2')
            .setThumbnail('https://cdn.discordapp.com/attachments/726708300854591491/751686746265223308/coctlogo_copy.png');

        teams.forEach(team => {
            var index = teams.indexOf(team) + 1;
            r2embed.addField(index + ". " + team.teamName, team.r2Score);
        });

        msg.channel.send(r2embed);
    }

    if (msg.content.includes("-r3")){
        teams.sort((a, b) => b.r3Score - a.r3Score);
        const r3embed = new Discord.MessageEmbed()
            .setTitle("ROUND 3 SCORES")
            .setColor('#FFFCF2')
            .setThumbnail('https://cdn.discordapp.com/attachments/726708300854591491/751686746265223308/coctlogo_copy.png');

        teams.forEach(team => {
            var index = teams.indexOf(team) + 1;
            r3embed.addField(index + ". " + team.teamName, team.r3Score);
        });

        msg.channel.send(r3embed);
    }

    if (msg.content.includes("-semi")){
        numTeams[msg.channel.id] = 0;
        teams.sort((a, b) => b.semiScore - a.semiScore);
        const semiembed = new Discord.MessageEmbed()
            .setTitle("SEMIFINAL SCORES")
            .setColor('#FFFCF2')
            .setThumbnail('https://cdn.discordapp.com/attachments/726708300854591491/751686746265223308/coctlogo_copy.png');

        teams.forEach(team => {
            if (numTeams[msg.channel.id] == 0 || typeof numTeams[msg.channel.id] == undefined){
                numTeams[msg.channel.id] = 0;
                var index = teams.indexOf(team) + 1;
                semiembed.addField(index + ". " + team.teamName, team.semiScore);
                numTeams[msg.channel.id]++;
            } else if (numTeams[msg.channel.id] < 9){
                var index = teams.indexOf(team) + 1;
                semiembed.addField(index + ". " + team.teamName, team.semiScore);
                numTeams[msg.channel.id]++;
            }
            
        });

        msg.channel.send(semiembed);
    }

    if (msg.content.includes("-final")){
        numTeams[msg.channel.id] = 0;
        teams.sort((a, b) => b.finalScore - a.finalScore);
        const finalembed = new Discord.MessageEmbed()
            .setTitle("FINAL SCORES")
            .setColor('#FFFCF2')
            .setThumbnail('https://cdn.discordapp.com/attachments/726708300854591491/751686746265223308/coctlogo_copy.png');

        teams.forEach(team => {
            if (numTeams[msg.channel.id] == 0 || typeof numTeams[msg.channel.id] == undefined){
                numTeams[msg.channel.id] = 0;
                var index = teams.indexOf(team) + 1;
                finalembed.addField(index + ". " + team.teamName, team.finalScore);
                numTeams[msg.channel.id]++;
            } else if (numTeams[msg.channel.id] < 3){
                var index = teams.indexOf(team) + 1;
                finalembed.addField(index + ". " + team.teamName, team.finalScore);
                numTeams[msg.channel.id]++;
            }
        });

        msg.channel.send(finalembed);
    }

    if (msg.content.includes("-total")){
        teams.sort((a, b) => b.totalScore() - a.totalScore());
        const totalembed = new Discord.MessageEmbed()
            .setTitle("TOTAL SCORES")
            .setColor('#FFFCF2')
            .setThumbnail('https://cdn.discordapp.com/attachments/726708300854591491/751686746265223308/coctlogo_copy.png');

        teams.forEach(team => {
            var index = teams.indexOf(team) + 1;
            totalembed.addField(index + ". " + team.teamName, team.totalScore());
        });

        msg.channel.send(totalembed);
    }

    if (msg.content.includes("-setround")){
        msg.delete();
        var content = msg.content.slice(10);
        round = parseInt(content);
        msg.channel.send("*Round: " + round + "*");
    }

    if (msg.content.includes("-modify")){
        msg.delete();
        var content = msg.content.slice(8);
        teams.forEach(team => {
            if (content.includes(team.teamName)){
                content = content.slice(team.teamName.length + 1);
                var amount = content.slice(2);
                if (content.startsWith(1)){
                    team.r1Score = parseInt(amount);
                } else if (content.startsWith(2)){
                    team.r2Score = parseInt(amount);
                } else if (content.startsWith(3)){
                    team.r3Score = parseInt(amount);
                } else if (content.startsWith(4)){
                    team.semiScore = parseInt(amount);
                } else {
                    team.finalScore = parseInt(amount);
                } 
            }
        });
    }

    if (msg.content.includes("-youtube")){
        const youtube = new Discord.MessageEmbed()
            .setTitle("COCT Youtube")
            .setColor('#FF0000')
            .setDescription("View the latest upload to the COCT channel at https://ltstyt.be/4hh")
            .setThumbnail("https://cdn.discordapp.com/attachments/726708300854591491/752435785084567603/Screen_Shot_2020-09-07_at_12.50.02_AM.png")

        msg.delete();
        msg.channel.send(youtube);
    }

    if (msg.content.includes("-live")){
        var content = msg.content.slice(6);
        const youtube = new Discord.MessageEmbed()
            .setTitle("We're live!")
            .setColor('#FF0000')
            .setDescription("Check out the livestream at " + content + ". We're live with multiple simultaneous streams so all rooms can be documented, so make sure to switch cameras at the bottom of the window.")
            .setThumbnail("https://cdn.discordapp.com/attachments/726708300854591491/752435785084567603/Screen_Shot_2020-09-07_at_12.50.02_AM.png")
            
            msg.delete();
            msg.channel.send(youtube);
    }

    if (msg.content == "-submitted"){
        const submitted = new Discord.MessageEmbed()
            .setTitle("The scores for this channel have been properly submitted to the database.")
            .setColor('#FFFCF2')
            .setThumbnail("https://cdn.discordapp.com/attachments/726708300854591491/751686746265223308/coctlogo_copy.png")
            
        msg.channel.send(submitted);
    }

});

client.on('guildMemberAdd', async member => {
    const welcome = new Discord.MessageEmbed()
        .setTitle("Welcome to COCT, " + member.user.username + "!")
        .setColor('#FFFCF2')
        .setThumbnail('https://cdn.discordapp.com/attachments/726708300854591491/751686746265223308/coctlogo_copy.png')
        .setDescription("There are a few things you need to do to get started. Currently, you won't be able to see any channels. To get started, react to this message with a thumbs up, and you'll be verified and allowed to enter into the server. Please head over to the #welcome channel and follow all instructions listed there. For any questions, feel free to DM the @admins.")
    var channelid = '726708300854591491';
    const channel = member.guild.channels.cache.get(channelid)
    const embed = await channel.send(welcome); 
    embed.react('👍');
    const filter = (reaction, user) => {
        return ['👍'].includes(reaction.emoji.name) && user.id === member.id;
      };

    embed.awaitReactions(filter, { max: 1})
      .then(collected => {
        const reaction = collected.first();
        if (reaction.emoji.name === '👍') {
            var role= member.guild.roles.cache.find(role => role.name === "verified");
            member.roles.add(role);
            channel.send("<@ " + member.id + ">, thanks for joining. You are now able to access all channels.");
        }
      })


});

client.login(token);