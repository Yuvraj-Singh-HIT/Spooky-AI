# 👻 Spooky AI

*A hauntingly intelligent chat experience with glassmorphism design*

> 🎧 **Heads up:** This AI has personality! Enable sound for the full spectral experience.

## ✨ Features

- **Spectral Conversations**: AI-powered chat with character
- **Glassmorphism UI**: Beautiful, modern translucent design
- **Real-time Streaming**: Instant responses with SSE
- **Open Source**: No vendor lock-in, fully customizable
- **Multiple Models**: Switch between top AI models

## 🚀 Live Demo

**[Experience Spooky AI →](https://spooky-ai-6ecj.vercel.app/)**

*Pro tip: Turn your sound on for the complete haunted experience!*

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | SvelteKit • TypeScript |
| **Styling** | TailwindCSS • DaisyUI |
| **AI** | Hugging Face Inference |
| **Deployment** | Vercel |
| **UI Effects** | Glassmorphism • Animations |

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/Yuvraj-Singh-HIT/Spooky-AI.git
cd Spooky-AI

# Set up environment
echo "HF_TOKEN=your_huggingface_token_here" > .env

# Install dependencies
npm install

# Start development
npm run dev
```

### 🔐 Getting Your API Token

1. Visit [Hugging Face Settings](https://huggingface.co/settings/tokens)
2. Generate a new token with **read** permissions
3. Add it to your `.env` file

## 🧠 AI Models

Choose your AI companion:

| Model | Description | Best For |
|-------|-------------|----------|
| `mistralai/Mistral-7B-Instruct-v0.2` | Balanced & intelligent | General conversations |
| `meta-llama/Meta-Llama-3-8B-Instruct` | Powerful reasoning | Complex queries |
| `microsoft/Phi-3-mini-4k-instruct` | Lightweight & fast | Quick responses |

## 🏗 Architecture

```typescript
// Real-time streaming endpoint
export async function POST({ request }) {
  const { messages } = await request.json();
  
  const stream = new ReadableStream({
    async start(controller) {
      // Convert conversation to prompt
      const prompt = formatMessages(messages);
      
      // Stream from Hugging Face
      const response = await hf.textGenerationStream({
        model: 'mistralai/Mistral-7B-Instruct-v0.2',
        inputs: prompt,
        parameters: { max_new_tokens: 512, temperature: 0.7 }
      });

      // Stream tokens in real-time
      for await (const chunk of response) {
        controller.enqueue(encodeSSE({ content: chunk.token.text }));
      }
    }
  });

  return new Response(stream, { 
    headers: { 'Content-Type': 'text/event-stream' } 
  });
}
```

## 🌐 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Yuvraj-Singh-HIT/Spooky-AI)

1. Click the deploy button above
2. Add your `HF_TOKEN` as an environment variable
3. Deploy! 🎉

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to your preferred platform
# The app is platform-agnostic!
```

## 🎨 Customization

### Changing the AI Personality

Edit the system prompt in `src/routes/api/chat/+server.ts`:

```typescript
const systemPrompt = `You are a friendly ghost AI with a playful personality.
Respond in a hauntingly helpful manner!`;
```

### Modifying the Theme

Update the glassmorphism effects in `src/app.css`:

```css
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

## 🤝 Contributing

Ectoplasmic entities welcome! Feel free to:

- Report bugs 🐛
- Suggest features 💡
- Submit pull requests 🔄
- Share your haunted modifications 👻

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

**Built with 💜 and a touch of spectral energy**

*If you enjoy Spooky AI, give it a ⭐ on GitHub!*
```

This README features:
- **Modern design** with emojis and clean sections
- **Clear call-to-action** with your live demo link
- **Sound recommendation** as you requested
- **Technical depth** with code examples
- **Easy deployment** instructions
- **Customization guides**
- **Visual hierarchy** with tables and code blocks
