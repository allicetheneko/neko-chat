import Replicate from "replicate";
import readline from "readline";
import * as fs from "fs";
import * as path from "path";
import figlet from "figlet";
import colors from "colors";

const replicate = new Replicate({ auth: "//PLACE_HOLDER" }); // <-- REPLACE WITH YOUR APIKEY BEFORE START THE CODE.

const historyFile = path.join(__dirname, "history/chat_history.json");
let history: { role: string; content: string }[] = [];
let historyIndex = 0;

interface GenerationSettings {
  max_tokens: number;
  temperature: number;
  top_p: number;
  system_prompt: string;
  [key: string]: string | number;
}

let generationSettings: GenerationSettings = {
  max_tokens: 1024,
  temperature: 0.7,
  top_p: 1,
  system_prompt: "Be A Helpful Catgirl Assistant Named Neko",
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: colors.cyan(">> "),
});

async function generateResponse(prompt: string) {
  const newHistory = [...history, { role: "user", content: prompt }];

  const input = {
    prompt: newHistory.map(msg => `${msg.role}: ${msg.content}`).join("\n") + "\nAssistant:",
    ...generationSettings
  };

  history.push({ role: "user", content: prompt });
  saveChatHistory();

  let responseText = "";

  try {
    for await (const chunk of replicate.stream("meta/meta-llama-3.1-405b-instruct", { input })) {
      if (chunk.data) {
        try {
          const dataString = chunk.data.startsWith("data:") ? chunk.data.substring(5) : chunk.data;
          const parsedData = JSON.parse(dataString);
          if (parsedData.output) {
            responseText += parsedData.output;
            process.stdout.write(`${chunk.data}`.yellow);
          } else if (parsedData.error) {
            throw new Error(parsedData.error);
          }
        } catch (error) {
          responseText += chunk.data;
          process.stdout.write(`${chunk.data}`.yellow);
        }
      }
    }
  } catch (error) {
    console.error(colors.red("An error occurred while generating the response:"));
    console.error(error);
    responseText = "Sowwy, I'm having trouble generating a response right now. Please try again later :c";
  } finally {
    process.stdout.write("\n\n");

    if (responseText) {
      history.push({ role: "assistant", content: responseText });
      saveChatHistory();
    }
  }
}

function loadChatHistory(): { role: string, content: string }[] {
  try {
    const data = fs.readFileSync(historyFile, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveChatHistory() {
  fs.writeFileSync(historyFile, JSON.stringify(history, null, 2));
}

async function typeWriter(text: string, delay = 50) {
  for (const char of text) {
    await new Promise(resolve => setTimeout(resolve, delay));
    process.stdout.write(char);
  }
  process.stdout.write("\n");
}

console.clear

figlet("Neko Chat", (err, data) => {
  if (err) {
    console.error(colors.red("Something went wrong with figlet..."));
    return;
  }
  if (data) {
    console.log(colors.blue(data));
  }

  history = loadChatHistory();

  typeWriter(colors.magenta("Hello! How Can I Help U Today :3")).then(() => rl.prompt());
});

rl.on("line", async (line) => {
  if (line.trim().toLowerCase() === "/exit") {
    console.log(colors.yellow("Exiting... Bye!"));
    process.exit(0);
  } else if (line.trim().toLowerCase() === "/clear") {
    console.clear();
    figlet("Neko", (err, data) => {
      if (err) {
        console.error(colors.red("Something went wrong with figlet..."));
        return;
      }
      if (data) {
        console.log(colors.blue(data));
      }
      typeWriter(colors.magenta("Hello! How Can I Help U Today :3")).then(() => rl.prompt());
    });
    } else if (line.trim().toLowerCase() === "/help") {
      displayHelp();
    } else if (line.trim().toLowerCase().startsWith("/set")) {
      handleSettingCommand(line.trim().substring(4));
  } else {
    await generateResponse(line);
    historyIndex = history.length;
    rl.prompt();
  }
});

function handleSettingCommand(command: string) {
  const [setting, value] = command.split(" ");
  if (setting && value) {
    if (generationSettings.hasOwnProperty(setting)) {
      const parsedValue = parseFloat(value);
      generationSettings[setting] = isNaN(parsedValue) ? value : parsedValue;
      console.log(colors.green(`Setting '${setting}' updated to: ${generationSettings[setting]}`));
    } else {
      console.log(colors.red(`Invalid setting: '${setting}'`));
    }
  } else {
    console.log(colors.red("Invalid setting command format. Use: /set <setting_name> <value>"));
  }
}

function displayHelp() {
  console.log(colors.yellow(`
Available commands:
  /exit      - Exit the chat
  /clear     - Clear the chat history
  /set <setting> <value>  - Change generation settings (e.g., /set max_tokens 500)
  /help      - Display this help message
  `));
}

rl.on("keypress", (str: string, key: readline.Key) => {
  if (key && key.name === "up" && historyIndex > 0) {
    historyIndex--;
    rl.write(null, { ctrl: true, name: 'u' });
    if (history[historyIndex]) {
      rl.write(history[historyIndex].content);
    }
  } else if (key && key.name === "down" && historyIndex < history.length - 1) {
    historyIndex++;
    rl.write(null, { ctrl: true, name: 'u' });
    if (history[historyIndex]) {
      rl.write(history[historyIndex].content);
    }
  }
});
