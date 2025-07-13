'use server';

import { generateProjectName } from '@/ai/flows/generate-project-name';
import { suggestCollaborators } from '@/ai/flows/suggest-collaborators';

export async function getSmartMatchResult(description: string) {
  try {
    const [nameResult, collaboratorsResult] = await Promise.all([
      generateProjectName({ description }),
      suggestCollaborators({ projectDescription: description }),
    ]);

    return {
      data: {
        projectName: nameResult.projectName,
        collaborators: collaboratorsResult.collaboratorSuggestions,
      },
      error: null,
    };
  } catch (error) {
    console.error('AI generation failed:', error);
    return {
      data: null,
      error: 'Failed to generate ideas. Please try again later.',
    };
  }
}
