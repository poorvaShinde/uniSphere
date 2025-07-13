'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a project name based on a user-provided description.
 *
 * - generateProjectName - A function that takes a project description and returns a suggested project name.
 * - GenerateProjectNameInput - The input type for the generateProjectName function.
 * - GenerateProjectNameOutput - The return type for the generateProjectName function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectNameInputSchema = z.object({
  description: z.string().describe('A description of the project.'),
});
export type GenerateProjectNameInput = z.infer<typeof GenerateProjectNameInputSchema>;

const GenerateProjectNameOutputSchema = z.object({
  projectName: z.string().describe('A suggested name for the project.'),
});
export type GenerateProjectNameOutput = z.infer<typeof GenerateProjectNameOutputSchema>;

export async function generateProjectName(input: GenerateProjectNameInput): Promise<GenerateProjectNameOutput> {
  return generateProjectNameFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectNamePrompt',
  input: {schema: GenerateProjectNameInputSchema},
  output: {schema: GenerateProjectNameOutputSchema},
  prompt: `You are a creative project naming assistant. Given the following project description, suggest a concise and catchy name for the project.\n\nDescription: {{{description}}}\n\nProject Name: `,
});

const generateProjectNameFlow = ai.defineFlow(
  {
    name: 'generateProjectNameFlow',
    inputSchema: GenerateProjectNameInputSchema,
    outputSchema: GenerateProjectNameOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
