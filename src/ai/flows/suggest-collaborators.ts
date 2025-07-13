// use server'

/**
 * @fileOverview Suggest collaborators based on a project description.
 *
 * - suggestCollaborators - A function that suggests collaborators based on project description.
 * - SuggestCollaboratorsInput - The input type for the suggestCollaborators function.
 * - SuggestCollaboratorsOutput - The return type for the suggestCollaborators function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCollaboratorsInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A description of the project for which collaborators are needed.'),
});
export type SuggestCollaboratorsInput = z.infer<typeof SuggestCollaboratorsInputSchema>;

const SuggestCollaboratorsOutputSchema = z.object({
  collaboratorSuggestions: z
    .array(z.string())
    .describe('A list of suggested collaborators based on the project description.'),
});
export type SuggestCollaboratorsOutput = z.infer<typeof SuggestCollaboratorsOutputSchema>;

export async function suggestCollaborators(input: SuggestCollaboratorsInput): Promise<SuggestCollaboratorsOutput> {
  return suggestCollaboratorsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCollaboratorsPrompt',
  input: {schema: SuggestCollaboratorsInputSchema},
  output: {schema: SuggestCollaboratorsOutputSchema},
  prompt: `You are a project manager who specializes in suggesting collaborators for projects.

  Based on the project description provided, suggest a list of potential collaborators who would be a good fit for the project.

  Project Description: {{{projectDescription}}}
  `,
});

const suggestCollaboratorsFlow = ai.defineFlow(
  {
    name: 'suggestCollaboratorsFlow',
    inputSchema: SuggestCollaboratorsInputSchema,
    outputSchema: SuggestCollaboratorsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
