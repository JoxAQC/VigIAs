'use server';

/**
 * @fileOverview Enhances alert descriptions using a mock Gemini API.
 *
 * - enhanceAlertDescription - A function that enhances alert descriptions.
 * - EnhanceAlertDescriptionInput - The input type for the enhanceAlertDescription function.
 * - EnhanceAlertDescriptionOutput - The return type for the enhanceAlertDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceAlertDescriptionInputSchema = z.object({
  originalDescription: z
    .string()
    .describe('The original description of the alert.'),
});
export type EnhanceAlertDescriptionInput = z.infer<
  typeof EnhanceAlertDescriptionInputSchema
>;

const EnhanceAlertDescriptionOutputSchema = z.object({
  enhancedDescription: z
    .string()
    .describe('The enhanced description of the alert provided by Gemini.'),
});
export type EnhanceAlertDescriptionOutput = z.infer<
  typeof EnhanceAlertDescriptionOutputSchema
>;

export async function enhanceAlertDescription(
  input: EnhanceAlertDescriptionInput
): Promise<EnhanceAlertDescriptionOutput> {
  return enhanceAlertDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceAlertDescriptionPrompt',
  input: {schema: EnhanceAlertDescriptionInputSchema},
  output: {schema: EnhanceAlertDescriptionOutputSchema},
  prompt: `You are an AI assistant specializing in analyzing and enriching alert descriptions for a security dashboard.

  Given the original alert description, provide an enhanced description that includes additional context, possible actions, and classifications. Simulate the analysis that would be provided by the Gemini API.

  Original Description: {{{originalDescription}}}
  `,
});

const enhanceAlertDescriptionFlow = ai.defineFlow(
  {
    name: 'enhanceAlertDescriptionFlow',
    inputSchema: EnhanceAlertDescriptionInputSchema,
    outputSchema: EnhanceAlertDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
