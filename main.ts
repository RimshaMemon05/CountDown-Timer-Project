#! /usr/bin/env node

import inquirer from "inquirer";
import {differenceInSeconds} from "date-fns";
import chalk from "chalk";

const response = await inquirer.prompt([
    {
        name: "userInput",
        type: "number",
        message: chalk.bold.magenta("Please Enter the amount of seconds."),
        validate: (input)=>{
            if(isNaN(input)){
                return chalk.redBright("Please Enter Valid Number")
            }else if (input > 60){
                return chalk.redBright("Seconds must be in 60.")
            }else {
                return true;
            }
        }
    }
]);

let input = response.userInput

function startTime(value:number){
    const initialTime = new Date().setSeconds(new Date().getSeconds() + value);
    const intervalTime = new Date(initialTime);
    setInterval((()=>{
        const currentTime = new Date()
        const timeDiff = differenceInSeconds(intervalTime, currentTime);

        if (timeDiff <= 0){
            console.log(chalk.bold.blue("Timer has Expired"));
            process.exit();
        }
        const min = Math.floor((timeDiff%(3600*24))/3600);
        const sec = Math.floor(timeDiff%60);
        console.log(`${min.toString().padStart(2, "0")}: ${sec.toString().padStart(2, "0")}`);
    }),1000);
}
startTime(input);