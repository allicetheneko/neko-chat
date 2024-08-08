# Neko Chat

![Gif](https://media1.tenor.com/m/y2JXkY1pXkwAAAAC/cat-computer.gif)

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)

Chat with Neko, a helpful AI assistant powered by Meta's Llama 3.1 model through the Replicate API. 💖

[![GitHub stars](https://img.shields.io/github/stars/allicetheneko/neko-chat?style=social)](https://github.com/allicetheneko/neko-chat/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/allicetheneko/neko-chat?style=social)](https://github.com/allicetheneko/neko-chat/network/members)

## ✨ Overview

Neko Chat is a terminal-based interactive chatbot designed to engage in natural conversations, provide assistance, and entertain. 🗨️ It leverages the power of large language models to understand and respond to your inputs intelligently.  ✨

## 🚀 Features

- **Conversational Interface:** Neko engages in dynamic conversations, responding to your questions, requests, and prompts in a catgirl-like manner. 🐾
- **Advanced Language Model:** Powered by Meta's Llama 3.1, Neko understands context, nuances, and can generate creative responses. 🧠
- **Replicate API Integration:**  Easy model access and deployment through the Replicate API. ⚙️
- **Customizable Settings:** Fine-tune the model's behavior (temperature, max tokens) for a personalized experience. 🔧
- **Chat History:** Retains chat history for context and allows browsing past conversations. 📖
- **Terminal Enhancements:**  Utilizes `figlet` for fancy ASCII art and `colors` for a visually appealing interface. ✨
- **Personalized Personality:** Customize Neko's personality by modifying the `system_prompt` (see Configuration). 🎨
- **Interactive Shell:**  Use arrow keys (up/down) to navigate your chat history for convenience. ⬆️⬇️

## 🛠️ Getting Started

**Prerequisites:**
   - Node.js and npm installed
   - A Replicate API key (obtain yours from [https://replicate.com/](https://replicate.com/))

**Installation:**
   ```bash
   git clone https://github.com/allicetheneko/neko-chat.git
   cd neko-chat
   npm install / yarn install
   ```

**Configuration:**
   - **Replace API Key:** Open `neko.ts` and replace `PLACE_HOLDER` with your own Replicate API key. 🔑
   - **Customize Personality:**  In `neko.ts`, modify the `system_prompt` within the `generationSettings` object to change how Neko interacts. Experiment with different prompts!

**Run the Chatbot:**
   ```bash
   yarn start / node .
   ```

## 💬 Usage

- Type your messages and press Enter to chat with Neko. 💬
- Use these commands for additional functionality:
    - `/exit` - Exit the chat 👋
    - `/clear` - Clear the chat history 🧹
    - `/set <setting> <value>` - Adjust generation settings (e.g., `/set temperature 0.5`) 🌡️
    - `/help` - Show available commands ❓
- Use arrow keys (up/down) to browse your chat history. ⬆️⬇️

## ⚙️ Configuration Options

| Setting      | Description                                        | Default Value |
|-------------|----------------------------------------------------|---------------|
| `max_tokens` | Maximum number of tokens to generate in a response. | 1024          |
| `temperature`| Controls the randomness of the response (0-1).     | 0.7           |
| `top_p`     | Nucleus sampling parameter for controlling diversity (0-1). | 1             |

## 🙌 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests. 🙏

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## ❤️ Acknowledgments

- This project is powered by the amazing Llama 3.1 model from Meta.
- Special thanks to the Replicate team for providing a fantastic API to access this powerful model.
