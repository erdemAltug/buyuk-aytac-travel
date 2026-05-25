/**
 * Yapay zeka kası — OpenAI uyumlu API (OPENAI_API_KEY tanımlıysa).
 * Anahtar yoksa çağıran kod kural tabanlı eşleştirmeye düşer.
 */

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export function isAiEnabled(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

export async function chatCompletion(
  systemPrompt: string,
  userPrompt: string,
  options?: { model?: string; maxTokens?: number }
): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) return null;

  const model = options?.model ?? process.env.OPENAI_MODEL ?? 'gpt-4o-mini';

  const res = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: options?.maxTokens ?? 500,
      temperature: 0.3,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }),
  });

  if (!res.ok) {
    console.error('OpenAI API error:', res.status, await res.text());
    return null;
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return data.choices?.[0]?.message?.content?.trim() ?? null;
}
