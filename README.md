# 👻 Spooky AI

*Conversational AI with a hauntingly beautiful interface*

## Stack

SvelteKit • Hugging Face • TailwindCSS • TypeScript

## Setup

```bash
git clone <repo>
cd spooky-ai
echo "HF_TOKEN=hf_..." > .env
pnpm install && pnpm add @huggingface/inference
pnpm dev
```

Get your token at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

## API Route

```typescript
// src/routes/api/chat/+server.ts
import { HfInference } from '@huggingface/inference';
import { HF_TOKEN } from '$env/static/private';

const hf = new HfInference(HF_TOKEN);

export async function POST({ request }) {
  const { messages } = await request.json();
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      const prompt = messages.map(m => `${m.role}: ${m.content}`).join('\n') + '\nassistant:';
      
      const response = await hf.textGenerationStream({
        model: 'mistralai/Mistral-7B-Instruct-v0.2',
        inputs: prompt,
        parameters: { max_new_tokens: 512, temperature: 0.7 }
      });

      for await (const chunk of response) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk.token.text })}\n\n`));
      }
      
      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    }
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream' }
  });
}
```

## Models

Pick your vibe:
- `mistralai/Mistral-7B-Instruct-v0.2` — balanced
- `meta-llama/Meta-Llama-3-8B-Instruct` — powerful
- `microsoft/Phi-3-mini-4k-instruct` — fast

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

Add `HF_TOKEN` to environment variables. Done.

---

*Open source. No vendor lock-in. Built with 💜*